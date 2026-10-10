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

export default async function PergolaTypesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tPergola = await getTranslations({ locale, namespace: "pergolaTypes" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

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
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola luxury louvered pergola"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("pergolaTypes") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tPergola("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tPergola("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tPergola("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Pergola Grid & Comparison Table */}
      <PergolaTypesSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
