"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar, Sparkles } from "lucide-react";
import { getLocalizedBlog } from "@/data/localizedData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function BlogTeaserSection() {
  const locale = useLocale();
  const tBlog = useTranslations("blog");
  const posts = getLocalizedBlog(locale);

  return (
    <section className="py-20 md:py-28 bg-sand/40 dark:bg-card/20 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 left-10 w-80 h-80 bg-forest/5 dark:bg-brass/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 dark:bg-brass/10 border border-forest/20 dark:border-brass/20 text-xs font-bold text-forest dark:text-brass uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brass" />
            <span>{tBlog("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground tracking-tight">
            {tBlog("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tBlog("subtitle")}
          </p>
        </motion.div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:border-brass/60 hover:shadow-[0_20px_45px_-12px_rgba(184,137,90,0.3)] transition-all duration-500 flex flex-col justify-between"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-60 w-full overflow-hidden bg-muted">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
                    <Badge variant="brass" className="text-[10px] font-bold uppercase tracking-wider shadow-md">
                      {locale === "ar" ? "العمارة والتصميم" : locale === "fr" ? "Architecture" : post.category}
                    </Badge>
                  </div>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-brass" />
                      {post.readingTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-brass" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-foreground group-hover:text-brass transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More Link */}
              <div className="p-6 pt-0 border-t border-border/50 flex items-center justify-between">
                <span className="text-xs text-muted-foreground font-medium truncate max-w-[150px]">
                  {post.author.name}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-forest dark:text-brass group-hover:underline uppercase tracking-wider"
                >
                  <span>{tBlog("readArticle")}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                </Link>
              </div>
            </motion.article>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="mt-14 text-center">
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl font-semibold hover:border-brass border-border bg-card/80 backdrop-blur-md"
          >
            <Link href="/blog">
              <span>{tBlog("viewAll")}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

