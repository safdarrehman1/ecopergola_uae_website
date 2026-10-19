import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { CheckCircle2, ArrowRight } from "lucide-react";
import { getCollection, getItem, getSiteSettings } from "@/lib/content/store";
import { loc, locMedia } from "@/lib/content/utils";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";

export const dynamicParams = true;

export async function generateStaticParams() {
  const services = await getCollection("services");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const service of services) {
      if (service.slug) {
        params.push({ locale, slug: service.slug });
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
  const service = await getItem("services", slug);
  if (!service) return {};

  const title = loc(service.title, locale);
  const summary = loc(service.summary, locale);
  const metaTitle = loc(service.seo?.metaTitle, locale) || `${title} in Dubai | Eco Pergola UAE`;
  const metaDescription = loc(service.seo?.metaDescription, locale) || summary;
  const ogImg = locMedia(service.seo?.ogImage || service.image, locale);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}services/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [{ url: ogImg.src, alt: ogImg.alt }],
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

  const [service, allPergolas, allProjects, settings, tDetails, tNav, tCommon] = await Promise.all([
    getItem("services", slug),
    getCollection("pergola-types"),
    getCollection("projects"),
    getSiteSettings(),
    getTranslations({ locale, namespace: "details" }),
    getTranslations({ locale, namespace: "nav" }),
    getTranslations({ locale, namespace: "common" }),
  ]);

  if (!service || service.status !== "published") {
    notFound();
  }

  const title = loc(service.title, locale);
  const summary = loc(service.summary, locale);
  const body = loc(service.body, locale) || summary;
  const mainImage = locMedia(service.image, locale);

  const galleryImages = (service.gallery || []).map((m) => locMedia(m, locale));
  const allImages = [mainImage, ...galleryImages.filter((g) => g.src !== mainImage.src)];

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("services"), url: `${siteConfig.domain}/services` },
    { name: title, url: `${siteConfig.domain}/services/${service.slug}` },
  ];

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: title,
    provider: {
      "@type": "HomeAndConstructionBusiness",
      name: siteConfig.name,
      url: siteConfig.domain,
    },
    areaServed: {
      "@type": "AdministrativeArea",
      name: "Dubai, United Arab Emirates",
    },
    description: body || summary,
    image: mainImage.src,
  };

  const relatedPergolas = allPergolas
    .filter((p) => p.status === "published" && (service.relatedIds || []).includes(p.id))
    .slice(0, 3);

  const relatedProjects = allProjects
    .filter(
      (pr) =>
        pr.status === "published" &&
        ((pr.relatedServiceIds || []).includes(service.id) || (service.relatedIds || []).includes(pr.id))
    )
    .slice(0, 2);

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
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 bg-[#0B0F19] text-white border-b border-white/10 overflow-hidden">
        {/* Architectural Ambient Glow & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#34AA49]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: tNav("services"), href: "/services" },
                { label: title },
              ]}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight min-w-0 break-words text-balance">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {summary}
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
              {/* Photo Gallery: Main + Thumbnails */}
              <div className="space-y-4">
                <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-muted border border-border">
                  <Image
                    src={mainImage.src}
                    alt={mainImage.alt || title}
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
                          alt={img.alt || `${title} view ${idx + 1}`}
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
                  {locale === "ar" ? "نظرة عامة والتميز الهندسي" : locale === "fr" ? "Vue d'Ensemble & Ingénierie de Précision" : "Overview & Engineering Excellence"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {body}
                </p>
              </div>

              {/* Key Features */}
              {service.features && service.features.length > 0 && (
                <div className="space-y-5 p-6 sm:p-8 rounded-3xl bg-[#FAF8F5] border border-stone-200/90 shadow-sm">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {tDetails("keyFeatures")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {service.features.map((feature, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-brass shrink-0 mt-0.5" />
                        <span className="leading-snug">{loc(feature, locale)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Client Benefits */}
              {service.benefits && service.benefits.length > 0 && (
                <div className="space-y-5">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {locale === "ar" ? "المزايا الاستراتيجية" : locale === "fr" ? "Avantages Stratégiques" : "Strategic Advantages"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {service.benefits.map((benefit, idx) => (
                      <div key={idx} className="p-5 rounded-2xl bg-card border border-border space-y-1.5 shadow-sm">
                        <span className="text-xs font-bold text-brass uppercase tracking-wider block">
                          {loc(benefit.title, locale) || (locale === "ar" ? `الميزة ${idx + 1}` : `Advantage 0${idx + 1}`)}
                        </span>
                        <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                          {loc(benefit.text, locale)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Related Projects */}
              {relatedProjects.length > 0 && (
                <div className="space-y-6 pt-6 border-t border-border">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {tDetails("relatedProjects")}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {relatedProjects.map((proj) => {
                      const projTitle = loc(proj.title, locale);
                      const projLoc = loc(proj.location, locale);
                      const projImg = locMedia(proj.image, locale);
                      return (
                        <Link
                          key={proj.id}
                          href={`/projects/${proj.slug}`}
                          className="group rounded-2xl overflow-hidden bg-card border border-border shadow-sm hover:shadow-lg transition-all block"
                        >
                          <div className="relative h-44 w-full bg-muted">
                            <Image
                              src={projImg.src}
                              alt={projImg.alt || projTitle}
                              fill
                              sizes="(max-width: 768px) 100vw, 300px"
                              className="object-cover group-hover:scale-105 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4 space-y-1">
                            <h4 className="font-bold text-foreground text-sm group-hover:text-brass transition-colors">
                              {projTitle}
                            </h4>
                            <p className="text-xs text-muted-foreground truncate">
                              {projLoc} • {proj.year}
                            </p>
                          </div>
                        </Link>
                      );
                    })}
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
                  {service.specs && service.specs.map((spec, idx) => (
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

              {/* Related Pergolas Card */}
              {relatedPergolas.length > 0 && (
                <div className="p-6 rounded-3xl bg-sand/30 dark:bg-card/40 border border-border space-y-4">
                  <h4 className="text-sm font-bold font-display text-foreground uppercase tracking-wider text-brass">
                    {tDetails("relatedPergolas")}
                  </h4>
                  <div className="space-y-3">
                    {relatedPergolas.map((pergola) => {
                      const pName = loc(pergola.name, locale);
                      const pDesc = loc(pergola.description, locale);
                      const pImg = locMedia(pergola.image, locale);
                      return (
                        <Link
                          key={pergola.id}
                          href={`/pergola-types/${pergola.slug}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-card transition-colors group"
                        >
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={pImg.src}
                              alt={pImg.alt || pName}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-foreground group-hover:text-brass transition-colors block truncate">
                              {pName}
                            </span>
                            <span className="text-[11px] text-muted-foreground line-clamp-1">
                              {pDesc}
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
