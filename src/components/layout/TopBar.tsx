"use client";

import { useTranslations } from "next-intl";
import { Phone, Mail, Clock } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";

export function TopBar() {
  const t = useTranslations("topbar");

  return (
    <div className="hidden md:block w-full bg-[#060A14] text-stone-300 text-xs border-b border-white/10 z-40 relative py-2.5">
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Contact Info & Hours */}
        <div className="flex items-center gap-6">
          <a
            href={`tel:${siteConfig.phone}`}
            className="flex items-center gap-1.5 hover:text-[#48C35F] transition-colors font-medium text-stone-300"
          >
            <Phone className="h-3.5 w-3.5 text-[#34AA49]" />
            <span dir="ltr">{siteConfig.phoneDisplay}</span>
          </a>

          <a
            href={`mailto:${siteConfig.email}`}
            className="flex items-center gap-1.5 hover:text-[#48C35F] transition-colors font-medium text-stone-300"
          >
            <Mail className="h-3.5 w-3.5 text-[#34AA49]" />
            <span>{siteConfig.email}</span>
          </a>

          <div className="flex items-center gap-1.5 text-stone-400">
            <Clock className="h-3.5 w-3.5 text-[#34AA49]" />
            <span>{t("workingHours")}</span>
          </div>
        </div>

        {/* Tagline & Location */}
        <div className="flex items-center gap-4 text-stone-400">
          <span>{t("tagline")}</span>
          <span className="text-stone-700">|</span>
          <span className="text-[#48C35F] font-semibold">{t("location")}</span>
        </div>
      </div>
    </div>
  );
}
