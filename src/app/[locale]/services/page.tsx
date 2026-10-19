import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { ServicesSection } from "@/components/sections/ServicesSection";
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
    ? "خدمات تصنيع الألمنيوم والزجاج في دبي | إيكو برجولا"
    : isFr
    ? "Services de Fabrication Aluminium & Verre Dubaï | Eco Pergola"
    : "Specialized Services | Aluminum & Glass Fabrication Dubai | Eco Pergola";

  const description = isAr
    ? "استكشف خدماتنا المعمارية المتخصصة: تصميم الواجهات، أبواب منزلقة دقيقة، مباني مستدامة، غرف زجاجية، استشارات هندسية وتصنيع مخصص في دبي."
    : isFr
    ? "Découvrez nos 8 services spécialisés : Conception de façades, Portes coulissantes minimalistes, Bâtiments durables, Extensions vitrées et Usinage aluminium."
    : "Explore our 8 specialized architectural services: Facade Design, Minimal Sliding Doors, Sustainable Buildings, Glass Rooms, Design Consultancy, and Bespoke Aluminum Fabrication.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}services`,
    },
  };
}

import { getCollection, getSiteSettings } from "@/lib/content/store";

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tServices, tNav, services, settings] = await Promise.all([
    getTranslations({ locale, namespace: "services" }),
    getTranslations({ locale, namespace: "nav" }),
    getCollection("services"),
    getSiteSettings(),
  ]);

  const publishedServices = services.filter((s) => s.status === "published");

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("services"), url: `${siteConfig.domain}/services` },
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
          <Breadcrumb items={[{ label: tNav("services") }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
              {tServices("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
              {tServices("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection services={publishedServices} showAll={true} />

      {/* Contact Consultation */}
      <ContactSection settings={settings} />
    </>
  );
}
