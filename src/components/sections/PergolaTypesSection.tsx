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
  ChevronDown,
  Layers,
} from "lucide-react";
import { getLocalizedPergolaTypes } from "@/data/localizedData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function PergolaTypesSection() {
  const [activeFilter, setActiveFilter] = useState("all");
  const [visibleCount, setVisibleCount] = useState<number>(6);
  const locale = useLocale();
  const tPergola = useTranslations("pergolaTypes");
  const tCommon = useTranslations("common");
  const pergolas = getLocalizedPergolaTypes(locale);

  const filterTabs = [
    { key: "all", label: tPergola("allStyles") },
    { key: "aluminum", label: tPergola("aluminum") },
    { key: "louvered", label: tPergola("louvered") },
    { key: "wood", label: tPergola("wood") },
    { key: "steel", label: tPergola("steel") },
    { key: "retractable", label: tPergola("retractable") },
    { key: "composite", label: tPergola("composite") },
  ];

  const filteredPergolas = pergolas.filter((p) => {
    if (activeFilter === "all") return true;
    if (activeFilter === "aluminum") return p.material === "aluminum";
    if (activeFilter === "louvered") return p.roofType === "louvered";
    if (activeFilter === "wood") return p.material === "wood";
    if (activeFilter === "steel") return p.material === "steel";
    if (activeFilter === "retractable") return p.roofType === "retractable";
    if (activeFilter === "composite") return p.material === "composite";
    return true;
  });

  const displayedPergolas = filteredPergolas.slice(0, visibleCount);
  const hasMore = visibleCount < filteredPergolas.length;

  const handleFilterChange = (key: string) => {
    setActiveFilter(key);
    setVisibleCount(6); // Reset pagination on filter change
  };

  return (
    <section id="pergola-types" className="py-20 md:py-28 bg-sand/30 dark:bg-card/20 relative overflow-hidden">
      {/* Decorative ambient background */}
      <div className="absolute top-1/4 right-5 w-80 h-80 bg-forest/5 dark:bg-brass/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-12"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 dark:bg-brass/10 border border-forest/20 dark:border-brass/20 text-xs font-bold text-forest dark:text-brass uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brass" />
            <span>{tPergola("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground tracking-tight">
            {tPergola("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tPergola("subtitle")}
          </p>
        </motion.div>

        {/* Filter Bar */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {filterTabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => handleFilterChange(tab.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeFilter === tab.key
                  ? "bg-forest text-white shadow-md dark:bg-brass dark:text-ink scale-105"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Pergola Cards Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedPergolas.map((pergola, index) => (
              <motion.div
                layout
                key={pergola.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.05 }}
                className="group rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:border-brass/60 hover:shadow-[0_20px_45px_-12px_rgba(184,137,90,0.3)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Image with Badges */}
                  <div className="relative h-60 w-full overflow-hidden bg-muted">
                    <Image
                      src={pergola.image}
                      alt={pergola.name}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10 flex flex-wrap gap-1.5">
                      {pergola.badge && (
                        <Badge variant="brass" className="text-[10px] font-bold uppercase tracking-wider shadow-md">
                          {pergola.badge}
                        </Badge>
                      )}
                      <Badge variant="glass" className="text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border-white/20 text-white">
                        {pergola.roofType}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-sand-light">
                      <span className="capitalize font-semibold text-brass-light flex items-center gap-1">
                        <Layers className="h-3.5 w-3.5" />
                        {pergola.material}
                      </span>
                      <span className="capitalize bg-white/15 backdrop-blur-md px-2 py-0.5 rounded text-[11px] text-white">
                        {pergola.placement}
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold font-display text-foreground group-hover:text-brass transition-colors leading-snug">
                      {pergola.name}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {pergola.description}
                    </p>

                    {/* Features Preview */}
                    <div className="pt-2.5 space-y-1.5 border-t border-border/60">
                      {pergola.features.slice(0, 2).map((feat, i) => (
                        <div key={i} className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <CheckCircle2 className="h-3.5 w-3.5 text-forest dark:text-brass shrink-0" />
                          <span className="truncate">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Link */}
                <div className="p-6 pt-0">
                  <Button
                    asChild
                    variant="outline"
                    className="w-full rounded-xl font-semibold hover:border-brass group-hover:bg-brass group-hover:text-ink transition-all shadow-sm"
                  >
                    <Link href={`/pergola-types/${pergola.slug}`}>
                      <span>{tCommon("viewDetails")}</span>
                      <ArrowRight className="h-4 w-4 ml-1.5 rtl:rotate-180 rtl:mr-1.5 rtl:ml-0 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More & Catalog Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore && (
            <Button
              variant="brass"
              size="lg"
              onClick={() => setVisibleCount((prev) => Math.min(filteredPergolas.length, prev + 6))}
              className="rounded-xl font-semibold shadow-md shadow-brass/20"
            >
              <span>{tCommon("loadMore")} ({filteredPergolas.length - visibleCount} more)</span>
              <ChevronDown className="h-4 w-4 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl font-semibold hover:border-brass border-border bg-card/80 backdrop-blur-md"
          >
            <Link href="/pergola-types">
              <span>{tPergola("allStyles")} (19 Styles)</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

