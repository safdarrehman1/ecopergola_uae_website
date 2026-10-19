import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { setRequestLocale, getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { Clock, Calendar, User, Tag } from "lucide-react";
import { blogData } from "@/data/blog";
import { getLocalizedBlogPost, getLocalizedBlog } from "@/data/localizedData";
import { siteConfig } from "@/lib/siteConfig";
import { routing } from "@/i18n/routing";
import { Breadcrumb, getBreadcrumbSchema } from "@/components/seo/Breadcrumb";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ContactSection } from "@/components/sections/ContactSection";
import { getSiteSettings } from "@/lib/content/store";

export function generateStaticParams() {
  const params: { locale: string; slug: string }[] = [];
  for (const locale of routing.locales) {
    for (const post of blogData) {
      params.push({ locale, slug: post.slug });
    }
  }
  return params;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale, slug } = await params;
  const post = getLocalizedBlogPost(slug, locale) || blogData.find((p) => p.slug === slug);
  if (!post) return {};

  const title = `${post.title} | Eco Pergola Dubai`;
  const description = post.excerpt;

  return {
    title,
    description,
    alternates: {
      canonical: `${siteConfig.domain}/${locale === "en" ? "" : locale + "/"}blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: post.publishedAt,
      authors: [post.author.name],
      images: [{ url: post.image }],
    },
  };
}

export const dynamicParams = true;

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  setRequestLocale(locale);

  const [post, settings, tNav] = await Promise.all([
    Promise.resolve(getLocalizedBlogPost(slug, locale)),
    getSiteSettings(),
    getTranslations({ locale, namespace: "nav" }),
  ]);
  if (!post) notFound();

  const breadcrumbs = [
    { name: tNav("home"), url: siteConfig.domain },
    { name: tNav("blog"), url: `${siteConfig.domain}/blog` },
    { name: post.title, url: `${siteConfig.domain}/blog/${post.slug}` },
  ];

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.excerpt,
    image: post.image,
    datePublished: post.publishedAt,
    dateModified: post.publishedAt,
    author: {
      "@type": "Person",
      name: post.author.name,
      jobTitle: post.author.role,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: `${siteConfig.domain}/images/logo.jpeg`,
      },
    },
  };

  const allPosts = getLocalizedBlog(locale);
  const relatedPosts = allPosts.filter((p) => p.id !== post.id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(getBreadcrumbSchema(breadcrumbs)) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header */}
      <section className="relative pt-24 pb-16 md:pt-28 md:pb-20 lg:pt-32 bg-[#0B0F19] text-white border-b border-white/10 overflow-hidden">
        {/* Architectural Ambient Glow & Grid Texture */}
        <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
          <div className="absolute top-0 right-1/4 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px]" />
          <div className="absolute -bottom-20 -left-20 w-[400px] h-[400px] bg-[#34AA49]/10 rounded-full blur-[120px]" />
          <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:28px_28px] opacity-35" />
        </div>

        <div className="container mx-auto px-4 max-w-5xl relative z-10">
          <div className="mb-6">
            <Breadcrumb
              items={[
                { label: tNav("blog"), href: "/blog" },
                { label: post.title },
              ]}
            />
          </div>

          <div className="space-y-4 max-w-3xl">
            <span className="inline-block px-3 py-1 rounded-full bg-white/5 border border-white/15 text-emerald-400 text-[11px] font-mono tracking-widest uppercase font-semibold">
              {locale === "ar" ? "العمارة والتصميم" : locale === "fr" ? "Architecture" : post.category}
            </span>

            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold font-display text-white leading-tight min-w-0 break-words text-balance">
              {post.title}
            </h1>

            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-2 border-t border-white/10">
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-emerald-400" />
                <span className="font-medium">{post.author.name}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                <span>{post.publishedAt}</span>
              </span>
              <span>•</span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-emerald-400" />
                <span>{post.readingTime}</span>
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Article Body + Sticky TOC */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container mx-auto px-4 max-w-6xl">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,1fr)_320px] xl:grid-cols-[minmax(0,1fr)_360px] lg:gap-12 xl:gap-16 items-start">
            {/* Main Markdown Text */}
            <article className="min-w-0 w-full space-y-8 prose dark:prose-invert max-w-none text-foreground leading-relaxed">
              {/* Introduction Callout */}
              <div className="p-6 rounded-2xl bg-sand/50 dark:bg-card/40 border border-border text-base sm:text-lg font-medium italic text-muted-foreground not-prose">
                &ldquo;{post.excerpt}&rdquo;
              </div>

              {/* Rendered Sections */}
              <div className="space-y-6 text-sm sm:text-base text-muted-foreground whitespace-pre-line leading-relaxed">
                {post.content}
              </div>

              {/* Tags */}
              <div className="pt-8 border-t border-border flex flex-wrap items-center gap-2 not-prose">
                <span className="text-xs font-semibold text-foreground flex items-center gap-1 mr-2">
                  <Tag className="h-3.5 w-3.5 text-brass" /> {locale === "ar" ? "الوسوم:" : locale === "fr" ? "Mots-clés :" : "Tags:"}
                </span>
                {post.tags.map((tag, idx) => (
                  <span
                    key={idx}
                    className="text-xs px-3 py-1 rounded-full bg-muted border border-border text-foreground"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              {/* Author Bio Box */}
              <div className="p-6 rounded-2xl bg-card border border-border shadow-sm flex items-center gap-4 not-prose">
                <div className="h-12 w-12 rounded-full bg-forest text-white flex items-center justify-center font-bold font-display text-lg shrink-0">
                  {post.author.name.charAt(0)}
                </div>
                <div>
                  <h4 className="font-bold text-foreground text-sm">{post.author.name}</h4>
                  <p className="text-xs text-muted-foreground">{post.author.role}</p>
                </div>
              </div>
            </article>

            {/* Sticky Sidebar: Table of Contents */}
            <aside className="min-w-0 w-full space-y-6 lg:sticky lg:top-28 lg:self-start">
              <div className="p-6 sm:p-7 rounded-3xl bg-card border border-border shadow-md space-y-4">
                <h3 className="text-xs font-bold uppercase tracking-wider text-brass">
                  {locale === "ar" ? "فهرس المحتويات" : locale === "fr" ? "Sommaire de l'Article" : "Table of Contents"}
                </h3>
                <ul className="space-y-2.5 text-xs text-muted-foreground">
                  {post.tableOfContents.map((toc) => (
                    <li key={toc.id}>
                      <a
                        href={`#${toc.id}`}
                        className="hover:text-brass transition-colors block py-1 border-l-2 rtl:border-l-0 rtl:border-r-2 border-transparent hover:border-brass pl-2 rtl:pl-0 rtl:pr-2 -ml-2 rtl:-ml-0 rtl:-mr-2"
                      >
                        {toc.title}
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="pt-4 border-t border-border/60">
                  <Button asChild variant="brass" size="sm" className="w-full font-bold">
                    <Link href="/contact">
                      {locale === "ar" ? "استشر مهندسينا" : locale === "fr" ? "Consulter Nos Experts" : "Consult With Our Authors"}
                    </Link>
                  </Button>
                </div>
              </div>
            </aside>
          </div>

          {/* Related Articles */}
          {relatedPosts.length > 0 && (
            <div className="mt-20 pt-12 border-t border-border space-y-8">
              <h3 className="text-2xl font-bold font-display text-foreground text-center">
                {locale === "ar" ? "مقالات ورؤى ذات صلة" : locale === "fr" ? "Articles & Guides Similaires" : "Related Articles & Insights"}
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {relatedPosts.map((rel) => (
                  <Link
                    key={rel.id}
                    href={`/blog/${rel.slug}`}
                    className="group rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:shadow-xl transition-all block"
                  >
                    <div className="relative h-48 w-full bg-muted">
                      <Image
                        src={rel.image}
                        alt={rel.title}
                        fill
                        sizes="(max-width: 768px) 100vw, 400px"
                        className="object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                    </div>
                    <div className="p-6 space-y-2">
                      <Badge variant="brass" className="text-[10px] font-bold">
                        {locale === "ar" ? "العمارة" : locale === "fr" ? "Architecture" : rel.category}
                      </Badge>
                      <h4 className="font-bold text-base font-display text-foreground group-hover:text-brass transition-colors">
                        {rel.title}
                      </h4>
                      <p className="text-xs text-muted-foreground line-clamp-2">
                        {rel.excerpt}
                      </p>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Global Contact Section */}
      <ContactSection settings={settings} />
    </>
  );
}
