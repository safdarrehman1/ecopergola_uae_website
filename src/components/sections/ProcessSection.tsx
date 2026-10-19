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
        en: "Technical property inspection, architectural laser scanning, and preliminary 3D visualization tailored to your villa exterior.",
        ar: "معاينة هندسية دقيقة للموقع، رفع مساحي بالليزر، ونمذجة ثلاثية الأبعاد واقعية توضح انسجام البرجولا مع طراز فيلتك.",
        fr: "Visite technique détaillée, relevé laser 3D sur site et modélisation photoréaliste personnalisée de votre extérieur.",
      },
      iconName: "Compass",
    },
    {
      timeframe: isAr ? "2 إلى 3 أيام" : isFr ? "2 à 3 jours" : "2–3 Days",
      deliverable: isAr ? "حسابات أحمال الرياح + اعتماد البلدية" : isFr ? "Calculs de Structure & Permis" : "Structural Calcs & Permit Drawings",
      fallbackTitle: {
        en: "Engineering Verification & Approvals",
        ar: "الحسابات الإنشائية والتراخيص الحكومية",
        fr: "Ingénierie & Autorisations Officielles",
      },
      fallbackSummary: {
        en: "Structural engineering calculations verified for UAE wind zones (4.5 kPa), and preparation of Dubai Municipality / developer submission packages.",
        ar: "تدقيق الحسابات الإنشائية لتحمل سرعات الرياح (4.5 كيلو باسكال)، وتجهيز ملفات الاعتماد لبلدية دبي وإدارة المطورين العقاريين.",
        fr: "Calculs de résistance aux vents extrêmes (4.5 kPa) et préparation complète des dossiers d'approbation municipale.",
      },
      iconName: "FileCheck",
    },
    {
      timeframe: isAr ? "10 إلى 14 يوم" : isFr ? "10 à 14 jours" : "10–14 Days",
      deliverable: isAr ? "قص CNC + طلاء كواليكوت معتمد" : isFr ? "Usinage CNC & Finition Certifiée" : "CNC Milling & Qualicoat Certificate",
      fallbackTitle: {
        en: "Precision CNC Fabrication",
        ar: "التصنيع الآلي CNC والطلاء الحراري",
        fr: "Fabrication de Précision CNC",
      },
      fallbackSummary: {
        en: "Extruded 6063-T6 aluminum components cut with ±0.5mm tolerance on automated CNC machining centers, followed by Qualicoat Seaside Class 2 powder coating.",
        ar: "تصنيع قطاعات ألمنيوم 6063-T6 بدقة ±0.5 مم على ماكينات CNC متقدمة، متبوعة بطلاء كواليكوت فئة 2 البحري في أفران حرارية.",
        fr: "Découpe laser et usinage numérique avec tolérance ±0.5mm, suivi d'un thermolaquage certifié Qualicoat Classe 2.",
      },
      iconName: "Wrench",
    },
    {
      timeframe: isAr ? "1 إلى 2 يوم" : isFr ? "1 à 2 jours" : "1–2 Days",
      deliverable: isAr ? "تركيب نظيف بدون أعمال قص موقعية" : isFr ? "Pose Silencieuse et Propre" : "Bolt-together Assembly & Zero Site Debris",
      fallbackTitle: {
        en: "Turnkey On-Site Assembly",
        ar: "التركيب النظيف بدون إزعاج",
        fr: "Pose Clé en Main & Finitions",
      },
      fallbackSummary: {
        en: "Silent, bolt-together erection by our full-time in-house certified technicians. Zero welding, zero grinder sparks, and zero debris left on your patio.",
        ar: "تركيب صامت ومتقن بواسطة فرقنا الفنية المعتمدة دون أي استعانة بمقاولين من الباطن، وبدون أي أعمال لحام أو قص داخل موقعك.",
        fr: "Assemblage mécanique silencieux par nos équipes internes certifiées, sans découpe ni soudure sur votre propriété.",
      },
      iconName: "Hammer",
    },
    {
      timeframe: isAr ? "تسليم فوري" : isFr ? "Remise Immédiate" : "Handover Day",
      deliverable: isAr ? "شهادة ضمان 10 سنوات + تدريب الذكاء" : isFr ? "Garantie 10 Ans & Manuel Somfy" : "10-Yr Warranty Bond & Somfy Setup",
      fallbackTitle: {
        en: "Testing, Commissioning & Warranty",
        ar: "الفحص التشغيلي وتسليم شهادة الضمان",
        fr: "Essais, Mise en Service & Garantie",
      },
      fallbackSummary: {
        en: "Full operational testing of motorized louvers, LED dimming, and Somfy automation, finalized by delivering the 10-year official warranty certificate.",
        ar: "فحص كامل لحركة الشرائح، تصريف المياه، إضاءات LED الذكية، وتسليم سند الضمان الإنشائي الرسمي لمدة 10 سنوات مع خدمة ما بعد البيع.",
        fr: "Vérification complète de la motorisation, des capteurs de pluie et d'éclairage LED, remise de la garantie décennale.",
      },
      iconName: "ShieldCheck",
    },
  ];

  const resolvedSteps = defaultStepsMetadata.map((meta, idx) => {
    const existing = steps[idx];
    return {
      id: existing?.id || `step-${idx + 1}`,
      stepNumber: existing?.stepNumber || idx + 1,
      title:
        existing?.title?.[locale as "en" | "ar" | "fr"] ||
        existing?.title?.en ||
        meta.fallbackTitle[locale as "en" | "ar" | "fr"] ||
        meta.fallbackTitle.en,
      summary:
        existing?.summary?.[locale as "en" | "ar" | "fr"] ||
        existing?.summary?.en ||
        meta.fallbackSummary[locale as "en" | "ar" | "fr"] ||
        meta.fallbackSummary.en,
      timeframe: meta.timeframe,
      deliverable: meta.deliverable,
      iconName: meta.iconName,
    };
  });

  return (
    <section id="process" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        
        {/* Centered Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-3xl mx-auto space-y-3 mb-12 sm:mb-16"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#34AA49]">
            {eyebrow}
          </span>

          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-stone-900 leading-tight">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-stone-600 leading-relaxed max-w-2xl mx-auto">
            {subtitle}
          </p>
        </motion.div>

        {/* 5-Step Process Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 sm:gap-6">
          {resolvedSteps.map((step, idx) => {
            const Icon = iconMap[step.iconName] || CheckCircle2;

            return (
              <motion.div
                key={step.id}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.05 }}
                className="rounded-md bg-white border border-stone-200 p-5 flex flex-col justify-between shadow-xs hover:border-stone-300 hover:shadow-sm transition-all duration-200"
              >
                <div className="space-y-3.5">
                  {/* Step Number & Icon */}
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold font-mono text-[#34AA49]">
                      0{step.stepNumber}
                    </span>
                    <div className="h-9 w-9 rounded-md bg-stone-50 text-[#34AA49] flex items-center justify-center border border-stone-200">
                      <Icon className="h-4 w-4" />
                    </div>
                  </div>

                  {/* Timeframe Chip */}
                  <div className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded bg-stone-100 border border-stone-200 text-[10px] font-mono text-stone-600 font-medium">
                    <Clock className="h-3 w-3 text-[#34AA49]" />
                    <span>{step.timeframe}</span>
                  </div>

                  {/* Title & Summary */}
                  <div className="space-y-1.5">
                    <h3 className="text-sm sm:text-base font-bold text-stone-900 leading-snug">
                      {step.title}
                    </h3>
                    <p className="text-xs text-stone-600 leading-relaxed">
                      {step.summary}
                    </p>
                  </div>
                </div>

                {/* Milestone Deliverable Box */}
                <div className="mt-4 pt-3 border-t border-stone-100">
                  <div className="p-2 rounded bg-stone-50 border border-stone-200 space-y-0.5">
                    <div className="text-[10px] uppercase tracking-wider text-[#34AA49] font-bold flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
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

        {/* Quality Assurance Strip */}
        <motion.div
          variants={itemFadeUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-20px" }}
          className="mt-12 p-6 rounded-md bg-[#FAF8F5] border border-stone-200 shadow-xs flex flex-col lg:flex-row items-center justify-between gap-6"
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 text-left rtl:text-right">
            <div className="h-11 w-11 rounded-md bg-white text-[#34AA49] flex items-center justify-center shrink-0 border border-stone-200 shadow-xs">
              <Award className="h-5 w-5" />
            </div>
            <div className="space-y-1 max-w-2xl">
              <div className="flex items-center gap-2">
                <span className="text-xs uppercase tracking-wider text-[#34AA49] font-bold">
                  {isAr ? "ضمان التصنيع الداخلي في دبي" : isFr ? "Contrôle Qualité Intégré" : "Dubai In-House Fabrication"}
                </span>
                <span className="h-1.5 w-1.5 rounded-full bg-[#34AA49]" />
              </div>
              <p className="text-xs sm:text-sm text-stone-600 leading-relaxed">
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
            className="h-10 px-5 rounded-md bg-[#34AA49] hover:bg-[#268537] text-white font-medium text-xs uppercase tracking-wider shadow-xs transition-colors shrink-0"
          >
            <Link href="#contact">
              <span>{isAr ? "احجز معاينة ميدانية مجانية" : isFr ? "Réserver une Visite sur Site" : "Schedule Free Site Survey"}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
            </Link>
          </Button>
        </motion.div>

      </div>
    </section>
  );
}

export default ProcessSection;
