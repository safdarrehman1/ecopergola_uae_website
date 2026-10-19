"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import {
  Send,
  Phone,
  MessageCircle,
  Mail,
  Check,
  ShieldAlert,
  Sparkles,
  Radio,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Settings } from "@/lib/content/schemas";
import { siteConfig } from "@/lib/siteConfig";

const formSchemaT2 = z.object({
  name: z.string().min(2, "Name required"),
  contact: z.string().min(6, "Contact required"),
  solution: z.string().min(1, "Please select solution"),
  location: z.string().min(2, "Location required"),
  message: z.string().optional(),
  honeypot: z.string().max(0),
});

type FormValuesT2 = z.infer<typeof formSchemaT2>;

export function ContactSection({ settings }: { settings?: Settings }) {
  const [loading, setLoading] = useState(false);
  const [submittedMessage, setSubmittedMessage] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
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
  } = useForm<FormValuesT2>({
    resolver: zodResolver(formSchemaT2),
    defaultValues: { name: "", contact: "", solution: "motorized-louvered-pergola", location: "", message: "", honeypot: "" },
  });

  const curSolution = watch("solution");

  const submitAction = async (values: FormValuesT2) => {
    setLoading(true);
    setErrorMessage(null);
    setSubmittedMessage(null);
    try {
      const resp = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      });
      const data = await resp.json();
      if (!resp.ok || !data.success) throw new Error(data.error || "Failed");
      setSubmittedMessage(data.message);
      reset();
      toast.success(isAr ? "تم استلام طلبك بنجاح" : isFr ? "Demande reçue" : "Consultation requested successfully");
    } catch (e) {
      const err = (e as Error).message;
      setErrorMessage(err);
      toast.error(err);
    } finally {
      setLoading(false);
    }
  };

  const productOptions = [
    { id: "motorized-louvered-pergola", title: isAr ? "برجولا بيوكليماتيك" : isFr ? "Pergola Bioclimatique" : "Motorized Pergola" },
    { id: "minimal-sliding-doors", title: isAr ? "أبواب سحاب 20 مم" : isFr ? "Baies 20mm" : "Minimal 20mm Doors" },
    { id: "glass-room-extension", title: isAr ? "غرف زجاجية معزولة" : isFr ? "Extension Vitrée" : "Glass Sunrooms" },
    { id: "curtain-wall-facade", title: isAr ? "واجهات زجاجية" : isFr ? "Façades Verre" : "Curtain Wall Facades" },
    { id: "frameless-glass-railings", title: isAr ? "درابزين زجاجي" : isFr ? "Garde-corps" : "Glass Railings" },
    { id: "commercial-architectural", title: isAr ? "مشاريع تجارية" : isFr ? "Projets Commerciaux" : "Commercial Systems" },
  ];

  const primaryPhone = settings?.phone || siteConfig.phone;
  const directWhatsapp = settings?.whatsappUrl || siteConfig.whatsappUrl;
  const generalEmail = settings?.email || siteConfig.email;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#070B14] text-white relative overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-12 max-w-6xl relative z-10">
        
        {/* Modern Bold Card Wrapper */}
        <div className="rounded-[32px] bg-gradient-to-b from-slate-900 via-slate-900/95 to-slate-950 border border-white/10 p-8 sm:p-12 lg:p-16 shadow-[0_30px_90px_rgba(0,0,0,0.6)]">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
            
            {/* Left Narrative Panel */}
            <div className="lg:col-span-5 flex flex-col justify-between space-y-8">
              <div className="space-y-4">
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold font-display text-white tracking-tight leading-[1.12]">
                  {isAr ? "ابدأ تصميم مساحتك الخارجية في دبي" : isFr ? "Donnez Vie à Votre Espace Extérieur" : "Engineer Your Outdoor Space"}
                </h2>

                <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
                  {isAr
                    ? "احصل على استشارة فورية من كبار مهندسينا مع مسح ليزري مجاني للفيلا ونمذجة 3D وعرض سعر تفصيلي."
                    : isFr
                    ? "Relevé laser gratuit sur site, rendu 3D réaliste et proposition chiffrée sous 48h sans aucun engagement."
                    : "Complimentary laser site survey, 3D architectural render, and itemized engineering estimate within 48 hours."}
                </p>
              </div>

              {/* Direct Touchpoints Pills */}
              <div className="space-y-3 pt-4 border-t border-white/10">
                <a
                  href={directWhatsapp}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <MessageCircle className="h-5 w-5 text-emerald-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-[10px] font-mono text-emerald-400 uppercase tracking-wider font-bold">WhatsApp Hotline</div>
                      <div className="text-sm font-bold text-white" dir="ltr">+971 50 123 4567</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-emerald-400 group-hover:underline">{isAr ? "محادثة" : isFr ? "Discuter" : "Chat Now"}</span>
                </a>

                <a
                  href={`tel:${primaryPhone}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Dubai Technical Line</div>
                      <div className="text-sm font-bold text-white" dir="ltr">{primaryPhone}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-400 group-hover:underline">{isAr ? "اتصال" : isFr ? "Appeler" : "Call Desk"}</span>
                </a>

                <a
                  href={`mailto:${generalEmail}`}
                  className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/80 hover:bg-slate-800 border border-white/10 text-white transition-all group"
                >
                  <div className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-teal-400 group-hover:scale-110 transition-transform" />
                    <div>
                      <div className="text-[10px] font-mono text-slate-400 uppercase tracking-wider font-bold">Direct Email</div>
                      <div className="text-sm font-bold text-white">{generalEmail}</div>
                    </div>
                  </div>
                  <span className="text-xs font-semibold text-teal-400 group-hover:underline">{isAr ? "مراسلة" : isFr ? "Écrire" : "Send Email"}</span>
                </a>
              </div>
            </div>

            {/* Right Interactive Form Panel */}
            <div className="lg:col-span-7 bg-slate-950/60 rounded-3xl border border-white/10 p-6 sm:p-8">
              {submittedMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-emerald-950/70 border border-emerald-500/50 flex items-center gap-3 text-emerald-300 text-sm">
                  <Check className="h-5 w-5 text-emerald-400 shrink-0" />
                  <span>{submittedMessage}</span>
                </div>
              )}
              {errorMessage && (
                <div className="mb-6 p-4 rounded-2xl bg-rose-950/70 border border-rose-500/50 flex items-center gap-3 text-rose-300 text-sm">
                  <ShieldAlert className="h-5 w-5 text-rose-400 shrink-0" />
                  <span>{errorMessage}</span>
                </div>
              )}

              <form onSubmit={handleSubmit(submitAction)} className="space-y-5">
                <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

                {/* Solution Selection Tiles */}
                <div className="space-y-2">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    {isAr ? "النظام المطلوب *" : isFr ? "Système Recherché *" : "Select Architecture Type *"}
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                    {productOptions.map((opt) => {
                      const active = curSolution === opt.id;
                      return (
                        <button
                          key={opt.id}
                          type="button"
                          onClick={() => setValue("solution", opt.id, { shouldValidate: true })}
                          className={`p-2.5 rounded-xl text-xs font-semibold transition-all cursor-pointer text-center border ${
                            active
                              ? "bg-teal-500 text-slate-950 border-teal-400 shadow-md font-bold"
                              : "bg-slate-900 hover:bg-slate-800 text-slate-300 border-white/10"
                          }`}
                        >
                          {opt.title}
                        </button>
                      );
                    })}
                  </div>
                  {errors.solution && <p className="text-xs text-rose-400">{errors.solution.message}</p>}
                </div>

                {/* Name & Contact */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      {isAr ? "الاسم الكريم *" : isFr ? "Votre Nom *" : "Full Name *"}
                    </label>
                    <input
                      {...register("name")}
                      placeholder={isAr ? "محمد المهيري" : isFr ? "Votre Nom" : "e.g. Tariq Al Nuaimi"}
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 text-sm"
                    />
                    {errors.name && <p className="text-xs text-rose-400">{errors.name.message}</p>}
                  </div>

                  <div className="space-y-1.5">
                    <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                      {isAr ? "الهاتف أو البريد *" : isFr ? "Téléphone ou Mail *" : "Phone or Email *"}
                    </label>
                    <input
                      {...register("contact")}
                      dir="ltr"
                      placeholder="+971 50 ... / user@domain.com"
                      className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 text-sm"
                    />
                    {errors.contact && <p className="text-xs text-rose-400">{errors.contact.message}</p>}
                  </div>
                </div>

                {/* Location Input */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    {isAr ? "الموقع في الإمارات *" : isFr ? "Localisation UAE *" : "Project Address / Community *"}
                  </label>
                  <input
                    {...register("location")}
                    placeholder={isAr ? "مثل: نخلة جميرا، دبي هيلز، تلال الإمارات" : isFr ? "ex: Palm Jumeirah, Dubai Hills" : "e.g. Palm Jumeirah Frond M, Dubai Hills, Emirates Hills"}
                    className="w-full h-11 px-4 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 text-sm"
                  />
                  {errors.location && <p className="text-xs text-rose-400">{errors.location.message}</p>}
                </div>

                {/* Message */}
                <div className="space-y-1.5">
                  <label className="text-xs font-mono uppercase tracking-wider text-slate-400 font-bold block">
                    {isAr ? "ملاحظات إضافية (أبعاد، مواصفات)" : isFr ? "Notes & Dimensions" : "Scope Details & Dimensions (Optional)"}
                  </label>
                  <textarea
                    {...register("message")}
                    rows={3}
                    placeholder={isAr ? "أبعاد المساحة أو أي تفاصيل خاصة..." : isFr ? "Dimensions approx, options souhaitées..." : "Approximate dimensions (e.g. 7m x 4m), glass sliding doors..."}
                    className="w-full p-4 rounded-xl bg-slate-900 border border-white/10 text-white placeholder:text-slate-600 focus:outline-none focus:border-teal-400 text-sm"
                  />
                </div>

                {/* Submit button */}
                <Button
                  type="submit"
                  disabled={loading}
                  className="w-full h-12 rounded-xl bg-gradient-to-r from-[#34AA49] to-teal-500 hover:from-[#268537] hover:to-teal-600 text-white font-bold text-xs uppercase tracking-wider shadow-lg shadow-teal-500/20 cursor-pointer"
                >
                  {loading ? (
                    <span>{isAr ? "جارٍ الإرسال..." : isFr ? "Envoi..." : "Submitting..."}</span>
                  ) : (
                    <span className="flex items-center justify-center gap-2">
                      <Sparkles className="h-4 w-4" />
                      <span>{isAr ? "إرسال طلب المعاينة وعرض السعر" : isFr ? "Envoyer ma Demande Gratuite" : "Request Free Survey & 3D Render"}</span>
                      <Send className="h-4 w-4 ml-1 rtl:mr-1 rtl:ml-0" />
                    </span>
                  )}
                </Button>
              </form>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}

export default ContactSection;
