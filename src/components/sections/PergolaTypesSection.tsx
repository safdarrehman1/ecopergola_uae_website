"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionVariants, itemFadeUp } from "@/lib/motion";
import type { PergolaType, Material } from "@/lib/content/schemas";

interface PergolaTypesSectionProps {
  pergolas?: PergolaType[];
  materials?: Material[];
  showAll?: boolean;
}

export function PergolaTypesSection({ pergolas = [], materials = [], showAll = false }: PergolaTypesSectionProps) {
  const [materialFilter, setMaterialFilter] = useState<string>("all");
  const [roofFilter, setRoofFilter] = useState<string>("all");
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const filteredPergolas = useMemo(() => {
    return pergolas.filter((item) => {
      const matchMaterial = materialFilter === "all" || item.material.includes(materialFilter as never);
      const matchRoof = roofFilter === "all" || item.roofType === roofFilter;
      return matchMaterial && matchRoof;
    });
  }, [pergolas, materialFilter, roofFilter]);

  const displayedItems = showAll ? filteredPergolas : filteredPergolas.slice(0, 6);
  const isFiltered = materialFilter !== "all" || roofFilter !== "all";

  const handleReset = () => {
    setMaterialFilter("all");
    setRoofFilter("all");
  };

  const eyebrow = isAr ? "أنواع وهياكل البرجولات" : isFr ? "Typologies & Matériaux" : "Pergola Types & Materials";
  const title = isAr
    ? "اختر نظام البرجولا الأنسب لمساحتك وميزانيتك"
    : isFr
    ? "Choisissez le système de pergola idéal pour votre espace"
    : "Find the engineered pergola system for your space";
  const subtitle = isAr
    ? "قارن بين المواد وأنظمة الأسقف الدوارة والمتحركة والثابتة المصممة خصيصاً لمقاومة شمس ورطوبة دبي."
    : isFr
    ? "Comparez les matériaux et mécanismes (lames orientables, toiles rétractables, toitures pleines) adaptés aux Émirats."
    : "Compare structural materials, bioclimatic louvers, and roof mechanisms engineered for high wind loads and intense sun.";

  return (
    <section id="pergola-types" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
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
              <Link href="/pergola-types">
                <span>{isAr ? "دليل البرجولات الكامل (19)" : isFr ? "Explorer les 19 Types" : "Explore All 19 Types"}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Minimalist Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-5 border-b border-border/60">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-mono uppercase tracking-wider text-muted-foreground mr-1">Roof:</span>
            {["all", "louvered", "retractable", "fixed"].map((roof) => (
              <button
                key={roof}
                type="button"
                onClick={() => setRoofFilter(roof)}
                className={`px-3.5 py-1.5 rounded-lg text-xs font-semibold transition-all ${
                  roofFilter === roof
                    ? "bg-brass text-stone-950 font-bold shadow-xs border border-brass"
                    : "bg-white border border-stone-200 text-stone-600 hover:text-stone-950 hover:bg-stone-50"
                }`}
              >
                {roof === "all" ? "All Roofs" : roof.charAt(0).toUpperCase() + roof.slice(1)}
              </button>
            ))}
          </div>

          {isFiltered && (
            <button
              type="button"
              onClick={handleReset}
              className="inline-flex items-center gap-1.5 text-xs text-brass hover:text-brass-dark font-medium transition-colors"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset Filters</span>
            </button>
          )}
        </div>

        {/* Minimalist Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {displayedItems.map((item, idx) => {
            const name = item.name[locale as "en" | "ar" | "fr"] || item.name.en;
            const desc = item.description[locale as "en" | "ar" | "fr"] || item.description.en;

            return (
              <motion.article
                key={item.id}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-2xl bg-card border border-border/80 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-brass/70 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Area */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt[locale as "en" | "ar" | "fr"] || item.image.alt.en || name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <span className="text-[10px] font-mono uppercase tracking-wider px-2.5 py-1 rounded-md bg-white/90 backdrop-blur-md text-stone-900 font-semibold border border-white/80 shadow-xs">
                        {item.placement || "Freestanding"}
                      </span>
                    </div>
                  </div>

                  {/* Clean Content Area */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground font-mono">
                      <span className="uppercase text-brass font-semibold">{item.material?.[0] || "Aluminum"}</span>
                      <span>•</span>
                      <span className="capitalize">{item.roofType} Roof</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-brass transition-colors line-clamp-1">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Minimalist Solid Button with Proper Colors */}
                <div className="p-5 sm:p-6 pt-0">
                  <Link
                    href={`/pergola-types/${item.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F6F3EC] hover:bg-brass text-stone-800 hover:text-stone-950 border border-stone-200/90 hover:border-brass text-xs font-semibold transition-all duration-300 flex items-center justify-between group/btn shadow-xs hover:shadow-md"
                  >
                    <span>{isAr ? "استكشف المواصفات" : isFr ? "Voir le Modèle" : "Explore System"}</span>
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

export default PergolaTypesSection;
