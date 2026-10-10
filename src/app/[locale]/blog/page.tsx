import type { Metadata } from "next";
import Image from "next/image";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
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
    ? "المدونة والمعرفة المعمارية | إيكو برجولا دبي"
    : isFr
    ? "Blog & Perspectives Architecturales | Eco Pergola Dubaï"
    : "Latest Insights & Architectural Knowledge | Eco Pergola Dubai";

  const description = isAr
    ? "دليل شامل حول الأبواب المنزلقة الدقيقة، هندسة الواجهات المستدامة، ومستقبل العمارة الزجاجية في مشاريع دبي الفاخرة."
    : isFr
    ? "Articles et guides complets sur les baies coulissantes minimales, les façades durables et l'architecture vitrée à Dubaï."
    : "Read in-depth guides on minimal sliding doors, sustainable facade engineering, and the future of glass architecture in Dubai's luxury sector.";

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}blog`,
    },
  };
}

export default async function BlogPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const tBlog = await getTranslations({ locale, namespace: "blog" });
  const tNav = await getTranslations({ locale, namespace: "nav" });

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("blog"), url: `${siteConfig.domain}/blog` },
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
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&q=85&auto=format&fit=crop"
            alt="Eco Pergola architectural knowledge hub"
            fill
            priority
            sizes="100vw"
            className="object-cover brightness-[0.25]"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent" />
        </div>

        <div className="container mx-auto px-4 max-w-7xl relative z-10">
          <Breadcrumb items={[{ label: tNav("blog") }]} />
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-bold uppercase tracking-widest text-brass">
              {tBlog("heroEyebrow")}
            </span>
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold font-display text-white">
              {tBlog("heroTitle")}
            </h1>
            <p className="text-base sm:text-lg text-sand-dark leading-relaxed">
              {tBlog("heroSubtitle")}
            </p>
          </div>
        </div>
      </section>

      {/* Articles Grid */}
      <BlogTeaserSection />

      {/* Contact Section */}
      <ContactSection />
    </>
  );
}
