import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { servicesData } from "@/data/services";
import { getLocalizedService, getLocalizedPergolaTypes, getLocalizedProjects } from "@/data/localizedData";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const service of servicesData) {
      params.push({ locale, slug: service.slug });
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
  const service = getLocalizedService(slug, locale) || servicesData.find((s) => s.slug === slug);
  if (!service) return {};

  const title = `${service.title} in Dubai | Eco Pergola UAE`;
  const description = service.shortDescription;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}services/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: service.image }],
    },
  };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const service = getLocalizedService(slug, locale);
  if (!service) notFound();

  const tDetails = await getTranslations({ locale, namespace: "details" });
  const tNav = await getTranslations({ locale, namespace: "nav" });
  const tCommon = await getTranslations({ locale, namespace: "common" });

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("services"), url: `${siteConfig.domain}/services` },
    { name: service.title, url: `${siteConfig.domain}/services/${service.slug}` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: service.title,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Dubai, United Arab Emirates",
    },
    description: service.fullDescription,
    image: service.image,
  };

  const allPergolas = getLocalizedPergolaTypes(locale);
  const allProjects = getLocalizedProjects(locale);

  const relatedPergolaItems = allPergolas.filter((p) =>
    service.relatedPergolas?.includes(p.id)
  );

  const relatedProjectItems = allProjects.filter((pr) =>
    service.relatedProjects?.includes(pr.id)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={service.image}
            alt={service.title}
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
                { label: tNav("services"), href: "/services" },
                { label: service.title },
              ]}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <span className="inline-block text-xs font-bold uppercase tracking-widest text-brass">
              {tNav("specializedServices")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight min-w-0 break-words text-balance">
              {service.title}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed max-w-2xl">
              {service.shortDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Main Content & Specs */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_360px] xl:grid-cols-[minmax(0,1fr)_400px] lg:gap-12 xl:gap-16 items-start">
            {/* Left Narrative Column */}
            <article className="min-w-0 w-full space-y-12">
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                  {locale === "ar" ? "نظرة عامة والتميز الهندسي" : locale === "fr" ? "Vue d'Ensemble & Ingénierie de Précision" : "Overview & Engineering Excellence"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {service.fullDescription}
                </p>
              </div>

              {/* Key Features */}
              <div className="space-y-5 p-6 sm:p-8 rounded-3xl bg-sand/40 dark:bg-card/40 border border-border">
                <h3 className="text-xl font-bold font-display text-foreground">
                  {tDetails("keyFeatures")}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {service.features.map((feature, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-forest dark:text-brass shrink-0 mt-0.5" />
                      <span className="leading-snug">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Client Benefits */}
              <div className="space-y-5">
                <h3 className="text-xl font-bold font-display text-foreground">
                  {locale === "ar" ? "المزايا الاستراتيجية" : locale === "fr" ? "Avantages Stratégiques" : "Strategic Advantages"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {service.benefits.map((benefit, idx) => (
                    <div key={idx} className="p-5 rounded-2xl bg-card border border-border space-y-1.5 shadow-sm">
                      <span className="text-xs font-bold text-brass uppercase tracking-wider block">
                        {locale === "ar" ? `الميزة ${idx + 1}` : locale === "fr" ? `Avantage 0${idx + 1}` : `Advantage 0${idx + 1}`}
                      </span>
                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Related Projects if available */}
              {relatedProjectItems.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-border">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {tDetails("relatedProjects")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedProjectItems.map((proj) => (
                      <Link
                        key={proj.id}
                        href={`/projects/${proj.slug}`}
                        className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all block"
                      >
                        <div className="relative h-44 w-full bg-muted">
                          <Image
                            src={proj.image}
                            alt={proj.title}
                            fill
                            sizes="(max-width: 768px) 100vw, 300px"
                            className="object-cover group-hover:scale-105 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-4 space-y-1">
                          <h4 className="font-bold text-foreground text-sm group-hover:text-brass transition-colors">
                            {proj.title}
                          </h4>
                          <p className="text-xs text-muted-foreground truncate">
                            {proj.location} • {proj.year}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Right Sticky Sidebar */}
            <aside className="w-full lg:sticky lg:top-28 space-y-6">
              {/* Technical Specifications Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xl space-y-5">
                <div className="border-b border-border pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brass block">
                    {locale === "ar" ? "معايير الهندسة والجودة" : locale === "fr" ? "Standards Techniques" : "Engineering Standards"}
                  </span>
                  <h3 className="text-lg font-bold font-display text-foreground mt-1">
                    {tDetails("technicalSpecs")}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  {service.specs.map((spec, idx) => (
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

              {/* Related Pergola Styles Card */}
              {relatedPergolaItems.length > 0 && (
                <div className="p-6 rounded-3xl bg-sand/30 dark:bg-card/40 border border-border space-y-4">
                  <h4 className="text-sm font-bold font-display text-foreground uppercase tracking-wider text-brass">
                    {tDetails("relatedPergolas")}
                  </h4>
                  <div className="space-y-3">
                    {relatedPergolaItems.slice(0, 3).map((pergola) => (
                      <Link
                        key={pergola.id}
                        href={`/pergola-types/${pergola.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-card transition-colors group"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={pergola.image}
                            alt={pergola.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-foreground group-hover:text-brass transition-colors block truncate">
                            {pergola.name}
                          </span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {pergola.description}
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
