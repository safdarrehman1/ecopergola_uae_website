"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Shield,
  Wrench,
  Layers,
  Wind,
  ShieldCheck,
  CheckCircle2,
  Sparkles,
  Building2,
  Compass,
} from "lucide-react";
import { sectionVariants, itemFadeUp } from "@/lib/motion";
import type { Stat } from "@/lib/content/schemas";

interface IntroductionSectionProps {
  stats?: Stat[];
}

export function IntroductionSection({ stats = [] }: IntroductionSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const verifiedStats = stats.filter((s) => s.verified);

  const pillars = [
    {
      title: isAr ? "ماذا نقدم" : isFr ? "Notre Savoir-Faire" : "What We Provide",
      tag: isAr ? "برجولات بيوكليماتيك · واجهات زجاجية · أبواب منزلقة" : isFr ? "Pergolas Bioclimatiques · Baies Minimales · Façades" : "Bio-Climatic Pergolas · Minimal Glass · Verandas",
      desc: isAr
        ? "تصميم وتصنيع أنظمة برجولات ألمنيوم معمارية مخصصة، شرائح بيوكليماتيكية بمحركات أوروبية، أبواب منزلقة فائقة النحافة (20 مم)، وواجهات زجاجية معزولة حرارياً."
        : isFr
        ? "Conception et fabrication sur mesure de pergolas bioclimatiques à lames orientables motorisées, baies coulissantes ultra-fines (20mm) et extensions vitrées thermiquement isolées."
        : "Custom architectural aluminum pergolas, motorized bio-climatic louvers, minimal sliding door systems (20mm sightline), and thermally broken glass facades.",
      icon: Layers,
    },
    {
      title: isAr ? "من نخدم" : isFr ? "Pour Qui" : "Who We Serve",
      tag: isAr ? "نخلة جميرا · تلال الإمارات · دبي هيلز · الفنادق الفاخرة" : isFr ? "Palm Jumeirah · Dubai Hills · Emirates Hills · Hôtellerie" : "Palm Jumeirah · Emirates Hills · Dubai Hills · Hospitality",
      desc: isAr
        ? "أصحاب الفلل الفاخرة والمجمعات السكنية الراقية في دبي وأبوظبي، بالإضافة إلى أرقى الفنادق والمطاعم والمكاتب الهندسية المعمارية."
        : isFr
        ? "Propriétaires de villas d'exception à Dubaï et Abu Dhabi, hôtels 5 étoiles, restaurants gastronomiques et cabinets d'architecture aux Émirats."
        : "Discerning villa homeowners across Dubai communities, luxury beachfront properties, five-star hospitality venues, and elite architectural practices.",
      icon: Building2,
    },
    {
      title: isAr ? "من الفكرة إلى التسليم" : isFr ? "De l'Étude à la Pose" : "Turnkey Engineering",
      tag: isAr ? "معاينة ليزرية · تصميم 3D · تصنيع CNC محلي" : isFr ? "Relevé Laser · Rendu 3D · Usinage CNC Local" : "Laser Survey · 3D Photoreal Render · Turnkey",
      desc: isAr
        ? "مسار عمل هندسي متكامل: رفع مساحي بالليزر، نمذجة ثلاثية الأبعاد photorealistic، حسابات إنشائية معتمدة، وتصنيع آلي CNC في دبي مع تركيب موقعي سريع ونظيف."
        : isFr
        ? "Un parcours clé en main maîtrisé : relevé laser 3D sur site, étude de résistance au vent, fabrication CNC locale et pose soignée par nos équipes dédiées."
        : "A disciplined turnkey process: on-site precision laser survey, photorealistic 3D spatial render, municipal structural compliance, local CNC fabrication, and clean modular assembly.",
      icon: Wrench,
    },
  ];

  return (
    <section className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] relative overflow-hidden">
      {/* Subtle Architectural Grid Pattern & Coordinate Accents */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-amber-100/30 rounded-full blur-[130px]" />
        <div className="absolute bottom-10 left-0 w-[450px] h-[450px] bg-stone-200/40 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1320px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Layered Architectural Visual Showcase */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-5 relative"
          >
            {/* Outer Architectural Frame with Blueprint Hairlines */}
            <div className="relative p-2.5 sm:p-3 rounded-[2rem] bg-white/80 border border-stone-200/90 shadow-[0_24px_50px_-12px_rgba(28,25,23,0.12)] backdrop-blur-xl group">
              
              {/* CAD Crosshairs on Corners */}
              <div className="absolute -top-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-brass/70 font-mono text-xs select-none pointer-events-none">
                +
              </div>
              <div className="absolute -top-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-brass/70 font-mono text-xs select-none pointer-events-none">
                +
              </div>
              <div className="absolute -bottom-2.5 -left-2.5 w-5 h-5 flex items-center justify-center text-brass/70 font-mono text-xs select-none pointer-events-none">
                +
              </div>
              <div className="absolute -bottom-2.5 -right-2.5 w-5 h-5 flex items-center justify-center text-brass/70 font-mono text-xs select-none pointer-events-none">
                +
              </div>

              {/* Main Image Container */}
              <div className="relative aspect-[4/5] sm:aspect-[4/4.8] lg:aspect-[4/5] rounded-[1.6rem] overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=85&auto=format&fit=crop"
                  alt="Modern architectural pergola and luxury minimal glass sliding facade in Dubai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                  priority={false}
                />
                
                {/* Architectural Gradient Film */}
                <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-stone-950/20 to-transparent z-10" />

                {/* Top Badge: Wind Load Certification */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-stone-200/90 shadow-md text-stone-900 text-[11px] font-mono">
                    <Wind className="h-3.5 w-3.5 text-brass shrink-0" />
                    <span className="font-semibold tracking-wide">
                      {isAr ? "مقاومة رياح حتى 4.5 kPa" : isFr ? "Résistance au vent 4.5 kPa" : "Wind Load: 4.5 kPa (160 km/h)"}
                    </span>
                  </div>

                  <div className="hidden sm:inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-900/80 backdrop-blur-md text-white text-[10px] font-mono tracking-wider border border-white/20">
                    <Sparkles className="h-3 w-3 text-brass" />
                    <span>UAE CODE</span>
                  </div>
                </div>

                {/* Bottom Overlay: Material Specs Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md border border-white/90 shadow-xl text-stone-900 space-y-2.5">
                  <div className="flex items-center justify-between border-b border-stone-200/70 pb-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-brass font-bold flex items-center gap-1.5">
                      <Compass className="h-3.5 w-3.5" />
                      {isAr ? "المعايير الهندسية الدقيقة" : isFr ? "Précision & Matériaux" : "Bespoke Engineering"}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500 font-semibold">
                      ±1.5mm TOLERANCE
                    </span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs font-semibold text-stone-800">
                    <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-2 border border-stone-200/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                      <span className="text-[11px] leading-tight">
                        {isAr ? "ألمنيوم 6063-T6 بحري" : isFr ? "Alu 6063-T6 Marine" : "6063-T6 Marine Alloy"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 bg-stone-50 rounded-lg p-2 border border-stone-200/60">
                      <div className="w-1.5 h-1.5 rounded-full bg-brass shrink-0" />
                      <span className="text-[11px] leading-tight">
                        {isAr ? "طلاء كواليكوت فئة 2" : isFr ? "Qualicoat Classe 2" : "Qualicoat Class 2"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Floating Trust Badge */}
            <div className="absolute -bottom-5 -right-3 sm:-right-5 z-30 inline-flex items-center gap-2.5 px-4 py-2.5 rounded-2xl bg-stone-900 text-white shadow-xl border border-brass/40 backdrop-blur-md">
              <div className="h-7 w-7 rounded-lg bg-brass text-stone-950 flex items-center justify-center font-bold shrink-0 shadow-xs">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div className="leading-tight">
                <div className="text-[10px] font-mono text-brass-light uppercase tracking-wider">
                  {isAr ? "ضمان مباشر" : isFr ? "Garantie Décennale" : "Direct Coverage"}
                </div>
                <div className="text-xs font-bold">
                  {isAr ? "10 سنوات ضمان هيكلي" : isFr ? "Garantie 10 Ans" : "10-Year Structural"}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative, Interactive Pillars & Metrics */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Header Block */}
            <div className="space-y-3.5">
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-brass/30 text-[11px] font-mono tracking-widest uppercase text-brass font-bold">
                <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
                <span>{isAr ? "عن إيكو برجولا · تميز هندسي" : isFr ? "À Propos d'Eco Pergola" : "About Eco Pergola · Engineered in Dubai"}</span>
              </div>
              
              <h2 className="text-[28px] sm:text-[34px] md:text-[42px] font-bold font-display text-stone-900 leading-[1.14] tracking-tight text-balance">
                {isAr
                  ? "حلول تظليل وهندسة واجهات مصممة خصيصاً لمناخ الإمارات"
                  : isFr
                  ? "Des structures d'ombrage conçues pour les exigences climatiques des Émirats"
                  : "Precision outdoor shade & architectural glazing built for the UAE climate"}
              </h2>

              <p className="text-[14px] sm:text-[15px] text-stone-600 leading-relaxed max-w-2xl">
                {isAr
                  ? "نجمع بين متانة الحسابات الإنشائية وجماليات التصميم المعماري المعاصر، لنبتكر مساحات معيشية خارجية تدوم طويلاً وتتحمل حرارة ورطوبة ورياح الخليج العربي."
                  : isFr
                  ? "Nous combinons la rigueur de l'ingénierie structurelle et le design architectural minimaliste pour concevoir des espaces de vie extérieurs d'exception."
                  : "Bridging structural engineering discipline with minimalist architectural design to create enduring, climate-resilient outdoor living environments for luxury residences and commercial venues."}
              </p>
            </div>

            {/* Three Explanatory Pillars with Luxury Cards */}
            <div className="space-y-4">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemFadeUp}
                    whileHover={{ x: isAr ? -4 : 4 }}
                    transition={{ duration: 0.2 }}
                    className="p-4 sm:p-5 rounded-2xl bg-white border border-stone-200/90 hover:border-brass/70 shadow-[0_4px_20px_-6px_rgba(0,0,0,0.04)] hover:shadow-lg transition-all duration-300 flex flex-col sm:flex-row gap-4 items-start group"
                  >
                    <div className="h-11 w-11 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/70 text-brass flex items-center justify-center shrink-0 border border-amber-200/80 shadow-xs group-hover:scale-105 transition-transform">
                      <Icon className="h-5 w-5 text-brass" />
                    </div>
                    
                    <div className="space-y-1.5 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-[15px] sm:text-base font-bold text-stone-900 group-hover:text-amber-900 transition-colors">
                          {p.title}
                        </h3>
                        <span className="text-[10px] font-mono tracking-wide text-brass font-semibold px-2 py-0.5 rounded-md bg-amber-50/80 border border-amber-200/60">
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Verified Business Metrics Ribbon */}
            {verifiedStats.length > 0 && (
              <div className="pt-6 border-t border-stone-200/90">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 sm:gap-6 bg-white/70 p-4 sm:p-5 rounded-2xl border border-stone-200/80 shadow-xs backdrop-blur-sm">
                  {verifiedStats.slice(0, 4).map((stat) => (
                    <div key={stat.id} className="space-y-1">
                      <div className="text-2xl sm:text-3xl font-bold font-mono text-stone-900 tracking-tight flex items-baseline gap-0.5">
                        <span className="text-brass">{stat.value}</span>
                        <span className="text-amber-700 text-lg sm:text-xl font-bold">{stat.suffix}</span>
                      </div>
                      <div className="text-[11px] sm:text-xs text-stone-600 font-medium leading-tight">
                        {stat.label[locale as "en" | "ar" | "fr"] || stat.label.en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct CTA Link */}
            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-semibold text-stone-900 hover:text-brass uppercase tracking-wider transition-colors group"
              >
                <span>{isAr ? "استعرض معرض المشاريع المنفذة في دبي" : isFr ? "Découvrir nos réalisations à Dubaï" : "Explore Featured Dubai Projects"}</span>
                <ArrowRight className="h-4 w-4 text-brass group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default IntroductionSection;

