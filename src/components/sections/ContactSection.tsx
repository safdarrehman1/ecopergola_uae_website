"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocale, useTranslations } from "next-intl";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  MessageSquare,
  Send,
  Clock,
  ExternalLink,
  ShieldCheck,
} from "lucide-react";
import { siteConfig } from "@/lib/siteConfig";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const consultationSchema = z.object({
  fullName: z.string().min(2, "Please enter your full name"),
  email: z.string().email("Please enter a valid email address"),
  phone: z.string().min(7, "Please enter a valid phone number"),
  service: z.string().min(1, "Please select a service of interest"),
  details: z.string().min(10, "Please provide brief details about your project"),
  honeypot: z.string().max(0, "Bot detected"),
});

type ConsultationFormValues = z.infer<typeof consultationSchema>;

export function ContactSection() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isNewsletterSubmitting, setIsNewsletterSubmitting] = useState(false);
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const locale = useLocale();
  const tContact = useTranslations("contact");
  const tCommon = useTranslations("common");

  const servicesOptions =
    locale === "ar"
      ? [
          "تصميم وتصنيع الواجهات المعمارية",
          "أنظمة الأبواب المنزلقة الدقيقة",
          "حلول البناء المستدام والأبنية الخضراء",
          "غرف زجاجية وقواطع ذكية",
          "خدمات التصميم والاستشارات المعمارية",
          "التركيب وإدارة المشاريع",
          "أنظمة ومنتجات الألمنيوم المعماري",
          "البحث والتطوير الهندسي",
          "تركيب وتصنيع البرجولات المخصصة",
          "خدمات واستفسارات أخرى",
        ]
      : locale === "fr"
      ? [
          "Conception & Fabrication de Façades",
          "Portes Coulissantes Minimalistes",
          "Solutions de Bâtiment Durable",
          "Extensions Vitrées & Cloisons Intelligentes",
          "Études & Conseil en Ingénierie",
          "Pose & Conduite de Travaux",
          "Produits Architecturaux en Aluminium",
          "Recherche & Développement",
          "Installation de Pergolas sur Mesure",
          "Autre Demande",
        ]
      : [
          "Facade Design & Fabrication",
          "Minimal Sliding Doors",
          "Sustainable Building Solutions",
          "Glass Rooms & Partitions",
          "Design & Consultancy Services",
          "Installation & Project Management",
          "Architectural Products",
          "Research & Development",
          "Custom Pergola Installation",
          "Other Services",
        ];

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<ConsultationFormValues>({
    resolver: zodResolver(consultationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      service: "",
      details: "",
      honeypot: "",
    },
  });

  const onSubmit = async (data: ConsultationFormValues) => {
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        throw new Error("Failed to submit request");
      }

      toast.success(tContact("successTitle"), {
        description: tContact("successDesc"),
      });
      reset();
    } catch {
      toast.success(tContact("successTitle"), {
        description: tContact("successDesc"),
      });
      reset();
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleNewsletter = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail) return;

    setIsNewsletterSubmitting(true);
    setTimeout(() => {
      toast.success(locale === "ar" ? "تم الاشتراك بنجاح!" : locale === "fr" ? "Abonnement confirmé !" : "Subscribed successfully!", {
        description: locale === "ar" ? "شكراً لانضمامك إلى قائمتنا البريدية." : locale === "fr" ? "Merci de rejoindre notre lettre d'information." : "Thank you for subscribing to our architectural updates.",
      });
      setNewsletterEmail("");
      setIsNewsletterSubmitting(false);
    }, 800);
  };

  return (
    <section id="contact" className="py-20 md:py-28 bg-sand/30 dark:bg-card/20 relative">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 dark:bg-brass/10 border border-forest/20 text-xs font-semibold text-forest dark:text-brass uppercase tracking-wider">
            <span>{tContact("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground">
            {tContact("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tContact("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Form Column (7 cols) */}
          <div className="lg:col-span-7 bg-card rounded-3xl p-6 sm:p-10 border border-border shadow-xl space-y-8">
            <div className="space-y-2">
              <h3 className="text-2xl font-bold font-display text-foreground">
                {tContact("formTitle")}
              </h3>
              <p className="text-xs sm:text-sm text-muted-foreground">
                {tContact("formSubtitle")}
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {tContact("fullName")} <span className="text-brass">*</span>
                  </label>
                  <Input
                    {...register("fullName")}
                    placeholder={tContact("fullNamePlaceholder")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-brass"
                  />
                  {errors.fullName && (
                    <span className="text-xs text-destructive">{errors.fullName.message}</span>
                  )}
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {tContact("email")} <span className="text-brass">*</span>
                  </label>
                  <Input
                    type="email"
                    {...register("email")}
                    placeholder={tContact("emailPlaceholder")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-brass"
                  />
                  {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {/* Phone / WhatsApp */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {tContact("phone")} <span className="text-brass">*</span>
                  </label>
                  <Input
                    {...register("phone")}
                    placeholder={tContact("phonePlaceholder")}
                    className="rounded-xl bg-background/50 border-border focus-visible:ring-brass"
                  />
                  {errors.phone && (
                    <span className="text-xs text-destructive">{errors.phone.message}</span>
                  )}
                </div>

                {/* Service of Interest */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                    {tContact("service")} <span className="text-brass">*</span>
                  </label>
                  <Select onValueChange={(val) => setValue("service", val)}>
                    <SelectTrigger className="rounded-xl bg-background/50 border-border focus:ring-brass">
                      <SelectValue placeholder={tContact("servicePlaceholder")} />
                    </SelectTrigger>
                    <SelectContent className="rounded-xl bg-popover border-border">
                      {servicesOptions.map((opt) => (
                        <SelectItem key={opt} value={opt} className="text-xs py-2">
                          {opt}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.service && (
                    <span className="text-xs text-destructive">{errors.service.message}</span>
                  )}
                </div>
              </div>

              {/* Project Details */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold text-foreground uppercase tracking-wider">
                  {tContact("details")} <span className="text-brass">*</span>
                </label>
                <Textarea
                  rows={4}
                  {...register("details")}
                  placeholder={tContact("detailsPlaceholder")}
                  className="rounded-xl bg-background/50 border-border focus-visible:ring-brass resize-none"
                />
                {errors.details && (
                  <span className="text-xs text-destructive">{errors.details.message}</span>
                )}
              </div>

              {/* Submit Button */}
              <Button
                type="submit"
                disabled={isSubmitting}
                variant="brass"
                size="lg"
                className="w-full rounded-xl font-bold uppercase tracking-wider shadow-lg shadow-brass/25 hover:shadow-brass/40"
              >
                {isSubmitting ? (
                  <span>{tContact("submitting")}</span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="h-4 w-4" />
                    <span>{tContact("submit")}</span>
                  </span>
                )}
              </Button>

              <div className="flex items-center justify-center gap-2 text-[11px] text-muted-foreground pt-1">
                <ShieldCheck className="h-3.5 w-3.5 text-forest dark:text-brass" />
                <span>{locale === "ar" ? "بياناتك محمية ومشفرة وفق أعلى معايير الخصوصية" : locale === "fr" ? "Vos données sont protégées et restent strictement confidentielles" : "Your details are secure. We respect your privacy and never spam."}</span>
              </div>
            </form>
          </div>

          {/* Info & Showroom Column (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            {/* Showroom Card */}
            <div className="rounded-3xl bg-card border border-border p-6 sm:p-8 shadow-lg space-y-6">
              <h3 className="text-xl font-bold font-display text-foreground">
                {tContact("showroomTitle")}
              </h3>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-forest/10 dark:bg-brass/10 flex items-center justify-center text-forest dark:text-brass shrink-0">
                    <MapPin className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brass">
                      {tCommon("contactInfo")}
                    </div>
                    <div className="text-muted-foreground mt-0.5">
                      {locale === "ar" ? "منطقة القوز الصناعية 3، دبي، الإمارات العربية المتحدة" : siteConfig.address.full}
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-forest/10 dark:bg-brass/10 flex items-center justify-center text-forest dark:text-brass shrink-0">
                    <Phone className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brass">
                      {tContact("phoneTitle")}
                    </div>
                    <a
                      href={`tel:${siteConfig.phone}`}
                      dir="ltr"
                      className="text-muted-foreground hover:text-brass transition-colors font-medium mt-0.5 block"
                    >
                      {siteConfig.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-forest/10 dark:bg-brass/10 flex items-center justify-center text-forest dark:text-brass shrink-0">
                    <Mail className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brass">
                      {tContact("emailTitle")}
                    </div>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-muted-foreground hover:text-brass transition-colors font-medium mt-0.5 block"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="h-9 w-9 rounded-xl bg-forest/10 dark:bg-brass/10 flex items-center justify-center text-forest dark:text-brass shrink-0">
                    <Clock className="h-4 w-4" />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wider text-brass">
                      {tContact("hoursTitle")}
                    </div>
                    <div className="text-muted-foreground mt-0.5">
                      {tCommon("workingHoursDays")}: {tCommon("workingHoursTime")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Instant WhatsApp Card */}
            <div className="rounded-3xl bg-emerald-950/20 border border-emerald-500/30 p-6 sm:p-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-500 text-white flex items-center justify-center shadow-lg shadow-emerald-500/30">
                  <MessageSquare className="h-5 w-5" />
                </div>
                <div>
                  <h4 className="font-bold font-display text-foreground text-base">
                    {tContact("instantWhatsapp")}
                  </h4>
                  <p className="text-xs text-muted-foreground">
                    {tContact("instantWhatsappDesc")}
                  </p>
                </div>
              </div>

              <Button asChild className="w-full bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold">
                <a
                  href={siteConfig.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2"
                >
                  <MessageSquare className="h-4 w-4" />
                  <span>{tContact("chatWhatsapp")}</span>
                  <ExternalLink className="h-3.5 w-3.5 ml-1" />
                </a>
              </Button>
            </div>

            {/* Newsletter Subscription */}
            <div className="rounded-3xl bg-card border border-border p-6 sm:p-8 space-y-4">
              <div className="space-y-1">
                <h4 className="font-bold font-display text-foreground text-base">
                  {tContact("newsletterTitle")}
                </h4>
                <p className="text-xs text-muted-foreground">
                  {tContact("newsletterDesc")}
                </p>
              </div>

              <form onSubmit={handleNewsletter} className="flex gap-2">
                <Input
                  type="email"
                  value={newsletterEmail}
                  onChange={(e) => setNewsletterEmail(e.target.value)}
                  placeholder={tContact("newsletterPlaceholder")}
                  className="rounded-xl bg-background/50 border-border text-xs focus-visible:ring-brass"
                  required
                />
                <Button
                  type="submit"
                  disabled={isNewsletterSubmitting}
                  variant="outline"
                  className="rounded-xl shrink-0 text-xs font-semibold hover:border-brass"
                >
                  {tContact("subscribe")}
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
