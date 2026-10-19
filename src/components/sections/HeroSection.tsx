"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Compass, ShieldCheck } from "lucide-react";
import type { Settings } from "@/lib/content/schemas";

interface HeroSectionProps {
  settings?: Settings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const mainHeading = isAr
    ? "هندسة معمارية نقية للمساحات الخارجية الراقية"
    : isFr
    ? "L'Art de Vivre Extérieur, Conçu avec Pureté"
    : "Outdoor Architecture, Purely Engineered";

  const leadCopy = isAr
    ? "أنظمة برجولات بيوكليماتيكية مخصصة وواجهات زجاجية رقيقة صممت وفق أدق المعايير الهندسية في دبي مع ضمان 10 سنوات."
    : isFr
    ? "Structures bioclimatiques d'exception et baies vitrées ultra-fines pour résidences de prestige à Dubaï. Garantie décennale."
    : "Custom bio-climatic pergola systems and minimal glass envelopes engineered for premier UAE residences with a 10-year warranty.";

  const discoverLink = isAr ? "استكشف الكتالوج المعماري" : isFr ? "Explorer les Collections" : "Explore Collections";
  const quoteLink = isAr ? "طلب استشارة معمارية" : isFr ? "Demande de Devis Atelier" : "Request Private Consultation";

  return (
    <section className="relative w-full h-[92vh] min-h-[640px] max-h-[960px] flex items-end overflow-hidden bg-stone-950">
      {/* Edge-to-Edge Architectural Photography Background */}
      <div className="absolute inset-0">
        <Image
          src="/images/gallery/gallery-2.webp"
          alt="Eco Pergola Architectural Aluminum Villa Installation"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        {/* Subtle Architectural Vignette & Gradient for High Contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950 via-stone-950/50 to-stone-950/20" />
        <div className="absolute inset-0 bg-black/20" />
      </div>

      {/* Foreground Content: Anchored at Bottom-Left */}
      <div className="relative z-10 w-full container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px] pb-14 sm:pb-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          
          {/* Main Headline & Text Link Block (Bottom-Left) */}
          <div className="lg:col-span-8 space-y-6">
            
            {/* Atelier Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-3 text-[11px] font-mono tracking-[0.3em] uppercase text-stone-300"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-[#B38E5D]" />
              <span>{isAr ? "دبي • تصنيع معماري متخصص" : isFr ? "Dubaï • Manufacture Architecturale" : "Dubai • Architectural Manufacture"}</span>
            </motion.div>

            {/* Large Minimal Serif Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15 }}
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-normal font-display text-white tracking-tight leading-[1.06] text-balance max-w-4xl"
            >
              {mainHeading}
            </motion.h1>

            {/* Refined Supporting Narrative */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-sm sm:text-base text-stone-300 font-light leading-relaxed max-w-2xl text-balance"
            >
              {leadCopy}
            </motion.p>

            {/* Elegant Minimalist Text Link CTAs */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.45 }}
              className="flex flex-wrap items-center gap-8 pt-2"
            >
              <Link
                href="/contact"
                className="group inline-flex items-center gap-3 text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-white hover:text-[#B38E5D] transition-colors border-b border-white/60 hover:border-[#B38E5D] pb-1.5"
              >
                <span>{quoteLink}</span>
                <ArrowUpRight className="h-4 w-4 rtl:rotate-270 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>

              <Link
                href="/pergola-types"
                className="text-xs sm:text-sm font-mono tracking-[0.2em] uppercase text-stone-300 hover:text-white transition-colors border-b border-transparent hover:border-stone-400 pb-1.5"
              >
                <span>{discoverLink}</span>
              </Link>
            </motion.div>
          </div>

          {/* Bottom Right: Architectural Coordinates & Specs */}
          <div className="lg:col-span-4 lg:text-right rtl:lg:text-left space-y-3 pt-4 border-t border-stone-700/60 lg:border-t-0">
            <div className="flex items-center lg:justify-end rtl:lg:justify-start gap-2 text-xs font-mono text-stone-400 uppercase tracking-widest">
              <Compass className="h-3.5 w-3.5 text-[#B38E5D]" />
              <span>25.2048° N, 55.2708° E</span>
            </div>
            <div className="flex items-center lg:justify-end rtl:lg:justify-start gap-2 text-xs font-mono text-stone-400 uppercase tracking-widest">
              <ShieldCheck className="h-3.5 w-3.5 text-[#B38E5D]" />
              <span>10-Year Structural Guarantee</span>
            </div>
            <p className="text-[11px] font-mono text-stone-500 uppercase tracking-wider">
              Qualicoat Seaside Class 2 Finish
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
