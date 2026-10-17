import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import lockfile from "proper-lockfile";
import {
  CollectionMap,
  Navigation,
  Settings,
  RedirectItem,
  type CollectionName,
  type CollectionItemType,
} from "../schemas";
import type { ContentStore, AuditEntry } from "../types";

export class FileContentAdapter implements ContentStore {
  readonly adapterName = "file" as const;
  private readonly baseDir: string;
  private readonly historyDir: string;

  constructor(baseDir = path.join(process.cwd(), "content")) {
    this.baseDir = baseDir;
    this.historyDir = path.join(baseDir, ".history");
  }

  async init(): Promise<void> {
    try {
      await fs.mkdir(this.baseDir, { recursive: true });
      await fs.mkdir(this.historyDir, { recursive: true });
      // Write test to detect read-only filesystem
      const testFile = path.join(this.historyDir, ".write-test");
      await fs.writeFile(testFile, "ok", "utf-8");
      await fs.unlink(testFile);
      console.log(`[ContentStore] Initialized FileContentAdapter at: ${this.baseDir}`);
    } catch (err) {
      console.error(
        `[ContentStore:ERROR] Filesystem at ${this.baseDir} is read-only or inaccessible. If deploying serverless (e.g. Vercel), set CONTENT_STORE=blob and provide BLOB_READ_WRITE_TOKEN.`,
        err
      );
    }
  }

  private getFilePath(collection: string): string {
    return path.join(this.baseDir, `${collection}.json`);
  }

  private async ensureFile(filePath: string, defaultContent: string): Promise<void> {
    if (!fsSync.existsSync(filePath)) {
      await fs.mkdir(path.dirname(filePath), { recursive: true });
      await fs.writeFile(filePath, defaultContent, "utf-8");
    }
  }

  private async recordSnapshot(collection: string, rawData: string): Promise<void> {
    try {
      const colHistoryDir = path.join(this.historyDir, collection);
      await fs.mkdir(colHistoryDir, { recursive: true });
      const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
      const snapshotPath = path.join(colHistoryDir, `${timestamp}.json`);
      await fs.writeFile(snapshotPath, rawData, "utf-8");

      // Prune snapshots beyond 30
      const files = await fs.readdir(colHistoryDir);
      const jsonFiles = files.filter((f) => f.endsWith(".json")).sort();
      if (jsonFiles.length > 30) {
        const toDelete = jsonFiles.slice(0, jsonFiles.length - 30);
        for (const file of toDelete) {
          await fs.unlink(path.join(colHistoryDir, file)).catch(() => {});
        }
      }
    } catch (err) {
      console.warn(`[ContentStore] Failed to write snapshot for ${collection}:`, err);
    }
  }

  private async logAudit(entry: Omit<AuditEntry, "id" | "timestamp">): Promise<void> {
    try {
      const auditFile = path.join(this.historyDir, "audit.json");
      await this.ensureFile(auditFile, "[]");
      const fullEntry: AuditEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      const raw = await fs.readFile(auditFile, "utf-8").catch(() => "[]");
      let list: AuditEntry[] = [];
      try {
        list = JSON.parse(raw);
      } catch {
        list = [];
      }
      list.unshift(fullEntry);
      if (list.length > 500) list = list.slice(0, 500);
      await fs.writeFile(auditFile, JSON.stringify(list, null, 2), "utf-8");
    } catch (err) {
      console.warn("[ContentStore] Failed to record audit log:", err);
    }
  }

  private async writeAtomic(filePath: string, data: unknown, collection: string): Promise<void> {
    await this.ensureFile(filePath, "[]");
    const jsonString = JSON.stringify(data, null, 2);

    let release: (() => Promise<void>) | null = null;
    try {
      release = await lockfile.lock(filePath, { retries: 5, stale: 5000 }).catch(() => null);
    } catch {
      // Lockfile fallback
    }

    try {
      // Create snapshot before write
      const existing = await fs.readFile(filePath, "utf-8").catch(() => "[]");
      await this.recordSnapshot(collection, existing);

      // Atomic write via temp file
      const tempPath = `${filePath}.${Date.now()}.${Math.random().toString(36).slice(2)}.tmp`;
      await fs.writeFile(tempPath, jsonString, "utf-8");
      await fs.rename(tempPath, filePath);
    } finally {
      if (release) {
        await release().catch(() => {});
      }
    }
  }

