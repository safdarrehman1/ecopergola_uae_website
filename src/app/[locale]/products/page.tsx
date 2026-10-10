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

export default async function ProductsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tProducts = await getTranslations({ locale, namespace: "products" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

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
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola architectural products"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("products") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tProducts("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tProducts("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tProducts("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <ProductsGallerySection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
