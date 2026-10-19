"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowUpRight } from "lucide-react";
import type { PergolaType } from "@/lib/content/schemas";

export function PergolaTypesSection({
  pergolas = [],
  showAll = false,
}: {
  pergolas?: PergolaType[];
  materials?: unknown[];
  showAll?: boolean;
}) {
  const activeLang = useLocale();
  const arMode = activeLang === "ar";
  const frMode = activeLang === "fr";
  const items = showAll ? pergolas : pergolas.slice(0, 8);

  return (
    <section id="pergolas" className="py-24 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px]">
        
        {/* Minimalist Editorial Headline */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-medium block">
              {arMode ? "النماذج الهندسية للبرجولات" : frMode ? "Typologies Architecturales" : "Architectural Typologies"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-stone-900 tracking-tight leading-[1.12]">
              {arMode
                ? "مجموعة البرجولات المعمارية المخصصة للفلل"
                : frMode
                ? "Catalogue des Structures Extérieures sur Mesure"
                : "Curated Architectural Pergola Systems"}
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {arMode
                ? "تصاميم حصرية تم تطويرها لتلائم الظروف المناخية في دولة الإمارات وتتناغم مع الطراز المعماري الحديث."
                : frMode
                ? "Conçues pour résister aux températures extrêmes tout en sublimant les lignes épurées de votre propriété."
                : "Bespoke aluminum geometries engineered to endure Gulf climates while elevating contemporary villa architecture."}
            </p>
          </div>

          <Link
            href="/pergola-types"
            className="self-start md:self-end text-xs font-mono tracking-[0.2em] uppercase text-stone-900 hover:text-[#B38E5D] transition-colors border-b border-stone-900 hover:border-[#B38E5D] pb-1 inline-flex items-center gap-2 shrink-0"
          >
            <span>{arMode ? "استعراض كافة النماذج" : frMode ? "Voir la Collection" : "View Entire Index"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
          </Link>
        </div>

        {/* Horizontal Borderless Image Plates */}
        <div className="flex gap-8 lg:gap-10 overflow-x-auto scrollbar-none pb-6 -mx-6 px-6 sm:-mx-10 sm:px-10 lg:-mx-16 lg:px-16" style={{ scrollbarWidth: "none" }}>
          {items.map((p, i) => {
            const pTitle = p.name[activeLang as "en" | "ar" | "fr"] || p.name.en;
            const pSummary = p.description[activeLang as "en" | "ar" | "fr"] || p.description.en;

            return (
              <div
                key={p.id}
                className="shrink-0 w-[290px] sm:w-[350px] md:w-[390px] group flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[3/4] w-full overflow-hidden bg-stone-200">
                    <Image
                      src={p.image.src}
                      alt={p.image.alt[activeLang as "en" | "ar" | "fr"] || p.image.alt.en || pTitle}
                      fill
                      sizes="(max-width: 640px) 300px, 400px"
                      className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                    />
                    
                    <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4">
                      <span className="text-[10px] font-mono tracking-widest text-stone-900 uppercase bg-white/95 px-2.5 py-1 border border-stone-200">
                        0{i + 1}
                      </span>
                    </div>
                  </div>

                  <div className="pt-4 space-y-1.5">
                    <div className="text-[10px] font-mono tracking-[0.2em] text-[#B38E5D] uppercase">
                      {arMode ? "نظام ألمنيوم 6063-T6" : frMode ? "Système Aluminium 6063-T6" : "6063-T6 Marine System"}
                    </div>
                    
                    <h3 className="text-xl sm:text-2xl font-normal font-display text-stone-900 group-hover:text-[#B38E5D] transition-colors">
                      {pTitle}
                    </h3>

                    <p className="text-xs sm:text-[13px] text-stone-600 font-light leading-relaxed line-clamp-3">
                      {pSummary}
                    </p>
                  </div>
                </div>

                <div className="pt-3">
                  <Link
                    href={`/pergola-types/${p.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-mono tracking-wider uppercase text-stone-800 hover:text-[#34AA49] transition-colors border-b border-transparent hover:border-[#34AA49] pb-0.5"
                  >
                    <span>{arMode ? "تفاصيل المواصفات" : frMode ? "Fiche Technique" : "Architectural Sheet"}</span>
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

export default PergolaTypesSection;