  async list<C extends CollectionName>(collection: C, includeDrafts = false): Promise<CollectionItemType<C>[]> {
    const filePath = this.getFilePath(collection);
    if (!fsSync.existsSync(filePath)) return [];

    try {
      const raw = await fs.readFile(filePath, "utf-8");
      const parsed = JSON.parse(raw);
      if (!Array.isArray(parsed)) return [];

      const schema = CollectionMap[collection];
      const validItems: CollectionItemType<C>[] = [];

      for (const rawItem of parsed) {
        const result = schema.safeParse(rawItem);
        if (result.success) {
          const item = result.data as CollectionItemType<C>;
          if (includeDrafts || item.status === "published") {
            validItems.push(item);
          }
        } else {
          console.warn(
            `[ContentStore:WARN] Item in collection '${collection}' failed validation:`,
            result.error.issues.map((i) => `${i.path.join(".")}: ${i.message}`).join(", ")
          );
        }
      }

      return validItems.sort((a, b) => a.order - b.order);
    } catch (err) {
      console.error(`[ContentStore:ERROR] Error reading collection '${collection}':`, err);
      return [];
    }
  }

  async get<C extends CollectionName>(
    collection: C,
    idOrSlug: string,
    includeDrafts = false
  ): Promise<CollectionItemType<C> | null> {
    const items = await this.list(collection, includeDrafts);
    return items.find((item) => item.id === idOrSlug || item.slug === idOrSlug) || null;
  }

  async create<C extends CollectionName>(
    collection: C,
    itemData: Omit<CollectionItemType<C>, "id" | "createdAt" | "updatedAt"> & { id?: string },
    user = "admin"
  ): Promise<CollectionItemType<C>> {
    const items = await this.list(collection, true);
    const now = new Date().toISOString();
    const id = itemData.id || crypto.randomUUID();

    const fullItem = {
      ...itemData,
      id,
      createdAt: now,
      updatedAt: now,
    };

    const schema = CollectionMap[collection];
    const validated = schema.parse(fullItem) as CollectionItemType<C>;

    items.push(validated);
    await this.writeAtomic(this.getFilePath(collection), items, collection);

    await this.logAudit({
      action: "create",
      collection,
      itemId: id,
      user,
      summary: `Created ${collection} item "${(itemData as unknown as { title?: { en: string }; name?: { en: string } }).title?.en || (itemData as unknown as { name?: { en: string } }).name?.en || id}"`,
    });

    return validated;
  }

  async update<C extends CollectionName>(
    collection: C,
    id: string,
    patch: Partial<CollectionItemType<C>>,
    user = "admin"
  ): Promise<CollectionItemType<C>> {
    const items = await this.list(collection, true);
    const index = items.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new Error(`Item ${id} not found in collection ${collection}`);
    }

    const currentItem = items[index];
    const updatedRaw = {
      ...currentItem,
      ...patch,
      id: currentItem.id, // Immutable ID
      createdAt: currentItem.createdAt, // Immutable createdAt
      updatedAt: new Date().toISOString(),
    };

    const schema = CollectionMap[collection];
    const validated = schema.parse(updatedRaw) as CollectionItemType<C>;

    // Auto-record 301 redirect if slug changed
    if (currentItem.slug && validated.slug && currentItem.slug !== validated.slug) {
      const sectionPrefix = collection === "posts" ? "blog" : collection;
      await this.addRedirect({
        source: `/${sectionPrefix}/${currentItem.slug}`,
        destination: `/${sectionPrefix}/${validated.slug}`,
        permanent: true,
        createdAt: new Date().toISOString(),
      });
    }

    items[index] = validated;
    await this.writeAtomic(this.getFilePath(collection), items, collection);

    await this.logAudit({
      action: "update",
      collection,
      itemId: id,
      user,
      summary: `Updated ${collection} item "${id}"`,
    });

