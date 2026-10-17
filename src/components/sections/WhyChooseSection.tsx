"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import {
  ShieldCheck,
  Sparkles,
  Droplets,
  HardHat,
  Ruler,
  FileText,
} from "lucide-react";
import { sectionVariants, itemFadeUp } from "@/lib/motion";

export function WhyChooseSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const reasons = [
    {
      icon: Ruler,
      title: isAr ? "ألمنيوم إنشائي 6063-T6" : isFr ? "Aluminium de Structure 6063-T6" : "6063-T6 Structural Aluminum",
      desc: isAr
        ? "قطاعات هندسية سميكة مصممة لتحمل سرعات الرياح العالية حتى 140 كم/ساعة وفقاً لكود البناء في الإمارات."
        : isFr
        ? "Profilés extrudés robustes dimensionnés pour résister aux vents violents des Émirats jusqu'à 140 km/h."
        : "Heavy-gauge structural extrusions engineered to withstand high wind velocity up to Zone 3 UAE codes.",
    },
    {
      icon: Sparkles,
      title: isAr ? "طلاء كواليكوت سي سايد فئة 2" : isFr ? "Finition Qualicoat Seaside Classe 2" : "Qualicoat Seaside Class 2 Finish",
      desc: isAr
        ? "طلاء مسحوق إلكتروستاتيكي بحري يحمي الهيكل من رطوبة البحر والتملح والأشعة فوق البنفسجية لمدة 10+ سنوات."
        : isFr
        ? "Traitement thermolaqué marin résistant aux embruns salins, à l'humidité côtière et au rayonnement UV intense."
        : "Certified marine-grade electrostatic powder coating resistant to coastal saltwater humidity and extreme UV.",
    },
    {
      icon: ShieldCheck,
      title: isAr ? "ضمان هيكلي شامل 10 سنوات" : isFr ? "Garantie Décennale Complète" : "10-Year Structural Warranty",
      desc: isAr
        ? "شهادة ضمان رسمية تغطي سلامة الهيكل والألمنيوم وجودة الطلاء الصامد ضد التآكل والتشقق."
        : isFr
        ? "Certificat de garantie contractuel couvrant l'intégrité de la structure et la tenue du thermolaquage."
        : "Written warranty documentation covering structural integrity, frame deflection, and coating durability.",
    },
    {
      icon: Droplets,
      title: isAr ? "نظام تصريف مياه مخفي بالكامل" : isFr ? "Drainage Intégré et Invisible" : "Concealed Perimeter Drainage",
      desc: isAr
        ? "قنوات ومزاريب مدمجة داخل قطاعات السقف والأعمدة تمنع تدفق المياه الخارجي وتحافظ على نظافة التراس."
        : isFr
        ? "Gouttières internes intégrées dans les poutres et poteaux pour une évacuation propre et sans éclaboussures."
        : "Integrated internal gutter troughs and column downspouts eliminate exterior water splashing and patio staining.",
    },
    {
      icon: HardHat,
      title: isAr ? "فرق تركيب معتمدة بدوام كامل" : isFr ? "Équipes de Pose Internes Certifiées" : "Full-Time In-House Installers",
      desc: isAr
        ? "تنفيذ مباشر بواسطة مهندسينا وفنيينا المعتمدين دون استعانة بمقاولين من الباطن لضمان جودة التركيب."
        : isFr
        ? "Installation assurée par nos propres équipes techniques sans sous-traitance pour un résultat irréprochable."
        : "Executed exclusively by our certified technicians without third-party subcontractors, ensuring consistent craft.",
    },
    {
      icon: FileText,
      title: isAr ? "استشارة ومعاينة ثلاثية الأبعاد مجاناً" : isFr ? "Étude & Rendu 3D Gratuits" : "Complimentary 3D Consultation",
      desc: isAr
        ? "معاينة ميدانية بالليزر وتصميم ثلاثي الأبعاد مجاني يوضح شكل البرجولا في حديقتك قبل بدء التصنيع."
        : isFr
        ? "Relevé sur place et modélisation photoréaliste de la pergola dans votre jardin avant tout engagement."
        : "On-site laser measurement and realistic 3D visualization showing the exact structure in your space before fabrication.",
    },
  ];

  const eyebrow = isAr ? "معايير الثقة والاعتمادية" : isFr ? "Engagements & Spécifications" : "Engineering & Quality Standards";
  const title = isAr
    ? "مواصفات حقيقية مدعومة بالشهادات الهندسية"
    : isFr
    ? "Des engagements techniques vérifiables et documentés"
    : "Supportable standards verified by engineering data";
  const subtitle = isAr
    ? "نركز على الحقائق الهندسية والمواد المعتمدة بدلاً من الوعود التسويقية غير المؤكدة."
    : isFr
    ? "Une approche rigoureuse basée sur des spécifications testées plutôt que sur des promesses génériques."
    : "Specific manufacturing and material specifications proven to perform in Dubai's coastal and desert conditions.";

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-2xl mx-auto space-y-3 mb-12 sm:mb-16"
        >
          <span className="text-[11px] sm:text-[12px] font-mono tracking-widest uppercase text-brass">
            {eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold font-display text-foreground leading-[1.15] tracking-tight">
            {title}
          </h2>
          <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">
            {subtitle}
          </p>
        </motion.div>

        {/* 6 Supportable Reasons Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {reasons.map((r, idx) => {
            const Icon = r.icon;
            return (
              <motion.div
                key={idx}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.06 }}
                className="rounded-2xl border border-stone-200/90 bg-white p-6 sm:p-7 space-y-3.5 shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-brass/70 transition-all duration-300"
              >
                <div className="h-11 w-11 rounded-xl bg-amber-50 text-brass flex items-center justify-center border border-amber-200/60 shadow-xs">
                  <Icon className="h-5 w-5" />
                </div>
                <h3 className="text-base font-bold text-foreground leading-snug">
                  {r.title}
                </h3>
                <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                  {r.desc}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default WhyChooseSection;
