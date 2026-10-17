"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles, Compass } from "lucide-react";
import { Button } from "@/components/ui/button";
import { heroTextVariants, heroCopyTransition } from "@/lib/motion";
import type { Settings } from "@/lib/content/schemas";
import { Scene } from "@/components/threeui/Scene";

interface HeroSectionProps {
  settings?: Settings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const headline = isAr
    ? "مساحات خارجية، بهندسة معمارية متقنة"
    : isFr
    ? "Des espaces extérieurs pensés et conçus avec précision"
    : "Outdoor spaces, thoughtfully engineered";

  const subheadline = isAr
    ? "برجولات بيوكليماتيكية ذكية، أبواب منزلقة دقيقة، وواجهات زجاجية مخصصة لمناخ دبي والإمارات مع ضمان هيكلي 10 سنوات."
    : isFr
    ? "Pergolas bioclimatiques motorisées, baies coulissantes minimales et façades architecturales conçues pour le climat de Dubaï avec garantie décennale."
    : "Custom bio-climatic pergolas, minimal sliding glass systems, and architectural facades engineered for Dubai's climate with 10-year structural warranty.";

  const primaryCta = isAr ? "طلب عرض سعر" : isFr ? "Demander un Devis" : "Request a Quote";
  const secondaryCta = isAr ? "استكشف البرجولات" : isFr ? "Découvrir les Pergolas" : "Explore Pergolas";
  const badgeText = isAr ? "تصنيع وتركيب في دبي والإمارات" : isFr ? "Conception & Fabrication à Dubaï" : "Engineered & Fabricated in Dubai";

  return (
    <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center overflow-hidden bg-gradient-to-b from-[#FAF8F5] via-[#F4EFE6] to-[#FFFFFF] text-stone-900 pt-8 pb-14 lg:py-16 border-b border-stone-200/60">
      {/* Soft Ambient Architectural Light Rays & Grid Texture */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-1/4 w-[600px] h-[600px] bg-amber-200/25 rounded-full blur-[140px]" />
        <div className="absolute -bottom-20 -left-20 w-[500px] h-[500px] bg-stone-300/30 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:28px_28px] opacity-40" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1360px] relative z-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Value Proposition & Engineering Trust */}
          <div className="lg:col-span-6 space-y-6">
            {/* Minimalist Architectural Eyebrow */}
            <motion.div
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-amber-300/80 shadow-[0_2px_10px_rgba(197,155,75,0.12)] backdrop-blur-md text-[11px] font-mono tracking-widest uppercase text-stone-800"
            >
              <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
              <span className="text-amber-900 font-semibold">{badgeText}</span>
            </motion.div>

            {/* Main H1 Headline */}
            <motion.h1
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ ...heroCopyTransition, delay: 0.1 }}
              className="text-[34px] sm:text-[44px] md:text-[52px] lg:text-[56px] xl:text-[62px] font-bold font-display tracking-tight text-stone-900 leading-[1.08] text-balance"
            >
              {headline}
            </motion.h1>

            {/* Supporting Paragraph */}
            <motion.p
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ ...heroCopyTransition, delay: 0.2 }}
              className="text-[15px] sm:text-[16px] text-stone-600 leading-[1.65] max-w-xl"
            >
              {subheadline}
            </motion.p>

            {/* Primary Action Buttons */}
            <motion.div
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ ...heroCopyTransition, delay: 0.3 }}
              className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3.5 pt-1"
            >
              <Button
                asChild
                size="lg"
                className="h-12 px-7 rounded-xl bg-gradient-to-r from-brass via-brass-light to-brass hover:brightness-105 text-stone-950 font-bold text-sm shadow-xl shadow-brass/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/contact">
                  <span>{primaryCta}</span>
                  <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                size="lg"
                className="h-12 px-7 rounded-xl bg-white hover:bg-stone-50 text-stone-800 border-stone-300 shadow-xs transition-all hover:scale-[1.02] active:scale-[0.98]"
              >
                <Link href="/pergola-types">
                  <span>{secondaryCta}</span>
                </Link>
              </Button>
            </motion.div>

            {/* Minimalist Specifications Line */}
            <motion.div
              variants={heroTextVariants}
              initial="hidden"
              animate="visible"
              transition={{ ...heroCopyTransition, delay: 0.4 }}
              className="pt-6 border-t border-stone-200/90 grid grid-cols-2 sm:grid-cols-3 gap-4 text-xs text-stone-700"
            >
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-brass shrink-0" />
                <span className="font-semibold">{isAr ? "ضمان هيكلي 10 سنوات" : isFr ? "Garantie 10 ans" : "10-Year Warranty"}</span>
              </div>
              <div className="flex items-center gap-2">
                <Sparkles className="h-4 w-4 text-brass shrink-0" />
                <span className="font-semibold">{isAr ? "طلاء كواليكوت فئة 2" : isFr ? "Qualicoat Classe 2" : "Qualicoat Class 2"}</span>
              </div>
              <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                <Compass className="h-4 w-4 text-brass shrink-0" />
                <span className="font-semibold">{isAr ? "ألمنيوم 6063-T6 معتمد" : isFr ? "Aluminium 6063-T6" : "6063-T6 Marine Grade"}</span>
              </div>
            </motion.div>
          </div>

          {/* Right Column: ThreeUI 3D Cylinder Orbit Gallery with Project Images */}
          <div className="lg:col-span-6 relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.98, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="relative rounded-3xl overflow-hidden border border-stone-200/90 bg-white/80 shadow-[0_20px_50px_-10px_rgba(28,25,23,0.08)] backdrop-blur-xl group"
            >
              {/* 3D Scene Viewport */}
              <div className="relative w-full h-[440px] sm:h-[480px] lg:h-[520px]">
                <Scene
                  speed={0.9}
                  scale={1.00}
                  opacity={1.00}
                  hue={0}
                  saturation={1.00}
                  brightness={1.00}
                  className="w-full h-full"
                />

                {/* Floating Project Tag */}
                <div className="absolute bottom-4 left-4 z-10 flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/95 border border-stone-200 text-stone-800 text-[11px] font-mono shadow-md backdrop-blur-md pointer-events-none">
                  <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
                  <span>Palm Jumeirah & Emirates Hills Projects</span>
                </div>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default HeroSection;
