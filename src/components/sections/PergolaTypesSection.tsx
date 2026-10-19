"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Sliders, Shield, Zap, Wind, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { PergolaType, Material } from "@/lib/content/schemas";

interface PergolaTypesSectionProps {
  pergolas?: PergolaType[];
  materials?: Material[];
  showAll?: boolean;
}

export function PergolaTypesSection({ pergolas = [], materials = [], showAll = false }: PergolaTypesSectionProps) {
  const [activeRoof, setActiveRoof] = useState<string>("all");
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const filtered = pergolas.filter(
    (item) => activeRoof === "all" || item.roofType === activeRoof
  );

  const displayed = showAll ? filtered : filtered.slice(0, 5);
  const featured = displayed[0];
  const secondary = displayed.slice(1, 5);

  const eyebrow = isAr ? "تشكيلة البرجولات الهندسية" : isFr ? "Architectures & Systèmes" : "Bento Systems • Pergola Typologies";
  const title = isAr
    ? "هندسة معمارية مبتكرة وأنظمة أسقف متطورة"
    : isFr
    ? "Architecture Asymétrique & Systèmes Avancés"
    : "Engineered Louvers, Bio-Climatic Pergolas & Canopies";

  return (
    <section id="pergola-types" className="py-20 sm:py-28 bg-[#0A0F1D] text-white relative overflow-hidden border-b border-white/10">
      {/* Background ambient accents */}
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1360px] relative z-10">
        
        {/* Asymmetrical Bento Header */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-14">
          <div className="space-y-3.5 max-w-2xl">
            <h2 className="text-3xl sm:text-5xl font-extrabold font-display tracking-tight text-white leading-tight">
              {title}
            </h2>
          </div>

          {/* Roof Mechanism Bento Pills */}
          <div className="flex flex-wrap items-center gap-2">
            {[
              { id: "all", label: isAr ? "كافة الأنظمة" : isFr ? "Tous" : "All Systems" },
              { id: "louvered", label: isAr ? "شرائح بيوكليماتيك" : isFr ? "Bioclimatique" : "Smart Louvers" },
              { id: "retractable", label: isAr ? "متحركة قابلة للطي" : isFr ? "Rétractable" : "Retractable" },
              { id: "fixed", label: isAr ? "سقف صلب معزول" : isFr ? "Toit Fixe" : "Fixed Insulated" },
            ].map((tab) => (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveRoof(tab.id)}
                className={`px-4 py-2 rounded-full text-xs font-mono font-bold uppercase tracking-wider transition-all cursor-pointer ${
                  activeRoof === tab.id
                    ? "bg-gradient-to-r from-[#34AA49] to-teal-500 text-white shadow-[0_0_20px_rgba(13,148,136,0.4)]"
                    : "bg-slate-900 border border-white/10 text-slate-300 hover:border-teal-500/40 hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Asymmetrical Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Hero Bento Card (Spans 8 columns) */}
          {featured && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="md:col-span-8 relative rounded-3xl bg-slate-900/90 border border-white/10 hover:border-teal-500/50 shadow-2xl overflow-hidden group flex flex-col justify-between transition-all duration-300 min-h-[460px]"
            >
              <div className="relative aspect-[16/9] md:aspect-auto md:h-[320px] w-full overflow-hidden bg-slate-950">
                <Image
                  src={featured.image.src}
                  alt={featured.name[locale as "en" | "ar" | "fr"] || featured.name.en}
                  fill
                  sizes="(max-width: 1024px) 100vw, 66vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                
                {/* Floating Bento Badges */}
                <div className="absolute top-4 left-4 rtl:left-auto rtl:right-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-slate-950/80 backdrop-blur-md border border-teal-500/40 text-teal-300 font-mono text-[11px] font-bold">
                    FEATURED FLAGSHIP
                  </span>
                  <span className="px-3 py-1 rounded-full bg-[#34AA49]/20 border border-[#34AA49]/50 text-[#34AA49] font-mono text-[11px] font-bold">
                    {featured.roofType?.toUpperCase() || "LOUVERED"}
                  </span>
                </div>
              </div>

              <div className="p-7 sm:p-9 space-y-4 relative z-10 bg-slate-900/90 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-teal-300 transition-colors">
                    {featured.name[locale as "en" | "ar" | "fr"] || featured.name.en}
                  </h3>
                  <p className="mt-2 text-sm sm:text-base text-slate-300 line-clamp-2 leading-relaxed">
                    {featured.description[locale as "en" | "ar" | "fr"] || featured.description.en}
                  </p>
                </div>

                <div className="pt-4 border-t border-white/10 flex items-center justify-between">
                  <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
                    <span className="flex items-center gap-1.5"><Wind className="h-4 w-4 text-teal-400" /> Zone 3 Wind</span>
                    <span className="flex items-center gap-1.5"><Shield className="h-4 w-4 text-[#34AA49]" /> 10-Yr Warranty</span>
                  </div>
                  <Link
                    href={`/pergola-types/${featured.slug}`}
                    className="inline-flex items-center gap-2 text-xs font-bold text-teal-300 hover:text-white uppercase tracking-wider transition-colors"
                  >
                    <span>{isAr ? "استكشف المواصفات" : isFr ? "Spécifications" : "Full Blueprint"}</span>
                    <ArrowRight className="h-4 w-4 rtl:rotate-180" />
                  </Link>
                </div>
              </div>
            </motion.div>
          )}

          {/* Secondary Bento Tiles */}
          {secondary.map((item, idx) => {
            const isWide = idx === 1 || idx === 2;
            const spanClass = isWide ? "md:col-span-6" : "md:col-span-4";
            const name = item.name[locale as "en" | "ar" | "fr"] || item.name.en;
            const desc = item.description[locale as "en" | "ar" | "fr"] || item.description.en;

            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className={`${spanClass} relative rounded-3xl bg-slate-900/90 border border-white/10 hover:border-teal-500/50 shadow-xl overflow-hidden group flex flex-col justify-between transition-all duration-300`}
              >
                <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-950">
                  <Image
                    src={item.image.src}
                    alt={name}
                    fill
                    sizes="(max-width: 768px) 100vw, 33vw"
                    className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />
                  <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3">
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-950/80 border border-white/10 text-teal-300 font-mono text-[10px] font-bold uppercase">
                      {item.roofType}
                    </span>
                  </div>
                </div>

                <div className="p-6 space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-lg font-bold font-display text-white group-hover:text-teal-300 transition-colors line-clamp-1">
                      {name}
                    </h4>
                    <p className="mt-1 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                      {desc}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-white/10 flex items-center justify-between">
                    <span className="text-[11px] font-mono text-slate-400">
                      {item.material?.[0] || "Aluminum 6063-T6"}
                    </span>
                    <Link
                      href={`/pergola-types/${item.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-bold text-teal-400 hover:text-white uppercase tracking-wider transition-colors"
                    >
                      <span>{isAr ? "تفاصيل" : isFr ? "Voir" : "Explore"}</span>
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}

        </div>

      </div>
    </section>
  );
}

export default PergolaTypesSection;
