import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { PergolaTypesSection } from "@/components/sections/PergolaTypesSection";
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
    ? "أنواع وتصاميم البرجولات في دبي | 19 طراز ومادة | إيكو برجولا"
    : isFr
    ? "Types et Modèles de Pergolas Dubaï | Eco Pergola"
    : "Pergola Types & Materials Dubai | 19 Luxury Styles | Eco Pergola";

  const description = isAr
    ? "اكتشف أكبر تشكيلة من البرجولات في دبي: ألمنيوم، بيوكليماتيك بشرائح ذكية، خشب طبيعي، فولاذ، أسقف متحركة وقواطع زجاجية مصممة لمناخ الإمارات."
    : isFr
    ? "Explorez la plus grande collection de pergolas à Dubaï : Aluminium, Bioclimatique à lames, Bois noble, Acier, Toiles rétractables et Verre."
    : "Explore Dubai's largest collection of custom pergolas: Aluminum, Bioclimatic Louvered, Wood, Steel, Retractable, Freestanding, Attached, and Glass Canopies.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}pergola-types`,
    },
  };
}

import { getCollection, getSiteSettings } from "@/lib/content/store";

export default async function PergolaTypesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tPergola, tNav, pergolas, materials, settings] = await Promise.all([
    getTranslations({ locale, namespace: "pergolaTypes" }),
    getTranslations({ locale, namespace: "nav" }),
    getCollection("pergola-types"),
    getCollection("materials"),
    getSiteSettings(),
  ]);

  const publishedPergolas = pergolas.filter((p) => p.status === "published");
  const publishedMaterials = materials.filter((m) => m.status === "published");

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("pergolaTypes"), url: `${siteConfig.domain}/pergola-types` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero Banner */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FFFFFF] text-stone-900 border-b border-stone-200/60 overflow-hidden">
        {/* Soft Ambient Architectural Light Rays & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-stone-300/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("pergolaTypes") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-300/80 text-[11px] font-mono tracking-widest uppercase text-amber-900 font-semibold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
              {tPergola("heroEyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-stone-900 tracking-tight leading-[1.12]">
              {tPergola("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {tPergola("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Pergola Grid & Comparison Table */}
      <PergolaTypesSection
        pergolas={publishedPergolas}
        materials={publishedMaterials}
        showAll={true}
      />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
