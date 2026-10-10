"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import { MapPin, Calendar, ArrowRight, Sparkles, ChevronDown, Check } from "lucide-react";
import { getLocalizedProjects } from "@/data/localizedData";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export function ProjectsSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [visibleCount, setVisibleCount] = useState<number>(3);
  const locale = useLocale();
  const tProjects = useTranslations("projects");
  const tCommon = useTranslations("common");
  const projects = getLocalizedProjects(locale);

  const categories = [
    { key: "All", label: tProjects("all") },
    { key: "Residential", label: tProjects("residential") },
    { key: "Commercial", label: tProjects("commercial") },
    { key: "Villa", label: tProjects("villa") },
    { key: "Hospitality", label: tProjects("hospitality") },
    { key: "Hotel", label: tProjects("hotel") },
  ];

  const filteredProjects = projects.filter((p) => {
    if (activeCategory === "All") return true;
    return (
      p.category.toLowerCase().includes(activeCategory.toLowerCase()) ||
      (activeCategory === "Residential" && p.category.includes("Residential")) ||
      (activeCategory === "Commercial" && p.category.includes("Commercial"))
    );
  });

  const displayedProjects = filteredProjects.slice(0, visibleCount);
  const hasMore = visibleCount < filteredProjects.length;

  const handleCategoryChange = (key: string) => {
    setActiveCategory(key);
    setVisibleCount(3);
  };

  return (
    <section id="projects" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Ambient decorative glow */}
      <div className="absolute top-1/3 left-0 w-80 h-80 bg-forest/5 dark:bg-brass/5 rounded-full blur-3xl pointer-events-none" />

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
            <span>{tProjects("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground tracking-tight">
            {tProjects("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tProjects("subtitle")}
          </p>
        </motion.div>

        {/* Category Filter Chips */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-12">
          {categories.map((cat) => (
            <button
              key={cat.key}
              onClick={() => handleCategoryChange(cat.key)}
              className={`px-4 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all duration-200 cursor-pointer ${
                activeCategory === cat.key
                  ? "bg-forest text-white shadow-md dark:bg-brass dark:text-ink scale-105"
                  : "bg-card hover:bg-muted text-muted-foreground hover:text-foreground border border-border"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Projects Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <AnimatePresence>
            {displayedProjects.map((project, index) => (
              <motion.div
                layout
                key={project.id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.35, delay: index * 0.06 }}
                className="group rounded-3xl bg-card border border-border overflow-hidden shadow-sm hover:border-brass/60 hover:shadow-[0_20px_45px_-12px_rgba(184,137,90,0.3)] transition-all duration-500 flex flex-col justify-between"
              >
                <div>
                  {/* Project Image */}
                  <div className="relative h-64 w-full overflow-hidden bg-muted">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/25 to-transparent" />

                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 z-10">
                      <Badge variant="glass" className="text-[10px] font-bold uppercase tracking-wider bg-black/40 backdrop-blur-md border-white/20 text-white shadow-md">
                        {project.category}
                      </Badge>
                    </div>

                    <div className="absolute bottom-3 left-4 right-4 z-10 flex items-center justify-between text-xs text-sand-light">
                      <div className="flex items-center gap-1.5 font-medium">
                        <MapPin className="h-3.5 w-3.5 text-brass" />
                        <span className="truncate max-w-[170px]">{project.location}</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-black/40 backdrop-blur-md px-2 py-0.5 rounded text-[11px] font-bold text-white">
                        <Calendar className="h-3 w-3 text-brass" />
                        <span>{project.year}</span>
                      </div>
                    </div>
                  </div>

                  {/* Body Content */}
                  <div className="p-6 space-y-3">
                    <h3 className="text-xl font-bold font-display text-foreground group-hover:text-brass transition-colors leading-snug">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                      {project.description}
                    </p>

                    {/* Scope Micro Chips */}
                    <div className="pt-2.5 flex flex-wrap gap-1.5 border-t border-border/50">
                      {project.scope?.slice(0, 2).map((item, i) => (
                        <span
                          key={i}
                          className="inline-flex items-center gap-1 text-[10px] font-medium bg-sand/30 dark:bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-md truncate max-w-full"
                        >
                          <Check className="h-2.5 w-2.5 text-brass shrink-0" />
                          <span className="truncate">{item}</span>
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Footer Action */}
                <div className="p-6 pt-0 border-t border-border/50">
                  <div className="flex items-center justify-between pt-4">
                    <div className="text-xs text-muted-foreground">
                      <span className="font-semibold text-foreground">{project.location.split(",")[0]}</span>
                    </div>
                    <Link
                      href={`/projects/${project.id}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-forest dark:text-brass group-hover:underline uppercase tracking-wider"
                    >
                      <span>{tProjects("viewDetails")}</span>
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Load More & Explore Portfolio Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore && (
            <Button
              variant="brass"
              size="lg"
              onClick={() => setVisibleCount((prev) => Math.min(filteredProjects.length, prev + 3))}
              className="rounded-xl font-semibold shadow-md shadow-brass/20"
            >
              <span>{tCommon("loadMore")} ({filteredProjects.length - visibleCount} more)</span>
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
              <span>{tProjects("all")} (18 Projects)</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

