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

  const displayedServices = showAll ? services : services.slice(0, 4);

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
    <section id="services" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1280px]">
        {/* Section Header */}
        <motion.div
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-40px" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 sm:mb-14"
        >
          <div className="space-y-3 max-w-2xl">
            <span className="text-[11px] sm:text-[12px] font-mono tracking-widest uppercase text-brass">
              {eyebrow}
            </span>
            <h2 className="text-[28px] sm:text-[34px] md:text-[40px] font-semibold font-display text-foreground leading-[1.15] tracking-tight">
              {title}
            </h2>
            <p className="text-[14px] sm:text-[15px] text-muted-foreground leading-relaxed">
              {subtitle}
            </p>
          </div>

          {!showAll && (
            <Button
              asChild
              variant="outline"
              className="self-start md:self-end h-10 px-5 rounded-lg border-border hover:border-brass/80 text-foreground text-xs font-semibold uppercase tracking-wider transition-all shrink-0"
            >
              <Link href="/services">
                <span>{viewAllText}</span>
                <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
              </Link>
            </Button>
          )}
        </motion.div>

        {/* Minimalist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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
                transition={{ delay: idx * 0.08 }}
                className="group rounded-2xl bg-card border border-border/80 overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,0,0,0.05)] hover:shadow-xl hover:border-brass/70 transition-all duration-300 flex flex-col justify-between"
              >
                <div>
                  {/* Clean Image Area - No Clutter */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-muted">
                    <Image
                      src={service.image.src}
                      alt={service.image.alt[locale as "en" | "ar" | "fr"] || service.image.alt.en || serviceTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      className="object-cover"
                    />
                  </div>

                  {/* Clean Content Area */}
                  <div className="p-5 sm:p-6 space-y-2.5">
                    <div className="flex items-center gap-2 text-brass">
                      <Icon className="h-4 w-4" />
                      <span className="text-[11px] font-mono uppercase tracking-wider font-semibold">Service 0{idx + 1}</span>
                    </div>

                    <h3 className="text-base font-bold text-foreground group-hover:text-brass transition-colors line-clamp-1">
                      {serviceTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                      {serviceSummary}
                    </p>
                  </div>
                </div>

                {/* Minimalist Solid Button with Proper Coloring */}
                <div className="p-5 sm:p-6 pt-0">
                  <Link
                    href={`/services/${service.slug}`}
                    className="w-full py-2.5 px-4 rounded-xl bg-[#F6F3EC] hover:bg-brass text-stone-800 hover:text-stone-950 border border-stone-200/90 hover:border-brass text-xs font-semibold transition-all duration-300 flex items-center justify-between group/btn shadow-xs hover:shadow-md"
                  >
                    <span>{isAr ? "المواصفات التقنية" : isFr ? "Spécifications" : "View Specifications"}</span>
                    <ArrowRight className="h-4 w-4 text-brass group-hover/btn:text-stone-950 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-all" />
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
