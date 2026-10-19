"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Building2, Sliders, Shield, SunDim, Wrench, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionVariants, itemFadeUp } from "@/lib/motion";
import type { Service } from "@/lib/content/schemas";

const iconMap: Record<string, React.ElementType> = {
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

  // Template 1 rule: uniform 3-column cards
  const displayedServices = showAll ? services : services.slice(0, 3);

  const eyebrow = isAr ? "خدماتنا الهندسية المتخصصة" : isFr ? "Nos Domaines d'Expertise" : "Specialized Engineering Services";
  const title = isAr
    ? "حلول معمارية متكاملة للفلل والمشاريع الفاخرة"
    : isFr
    ? "Solutions architecturales complètes pour villas et projets de prestige"
    : "Engineered architectural systems for luxury properties";
  const subtitle = isAr
    ? "من واجهات المباني الزجاجية إلى أنظمة الأبواب المنزلقة الدقيقة، نصمم ونفذ بأعلى مواصفات الجودة والمتانة."
    : isFr
    ? "De la conception de façades aux baies coulissantes minimales, une expertise de pointe aux Émirats."
    : "From structural curtain walls to minimal 20mm sliding doors, we engineer bespoke solutions for Dubai's architectural standards.";
  const viewAllText = isAr ? "عرض جميع الخدمات" : isFr ? "Voir Tous les Services" : "View All Services";

  return (
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-white border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
        {/* Centered Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="text-center max-w-3xl mx-auto mb-12 sm:mb-14"
        >
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-[#34AA49] mb-2">
            {eyebrow}
          </span>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold font-display text-stone-900 leading-tight">
            {title}
          </h2>
          <p className="mt-3 text-sm sm:text-base text-stone-600 leading-relaxed">
            {subtitle}
          </p>

          {!showAll && (
            <div className="mt-6 flex justify-center">
              <Button
                asChild
                variant="outline"
                className="h-9 px-4 rounded-md border-stone-300 hover:border-[#34AA49] hover:text-[#34AA49] text-stone-800 text-xs font-semibold uppercase tracking-wider transition-colors"
              >
                <Link href="/services">
                  <span>{viewAllText}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {/* Uniform 3-Column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedServices.map((service, idx) => {
            const Icon = iconMap[service.slug] || Building2;
            const serviceTitle = service.title[locale as "en" | "ar" | "fr"] || service.title.en;
            const serviceSummary = service.summary[locale as "en" | "ar" | "fr"] || service.summary.en;

            return (
              <motion.article
                key={service.id}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.05 }}
                className="group rounded-md bg-white border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt[locale as "en" | "ar" | "fr"] || service.image.alt.en || serviceTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                  </div>

                  <div className="p-6 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-[#34AA49]">
                      <Icon className="h-4 w-4" />
                      <span className="text-[11px] font-semibold uppercase tracking-wider">Service 0{idx + 1}</span>
                    </div>

                    <h3 className="text-lg font-bold text-stone-900 group-hover:text-[#34AA49] transition-colors line-clamp-1">
                      {serviceTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-3">
                      {serviceSummary}
                    </p>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full py-2.5 px-4 rounded-md bg-stone-50 hover:bg-[#34AA49] hover:text-white border border-stone-200 hover:border-[#34AA49] text-stone-800 text-xs font-semibold transition-colors flex items-center justify-between group/btn shadow-xs"
                  >
                    <span>{isAr ? "المواصفات التقنية" : isFr ? "Spécifications" : "View Specifications"}</span>
                    <ArrowRight className="h-3.5 w-3.5 text-stone-400 group-hover/btn:text-white rtl:rotate-180 transition-colors" />
                  </Link>
                </div>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default ServicesSection;
