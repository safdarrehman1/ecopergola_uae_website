"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import {
  MapPin,
  Phone,
  Mail,
  Send,
  CheckCircle2,
  AlertCircle,
  MessageSquare,
  ShieldCheck,
  Building2,
  Sparkles,
  ArrowRight,
  Compass,
  User,
  Layers,
} from "lucide-react";
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
import type { Settings } from "@/lib/content/schemas";
import { siteConfig } from "@/lib/siteConfig";

const quoteFormSchema = z.object({
  name: z.string().min(2, "Please enter your name"),
  contact: z.string().min(6, "Please enter your phone number or email"),
  solution: z.string().min(1, "Please select a solution of interest"),
  location: z.string().min(2, "Please specify your project location or emirate"),
  message: z.string().optional(),
  honeypot: z.string().max(0, "Bot detected"),
});

type QuoteFormData = z.infer<typeof quoteFormSchema>;

interface ContactSectionProps {
  settings?: Settings;
}

export function ContactSection({ settings }: ContactSectionProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionSuccess, setSubmissionSuccess] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<QuoteFormData>({
    resolver: zodResolver(quoteFormSchema),
    defaultValues: {
      name: "",
      contact: "",
      solution: "",
      location: "",
      message: "",
      honeypot: "",
    },
  });

  const selectedSolution = watch("solution");

  const onSubmit = async (data: QuoteFormData) => {
    setIsSubmitting(true);
    setServerError(null);
    setSubmissionSuccess(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (!res.ok || !result.success) {
        throw new Error(result.error || "Failed to submit inquiry. Please try again.");
      }

      setSubmissionSuccess(result.message);
      reset();
      toast.success(
        isAr
          ? "تم استلام طلبك بنجاح وسيتواصل معك أحد مهندسينا قريباً."
          : isFr
          ? "Votre demande a été enregistrée avec succès. Nos ingénieurs vous recontacteront."
          : "Inquiry recorded successfully! Our engineering team will contact you shortly."
      );
    } catch (err) {
      const errorMsg = (err as Error).message;
      setServerError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const solutions = [
    {
      id: "motorized-louvered-pergola",
      label: isAr ? "برجولا شرائح ذكية (بيوكليماتيك)" : isFr ? "Pergola Bioclimatique à Lames" : "Bio-Climatic Louvered Pergola",
      chip: isAr ? "شرائح بيوكليماتيك" : isFr ? "Lames Bioclimatiques" : "Bio-Climatic",
    },
    {
      id: "aluminum-pergola",
      label: isAr ? "برجولا ألمنيوم معمارية مخصصة" : isFr ? "Pergola en Aluminium sur Mesure" : "Custom Aluminum Pergola",
      chip: isAr ? "برجولا ألمنيوم" : isFr ? "Pergola Aluminium" : "Custom Aluminum",
    },
    {
      id: "retractable-pergola",
      label: isAr ? "برجولا سقف قابل للطي بمحرك" : isFr ? "Pergola Rétractable Motorisée" : "Retractable Canopy Pergola",
      chip: isAr ? "سقف قابل للطي" : isFr ? "Toile Rétractable" : "Retractable Roof",
    },
    {
      id: "minimal-sliding-doors",
      label: isAr ? "أبواب زجاجية منزلقة دقيقة (20 مم)" : isFr ? "Baies Coulissantes Minimales (20mm)" : "Minimal Sliding Doors (20mm)",
      chip: isAr ? "أبواب منزلقة (20مم)" : isFr ? "Baies Minimales" : "Minimal Sliding",
    },
    {
      id: "glass-room-extension",
      label: isAr ? "غرفة وتوسعة زجاجية معزولة حرارياً" : isFr ? "Véranda & Extension Vitrée Isolée" : "Glass Room Extension (Solarium)",
      chip: isAr ? "غرفة زجاجية" : isFr ? "Extension Vitrée" : "Glass Room",
    },
    {
      id: "architectural-facade",
      label: isAr ? "واجهات زجاجية ومباني تجارية" : isFr ? "Façades & Murs-Rideaux Vitrés" : "Architectural Glass Facade",
      chip: isAr ? "واجهات معمارية" : isFr ? "Façade Vitrée" : "Glass Facade",
    },
    {
      id: "other-inquiry",
      label: isAr ? "استشارة معمارية مخصصة" : isFr ? "Autre Demande Spécifique" : "Other Architectural Solution",
      chip: isAr ? "حلول أخرى" : isFr ? "Autre Projet" : "Other Scope",
    },
  ];

  const locations = [
    "Dubai Marina / JBR",
    "Palm Jumeirah",
    "Dubai Hills Estate",
    "Emirates Hills / Meadows",
    "Arabian Ranches / Damac Hills",
    "Downtown Dubai / Business Bay",
    "Jumeirah / Umm Suqeim",
    "Abu Dhabi / Al Ain",
    "Sharjah / Northern Emirates",
    "Other UAE Location",
  ];

  const phoneDisplay = settings?.phoneDisplay || siteConfig.phoneDisplay;
  const phoneRaw = settings?.phone || siteConfig.phone;
  const whatsappUrl = settings?.whatsappUrl || siteConfig.whatsappUrl;
  const whatsappDisplay = settings?.whatsappDisplay || siteConfig.whatsappDisplay;
  const email = settings?.email || siteConfig.email;
  const addressFull = settings?.address?.full?.[locale as "en" | "ar" | "fr"] || siteConfig.address.full;

  const eyebrow = isAr ? "استشارة هندسية ومعاينة مجانية" : isFr ? "Consultation & Visite sur Site Offerte" : "Bespoke Consultation & Laser Survey";
  const title = isAr
    ? "ابدأ بتصميم مساحتك الخارجية مع مهندسينا"
    : isFr
    ? "Concrétisez votre projet extérieur avec nos ingénieurs"
    : "Discuss your outdoor project with our engineers";
  const subtitle = isAr
    ? "املأ النموذج للحصول على معاينة ميدانية مجانية بالليزر وتصميم ثلاثي الأبعاد وعرض سعر مخصص."
    : isFr
    ? "Remplissez ce formulaire pour planifier un relevé laser gratuit et recevoir une étude 3D chiffrée."
    : "Receive a complimentary on-site laser survey, 3D spatial visualization, and itemized engineering estimate.";

  return (
    <section id="contact" className="py-16 sm:py-20 lg:py-28 bg-gradient-to-b from-[#FAF8F5] via-white to-[#F5F2EA] relative overflow-hidden">
      {/* Ambient Lighting & CAD Coordinates */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 right-10 w-[600px] h-[600px] bg-amber-200/20 rounded-full blur-[140px]" />
        <div className="absolute bottom-10 left-10 w-[500px] h-[500px] bg-stone-300/25 rounded-full blur-[130px]" />
        <div className="absolute inset-0 bg-[radial-gradient(#d6cfc4_1px,transparent_1px)] [background-size:32px_32px] opacity-35" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-[1320px] relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-3.5 mb-14 sm:mb-18">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-500/10 border border-brass/30 text-[11px] font-mono tracking-widest uppercase text-brass font-bold">
            <span className="w-2 h-2 rounded-full bg-brass animate-pulse" />
            <span>{eyebrow}</span>
          </div>

          <h2 className="text-[28px] sm:text-[36px] md:text-[44px] font-bold font-display text-stone-900 leading-[1.14] tracking-tight text-balance">
            {title}
          </h2>

          <p className="text-[14px] sm:text-[16px] text-stone-600 leading-relaxed max-w-2xl mx-auto text-balance">
            {subtitle}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          
          {/* Left Column: Direct Engineering Channels & Concierge */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Live Status Badge */}
            <div className="p-4 rounded-2xl bg-white border border-stone-200/90 shadow-sm flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="relative flex h-3 w-3">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500" />
                </span>
                <span className="text-xs font-mono font-semibold text-stone-900">
                  {isAr ? "مكتب المهندسين جاهز لاستقبال طلبك" : isFr ? "Bureau d'Ingénierie Ouvert" : "Engineering Desk Live"}
                </span>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-wider text-stone-500 bg-stone-100 px-2 py-0.5 rounded-md font-semibold">
                {isAr ? "استجابة < ساعتين" : isFr ? "Rép. < 2h" : "Resp. < 2h"}
              </span>
            </div>

            {/* Direct Channel Cards */}
            <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-7 space-y-5 shadow-[0_4px_24px_-6px_rgba(28,25,23,0.06)]">
              <div className="border-b border-stone-100 pb-3">
                <h3 className="text-base font-bold text-stone-900">
                  {isAr ? "قنوات التواصل المباشر مع المهندسين" : isFr ? "Lignes Directes d'Ingénierie" : "Senior Engineering Channels"}
                </h3>
                <p className="text-xs text-stone-500 mt-0.5">
                  {isAr ? "تواصل مباشرة مع فريقنا الهندسي والتصميمي في دبي" : isFr ? "Échangez directement avec notre équipe technique" : "Connect with our Dubai design and engineering directors"}
                </p>
              </div>

              <div className="space-y-3.5">
                
                {/* Instant WhatsApp Card */}
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3.5 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 hover:border-emerald-500/80 flex items-center justify-between text-stone-900 transition-all group cursor-pointer hover:shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-[#25D366] text-white flex items-center justify-center shrink-0 shadow-sm group-hover:scale-105 transition-transform">
                      <MessageSquare className="h-5 w-5" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-emerald-800 font-bold">
                        {isAr ? "المحادثة الفورية عبر واتساب" : isFr ? "WhatsApp Direct" : "Instant WhatsApp"}
                      </div>
                      <div className="font-bold text-sm text-stone-900" dir="ltr">
                        {whatsappDisplay}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-emerald-800 flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <span>{isAr ? "محادثة" : isFr ? "Discuter" : "Chat Now"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </div>
                </a>

                {/* Direct Phone Line */}
                <a
                  href={`tel:${phoneRaw}`}
                  className="p-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/70 hover:border-brass/70 flex items-center justify-between text-stone-900 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white text-brass border border-stone-200/90 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Phone className="h-5 w-5 text-brass" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-stone-500 font-semibold">
                        {isAr ? "الاتصال الهاتفي المباشر" : isFr ? "Ligne Directe" : "Direct Telephone"}
                      </div>
                      <div className="font-bold text-sm text-stone-900" dir="ltr">
                        {phoneDisplay}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-brass flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <span>{isAr ? "اتصال" : isFr ? "Appeler" : "Call"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </div>
                </a>

                {/* Direct Email */}
                <a
                  href={`mailto:${email}`}
                  className="p-3.5 rounded-2xl bg-stone-50 hover:bg-amber-50/60 border border-stone-200/70 hover:border-brass/70 flex items-center justify-between text-stone-900 transition-all group cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-white text-brass border border-stone-200/90 flex items-center justify-center shrink-0 shadow-xs group-hover:scale-105 transition-transform">
                      <Mail className="h-5 w-5 text-brass" />
                    </div>
                    <div>
                      <div className="text-[11px] font-mono uppercase text-stone-500 font-semibold">
                        {isAr ? "البريد الإلكتروني المباشر" : isFr ? "Courriel Technique" : "Engineering Email"}
                      </div>
                      <div className="font-bold text-xs sm:text-sm text-stone-900">
                        {email}
                      </div>
                    </div>
                  </div>
                  <div className="text-xs font-semibold text-brass flex items-center gap-1 opacity-90 group-hover:opacity-100 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 transition-transform">
                    <span>{isAr ? "مراسلة" : isFr ? "Écrire" : "Email"}</span>
                    <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180" />
                  </div>
                </a>

                {/* Facility & Showroom Address */}
                <div className="p-3.5 rounded-2xl bg-stone-50 border border-stone-200/70 flex items-start gap-3 text-stone-900">
                  <div className="h-10 w-10 rounded-xl bg-white text-brass border border-stone-200/90 flex items-center justify-center shrink-0 shadow-xs mt-0.5">
                    <MapPin className="h-5 w-5 text-brass" />
                  </div>
                  <div className="space-y-1">
                    <div className="text-[11px] font-mono uppercase text-stone-500 font-semibold">
                      {isAr ? "مقر التصنيع والمعرض الرئيسي" : isFr ? "Showroom & Atelier de Fabrication" : "Dubai Fabrication & Showroom"}
                    </div>
                    <div className="text-xs sm:text-[13px] font-semibold text-stone-800 leading-snug">
                      {addressFull}
                    </div>
                    <div className="text-[11px] text-stone-500 font-medium">
                      {isAr ? "مفتوح: الإثنين – السبت (8:00 ص – 7:00 م)" : isFr ? "Ouvert : Lun – Sam (8h00 – 19h00)" : "Hours: Mon – Sat (8:00 AM – 7:00 PM)"}
                    </div>
                  </div>
                </div>

              </div>
            </div>

            {/* 3-Step Consultation Guarantee Pill Card */}
            <div className="p-5 rounded-3xl bg-amber-50/70 border border-amber-200/80 space-y-3">
              <div className="flex items-center gap-2 text-amber-900 text-xs font-mono font-bold uppercase tracking-wider">
                <ShieldCheck className="h-4 w-4 text-brass" />
                <span>{isAr ? "ما ستحصل عليه في استشارتك المجانية" : isFr ? "Votre Pack Étude Gratuit" : "What You Receive (100% Free)"}</span>
              </div>
              <ul className="space-y-2 text-xs text-stone-700 font-medium">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0" />
                  <span>{isAr ? "معاينة ميدانية بالليزر لقياسات مطابقة لـ ±1.5 مم" : isFr ? "Relevé laser 3D précis à ±1.5 mm sur votre villa" : "On-site laser survey with ±1.5mm precision tolerance"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0" />
                  <span>{isAr ? "تصميم ثلاثي الأبعاد واقعي مدمج في حديقة فيلتك" : isFr ? "Modélisation 3D photoréaliste intégrée à votre jardin" : "Photorealistic 3D rendering in your actual outdoor space"}</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-3.5 w-3.5 text-brass shrink-0" />
                  <span>{isAr ? "عرض سعر هندسي تفصيلي بدون أي التزام مالي" : isFr ? "Devis d'ingénierie détaillé sans aucun engagement" : "Itemized structural quotation with zero purchase obligation"}</span>
                </li>
              </ul>
            </div>

          </div>

          {/* Right Column: Luxury Interactive Quote Specification Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl border border-stone-200/90 bg-white p-6 sm:p-8 lg:p-9 shadow-[0_12px_40px_-10px_rgba(28,25,23,0.08)] space-y-6">
              
              <div className="border-b border-stone-100 pb-4 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <h3 className="text-lg sm:text-xl font-bold font-display text-stone-900">
                    {isAr ? "طلب استشارة هندسية وعرض سعر" : isFr ? "Votre Demande de Projet" : "Project Specification & Quote"}
                  </h3>
                  <p className="text-xs text-stone-500 mt-0.5">
                    {isAr ? "حدد متطلبات مساحتك الخارجية ليقوم مهندسونا بإعداد دراسة مخصصة" : isFr ? "Précisez votre besoin pour recevoir une étude technique personnalisée" : "Specify your outdoor scope to receive a tailored engineering proposal"}
                  </p>
                </div>
                <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-amber-50 text-brass border border-amber-200/70 font-bold uppercase tracking-wider">
                  {isAr ? "معاينة مجانية" : isFr ? "Étude Offerte" : "Zero Obligation"}
                </span>
              </div>

              {/* Success Notification State */}
              {submissionSuccess && (
                <div className="p-4 rounded-2xl bg-emerald-50 border border-emerald-200 text-emerald-950 space-y-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 font-bold text-sm text-emerald-800">
                    <CheckCircle2 className="h-4 w-4 text-emerald-600 shrink-0" />
                    <span>{isAr ? "تم تسجيل طلبك بنجاح" : isFr ? "Demande bien enregistrée" : "Inquiry Successfully Logged"}</span>
                  </div>
                  <p className="text-xs text-emerald-700 leading-relaxed">
                    {submissionSuccess}
                  </p>
                </div>
              )}

              {/* Server Error State */}
              {serverError && (
                <div className="p-4 rounded-2xl bg-rose-50 border border-rose-200 text-rose-950 space-y-1 animate-in fade-in zoom-in-95 duration-200">
                  <div className="flex items-center gap-2 font-bold text-sm text-rose-800">
                    <AlertCircle className="h-4 w-4 text-rose-600 shrink-0" />
                    <span>{isAr ? "تعذر إرسال الطلب حالياً" : isFr ? "Erreur de transmission" : "Transmission Issue"}</span>
                  </div>
                  <p className="text-xs text-rose-700 leading-relaxed">
                    {serverError}
                  </p>
                </div>
              )}

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                {/* Honeypot anti-spam field */}
                <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

                {/* Solution Selector Chips */}
                <div className="space-y-2">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Layers className="h-3.5 w-3.5 text-brass" />
                    <span>{isAr ? "اختر النظام المعماري المطلوب *" : isFr ? "Système Recherché *" : "System of Interest *"}</span>
                  </label>
                  
                  {/* Quick Pill Chips */}
                  <div className="flex flex-wrap gap-2 pb-1">
                    {solutions.slice(0, 5).map((s) => {
                      const isSelected = selectedSolution === s.id;
                      return (
                        <button
                          key={s.id}
                          type="button"
                          onClick={() => setValue("solution", s.id, { shouldValidate: true })}
                          className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all cursor-pointer ${
                            isSelected
                              ? "bg-brass text-stone-950 border border-brass shadow-sm font-bold scale-[1.02]"
                              : "bg-stone-50 hover:bg-stone-100 text-stone-700 border border-stone-200/80"
                          }`}
                        >
                          {s.chip}
                        </button>
                      );
                    })}
                  </div>

                  {/* Complete Select Fallback */}
                  <Select
                    value={selectedSolution || ""}
                    onValueChange={(val) => setValue("solution", val, { shouldValidate: true })}
                  >
                    <SelectTrigger className="h-11 rounded-xl border-stone-200 text-xs sm:text-sm bg-white focus:ring-brass/40">
                      <SelectValue placeholder={isAr ? "أو اختر من القائمة الكاملة" : isFr ? "Ou sélectionner dans la liste" : "Or choose from all systems"} />
                    </SelectTrigger>
                    <SelectContent>
                      {solutions.map((s) => (
                        <SelectItem key={s.id} value={s.id} className="text-xs sm:text-sm">
                          {s.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.solution && <p className="text-xs text-rose-600 font-medium">{errors.solution.message}</p>}
                </div>

                {/* Name & Contact Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* 1. Name */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <User className="h-3.5 w-3.5 text-brass" />
                      <span>{isAr ? "الاسم الكامل *" : isFr ? "Nom & Prénom *" : "Full Name *"}</span>
                    </label>
                    <Input
                      {...register("name")}
                      placeholder={isAr ? "مثال: محمد المنصوري" : isFr ? "ex: Marc Dupont" : "e.g. Tariq Al Mansoori"}
                      className="h-11 rounded-xl border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:ring-brass/40"
                    />
                    {errors.name && <p className="text-xs text-rose-600 font-medium">{errors.name.message}</p>}
                  </div>

                  {/* 2. Phone or Email */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                      <Phone className="h-3.5 w-3.5 text-brass" />
                      <span>{isAr ? "رقم الهاتف أو البريد *" : isFr ? "Téléphone ou Email *" : "Phone or Email *"}</span>
                    </label>
                    <Input
                      {...register("contact")}
                      dir="ltr"
                      placeholder="+971 50 123 4567 or email@domain.com"
                      className="h-11 rounded-xl border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:ring-brass/40"
                    />
                    {errors.contact && <p className="text-xs text-rose-600 font-medium">{errors.contact.message}</p>}
                  </div>
                </div>

                {/* Location / Area Select */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <MapPin className="h-3.5 w-3.5 text-brass" />
                    <span>{isAr ? "موقع المشروع في الإمارات *" : isFr ? "Emplacement du Projet *" : "Project Location in UAE *"}</span>
                  </label>
                  <Select onValueChange={(val) => setValue("location", val, { shouldValidate: true })}>
                    <SelectTrigger className="h-11 rounded-xl border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:ring-brass/40">
                      <SelectValue placeholder={isAr ? "حدد المنطقة أو المجمع السكني (مثل: نخلة جميرا، دبي هيلز...)" : isFr ? "Sélectionner la zone (ex: Palm Jumeirah, Dubai Hills...)" : "Select area / community (e.g. Palm Jumeirah, Dubai Hills...)"} />
                    </SelectTrigger>
                    <SelectContent>
                      {locations.map((loc, idx) => (
                        <SelectItem key={idx} value={loc} className="text-xs sm:text-sm">
                          {loc}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.location && <p className="text-xs text-rose-600 font-medium">{errors.location.message}</p>}
                </div>

                {/* Optional Message / Dimensions */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-stone-800 flex items-center gap-1.5">
                    <Compass className="h-3.5 w-3.5 text-brass" />
                    <span>{isAr ? "تفاصيل إضافية أو أبعاد تقريبية (اختياري)" : isFr ? "Dimensions Approximatives ou Détails (Facultatif)" : "Project Notes & Approximate Dimensions (Optional)"}</span>
                  </label>
                  <Textarea
                    {...register("message")}
                    rows={3}
                    placeholder={
                      isAr
                        ? "مثال: برجولا بيوكليماتيك بمقاس 6×4 متر لتراس الفيلا مع إنارة LED مدمجة وأبواب منزلقة..."
                        : isFr
                        ? "ex: Pergola bioclimatique 6m x 4m pour terrasse avec éclairage LED intégré et baies coulissantes..."
                        : "e.g. Looking for a 6m x 4m motorized bio-climatic pergola for our patio with integrated LED & sliding glass..."
                    }
                    className="rounded-xl border-stone-200 text-xs sm:text-sm bg-stone-50/50 focus:bg-white focus:ring-brass/40"
                  />
                </div>

                {/* Submit Action */}
                <div className="pt-2">
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 rounded-xl bg-gradient-to-r from-brass via-brass-light to-brass hover:brightness-105 text-stone-950 font-bold text-sm uppercase tracking-wider shadow-lg shadow-brass/25 transition-all cursor-pointer hover:scale-[1.01] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <span className="flex items-center gap-2">
                        <span className="h-4 w-4 border-2 border-stone-900/40 border-t-stone-900 rounded-full animate-spin" />
                        <span>{isAr ? "جارٍ تسجيل طلبك..." : isFr ? "Transmission en cours..." : "Submitting Inquiry..."}</span>
                      </span>
                    ) : (
                      <span className="flex items-center justify-center gap-2">
                        <span>{isAr ? "إرسال طلب الاستشارة والمعاينة المجانية" : isFr ? "Demander mon Étude & Rendu 3D Gratuit" : "Request Free On-Site Survey & 3D Render"}</span>
                        <Send className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" />
                      </span>
                    )}
                  </Button>
                </div>

                {/* Privacy & Warranty Reassurance Badges */}
                <div className="pt-3 border-t border-stone-100 grid grid-cols-3 gap-2 text-center">
                  <div className="flex flex-col items-center gap-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-brass" />
                    <span className="text-[10px] font-mono text-stone-500 font-semibold leading-tight">
                      {isAr ? "ضمان 10 سنوات" : isFr ? "Garantie 10 Ans" : "10-Yr Warranty"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Building2 className="h-3.5 w-3.5 text-brass" />
                    <span className="text-[10px] font-mono text-stone-500 font-semibold leading-tight">
                      {isAr ? "معايير بلدية دبي" : isFr ? "Normes Dubaï" : "Dubai Compliant"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center gap-1">
                    <Sparkles className="h-3.5 w-3.5 text-brass" />
                    <span className="text-[10px] font-mono text-stone-500 font-semibold leading-tight">
                      {isAr ? "معاينة وتصميم مجاني" : isFr ? "Étude 100% Offerte" : "Free 3D Design"}
                    </span>
                  </div>
                </div>

              </form>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}

export default ContactSection;
