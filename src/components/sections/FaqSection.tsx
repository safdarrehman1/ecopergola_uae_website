"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Plus, Minus, ArrowUpRight } from "lucide-react";
import type { Faq } from "@/lib/content/schemas";

interface FaqSectionProps {
  faqs?: Faq[];
}

export function FaqSection({ faqs = [] }: FaqSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";
  const [selectedId, setSelectedId] = useState<string | null>(faqs[0]?.id || null);

  const toggleQuestion = (id: string) => {
    setSelectedId((prev) => (prev === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-4xl">
        
        {/* Centered Editorial Header */}
        <div className="text-center space-y-3 mb-16 pb-6 border-b border-stone-200">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-medium block">
            {isAr ? "الاستفسارات المعمارية الشائعة" : isFr ? "Questions Fréquentes" : "Architectural Inquiries"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-stone-900 tracking-tight leading-[1.12]">
            {isAr ? "إجابات هندسية موثقة" : isFr ? "Précisions Techniques & Garanties" : "Technical & Warranty Clarifications"}
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed max-w-xl mx-auto">
            {isAr
              ? "تفاصيل مؤكدة حول تراخيص بلدية دبي ومواصفات الألمنيوم والضمان الهيكلي لمدة 10 سنوات."
              : isFr
              ? "Tout ce que vous devez savoir sur nos agréments, nos délais d'usinage et notre garantie décennale."
              : "Clear technical insights regarding UAE municipality codes, marine coating standards, and our 10-year warranty."}
          </p>
        </div>

        {/* Minimalist Single-Column Hairline Accordion */}
        <div className="divide-y divide-stone-200 border-b border-stone-200">
          {faqs.map((item, index) => {
            const q = item.question[locale as "en" | "ar" | "fr"] || item.question.en;
            const a = item.answer[locale as "en" | "ar" | "fr"] || item.answer.en;
            const isOpen = selectedId === item.id;

            return (
              <div key={item.id} className="py-6 sm:py-8 group">
                <button
                  type="button"
                  onClick={() => toggleQuestion(item.id)}
                  className="w-full text-left rtl:text-right flex items-start justify-between gap-6 cursor-pointer focus:outline-none"
                  aria-expanded={isOpen}
                >
                  <div className="flex items-baseline gap-4 sm:gap-6">
                    <span className="text-xs font-mono text-[#B38E5D] tracking-widest shrink-0">
                      0{index + 1}
                    </span>
                    <span className="text-lg sm:text-xl font-normal font-display text-stone-900 group-hover:text-[#B38E5D] transition-colors leading-snug">
                      {q}
                    </span>
                  </div>

                  <div className="h-6 w-6 rounded-none flex items-center justify-center shrink-0 text-stone-500 group-hover:text-stone-900 transition-colors pt-0.5">
                    {isOpen ? <Minus className="h-4 w-4" /> : <Plus className="h-4 w-4" />}
                  </div>
                </button>

                {isOpen && (
                  <div className="pt-4 pl-8 sm:pl-12 rtl:pr-8 rtl:sm:pr-12 rtl:pl-0 text-xs sm:text-sm text-stone-600 font-light leading-relaxed animate-in fade-in duration-200">
                    <p className="max-w-2xl">{a}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Minimal Editorial Footer Link */}
        <div className="mt-12 text-center">
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-xs font-mono tracking-[0.2em] uppercase text-stone-900 hover:text-[#34AA49] transition-colors border-b border-stone-900 hover:border-[#34AA49] pb-1"
          >
            <span>{isAr ? "تواصل مباشرة مع استوديو التصميم" : isFr ? "Consulter Notre Bureau d'Études" : "Consult with Our Design Studio"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
          </Link>
        </div>

      </div>
    </section>
  );
}

export default FaqSection;
