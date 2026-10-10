import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { getFaqSchema } from "@/lib/jsonld";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { FaqSection } from "@/components/sections/FaqSection";
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
    ? "الأسئلة الشائعة حول البرجولات والواجهات | إيكو برجولا"
    : isFr
    ? "Foire Aux Questions (FAQ) | Eco Pergola Dubaï"
    : "Frequently Asked Questions | Pergolas & Facades Dubai | Eco Pergola";

  const description = isAr
    ? "إجابات واضحة حول الضمان 10 سنوات، التثبيت الهندسي، مقاومة المناخ في الإمارات والأسعار التقديرية للبرجولات والواجهات الزجاجية."
    : isFr
    ? "Toutes les réponses concernant nos garanties de 10 ans, délais de pose, résistance au climat des Émirats et devis gratuits."
    : "Get answers to common questions regarding warranty coverage, installation timelines, UAE climate resistance, and free quotations for pergolas and glass facades.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}faq`,
    },
  };
}

export default async function FaqPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tFaq = await getTranslations({ locale, namespace: "faq" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("faq"), url: `${siteConfig.domain}/faq` },
  ];

  const faqSchema = getFaqSchema();

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Hero Header */}
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola customer FAQ support"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("faq") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tFaq("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tFaq("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tFaq("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* FAQ Accordion Section */}
      <FaqSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
