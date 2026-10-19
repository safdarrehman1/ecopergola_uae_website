import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
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
  const projects = await getCollection("projects");
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of projects) {
      if (project.slug) {
        params.push({ locale, slug: project.slug });
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
  const project = await getItem("projects", slug);
  if (!project) return {};

  const title = loc(project.title, locale);
  const location = loc(project.location, locale);
  const summary = loc(project.summary, locale);
  const metaTitle = loc(project.seo?.metaTitle, locale) || `${title} | Case Study | Eco Pergola Dubai`;
  const metaDescription = loc(project.seo?.metaDescription, locale) || `${title} in ${location} (${project.year}). ${summary}`;
  const ogImg = locMedia(project.seo?.ogImage || project.image, locale);

  return {
    title: metaTitle,
    description: metaDescription,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}projects/${slug}`,
    },
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      images: [{ url: ogImg.src, alt: ogImg.alt }],
    },
  };
}

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [project, allServices, settings, tDetails, tNav] = await Promise.all([
    getItem("projects", slug),
    getCollection("services"),
    getSiteSettings(),
    getTranslations({ locale, namespace: "details" }),
    getTranslations({ locale, namespace: "nav" }),
  ]);

  if (!project || project.status !== "published") {
    notFound();
  }

  const title = loc(project.title, locale);
  const category = loc(project.category, locale);
  const location = loc(project.location, locale);
  const summary = loc(project.summary, locale);
  const fullNarrative = loc(project.fullNarrative, locale) || summary;
  const mainImage = locMedia(project.image, locale);

  const galleryImages = (project.gallery || []).map((m) => locMedia(m, locale));
  const allImages = [mainImage, ...galleryImages.filter((g) => g.src !== mainImage.src)];

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("portfolio"), url: `${siteConfig.domain}/projects` },
    { name: title, url: `${siteConfig.domain}/projects/${project.slug}` },
  ];

  // Authentic Schema.org CaseStudy/Article
  const projectSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description: summary,
    image: mainImage.src,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
    },
    datePublished: `${project.year}-01-01`,
  };

  const relatedServices = allServices.filter(
    (s) => s.status === "published" && (project.relatedServiceIds || []).includes(s.id)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(projectSchema) }}
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
                { label: tNav("portfolio"), href: "/projects" },
                { label: title },
              ]}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-3">
              <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/15 text-emerald-400 text-[11px] font-mono tracking-widest uppercase font-semibold">
                {category}
              </span>
              <span className="text-xs text-slate-400 flex items-center gap-1 font-medium">
                <MapPin className="h-3.5 w-3.5 text-emerald-400" />
                {location}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight min-w-0 break-words text-balance">
              {title}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-2xl">
              {summary}
            </p>
          </div>
        </div>
      </section>

      {/* Case Study Content */}
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
                          alt={img.alt || `${title} photo ${idx + 1}`}
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
                  {locale === "ar" ? "تفاصيل المشروع والتنفيذ الهندسي" : locale === "fr" ? "Étude de Cas & Réalisation Technique" : "Project Narrative & Architectural Execution"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {fullNarrative}
                </p>
              </div>

              {/* Engineering Scope */}
              {project.scope && project.scope.length > 0 && (
                <div className="space-y-5 p-6 sm:p-8 rounded-3xl bg-sand/40 dark:bg-card/40 border border-border">
                  <h3 className="text-xl font-bold font-display text-foreground">
                    {locale === "ar" ? "نطاق العمل والتنفيذ الهندسي" : locale === "fr" ? "Périmètre des Travaux & Ingénierie" : "Engineering Scope & Capabilities"}
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {project.scope.map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                        <CheckCircle2 className="h-4 w-4 text-forest dark:text-brass shrink-0 mt-0.5" />
                        <span className="leading-snug">{loc(item, locale)}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>

            {/* Right Sticky Sidebar */}
            <aside className="w-full lg:sticky lg:top-28 space-y-6">
              {/* Project Metadata Card */}
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-xl space-y-5">
                <div className="border-b border-border pb-3">
                  <span className="text-[11px] font-bold uppercase tracking-widest text-brass block">
                    {locale === "ar" ? "بيانات المشروع" : locale === "fr" ? "Données Clés du Projet" : "Project Profile"}
                  </span>
                  <h3 className="text-lg font-bold font-display text-foreground mt-1">
                    {locale === "ar" ? "ملخص المشروع" : locale === "fr" ? "Fiche Technique" : "Project Summary"}
                  </h3>
                </div>

                <div className="space-y-3 text-xs sm:text-sm">
                  <div className="flex justify-between py-1.5 border-b border-border/40 gap-4">
                    <span className="text-muted-foreground">{locale === "ar" ? "الموقع" : locale === "fr" ? "Localisation" : "Location"}</span>
                    <span className="font-bold text-foreground text-right rtl:text-left">{location}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/40 gap-4">
                    <span className="text-muted-foreground">{locale === "ar" ? "سنة الإنجاز" : locale === "fr" ? "Année" : "Year"}</span>
                    <span className="font-bold text-foreground text-right rtl:text-left">{project.year}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/40 gap-4">
                    <span className="text-muted-foreground">{locale === "ar" ? "الفئة" : locale === "fr" ? "Catégorie" : "Category"}</span>
                    <span className="font-bold text-foreground text-right rtl:text-left">{category}</span>
                  </div>
                </div>

                {/* Materials Specs */}
                {project.materials && project.materials.length > 0 && (
                  <div className="pt-2 border-t border-border space-y-2">
                    <div className="text-xs font-bold text-brass uppercase tracking-wider mb-2">
                      {locale === "ar" ? "المواد والأنظمة المعمارية" : locale === "fr" ? "Matériaux & Systèmes Utilisés" : "Materials & Architectural Systems"}
                    </div>
                    {project.materials.map((mat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs py-1 border-b border-border/30">
                        <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0" />
                        <span className="font-semibold text-foreground">{loc(mat, locale)}</span>
                      </div>
                    ))}
                  </div>
                )}

                <div className="pt-2 space-y-3">
                  <Button asChild variant="brass" className="w-full rounded-xl font-bold shadow-md">
                    <a href="#contact">
                      <span>{tDetails("requestQuote")}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 rtl:rotate-180 rtl:mr-1.5 rtl:ml-0" />
                    </a>
                  </Button>
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="p-6 rounded-3xl bg-sand/30 dark:bg-card/40 border border-border space-y-4">
                  <h4 className="text-sm font-bold font-display text-foreground uppercase tracking-wider text-brass">
                    {tNav("services")}
                  </h4>
                  <div className="space-y-3">
                    {relatedServices.map((srv) => {
                      const sTitle = loc(srv.title, locale);
                      const sImg = locMedia(srv.image, locale);
                      return (
                        <Link
                          key={srv.id}
                          href={`/services/${srv.slug}`}
                          className="flex items-center gap-3 p-2 rounded-xl hover:bg-card transition-colors group"
                        >
                          <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                            <Image
                              src={sImg.src}
                              alt={sImg.alt || sTitle}
                              fill
                              className="object-cover"
                            />
                          </div>
                          <div className="min-w-0">
                            <span className="text-xs font-bold text-foreground group-hover:text-brass transition-colors block truncate">
                              {sTitle}
                            </span>
                            <span className="text-[11px] text-muted-foreground line-clamp-1">
                              {loc(srv.summary, locale)}
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
