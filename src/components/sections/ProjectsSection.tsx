"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MapPin, ArrowUpRight, ArrowLeft, ArrowRight, Layers } from "lucide-react";
import type { Project } from "@/lib/content/schemas";

export function ProjectsSection({ projects = [], showAll = false }: { projects?: Project[]; showAll?: boolean }) {
  const currentLocale = useLocale();
  const isArabic = currentLocale === "ar";
  const isFrench = currentLocale === "fr";
  const scrollRef = useRef<HTMLDivElement>(null);
  const [cardIndex, setCardIndex] = useState(0);

  const projectItems = showAll ? projects : projects.slice(0, 6);

  const navigateTrack = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const scrollStep = 520;
    const delta = direction === "right" ? scrollStep : -scrollStep;
    scrollRef.current.scrollBy({
      left: isArabic ? -delta : delta,
      behavior: "smooth",
    });
    setCardIndex((curr) => (direction === "right" ? Math.min(curr + 1, projectItems.length - 1) : Math.max(curr - 1, 0)));
  };

  return (
    <section id="projects" className="py-24 bg-[#0F172A] text-white overflow-hidden relative border-t border-white/5">
      {/* Dynamic ambient halo */}
      <div className="absolute top-10 left-1/3 w-[500px] h-[250px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        
        {/* Carousel Header Bar */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-14">
          <div className="space-y-3 max-w-xl">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
              {isArabic ? "مشاريع معمارية رائدة في دبي" : isFrench ? "Réalisations d'Exception à Dubaï" : "Signature Projects Across Dubai"}
            </h2>

            <p className="text-sm sm:text-base text-slate-400">
              {isArabic
                ? "نماذج موثقة للفلل السكنية الفاخرة والمشاريع التجارية مع أعلى معايير التشطيب."
                : isFrench
                ? "Découvrez nos structures installées à Palm Jumeirah, Emirates Hills et Dubai Hills."
                : "Explore our recently completed custom installations spanning Palm Jumeirah to Dubai Hills."}
            </p>
          </div>

          {/* Slider Arrow Controls */}
          <div className="flex items-center gap-4 self-start md:self-end">
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => navigateTrack("left")}
                aria-label="Previous Project"
                className="h-12 w-12 rounded-full bg-slate-900 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ArrowLeft className="h-5 w-5 rtl:rotate-180" />
              </button>
              <button
                type="button"
                onClick={() => navigateTrack("right")}
                aria-label="Next Project"
                className="h-12 w-12 rounded-full bg-slate-900 border border-white/10 hover:border-teal-400 hover:bg-teal-500/10 text-white flex items-center justify-center transition-all cursor-pointer shadow-md"
              >
                <ArrowRight className="h-5 w-5 rtl:rotate-180" />
              </button>
            </div>

            {!showAll && (
              <Link
                href="/projects"
                className="h-12 px-6 rounded-full bg-slate-800 hover:bg-slate-700 border border-white/10 text-white text-xs font-bold uppercase tracking-wider inline-flex items-center gap-2 transition-colors"
              >
                <span>{isArabic ? "كل المشاريع" : isFrench ? "Tout Voir" : "All Case Studies"}</span>
                <ArrowUpRight className="h-4 w-4 rtl:rotate-270" />
              </Link>
            )}
          </div>
        </div>

        {/* Snap Track Area */}
        <div
          ref={scrollRef}
          className="flex gap-6 sm:gap-8 overflow-x-auto snap-x snap-mandatory scrollbar-none pb-4 -mx-4 px-4 sm:-mx-6 sm:px-6 lg:-mx-12 lg:px-12"
          style={{ scrollbarWidth: "none" }}
        >
          {projectItems.map((item, i) => {
            const heading = item.title[currentLocale as "en" | "ar" | "fr"] || item.title.en;
            const place = item.location[currentLocale as "en" | "ar" | "fr"] || item.location.en;
            const excerpt = item.summary[currentLocale as "en" | "ar" | "fr"] || item.summary.en;

            return (
              <div
                key={item.id}
                className="w-[84vw] sm:w-[460px] lg:w-[520px] shrink-0 snap-start rounded-[28px] bg-slate-900 border border-white/10 hover:border-teal-400/50 p-6 flex flex-col justify-between shadow-2xl transition-all duration-300 group"
              >
                <div className="space-y-5">
                  {/* Photo with Tag */}
                  <div className="relative aspect-[16/10] w-full rounded-2xl overflow-hidden bg-slate-800">
                    <Image
                      src={item.image.src}
                      alt={item.image.alt[currentLocale as "en" | "ar" | "fr"] || item.image.alt.en || heading}
                      fill
                      sizes="(max-width: 640px) 85vw, 520px"
                      className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                    
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-teal-300 text-xs font-mono font-bold">
                      <MapPin className="h-3 w-3 text-teal-400" />
                      <span>{place}</span>
                    </div>

                    <div className="absolute bottom-3 right-3 rtl:right-auto rtl:left-3 px-2.5 py-1 rounded-full bg-slate-900/90 text-[11px] font-mono text-slate-300 border border-white/10">
                      {item.year}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-mono text-teal-400 uppercase tracking-widest font-bold">
                      PROJECT 0{i + 1}
                    </span>
                    <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                      {heading}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-400 leading-relaxed line-clamp-2">
                      {excerpt}
                    </p>
                  </div>
                </div>

                <div className="pt-6 mt-4 border-t border-white/10">
                  <Link
                    href={`/projects/${item.slug}`}
                    className="w-full py-3 px-5 rounded-xl bg-slate-800 hover:bg-[#34AA49] text-white border border-white/10 hover:border-[#34AA49] text-xs font-bold uppercase tracking-wider transition-all duration-300 flex items-center justify-between"
                  >
                    <span>{isArabic ? "تفاصيل المشروع" : isFrench ? "Détails de l'Étude" : "View Project Specs"}</span>
                    <ArrowRight className="h-4 w-4 text-teal-400 rtl:rotate-180 group-hover:text-white" />
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ProjectsSection;
