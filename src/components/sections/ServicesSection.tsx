"use client";

import { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Sparkles,
  Building,
  Layers,
  Shield,
  Wrench,
  Compass,
  Flame,
  ChevronDown,
  Check,
} from "lucide-react";
import { getLocalizedServices } from "@/data/localizedData";
import { Button } from "@/components/ui/button";

const icons = [Building, Layers, Shield, Sparkles, Compass, Wrench, Flame, Shield];

export function ServicesSection() {
  const [visibleCount, setVisibleCount] = useState<number>(4);
  const locale = useLocale();
  const tServices = useTranslations("services");
  const tCommon = useTranslations("common");
  const services = getLocalizedServices(locale);

  const displayedServices = services.slice(0, visibleCount);
  const hasMore = visibleCount < services.length;

  return (
    <section id="services" className="py-20 md:py-28 bg-background relative overflow-hidden">
      {/* Ambient background blur */}
      <div className="absolute top-1/3 -right-20 w-80 h-80 bg-forest/5 dark:bg-brass/5 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-3xl mx-auto space-y-4 mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/10 dark:bg-brass/10 border border-forest/20 dark:border-brass/20 text-xs font-bold text-forest dark:text-brass uppercase tracking-wider shadow-sm">
            <Sparkles className="h-3.5 w-3.5 text-brass" />
            <span>{tServices("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground tracking-tight">
            {tServices("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tServices("subtitle")}
          </p>
        </motion.div>

        {/* Service Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <AnimatePresence>
            {displayedServices.map((service, index) => {
              const IconComponent = icons[index % icons.length];

              return (
                <motion.div
                  key={service.id}
                  layout
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.5, delay: index * 0.08 }}
                  className="group relative rounded-3xl bg-card border border-border overflow-hidden hover:border-brass/60 shadow-sm hover:shadow-[0_20px_45px_-12px_rgba(184,137,90,0.25)] transition-all duration-500 flex flex-col justify-between"
                >
                  {/* Brass Top Line Draw on Hover */}
                  <div className="absolute top-0 left-0 right-0 h-[3px] bg-brass scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left z-20" />

                  <div>
                    {/* Card Image with Zoom */}
                    <div className="relative h-52 w-full overflow-hidden bg-muted">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent z-10" />

                      {/* Icon Badge */}
                      <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 z-20 h-10 w-10 rounded-2xl bg-forest/90 backdrop-blur-md text-white flex items-center justify-center shadow-lg group-hover:bg-brass group-hover:text-ink transition-all duration-300">
                        <IconComponent className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Card Content */}
                    <div className="p-6 space-y-3">
                      <h3 className="text-lg font-bold font-display text-foreground group-hover:text-brass transition-colors leading-snug">
                        {service.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-muted-foreground line-clamp-3 leading-relaxed">
                        {service.shortDescription}
                      </p>

                      {/* Micro Specs / Benefits Pills */}
                      <div className="pt-2 flex flex-wrap gap-1.5 border-t border-border/50">
                        {service.benefits?.slice(0, 2).map((item, i) => (
                          <span
                            key={i}
                            className="inline-flex items-center gap-1 text-[10px] font-medium bg-sand/30 dark:bg-muted/40 text-muted-foreground px-2 py-0.5 rounded-md truncate max-w-full"
                          >
                            <Check className="h-2.5 w-2.5 text-brass shrink-0" />
                            <span className="truncate">{item}</span>
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card CTA Footer */}
                  <div className="p-6 pt-0">
                    <Link
                      href={`/services/${service.slug}`}
                      className="inline-flex items-center gap-2 text-xs font-bold text-forest dark:text-brass uppercase tracking-wider group-hover:underline"
                    >
                      <span>{tCommon("learnMore")}</span>
                      <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        {/* Load More & Explore Buttons */}
        <div className="mt-14 flex flex-col sm:flex-row items-center justify-center gap-4">
          {hasMore ? (
            <Button
              variant="brass"
              size="lg"
              onClick={() => setVisibleCount((prev) => Math.min(services.length, prev + 4))}
              className="rounded-xl font-semibold shadow-md shadow-brass/20"
            >
              <span>{tCommon("loadMore")} ({services.length - visibleCount} more)</span>
              <ChevronDown className="h-4 w-4 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Button>
          ) : (
            <Button
              variant="outline"
              size="sm"
              onClick={() => setVisibleCount(4)}
              className="rounded-xl text-xs"
            >
              <span>Show Less</span>
            </Button>
          )}

          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-xl font-semibold hover:border-brass border-border bg-card/80 backdrop-blur-md"
          >
            <Link href="/services">
              <span>{tServices("eyebrow")}</span>
              <ArrowRight className="h-4 w-4 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

