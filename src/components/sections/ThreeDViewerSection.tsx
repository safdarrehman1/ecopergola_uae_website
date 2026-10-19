"use client";

import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { Box, Eye, Layers } from "lucide-react";
import { Scene } from "@/components/threeui/Scene";

export function ThreeDViewerSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const title = isAr
    ? "معاينة ثلاثية الأبعاد تفاعلية"
    : isFr
    ? "Aperçu 3D Interactif de la Structure"
    : "Interactive 3D Architectural Model Preview";

  const caption = isAr
    ? "تحكم بالنموذج الثلاثي الأبعاد بزاوية 360 درجة لاستكشاف دقة التفاصيل الهندسية والألمنيوم المعماري."
    : isFr
    ? "Faites pivoter la maquette 3D à 360° pour explorer la précision de l'extrusion aluminium et les finitions."
    : "Rotate and inspect our architectural aluminum pergola model in 360° to view concealed joints and precision louvers.";

  return (
    <section className="py-14 sm:py-18 bg-[#FAF8F5] border-b border-stone-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-5xl">
        <div className="text-center max-w-2xl mx-auto mb-8 space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-stone-200 text-xs font-medium text-stone-700">
            <Box className="h-3.5 w-3.5 text-[#34AA49]" />
            <span>{isAr ? "قسم المعاينة 3D" : isFr ? "Module 3D" : "3D Preview Section"}</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold font-display text-stone-900">
            {title}
          </h2>
          <p className="text-xs sm:text-sm text-stone-600">
            {caption}
          </p>
        </div>

        {/* Bordered Card Container with 3D Scene */}
        <div className="rounded-md border border-stone-200 bg-white p-3 sm:p-4 shadow-sm">
          <div className="relative w-full h-[360px] sm:h-[440px] rounded-sm overflow-hidden bg-stone-50">
            <Scene
              speed={0.8}
              scale={1.0}
              opacity={1.0}
              hue={0}
              saturation={1.0}
              brightness={1.0}
              className="w-full h-full"
            />
            <div className="absolute bottom-3 left-3 rtl:left-auto rtl:right-3 bg-white/90 backdrop-blur-sm border border-stone-200 px-3 py-1 rounded text-[11px] font-mono text-stone-700 shadow-xs">
              360° Cylinder Model • Dubai Specs
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ThreeDViewerSection;
