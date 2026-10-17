import type { Localized, Media } from "./schemas";

/**
 * Safely resolves a localized string or object to the specified locale, falling back to English.
 */
export function loc(
  field?: Localized | string | null,
  locale: string = "en"
): string {
  if (!field) return "";
  if (typeof field === "string") return field;
  const l = locale as "en" | "ar" | "fr";
  return field[l] || field.en || Object.values(field)[0] || "";
}

/**
 * Resolves a Media object to image src and localized alt text.
 */
export function locMedia(
  media?: Media | { src: string; alt?: Localized | string } | null,
  locale: string = "en"
): { src: string; alt: string } {
  if (!media || !media.src) {
    return {
      src: "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format&fit=crop",
      alt: "Eco Pergola",
    };
  }
  return {
    src: media.src,
    alt: loc(media.alt, locale),
  };
}
