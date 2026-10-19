"use client";

import { useLocale } from "next-intl";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";
import { Compass, FileCheck, Wrench, Hammer, ShieldCheck, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { ProcessStep } from "@/lib/content/schemas";

const stageIcons: Record<string, React.ElementType> = {
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

  const workflowStages = [
    {
      num: "01",
      icon: Compass,
      duration: isAr ? "خلال 24-48 ساعة" : isFr ? "24-48 heures" : "24–48 Hours",
      title: isAr ? "المسح الليزري والنمذجة ثلاثية الأبعاد" : isFr ? "Relevé Laser 3D & Étude" : "Laser Survey & 3D Spatial Render",
      desc: isAr
        ? "معاينة هندسية دقيقة للموقع بأجهزة ليزر متطورة وإعداد تصور واقعي ثلاثي الأبعاد يوضح ملاءمة البرجولا لمساحة فيلتك."
        : isFr
        ? "Relevé laser millimétrique de votre terrasse et rendu 3D haute résolution intégré à l'architecture de votre villa."
        : "Precise on-site laser scanning and 3D architectural rendering showing the pergola integrated into your actual space.",
      deliverable: isAr ? "رفع مساحي رقمي + مخطط أبعاد" : isFr ? "Scan Numérique & Rendu 3D" : "Digital CAD Survey & 3D Model",
    },
    {
      num: "02",
      icon: FileCheck,
      duration: isAr ? "2-3 أيام عمل" : isFr ? "2-3 jours ouvrés" : "2–3 Business Days",
      title: isAr ? "الحسابات الإنشائية واعتمادات البلدية" : isFr ? "Calculs de Structure & Permis" : "Engineering Calculations & Permitting",
      desc: isAr
        ? "تدقيق معايير مقاومة الرياح حتى 4.5 kPa وفق اشتراطات كود دبي للبناء وتجهيز كافة الرسومات لاعتماد المطور والبلدية."
        : isFr
        ? "Vérification des calculs de charge au vent (jusqu'à 4.5 kPa) et constitution du dossier d'approbation dubaïote."
        : "Wind load verification up to 4.5 kPa compliant with Dubai Building Code and developer authority packages.",
      deliverable: isAr ? "مخطط معتمد بختم هندسي" : isFr ? "Dossier Technique Validé" : "Stamped Engineering Package",
    },
    {
      num: "03",
      icon: Wrench,
      duration: isAr ? "7-10 أيام" : isFr ? "7-10 jours" : "7–10 Days",
      title: isAr ? "التصنيع الآلي CNC والطلاء الحراري" : isFr ? "Usinage CNC & Finition Poudre" : "Automated CNC Milling & Coating",
      desc: isAr
        ? "قص قطاعات الألمنيوم 6063-T6 بتفاوت ±0.5 مم على ماكينات CNC أوروبية وطلاء بودرة حراري Qualicoat Class 2."
        : isFr
        ? "Découpe numérique 5 axes et thermolaquage certifié Qualicoat Classe 2 résistant aux embruns salins et UV intenses."
        : "European 5-axis CNC machining of 6063-T6 marine alloy, finished with seaside-grade Qualicoat Class 2 powder coating.",
      deliverable: isAr ? "شهادة فحص الجودة المصنعية" : isFr ? "Contrôle Qualité Usine" : "Factory QA Inspection Sheet",
    },
    {
      num: "04",
      icon: Hammer,
      duration: isAr ? "1-3 أيام في الموقع" : isFr ? "1-3 jours sur site" : "1–3 Days Installation",
      title: isAr ? "التركيب الميكانيكي النظيف" : isFr ? "Assemblage Mécanique Propre" : "Clean Bolt-Together Installation",
      desc: isAr
        ? "تجميع الوحدات المسبقة الصنع عبر مسامير فولاذية غير قابلة للصدأ دون أي أعمال لحام أو قطع يدوية مزعجة داخل فيلتك."
        : isFr
        ? "Montage rapide de structures pré-ajustées en usine, sans poussière, sans bruit excessif ni soudure sur place."
        : "Silent erection of factory-prefitted modules using A4 stainless fasteners. Zero grinding, welding, or dust on site.",
      deliverable: isAr ? "تركيب مطابق للمواصفات الهندسية" : isFr ? "Installation Certifiée Conforme" : "Site Acceptance Report",
    },
    {
      num: "05",
      icon: ShieldCheck,
      duration: isAr ? "يوم التسليم" : isFr ? "Jour de Réception" : "Handover Day",
      title: isAr ? "الفحص والتشغيل وسند الضمان 10 سنوات" : isFr ? "Mise en Service & Garantie 10 Ans" : "Commissioning & 10-Year Warranty",
      desc: isAr
        ? "معايرة محركات Somfy وأنظمة الإضاءة الذكية وتسليم شهادة الضمان الهيكلي الشامل لمدة 10 سنوات مع كتيب الصيانة."
        : isFr
        ? "Programmation domotique, test d'étanchéité et remise officielle du certificat de garantie décennale structurelle."
        : "Motor calibration, smart home integration, water-drainage testing, and issuance of the 10-year warranty bond.",
      deliverable: isAr ? "شهادة الضمان 10 سنوات الرسمية" : isFr ? "Certificat Décennal Officiel" : "Official 10-Yr Warranty Bond",
    },
  ];

  return (
    <section id="process" className="py-20 lg:py-28 bg-[#070B14] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-5xl relative z-10">
        {/* Header Block */}
        <div className="text-center max-w-2xl mx-auto space-y-3 mb-16 sm:mb-20">
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight">
            {isAr
              ? "مسار دقيق من الرفع الهندسي إلى الضمان العشري"
              : isFr
              ? "De l'étude géométrique à la garantie décennale"
              : "From Precision Scanning to 10-Year Handover"}
          </h2>
          <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
            {isAr
              ? "بروتوكول هندسي منضبط يضمن سرعة الإنجاز ودقة المليمتر دون أي فوضى داخل حديقتك."
              : isFr
              ? "Un protocole strict sans improvisation : pré-fabrication en atelier pour une pose silencieuse."
              : "Disciplined fabrication protocols ensuring millimeter precision and predictable timelines."}
          </p>
        </div>

        {/* Vertical Staggered Timeline */}
        <div className="relative border-l-2 rtl:border-r-2 rtl:border-l-0 border-teal-500/30 ml-4 sm:ml-8 rtl:mr-4 rtl:sm:mr-8 rtl:ml-0 space-y-12">
          {workflowStages.map((stage, idx) => {
            const Icon = stage.icon;

            return (
              <motion.div
                key={stage.num}
                initial={{ opacity: 0, x: isAr ? 30 : -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="relative pl-8 sm:pl-12 rtl:pr-8 rtl:sm:pr-12 rtl:pl-0 group"
              >
                {/* Glowing Node on Timeline */}
                <div className="absolute -left-[17px] rtl:-right-[17px] rtl:left-auto top-1.5 h-8 w-8 rounded-full bg-slate-950 border-2 border-teal-400 flex items-center justify-center text-teal-400 shadow-[0_0_15px_rgba(20,184,166,0.5)] group-hover:bg-teal-400 group-hover:text-slate-950 transition-colors">
                  <span className="text-[11px] font-mono font-bold">{stage.num}</span>
                </div>

                {/* Stage Card */}
                <div className="rounded-2xl bg-slate-900/80 border border-white/10 p-6 sm:p-8 hover:border-teal-500/40 transition-all duration-300 shadow-xl space-y-4">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-xl bg-teal-500/10 border border-teal-500/20 text-teal-400 flex items-center justify-center shrink-0">
                        <Icon className="h-5 w-5" />
                      </div>
                      <h3 className="text-xl sm:text-2xl font-bold font-display text-white group-hover:text-teal-300 transition-colors">
                        {stage.title}
                      </h3>
                    </div>

                    <span className="px-3 py-1 rounded-full bg-slate-800 border border-white/10 text-xs font-mono text-teal-300">
                      {stage.duration}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    {stage.desc}
                  </p>

                  <div className="pt-3 border-t border-white/10 flex items-center gap-2 text-xs font-mono text-slate-400">
                    <CheckCircle2 className="h-4 w-4 text-[#34AA49] shrink-0" />
                    <span>{stage.deliverable}</span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Action Button at end of timeline */}
        <div className="mt-16 text-center">
          <Button
            asChild
            className="h-12 px-8 rounded-full bg-gradient-to-r from-[#34AA49] to-teal-500 hover:from-[#268537] hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/20"
          >
            <Link href="#contact">
              <span>{isAr ? "ابدأ استشارتك الهندسية المجانية" : isFr ? "Planifier Votre Étude Gratuite" : "Schedule Technical Consultation"}</span>
              <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default ProcessSection;
