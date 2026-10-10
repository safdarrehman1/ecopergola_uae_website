"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  SlidersHorizontal,
  ChevronDown,
} from "lucide-react";
import { getLocalizedProducts } from "@/data/localizedData";
import { type ProductItem } from "@/data/products";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

export function ProductsGallerySection() {
  const [selectedProduct, setSelectedProduct] = useState<ProductItem | null>(null);
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const locale = useLocale();
  const tProducts = useTranslations("products");
  const tDetails = useTranslations("details");
  const tCommon = useTranslations("common");
  const products = getLocalizedProducts(locale);

  const displayedProducts = products.slice(0, visibleCount);
  const hasMore = visibleCount < products.length;

  return (
    <section id="products" className="py-20 md:py-28 bg-sand/40 dark:bg-card/30 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 left-10 w-96 h-96 bg-forest/5 dark:bg-brass/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-brass/10 dark:bg-brass/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brass/15 border border-brass/30 text-xs font-bold text-brass uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brass" />
            <span>{tProducts("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground tracking-tight">
            {tProducts("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tProducts("subtitle")}
          </p>
        </motion.div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProducts.map((product, index) => (
              <motion.div
                key={product.id}
                layout
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: index * 0.07 }}
                className="group relative rounded-3xl overflow-hidden border border-border/80 bg-card hover:border-brass/70 shadow-sm hover:shadow-[0_20px_50px_-12px_rgba(184,137,90,0.35)] transition-all duration-500 h-[450px] flex flex-col justify-end p-6 cursor-pointer select-none"
                onClick={() => setSelectedProduct(product)}
              >
                {/* Background Image with Zoom */}
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Dark Cinematic Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/50 to-black/20 group-hover:from-black/95 group-hover:via-black/75 group-hover:to-black/40 transition-colors duration-500 z-10" />

                {/* Top Category Tag Badge (No Extra Buttons) */}
                <div className="absolute top-5 left-5 rtl:left-auto rtl:right-5 z-20">
                  <Badge
                    variant="glass"
                    className="text-[10px] font-bold tracking-widest uppercase px-3 py-1 bg-black/50 backdrop-blur-md border border-white/20 text-sand-light shadow-md"
                  >
                    {product.categoryTag}
                  </Badge>
                </div>

                {/* Default State: Title, Description, and Key Feature Button */}
                <div className="relative z-20 space-y-3 text-white transition-all duration-300 group-hover:opacity-0 group-hover:translate-y-4">
                  <h3 className="text-xl sm:text-2xl font-bold font-display tracking-tight text-white leading-snug">
                    {product.title}
                  </h3>

                  <p className="text-xs sm:text-sm text-sand-light/85 line-clamp-2 leading-relaxed">
                    {product.copy}
                  </p>

                  {/* Key Feature Button / Pill */}
                  <div className="pt-1">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-brass/20 border border-brass/40 text-brass text-xs font-semibold backdrop-blur-md">
                      <Sparkles className="h-3.5 w-3.5 text-brass shrink-0" />
                      <span className="truncate">
                        {product.specs[0]?.label}: {product.specs[0]?.value}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Hover Animated Details Panel: Slides in smoothly from bottom to top */}
                <div className="absolute inset-x-0 bottom-0 p-6 z-30 bg-ink/95 backdrop-blur-xl border-t border-brass/40 transform translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out flex flex-col justify-end space-y-3 shadow-2xl">
                  {/* Title & Category in Hover Panel */}
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="text-lg sm:text-xl font-bold font-display text-white tracking-tight leading-tight">
                      {product.title}
                    </h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-brass px-2.5 py-0.5 rounded-full bg-brass/15 border border-brass/30 shrink-0">
                      {product.categoryTag}
                    </span>
                  </div>

                  {/* Technical Specifications Grid */}
                  <div className="grid grid-cols-2 gap-2">
                    {product.specs.slice(0, 4).map((spec, i) => (
                      <div
                        key={i}
                        className="bg-white/5 rounded-xl p-2.5 border border-white/10"
                      >
                        <div className="text-[10px] text-sand-dark uppercase tracking-wider font-medium truncate">
                          {spec.label}
                        </div>
                        <div className="text-xs font-bold text-white truncate mt-0.5">
                          {spec.value}
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Key Features Preview */}
                  {product.features && product.features.length > 0 && (
                    <div className="space-y-1.5 pt-1">
                      {product.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-start gap-2 text-xs text-sand-light/90">
                          <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0 mt-0.5" />
                          <span className="line-clamp-1 leading-snug">{feat}</span>
                        </div>
                      ))}
                    </div>
                  )}

                  {/* Smooth Footer Cue */}
                  <div className="flex items-center justify-between pt-2 border-t border-white/10 text-xs font-semibold text-brass">
                    <span className="text-[11px] text-sand-light/70">{tProducts("viewDetails")}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180 group-hover:translate-x-1.5 rtl:group-hover:-translate-x-1.5 transition-transform" />
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Load More / Bottom Actions */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore && (
            <Button
              variant="brass"
              size="lg"
              onClick={() => setVisibleCount((prev) => Math.min(products.length, prev + 6))}
              className="rounded-xl font-semibold shadow-lg shadow-brass/20"
            >
              <span>{tCommon("loadMore")}</span>
              <ChevronDown className="h-4 w-4 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl font-semibold hover:border-brass border-border bg-card/80 backdrop-blur-md"
          >
            <Link href="/projects">
              <span>{tProducts("viewProjectsCTA")}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>

      {/* Smooth Scrollable Lightbox Dialog with Background Scroll Lock */}
      <Dialog open={!!selectedProduct} onOpenChange={() => setSelectedProduct(null)}>
        {selectedProduct && (
          <DialogContent
            data-lenis-prevent
            className="max-w-3xl p-0 overflow-hidden bg-card border-border rounded-3xl shadow-2xl flex flex-col max-h-[88vh]"
          >
            {/* Modal Header Banner (Fixed) */}
            <div className="relative h-60 sm:h-72 w-full shrink-0 overflow-hidden">
              <Image
                src={selectedProduct.image}
                alt={selectedProduct.title}
                fill
                className="object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/20" />

              <div className="absolute bottom-5 left-6 rtl:left-auto rtl:right-6 right-6 text-white space-y-1.5 z-10">
                <Badge variant="brass" className="text-[10px] font-bold uppercase tracking-wider mb-1">
                  {selectedProduct.categoryTag}
                </Badge>
                <DialogTitle className="text-2xl sm:text-3xl font-bold font-display text-white tracking-tight">
                  {selectedProduct.title}
                </DialogTitle>
                <DialogDescription className="text-sand-light/90 text-xs sm:text-sm max-w-2xl leading-relaxed">
                  {selectedProduct.copy}
                </DialogDescription>
              </div>
            </div>

            {/* Modal Scrollable Body */}
            <div
              data-lenis-prevent
              className="flex-1 overflow-y-auto p-6 sm:p-8 space-y-6 scroll-smooth"
            >
              {/* Technical Specifications Grid */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass">
                  <SlidersHorizontal className="h-4 w-4" />
                  <span>{tDetails("technicalSpecs")}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {selectedProduct.specs.map((spec, i) => (
                    <div
                      key={i}
                      className="p-3.5 rounded-2xl bg-muted/40 dark:bg-card border border-border/80 flex items-center justify-between"
                    >
                      <span className="text-xs text-muted-foreground font-medium">{spec.label}</span>
                      <span className="text-xs sm:text-sm font-bold text-foreground text-right">{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key Features List */}
              <div className="space-y-3">
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-brass">
                  <ShieldCheck className="h-4 w-4" />
                  <span>{tDetails("keyFeatures")}</span>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {selectedProduct.features.map((feat, i) => (
                    <div
                      key={i}
                      className="flex items-start gap-2.5 p-3 rounded-xl bg-sand/20 dark:bg-muted/20 border border-border/50 text-xs sm:text-sm text-foreground"
                    >
                      <CheckCircle2 className="h-4 w-4 text-forest dark:text-brass shrink-0 mt-0.5" />
                      <span className="leading-relaxed">{feat}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quality Guarantee Box */}
              <div className="p-4 rounded-2xl bg-forest/10 dark:bg-brass/10 border border-forest/20 dark:border-brass/20 flex items-center gap-3 text-xs sm:text-sm">
                <Zap className="h-5 w-5 text-forest dark:text-brass shrink-0" />
                <p className="text-muted-foreground">
                  <strong className="text-foreground">Certified Quality:</strong> All products are custom engineered and fabricated to European and UAE Civil Defense safety specifications.
                </p>
              </div>

              {/* Actions Footer inside scrollable view */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-border">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setSelectedProduct(null)}
                  className="rounded-xl px-4"
                >
                  {tCommon("close")}
                </Button>
                <Button
                  asChild
                  variant="brass"
                  size="sm"
                  className="rounded-xl font-semibold shadow-md shadow-brass/20"
                >
                  <Link href="/contact" onClick={() => setSelectedProduct(null)}>
                    <span>{tDetails("requestQuote")}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
                  </Link>
                </Button>
              </div>
            </div>
          </DialogContent>
        )}
      </Dialog>
    </section>
  );
}

