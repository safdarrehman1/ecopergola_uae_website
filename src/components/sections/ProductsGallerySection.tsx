"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles } from "lucide-react";
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
    <section id="products" className="py-16 sm:py-20 lg:py-24 bg-[#0A0F1D] text-white relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-mono tracking-widest uppercase text-teal-400 font-bold">
              {eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-extrabold font-display text-white leading-[1.12] tracking-tight">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-slate-300 leading-relaxed">
              {subtitle}
            </p>
          </div>

          {!showAll && (
            <Button
              asChild
              className="self-start md:self-end h-11 px-6 rounded-full border border-teal-500/30 bg-slate-900/80 hover:bg-teal-500/20 text-white text-xs font-bold uppercase tracking-wider transition-all shrink-0"
            >
              <Link href="/products">
                <span>{isAr ? "عرض جميع المنتجات" : isFr ? "Tous les Produits" : "View All Products"}</span>
                <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 text-teal-400" />
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Modern Bold Products Grid */}
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
                className="group rounded-3xl bg-slate-900/90 border border-white/10 overflow-hidden shadow-xl hover:shadow-[0_20px_50px_rgba(13,148,136,0.15)] hover:border-teal-500/50 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Area */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-800">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt[locale as "en" | "ar" | "fr"] || product.image.alt.en || productTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-teal-300 text-[10px] font-mono font-bold tracking-wider uppercase">
                        {productCategory}
                      </span>
                    </div>
                  </div>

                  {/* Content Area */}
                  <div className="p-6 space-y-2.5">
                    <h3 className="text-lg font-bold font-display text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                      {productTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 leading-relaxed line-clamp-2">
                      {productSummary}
                    </p>
                  </div>
                </div>

                {/* Pill CTA Button */}
                <div className="p-6 pt-0">
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-slate-800/80 hover:bg-[#34AA49] text-white hover:text-white border border-white/10 hover:border-[#34AA49] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between group/btn shadow-sm"
                  >
                    <span>{isAr ? "تفاصيل المنتج" : isFr ? "Détails du Produit" : "View Product"}</span>
                    <ArrowRight className="h-4 w-4 text-teal-400 group-hover/btn:text-white rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-all" />
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
