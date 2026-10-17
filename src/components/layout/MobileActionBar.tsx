"use client";

import { Phone, MessageSquare, Sparkles } from "lucide-react";
import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { siteConfig } from "@/lib/siteConfig";

export function MobileActionBar() {
  const locale = useLocale();

  return (
    <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-lg border-t border-border px-3 py-2.5 shadow-[0_-10px_25px_-5px_rgba(0,0,0,0.1)]">
      <div className="grid grid-cols-3 gap-2">
        <a
          href={`tel:${siteConfig.phone}`}
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-stone-100 text-stone-900 border border-stone-300 text-xs font-semibold shadow-xs active:scale-95 transition-all"
        >
          <Phone className="h-4 w-4" />
          <span>{locale === "ar" ? "اتصال" : locale === "fr" ? "Appel" : "Call"}</span>
        </a>

        <a
          href={siteConfig.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-[#25D366] text-white text-xs font-semibold shadow-sm active:scale-95 transition-all"
        >
          <MessageSquare className="h-4 w-4 fill-white" />
          <span>{locale === "ar" ? "واتساب" : locale === "fr" ? "WhatsApp" : "WhatsApp"}</span>
        </a>

        <Link
          href="/contact"
          className="flex items-center justify-center gap-1.5 h-11 rounded-xl bg-brass text-ink text-xs font-bold shadow-sm shadow-brass/25 active:scale-95 transition-all"
        >
          <Sparkles className="h-4 w-4" />
          <span>{locale === "ar" ? "عرض سعر" : locale === "fr" ? "Devis" : "Quote"}</span>
        </Link>
      </div>
    </aside>
  );
}
