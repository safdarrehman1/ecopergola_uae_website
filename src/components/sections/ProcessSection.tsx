"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { ArrowUpRight } from "lucide-react";
import type { ProcessStep } from "@/lib/content/schemas";

interface ProcessSectionProps {
  steps?: ProcessStep[];
}

export function ProcessSection({ steps = [] }: ProcessSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const workflow = [
    {
      index: "01",
      code: "PHASE I // CAD & LASER",
      title: isAr ? "المسح المساحي والرفع الليزري 3D" : isFr ? "Relevé Laser & Scan 3D" : "On-Site Laser Scan & 3D Modeling",
      description: isAr
        ? "رفع هندسي دقيق لمحيط الفيلا والتراس باستخدام أجهزة مسح ليزري رقمية لضمان دقة التركيب وتفادي التعديلات الميدانية."
        : isFr
        ? "Relevé laser millimétrique de votre extérieur et modélisation photoréaliste personnalisée."
        : "Millimeter-accurate digital laser survey of your outdoor terrace coupled with bespoke architectural 3D visualization.",
      duration: isAr ? "24-48 ساعة" : isFr ? "24-48h" : "24–48 Hours",
      milestone: isAr ? "مخطط الأبعاد الرقمي" : isFr ? "Scan Numérique" : "Digital CAD Plan",
    },
    {
      index: "02",
      code: "PHASE II // ENGINEERING",
      title: isAr ? "التدقيق الإنشائي واعتمادات دبي" : isFr ? "Calculs de Structure & Permis" : "Structural Engineering & Approvals",
      description: isAr
        ? "إجراء الحسابات الإنشائية لأحمال الرياح حتى 4.5 kPa وإعداد ملفات الاعتماد لبلدية دبي وإدارة المجمعات العقارية."
        : isFr
        ? "Calculs de résistance aux vents extrêmes (4.5 kPa) et préparation complète des dossiers administratifs."
        : "Wind load resistance verification up to 4.5 kPa and submission packages for Dubai Municipality and developers.",
      duration: isAr ? "2-3 أيام" : isFr ? "2-3 jours" : "2–3 Days",
      milestone: isAr ? "مخطط معتمد بالختم" : isFr ? "Dossier Validé" : "Stamped Engineering Package",
    },
    {
      index: "03",
      code: "PHASE III // CNC ATELIER",
      title: isAr ? "التصنيع الآلي والطلاء الحراري" : isFr ? "Usinage CNC & Finition" : "Precision CNC Milling & Coating",
      description: isAr
        ? "تشغيل قطاعات ألمنيوم 6063-T6 بتفاوت ±0.5 مم على ماكينات CNC أوروبية وطلاء بودرة Qualicoat فئة 2 البحري."
        : isFr
        ? "Découpe numérique 5 axes et thermolaquage certifié Qualicoat Classe 2 résistant aux embruns marins."
        : "Extruded 6063-T6 alloy components machined with ±0.5mm tolerance, followed by Seaside Qualicoat Class 2 finish.",
      duration: isAr ? "7-10 أيام" : isFr ? "7-10 jours" : "7–10 Days",
      milestone: isAr ? "تقرير فحص المصنع" : isFr ? "Contrôle Usine" : "Factory Inspection Sheet",
    },
    {
      index: "04",
      code: "PHASE IV // ASSEMBLY",
      title: isAr ? "التركيب الميكانيكي النظيف" : isFr ? "Pose Silencieuse Clé en Main" : "Turnkey Mechanical Installation",
      description: isAr
        ? "تجميع صامت للوحدات المسبقة الصنع عبر مسامير فولاذية غير قابلة للصدأ دون أي أعمال قص أو لحام داخل موقعك."
        : isFr
        ? "Assemblage mécanique silencieux par nos équipes internes, sans aucune poussière ni soudure sur site."
        : "Bolt-together modular assembly by certified full-time technicians. Zero welding, cutting, or debris on property.",
      duration: isAr ? "1-3 أيام" : isFr ? "1-3 jours" : "1–3 Days",
      milestone: isAr ? "محضر التسليم الميداني" : isFr ? "Réception Pose" : "Handover Certificate",
    },
    {
      index: "05",
      code: "PHASE V // COMMISSIONING",
      title: isAr ? "الفحص التشغيلي والضمان 10 سنوات" : isFr ? "Mise en Service & Garantie 10 Ans" : "Testing, Calibration & 10-Yr Bond",
      description: isAr
        ? "معايرة محركات Somfy وبرمجة الحساسات الذكية وتسليم شهادة الضمان الهيكلي الشامل لمدة 10 سنوات."
        : isFr
        ? "Programmation domotique, test d'étanchéité et remise officielle du certificat de garantie décennale."
        : "Operational calibration of motorized louvers, smart sensors, and official issuance of the 10-year structural warranty bond.",
      duration: isAr ? "يوم التسليم" : isFr ? "Immédiat" : "Handover Day",
      milestone: isAr ? "وثيقة الضمان 10 سنوات" : isFr ? "Garantie Décennale" : "10-Year Warranty Bond",
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1360px]">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 pb-6 border-b border-stone-200">
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-medium block">
              {isAr ? "بروتوكول التنفيذ المعماري" : isFr ? "Protocole d'Exécution" : "Execution Protocol"}
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-stone-900 tracking-tight leading-[1.12]">
              {isAr ? "مراحل التصنيع والتركيب المنضبطة" : isFr ? "Cinq Étapes de Rigueur et de Précision" : "The Architectural Execution Protocol"}
            </h2>
            <p className="text-sm text-stone-600 font-light leading-relaxed">
              {isAr
                ? "منهجية دقيقة تضمن عدم حدوث أي إزعاج في الفيلا وتسليم المشروع وفق أعلى المواصفات الهندسية."
                : isFr
                ? "Une organisation millimétrée évitant toute improvisation sur le lieu de votre résidence."
                : "A disciplined stage-gate methodology delivering structural integrity without disturbance to your home."}
            </p>
          </div>

          <Link
            href="/contact"
            className="self-start md:self-end text-xs font-mono tracking-[0.2em] uppercase text-stone-900 hover:text-[#B38E5D] transition-colors border-b border-stone-900 hover:border-[#B38E5D] pb-1 inline-flex items-center gap-2 shrink-0"
          >
            <span>{isAr ? "حجز معاينة موقع" : isFr ? "Demander une Visite" : "Schedule Survey"}</span>
            <ArrowUpRight className="h-3.5 w-3.5 rtl:rotate-270" />
          </Link>
        </div>

        {/* Numbered Process List with Hairlines */}
        <div className="divide-y divide-stone-200 border-y border-stone-200">
          {workflow.map((item) => (
            <div
              key={item.index}
              className="py-8 sm:py-10 grid grid-cols-1 md:grid-cols-12 gap-6 items-baseline group hover:bg-stone-100/50 transition-colors px-2 sm:px-4"
            >
              {/* Index Column */}
              <div className="md:col-span-2">
                <span className="text-2xl font-display text-[#B38E5D] block mb-1">
                  {item.index}
                </span>
                <span className="text-[10px] font-mono tracking-widest uppercase text-stone-600">
                  {item.code}
                </span>
              </div>

              {/* Title & Duration */}
              <div className="md:col-span-4 space-y-1">
                <h3 className="text-xl sm:text-2xl font-normal font-display text-stone-900 group-hover:text-[#B38E5D] transition-colors">
                  {item.title}
                </h3>
                <span className="inline-block text-[11px] font-mono text-[#B38E5D] tracking-wider uppercase">
                  {item.duration}
                </span>
              </div>

              {/* Description */}
              <div className="md:col-span-4">
                <p className="text-xs sm:text-sm text-stone-600 font-light leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Milestone Deliverable */}
              <div className="md:col-span-2 md:text-right rtl:md:text-left">
                <span className="text-[10px] font-mono uppercase tracking-widest text-stone-600 block mb-0.5">
                  Deliverable
                </span>
                <span className="text-xs font-mono text-stone-800 font-medium">
                  {item.milestone}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}

export default ProcessSection;
