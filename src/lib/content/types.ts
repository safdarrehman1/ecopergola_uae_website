import type {
  CollectionName,
  CollectionItemType,
  Navigation,
  Settings,
  RedirectItem,
} from "./schemas";

export interface AuditEntry {
  id: string;
  timestamp: string;
  action: "create" | "update" | "delete" | "reorder" | "import" | "restore";
  collection: string;
  itemId?: string;
  user: string;
  summary: string;
}

export interface ContentStore {
  readonly adapterName: "file" | "blob";
  init(): Promise<void>;
  list<C extends CollectionName>(collection: C, includeDrafts?: boolean): Promise<CollectionItemType<C>[]>;
  get<C extends CollectionName>(
    collection: C,
    idOrSlug: string,
    includeDrafts?: boolean
  ): Promise<CollectionItemType<C> | null>;
  create<C extends CollectionName>(
    collection: C,
    item: Omit<CollectionItemType<C>, "id" | "createdAt" | "updatedAt"> & { id?: string },
    user?: string
  ): Promise<CollectionItemType<C>>;
  update<C extends CollectionName>(
    collection: C,
    id: string,
    patch: Partial<CollectionItemType<C>>,
    user?: string
  ): Promise<CollectionItemType<C>>;
  delete<C extends CollectionName>(collection: C, id: string, user?: string): Promise<boolean>;
  reorder<C extends CollectionName>(collection: C, orderedIds: string[], user?: string): Promise<void>;
  getNavigation(): Promise<Navigation>;
  updateNavigation(navigation: Navigation, user?: string): Promise<Navigation>;
  getSettings(): Promise<Settings>;
  updateSettings(settings: Settings, user?: string): Promise<Settings>;
  getRedirects(): Promise<RedirectItem[]>;
  addRedirect(redirect: RedirectItem): Promise<void>;
  listHistory(collection: string): Promise<{ timestamp: string; filename: string }[]>;
  restoreSnapshot(collection: string, filename: string, user?: string): Promise<void>;
  getAuditLog(): Promise<AuditEntry[]>;
}
