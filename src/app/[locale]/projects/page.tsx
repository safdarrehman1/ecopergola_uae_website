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

import { getCollection, getSiteSettings } from "@/lib/content/store";

export default async function ProjectsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tProjects, tNav, projects, settings] = await Promise.all([
    getTranslations({ locale, namespace: "projects" }),
    getTranslations({ locale, namespace: "nav" }),
    getCollection("projects"),
    getSiteSettings(),
  ]);

  const publishedProjects = projects.filter((p) => p.status === "published");

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
      <section className="relative py-20 sm:py-24 bg-[#0B0F19] text-white border-b border-white/10 overflow-hidden">
        {/* Ambient Dark Glows & Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#34AA49]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("portfolio") }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
              {tProjects("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {tProjects("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <ProjectsSection projects={publishedProjects} showAll={true} />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
