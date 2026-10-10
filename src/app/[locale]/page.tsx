import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { getLocalBusinessSchema, getFaqSchema } from "@/lib/jsonld";

import { HeroSection } from "@/components/sections/HeroSection";
import { LatestUpdatesSection } from "@/components/sections/LatestUpdatesSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsGallerySection } from "@/components/sections/ProductsGallerySection";
import { AboutSection } from "@/components/sections/AboutSection";
import { PergolaTypesSection } from "@/components/sections/PergolaTypesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { TestimonialsSection } from "@/components/sections/TestimonialsSection";
import { FaqSection } from "@/components/sections/FaqSection";
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
    ? "برجولات دبي | تصنيع الألمنيوم والزجاج الفاخر | إيكو برجولا"
    : isFr
    ? "Pergola Dubaï | Fabrication Aluminium & Verre | Eco Pergola"
    : "Pergola Dubai | Aluminum & Glass Fabrication UAE | Eco Pergola";

  const description = isAr
    ? "برجولات ألمنيوم مخصصة، واجهات زجاجية، قواطع، وحلول معمارية مستدامة في دبي والإمارات. جودة معتمدة ومشاريع فاخرة."
    : isFr
    ? "Pergolas sur mesure en aluminium, façades en verre et solutions architecturales à Dubaï et aux Émirats. Qualité certifiée ISO."
    : "Custom aluminum pergolas, glass facades, partitions, and architectural solutions in Dubai. ISO certified, serving premier residential and commercial projects.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale}`,
      languages: {
        "en-AE": `${siteConfig.domain}/en`,
        "ar-AE": `${siteConfig.domain}/ar`,
        fr: `${siteConfig.domain}/fr`,
        "x-default": siteConfig.domain,
      },
    },
    openGraph: {
      title,
      description,
      url: `${siteConfig.domain}/${locale === "en" ? "" : locale}`,
      siteName: siteConfig.name,
      locale: locale === "ar" ? "ar_AE" : locale === "fr" ? "fr_FR" : "en_AE",
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const localBusinessSchema = getLocalBusinessSchema();
  const faqSchema = getFaqSchema();

  return (
    <>
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* 5.2 Hero */}
      <HeroSection />

      {/* 5.3 Latest Updates */}
      <LatestUpdatesSection />

      {/* 5.4 Specialized Services */}
      <ServicesSection />

      {/* 5.5 Products Gallery */}
      <ProductsGallerySection />

      {/* 5.6 About / Who We Are */}
      <AboutSection />

      {/* 5.7 Pergola Types & Materials */}
      <PergolaTypesSection />

      {/* 5.8 Featured Projects Portfolio */}
      <ProjectsSection />

      {/* 5.9 Testimonials */}
      <TestimonialsSection />

      {/* 5.10 FAQ */}
      <FaqSection />

      {/* 5.11 Latest Insights */}
      <BlogTeaserSection />

      {/* 5.12 Contact */}
      <ContactSection />
    </>
  );
}
