"use client";

import { MessageSquare } from "lucide-react";
import { useLocale } from "next-intl";
import { siteConfig } from "@/lib/siteConfig";

export function FloatingWhatsApp() {
  const locale = useLocale();
  const label = locale === "ar" ? "محادثة عبر واتساب" : locale === "fr" ? "Discuter sur WhatsApp" : "Chat on WhatsApp";

  return (
    <aside aria-label="WhatsApp Contact" className="fixed bottom-20 md:bottom-8 right-6 rtl:right-auto rtl:left-6 z-40">
      <a
        href={siteConfig.whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with Eco Pergola on WhatsApp"
        className="relative group flex items-center justify-center h-14 w-14 rounded-full bg-[#25D366] text-white shadow-2xl hover:scale-110 active:scale-95 transition-all duration-300"
      >
        {/* Pulse ring animation */}
        <span className="absolute inset-0 rounded-full bg-[#25D366]/40 pulse-ring pointer-events-none" />

        <MessageSquare className="h-7 w-7 text-white fill-white relative z-10" />

        {/* Hover Tooltip */}
        <span className="absolute right-16 rtl:right-auto rtl:left-16 whitespace-nowrap bg-white text-stone-900 text-xs font-semibold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-200 shadow-xl border border-stone-200 hidden sm:block">
          {label}
        </span>
      </a>
    </aside>
  );
}
