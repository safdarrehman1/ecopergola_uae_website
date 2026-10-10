import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { siteConfig } from "@/lib/siteConfig";
import { Breadcrumb } from "@/components/seo/Breadcrumb";

export const metadata: Metadata = {
  title: "Credits & Image Attribution | Eco Pergola Dubai",
  description: "Attribution and licensing credits for photography used on Eco Pergola.",
};

export default async function CreditsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <div className="py-20 bg-background text-foreground">
      <div className="container mx-auto px-4 max-w-4xl space-y-8">
        <Breadcrumb items={[{ label: "Credits & Attribution" }]} />

        <div className="space-y-4 border-b border-border pb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-brass">
            Photography & Media
          </span>
          <h1 className="text-3xl sm:text-4xl font-bold font-display">Credits & Imagery</h1>
          <p className="text-xs text-muted-foreground">Image licensing and architectural photography sources</p>
        </div>

        <div className="space-y-6 text-sm text-muted-foreground leading-relaxed">
          <p>
            The imagery on {siteConfig.domain} consists of Eco Pergola project photography and royalty-free architectural photography from Unsplash licensed under the Unsplash License.
          </p>

          <p>
            For image licensing or high-resolution press kit requests, contact us at <a href={`mailto:${siteConfig.email}`} className="text-brass hover:underline">{siteConfig.email}</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
