"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Cpu, Wind, ShieldCheck, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Settings } from "@/lib/content/schemas";
import { Scene } from "@/components/threeui/Scene";

interface HeroSectionProps {
  settings?: Settings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden bg-[#070B14] text-white pt-10 pb-16 lg:py-20 border-b border-white/10">
      {/* Ambient background glows */}
      <div className="absolute top-1/4 -left-40 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute bottom-10 right-10 w-[550px] h-[550px] bg-[#34AA49]/15 rounded-full blur-[160px] pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(#1e293b_1px,transparent_1px)] [background-size:32px_32px] opacity-35 pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1360px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-10 items-center">
          
          {/* Left Column: Bold Architectural Headline & Natural Actions */}
          <div className="lg:col-span-6 space-y-7">
            {/* Main Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-4xl sm:text-5xl lg:text-6xl font-extrabold font-display text-white tracking-tight leading-[1.08] text-balance"
            >
              {isAr ? (
                <>
                  برجولات ألمنيوم <span className="text-[#34AA49]">معمارية فاخرة</span> لمناخ دبي
                </>
              ) : isFr ? (
                <>
                  Pergolas Bioclimatiques <span className="text-[#34AA49]">d'Exception</span> pour l'Extérieur
                </>
              ) : (
                <>
                  Luxury Engineered <span className="text-[#34AA49]">Architectural Pergolas</span> for UAE Villas
                </>
              )}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-base sm:text-lg text-slate-300 leading-relaxed max-w-xl font-normal"
            >
              {isAr
                ? "أنظمة بيوكليماتيكية متطورة بمحركات أوروبية، أبواب سحاب 20 مم فائقة النحافة، وحسابات إنشائية معتمدة لرياح تصل إلى 4.5 kPa مع ضمان 10 سنوات."
                : isFr
                ? "Motorisation européenne connectée, baies minimalistes de 20 mm et résistance aux vents certifiée 4.5 kPa pour résidences d'exception."
                : "Ultra-slim 20mm sliding systems, smart motorized louver profiles, and certified 4.5 kPa wind resistance engineered for premier Gulf villas."}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="flex flex-wrap items-center gap-4 pt-2"
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-8 rounded-full bg-[#34AA49] hover:bg-[#268537] text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-[#34AA49]/25 hover:shadow-xl transition-all hover:scale-105"
              >
                <Link href="/contact">
                  <span>{isAr ? "طلب عرض سعر مجاني" : isFr ? "Demander un Devis" : "Request Free Quote"}</span>
                  <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-7 rounded-full bg-slate-900/80 hover:bg-slate-800 text-white border-white/20 hover:border-white/40 text-xs font-semibold tracking-wide transition-all"
              >
                <Link href="/projects">
                  <span>{isAr ? "معرض المشاريع المنجزة" : isFr ? "Voir les Réalisations" : "View Installations"}</span>
                </Link>
              </Button>
            </motion.div>

            {/* Micro Tech Specs Specs Strip */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="pt-6 border-t border-white/10 flex flex-wrap items-center gap-6 text-xs text-slate-400 font-mono"
            >
              <div className="flex items-center gap-2">
                <Cpu className="h-4 w-4 text-emerald-400" />
                <span>Somfy Smart Automation</span>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-[#34AA49]" />
                <span>4.5 kPa Wind Rated</span>
              </div>
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>10-Yr Structural Warranty</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: Clean, Unobstructed 3D Architectural Scene Viewport */}
          <div className="lg:col-span-6 relative flex items-center justify-center">
            
            {/* Ambient Lighting Frame */}
            <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/10 via-[#34AA49]/15 to-transparent rounded-[2.5rem] blur-2xl -z-10" />

            {/* Main 3D Container: Full Prominence, Unobstructed, Clean */}
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative w-full h-[480px] sm:h-[540px] lg:h-[600px] rounded-[2.5rem] bg-slate-900/90 border border-slate-700/80 shadow-[0_25px_70px_rgba(0,0,0,0.8)] overflow-hidden backdrop-blur-2xl"
            >
              {/* 3D Scene Interactive Viewport */}
              <Scene
                speed={0.8}
                scale={1.1}
                opacity={1.0}
                hue={0}
                saturation={1.0}
                brightness={1.05}
                className="w-full h-full"
              />

              {/* Bottom Subtle Status Bar */}
              <div className="absolute bottom-0 inset-x-0 p-4 sm:p-5 bg-gradient-to-t from-slate-950 via-slate-950/80 to-transparent flex items-center justify-between text-xs font-mono text-slate-300">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-[#34AA49] animate-pulse" />
                  <span className="text-white font-semibold tracking-wider">
                    {isAr ? "نموذج ثلاثي الأبعاد تفاعلي" : isFr ? "Visualiseur Spatial 3D" : "Interactive 3D Spatial Model"}
                  </span>
                </div>
                <span className="text-slate-400 hidden sm:inline uppercase tracking-widest text-[11px]">
                  {isAr ? "اسحب للتدوير 360°" : isFr ? "Glisser pour pivoter" : "Drag to inspect 360°"}
                </span>
              </div>
            </motion.div>

          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
