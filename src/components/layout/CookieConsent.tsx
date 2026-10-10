"use client";

import { useState, useEffect } from "react";
import { Cookie, X } from "lucide-react";
import { useLocale } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";

export function CookieConsent() {
  const [show, setShow] = useState(false);
  const locale = useLocale();

  useEffect(() => {
    const consent = localStorage.getItem("ecopergola_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setShow(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem("ecopergola_cookie_consent", "accepted");
    setShow(false);
  };

  const handleDecline = () => {
    localStorage.setItem("ecopergola_cookie_consent", "declined");
    setShow(false);
  };

  if (!show) return null;

  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const title = isAr
    ? "تفضيلات ملفات تعريف الارتباط والخصوصية"
    : isFr
    ? "Préférences de Confidentialité & Cookies"
    : "Cookie & Privacy Preferences";

  const text = isAr
    ? "نستخدم ملفات تعريف الارتباط الأساسية لتحسين تجربة التصفح وضمان الأداء الأمثل للموقع."
    : isFr
    ? "Nous utilisons des cookies essentiels pour optimiser votre expérience de navigation et la performance du site."
    : "We use essential cookies and anonymous analytics to enhance your browsing experience and ensure optimal website performance.";

  const acceptBtn = isAr ? "قبول الكل" : isFr ? "Tout Accepter" : "Accept All";
  const declineBtn = isAr ? "رفض" : isFr ? "Refuser" : "Decline";
  const policyLink = isAr ? "السياسة" : isFr ? "Politique" : "Policy";

  return (
    <aside
      aria-label="Cookie Preferences"
      className="fixed bottom-24 md:bottom-6 left-4 right-4 md:left-6 md:right-auto rtl:md:left-auto rtl:md:right-6 max-w-md z-50 animate-in fade-in-0 slide-in-from-bottom-5 duration-300"
    >
      <div className="bg-popover border border-border/80 rounded-2xl p-5 shadow-2xl backdrop-blur-xl">
        <div className="flex items-start gap-3">
          <div className="h-9 w-9 rounded-xl bg-brass/10 flex items-center justify-center shrink-0 text-brass mt-0.5">
            <Cookie className="h-5 w-5" />
          </div>

          <div className="space-y-2 flex-1">
            <h4 className="text-sm font-semibold font-display text-foreground">
              {title}
            </h4>
            <p className="text-xs text-muted-foreground leading-relaxed">
              {text}
            </p>

            <div className="flex items-center gap-2 pt-2">
              <Button
                variant="brass"
                size="sm"
                onClick={handleAccept}
                className="h-8 px-4 text-xs font-semibold"
              >
                {acceptBtn}
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={handleDecline}
                className="h-8 px-4 text-xs"
              >
                {declineBtn}
              </Button>
              <Link
                href="/privacy-policy"
                className="text-[11px] text-muted-foreground hover:text-brass underline-offset-2 hover:underline ml-auto rtl:ml-0 rtl:mr-auto"
              >
                {policyLink}
              </Link>
            </div>
          </div>

          <button
            onClick={handleDecline}
            aria-label="Close cookie banner"
            className="text-muted-foreground hover:text-foreground p-1 rounded-lg hover:bg-muted"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
