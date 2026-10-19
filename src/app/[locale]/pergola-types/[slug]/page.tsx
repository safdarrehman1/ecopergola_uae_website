import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { CheckCircle2, ArrowRight, ShieldCheck, Download, Layers } from "lucide-react";
import { getCollection, getItem, getSiteSettings } from "@/lib/content/store";
import { loc, locMedia } from "@/lib/content/utils";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";

export const dynamicParams = true;

export async function generateStaticParams() {
  const pergolas = await getCollection("pergola-types");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const pergola of pergolas) {
      if (pergola.slug) {
        params.push({ locale, slug: pergola.slug });
      }
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const pergola = await getItem("pergola-types", slug);
  if (!pergola) return {};

  const name = loc(pergola.name, locale);
  const description = loc(pergola.description, locale);
  const metaTitle = loc(pergola.seo?.metaTitle, locale) || `${name} in Dubai | Custom Luxury Pergola | Eco Pergola`;
  const metaDescription = loc(pergola.seo?.metaDescription, locale) || description;
  const ogImg = locMedia(pergola.seo?.ogImage || pergola.image, locale);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}pergola-types/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [{ url: ogImg.src, alt: ogImg.alt }],
    },
  };
}

export default async function PergolaDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [pergola, allPergolas, settings, tDetails, tNav, tCommon] = await Promise.all([
    getItem("pergola-types", slug),
    getCollection("pergola-types"),
    getSiteSettings(),
    getTranslations({ locale, namespace: "details" }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  if (!pergola || pergola.status !== "published") {
    notFound();
  }

  const name = loc(pergola.name, locale);
  const badge = loc(pergola.badge, locale);
  const description = loc(pergola.description, locale);
  const longDescription = loc(pergola.longDescription, locale);
  const mainImage = locMedia(pergola.image, locale);

  const galleryImages = (pergola.gallery || []).map((m) => locMedia(m, locale));
  const allImages = [mainImage, ...galleryImages.filter((g) => g.src !== mainImage.src)];

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("pergolaTypes"), url: `${siteConfig.domain}/pergola-types` },
    { name, url: `${siteConfig.domain}/pergola-types/${pergola.slug}` },
  ];

  // Authentic Schema.org Product without fake AggregateOffer price
  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name,
    description: longDescription || description,
    image: mainImage.src,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    category: "Outdoor Architectural Pergolas",
  };

  const relatedPergolas = allPergolas
    .filter(
      (p) =>
        p.id !== pergola.id &&
        p.status === "published" &&
        (p.roofType === pergola.roofType ||
          p.material.some((m) => pergola.material.includes(m)))
    )
    .slice(0, 3);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(productSchema) }}
      />

      {/* Hero Header */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#FFFFFF] text-stone-900 border-b border-stone-200/60 overflow-hidden">
        {/* Soft Ambient Architectural Light Rays & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#34AA49]/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-stone-300/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: tNav("pergolaTypes"), href: "/pergola-types" },
                { label: name },
              ]}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-emerald-300/80 text-[11px] font-mono tracking-widest uppercase text-emerald-950 font-semibold shadow-xs">
                <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
                {locale === "ar" ? "طراز مظلة مخصص" : locale === "fr" ? "Modèle de Pergola sur Mesure" : "Custom Pergola Style"}
              </span>
              {badge && (
                <Badge variant="brass" className="text-[10px] font-bold">
                  {badge}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-stone-900 leading-tight min-w-0 break-words text-balance">
              {name}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed max-w-2xl">
              {description}
            </p>
          </div>
        </div>
      </section>

      {/* Details & Specs Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 xl:gap-16 items-start">
            {/* Left Narrative Column */}
            <article className="min-w-0 w-full space-y-12">
              {/* Photo Gallery: Main + Thumbnails */}
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted border border-border">
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt || name}
                    fill
                    sizes="(max-width: 1024px) 100vw, 800px"
                    className="object-cover"
                  />
                </div>
                {allImages.length > 1 && (
                  <div className="grid grid-cols-4 gap-3">
                    {allImages.slice(0, 4).map((img, idx) => (
                      <div
                        key={idx}
                        className="relative aspect-[16/10] rounded-xl overflow-hidden bg-muted border border-border/80"
                      >
                        <Image
                          src={img.src}
                          alt={img.alt || `${name} view ${idx + 1}`}
                          fill
                          sizes="200px"
                          className="object-cover"
                        />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                  {locale === "ar" ? "التصميم الهندسي والمزايا" : locale === "fr" ? "Design Architectural & Caractéristiques" : "Architectural Design & Capabilities"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {longDescription || description}
                </p>
              </div>

              {/* Key Features */}
              {pergola.features && pergola.features.length > 0 && (
                <div className="space-y-5 p-6 sm:p-8 rounded-3xl bg-[#F8FAFC] border border-stone-200/90 shadow-sm">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {tDetails("keyFeatures")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {pergola.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                        <span className="leading-snug">{loc(feature, locale)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Climate & Engineering Callout */}
              <div className="p-6 sm:p-8 rounded-3xl bg-card border border-border space-y-4 shadow-sm">
                <span className="text-xs font-bold uppercase tracking-widest text-brass block">
                  {tDetails("climateEngineered")}
                </span>
                <h3 className="text-xl font-bold font-display text-foreground">
                  {tDetails("warrantyCoverage")}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {tDetails("climateDesc")} {tDetails("warrantyDesc")}
                </p>
              </div>
            </article>

            {/* Right Sticky Sidebar */}
            <aside className="w-full lg:sticky lg:top-28 space-y-6">
              {/* Technical Specifications Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xl space-y-5">
                <div className="border-b border-border pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brass block">
                    {locale === "ar" ? "معايير الهندسة والتصنيع" : locale === "fr" ? "Spécifications du Modèle" : "Style Specifications"}
                  </span>
                  <h3 className="text-lg font-bold font-display text-foreground mt-1">
                    {tDetails("technicalSpecs")}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  {pergola.specs && pergola.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 border-b border-border/40 gap-4">
                      <span className="text-muted-foreground font-medium shrink-0">{loc(spec.label, locale)}</span>
                      <span className="font-bold text-foreground text-right rtl:text-left truncate max-w-[200px]">{loc(spec.value, locale)}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-3">
                  <Button asChild variant="brass" className="w-full rounded-xl font-bold shadow-md">
                    <a href="#contact">
                      <span>{tDetails("requestQuote")}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 rtl:rotate-180 rtl:mr-1.5 rtl:ml-0" />
                    </a>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-xl font-semibold">
                    <a
                      href={settings.whatsapp ? `https://wa.me/${settings.whatsapp.replace(/[^0-9]/g, "")}` : siteConfig.whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{tCommon("whatsappUs")}</span>
                    </a>
                  </Button>
                </div>
              </div>

              {/* Related Pergolas */}
              {relatedPergolas.length > 0 && (
                <div className="p-6 rounded-3xl bg-sand/30 dark:bg-card/40 border border-border space-y-4">
                  <h4 className="text-sm font-bold font-display text-foreground uppercase tracking-wider text-brass">
                    {tDetails("relatedPergolas")}
                  </h4>
                  <div className="space-y-3">
                    {relatedPergolas.map((rel) => {
                      const relName = loc(rel.name, locale);
                      const relDesc = loc(rel.description, locale);
                      const relImg = locMedia(rel.image, locale);
                      return (
                        <Link
                          key={rel.id}
                          href={`/pergola-types/${rel.slug}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-card transition-colors group"
                        >
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={relImg.src}
                              alt={relImg.alt || relName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-foreground group-hover:text-brass transition-colors block truncate">
                              {relName}
                            </span>
                            <span className="text-[11px] text-muted-foreground line-clamp-1">
                              {relDesc}
                            </span>
                          </div>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Global Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
