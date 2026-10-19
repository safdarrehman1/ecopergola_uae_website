import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { ProductsGallerySection } from "@/components/sections/ProductsGallerySection";
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
    ? "منتجات وحلول الألمنيوم والزجاج المعماري | إيكو برجولا دبي"
    : isFr
    ? "Produits & Systèmes Architecturaux Dubaï | Eco Pergola"
    : "Architectural Products Gallery | Aluminum & Glass Dubai | Eco Pergola";

  const description = isAr
    ? "معرض المنتجات المعمارية: أبواب منزلقة دقيقة، واجهات زجاجية هيكلية، برجولات بيوكليماتيك، غرف زجاجية، وسلالم إنشائية فاخرة في الإمارات."
    : isFr
    ? "Galerie de produits architecturaux : Baies coulissantes minimales, Murs-rideaux vitrés, Pergolas bioclimatiques et Pièces vitrées d'exception."
    : "Engineered architectural systems: Metro 20 Minimal Sliders, Commercial Glass Facades, Bio-Climatic Pergolas, and Transparent Living Spaces in Dubai.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}products`,
    },
  };
}

import { getCollection, getSiteSettings } from "@/lib/content/store";

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [tProducts, tNav, products, settings] = await Promise.all([
    getTranslations({ locale, namespace: "products" }),
    getTranslations({ locale, namespace: "nav" }),
    getCollection("products"),
    getSiteSettings(),
  ]);

  const publishedProducts = products.filter((p) => p.status === "published");

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("products"), url: `${siteConfig.domain}/products` },
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
          <Breadcrumb items={[{ label: tNav("products") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-emerald-300/80 text-[11px] font-mono tracking-widest uppercase text-emerald-950 font-semibold shadow-xs">
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
              {tProducts("heroEyebrow")}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-stone-900 tracking-tight leading-[1.12]">
              {tProducts("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-stone-600 leading-relaxed">
              {tProducts("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductsGallerySection products={publishedProducts} showAll={true} />

      {/* Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
