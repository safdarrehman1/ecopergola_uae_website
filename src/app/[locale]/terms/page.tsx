import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb } from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: "Terms of Service | Eco Pergola Dubai",
  description: "Eco Pergola terms and conditions for fabrication and installation.",
};

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <Breadcrumb items={[{ label: "Terms of Service" }]} />

        <div className="space-y-4 border-b border-border pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brass">
            Terms & Conditions
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display">Terms of Service</h1>
          <p className="text-xs text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            Welcome to {siteConfig.domain}. By accessing our website, booking design consultations, or commissioning aluminum and glass fabrication services from {siteConfig.legalName}, you agree to the following terms and conditions.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">1. Scope of Work & Quotations</h2>
          <p>
            All preliminary estimates and 3D renderings provided via our website or during consultations are subject to final on-site laser measurement and structural engineering verification. Written contract quotations remain valid for 30 calendar days.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">2. Warranty & Workmanship</h2>
          <p>
            Eco Pergola guarantees structural aluminum profiles and powder coatings with a 10-year warranty, motorized actuators with up to a 5-year manufacturer warranty, and installation workmanship for 2 years in accordance with Dubai Municipality standards.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">3. Governing Law</h2>
          <p>
            These terms are governed by the laws of the Emirate of Dubai and the federal laws of the United Arab Emirates.
          </p>
        </div>
      </div>
    </div>
  );
}
