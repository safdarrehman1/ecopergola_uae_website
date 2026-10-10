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

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tServices = await getTranslations({ locale, namespace: "services" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

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
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola architectural services"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("services") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tServices("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tServices("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tServices("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <ServicesSection />

      {/* Contact Consultation */}
      <ContactSection />
    </>
  );
}
