import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { BlogTeaserSection } from "@/components/sections/BlogTeaserSection";
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
    ? "المدونة والمعرفة المعمارية | إيكو برجولا دبي"
    : isFr
    ? "Blog & Perspectives Architecturales | Eco Pergola Dubaï"
    : "Latest Insights & Architectural Knowledge | Eco Pergola Dubai";

  const description = isAr
    ? "دليل شامل حول الأبواب المنزلقة الدقيقة، هندسة الواجهات المستدامة، ومستقبل العمارة الزجاجية في مشاريع دبي الفاخرة."
    : isFr
    ? "Articles et guides complets sur les baies coulissantes minimales, les façades durables et l'architecture vitrée à Dubaï."
    : "Read in-depth guides on minimal sliding doors, sustainable facade engineering, and the future of glass architecture in Dubai's luxury sector.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}blog`,
    },
  };
}

import { getSiteSettings } from "@/lib/content/store";

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tBlog, tNav, settings] = await Promise.all([
    getTranslations({ locale, namespace: "blog" }),
    getTranslations({ locale, namespace: "nav" }),
    getSiteSettings(),
  ]);

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("blog"), url: `${siteConfig.domain}/blog` },
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
          <Breadcrumb items={[{ label: tNav("blog") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-300/80 text-[11px] font-mono tracking-widest uppercase text-amber-900 font-semibold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
              {tBlog("heroEyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-stone-900 tracking-tight leading-[1.12]">
              {tBlog("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {tBlog("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <BlogTeaserSection />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
