import { z } from "zod";

/**
 * Single source of truth for all content schemas across the Eco Pergola platform.
 * Supports multilingual localized strings (en required, ar and fr optional).
 */

export const Localized = z.object({
  en: z.string().min(1, "English content is required"),
  ar: z.string().optional(),
  fr: z.string().optional(),
});
export type Localized = z.infer<typeof Localized>;

export const Media = z.object({
  src: z.string().min(1, "Image source is required"),
  alt: Localized,
  width: z.number().optional(),
  height: z.number().optional(),
  blurDataURL: z.string().optional(),
});
export type Media = z.infer<typeof Media>;

export const Base = z.object({
  id: z.string().uuid("ID must be a valid UUID"),
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug must be lowercase alphanumeric with hyphens"),
  status: z.enum(["draft", "published"]).default("published"),
  featured: z.boolean().default(false),
  order: z.number().int(),
  verified: z.boolean().default(true), // false = claim awaiting client confirmation
  seo: z
    .object({
      metaTitle: Localized.optional(), // <= 60 chars recommended
      metaDescription: Localized.optional(), // 140-160 chars recommended
      ogImage: Media.optional(),
      noindex: z.boolean().default(false),
    })
    .default({ noindex: false }),
  createdAt: z.string().datetime(),
  updatedAt: z.string().datetime(),
});
export type Base = z.infer<typeof Base>;

export const Service = Base.extend({
  title: Localized,
  summary: Localized,
  body: Localized.optional(),
  icon: z.string().optional(),
  image: Media,
  gallery: z.array(Media).default([]),
  benefits: z.array(z.object({ title: Localized, text: Localized })).default([]),
  specs: z.array(z.object({ label: Localized, value: Localized })).default([]),
  features: z.array(Localized).default([]),
  faqIds: z.array(z.string()).default([]),
  relatedIds: z.array(z.string()).default([]),
  catalogPdf: z.string().optional(),
});
export type Service = z.infer<typeof Service>;

export const Product = Base.extend({
  category: Localized, // e.g. "PANORAMIC SLIDER"
  title: Localized,
  summary: Localized,
  image: Media,
  gallery: z.array(Media).default([]),
  specs: z.array(z.object({ label: Localized, value: Localized })).default([]),
  features: z.array(Localized).default([]),
  highlights: z.array(Localized).default([]), // short spec bullets like competitor hero
  catalogPdf: z.string().optional(),
});
export type Product = z.infer<typeof Product>;

export const PergolaType = Base.extend({
  name: Localized,
  badge: Localized.optional(), // Popular / Premium / Classic / Flexible
  description: Localized,
  longDescription: Localized.optional(),
  chips: z.array(Localized).max(4).default([]),
  material: z.array(
    z.enum(["aluminum", "wood", "steel", "vinyl", "fiberglass", "concrete", "fabric"])
  ),
  roofType: z
    .enum(["louvered", "fixed", "retractable", "gable", "arched", "flat", "none", "open-beam", "pitched"])
    .optional(),
  placement: z.enum(["freestanding", "attached", "corner", "flyover"]).optional(),
  image: Media,
  gallery: z.array(Media).default([]),
  specs: z.array(z.object({ label: Localized, value: Localized })).default([]),
  features: z.array(Localized).default([]),
  catalogPdf: z.string().optional(),
});
export type PergolaType = z.infer<typeof PergolaType>;

export const Material = Base.extend({
  name: Localized,
  tagline: Localized,
  description: Localized,
  image: Media.optional(),
  durabilityScore: z.number().min(1).max(10).optional(),
  maintenanceScore: z.number().min(1).max(10).optional(),
  costLevel: z.enum(["budget", "moderate", "premium", "luxury"]).default("premium"),
  windResistance: Localized.optional(),
  pros: z.array(Localized).default([]),
  cons: z.array(Localized).default([]),
  bestFor: Localized.optional(),
  lifespan: Localized.optional(),
});
export type Material = z.infer<typeof Material>;

export const Project = Base.extend({
  title: Localized,
  category: Localized,
  location: Localized,
  emirate: z
    .enum(["Dubai", "Abu Dhabi", "Sharjah", "Ajman", "Ras Al Khaimah", "Fujairah", "Umm Al Quwain"])
    .default("Dubai"),
  year: z.string(),
  summary: Localized,
  fullNarrative: Localized.optional(),
  image: Media,
  gallery: z.array(Media).default([]),
  beforeImage: Media.optional(),
  afterImage: Media.optional(),
  scope: z.array(Localized).default([]),
  materials: z.array(Localized).default([]),
  relatedServiceIds: z.array(z.string()).default([]),
  clientTestimonial: z
    .object({
      quote: Localized,
      author: Localized,
      role: Localized,
    })
    .optional(),
});
export type Project = z.infer<typeof Project>;

export const Testimonial = Base.extend({
  quote: Localized,
  name: Localized,
  role: Localized,
  location: Localized,
  rating: z.number().min(1).max(5).default(5),
  initials: z.string().optional(),
  date: z.string().optional(),
  source: z.string().optional(),
});
export type Testimonial = z.infer<typeof Testimonial>;

export const Faq = Base.extend({
  question: Localized,
  answer: Localized,
  category: Localized, // General, Installation, Warranty, Customization
  pages: z.array(z.string()).default(["general"]),
});
export type Faq = z.infer<typeof Faq>;

