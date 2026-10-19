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
    <section className="py-20 md:py-28 bg-[#070B14] text-white relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/3 left-10 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-[#34AA49]/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-white tracking-tight">
            {tBlog("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
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
              className="group rounded-3xl bg-[#0F172A] border border-white/10 overflow-hidden shadow-xl hover:border-emerald-500/50 hover:shadow-[0_20px_40px_rgba(0,0,0,0.6)] transition-all duration-300 flex flex-col justify-between"
            >
              <div>
                {/* Featured Image */}
                <div className="relative h-60 w-full overflow-hidden bg-slate-900">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/70 via-transparent to-transparent" />

                  <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
                    <span className="inline-block px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-emerald-400 border border-white/15 text-[10px] font-bold uppercase tracking-wider">
                      {locale === "ar" ? "العمارة والتصميم" : locale === "fr" ? "Architecture" : post.category}
                    </span>
                  </div>
                </div>

                {/* Article Header & Excerpt */}
                <div className="p-6 space-y-3">
                  <div className="flex items-center gap-3 text-xs text-slate-400">
                    <span className="flex items-center gap-1">
                      <Clock className="h-3.5 w-3.5 text-emerald-400" />
                      {post.readingTime}
                    </span>
                    <span>•</span>
                    <span className="flex items-center gap-1">
                      <Calendar className="h-3.5 w-3.5 text-emerald-400" />
                      {post.publishedAt}
                    </span>
                  </div>

                  <h3 className="text-lg sm:text-xl font-bold font-display text-white group-hover:text-emerald-400 transition-colors leading-snug">
                    {post.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-slate-300 line-clamp-3 leading-relaxed">
                    {post.excerpt}
                  </p>
                </div>
              </div>

              {/* Author & Read More Link */}
              <div className="p-6 pt-0 border-t border-white/10 flex items-center justify-between">
                <span className="text-xs text-slate-400 font-medium truncate max-w-[150px]">
                  {post.author.name}
                </span>

                <Link
                  href={`/blog/${post.slug}`}
                  className="inline-flex items-center gap-1 text-xs font-bold text-emerald-400 hover:text-emerald-300 uppercase tracking-wider transition-colors"
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
            className="rounded-xl font-semibold border-white/20 bg-white/5 hover:bg-white/10 text-white shadow-xs"
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

