"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowUpRight, MapPin } from "lucide-react";
import type { Project } from "@/lib/content/schemas";

export function ProjectsSection({ projects = [], showAll = false }: { projects?: Project[]; showAll?: boolean }) {
  const currentLang = useLocale();
  const isArabic = currentLang === "ar";
  const isFrench = currentLang === "fr";

  const entries = showAll ? projects : projects.slice(0, 3);

  return (
    <section id="projects" className="py-24 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px]">
        
        {/* Monograph Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-medium block">
              {isArabic ? "دراسات الحالة المعمارية" : isFrench ? "Monographies de Projets" : "Project Monographies"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-stone-900 tracking-tight leading-[1.12]">
              {isArabic
                ? "أعمال معمارية منفذة في أبرز وجهات دبي"
                : isFrench
                ? "Ouvrages Livrés aux Plus Prestigieuses Adresses"
                : "Delivered Architectural Case Studies"}
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {isArabic
                ? "توثيق فوتوغرافي وهندسي لمشاريع تم تسليمها في نخلة جميرا، تلال الإمارات، وتلال دبي."
                : isFrench
                ? "Documentation photographique et détails structurels de nos réalisations haut de gamme aux Émirats."
                : "Architectural documentation detailing structural parameters and finishes of recent bespoke villa completions."}
            </p>
          </div>

          {!showAll && (
            <Link
              href="/projects"
              className="self-start md:self-end text-xs font-mono tracking-[0.2em] uppercase text-stone-900 hover:text-[#B38E5D] transition-colors border-b border-stone-900 hover:border-[#B38E5D] pb-1 inline-flex items-center gap-2 shrink-0"
            >
              <span>{isArabic ? "كافة دراسات الحالة" : isFrench ? "Toutes les Monographies" : "Complete Case Index"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
            </Link>
          )}
        </div>

        {/* Full-Bleed Alternating Rows */}
        <div className="space-y-20 lg:space-y-28">
          {entries.map((caseItem, idx) => {
            const headline = caseItem.title[currentLang as "en" | "ar" | "fr"] || caseItem.title.en;
            const district = caseItem.location[currentLang as "en" | "ar" | "fr"] || caseItem.location.en;
            const narrative = caseItem.summary[currentLang as "en" | "ar" | "fr"] || caseItem.summary.en;
            const alternate = idx % 2 === 1;

            return (
              <div
                key={caseItem.id}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center ${
                  alternate ? "lg:grid-flow-dense" : ""
                } pt-8 border-t border-stone-200 first:border-t-0 first:pt-0`}
              >
                {/* Visual Imagery */}
                <div
                  className={`lg:col-span-7 ${
                    alternate ? "lg:col-start-6" : ""
                  }`}
                >
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-200 group">
                    <Image
                      src={caseItem.image.src}
                      alt={caseItem.image.alt[currentLang as "en" | "ar" | "fr"] || caseItem.image.alt.en || headline}
                      fill
                      sizes="(max-width: 1024px) 100vw, 60vw"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-white/95 text-stone-900 text-[10px] font-mono tracking-widest uppercase border border-stone-200">
                        <MapPin className="h-3 w-3 text-[#B38E5D]" />
                        <span>{district}</span>
                      </span>
                    </div>
                  </div>
                </div>

                {/* Narrative Details */}
                <div
                  className={`lg:col-span-5 space-y-6 ${
                    alternate ? "lg:col-start-1" : ""
                  }`}
                >
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-xs font-mono tracking-widest text-[#B38E5D] uppercase">
                      <span>CASE // 0{idx + 1}</span>
                      <span>•</span>
                      <span>{caseItem.year}</span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl lg:text-4xl font-normal font-display text-stone-900 tracking-tight leading-tight">
                      {headline}
                    </h3>

                    <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                      {narrative}
                    </p>
                  </div>

                  <div className="border-t border-stone-200 pt-4 space-y-2 text-xs font-mono text-stone-600">
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500 uppercase">Architecture:</span>
                      <span className="font-semibold text-stone-800">Motorized Louvered Pergola</span>
                    </div>
                    <div className="flex justify-between py-1 border-b border-stone-100">
                      <span className="text-stone-500 uppercase">Alloy Spec:</span>
                      <span className="font-semibold text-stone-800">6063-T6 Marine Aluminum</span>
                    </div>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/projects/${caseItem.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-stone-900 hover:text-[#34AA49] transition-colors border-b border-stone-900 hover:border-[#34AA49] pb-1"
                    >
                      <span>{isArabic ? "قراءة دراسة الحالة" : isFrench ? "Monographie Complète" : "View Case Monograph"}</span>
                      <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
                    </Link>
                  </div>
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
