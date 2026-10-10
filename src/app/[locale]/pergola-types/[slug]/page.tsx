import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { pergolaTypesData } from "@/data/pergola-types";
import { getLocalizedPergola, getLocalizedPergolaTypes } from "@/data/localizedData";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const pergola of pergolaTypesData) {
      params.push({ locale, slug: pergola.slug });
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
  const pergola = getLocalizedPergola(slug, locale) || pergolaTypesData.find((p) => p.slug === slug);
  if (!pergola) return {};

  const title = `${pergola.name} in Dubai | Custom Installation | Eco Pergola`;
  const description = pergola.description;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}pergola-types/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: pergola.image }],
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

  const pergola = getLocalizedPergola(slug, locale);
  if (!pergola) notFound();

  const tDetails = await getTranslations({ locale, namespace: "details" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("pergolaTypes"), url: `${siteConfig.domain}/pergola-types` },
    { name: pergola.name, url: `${siteConfig.domain}/pergola-types/${pergola.slug}` },
  ];

  const productSchema = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: pergola.name,
    description: pergola.longDescription,
    image: pergola.image,
    brand: {
      "@type": "Brand",
      name: siteConfig.name,
    },
    offers: {
      "@type": "AggregateOffer",
      priceCurrency: "AED",
      price: "15000",
      priceValidUntil: "2026-12-31",
      itemCondition: "https://schema.org/NewCondition",
      availability: "https://schema.org/InStock",
    },
  };

  const allPergolas = getLocalizedPergolaTypes(locale);
  const relatedPergolas = allPergolas
    .filter((p) => p.id !== pergola.id && (p.material === pergola.material || p.roofType === pergola.roofType))
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
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={pergola.image}
            alt={pergola.name}
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.28]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/65 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: tNav("pergolaTypes"), href: "/pergola-types" },
                { label: pergola.name },
              ]}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-xs font-bold uppercase tracking-widest text-brass">
                {locale === "ar" ? "طراز مظلة مخصص" : locale === "fr" ? "Modèle de Pergola sur Mesure" : "Custom Pergola Style"}
              </span>
              {pergola.badge && (
                <Badge variant="brass" className="text-[10px] font-bold">
                  {pergola.badge}
                </Badge>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight min-w-0 break-words text-balance">
              {pergola.name}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed max-w-2xl">
              {pergola.description}
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
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                  {locale === "ar" ? "التصميم الهندسي والمزايا" : locale === "fr" ? "Design Architectural & Caractéristiques" : "Architectural Design & Capabilities"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {pergola.longDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-5 p-6 sm:p-8 rounded-3xl bg-sand/40 dark:bg-card/40 border border-border">
                <h3 className="text-xl font-bold font-display text-foreground">
                  {tDetails("keyFeatures")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {pergola.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-forest dark:text-brass shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

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
                  {pergola.specs.map((spec, idx) => (
                    <div key={idx} className="flex justify-between items-center py-1.5 border-b border-border/40 gap-4">
                      <span className="text-muted-foreground font-medium shrink-0">{spec.label}</span>
                      <span className="font-bold text-foreground text-right rtl:text-left truncate max-w-[200px]">{spec.value}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-2 space-y-3">
                  <Button asChild variant="brass" className="w-full rounded-xl font-bold shadow-md">
                    <Link href="/contact">
                      <span>{tDetails("requestQuote")}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 rtl:rotate-180 rtl:mr-1.5 rtl:ml-0" />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" className="w-full rounded-xl font-semibold">
                    <a
                      href={siteConfig.whatsappUrl}
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
                    {relatedPergolas.map((rel) => (
                      <Link
                        key={rel.id}
                        href={`/pergola-types/${rel.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-card transition-colors group"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={rel.image}
                            alt={rel.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-foreground group-hover:text-brass transition-colors block truncate">
                            {rel.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {rel.description}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* Global Contact Section */}
      <ContactSection />
    </>
  );
}
