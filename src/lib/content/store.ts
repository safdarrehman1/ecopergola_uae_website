import { unstable_cache, revalidateTag } from "next/cache";
import { revalidatePath } from "next/cache";
import type { ContentStore } from "./types";
import { FileContentAdapter } from "./adapters/file-adapter";
import { BlobContentAdapter } from "./adapters/blob-adapter";
import type {
  CollectionName,
  CollectionItemType,
  Navigation,
  Settings,
  RedirectItem,
} from "./schemas";

let storeInstance: ContentStore | null = null;

export function getContentStore(): ContentStore {
  if (!storeInstance) {
    const adapterType = (process.env.CONTENT_STORE || "file").toLowerCase();
    if (adapterType === "blob") {
      storeInstance = new BlobContentAdapter();
    } else {
      storeInstance = new FileContentAdapter();
    }
    // Asynchronous init running without blocking construction
    void storeInstance.init();
  }
  return storeInstance;
}

/**
 * Revalidates Next.js cache for a given collection and its public routes.
 */
export async function revalidateContent(collection: string, slug?: string): Promise<void> {
  try {
    revalidateTag(`content:${collection}`, "max");
    revalidateTag("content:all", "max");

    // Revalidate affected public routes
    const pathMap: Record<string, string> = {
      services: "/services",
      products: "/products",
      "pergola-types": "/pergola-types",
      projects: "/projects",
      posts: "/blog",
      faqs: "/faq",
      news: "/",
      settings: "/",
      navigation: "/",
    };

    const route = pathMap[collection];
    if (route) {
      for (const locale of ["en", "ar", "fr"]) {
        const fullPath = `/${locale}${route === "/" ? "" : route}`;
        revalidatePath(fullPath, "layout");
        if (slug) {
          revalidatePath(`${fullPath}/${slug}`, "page");
        }
      }
    }
    // Revalidate home page for any content change
    for (const locale of ["en", "ar", "fr"]) {
      revalidatePath(`/${locale}`, "page");
    }
  } catch (err) {
    console.warn("[ContentStore] Revalidation error:", err);
  }
}

/**
 * Public cached collection reader.
 */
export async function getCollection<C extends CollectionName>(
  collection: C,
  includeDrafts = false
): Promise<CollectionItemType<C>[]> {
  if (includeDrafts) {
    const store = getContentStore();
    return store.list(collection, true);
  }

  const cachedFn = unstable_cache(
    async () => {
      const store = getContentStore();
      return store.list(collection, false);
    },
    [`collection-${collection}`],
    {
      tags: [`content:${collection}`, "content:all"],
      revalidate: 3600,
    }
  );

  return cachedFn();
}

/**
 * Public cached single-item reader (by ID or slug).
 */
export async function getItem<C extends CollectionName>(
  collection: C,
  idOrSlug: string,
  includeDrafts = false
): Promise<CollectionItemType<C> | null> {
  const items = await getCollection(collection, includeDrafts);
  return items.find((it) => it.id === idOrSlug || it.slug === idOrSlug) || null;
}

/**
 * Public cached settings reader.
 */
export async function getSiteSettings(): Promise<Settings> {
  const cachedFn = unstable_cache(
    async () => {
      const store = getContentStore();
      return store.getSettings();
    },
    ["site-settings"],
    {
      tags: ["content:settings", "content:all"],
      revalidate: 3600,
    }
  );

  return cachedFn();
}

/**
 * Public cached navigation reader.
 */
export async function getSiteNavigation(): Promise<Navigation> {
  const cachedFn = unstable_cache(
    async () => {
      const store = getContentStore();
      return store.getNavigation();
    },
    ["site-navigation"],
    {
      tags: ["content:navigation", "content:all"],
      revalidate: 3600,
    }
  );

  return cachedFn();
}

/**
 * Public cached redirects reader.
 */
export async function getSiteRedirects(): Promise<RedirectItem[]> {
  const cachedFn = unstable_cache(
    async () => {
      const store = getContentStore();
      return store.getRedirects();
    },
    ["site-redirects"],
    {
      tags: ["content:redirects", "content:all"],
      revalidate: 3600,
    }
  );

  return cachedFn();
}
