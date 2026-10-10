import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb } from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: "Privacy Policy | Eco Pergola Dubai",
  description: "Eco Pergola privacy policy and data protection commitments.",
};

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <Breadcrumb items={[{ label: "Privacy Policy" }]} />

        <div className="space-y-4 border-b border-border pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brass">
            Legal & Compliance
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display">Privacy Policy</h1>
          <p className="text-xs text-muted-foreground">Last updated: January 2025</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            At {siteConfig.legalName} (&ldquo;Eco Pergola&rdquo;, &ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;), we respect your privacy and are committed to protecting the personal information you share with us through our website ({siteConfig.domain}) and during business consultations.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">1. Information We Collect</h2>
          <p>
            We collect personal information that you voluntarily provide when requesting a quotation, booking a consultation, or subscribing to our newsletter. This includes your name, email address, UAE/international telephone number, project specifications, and address details.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">2. How We Use Your Data</h2>
          <p>
            We use your data solely to provide tailored architectural design consultations, prepare cost estimates, schedule site measurements, manage installation logistics, and provide after-sales warranty support.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">3. Data Security & Storage</h2>
          <p>
            All submitted information is protected using industry-standard SSL encryption. We never sell, rent, or trade your personal details with third-party marketers.
          </p>

          <h2 className="text-xl font-bold font-display text-foreground pt-4">4. Contact Our Privacy Officer</h2>
          <p>
            If you have questions regarding our privacy practices or wish to request data deletion, please contact us at <a href={`mailto:${siteConfig.email}`} className="text-brass hover:underline">{siteConfig.email}</a> or call <a href={`tel:${siteConfig.phone}`} className="text-brass hover:underline">{siteConfig.phoneDisplay}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
