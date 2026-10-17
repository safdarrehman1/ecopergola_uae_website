import { put, list } from "@vercel/blob";
import {
  CollectionMap,
  Navigation,
  Settings,
  RedirectItem,
  type CollectionName,
  type CollectionItemType,
} from "../schemas";
import type { ContentStore, AuditEntry } from "../types";

export class BlobContentAdapter implements ContentStore {
  readonly adapterName = "blob" as const;
  private readonly prefix = "content";

  async init(): Promise<void> {
    if (!process.env.BLOB_READ_WRITE_TOKEN) {
      console.warn(
        "[ContentStore:WARN] BlobContentAdapter selected but BLOB_READ_WRITE_TOKEN environment variable is missing."
      );
    } else {
      console.log("[ContentStore] Initialized BlobContentAdapter (Vercel Blob storage)");
    }
  }

  private getKey(collection: string): string {
    return `${this.prefix}/${collection}.json`;
  }

  private async fetchJson<T>(key: string): Promise<T | null> {
    try {
      const { blobs } = await list({ prefix: key, limit: 1 });
      const targetBlob = blobs.find((b) => b.pathname === key);
      if (!targetBlob) return null;
      const res = await fetch(targetBlob.url, { cache: "no-store" });
      if (!res.ok) return null;
      return (await res.json()) as T;
    } catch (err) {
      console.error(`[ContentStore:ERROR] Error fetching blob ${key}:`, err);
      return null;
    }
  }

  private async writeBlob(key: string, data: unknown, collection: string): Promise<void> {
    const jsonString = JSON.stringify(data, null, 2);

    // Save history snapshot before overwriting
    try {
      const existing = await this.fetchJson<unknown>(key);
      if (existing) {
        const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
        const snapshotKey = `${this.prefix}/.history/${collection}/${timestamp}.json`;
        await put(snapshotKey, JSON.stringify(existing, null, 2), {
          access: "public",
          contentType: "application/json",
          addRandomSuffix: false,
        });
      }
    } catch {
      // Snapshot fallback
    }

    await put(key, jsonString, {
      access: "public",
      contentType: "application/json",
      addRandomSuffix: false,
    });
  }

  private async logAudit(entry: Omit<AuditEntry, "id" | "timestamp">): Promise<void> {
    try {
      const auditKey = `${this.prefix}/.history/audit.json`;
      const listAudit = (await this.fetchJson<AuditEntry[]>(auditKey)) || [];
      const fullEntry: AuditEntry = {
        ...entry,
        id: crypto.randomUUID(),
        timestamp: new Date().toISOString(),
      };
      listAudit.unshift(fullEntry);
      if (listAudit.length > 500) listAudit.length = 500;
      await put(auditKey, JSON.stringify(listAudit, null, 2), {
        access: "public",
        contentType: "application/json",
        addRandomSuffix: false,
      });
    } catch (err) {
      console.warn("[ContentStore] Blob audit log failed:", err);
    }
  }

