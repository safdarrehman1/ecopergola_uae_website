"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Menu, ArrowRight, Phone, MessageSquare, Building2, Layers } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { LanguageSwitcher } from "@/components/layout/LanguageSwitcher";
import { siteConfig } from "@/lib/siteConfig";
import { getLocalizedServices, getLocalizedPergolaTypes } from "@/data/localizedData";
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
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const locale = useLocale();
  const tNav = useTranslations("nav");
  const tCommon = useTranslations("common");

  const localizedServices = getLocalizedServices(locale);
  const localizedPergolas = getLocalizedPergolaTypes(locale);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300",
        scrolled
          ? "glass-nav py-3 shadow-lg shadow-black/5"
          : "bg-background/95 backdrop-blur-md md:bg-transparent py-4 md:py-5"
      )}
    >
      <div className="container mx-auto px-4 max-w-7xl flex items-center justify-between">
        {/* Brand Logo - Pure Logo Without Text */}
        <Link
          href="/"
          aria-label="Eco Pergola"
          className="flex items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-brass rounded-2xl group transition-transform hover:scale-105"
        >
          <div className="relative h-20  w-20 sm:h-14 sm:w-14 rounded-2xl overflow-hidden bg-white/5 border border-border/40 flex items-center justify-center p-1 shadow-sm group-hover:border-brass transition-colors">
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
        <div className="hidden xl:flex items-center space-x-1 rtl:space-x-reverse">
          <NavigationMenu>
            <NavigationMenuList>
              {/* Home */}
              <NavigationMenuItem>
                <Link href="/#" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/" && "text-brass font-semibold"
                    )}
                  >
                    {tNav("home")}
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
                    {tNav("about")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Services Mega Menu */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(pathname.startsWith("/services") && "text-brass font-semibold")}>
                  {tNav("services")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[680px] gap-3 p-6 md:grid-cols-2 lg:w-[750px] bg-popover rounded-2xl shadow-2xl border border-border">
                    <div className="col-span-2 pb-2 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Building2 className="h-4 w-4 text-brass" />
                        <span className="text-sm font-bold font-display text-foreground">{tNav("specializedServices")}</span>
                      </div>
                      <Link
                        href="/services"
                        className="text-xs text-brass hover:underline flex items-center gap-1 font-semibold"
                      >
                        {tNav("allServices")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                      </Link>
                    </div>

                    {localizedServices.slice(0, 8).map((service) => (
                      <Link
                        key={service.id}
                        href={`/services/${service.slug}`}
                        className="group/item flex flex-col gap-0.5 rounded-md p-2.5 hover:bg-muted transition-colors"
                      >
                        <div className="text-xs font-bold text-foreground group-hover/item:text-brass flex items-center justify-between">
                          <span>{service.title}</span>
                          <ArrowRight className="h-3.5 w-3.5 opacity-0 -translate-x-2 group-hover/item:opacity-100 group-hover/item:translate-x-0 transition-all text-brass rtl:rotate-180" />
                        </div>
                        <p className="text-[11px] text-muted-foreground line-clamp-1 leading-relaxed">
                          {service.shortDescription}
                        </p>
                      </Link>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Pergola Types Mega Menu: All 19 styles */}
              <NavigationMenuItem>
                <NavigationMenuTrigger className={cn(pathname.startsWith("/pergola-types") && "text-brass font-semibold")}>
                  {tNav("pergolaTypes")}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid w-[780px] gap-5 p-6 md:grid-cols-3 lg:w-[920px] bg-popover rounded-2xl shadow-2xl border border-border">
                    <div className="col-span-3 pb-2 border-b border-border flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Layers className="h-4 w-4 text-brass" />
                        <span className="text-sm font-bold font-display text-foreground">{tNav("all19Styles")}</span>
                      </div>
                      <Link
                        href="/pergola-types"
                        className="text-xs text-brass hover:underline flex items-center gap-1 font-semibold"
                      >
                        {tNav("viewCatalog")} <ArrowRight className="h-3 w-3 rtl:rotate-180" />
                      </Link>
                    </div>

                    {/* Column 1: Modern & Metal */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-foreground dark:text-sand-light uppercase tracking-wider pb-1 border-b border-border/50">
                        {tNav("modernAndMetal")}
                      </span>
                      {localizedPergolas
                        .filter((p) =>
                          [
                            "aluminum-pergola",
                            "modern-pergola",
                            "metal-pergola",
                            "steel-pergola",
                            "minimalist-pergola",
                            "luxury-pergola",
                          ].includes(p.id)
                        )
                        .map((p) => (
                          <Link
                            key={p.id}
                            href={`/pergola-types/${p.slug}`}
                            className="text-xs hover:text-brass transition-colors py-1 flex items-center justify-between group/link text-muted-foreground hover:text-foreground"
                          >
                            <span className="truncate pr-1">{p.name}</span>
                            {p.badge && (
                              <span className="text-[9px] bg-brass/15 text-brass px-1.5 py-0.2 rounded font-semibold shrink-0">
                                {p.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                    </div>

                    {/* Column 2: Timber & Glass */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-foreground dark:text-sand-light uppercase tracking-wider pb-1 border-b border-border/50">
                        {tNav("timberAndGlass")}
                      </span>
                      {localizedPergolas
                        .filter((p) =>
                          [
                            "wooden-pergola",
                            "traditional-pergola",
                            "rustic-pergola",
                            "white-pergola",
                            "glass-roof-pergola",
                            "pitched-roof-pergola",
                          ].includes(p.id)
                        )
                        .map((p) => (
                          <Link
                            key={p.id}
                            href={`/pergola-types/${p.slug}`}
                            className="text-xs hover:text-brass transition-colors py-1 flex items-center justify-between group/link text-muted-foreground hover:text-foreground"
                          >
                            <span className="truncate pr-1">{p.name}</span>
                            {p.badge && (
                              <span className="text-[9px] bg-brass/15 text-brass px-1.5 py-0.2 rounded font-semibold shrink-0">
                                {p.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                    </div>

                    {/* Column 3: Bioclimatic & Special */}
                    <div className="flex flex-col gap-1.5">
                      <span className="text-xs font-bold text-foreground dark:text-sand-light uppercase tracking-wider pb-1 border-b border-border/50">
                        {tNav("bioclimaticAndSpecial")}
                      </span>
                      {localizedPergolas
                        .filter((p) =>
                          [
                            "louvered-pergola",
                            "retractable-pergola",
                            "bio-climatic-pergola",
                            "motorized-pergola",
                            "gazebo",
                            "cabana-pergola",
                            "pavilion",
                          ].includes(p.id)
                        )
                        .map((p) => (
                          <Link
                            key={p.id}
                            href={`/pergola-types/${p.slug}`}
                            className="text-xs hover:text-brass transition-colors py-1 flex items-center justify-between group/link text-muted-foreground hover:text-foreground"
                          >
                            <span className="truncate pr-1">{p.name}</span>
                            {p.badge && (
                              <span className="text-[9px] bg-brass/15 text-brass px-1.5 py-0.2 rounded font-semibold shrink-0">
                                {p.badge}
                              </span>
                            )}
                          </Link>
                        ))}
                    </div>
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {/* Products */}
              <NavigationMenuItem>
                <Link href="/products" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/products" && "text-brass font-semibold"
                    )}
                  >
                    {tNav("products")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Projects */}
              <NavigationMenuItem>
                <Link href="/projects" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/projects" && "text-brass font-semibold"
                    )}
                  >
                    {tNav("portfolio")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* Blog */}
              <NavigationMenuItem>
                <Link href="/blog" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/blog" && "text-brass font-semibold"
                    )}
                  >
                    {tNav("blog")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>

              {/* FAQ */}
              <NavigationMenuItem>
                <Link href="/faq" legacyBehavior passHref>
                  <NavigationMenuLink
                    className={cn(
                      navigationMenuTriggerStyle(),
                      pathname === "/faq" && "text-brass font-semibold"
                    )}
                  >
                    {tNav("faq")}
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
                    {tNav("contact")}
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>

        {/* Right CTA Area: Phone, Language Switcher, Quote Button */}
        <div className="flex items-center gap-3">
          <LanguageSwitcher className="hidden sm:block" />

          <Button
            asChild
            variant="brass"
            size="sm"
            className="hidden md:inline-flex rounded-xl font-semibold shadow-md hover:shadow-brass/20"
          >
            <Link href="/contact">
              <Phone className="h-4 w-4 mr-1.5 rtl:ml-1.5 rtl:mr-0" />
              <span>{tCommon("bookAppointment")}</span>
            </Link>
          </Button>

          {/* Mobile Menu Trigger */}
          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            <SheetTrigger asChild className="xl:hidden">
              <Button
                variant="outline"
                size="icon"
                className="h-10 w-10 rounded-xl border-border bg-background/50 backdrop-blur-md"
                aria-label="Open Navigation Menu"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[85vw] max-w-[400px] p-0 bg-background border-border flex flex-col">
              <div className="p-6 border-b border-border flex items-center justify-between">
                <Link
                  href="/"
                  aria-label="Eco Pergola"
                  className="flex items-center"
                  onClick={() => setMobileOpen(false)}
                >
                  <div className="relative h-11 w-11 rounded-xl overflow-hidden bg-white/5 border border-border/40 flex items-center justify-center p-1">
                    <Image
                      src="/images/logo.jpeg"
                      alt="Eco Pergola"
                      width={44}
                      height={44}
                      className="h-full w-full object-contain"
                    />
                  </div>
                </Link>
                <div className="flex items-center gap-2">
                  <LanguageSwitcher />
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-6 space-y-6">
                <nav className="flex flex-col space-y-1">
                  {[
                    { href: "/", label: tNav("home") },
                    { href: "/about", label: tNav("about") },
                    { href: "/services", label: tNav("services") },
                    { href: "/pergola-types", label: tNav("pergolaTypes") },
                    { href: "/products", label: tNav("products") },
                    { href: "/projects", label: tNav("portfolio") },
                    { href: "/blog", label: tNav("blog") },
                    { href: "/faq", label: tNav("faq") },
                    { href: "/contact", label: tNav("contact") },
                  ].map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className={cn(
                        "px-4 py-3 rounded-xl text-sm font-semibold transition-colors flex items-center justify-between",
                        pathname === item.href
                          ? "bg-forest/10 text-forest dark:bg-brass/10 dark:text-brass"
                          : "hover:bg-muted text-foreground"
                      )}
                    >
                      <span>{item.label}</span>
                      <ArrowRight className="h-4 w-4 opacity-50 rtl:rotate-180" />
                    </Link>
                  ))}
                </nav>

                <div className="p-4 rounded-2xl bg-card border border-border space-y-3">
                  <div className="text-xs font-bold uppercase tracking-wider text-brass">
                    {tCommon("contactInfo")}
                  </div>
                  <div className="space-y-2 text-xs text-muted-foreground">
                    <p className="flex items-center gap-2">
                      <Phone className="h-3.5 w-3.5 text-brass" />
                      <span dir="ltr">{siteConfig.phoneDisplay}</span>
                    </p>
                    <p className="flex items-center gap-2">
                      <MessageSquare className="h-3.5 w-3.5 text-brass" />
                      <span>{siteConfig.workingHours.display}</span>
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-6 border-t border-border bg-card space-y-3">
                <Button asChild variant="brass" className="w-full rounded-xl font-semibold">
                  <Link href="/contact" onClick={() => setMobileOpen(false)}>
                    <span>{tCommon("bookAppointment")}</span>
                  </Link>
                </Button>
                <Button asChild variant="outline" className="w-full rounded-xl font-semibold">
                  <a
                    href={siteConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <span>{tCommon("whatsappUs")}</span>
                  </a>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
