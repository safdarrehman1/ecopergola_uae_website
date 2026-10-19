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
    <section id="pergola-types" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Centered Section Header for Classic Clean style */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-3xl mx-auto mb-10"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#34AA49] mb-2">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-stone-900 leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {subtitle}
          </p>

          {!showAll && (
            <div className="mt-6 flex justify-center">
              <Button
                asChild
                variant="outline"
                className="h-9 px-4 rounded-md border-stone-300 hover:border-[#34AA49] hover:text-[#34AA49] text-stone-800 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Link href="/pergola-types">
                  <span>{isAr ? "دليل البرجولات الكامل (19)" : isFr ? "Explorer les 19 Types" : "Explore All 19 Types"}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {/* Clean Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-10 pb-5 border-b border-stone-200/80">
          <div className="flex flex-wrap items-center justify-center gap-2">
            <span className="text-xs font-medium uppercase tracking-wider text-stone-500 mr-1">Roof:</span>
            {["all", "louvered", "retractable", "fixed"].map((roof) => (
              <button
                key={roof}
                type="button"
                onClick={() => setRoofFilter(roof)}
                className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors ${
                  roofFilter === roof
                    ? "bg-[#34AA49] text-white shadow-xs"
                    : "bg-white border border-stone-200 text-stone-700 hover:bg-stone-50"
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
              className="inline-flex items-center gap-1.5 text-xs text-[#34AA49] hover:text-[#268537] font-medium transition-colors ml-2"
            >
              <RotateCcw className="h-3 w-3" />
              <span>Reset</span>
            </button>
          )}
        </div>

        {/* 3-Column Structured Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
                transition={{ delay: idx * 0.04 }}
                className="group rounded-md bg-white border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Area */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt[locale as "en" | "ar" | "fr"] || item.image.alt.en || name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/95 text-stone-800 font-semibold border border-stone-200 shadow-xs">
                        {item.placement || "Freestanding"}
                      </span>
                    </div>
                  </div>

                  {/* Clean Content Area */}
                  <div className="p-5 space-y-2">
                    <div className="flex items-center gap-2 text-xs text-stone-500 font-medium">
                      <span className="uppercase text-[#34AA49] font-semibold">{item.material?.[0] || "Aluminum"}</span>
                      <span>•</span>
                      <span className="capitalize">{item.roofType} Roof</span>
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#34AA49] transition-colors line-clamp-1">
                      {name}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                      {desc}
                    </p>
                  </div>
                </div>

                {/* Classic Button Link */}
                <div className="p-5 pt-0">
                  <Link
                    href={`/pergola-types/${item.slug}`}
                    className="w-full py-2 px-3.5 rounded-md bg-stone-50 hover:bg-[#34AA49] hover:text-white border border-stone-200 hover:border-[#34AA49] text-stone-800 text-xs font-medium transition-colors flex items-center justify-between group/btn shadow-xs"
                  >
                    <span>{isAr ? "استكشف المواصفات" : isFr ? "Voir le Modèle" : "Explore System"}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-stone-400 group-hover/btn:text-white rtl:rotate-180 transition-colors" />
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