  async list<C extends CollectionName>(collection: C, includeDrafts = false): Promise<CollectionItemType<C>[]> {
    const raw = await this.fetchJson<unknown[]>(this.getKey(collection));
    if (!raw || !Array.isArray(raw)) return [];

    const schema = CollectionMap[collection];
    const validItems: CollectionItemType<C>[] = [];

    for (const rawItem of raw) {
      const result = schema.safeParse(rawItem);
      if (result.success) {
        const item = result.data as CollectionItemType<C>;
        if (includeDrafts || item.status === "published") {
          validItems.push(item);
        }
      }
    }

    return validItems.sort((a, b) => a.order - b.order);
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
    await this.writeBlob(this.getKey(collection), items, collection);

    await this.logAudit({
      action: "create",
      collection,
      itemId: id,
      user,
      summary: `Created ${collection} item "${id}" via Blob`,
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
      id: currentItem.id,
      createdAt: currentItem.createdAt,
      updatedAt: new Date().toISOString(),
    };

    const schema = CollectionMap[collection];
    const validated = schema.parse(updatedRaw) as CollectionItemType<C>;

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
    await this.writeBlob(this.getKey(collection), items, collection);

    await this.logAudit({
      action: "update",
      collection,
      itemId: id,
      user,
      summary: `Updated ${collection} item "${id}" via Blob`,
    });

    return validated;
  }

  async delete<C extends CollectionName>(collection: C, id: string, user = "admin"): Promise<boolean> {
    const items = await this.list(collection, true);
    const filtered = items.filter((item) => item.id !== id);
    if (filtered.length === items.length) return false;

    await this.writeBlob(this.getKey(collection), filtered, collection);
    await this.logAudit({
      action: "delete",
      collection,
      itemId: id,
      user,
      summary: `Deleted ${collection} item "${id}" via Blob`,
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

    for (const remaining of itemMap.values()) {
      remaining.order = reordered.length;
      reordered.push(remaining);
    }

    await this.writeBlob(this.getKey(collection), reordered, collection);
    await this.logAudit({
      action: "reorder",
      collection,
      user,
      summary: `Reordered ${collection} via Blob`,
    });
  }

  async getNavigation(): Promise<Navigation> {
    const raw = await this.fetchJson<unknown>(this.getKey("navigation"));
    if (!raw) throw new Error("Navigation not found in Blob");
    return Navigation.parse(raw);
  }

  async updateNavigation(navigation: Navigation, user = "admin"): Promise<Navigation> {
    const validated = Navigation.parse(navigation);
    await this.writeBlob(this.getKey("navigation"), validated, "navigation");
    await this.logAudit({ action: "update", collection: "navigation", user, summary: "Updated navigation via Blob" });
    return validated;
  }

  async getSettings(): Promise<Settings> {
    const raw = await this.fetchJson<unknown>(this.getKey("settings"));
    if (!raw) throw new Error("Settings not found in Blob");
    return Settings.parse(raw);
  }

  async updateSettings(settings: Settings, user = "admin"): Promise<Settings> {
    const validated = Settings.parse(settings);
    await this.writeBlob(this.getKey("settings"), validated, "settings");
    await this.logAudit({ action: "update", collection: "settings", user, summary: "Updated settings via Blob" });
    return validated;
  }

  async getRedirects(): Promise<RedirectItem[]> {
    const raw = await this.fetchJson<RedirectItem[]>(this.getKey("redirects"));
    return raw || [];
  }

  async addRedirect(redirect: RedirectItem): Promise<void> {
    const redirects = await this.getRedirects();
    redirects.unshift(redirect);
    await this.writeBlob(this.getKey("redirects"), redirects, "redirects");
  }

  async listHistory(collection: string): Promise<{ timestamp: string; filename: string }[]> {
    const prefix = `${this.prefix}/.history/${collection}/`;
    const { blobs } = await list({ prefix });
    return blobs
      .map((b) => {
        const filename = b.pathname.split("/").pop() || "";
        return {
          timestamp: filename.replace(".json", ""),
          filename,
        };
      })
      .reverse();
  }

  async restoreSnapshot(collection: string, filename: string, user = "admin"): Promise<void> {
    const key = `${this.prefix}/.history/${collection}/${filename}`;
    const raw = await this.fetchJson<unknown>(key);
    if (!raw) throw new Error(`Snapshot ${filename} not found in Blob`);
    await this.writeBlob(this.getKey(collection), raw, collection);
    await this.logAudit({
      action: "restore",
      collection,
      user,
      summary: `Restored snapshot ${filename} for ${collection} via Blob`,
    });
  }

  async getAuditLog(): Promise<AuditEntry[]> {
    const raw = await this.fetchJson<AuditEntry[]>(`${this.prefix}/.history/audit.json`);
    return raw || [];
  }
}
