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
      <section className="relative py-20 sm:py-24 bg-[#0B0F19] text-white border-b border-white/10 overflow-hidden">
        {/* Architectural Ambient Glow & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#34AA49]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("products") }]} />
          <div className="max-w-3xl space-y-4 mt-4">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight leading-[1.12]">
              {tProducts("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed">
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
