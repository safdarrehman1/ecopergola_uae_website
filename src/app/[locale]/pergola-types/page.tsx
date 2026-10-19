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
      <section className="relative py-20 sm:py-24 bg-[#0B0F19] text-white border-b border-white/10 overflow-hidden">
        {/* Ambient Dark Glows & Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#34AA49]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("pergolaTypes") }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
              {tPergola("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
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
