"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import {
  Compass,
  FileCheck,
  Wrench,
  Hammer,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Clock,
  Sparkles,
  Award,
} from "lucide-react";
import { sectionVariants, itemFadeUp } from "@/lib/motion";
import { Button } from "@/components/ui/button";
import type { ProcessStep } from "@/lib/content/schemas";

const iconMap: Record<string, React.ElementType> = {
  Compass,
  FileCheck,
  Wrench,
  Hammer,
  ShieldCheck,
};

interface ProcessSectionProps {
  steps?: ProcessStep[];
}

export function ProcessSection({ steps = [] }: ProcessSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const eyebrow = isAr ? "منهجية العمل الهندسي" : isFr ? "Méthodologie d'Ingénierie" : "Engineering Methodology";
  const title = isAr
    ? "مسار هندسي منظم من الاستشارة الأولى حتى التسليم"
    : isFr
    ? "Un processus rigoureux de la première visite à la réception"
    : "A disciplined process from consultation to handover";
  const subtitle = isAr
    ? "خمس مراحل تشغيلية واضحة تضمن الدقة الإنشائية وسرعة الإنجاز بدون أي إزعاج في موقع الفيلا."
    : isFr
    ? "Cinq étapes maîtrisées garantissant la conformité structurelle et une installation soignée."
    : "Five predictable stages ensuring structural integrity, municipality compliance, and tidy on-site installation.";

  // Rich fallback / enrichment steps with deliverables and timeframes
  const defaultStepsMetadata = [
    {
      timeframe: isAr ? "خلال 24-48 ساعة" : isFr ? "24 à 48 heures" : "24–48 Hours",
      deliverable: isAr ? "رفع ليزري + تصميم 3D واقعي" : isFr ? "Relevé Laser & Rendu 3D" : "Laser Scan & 3D Spatial Render",
      fallbackTitle: {
        en: "On-Site Consultation & 3D Modeling",
        ar: "الاستشارة الميدانية والنمذجة ثلاثية الأبعاد",
        fr: "Consultation sur Site & Modélisation 3D",
      },
      fallbackSummary: {
        en: "Laser survey of your terrace or garden with photorealistic 3D rendering of the pergola in your actual outdoor space.",
        ar: "رفع مساحي دقيق بالليزر لتراس أو حديقة الفيلا مع تقديم نموذج ثلاثي الأبعاد واقعي يحاكي التصميم في مساحتك الفعلية.",
        fr: "Relevé laser millimétrique de votre espace et modélisation photoréaliste 3D intégrée à votre environnement existant.",
      },
      icon: "Compass",
    },
    {
      timeframe: isAr ? "3 إلى 5 أيام" : isFr ? "3 à 5 jours" : "3–5 Business Days",
      deliverable: isAr ? "مخططات معتمدة لحمل الرياح 4.5 kPa" : isFr ? "Calculs de Charge & Dossier Technique" : "Wind Load Stamped Engineering Pack",
      fallbackTitle: {
        en: "Structural Engineering & Approvals",
        ar: "الحسابات الإنشائية والموافقات البلدية",
        fr: "Ingénierie Structurelle & Autorisations",
      },
      fallbackSummary: {
        en: "Detailed wind load calculations (up to 4.5 kPa) compliant with Dubai Municipality and UAE Civil Defense codes.",
        ar: "إجراء الحسابات الإنشائية التفصيلية لتحمل الرياح حتى 4.5 كيلو باسكال بما يتوافق كلياً مع معايير بلدية دبي والدفاع المدني.",
        fr: "Calculs de résistance aux vents extrêmes (jusqu'à 4.5 kPa) certifiés conformes aux normes des municipalités des Émirats.",
      },
      icon: "FileCheck",
    },
    {
      timeframe: isAr ? "7 إلى 10 أيام" : isFr ? "7 à 10 jours" : "7–10 Working Days",
      deliverable: isAr ? "تصنيع CNC وطلاء Qualicoat فئة 2" : isFr ? "Usinage CNC & Finition Qualicoat 2" : "CNC Milled & Qualicoat Class 2",
      fallbackTitle: {
        en: "Precision CNC Fabrication",
        ar: "التصنيع الدقيق بماكينات CNC",
        fr: "Fabrication de Précision CNC",
      },
      fallbackSummary: {
        en: "Multi-axis aluminum extrusion cutting, seamless concealed welding, and certified Qualicoat Class 2 coating.",
        ar: "قص وتشكيل قطاعات الألمنيوم بماكينات CNC متعددة المحاور، مع لحامات مخفية وطلاء بودرة Qualicoat فئة 2 المقاوم للأملاح.",
        fr: "Découpe numérique multi-axes, assemblages invisibles et thermolaquage certifié Qualicoat Classe 2 anti-salin.",
      },
      icon: "Wrench",
    },
    {
      timeframe: isAr ? "2 إلى 4 أيام" : isFr ? "2 à 4 jours" : "2–4 Days On-Site",
      deliverable: isAr ? "تركيب تركيبي نظيف بدون أي قص بالموقع" : isFr ? "Pose Modulaire Propre Sans Poussière" : "Modular Assembly (Zero Site Cutting)",
      fallbackTitle: {
        en: "Clean & Quiet Site Installation",
        ar: "التركيب النظيف والدقيق في الموقع",
        fr: "Installation Propre & Silencieuse",
      },
      fallbackSummary: {
        en: "Factory pre-assembled modular bays erected in 2-4 days by certified in-house teams with zero mess or disturbance.",
        ar: "تجميع وتركيب الهياكل الجاهزة المصنعة مسبقاً بالمصنع خلال 2-4 أيام بواسطة فريقنا الفني المتخصص بدون أي ضجيج أو غبار.",
        fr: "Assemblage rapide de modules pré-ajustés en atelier par nos équipes certifiées, sans découpe ni poussière sur votre villa.",
      },
      icon: "Hammer",
    },
    {
      timeframe: isAr ? "تسليم نهائي ورعاية مستمرة" : isFr ? "Réception & Suivi Décennal" : "Handover & Lifetime Care",
      deliverable: isAr ? "شهادة الضمان الهيكلي الرسمي 10 سنوات" : isFr ? "Certificat de Garantie Décennale" : "10-Year Direct Structural Warranty",
      fallbackTitle: {
        en: "Handover & 10-Year Warranty",
        ar: "الاستلام الرسمي والضمان 10 سنوات",
        fr: "Réception & Garantie Décennale",
      },
      fallbackSummary: {
        en: "Operational walkthrough, motor calibration, smart home automation sync, and issuance of your 10-year structural warranty certificate.",
        ar: "فحص تشغيلي شامل، معايرة المحركات والحساسات، ربط النظام بالمنزل الذكي، وتسليم وثيقة الضمان الهيكلي الشامل لـ 10 سنوات.",
        fr: "Tests de mise en service, programmation domotique des lames et remise de votre certificat de garantie décennale.",
      },
      icon: "ShieldCheck",
    },
  ];

  // Merge supplied steps or use default fallback
  const resolvedSteps = defaultStepsMetadata.map((meta, index) => {
    const rawStep = steps[index];
    const stepNumber = index + 1;
    const titleText = rawStep?.title
      ? (rawStep.title[locale as "en" | "ar" | "fr"] || rawStep.title.en)
      : (meta.fallbackTitle[locale as "en" | "ar" | "fr"] || meta.fallbackTitle.en);
    const summaryText = rawStep?.summary
      ? (rawStep.summary[locale as "en" | "ar" | "fr"] || rawStep.summary.en)
      : (meta.fallbackSummary[locale as "en" | "ar" | "fr"] || meta.fallbackSummary.en);
    const iconName = rawStep?.icon || meta.icon;

    return {
      id: rawStep?.id || `process-step-${stepNumber}`,
      stepNumber,
      title: titleText,
      summary: summaryText,
      iconName,
      timeframe: meta.timeframe,
      deliverable: meta.deliverable,
    };
  });

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAF8F5] via-stone-50/60 to-white relative overflow-hidden">
      {/* Subtle Architectural Grid & Soft Ambient Light */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[800px] h-[350px] bg-amber-100/25 rounded-full blur-[140px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:32px_32px] opacity-30" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1340px] relative z-10">
        
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-20"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-brass/30 text-[11px] font-mono tracking-widest uppercase text-brass font-bold">
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold font-display text-stone-900 leading-[1.14] tracking-tight text-balance">
            {title}
          </h2>

          <p className="text-[14px] sm:text-[16px] text-stone-600 leading-relaxed max-w-2xl mx-auto text-balance">
            {subtitle}
          </p>
        </motion.div>

        {/* 5-Step Process Container with Connecting Engineering Rail */}
        <div className="relative">
          
          {/* Desktop Connecting Milestone Rail */}
          <div className="hidden lg:block absolute top-[58px] left-[6%] right-[6%] h-[2px] bg-gradient-to-r from-brass/10 via-brass/40 to-brass/10 -z-0">
            <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent,rgba(197,155,75,0.7),transparent)] animate-pulse" />
          </div>

          {/* Steps Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 sm:gap-6 relative z-10">
            {resolvedSteps.map((step, idx) => {
              const Icon = iconMap[step.iconName] || CheckCircle2;

              return (
                <motion.div
                  key={step.id}
                  variants={itemFadeUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: idx * 0.08 }}
                  className="relative rounded-2xl bg-white border border-stone-200/90 hover:border-brass/80 p-5 sm:p-6 flex flex-col justify-between shadow-[0_4px_24px_-6px_rgba(28,25,23,0.06)] hover:shadow-xl hover:-translate-y-1.5 transition-all duration-300 group overflow-hidden"
                >
                  {/* Subtle Giant Step Watermark */}
                  <div className="absolute -top-3 -right-2 font-display text-6xl font-bold text-stone-900/[0.04] pointer-events-none select-none">
                    0{step.stepNumber}
                  </div>

                  <div className="space-y-4">
                    {/* Header Row: Step Number & Timeframe Badge */}
                    <div className="flex items-center justify-between relative z-10">
                      <div className="flex items-center gap-2">
                        <span className="text-xl font-bold font-mono text-brass">
                          0{step.stepNumber}
                        </span>
                        <span className="w-1.5 h-1.5 rounded-full bg-brass/60" />
                      </div>

                      <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-amber-50 to-amber-100/60 text-brass flex items-center justify-center border border-amber-200/70 shadow-xs group-hover:scale-110 group-hover:border-brass transition-all">
                        <Icon className="h-5 w-5 text-brass" />
                      </div>
                    </div>

                    {/* Timeframe Pill */}
                    <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md bg-stone-100/80 border border-stone-200/60 text-[11px] font-mono text-stone-600 font-medium">
                      <Clock className="h-3 w-3 text-brass" />
                      <span>{step.timeframe}</span>
                    </div>

                    {/* Title & Narrative */}
                    <div className="space-y-2">
                      <h3 className="text-[15px] sm:text-base font-bold text-stone-900 leading-snug group-hover:text-amber-950 transition-colors">
                        {step.title}
                      </h3>
                      <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                        {step.summary}
                      </p>
                    </div>
                  </div>

                  {/* Milestone Deliverable Pill at Card Bottom */}
                  <div className="mt-5 pt-3.5 border-t border-stone-100">
                    <div className="p-2.5 rounded-xl bg-amber-50/70 border border-amber-200/50 space-y-1">
                      <div className="text-[10px] font-mono uppercase tracking-wider text-amber-800 font-bold flex items-center gap-1">
                        <Sparkles className="h-3 w-3 text-brass" />
                        <span>{isAr ? "مخرجات المرحلة" : isFr ? "Livrable Clé" : "Milestone Deliverable"}</span>
                      </div>
                      <div className="text-[11px] font-semibold text-stone-800 leading-tight">
                        {step.deliverable}
                      </div>
                    </div>
                  </div>

                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Quality Assurance Strip Across Bottom */}
        <motion.div
          variants={itemFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="mt-12 sm:mt-16 p-6 sm:p-8 rounded-3xl bg-white border border-stone-200/90 shadow-md flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left rtl:text-right">
            <div className="h-12 w-12 rounded-2xl bg-stone-900 text-brass flex items-center justify-center shrink-0 shadow-sm border border-brass/30">
              <Award className="h-6 w-6 text-brass" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase tracking-widest text-brass font-bold">
                  {isAr ? "ضمان التصنيع الداخلي في دبي" : isFr ? "Contrôle Qualité Intégré" : "Dubai In-House Fabrication"}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              </div>
              <p className="text-xs sm:text-[13px] text-stone-600 leading-relaxed">
                {isAr
                  ? "يتم تجميع كافة الهياكل مسبقاً وفحصها بدقة في مصنعنا بدبي قبل نقلها للموقع، مما يضمن تركيباً صامتاً ونظيفاً دون أي عمليات قص أو لحام داخل فيلتك."
                  : isFr
                  ? "Chaque pergola est entièrement pré-assemblée et testée dans notre atelier à Dubaï avant expédition. Aucun travail lourd de découpe ou soudure sur votre terrain."
                  : "Every pergola bay is 100% pre-assembled and quality-tested in our Dubai facility prior to dispatch. Zero cutting, grinding, or painting is ever conducted on your property."}
              </p>
            </div>
          </div>

          <Button
            asChild
            className="h-11 px-6 rounded-xl bg-brass hover:bg-brass-light text-stone-950 font-bold text-xs uppercase tracking-wider shadow-md shadow-brass/20 transition-all shrink-0 cursor-pointer"
          >
            <Link href="#contact">
              <span>{isAr ? "احجز معاينة ميدانية مجانية" : isFr ? "Réserver une Visite sur Site" : "Schedule Free Site Survey"}</span>
              <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}

export default ProcessSection;

