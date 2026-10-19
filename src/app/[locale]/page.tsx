import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { getLocalBusinessSchema, getFaqSchema } from "@/lib/jsonld";
import {
  getCollection,
  getSiteSettings,
} from "@/lib/content/store";

import { HeroSection } from "@/components/sections/HeroSection";
import { IntroductionSection } from "@/components/sections/IntroductionSection";
import { ServicesSection } from "@/components/sections/ServicesSection";
import { ProductsGallerySection } from "@/components/sections/ProductsGallerySection";
import { PergolaTypesSection } from "@/components/sections/PergolaTypesSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ThreeDViewerSection } from "@/components/sections/ThreeDViewerSection";
import { WhyChooseSection } from "@/components/sections/WhyChooseSection";
import { ProcessSection } from "@/components/sections/ProcessSection";
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
    ? "برجولات دبي | تصنيع الألمنيوم والزجاج الفاخر | إيكو برجولا"
    : isFr
    ? "Pergola Dubaï | Fabrication Aluminium & Verre | Eco Pergola"
    : "Outdoor Spaces, Thoughtfully Engineered | Eco Pergola Dubai";

  const description = isAr
    ? "برجولات ألمنيوم مخصصة، واجهات زجاجية، قواطع، وحلول معمارية مستدامة في دبي والإمارات مع ضمان هيكلي 10 سنوات."
    : isFr
    ? "Pergolas bioclimatiques en aluminium sur mesure, baies vitrées minimales et façades architecturales à Dubaï avec garantie décennale."
    : "Custom bio-climatic pergolas, minimal sliding doors, and architectural facade engineering in Dubai & UAE. 10-year structural warranty.";

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

  // Load all homepage data collections in parallel from the JSON store
  const [
    services,
    products,
    pergolas,
    materials,
    projects,
    stats,
    faqs,
    processSteps,
    settings,
  ] = await Promise.all([
    getCollection("services"),
    getCollection("products"),
    getCollection("pergola-types"),
    getCollection("materials"),
    getCollection("projects"),
    getCollection("stats"),
    getCollection("faqs"),
    getCollection("process"),
    getSiteSettings().catch(() => undefined),
  ]);

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

      {/* 1. Hero: Architectural, Image-Led Composition with ThreeUI 3D Cylinder Gallery */}
      <HeroSection settings={settings} />

      {/* 2. Introduction: Concise Split Layout & Verified Metrics */}
      <IntroductionSection stats={stats} />

      {/* 3. Specialized Services: Curated Selection from JSON */}
      <ServicesSection services={services} />

      {/* 4. Products Gallery: Consistently Cropped Grid & Lightbox */}
      <ProductsGallerySection products={products} />

      {/* 5. Pergola Types & Materials: Differences, Filters & Curated Selection */}
      <PergolaTypesSection pergolas={pergolas} materials={materials} />

      {/* 6. Featured Projects: Real Identifiable Case Studies */}
      <ProjectsSection projects={projects} />

      {/* Full-Bleed 3D Architectural Viewer with Metadata Bar */}
      <ThreeDViewerSection />

      {/* 7. Why Choose Eco Pergola: Supportable Engineering Standards */}
      <WhyChooseSection />

      {/* 8. Process: 5 Operational Steps Stacking Naturally */}
      <ProcessSection steps={processSteps} />

      {/* 9. FAQs: Accessible Radix Accordion */}
      <FaqSection faqs={faqs} />

      {/* 10. Inquiry Section: Form with Clear Validation & Honest States */}
      <ContactSection settings={settings} />
    </>
  );
}
