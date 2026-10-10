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

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tAbout = await getTranslations({ locale, namespace: "about" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

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
      <section className="relative py-24 bg-ink text-sand-light overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola fabrication facility"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("about") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tAbout("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tAbout("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tAbout("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* About Main Section */}
      <AboutSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
