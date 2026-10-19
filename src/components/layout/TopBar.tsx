"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function TopBar() {
  const t = useTranslations("topbar");

  return (
    <div className="hidden md:block w-full bg-[#FAF8F5] text-stone-500 text-[11px] tracking-wider uppercase border-b border-stone-200/70 z-40 relative py-2">
      <div className="container mx-auto px-6 lg:px-12 max-w-7xl flex items-center justify-between">
        {/* Contact Info & Hours */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors font-medium"
          >
            <Phone className="h-3 w-3 text-[#B38E5D]" />
            <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 hover:text-stone-900 transition-colors font-medium lowercase"
          >
            <Mail className="h-3 w-3 text-[#B38E5D]" />
            <span>{siteConfig.email}</span>
          </a>

          <div className="flex items-center gap-1.5 text-stone-400">
            <Clock className="h-3 w-3 text-[#B38E5D]" />
            <span>{t("workingHours")}</span>
          </div>
        </div>

        {/* Tagline & Location */}
        <div className="flex items-center gap-4 text-stone-400 text-[10px] tracking-widest">
          <span>{t("tagline")}</span>
          <span className="text-stone-300">/</span>
          <span className="text-stone-800 font-semibold">{t("location")}</span>
        </div>
      </div>
    </div>
  );
}
