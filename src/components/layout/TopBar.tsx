"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function TopBar() {
  const t = useTranslations("topbar");

  return (
    <div className="hidden md:block w-full bg-[#FAF8F5] text-stone-600 text-xs border-b border-stone-200/80 z-40 relative py-2.5">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Contact Info & Hours */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-amber-800 transition-colors font-medium"
          >
            <Phone className="h-3.5 w-3.5 text-brass" />
            <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 hover:text-amber-800 transition-colors font-medium"
          >
            <Mail className="h-3.5 w-3.5 text-brass" />
            <span>{siteConfig.email}</span>
          </a>

          <div className="flex items-center gap-1.5 text-stone-500">
            <Clock className="h-3.5 w-3.5 text-brass" />
            <span>{t("workingHours")}</span>
          </div>
        </div>

        {/* Tagline & Location */}
        <div className="flex items-center gap-4 text-stone-500">
          <span>{t("tagline")}</span>
          <span className="text-stone-300">|</span>
          <span className="text-amber-800 font-semibold">{t("location")}</span>
        </div>
      </div>
    </div>
  );
}

