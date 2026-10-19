"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { MessageSquare, PhoneCall, ChevronDown, Sparkles } from "lucide-react";
import type { Faq } from "@/lib/content/schemas";

interface FaqSectionProps {
  faqs?: Faq[];
}

export function FaqSection({ faqs = [] }: FaqSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";
  const [openId, setOpenId] = useState<string | null>(faqs[0]?.id || null);

  const toggleItem = (id: string) => {
    setOpenId((curr) => (curr === id ? null : id));
  };

  return (
    <section id="faq" className="py-20 lg:py-28 bg-[#0F172A] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          
          {/* Left Column: Sticky Technical Brief Card */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.15]">
              {isAr
                ? "إجابات مباشرة حول التراخيص والضمان والتركيب"
                : isFr
                ? "Spécifications, Permis & Garanties : Vos Réponses"
                : "Clear Technical Answers: Permits, Specs & 10-Yr Warranty"}
            </h2>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
              {isAr
                ? "كل ما يهمك معرفته حول ترخيص بلدية دبي، سرعات الرياح 4.5 kPa، وضمان محركات Somfy."
                : isFr
                ? "Tout sur les homologations municipales à Dubaï, la résistance aux tempêtes de sable et le SAV."
                : "Detailed explanations covering Dubai Municipality approval procedures, wind load safety factors, and Somfy motor programming."}
            </p>

            {/* Quick Contact Box */}
            <div className="p-6 rounded-3xl bg-slate-900 border border-white/10 space-y-4 shadow-xl">
              <h4 className="text-base font-bold text-white flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-teal-400" />
                <span>{isAr ? "تحتاج استشارة مباشرة؟" : isFr ? "Question Spécifique ?" : "Need Instant Engineering Advice?"}</span>
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                {isAr
                  ? "فريقنا الهندسي متاح للرد على أي استفسارات فنية ومعاينة المخططات المعمارية."
                  : isFr
                  ? "Nos spécialistes étudient vos plans d'architecte et répondent sous 24h."
                  : "Send us your architectural DWG/PDF drawings for immediate structural feasibility review."}
              </p>
              <div className="pt-2">
                <Link
                  href="/contact"
                  className="w-full py-3 px-5 rounded-xl bg-teal-500/20 hover:bg-teal-500 text-teal-300 hover:text-slate-950 border border-teal-500/40 text-xs font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="h-4 w-4" />
                  <span>{isAr ? "تواصل مع المكتب الفني" : isFr ? "Parler à un Ingénieur" : "Contact Technical Desk"}</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Column: Custom Modern Dark FAQ List */}
          <div className="lg:col-span-7 space-y-4">
            {faqs.map((faq, index) => {
              const question = faq.question[locale as "en" | "ar" | "fr"] || faq.question.en;
              const answer = faq.answer[locale as "en" | "ar" | "fr"] || faq.answer.en;
              const isOpen = openId === faq.id;

              return (
                <div
                  key={faq.id}
                  className={`rounded-2xl border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? "bg-slate-900/90 border-teal-500/50 shadow-[0_10px_30px_rgba(20,184,166,0.1)]"
                      : "bg-slate-900/40 border-white/10 hover:border-white/20"
                  }`}
                >
                  <button
                    onClick={() => toggleItem(faq.id)}
                    className="w-full text-left rtl:text-right p-6 sm:p-7 flex items-center justify-between gap-4 cursor-pointer focus:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-xs font-mono font-bold text-teal-400 shrink-0">
                        0{index + 1}
                      </span>
                      <span className="text-base sm:text-lg font-bold font-display text-white">
                        {question}
                      </span>
                    </div>
                    <div
                      className={`h-8 w-8 rounded-full flex items-center justify-center shrink-0 border transition-all duration-300 ${
                        isOpen
                          ? "bg-teal-400 text-slate-950 border-teal-400 rotate-180"
                          : "bg-slate-800 text-slate-400 border-white/10"
                      }`}
                    >
                      <ChevronDown className="h-4 w-4" />
                    </div>
                  </button>

                  {isOpen && (
                    <div className="px-6 sm:px-7 pb-6 pt-1 text-sm text-slate-300 leading-relaxed border-t border-white/5">
                      {answer}
                    </div>
                  )}
                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}

export default FaqSection;
