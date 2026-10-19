"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Menu, ArrowRight, Sliders, SunDim, Shield, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
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

  const quoteCta = isAr ? "طلب عرض سعر" : isFr ? "Demander un Devis" : "Request a Quote";

  return (
    <header className="w-full bg-[#0A0F1D]/95 backdrop-blur-xl border-b border-white/10 text-white transition-all duration-200 sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl flex items-center justify-between h-16 sm:h-20">
        {/* Prominent Architectural Brand Logo */}
        <Link
          href="/"
          aria-label="Eco Pergola"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-[#34AA49] rounded-2xl group transition-transform hover:scale-[1.03]"
        >
          <div className="relative h-12 w-12 sm:h-14 sm:w-14 rounded-2xl overflow-hidden bg-white border border-white/20 flex items-center justify-center p-1 shadow-lg group-hover:border-[#34AA49] transition-all duration-300">
            <Image
              src="/images/logo.jpeg"
              alt="Eco Pergola"
              width={56}
              height={56}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse" aria-label="Main Navigation">
          <NavigationMenu>
            <NavigationMenuList className="text-white">
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/#" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                      pathname === "/" && "text-[#48C35F] bg-white/10"
                    )}
                  >
                    {isAr ? "الرئيسية" : isFr ? "Accueil" : "Home"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Pergola Types Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={cn(
                    navigationMenuTriggerStyle(),
                    "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                    pathname.startsWith("/pergola-types") && "text-[#48C35F] bg-white/10"
                  )}
                >
                  {isAr ? "أنواع البرجولات" : isFr ? "Types de Pergolas" : "Pergola Types"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[740px] p-6 grid grid-cols-12 gap-6 bg-slate-900/98 backdrop-blur-2xl rounded-3xl border border-white/15 text-white shadow-[0_25px_70px_rgba(0,0,0,0.8)]">
                    {/* Mechanism Systems (5 cols) */}
                    <div className="col-span-5 space-y-2">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#34AA49] px-2 flex items-center gap-1.5 mb-2">
                        <Sliders className="h-3.5 w-3.5 text-[#34AA49]" />
                        <span>{isAr ? "الأنظمة الذكية والمتحركة" : isFr ? "Mécanismes Motorisés" : "Smart Mechanisms"}</span>
                      </div>
                      <Link
                        href="/pergola-types/louvered-pergola"
                        className="group/item flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-[#34AA49] group-hover/item:text-[#34AA49] transition-colors">
                          <Sliders className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-[#34AA49] transition-colors flex items-center gap-1.5">
                            <span>{isAr ? "برجولا بيوكليماتيك ذكية" : isFr ? "Bioclimatique à Lames" : "Bio-Climatic Louvered"}</span>
                            <span className="text-[9px] font-mono px-1.5 py-0.5 bg-[#34AA49]/20 text-[#34AA49] rounded-full border border-[#34AA49]/40">Popular</span>
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                            {isAr ? "دوران 0°-140° بمحركات أوروبية ذكية" : isFr ? "Lames motorisées orientables" : "Motorized 0°-140° louver rotation"}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/pergola-types/retractable-pergola"
                        className="group/item flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-[#34AA49] group-hover/item:text-[#34AA49] transition-colors">
                          <SunDim className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-[#34AA49] transition-colors">
                            {isAr ? "سقف قماشي متحرك" : isFr ? "Toile Rétractable" : "Retractable Canopy"}
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                            {isAr ? "طي وفتح كهربائي بلمسة زر" : isFr ? "Ouverture complète motorisée" : "Motorized sliding waterproof fabric"}
                          </div>
                        </div>
                      </Link>

                      <Link
                        href="/pergola-types/fixed-roof-pergola"
                        className="group/item flex items-start gap-3 p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="h-9 w-9 rounded-xl bg-slate-800 flex items-center justify-center shrink-0 border border-white/10 group-hover/item:border-[#34AA49] group-hover/item:text-[#34AA49] transition-colors">
                          <Shield className="h-4 w-4" />
                        </div>
                        <div>
                          <div className="text-xs font-bold text-white group-hover/item:text-[#34AA49] transition-colors">
                            {isAr ? "سقف ثابت عازل حرارياً" : isFr ? "Toiture Fixe Isolée" : "Fixed Insulated Roof"}
                          </div>
                          <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                            {isAr ? "حماية كاملة من الشمس والأمطار" : isFr ? "Isolation thermique totale" : "Continuous insulated shade panels"}
                          </div>
                        </div>
                      </Link>
                    </div>

                    {/* Materials & Typologies (4 cols) */}
                    <div className="col-span-4 space-y-2">
                      <div className="text-[11px] font-mono font-bold uppercase tracking-widest text-[#34AA49] px-2 flex items-center gap-1.5 mb-2">
                        <Layers className="h-3.5 w-3.5 text-[#34AA49]" />
                        <span>{isAr ? "المواد والقطاعات" : isFr ? "Matériaux Nobles" : "Materials & Builds"}</span>
                      </div>
                      <Link
                        href="/pergola-types/aluminum-pergola"
                        className="group/item block p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="text-xs font-bold text-white group-hover/item:text-[#34AA49] transition-colors">
                          {isAr ? "ألمنيوم 6063-T6 بحري" : isFr ? "Aluminium Marine 6063-T6" : "6063-T6 Marine Alloy"}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                          {isAr ? "مقاوم للصدأ والرطوبة والملوحة" : isFr ? "Zéro corrosion, garanti 10 ans" : "Seaside Qualicoat Class 2 finish"}
                        </div>
                      </Link>

                      <Link
                        href="/pergola-types/wooden-pergola"
                        className="group/item block p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="text-xs font-bold text-white group-hover/item:text-[#34AA49] transition-colors">
                          {isAr ? "خشب طبيعي فاخر هجين" : isFr ? "Bois Noble & Teck" : "Natural Hardwood Hybrid"}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                          {isAr ? "أخشاب تيك وإيروكو معالجة للحرارة" : isFr ? "Teck et Iroko haute résistance" : "Treated teak & iroko accents"}
                        </div>
                      </Link>

                      <Link
                        href="/pergola-types/cantilever-pergola"
                        className="group/item block p-2.5 rounded-2xl hover:bg-white/5 border border-transparent hover:border-white/10 transition-all"
                      >
                        <div className="text-xs font-bold text-white group-hover/item:text-[#34AA49] transition-colors">
                          {isAr ? "برجولا معلقة بدون أعمدة" : isFr ? "Pergola Suspendue" : "Cantilevered Floating"}
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5 leading-snug">
                          {isAr ? "تصميم معلق يمنح مساحة مفتوحة" : isFr ? "Sans poteaux au sol" : "Zero ground posts for open views"}
                        </div>
                      </Link>
                    </div>

                    {/* Spotlight Showcase (3 cols) */}
                    <div className="col-span-3 flex flex-col justify-between p-4 rounded-2xl bg-slate-800/80 border border-white/10 text-white">
                      <div className="space-y-2">
                        <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-400 font-bold block">
                          Catalog Edition
                        </span>
                        <div className="text-xs font-bold text-white">
                          {isAr ? "دليل الـ 19 نموذج معتمد" : isFr ? "19 Modèles Homologués" : "19 Engineered Typologies"}
                        </div>
                        <p className="text-[11px] text-slate-400 leading-snug">
                          {isAr ? "اطلع على كافة الأبعاد والخيارات التقنية للمشاريع." : isFr ? "Consultez toutes les fiches techniques pour villas." : "Compare full structural blueprints and specs."}
                        </p>
                      </div>

                      <div className="pt-3 border-t border-white/10">
                        <Link
                          href="/pergola-types"
                          className="w-full py-2 px-3 rounded-xl bg-[#34AA49] hover:bg-[#268537] text-white text-[11px] font-bold uppercase tracking-wider flex items-center justify-between transition-colors shadow-sm"
                        >
                          <span>{isAr ? "دليل البرجولات" : isFr ? "Tout Voir" : "All 19 Types"}</span>
                          <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                        </Link>
                      </div>
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Services */}
              <NavigationMenuItem>
                <Link href="/services" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                      pathname.startsWith("/services") && "text-[#48C35F] bg-white/10"
                    )}
                  >
                    {isAr ? "الخدمات" : isFr ? "Services" : "Services"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Products */}
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                      pathname.startsWith("/products") && "text-[#48C35F] bg-white/10"
                    )}
                  >
                    {isAr ? "المنتجات" : isFr ? "Produits" : "Products"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Portfolio */}
              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                      pathname.startsWith("/projects") && "text-[#48C35F] bg-white/10"
                    )}
                  >
                    {isAr ? "المشاريع" : isFr ? "Réalisations" : "Portfolio"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* About */}
              <NavigationMenuItem>
                <Link href="/about" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                      pathname === "/about" && "text-[#48C35F] bg-white/10"
                    )}
                  >
                    {isAr ? "من نحن" : isFr ? "À Propos" : "About"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Contact */}
              <NavigationMenuItem>
                <Link href="/contact" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      "bg-transparent text-white/80 hover:text-white hover:bg-white/10 font-bold text-xs uppercase tracking-wider rounded-xl transition-colors",
                      pathname === "/contact" && "text-[#48C35F] bg-white/10"
                    )}
                  >
                    {isAr ? "اتصل بنا" : isFr ? "Contact" : "Contact"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right CTA Actions: Language Switcher & One Pill Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-stone-300">
            <LanguageSwitcher />
          </div>

          <Button
            asChild
            className="h-11 px-6 rounded-full bg-gradient-to-r from-[#268537] via-[#34AA49] to-[#48C35F] hover:brightness-110 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#34AA49]/30 transition-all hover:scale-105 active:scale-95"
          >
            <Link href="/contact">
              <span>{quoteCta}</span>
              <ArrowRight className="h-4 w-4 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180 hidden sm:inline" />
            </Link>
          </Button>

          {/* Accessible Mobile Menu Sheet Trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Mobile Navigation Menu"
                className="h-10 w-10 lg:hidden rounded-xl border-white/20 text-white bg-white/10 hover:bg-white/20"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? "right" : "left"} className="w-[300px] p-6 flex flex-col justify-between bg-[#0A0F1D] text-white border-white/10">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-white/10">
                  <div className="flex items-center">
                    <div className="h-12 w-12 rounded-xl overflow-hidden border border-white/20 p-1 bg-white shadow-md">
                      <Image src="/images/logo.jpeg" alt="Eco Pergola" width={48} height={48} className="object-contain w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col space-y-1 text-sm font-bold">
                  {[
                    { href: "/", label: isAr ? "الرئيسية" : isFr ? "Accueil" : "Home" },
                    { href: "/pergola-types", label: isAr ? "أنواع البرجولات (19 نوع)" : isFr ? "Types de Pergolas" : "Pergola Types" },
                    { href: "/services", label: isAr ? "الخدمات الهندسية" : isFr ? "Services" : "Specialized Services" },
                    { href: "/products", label: isAr ? "المنتجات المعمارية" : isFr ? "Produits" : "Products Gallery" },
                    { href: "/projects", label: isAr ? "معرض المشاريع" : isFr ? "Réalisations" : "Portfolio Projects" },
                    { href: "/about", label: isAr ? "عن الشركة" : isFr ? "À Propos" : "About Us" },
                    { href: "/contact", label: isAr ? "طلب عرض سعر وتواصل" : isFr ? "Contact & Devis" : "Contact & Consultation" },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-3.5 py-2.5 rounded-xl transition-colors hover:bg-white/10 text-stone-200",
                        pathname === item.href && "bg-white/10 text-[#48C35F]"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Sheet Footer */}
              <div className="pt-6 border-t border-white/10 space-y-3">
                <LanguageSwitcher />
                <Button asChild className="w-full h-11 rounded-full bg-gradient-to-r from-[#268537] via-[#34AA49] to-[#48C35F] text-white font-bold text-xs uppercase tracking-wider">
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
