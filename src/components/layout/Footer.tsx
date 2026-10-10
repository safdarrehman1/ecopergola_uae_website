"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { Phone, Mail, MapPin, Clock, ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";

export function Footer() {
  const currentYear = new Date().getFullYear();
  const locale = useLocale();
  const t = useTranslations("common");
  const tNav = useTranslations("nav");

  const companyBio =
    locale === "ar"
      ? "الشركة الرائدة في دبي لتصنيع الألمنيوم والزجاج المعماري، نقدم حلولاً خارجية وداخلية مبتكرة مصممة لترقية مساحتك بأعلى مستويات الأناقة والكفاءة والاستدامة."
      : locale === "fr"
      ? "Premier fabricant d'aluminium et de verre architectural à Dubaï, offrant des solutions extérieures et intérieures haut de gamme alliant style, efficacité et durabilité."
      : "Dubai's premier aluminum and glass fabricator, delivering innovative, high-quality exterior and interior solutions designed to enhance your space with style, efficiency, and sustainability.";

  return (
    <footer className="bg-ink text-sand-light pt-20 pb-12 border-t border-white/10 relative overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-forest/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-10 w-96 h-96 bg-brass/10 rounded-full blur-3xl pointer-events-none" />

      <div className="container mx-auto px-4 max-w-7xl relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Column 1: Brand & Bio */}
          <div className="space-y-6">
            <Link href="/" aria-label="Eco Pergola" className="inline-flex items-center group">
              <div className="relative h-20 w-20 sm:h-24 sm:w-24 rounded-2xl overflow-hidden bg-white border border-white/30 flex items-center justify-center p-2 shadow-2xl group-hover:border-brass group-hover:shadow-brass/20 transition-all duration-300">
                <Image
                  src="/images/logo.jpeg"
                  alt="Eco Pergola"
                  width={96}
                  height={96}
                  className="h-full w-full object-contain"
                />
              </div>
            </Link>

            <p className="text-sm text-sand-dark leading-relaxed">
              {companyBio}
            </p>

            {/* Social SVGs */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href={siteConfig.social.facebook}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eco Pergola on Facebook"
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-brass hover:text-ink flex items-center justify-center transition-colors text-sand-light"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.twitter}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eco Pergola on X (Twitter)"
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-brass hover:text-ink flex items-center justify-center transition-colors text-sand-light"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eco Pergola on Instagram"
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-brass hover:text-ink flex items-center justify-center transition-colors text-sand-light"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z" />
                </svg>
              </a>

              <a
                href={siteConfig.social.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Eco Pergola on LinkedIn"
                className="h-9 w-9 rounded-lg bg-white/5 hover:bg-brass hover:text-ink flex items-center justify-center transition-colors text-sand-light"
              >
                <svg className="h-4 w-4 fill-current" viewBox="0 0 24 24">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold font-display tracking-wider uppercase text-brass">
              {t("company")}
            </h4>
            <ul className="space-y-3 text-sm">
              {[
                { label: tNav("about"), href: "/about" },
                { label: tNav("services"), href: "/services" },
                { label: tNav("products"), href: "/products" },
                { label: tNav("pergolaTypes"), href: "/pergola-types" },
                { label: tNav("portfolio"), href: "/projects" },
                { label: tNav("blog"), href: "/blog" },
                { label: tNav("faq"), href: "/faq" },
                { label: tNav("contact"), href: "/contact" },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sand-dark hover:text-brass transition-colors flex items-center gap-1.5 group"
                  >
                    <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all text-brass rtl:rotate-180" />
                    <span>{link.label}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Contact Details */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold font-display tracking-wider uppercase text-brass">
              {t("contactInfo")}
            </h4>
            <div className="space-y-4 text-sm text-sand-dark">
              <div className="flex items-start gap-3">
                <MapPin className="h-4 w-4 text-brass shrink-0 mt-1" />
                <span>{locale === "ar" ? "منطقة القوز الصناعية 3، دبي، الإمارات العربية المتحدة" : siteConfig.address.full}</span>
              </div>

              <div className="flex items-center gap-3">
                <Phone className="h-4 w-4 text-brass shrink-0" />
                <a
                  href={`tel:${siteConfig.phone}`}
                  dir="ltr"
                  className="hover:text-brass transition-colors"
                >
                  {siteConfig.phoneDisplay}
                </a>
              </div>

              <div className="flex items-center gap-3">
                <Mail className="h-4 w-4 text-brass shrink-0" />
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="hover:text-brass transition-colors"
                >
                  {siteConfig.email}
                </a>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="h-4 w-4 text-brass shrink-0 mt-1" />
                <div>
                  <p>{t("workingHoursDays")}</p>
                  <p className="text-sand-light">{t("workingHoursTime")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Column 4: Project Showcase Thumbnails */}
          <div className="space-y-6">
            <h4 className="text-base font-semibold font-display tracking-wider uppercase text-brass">
              {t("recentWork")}
            </h4>
            <div className="grid grid-cols-3 gap-2.5">
              {[
                {
                  id: "dubai-marina-luxury-tower",
                  title: "Dubai Marina Tower",
                  image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400&q=80&auto=format&fit=crop",
                },
                {
                  id: "business-bay-corporate-center",
                  title: "Business Bay Center",
                  image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop",
                },
                {
                  id: "palm-jumeirah-private-villa",
                  title: "Palm Jumeirah Villa",
                  image: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=400&q=80&auto=format&fit=crop",
                },
              ].map((proj) => (
                <Link
                  key={proj.id}
                  href={`/projects/${proj.id}`}
                  className="group relative h-20 rounded-xl overflow-hidden border border-white/10 hover:border-brass transition-all block"
                >
                  <Image
                    src={proj.image}
                    alt={proj.title}
                    fill
                    sizes="(max-width: 768px) 30vw, 100px"
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-black/40 group-hover:bg-black/10 transition-colors" />
                </Link>
              ))}
            </div>

            <div className="pt-2">
              <span className="text-xs text-sand-dark block mb-2 font-medium">{t("selectLanguage")}</span>
              <LanguageSwitcher />
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Legal */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-sand-dark">
          <p>
            © {currentYear} {siteConfig.name} — {t("allRightsReserved")}. {t("tagline")}.
          </p>

          <div className="flex items-center gap-6">
            <Link href="/privacy-policy" className="hover:text-brass transition-colors">
              {t("privacyPolicy")}
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/terms" className="hover:text-brass transition-colors">
              {t("termsOfService")}
            </Link>
            <span className="text-white/20">•</span>
            <Link href="/credits" className="hover:text-brass transition-colors">
              {t("credits")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
