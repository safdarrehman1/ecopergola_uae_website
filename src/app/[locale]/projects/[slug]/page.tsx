import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { MapPin, CheckCircle2, ArrowRight } from "lucide-react";
import { projectsData } from "@/data/projects";
import { getLocalizedProject, getLocalizedServices } from "@/data/localizedData";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const project of projectsData) {
      params.push({ locale, slug: project.slug });
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
  const project = getLocalizedProject(slug, locale) || projectsData.find((p) => p.slug === slug);
  if (!project) return {};

  const title = `${project.title} | Case Study | Eco Pergola Dubai`;
  const description = `${project.title} in ${project.location} (${project.year}). ${project.description}.`;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}projects/${slug}`,
    },
    openGraph: {
      title,
      description,
      images: [{ url: project.image }],
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

  const project = getLocalizedProject(slug, locale);
  if (!project) notFound();

  const tDetails = await getTranslations({ locale, namespace: "details" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("portfolio"), url: `${siteConfig.domain}/projects` },
    { name: project.title, url: `${siteConfig.domain}/projects/${project.slug}` },
  ];

  const allServices = getLocalizedServices(locale);
  const relatedServices = allServices.filter((s) =>
    project.relatedServices.includes(s.id)
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero Header */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-24 lg:pt-44 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
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
                { label: tNav("portfolio"), href: "/projects" },
                { label: project.title },
              ]}
            />
          </div>

          <div className="max-w-3xl space-y-4">
            <div className="flex items-center gap-2">
              <Badge variant="brass" className="text-[10px] font-bold uppercase tracking-wider">
                {project.category}
              </Badge>
              <span className="text-xs text-sand-dark flex items-center gap-1">
                <MapPin className="h-3.5 w-3.5 text-brass" />
                {project.location}
              </span>
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight min-w-0 break-words text-balance">
              {project.title}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed max-w-2xl">
              {project.description}
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
              <div className="space-y-4">
                <h2 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
                  {locale === "ar" ? "تفاصيل المشروع والتنفيذ الهندسي" : locale === "fr" ? "Étude de Cas & Réalisation Technique" : "Project Narrative & Architectural Execution"}
                </h2>
                <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                  {project.fullNarrative}
                </p>
              </div>

              {/* Gallery Grid */}
              <div className="space-y-4">
                <h3 className="text-xl font-bold font-display text-foreground">
                  {locale === "ar" ? "معرض صور المشروع" : locale === "fr" ? "Galerie du Projet" : "Project Gallery"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {project.gallery.map((img, idx) => (
                    <div
                      key={idx}
                      className="relative h-60 rounded-2xl overflow-hidden bg-muted border border-border shadow-sm"
                    >
                      <Image
                        src={img}
                        alt={`${project.title} photo ${idx + 1}`}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* Engineering Scope */}
              <div className="space-y-5 p-6 sm:p-8 rounded-3xl bg-sand/40 dark:bg-card/40 border border-border">
                <h3 className="text-xl font-bold font-display text-foreground">
                  {locale === "ar" ? "نطاق العمل والتنفيذ الهندسي" : locale === "fr" ? "Périmètre des Travaux & Ingénierie" : "Engineering Scope & Capabilities"}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {project.scope.map((item, idx) => (
                    <div key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-foreground">
                      <CheckCircle2 className="h-4 w-4 text-forest dark:text-brass shrink-0 mt-0.5" />
                      <span className="leading-snug">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
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
                    <span className="font-bold text-foreground text-right rtl:text-left">{project.location}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/40 gap-4">
                    <span className="text-muted-foreground">{locale === "ar" ? "سنة الإنجاز" : locale === "fr" ? "Année" : "Year"}</span>
                    <span className="font-bold text-foreground text-right rtl:text-left">{project.year}</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-border/40 gap-4">
                    <span className="text-muted-foreground">{locale === "ar" ? "الفئة" : locale === "fr" ? "Catégorie" : "Category"}</span>
                    <span className="font-bold text-foreground text-right rtl:text-left">{project.category}</span>
                  </div>
                </div>

                {/* Materials Specs */}
                <div className="pt-2 border-t border-border space-y-2">
                  <div className="text-xs font-bold text-brass uppercase tracking-wider mb-2">
                    {locale === "ar" ? "المواد والأنظمة المعمارية" : locale === "fr" ? "Matériaux & Systèmes Utilisés" : "Materials & Architectural Systems"}
                  </div>
                  {project.materials.map((mat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-xs py-1 border-b border-border/30">
                      <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0" />
                      <span className="font-semibold text-foreground">{mat}</span>
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
                </div>
              </div>

              {/* Related Services */}
              {relatedServices.length > 0 && (
                <div className="p-6 rounded-3xl bg-sand/30 dark:bg-card/40 border border-border space-y-4">
                  <h4 className="text-sm font-bold font-display text-foreground uppercase tracking-wider text-brass">
                    {tNav("services")}
                  </h4>
                  <div className="space-y-3">
                    {relatedServices.map((srv) => (
                      <Link
                        key={srv.id}
                        href={`/services/${srv.slug}`}
                        className="flex items-center gap-3 p-2 rounded-xl hover:bg-card transition-colors group"
                      >
                        <div className="relative h-12 w-12 rounded-lg overflow-hidden shrink-0">
                          <Image
                            src={srv.image}
                            alt={srv.title}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="min-w-0">
                          <span className="text-xs font-bold text-foreground group-hover:text-brass transition-colors block truncate">
                            {srv.title}
                          </span>
                          <span className="text-[11px] text-muted-foreground line-clamp-1">
                            {srv.shortDescription}
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
