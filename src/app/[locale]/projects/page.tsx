import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const title = isAr
    ? "معرض المشاريع والأعمال المنجزة | إيكو برجولا دبي"
    : isFr
    ? "Portfolio de Projets et Réalisations | Eco Pergola Dubaï"
    : "Featured Projects Portfolio | Facades, Pergolas, Sliders | Eco Pergola";

  const description = isAr
    ? "استكشف مشاريع إيكو برجولا المميزة في دبي: برج دبي مارينا الفاخر، مجمع الخليج التجاري، فلل نخلة جميرا الخاصة، وقصور تلال الإمارات."
    : isFr
    ? "Découvrez nos projets d'exception à Dubaï : Tour Dubai Marina, Business Bay, Villas de prestige Palm Jumeirah et Emirates Hills."
    : "Explore Eco Pergola's iconic projects across Dubai: Dubai Marina Luxury Tower, Business Bay Corporate Center, Palm Jumeirah Private Villa, and Emirates Hills.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}projects`,
    },
  };
}

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tProjects = await getTranslations({ locale, namespace: "projects" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("portfolio"), url: `${siteConfig.domain}/projects` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero Banner */}
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola completed projects"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("portfolio") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tProjects("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tProjects("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tProjects("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
