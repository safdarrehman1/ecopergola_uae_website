"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/content/schemas";

interface ServicesSectionProps {
  services?: Service[];
  showAll?: boolean;
}

export function ServicesSection({ services = [], showAll = false }: ServicesSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const list = showAll ? services : services.slice(0, 5);

  const eyebrow = isAr ? "فهرس الخدمات الهندسية" : isFr ? "Répertoire des Compétences" : "Engineering Capabilities";
  const title = isAr
    ? "خدمات متخصصة في التصنيع والتركيب المعماري"
    : isFr
    ? "Prestations Spécialisées en Enveloppe & Métallerie"
    : "Architectural Envelope & Glazing Disciplines";
  const intro = isAr
    ? "خبرة ممتدة في قطاعات الألمنيوم الفاخرة، الأبواب المنزلقة الدقيقة، وتطوير الواجهات لفلل الإمارات."
    : isFr
    ? "Un atelier d'ingénierie dédié aux profilés minimaux, façades vitrées et structures architecturales."
    : "Comprehensive in-house manufacturing in Dubai covering structural curtain walls, minimal doors, and custom pergolas.";

  return (
    <section id="services" className="py-20 lg:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1360px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-medium block">
              {eyebrow}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-stone-900 tracking-tight leading-[1.12]">
              {title}
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {intro}
            </p>
          </div>

          {!showAll && (
            <Link
              href="/services"
              className="self-start md:self-end text-xs font-mono tracking-[0.2em] uppercase text-stone-900 hover:text-[#B38E5D] transition-colors border-b border-stone-900 hover:border-[#B38E5D] pb-1 inline-flex items-center gap-2 shrink-0"
            >
              <span>{isAr ? "جميع الخدمات" : isFr ? "Toutes les Prestations" : "Full Discipline Index"}</span>
              <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
            </Link>
          )}
        </div>

        {/* Numbered Text List with Hairlines */}
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {list.map((item, idx) => {
            const heading = item.title[locale as "en" | "ar" | "fr"] || item.title.en;
            const summary = item.summary[locale as "en" | "ar" | "fr"] || item.summary.en;
            const itemCode = `DISCIPLINE // 0${idx + 1}`;

            return (
              <div
                key={item.id}
                className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-stone-100/50 transition-colors px-2 sm:px-4"
              >
                {/* Index Code */}
                <div className="md:col-span-2">
                  <span className="text-xs font-mono tracking-widest text-[#B38E5D]">
                    {itemCode}
                  </span>
                </div>

                {/* Title and Category */}
                <div className="md:col-span-4 space-y-1">
                  <h3 className="text-xl sm:text-2xl font-normal font-display text-stone-900 group-hover:text-[#B38E5D] transition-colors">
                    {heading}
                  </h3>
                  <div className="text-[10px] font-mono tracking-wider uppercase text-stone-600">
                    {isAr ? "دبي • معايير كواليكوت" : isFr ? "Fabrication Dubaï" : "Dubai Fabrication • Class 2"}
                  </div>
                </div>

                {/* Description Narrative */}
                <div className="md:col-span-4">
                  <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                    {summary}
                  </p>
                </div>

                {/* Action Link */}
                <div className="md:col-span-2 md:text-right rtl:md:text-left">
                  <Link
                    href={`/services/${item.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-stone-900 group-hover:text-[#34AA49] transition-colors border-b border-transparent group-hover:border-[#34AA49] pb-0.5"
                  >
                    <span>{isAr ? "المواصفات" : isFr ? "Détails" : "Specifications"}</span>
                    <ArrowUpRight className="h-3 w-3 rtl:rotate-270" />
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

export default ServicesSection;
