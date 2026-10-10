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

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tContact = await getTranslations({ locale, namespace: "contact" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

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
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola showroom and client support"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("contact") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tContact("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tContact("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tContact("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Main Contact Section */}
      <ContactSection />
    </>
  );
}
