import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
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
    ? "اتصل بنا واحصل على استشارة مجانية | إيكو برجولا دبي"
    : isFr
    ? "Contactez-Nous & Devis Gratuit | Eco Pergola Dubaï"
    : "Contact Us & Free Consultation | Eco Pergola Dubai";

  const description = isAr
    ? "تواصل مع إيكو برجولا لتصنيع وتركيب البرجولات الفاخرة، الواجهات الزجاجية، والأبواب المنزلقة الدقيقة في دبي. تفضل بزيارة صالة العرض أو اطلب معاينة مجانية."
    : isFr
    ? "Contactez Eco Pergola pour vos projets de pergolas en aluminium, façades vitrées et coulissants minimalistes à Dubaï. Visitez notre showroom ou demandez un devis gratuit."
    : "Contact Eco Pergola for luxury aluminum pergolas, glass facades, and minimal sliding systems in Dubai. Visit our showroom or request a free 3D quotation.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}contact`,
    },
  };
}

import { getSiteSettings } from "@/lib/content/store";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tContact, tNav, settings] = await Promise.all([
    getTranslations({ locale, namespace: "contact" }),
    getTranslations({ locale, namespace: "nav" }),
    getSiteSettings(),
  ]);

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("contact"), url: `${siteConfig.domain}/contact` },
  ];

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />

      {/* Hero Header */}
      <section className="relative py-20 sm:py-24 bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FFFFFF] text-stone-900 border-b border-stone-200/60 overflow-hidden">
        {/* Soft Ambient Architectural Light Rays & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-amber-200/25 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-stone-300/30 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("contact") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-300/80 text-[11px] font-mono tracking-widest uppercase text-amber-900 font-semibold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
              {tContact("heroEyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-stone-900 tracking-tight leading-[1.12]">
              {tContact("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {tContact("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
