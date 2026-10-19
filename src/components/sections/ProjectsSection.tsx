"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { MapPin, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { sectionVariants, itemFadeUp } from "@/lib/motion";
import type { Project } from "@/lib/content/schemas";

interface ProjectsSectionProps {
  projects?: Project[];
  showAll?: boolean;
}

export function ProjectsSection({ projects = [], showAll = false }: ProjectsSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const featuredProjects = showAll ? projects : projects.slice(0, 3);

  const eyebrow = isAr ? "مشاريع مميزة تم تنفيذها" : isFr ? "Études de Cas Réalisées" : "Featured Case Studies";
  const title = isAr
    ? "مشاريع حقيقية تم تسليمها في دبي والإمارات"
    : isFr
    ? "Projets réels livrés avec succès à Dubaï"
    : "Identifiable architectural projects delivered in Dubai";
  const subtitle = isAr
    ? "دراسات حالة موثقة تبرز نطاق الأعمال، المواد المستخدمة، والدقة الهندسية في الفلل والأبراج."
    : isFr
    ? "Des réalisations documentées mettant en avant le périmètre technique, les matériaux et la qualité d'exécution."
    : "Documented case studies detailing structural scope, materials specified, and completed installations across premier UAE addresses.";

  return (
    <section id="projects" className="py-16 sm:py-20 lg:py-24 bg-[#FAF8F5] border-b border-stone-200">
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
                <Link href="/projects">
                  <span>{isAr ? "عرض كل المشاريع" : isFr ? "Toutes les Réalisations" : "View Full Portfolio"}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
                </Link>
              </Button>
            </div>
          )}
        </motion.div>

        {/* 3-Column Structured Card Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredProjects.map((project, idx) => {
            const projectTitle = project.title[locale as "en" | "ar" | "fr"] || project.title.en;
            const projectLocation = project.location[locale as "en" | "ar" | "fr"] || project.location.en;
            const projectSummary = project.summary[locale as "en" | "ar" | "fr"] || project.summary.en;

            return (
              <motion.article
                key={project.id}
                variants={itemFadeUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-30px" }}
                transition={{ delay: idx * 0.06 }}
                className="group rounded-md bg-white border border-stone-200 overflow-hidden shadow-xs hover:border-stone-300 hover:shadow-sm transition-all duration-200 flex flex-col justify-between"
              >
                <div>
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-stone-100">
                    <Image
                      src={project.image.src}
                      alt={project.image.alt[locale as "en" | "ar" | "fr"] || project.image.alt.en || projectTitle}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover"
                    />
                    <div className="absolute top-3 left-3 rtl:left-auto rtl:right-3 z-10">
                      <span className="inline-flex items-center gap-1.5 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-white/95 text-stone-800 font-semibold border border-stone-200 shadow-xs">
                        <MapPin className="h-2.5 w-2.5 text-[#34AA49]" />
                        <span>{projectLocation}</span>
                      </span>
                    </div>
                  </div>

                  <div className="p-5 space-y-2">
                    <div className="text-[11px] text-[#34AA49] uppercase tracking-wider font-semibold">
                      Case Study 0{idx + 1} • {project.year}
                    </div>

                    <h3 className="text-base font-bold text-stone-900 group-hover:text-[#34AA49] transition-colors line-clamp-1">
                      {projectTitle}
                    </h3>
                    <p className="text-xs sm:text-sm text-stone-600 leading-relaxed line-clamp-2">
                      {projectSummary}
                    </p>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <Link
                    href={`/projects/${project.slug}`}
                    className="w-full py-2 px-3.5 rounded-md bg-stone-50 hover:bg-[#34AA49] hover:text-white border border-stone-200 hover:border-[#34AA49] text-stone-800 text-xs font-medium transition-colors flex items-center justify-between group/btn shadow-xs"
                  >
                    <span>{isAr ? "دراسة الحالة الكاملة" : isFr ? "Lire l'Étude de Cas" : "Read Full Case Study"}</span>
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

export default ProjectsSection;
