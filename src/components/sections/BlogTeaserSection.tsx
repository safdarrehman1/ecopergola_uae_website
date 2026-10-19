"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Clock, Calendar } from "lucide-react";
import { getLocalizedBlog } from "@/data/localizedData";
import { Button } from "@/components/ui/button";

export function BlogTeaserSection() {
  const locale = useLocale();
  const tBlog = useTranslations("blog");
  const posts = getLocalizedBlog(locale);

  return (
    <section className="py-20 sm:py-28 lg:py-36 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px] relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white border border-stone-200 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#B38E5D] font-semibold uppercase shadow-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B38E5D]" />
            <span>{tBlog("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-display text-stone-900 tracking-tight">
            {tBlog("title")}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            {tBlog("subtitle")}
          </p>
        </motion.div>

        {/* 3 Blog Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <motion.article
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group rounded-[2px] bg-white border border-stone-200 overflow-hidden shadow-none hover:border-stone-400 transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-60 w-full overflow-hidden bg-stone-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                    <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-[2px] bg-white/95 text-stone-700 border border-stone-200">
                      {locale === "ar" ? "العمارة والتصميم" : locale === "fr" ? "Architecture" : post.category}
                    </span>
                  </div>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6 sm:p-7 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-stone-400 font-mono">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3 w-3 text-[#B38E5D]" />
                      {post.readingTime}
                    </span>
                    <span>/</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[#B38E5D]" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-lg font-normal font-display text-stone-900 group-hover:text-[#34AA49] transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-[13px] text-stone-500 font-light line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More Link */}
              <div className="p-6 sm:p-7 pt-0 border-t border-stone-100 flex items-center justify-between">
                <span className="text-xs text-stone-400 font-light truncate max-w-[150px]">
                  {post.author.name}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-semibold text-stone-900 group-hover:text-[#34AA49] uppercase tracking-wider transition-colors"
                >
                  <span>{tBlog("readArticle")}</span>
                  <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 text-[#B38E5D] group-hover:text-[#34AA49] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-all" />
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
            className="rounded-[2px] font-semibold border-stone-300 bg-white hover:bg-stone-50 text-stone-900 uppercase tracking-wider text-xs"
          >
            <Link href="/blog">
              <span>{tBlog("viewAll")}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 ml-2 rtl:mr-2 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default BlogTeaserSection;
