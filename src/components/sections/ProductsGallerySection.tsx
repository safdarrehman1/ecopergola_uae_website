"use client";

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

  const eyebrow = isAr ? "معرض منتجاتنا الفاخرة" : isFr ? "Notre Galerie de Produits" : "Architectural Product Collection";
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
    <section id="products" className="py-20 sm:py-28 lg:py-36 bg-white relative border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px]">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-16"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-semibold">
              {eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[38px] md:text-[46px] font-normal font-display text-stone-900 leading-[1.12] tracking-tight">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-stone-600 font-light leading-relaxed">
              {subtitle}
            </p>
          </div>

          {!showAll && (
            <Button
              asChild
              variant="outline"
              className="self-start md:self-end h-10 px-5 rounded-[2px] border-stone-300 hover:border-stone-500 text-stone-900 text-xs tracking-wider uppercase transition-all shrink-0"
            >
              <Link href="/products">
                <span>{isAr ? "عرض جميع المنتجات" : isFr ? "Tous les Produits" : "View Collection"}</span>
                <ArrowRight className="h-3 w-3 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Minimalist Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
                className="group rounded-[2px] bg-[#FAF8F5] border border-stone-200 overflow-hidden shadow-none hover:border-stone-400 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Area */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={product.image.src}
                      alt={product.image.alt[locale as "en" | "ar" | "fr"] || product.image.alt.en || productTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-widest px-2.5 py-1 rounded-[2px] bg-white/95 text-stone-700 border border-stone-200">
                        {productCategory}
                      </span>
                    </div>
                  </div>

                  {/* Clean Content Area */}
                  <div className="p-6 sm:p-7 space-y-2">
                    <h3 className="text-lg font-normal font-display text-stone-900 group-hover:text-[#34AA49] transition-colors line-clamp-1">
                      {productTitle}
                    </h3>
                    <p className="text-xs sm:text-[13px] text-stone-500 font-light leading-relaxed line-clamp-2">
                      {productSummary}
                    </p>
                  </div>
                </div>

                {/* Minimalist Action Link */}
                <div className="p-6 sm:p-7 pt-0 border-t border-stone-200/50 mt-2">
                  <Link
                    href={`/products/${product.slug}`}
                    className="w-full pt-3 text-stone-900 hover:text-[#34AA49] text-xs font-semibold uppercase tracking-wider transition-colors flex items-center justify-between group/link"
                  >
                    <span>{isAr ? "تفاصيل المنتج" : isFr ? "Détails du Produit" : "View Specifications"}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-[#B38E5D] group-hover/link:text-[#34AA49] group-hover/link:translate-x-1 rtl:group-hover/link:-translate-x-1 rtl:rotate-180 transition-all" />
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
