import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { AboutSection } from "@/components/sections/AboutSection";
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
    ? "من نحن | إيكو برجولا لتصنيع الألمنيوم والزجاج في دبي"
    : isFr
    ? "À Propos de Nous | Eco Pergola Dubaï"
    : "About Us | Eco Pergola Aluminum & Glass Fabrication Dubai";

  const description = isAr
    ? "أكثر من 10 سنوات من التميز المعماري في دبي. متخصصون في الواجهات عالية الأداء، البرجولات البيوكليماتيك الفاخرة، وأنظمة الأبواب المنزلقة الدقيقة بجودة معتمدة ISO."
    : isFr
    ? "Plus de 10 ans d'excellence architecturale à Dubaï. Spécialistes des façades haute performance, pergolas bioclimatiques et coulissants minimaux certifiés ISO."
    : "Over 10+ years of architectural excellence in Dubai. Specializing in high-performance facades, luxury bioclimatic pergolas, and minimal sliding systems with ISO certified engineering.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}about`,
    },
  };
}

import { getCollection, getSiteSettings } from "@/lib/content/store";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tAbout, tNav, stats, certifications, partners, settings] = await Promise.all([
    getTranslations({ locale, namespace: "about" }),
    getTranslations({ locale, namespace: "nav" }),
    getCollection("stats"),
    getCollection("certifications"),
    getCollection("partners"),
    getSiteSettings(),
  ]);

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("about"), url: `${siteConfig.domain}/about` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero Banner */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-[#F8FAFC] via-[#F1F5F9] to-[#FFFFFF] text-stone-900 border-b border-stone-200/60 overflow-hidden">
        {/* Soft Ambient Architectural Light Rays & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-[#34AA49]/15 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-stone-300/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("about") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-emerald-300/80 text-[11px] font-mono tracking-widest uppercase text-emerald-950 font-semibold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
              {tAbout("heroEyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-stone-900 tracking-tight leading-[1.12]">
              {tAbout("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {tAbout("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* About Main Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
