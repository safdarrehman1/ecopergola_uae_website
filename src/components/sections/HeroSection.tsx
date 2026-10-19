"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, ShieldCheck, Award, Ruler, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Settings } from "@/lib/content/schemas";

interface HeroSectionProps {
  settings?: Settings;
}

export function HeroSection({ settings }: HeroSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const stats = [
    { label: isAr ? "سنوات خبرة في دبي" : isFr ? "Années d'Expérience" : "Years in UAE", value: "12+" },
    { label: isAr ? "مشروع فيلا منجز" : isFr ? "Villas Équipées" : "Villas Completed", value: "850+" },
    { label: isAr ? "ضمان هيكلي شامل" : isFr ? "Garantie Décennale" : "Structural Warranty", value: "10 Yrs" },
    { label: isAr ? "دقة التصنيع" : isFr ? "Tolérance d'Usinage" : "Precision Tolerance", value: "±1.5mm" },
  ];

  return (
    <section className="relative min-h-[78vh] lg:min-h-[84vh] flex items-center justify-center overflow-hidden">
      {/* Full-width Background Photography with Dark Architectural Vignette */}
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/gallery/gallery-1.webp"
          alt="Luxury architectural pergola installation in Dubai"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
        <div className="absolute inset-0 bg-stone-950/65" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl relative z-10 py-16 sm:py-24 text-center">
        {/* Eyebrow Pill */}
        <motion.div
          initial={{ opacity: 0, y: -12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/15 backdrop-blur-md border border-white/25 text-xs text-white font-medium mb-6"
        >
          <span className="h-2 w-2 rounded-full bg-[#34AA49] animate-pulse" />
          <span>{isAr ? "تصنيع وتركيب في دبي والإمارات" : isFr ? "Conception & Pose à Dubaï" : "Engineered & Fabricated in Dubai"}</span>
        </motion.div>

        {/* Centered Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-3xl sm:text-5xl lg:text-6xl font-bold font-display text-white tracking-tight leading-[1.12] mb-6 text-balance"
        >
          {isAr
            ? "مساحات خارجية، بهندسة معمارية متقنة"
            : isFr
            ? "Des espaces extérieurs pensés et conçus avec précision"
            : "Outdoor spaces, thoughtfully engineered"}
        </motion.h1>

        {/* Centered Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-stone-200 leading-relaxed max-w-2xl mx-auto mb-8 font-normal"
        >
          {isAr
            ? "برجولات بيوكليماتيكية ذكية، أبواب منزلقة دقيقة، وواجهات زجاجية مخصصة لمناخ دبي والإمارات مع ضمان هيكلي 10 سنوات."
            : isFr
            ? "Pergolas bioclimatiques motorisées, baies coulissantes minimales et façades architecturales conçues pour le climat de Dubaï avec garantie décennale."
            : "Custom bio-climatic pergolas, minimal sliding glass systems, and architectural facades engineered for Dubai's climate with 10-year structural warranty."}
        </motion.p>

        {/* Two Centered Action Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-14"
        >
          <Button
            asChild
            size="lg"
            className="w-full sm:w-auto h-12 px-7 rounded-md bg-[#34AA49] hover:bg-[#268537] text-white font-semibold text-sm shadow-md transition-all"
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
            className="w-full sm:w-auto h-12 px-7 rounded-md bg-white/10 hover:bg-white/20 text-white border-white/40 backdrop-blur-sm text-sm font-semibold transition-all"
          >
            <Link href="/pergola-types">
              <span>{isAr ? "استكشف البرجولات" : isFr ? "Découvrir les Pergolas" : "Explore Pergola Catalog"}</span>
            </Link>
          </Button>
        </motion.div>

        {/* Integrated Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="pt-8 border-t border-white/20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {stats.map((item, idx) => (
            <div key={idx} className="space-y-1 text-center">
              <div className="text-2xl sm:text-3xl font-bold font-mono text-white">
                {item.value}
              </div>
              <div className="text-xs text-stone-300 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

export default HeroSection;
