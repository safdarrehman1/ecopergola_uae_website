import fs from "fs";
import path from "path";
import {
  CollectionMap,
  Navigation,
  Settings,
  type CollectionName,
} from "./schemas";

export interface ValidationIssue {
  type: "error" | "warning";
  collection: string;
  itemId?: string;
  field?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: ValidationIssue[];
  warnings: ValidationIssue[];
}

export function validateAllContent(contentDir = path.join(process.cwd(), "content")): ValidationResult {
  const issues: ValidationIssue[] = [];

  if (!fs.existsSync(contentDir)) {
    return {
      valid: false,
      errors: [
        {
          type: "error",
          collection: "all",
          message: `Content directory does not exist: ${contentDir}`,
        },
      ],
      warnings: [],
    };
  }

  // 1. Validate Singletons (navigation.json & settings.json)
  const navPath = path.join(contentDir, "navigation.json");
  if (fs.existsSync(navPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(navPath, "utf-8"));
      const parsed = Navigation.safeParse(raw);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          issues.push({
            type: "error",
            collection: "navigation",
            field: issue.path.join("."),
            message: issue.message,
          });
        }
      }
    } catch (e) {
      issues.push({
        type: "error",
        collection: "navigation",
        message: `Failed to parse navigation.json: ${(e as Error).message}`,
      });
    }
  } else {
    issues.push({
      type: "error",
      collection: "navigation",
      message: "navigation.json is missing",
    });
  }

  const settingsPath = path.join(contentDir, "settings.json");
  if (fs.existsSync(settingsPath)) {
    try {
      const raw = JSON.parse(fs.readFileSync(settingsPath, "utf-8"));
      const parsed = Settings.safeParse(raw);
      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          issues.push({
            type: "error",
            collection: "settings",
            field: issue.path.join("."),
            message: issue.message,
          });
        }
      }
    } catch (e) {
      issues.push({
        type: "error",
        collection: "settings",
        message: `Failed to parse settings.json: ${(e as Error).message}`,
      });
    }
  } else {
    issues.push({
      type: "error",
      collection: "settings",
      message: "settings.json is missing",
    });
  }

  // Helper sets for cross-relational validation
  const existingFaqIds = new Set<string>();
  const existingServiceIds = new Set<string>();
  const existingPergolaSlugs = new Set<string>();
  const existingProjectSlugs = new Set<string>();

  // Pre-load IDs for cross reference checks
  const collections = Object.keys(CollectionMap) as CollectionName[];
  const rawCollectionData: Record<string, unknown[]> = {};

  for (const col of collections) {
    const colFile = path.join(contentDir, `${col}.json`);
    if (fs.existsSync(colFile)) {
      try {
        const raw = JSON.parse(fs.readFileSync(colFile, "utf-8"));
        if (Array.isArray(raw)) {
          rawCollectionData[col] = raw;
          for (const it of raw) {
            if (typeof it === "object" && it !== null) {
              const itemObj = it as { id?: string; slug?: string };
              if (col === "faqs" && itemObj.id) existingFaqIds.add(itemObj.id);
              if (col === "services") {
                if (itemObj.id) existingServiceIds.add(itemObj.id);
                if (itemObj.slug) existingServiceIds.add(itemObj.slug);
              }
              if (col === "pergola-types" && itemObj.slug) existingPergolaSlugs.add(itemObj.slug);
              if (col === "projects" && itemObj.slug) existingProjectSlugs.add(itemObj.slug);
            }
          }
        }
      } catch {
        // Handled below
      }
    }
  }

  // 2. Validate Every Collection
  for (const col of collections) {
    const colFile = path.join(contentDir, `${col}.json`);
    if (!fs.existsSync(colFile)) {
      issues.push({
        type: "error",
        collection: col,
        message: `${col}.json is missing`,
      });
      continue;
    }

    let items: unknown[];
    try {
      items = JSON.parse(fs.readFileSync(colFile, "utf-8"));
      if (!Array.isArray(items)) {
        issues.push({
          type: "error",
          collection: col,
          message: `${col}.json must contain a JSON array`,
        });
        continue;
      }
    } catch (e) {
      issues.push({
        type: "error",
        collection: col,
        message: `Failed to parse ${col}.json: ${(e as Error).message}`,
      });
      continue;
    }

    const seenSlugs = new Set<string>();
    const seenIds = new Set<string>();
    const schema = CollectionMap[col];

    for (let i = 0; i < items.length; i++) {
      const rawItem = items[i];
      const parsed = schema.safeParse(rawItem);

      if (!parsed.success) {
        for (const issue of parsed.error.issues) {
          issues.push({
            type: "error",
            collection: col,
            itemId: (rawItem as { id?: string })?.id || `index_${i}`,
            field: issue.path.join("."),
            message: issue.message,
          });
        }
        continue;
      }

      const item = parsed.data;

      // Uniqueness of ID
      if (seenIds.has(item.id)) {
        issues.push({
          type: "error",
          collection: col,
          itemId: item.id,
          message: `Duplicate ID '${item.id}' found in ${col}`,
        });
      } else {
        seenIds.add(item.id);
      }

      // Uniqueness of slug
      if (seenSlugs.has(item.slug)) {
        issues.push({
          type: "error",
          collection: col,
          itemId: item.id,
          field: "slug",
          message: `Duplicate slug '${item.slug}' found in ${col}`,
        });
      } else {
        seenSlugs.add(item.slug);
      }

      // Alt text check on images
      const checkMedia = (media: { src?: string; alt?: { en?: string } } | undefined, fieldName: string) => {
        if (!media) return;
        if (!media.alt || !media.alt.en || media.alt.en.trim() === "") {
          issues.push({
            type: "error",
            collection: col,
            itemId: item.id,
            field: `${fieldName}.alt.en`,
            message: `Alt text is required for image ${media.src}`,
          });
        }
        // Local image existence check
        if (media.src && media.src.startsWith("/") && !media.src.startsWith("//")) {
          const localPath = path.join(process.cwd(), "public", media.src);
          if (!fs.existsSync(localPath)) {
            issues.push({
              type: "warning",
              collection: col,
              itemId: item.id,
              field: `${fieldName}.src`,
              message: `Local image file not found on disk: ${media.src}`,
            });
          }
        }
      };

      if ("image" in item) {
        checkMedia(item.image as { src?: string; alt?: { en?: string } }, "image");
      }
      if ("gallery" in item && Array.isArray(item.gallery)) {
        (item.gallery as { src?: string; alt?: { en?: string } }[]).forEach((m, idx) => {
          checkMedia(m, `gallery[${idx}]`);
        });
      }

      // SEO checks
      if (item.seo?.metaTitle?.en && item.seo.metaTitle.en.length > 60) {
        issues.push({
          type: "warning",
          collection: col,
          itemId: item.id,
          field: "seo.metaTitle.en",
          message: `Meta title is longer than 60 chars (${item.seo.metaTitle.en.length} chars)`,
        });
      }
      if (item.seo?.metaDescription?.en) {
        const len = item.seo.metaDescription.en.length;
        if (len < 120 || len > 170) {
          issues.push({
            type: "warning",
            collection: col,
            itemId: item.id,
            field: "seo.metaDescription.en",
            message: `Meta description recommended length is 140-160 chars (current: ${len} chars)`,
          });
        }
      }

      // Cross-relation checks
      if ("faqIds" in item && Array.isArray(item.faqIds)) {
        for (const faqId of item.faqIds as string[]) {
          if (!existingFaqIds.has(faqId)) {
            issues.push({
              type: "warning",
              collection: col,
              itemId: item.id,
              field: "faqIds",
              message: `Referenced FAQ ID '${faqId}' does not exist in faqs.json`,
            });
          }
        }
      }

      if ("relatedServiceIds" in item && Array.isArray(item.relatedServiceIds)) {
        for (const sId of item.relatedServiceIds as string[]) {
          if (!existingServiceIds.has(sId)) {
            issues.push({
              type: "warning",
              collection: col,
              itemId: item.id,
              field: "relatedServiceIds",
              message: `Referenced service ID/slug '${sId}' does not exist in services.json`,
            });
          }
        }
      }
    }
  }

  const errors = issues.filter((i) => i.type === "error");
  const warnings = issues.filter((i) => i.type === "warning");

  return {
    valid: errors.length === 0,
    errors,
    warnings,
  };
}
