"use client";

import { useState } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { Menu, ArrowRight, X, ChevronDown, Layers, Building2, SlidersHorizontal } from "lucide-react";
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

  const quoteCta = isAr ? "طلب عرض سعر" : isFr ? "Demander un Devis" : "Request a Quote";

  return (
    <header className="w-full bg-background/95 backdrop-blur-md border-b border-border/70 transition-all duration-200">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[1240px] flex items-center justify-between h-16 sm:h-20">
        {/* Prominent Architectural Brand Logo */}
        <Link
          href="/"
          aria-label="Eco Pergola"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-xl group transition-transform hover:scale-[1.02]"
        >
          <div className="relative h-14 w-14 sm:h-16 sm:w-16 rounded-xl overflow-hidden bg-white border border-stone-200/90 flex items-center justify-center p-1 shadow-xs group-hover:border-brass/80 transition-all duration-300">
            <Image
              src="/images/logo.jpeg"
              alt="Eco Pergola"
              width={68}
              height={68}
              className="h-full w-full object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center space-x-1 rtl:space-x-reverse" aria-label="Main Navigation">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/" && "text-brass font-semibold"
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
                    pathname.startsWith("/pergola-types") && "text-brass font-semibold"
                  )}
                >
                  {isAr ? "أنواع البرجولات" : isFr ? "Types de Pergolas" : "Pergola Types"}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-[500px] p-5 grid grid-cols-2 gap-4 bg-popover rounded-xl border border-border shadow-lg">
                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-brass px-2">
                        {isAr ? "حسب نوع السقف" : isFr ? "Par Mécanisme" : "By Mechanism"}
                      </div>
                      <Link
                        href="/pergola-types/louvered-pergola"
                        className="block p-2 rounded-lg hover:bg-muted text-xs transition-colors"
                      >
                        <div className="font-semibold text-foreground">
                          {isAr ? "برجولا شرائح ذكية" : isFr ? "Bioclimatique à Lames" : "Bio-Climatic Louvered"}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5">
                          {isAr ? "دوران 0°-140° بمحركات ذكية" : isFr ? "Lames motorisées orientables" : "Motorized 0°-140° rotation"}
                        </div>
                      </Link>
                      <Link
                        href="/pergola-types/retractable-pergola"
                        className="block p-2 rounded-lg hover:bg-muted text-xs transition-colors"
                      >
                        <div className="font-semibold text-foreground">
                          {isAr ? "سقف قماشي متحرك" : isFr ? "Toile Rétractable" : "Retractable Canopy"}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5">
                          {isAr ? "طي وفتح بلمسة زر" : isFr ? "Ouverture complète motorisée" : "Motorized sliding canopy"}
                        </div>
                      </Link>
                      <Link
                        href="/pergola-types/fixed-roof-pergola"
                        className="block p-2 rounded-lg hover:bg-muted text-xs transition-colors"
                      >
                        <div className="font-semibold text-foreground">
                          {isAr ? "سقف ثابت معزول" : isFr ? "Toiture Fixe Isolée" : "Fixed Insulated Roof"}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5">
                          {isAr ? "عزل حراري وحماية كاملة" : isFr ? "Protection solaire totale" : "Continuous solid shade"}
                        </div>
                      </Link>
                    </div>

                    <div className="space-y-2">
                      <div className="text-xs font-bold uppercase tracking-wider text-brass px-2">
                        {isAr ? "حسب المادة" : isFr ? "Par Matériau" : "By Material"}
                      </div>
                      <Link
                        href="/pergola-types/aluminum-pergola"
                        className="block p-2 rounded-lg hover:bg-muted text-xs transition-colors"
                      >
                        <div className="font-semibold text-foreground">
                          {isAr ? "ألمنيوم 6063-T6" : isFr ? "Aluminium 6063-T6" : "Structural Aluminum"}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5">
                          {isAr ? "مقاوم للصدأ وبدون صيانة" : isFr ? "Sans entretien, anticorrosion" : "Rust-proof, marine grade"}
                        </div>
                      </Link>
                      <Link
                        href="/pergola-types/wooden-pergola"
                        className="block p-2 rounded-lg hover:bg-muted text-xs transition-colors"
                      >
                        <div className="font-semibold text-foreground">
                          {isAr ? "خشب طبيعي فاخر" : isFr ? "Bois Noble (Teck)" : "Luxury Hardwood"}
                        </div>
                        <div className="text-muted-foreground text-[11px] mt-0.5">
                          {isAr ? "أخشاب تيك وإيروكو معالجة" : isFr ? "Teck et Iroko traités" : "Teak & Iroko timber"}
                        </div>
                      </Link>

                      <div className="pt-2 border-t border-border/60">
                        <Link
                          href="/pergola-types"
                          className="inline-flex items-center text-xs font-semibold text-brass hover:text-brass-dark px-2"
                        >
                          <span>{isAr ? "دليل البرجولات (19 نوع)" : isFr ? "Voir les 19 modèles" : "View All 19 Types"}</span>
                          <ArrowRight className="h-3.5 w-3.5 ml-1 rtl:mr-1 rtl:ml-0 rtl:rotate-180" />
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
                      pathname.startsWith("/services") && "text-brass font-semibold"
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
                      pathname.startsWith("/products") && "text-brass font-semibold"
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
                      pathname.startsWith("/projects") && "text-brass font-semibold"
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
                      pathname === "/about" && "text-brass font-semibold"
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
                      pathname === "/contact" && "text-brass font-semibold"
                    )}
                  >
                    {isAr ? "اتصل بنا" : isFr ? "Contact" : "Contact"}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </nav>

        {/* Right CTA Actions: Language Switcher & One Prominent "Request a Quote" Button */}
        <div className="flex items-center gap-3">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>

          <Button
            asChild
            className="h-10 px-5 rounded-xl bg-brass hover:bg-brass-light text-ink font-bold text-xs sm:text-sm shadow-md shadow-brass/25 transition-all hover:scale-[1.02] active:scale-[0.98]"
          >
            <Link href="/contact">
              <span>{quoteCta}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180 hidden sm:inline" />
            </Link>
          </Button>

          {/* Accessible Mobile Menu Sheet Trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                aria-label="Open Mobile Navigation Menu"
                className="h-10 w-10 lg:hidden rounded-lg border-border"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side={isAr ? "right" : "left"} className="w-[300px] p-6 flex flex-col justify-between">
              <div className="space-y-6">
                <div className="flex items-center justify-between pb-4 border-b border-border">
                  <div className="flex items-center">
                    <div className="h-14 w-14 rounded-xl overflow-hidden border border-stone-200/90 p-1 bg-white shadow-xs">
                      <Image src="/images/logo.jpeg" alt="Eco Pergola" width={56} height={56} className="object-contain w-full h-full" />
                    </div>
                  </div>
                </div>

                {/* Mobile Links */}
                <div className="flex flex-col space-y-1 text-sm font-medium">
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
                        "px-3 py-2.5 rounded-lg transition-colors hover:bg-muted text-foreground",
                        pathname === item.href && "bg-muted text-brass font-semibold"
                      )}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Mobile Sheet Footer */}
              <div className="pt-6 border-t border-border space-y-3">
                <LanguageSwitcher />
                <Button asChild className="w-full h-10 rounded-lg bg-brass hover:bg-brass-dark text-white font-semibold text-xs">
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
