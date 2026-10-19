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
    <section className="py-20 sm:py-28 lg:py-36 bg-white relative overflow-hidden border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px] relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Architectural Photography Frame with Square Border */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-5 relative"
          >
            <div className="relative p-2 rounded-[2px] bg-stone-100/60 border border-stone-200 shadow-none group">
              <div className="relative aspect-[4/5] rounded-[2px] overflow-hidden bg-stone-100">
                <Image
                  src="https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=1200&q=85&auto=format&fit=crop"
                  alt="Modern architectural pergola and luxury minimal glass sliding facade in Dubai"
                  fill
                  sizes="(max-width: 1024px) 100vw, 42vw"
                  className="object-cover transition-transform duration-1000 ease-out group-hover:scale-105"
                  priority={false}
                />
                
                <div className="absolute inset-0 bg-stone-900/10 group-hover:bg-transparent transition-colors" />

                {/* Top Badge */}
                <div className="absolute top-4 left-4 right-4 z-20 flex items-center justify-between pointer-events-none">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white/95 border border-stone-200 text-stone-900 text-[11px] font-mono shadow-none">
                    <Wind className="h-3.5 w-3.5 text-[#B38E5D] shrink-0" />
                    <span>{isAr ? "مقاومة رياح 4.5 kPa" : isFr ? "Résistance au vent 4.5 kPa" : "Wind Load: 4.5 kPa (160 km/h)"}</span>
                  </div>
                </div>

                {/* Bottom Overlay Info Card */}
                <div className="absolute bottom-4 left-4 right-4 z-20 p-4 rounded-[2px] bg-white/95 backdrop-blur-md border border-stone-200 shadow-none text-stone-900 space-y-2">
                  <div className="flex items-center justify-between border-b border-stone-200 pb-2">
                    <span className="text-[10px] font-mono tracking-widest uppercase text-[#B38E5D] font-semibold flex items-center gap-1.5">
                      <Compass className="h-3 w-3" />
                      {isAr ? "المعايير الهندسية الدقيقة" : isFr ? "Précision & Matériaux" : "Bespoke Engineering"}
                    </span>
                    <span className="text-[10px] font-mono text-stone-500">±1.5mm TOLERANCE</span>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-2 text-xs text-stone-700">
                    <div className="flex items-center gap-1.5 bg-stone-50 p-2 border border-stone-200/60 rounded-[2px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#34AA49] shrink-0" />
                      <span className="text-[11px]">{isAr ? "ألمنيوم 6063-T6 بحري" : isFr ? "Alu 6063-T6 Marine" : "6063-T6 Marine Alloy"}</span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-stone-50 p-2 border border-stone-200/60 rounded-[2px]">
                      <div className="w-1.5 h-1.5 rounded-full bg-[#B38E5D] shrink-0" />
                      <span className="text-[11px]">{isAr ? "طلاء كواليكوت فئة 2" : isFr ? "Qualicoat Classe 2" : "Qualicoat Class 2"}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Editorial Narrative & Pillars */}
          <motion.div
            variants={sectionVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            className="lg:col-span-7 space-y-8"
          >
            {/* Header Block */}
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-stone-100 border border-stone-200 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] uppercase text-stone-600 font-medium">
                <span className="w-1.5 h-1.5 rounded-full bg-[#B38E5D]" />
                <span>{isAr ? "عن إيكو برجولا · تميز هندسي" : isFr ? "À Propos d'Eco Pergola" : "About Eco Pergola · Studio & Craft"}</span>
              </div>
              
              <h2 className="text-[28px] sm:text-[38px] md:text-[46px] font-normal font-display text-stone-900 leading-[1.12] tracking-tight text-balance">
                {isAr
                  ? "حلول تظليل وهندسة واجهات مصممة خصيصاً لمناخ الإمارات"
                  : isFr
                  ? "Des structures d'ombrage conçues pour les exigences climatiques des Émirats"
                  : "Precision outdoor shade & architectural glazing built for the UAE climate"}
              </h2>

              <p className="text-[14px] sm:text-[15px] text-stone-600 font-light leading-relaxed max-w-2xl">
                {isAr
                  ? "نجمع بين متانة الحسابات الإنشائية وجماليات التصميم المعماري المعاصر، لنبتكر مساحات معيشية خارجية تدوم طويلاً وتتحمل حرارة ورطوبة ورياح الخليج العربي."
                  : isFr
                  ? "Nous combinons la rigueur de l'ingénierie structurelle et le design architectural minimaliste pour concevoir des espaces de vie extérieurs d'exception."
                  : "Bridging structural engineering discipline with minimalist architectural design to create enduring, climate-resilient outdoor living environments for luxury residences and commercial venues."}
              </p>
            </div>

            {/* Three Explanatory Pillars with Hairline Cards */}
            <div className="space-y-3.5">
              {pillars.map((p, idx) => {
                const Icon = p.icon;
                return (
                  <motion.div
                    key={idx}
                    variants={itemFadeUp}
                    className="p-5 rounded-[2px] bg-[#FAF8F5] border border-stone-200 hover:border-stone-400 transition-colors duration-300 flex flex-col sm:flex-row gap-4 items-start group"
                  >
                    <div className="h-10 w-10 rounded-[2px] bg-white text-[#B38E5D] flex items-center justify-center shrink-0 border border-stone-200">
                      <Icon className="h-5 w-5" />
                    </div>
                    
                    <div className="space-y-1 flex-1">
                      <div className="flex flex-wrap items-center justify-between gap-2">
                        <h3 className="text-base font-normal font-display text-stone-900 group-hover:text-[#34AA49] transition-colors">
                          {p.title}
                        </h3>
                        <span className="text-[10px] font-mono text-stone-500 uppercase tracking-wider">
                          {p.tag}
                        </span>
                      </div>
                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed font-light">
                        {p.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>

            {/* Verified Business Metrics */}
            {verifiedStats.length > 0 && (
              <div className="pt-6 border-t border-stone-200">
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-[2px] bg-stone-50 border border-stone-200">
                  {verifiedStats.slice(0, 4).map((stat) => (
                    <div key={stat.id} className="space-y-0.5">
                      <div className="text-2xl sm:text-3xl font-light font-display text-stone-900 tracking-tight flex items-baseline gap-0.5">
                        <span className="text-[#34AA49]">{stat.value}</span>
                        <span className="text-[#B38E5D] text-lg font-normal">{stat.suffix}</span>
                      </div>
                      <div className="text-[11px] text-stone-500 leading-tight">
                        {stat.label[locale as "en" | "ar" | "fr"] || stat.label.en}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Direct CTA */}
            <div className="flex items-center gap-4 pt-1">
              <Link
                href="/projects"
                className="inline-flex items-center gap-2 text-xs font-semibold text-stone-900 hover:text-[#34AA49] uppercase tracking-widest transition-colors group"
              >
                <span>{isAr ? "استعرض معرض المشاريع المنفذة في دبي" : isFr ? "Découvrir nos réalisations à Dubaï" : "Explore Featured Dubai Projects"}</span>
                <ArrowRight className="h-3.5 w-3.5 text-[#B38E5D] group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform" />
              </Link>
            </div>

          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default IntroductionSection;
