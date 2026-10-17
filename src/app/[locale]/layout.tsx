import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages, setRequestLocale } from "next-intl/server";
import { routing, type Locale } from "@/i18n/routing";
import {
  fontDisplay,
  fontBody,
  fontArabicDisplay,
  fontArabicSans,
} from "@/app/fonts";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import { SmoothScroll } from "@/components/layout/SmoothScroll";
import { TopBar } from "@/components/layout/TopBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { FloatingWhatsApp } from "@/components/layout/FloatingWhatsApp";
import { BackToTop } from "@/components/layout/BackToTop";
import { ScrollProgress } from "@/components/layout/ScrollProgress";
import { MobileActionBar } from "@/components/layout/MobileActionBar";
import { CookieConsent } from "@/components/layout/CookieConsent";
import { Toaster } from "sonner";
import { siteConfig } from "@/lib/siteConfig";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: `${siteConfig.name} | Premium Aluminum & Glass Fabrication Dubai`,
    template: `%s | ${siteConfig.name}`,
  },
  description: siteConfig.description,
  keywords: [
    "pergola Dubai",
    "aluminum pergola Dubai",
    "bio-climatic pergola Dubai",
    "louvered pergola UAE",
    "glass facade contractor Dubai",
    "minimal sliding doors Dubai",
    "glass partitions Dubai",
    "glass room extension Dubai",
    "aluminum fabrication UAE",
    "spiral glass staircase Dubai",
  ],
  authors: [{ name: siteConfig.name, url: siteConfig.domain }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  other: {
    "geo.region": siteConfig.geo.region,
    "geo.placename": siteConfig.geo.placename,
    "geo.position": `${siteConfig.geo.latitude};${siteConfig.geo.longitude}`,
    ICBM: `${siteConfig.geo.latitude}, ${siteConfig.geo.longitude}`,
  },
};

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as Locale)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();
  const isRtl = locale === "ar";

  return (
    <html
      lang={locale}
      dir={isRtl ? "rtl" : "ltr"}
      suppressHydrationWarning
      data-scroll-behavior="smooth"
      className={`${fontDisplay.variable} ${fontBody.variable} ${fontArabicDisplay.variable} ${fontArabicSans.variable} ${
        isRtl ? fontArabicSans.className : fontBody.className
      }`}
    >
      <body className="min-h-screen bg-background text-foreground antialiased selection:bg-brass selection:text-white flex flex-col">
        {/* Accessible Skip Link */}
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-brass text-ink font-semibold rounded-lg shadow-xl"
        >
          Skip to content
        </a>

        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem={false}
          forcedTheme="light"
          disableTransitionOnChange
        >
          <NextIntlClientProvider messages={messages} locale={locale}>
            <SmoothScroll>
              <ScrollProgress />
              <TopBar />
              <div className="sticky top-0 z-40 w-full">
                <Header />
              </div>
              <main id="main-content" className="flex-1 pb-16 md:pb-0">
                {children}
              </main>
              <Footer />
              <FloatingWhatsApp />
              <BackToTop />
              <MobileActionBar />
              <CookieConsent />
              <Toaster position={isRtl ? "bottom-left" : "bottom-right"} richColors />
            </SmoothScroll>
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
