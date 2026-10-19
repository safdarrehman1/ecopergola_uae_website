"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Menu, ArrowRight, X, ChevronDown, Layers, Building2, SlidersHorizontal, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger, SheetClose } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { siteConfig } from "@/lib/siteConfig";
import { cn } from "@/lib/utils";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const quoteCta = isAr ? "طلب عرض سعر" : isFr ? "Demander un Devis" : "Request Quote";

  return (
    <header className="w-full bg-[#FAF8F5]/90 backdrop-blur-md border-b border-stone-200/80 transition-all duration-300">
      <div className="container mx-auto px-4 sm:px-8 lg:px-16 max-w-[1400px] flex items-center justify-between h-20 sm:h-24">
        {/* Architectural Brand Logo with Minimal Sharp Frame */}
        <Link
          href="/"
          aria-label="Eco Pergola"
          className="flex items-center gap-2.5 sm:gap-3.5 focus:outline-none focus-visible:ring-1 focus-visible:ring-stone-400 group transition-opacity hover:opacity-85 shrink-0"
        >
          <div className="relative h-11 w-11 sm:h-14 sm:w-14 rounded-[2px] overflow-hidden bg-white border border-stone-200 p-1 flex items-center justify-center shadow-none group-hover:border-stone-400 transition-colors">
            <Image
              src="/images/logo.jpeg"
              alt="Eco Pergola"
              width={60}
              height={60}
              className="h-full w-full object-contain"
              priority
            />
          </div>
          <div className="hidden sm:block">
            <span className="font-display text-lg tracking-wider font-normal text-stone-900 block leading-tight">
              ECO PERGOLA
            </span>
            <span className="text-[9px] uppercase tracking-[0.25em] text-stone-400 font-mono block">
              Architectural Dubai
            </span>
          </div>
        </Link>

        {/* Desktop Minimal Navigation */}
        <nav className="hidden lg:flex items-center space-x-8 rtl:space-x-reverse" aria-label="Main Navigation">
          <Link
            href="/"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname === "/" ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "الرئيسية" : isFr ? "Accueil" : "Overview"}
          </Link>

          <Link
            href="/pergola-types"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname.startsWith("/pergola-types") ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "البرجولات" : isFr ? "Pergolas" : "Pergolas"}
          </Link>

          <Link
            href="/services"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname.startsWith("/services") ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "الخدمات" : isFr ? "Services" : "Engineering"}
          </Link>

          <Link
            href="/products"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname.startsWith("/products") ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "المنتجات" : isFr ? "Produits" : "Systems"}
          </Link>

          <Link
            href="/projects"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname.startsWith("/projects") ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "المشاريع" : isFr ? "Réalisations" : "Portfolio"}
          </Link>

          <Link
            href="/about"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname === "/about" ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "عن الشركة" : isFr ? "À Propos" : "About"}
          </Link>

          <Link
            href="/contact"
            className={cn(
              "text-[11px] uppercase tracking-widest transition-colors font-medium",
              pathname === "/contact" ? "text-[#34AA49] font-semibold" : "text-stone-600 hover:text-stone-900"
            )}
          >
            {isAr ? "تواصل" : isFr ? "Contact" : "Contact"}
          </Link>
        </nav>

        {/* Right CTA Actions: Language, Primary Quote Button & Luxury Overlay Menu */}
        <div className="flex items-center gap-2 sm:gap-4 shrink-0">
          <div className="shrink-0">
            <LanguageSwitcher />
          </div>

          <Button
            asChild
            className="h-9 sm:h-10 px-2.5 sm:px-5 rounded-[2px] bg-[#34AA49] hover:bg-[#268537] text-white font-semibold text-xs tracking-wider uppercase transition-all duration-300 shrink-0"
          >
            <Link href="/contact" aria-label={quoteCta}>
              <span className="hidden sm:inline">{quoteCta}</span>
              <ArrowRight className="h-3.5 w-3.5 sm:ml-1.5 rtl:sm:mr-1.5 rtl:rotate-180" />
            </Link>
          </Button>

          {/* Minimalist Overlay Menu Trigger: visible below lg, hidden on lg+ */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Navigation Drawer"
                className="lg:hidden h-9 w-9 sm:h-10 sm:w-10 rounded-[2px] border-stone-300 hover:border-stone-500 bg-white/60 shrink-0"
              >
                <Menu className="h-4 w-4 text-stone-800" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? "right" : "left"} className="w-[340px] sm:w-[400px] p-8 sm:p-10 bg-[#FAF8F5] border-stone-200 flex flex-col justify-between">
              <div className="space-y-8">
                <div className="flex items-center justify-between pb-6 border-b border-stone-200/80">
                  <div className="flex items-center gap-3">
                    <div className="h-12 w-12 rounded-[2px] overflow-hidden border border-stone-200 p-1 bg-white">
                      <Image src="/images/logo.jpeg" alt="Eco Pergola" width={48} height={48} className="object-contain w-full h-full" />
                    </div>
                    <div>
                      <span className="font-display text-base tracking-wider font-normal text-stone-900 block leading-tight">
                        ECO PERGOLA
                      </span>
                      <span className="text-[9px] uppercase tracking-[0.2em] text-stone-400 font-mono block">
                        Architecture Studio
                      </span>
                    </div>
                  </div>
                </div>

                {/* Editorial Navigation Links */}
                <div className="flex flex-col space-y-4">
                  {[
                    { href: "/", label: isAr ? "الرئيسية" : isFr ? "Accueil" : "Overview", num: "01" },
                    { href: "/pergola-types", label: isAr ? "أنواع البرجولات (19 نوع)" : isFr ? "Types de Pergolas" : "Pergola Collection", num: "02" },
                    { href: "/services", label: isAr ? "الخدمات الهندسية" : isFr ? "Services d'Ingénierie" : "Engineering Services", num: "03" },
                    { href: "/products", label: isAr ? "الأنظمة المعمارية" : isFr ? "Systèmes Vitrés" : "Architectural Systems", num: "04" },
                    { href: "/projects", label: isAr ? "معرض المشاريع" : isFr ? "Réalisations d'Exception" : "Selected Projects", num: "05" },
                    { href: "/about", label: isAr ? "عن الشركة" : isFr ? "À Propos du Studio" : "Studio & Craft", num: "06" },
                    { href: "/contact", label: isAr ? "استشارة ومعاينة ميدانية" : isFr ? "Consultation & Visite" : "Inquiries & Survey", num: "07" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "flex items-baseline justify-between py-1 transition-colors text-stone-700 hover:text-stone-950 group",
                        pathname === item.href && "text-[#34AA49] font-medium"
                      )}
                    >
                      <span className="font-display text-lg sm:text-xl font-normal group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                        {item.label}
                      </span>
                      <span className="text-[10px] font-mono text-stone-400">
                        {item.num}
                      </span>
                    </Link>
                  ))}
                </div>
              </div>

              {/* Drawer Footer */}
              <div className="pt-8 border-t border-stone-200/80 space-y-4">
                <LanguageSwitcher />
                <Button asChild className="w-full h-11 rounded-[2px] bg-[#34AA49] hover:bg-[#268537] text-white font-semibold text-xs tracking-wider uppercase">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    {quoteCta}
                  </Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
