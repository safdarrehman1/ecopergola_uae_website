"use client";

import { useLocale } from "next-intl";
import { Scene } from "@/components/threeui/Scene";

export function ThreeDViewerSection() {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  return (
    <section className="w-full bg-[#141416] text-stone-300 border-y border-stone-800 relative">
      {/* Full-Bleed 3D Viewport */}
      <div className="w-full h-[480px] sm:h-[580px] lg:h-[680px] relative">
        <Scene
          speed={0.65}
          scale={1.05}
          opacity={1.0}
          hue={0}
          saturation={1.0}
          brightness={1.0}
          className="w-full h-full"
        />

        {/* Minimal Floating Caption */}
        <div className="absolute top-6 left-6 rtl:left-auto rtl:right-6 pointer-events-none">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-black/60 backdrop-blur-md border border-stone-800 text-[10px] font-mono tracking-widest uppercase text-stone-300">
            <span className="w-1.5 h-1.5 rounded-full bg-[#34AA49]" />
            <span>{isAr ? "نموذج ثلاثي الأبعاد تفاعلي" : isFr ? "Visualiseur Spatial 3D" : "Architectural 3D Model"}</span>
          </div>
        </div>
      </div>

      {/* Thin Hairline Metadata Bar Under It */}
      <div className="w-full bg-[#0E0E10] border-t border-stone-800/80 px-6 sm:px-12 lg:px-16 py-3.5 flex flex-wrap items-center justify-between gap-4 text-[11px] font-mono text-stone-400">
        <div className="flex items-center gap-4">
          <span className="text-stone-200 uppercase tracking-widest font-semibold">
            {isAr ? "نخلة جميرا وتلال الإمارات" : isFr ? "Palm Jumeirah & Emirates Hills" : "Palm Jumeirah & Emirates Hills Series"}
          </span>
          <span className="hidden sm:inline text-stone-700">|</span>
          <span className="hidden sm:inline text-stone-500">
            6063-T6 Marine Alloy Extrusions
          </span>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#B38E5D]" />
            <span className="text-stone-300 uppercase tracking-wider">
              {isAr ? "اختبار رياح 4.5 kPa" : isFr ? "Testé 4.5 kPa" : "Wind Load Rated 4.5 kPa"}
            </span>
          </div>
          <span className="text-stone-500 uppercase tracking-widest hidden md:inline">
            {isAr ? "اسحب للتدوير 360°" : isFr ? "Glisser pour pivoter" : "Drag to inspect 360°"}
          </span>
        </div>
      </div>
    </section>
  );
}

export default ThreeDViewerSection;
