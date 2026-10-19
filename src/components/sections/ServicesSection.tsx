"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sliders, SunDim, Sparkles, Shield, Wrench, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Service } from "@/lib/content/schemas";

const serviceIconRegistry: Record<string, React.ElementType> = {
  "facade-design-fabrication": Building2,
  "minimal-sliding-doors": Sliders,
  "sustainable-building-solutions": SunDim,
  "glass-room-extensions": Sparkles,
  "glass-railings-balustrades": Shield,
  "bespoke-aluminum-fabrication": Wrench,
};

interface ServicesSectionProps {
  services?: Service[];
  showAll?: boolean;
}

export function ServicesSection({ services = [], showAll = false }: ServicesSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const activeServices = showAll ? services : services.slice(0, 4);

  const sectionEyebrow = isAr ? "القدرات الهندسية الشاملة" : isFr ? "Savoir-Faire Technique" : "End-to-End Capabilities";
  const sectionTitle = isAr
    ? "منظومة حلول معمارية متقدمة للمشاريع السكنية الراقية"
    : isFr
    ? "Solutions d'ingénierie architecturale pour résidences d'exception"
    : "Engineered architectural systems for luxury residences";
  const sectionIntro = isAr
    ? "نجمع بين التصنيع الرقمي في دبي والمواد الأوروبية لتقديم هياكل زجاجية وألمنيوم فائقة الدقة."
    : isFr
    ? "Une intégration verticale entre usinage CNC à Dubaï et profils haute performance."
    : "Combining local precision fabrication in Dubai with structural engineering to deliver high-performance facades and glass systems.";

  return (
    <section id="services" className="relative py-20 lg:py-28 bg-[#070B14] text-slate-100 overflow-hidden">
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 -left-40 w-96 h-96 bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 -right-40 w-96 h-96 bg-[#34AA49]/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-7xl relative z-10">
        {/* Header Block */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16 lg:mb-24">
          <div className="max-w-2xl space-y-3">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
              {sectionTitle}
            </h2>
            <p className="text-sm sm:text-base text-slate-400 leading-relaxed">
              {sectionIntro}
            </p>
          </div>

          {!showAll && (
            <Button
              asChild
              className="self-start md:self-end h-11 px-7 rounded-full bg-slate-900 border border-teal-500/30 hover:border-teal-400 hover:bg-teal-500/10 text-white text-xs font-bold uppercase tracking-wider transition-all"
            >
              <Link href="/services">
                <span>{isAr ? "كافة الخدمات" : isFr ? "Tous les Services" : "All Capabilities"}</span>
                <ArrowRight className="h-4 w-4 ml-2 rtl:mr-2 rtl:ml-0 rtl:rotate-180 text-teal-400" />
              </Link>
            </Button>
          )}
        </div>

        {/* Alternating Full-Width Numbered Rows */}
        <div className="space-y-16 lg:space-y-24">
          {activeServices.map((svc, index) => {
            const SvcIcon = serviceIconRegistry[svc.slug] || Building2;
            const heading = svc.title[locale as "en" | "ar" | "fr"] || svc.title.en;
            const description = svc.summary[locale as "en" | "ar" | "fr"] || svc.summary.en;
            const isEven = index % 2 === 1;
            const stepNum = index < 9 ? `0${index + 1}` : `${index + 1}`;

            return (
              <motion.div
                key={svc.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className={`flex flex-col ${
                  isEven ? "lg:flex-row-reverse" : "lg:flex-row"
                } items-center gap-8 lg:gap-14 p-6 sm:p-8 lg:p-10 rounded-3xl bg-slate-900/60 border border-white/10 hover:border-teal-500/40 transition-all duration-300 group shadow-2xl`}
              >
                {/* Visual Imagery Side */}
                <div className="w-full lg:w-1/2 relative aspect-[16/10] rounded-2xl overflow-hidden bg-slate-800 shadow-xl">
                  <Image
                    src={svc.image.src}
                    alt={svc.image.alt[locale as "en" | "ar" | "fr"] || svc.image.alt.en || heading}
                    fill
                    sizes="(max-width: 1024px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent" />
                  
                  {/* Floating badge inside media */}
                  <div className="absolute bottom-4 left-4 rtl:left-auto rtl:right-4 z-10 flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/10 text-xs font-mono text-teal-300">
                    <SvcIcon className="h-3.5 w-3.5 text-teal-400" />
                    <span>SPEC-0{index + 1}</span>
                  </div>
                </div>

                {/* Content Narrative Side */}
                <div className="w-full lg:w-1/2 flex flex-col justify-between space-y-6">
                  <div className="space-y-4">
                    {/* Massive Index Number + Tag */}
                    <div className="flex items-center justify-between">
                      <span className="text-5xl sm:text-6xl lg:text-7xl font-extrabold font-display text-teal-400/20 group-hover:text-teal-400/40 transition-colors">
                        {stepNum}
                      </span>
                      <span className="px-3.5 py-1 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-xs font-mono font-semibold">
                        {isAr ? "تصنيع دبي" : isFr ? "Usiné à Dubaï" : "Engineered in UAE"}
                      </span>
                    </div>

                    <h3 className="text-2xl sm:text-3xl font-extrabold font-display text-white group-hover:text-teal-300 transition-colors">
                      {heading}
                    </h3>

                    <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                      {description}
                    </p>

                    {/* Feature bullets */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-2">
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle className="h-4 w-4 text-[#34AA49] shrink-0" />
                        <span>{isAr ? "ألمنيوم 6063-T6 معتمد" : isFr ? "Aluminium 6063-T6" : "6063-T6 Structural Alloy"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle className="h-4 w-4 text-[#34AA49] shrink-0" />
                        <span>{isAr ? "تحمل رياح حتى 4.5 kPa" : isFr ? "Résistance vent 4.5 kPa" : "Wind Rated 4.5 kPa"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle className="h-4 w-4 text-[#34AA49] shrink-0" />
                        <span>{isAr ? "طلاء كواليكوت فئة 2" : isFr ? "Qualicoat Classe 2" : "Qualicoat Class 2 Finish"}</span>
                      </div>
                      <div className="flex items-center gap-2 text-xs font-medium text-slate-300">
                        <CheckCircle className="h-4 w-4 text-[#34AA49] shrink-0" />
                        <span>{isAr ? "ضمان مصنعي 10 سنوات" : isFr ? "Garantie Décennale" : "10-Year Warranty"}</span>
                      </div>
                    </div>
                  </div>

                  {/* Link CTA */}
                  <div className="pt-2">
                    <Link
                      href={`/services/${svc.slug}`}
                      className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-slate-800 hover:bg-[#34AA49] text-white border border-white/10 hover:border-[#34AA49] text-xs font-bold uppercase tracking-wider transition-all duration-300 shadow-md group/btn"
                    >
                      <span>{isAr ? "المواصفات الهندسية" : isFr ? "Fiche Technique Complète" : "Technical Specifications"}</span>
                      <ArrowRight className="h-4 w-4 text-teal-400 group-hover/btn:text-white rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