export const News = Base.extend({
  date: z.string(),
  monthYear: Localized,
  title: Localized,
  summary: Localized,
  badge: Localized,
  ctaText: Localized,
  ctaLink: z.string(),
  image: Media.optional(),
});
export type News = z.infer<typeof News>;

export const Post = Base.extend({
  title: Localized,
  excerpt: Localized,
  category: Localized,
  author: z.object({
    name: Localized,
    role: Localized,
    avatar: z.string().optional(),
  }),
  publishedAt: z.string(),
  readingTime: Localized,
  image: Media,
  tableOfContents: z.array(z.object({ id: z.string(), title: Localized })).default([]),
  content: Localized, // Markdown / MDX string
  tags: z.array(Localized).default([]),
});
export type Post = z.infer<typeof Post>;

export const Stat = Base.extend({
  value: z.string(),
  suffix: z.string().optional(),
  label: Localized,
  description: Localized.optional(),
});
export type Stat = z.infer<typeof Stat>;

export const Certification = Base.extend({
  title: Localized,
  issuer: Localized,
  number: z.string().optional(),
  file: z.string().optional(),
  image: Media.optional(),
  summary: Localized.optional(),
});
export type Certification = z.infer<typeof Certification>;

export const Partner = Base.extend({
  name: z.string(),
  category: z.enum(["Systems", "Glass", "Hardware", "Developers", "Consultants", "Contractors"]).default("Systems"),
  logo: Media,
  website: z.string().url().optional(),
  description: Localized.optional(),
});
export type Partner = z.infer<typeof Partner>;

export const TeamMember = Base.extend({
  name: Localized,
  role: Localized,
  bio: Localized.optional(),
  photo: Media,
  linkedin: z.string().url().optional(),
});
export type TeamMember = z.infer<typeof TeamMember>;

export const ProcessStep = Base.extend({
  stepNumber: z.number().int(),
  title: Localized,
  summary: Localized,
  description: Localized.optional(),
  icon: z.string().optional(),
  image: Media.optional(),
});
export type ProcessStep = z.infer<typeof ProcessStep>;

export const NavChild = z.object({
  label: Localized,
  href: z.string(),
  description: Localized.optional(),
  badge: Localized.optional(),
  image: Media.optional(),
  catalogPdf: z.string().optional(),
});
export type NavChild = z.infer<typeof NavChild>;

export const NavGroup = z.object({
  groupTitle: Localized,
  items: z.array(NavChild),
});
export type NavGroup = z.infer<typeof NavGroup>;

export const NavItem = z.object({
  id: z.string(),
  label: Localized,
  href: z.string(),
  featuredCard: z
    .object({
      title: Localized,
      description: Localized,
      href: z.string(),
      image: Media,
      cta: Localized,
    })
    .optional(),
  groups: z.array(NavGroup).default([]),
  children: z.array(NavChild).default([]),
});
export type NavItem = z.infer<typeof NavItem>;

export const Navigation = z.object({
  header: z.array(NavItem),
  footer: z.object({
    services: z.array(NavChild),
    pergolas: z.array(NavChild),
    company: z.array(NavChild),
    legal: z.array(NavChild),
  }),
});
export type Navigation = z.infer<typeof Navigation>;

export const Settings = z.object({
  name: z.string(),
  legalName: z.string(),
  tagline: Localized,
  description: Localized,
  domain: z.string(),
  canonicalUrl: z.string(),
  phone: z.string(),
  phoneDisplay: z.string(),
  whatsapp: z.string(),
  whatsappDisplay: z.string(),
  whatsappUrl: z.string(),
  email: z.string().email(),
  workingHours: z.object({
    days: Localized,
    hours: Localized,
    display: Localized,
    schema: z.string(),
  }),
  address: z.object({
    street: Localized,
    poBox: z.string(),
    city: Localized,
    region: z.string(),
    country: Localized,
    full: Localized,
  }),
  geo: z.object({
    latitude: z.number(),
    longitude: z.number(),
    region: z.string(),
    placename: z.string(),
  }),
  social: z.object({
    facebook: z.string().url().optional(),
    twitter: z.string().url().optional(),
    instagram: z.string().url().optional(),
    linkedin: z.string().url().optional(),
    youtube: z.string().url().optional(),
  }),
  announcementBar: z.object({
    enabled: z.boolean().default(true),
    text: Localized,
    link: z.string().optional(),
    badge: Localized.optional(),
  }),
  seo: z.object({
    defaultMetaTitle: Localized,
    defaultMetaDescription: Localized,
    ogImage: Media.optional(),
  }),
});
export type Settings = z.infer<typeof Settings>;

export const RedirectItem = z.object({
  source: z.string(),
  destination: z.string(),
  permanent: z.boolean().default(true),
  createdAt: z.string().datetime(),
});
export type RedirectItem = z.infer<typeof RedirectItem>;

export const CollectionMap = {
  services: Service,
  products: Product,
  "pergola-types": PergolaType,
  materials: Material,
  projects: Project,
  testimonials: Testimonial,
  faqs: Faq,
  news: News,
  posts: Post,
  stats: Stat,
  certifications: Certification,
  partners: Partner,
  team: TeamMember,
  process: ProcessStep,
} as const;

export type CollectionName = keyof typeof CollectionMap;
export type CollectionItemType<C extends CollectionName> = z.infer<(typeof CollectionMap)[C]>;
