"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionVariants, itemFadeUp } from "@/lib/motion";
import type { Product } from "@/lib/content/schemas";

interface ProductsGallerySectionProps {
  products?: Product[];
  showAll?: boolean;
}

export function ProductsGallerySection({ products = [], showAll = false }: ProductsGallerySectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const displayedProducts = showAll ? products : products.slice(0, 6);

  const eyebrow = isAr ? "معرض منتجاتنا الفاخرة" : isFr ? "Notre Galerie de Produits" : "Architectural Product Gallery";
  const title = isAr
    ? "أنظمة ألمنيوم وزجاج مصممة بدقة متناهية"
    : isFr
    ? "Systèmes aluminium & vitrés conçus avec une précision absolue"
    : "Precision aluminum & architectural glass systems";
  const subtitle = isAr
    ? "استكشف تشكيلتنا من الأبواب المنزلقة الدقيقة، الواجهات المعمارية، والغرف الزجاجية المخصصة للفلل في دبي."
    : isFr
    ? "Découvrez nos baies minimalistes, façades isolantes et extensions vitrées haut de gamme à Dubaï."
    : "Engineered systems developed for thermal efficiency, acoustic insulation, and seamless architectural continuity.";

  return (
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-background relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-mono tracking-widest uppercase text-brass">
              {eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold font-display text-foreground leading-[1.15] tracking-tight">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>

          {!showAll && (
            <Button
              asChild
              variant="outline"
              className="self-start md:self-end h-10 px-5 rounded-lg border-border hover:border-brass/80 text-foreground text-xs font-semibold uppercase tracking-wider transition-all shrink-0"
            >
              <Link href="/products">
                <span>{isAr ? "عرض جميع المنتجات" : isFr ? "Tous les Produits" : "View All Products"}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Minimalist Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedProducts.map((product, idx) => {
            const productTitle = product.title[locale as "en" | "ar" | "fr"] || product.title.en;
            const productCategory = product.category[locale as "en" | "ar" | "fr"] || product.category.en;
            const productSummary = product.summary[locale as "en" | "ar" | "fr"] || product.summary.en;

            return (
              <motion.article
                key={product.id}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.06 }}
                className="group rounded-2xl bg-card border border-border/80 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-brass/70 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Area */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt[locale as "en" | "ar" | "fr"] || product.image.alt.en || productTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-stone-900 font-semibold border border-white/80 shadow-xs">
                        {productCategory}
                      </span>
                    </div>
                  </div>

                  {/* Clean Content Area */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <h3 className="text-base font-bold text-foreground group-hover:text-brass transition-colors line-clamp-1">
                      {productTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {productSummary}
                    </p>
                  </div>
                </div>

                {/* Minimalist Solid Button with Proper Colors */}
                <div className="p-5 sm:p-6 pt-0">
                  <Link
                    href={`/products#${product.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F6F3EC] hover:bg-brass text-stone-800 hover:text-stone-950 border border-stone-200/90 hover:border-brass text-xs font-semibold transition-all duration-300 flex items-center justify-between group/btn shadow-xs hover:shadow-md"
                  >
                    <span>{isAr ? "المواصفات الهندسية" : isFr ? "Spécifications Techniques" : "Technical Specs"}</span>
                    <ArrowRight className="h-4 w-4 text-brass group-hover/btn:text-stone-950 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-all" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProductsGallerySection;