    return validated;
  }

  async delete<C extends CollectionName>(collection: C, id: string, user = "admin"): Promise<boolean> {
    const items = await this.list(collection, true);
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) return false;

    await this.writeAtomic(this.getFilePath(collection), filtered, collection);

    await this.logAudit({
      action: "delete",
      collection,
      itemId: id,
      user,
      summary: `Deleted ${collection} item "${id}"`,
    });

    return true;
  }

  async reorder<C extends CollectionName>(collection: C, orderedIds: string[], user = "admin"): Promise<void> {
    const items = await this.list(collection, true);
    const itemMap = new Map(items.map((it) => [it.id, it]));

    const reordered: CollectionItemType<C>[] = [];
    orderedIds.forEach((id, index) => {
      const item = itemMap.get(id);
      if (item) {
        item.order = index;
        reordered.push(item);
        itemMap.delete(id);
      }
    });

    // Append any unlisted items to the end
    for (const remaining of itemMap.values()) {
      remaining.order = reordered.length;
      reordered.push(remaining);
    }

    await this.writeAtomic(this.getFilePath(collection), reordered, collection);

    await this.logAudit({
      action: "reorder",
      collection,
      user,
      summary: `Reordered ${orderedIds.length} items in ${collection}`,
    });
  }

  async getNavigation(): Promise<Navigation> {
    const filePath = this.getFilePath("navigation");
    if (!fsSync.existsSync(filePath)) {
      throw new Error("navigation.json not found");
    }
    const raw = await fs.readFile(filePath, "utf-8");
    return Navigation.parse(JSON.parse(raw));
  }

  async updateNavigation(navigation: Navigation, user = "admin"): Promise<Navigation> {
    const validated = Navigation.parse(navigation);
    await this.writeAtomic(this.getFilePath("navigation"), validated, "navigation");
    await this.logAudit({ action: "update", collection: "navigation", user, summary: "Updated navigation menus" });
    return validated;
  }

  async getSettings(): Promise<Settings> {
    const filePath = this.getFilePath("settings");
    if (!fsSync.existsSync(filePath)) {
      throw new Error("settings.json not found");
    }
    const raw = await fs.readFile(filePath, "utf-8");
    return Settings.parse(JSON.parse(raw));
  }

  async updateSettings(settings: Settings, user = "admin"): Promise<Settings> {
    const validated = Settings.parse(settings);
    await this.writeAtomic(this.getFilePath("settings"), validated, "settings");
    await this.logAudit({ action: "update", collection: "settings", user, summary: "Updated site settings" });
    return validated;
  }

  async getRedirects(): Promise<RedirectItem[]> {
    const filePath = this.getFilePath("redirects");
    if (!fsSync.existsSync(filePath)) return [];
    try {
      const raw = await fs.readFile(filePath, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }

  async addRedirect(redirect: RedirectItem): Promise<void> {
    const redirects = await this.getRedirects();
    redirects.unshift(redirect);
    await this.writeAtomic(this.getFilePath("redirects"), redirects, "redirects");
  }

  async listHistory(collection: string): Promise<{ timestamp: string; filename: string }[]> {
    const colHistoryDir = path.join(this.historyDir, collection);
    if (!fsSync.existsSync(colHistoryDir)) return [];
    const files = await fs.readdir(colHistoryDir);
    return files
      .filter((f) => f.endsWith(".json"))
      .sort()
      .reverse()
      .map((f) => ({
        timestamp: f.replace(".json", ""),
        filename: f,
      }));
  }

  async restoreSnapshot(collection: string, filename: string, user = "admin"): Promise<void> {
    const snapshotPath = path.join(this.historyDir, collection, filename);
    if (!fsSync.existsSync(snapshotPath)) {
      throw new Error(`Snapshot ${filename} not found for ${collection}`);
    }
    const raw = await fs.readFile(snapshotPath, "utf-8");
    const parsed = JSON.parse(raw);
    await this.writeAtomic(this.getFilePath(collection), parsed, collection);
    await this.logAudit({
      action: "restore",
      collection,
      user,
      summary: `Restored snapshot ${filename} for ${collection}`,
    });
  }

  async getAuditLog(): Promise<AuditEntry[]> {
    const auditFile = path.join(this.historyDir, "audit.json");
    if (!fsSync.existsSync(auditFile)) return [];
    try {
      const raw = await fs.readFile(auditFile, "utf-8");
      return JSON.parse(raw);
    } catch {
      return [];
    }
  }
}
