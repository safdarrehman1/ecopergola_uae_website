"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { ArrowUpRight, Compass, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { Settings } from "@/lib/content/schemas";
import { siteConfig } from "@/lib/siteConfig";

const inquirySchemaT3 = z.object({
  name: z.string().min(2, "Name required"),
  contact: z.string().min(6, "Contact required"),
  solution: z.string().min(1, "Solution required"),
  location: z.string().min(2, "Location required"),
  message: z.string().optional(),
  honeypot: z.string().max(0),
});

type InquiryDataT3 = z.infer<typeof inquirySchemaT3>;

export function ContactSection({ settings }: { settings?: Settings }) {
  const [submitting, setSubmitting] = useState(false);
  const [confirmed, setConfirmed] = useState<string | null>(null);
  const [failure, setFailure] = useState<string | null>(null);
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
  } = useForm<InquiryDataT3>({
    resolver: zodResolver(inquirySchemaT3),
    defaultValues: {
      name: "",
      contact: "",
      solution: "motorized-louvered-pergola",
      location: "",
      message: "",
      honeypot: "",
    },
  });

  const activeCategory = watch("solution");

  const sendInquiry = async (payload: InquiryDataT3) => {
    setSubmitting(true);
    setFailure(null);
    setConfirmed(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const resData = await res.json();
      if (!res.ok || !resData.success) throw new Error(resData.error || "Inquiry could not be sent.");
      setConfirmed(resData.message);
      reset();
      toast.success(isAr ? "تم إرسال طلبكم بنجاح" : isFr ? "Demande transmise avec succès" : "Consultation request dispatched");
    } catch (err) {
      const msg = (err as Error).message;
      setFailure(msg);
      toast.error(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const systemsList = [
    { key: "motorized-louvered-pergola", label: isAr ? "برجولا بيوكليماتيك ألمنيوم" : isFr ? "Pergola Bioclimatique" : "Motorized Louvered Pergola" },
    { key: "minimal-sliding-doors", label: isAr ? "أبواب سحاب 20 مم فائقة النحافة" : isFr ? "Baies Coulissantes 20mm" : "Minimal 20mm Sliding Doors" },
    { key: "glass-room-extension", label: isAr ? "غرف زجاجية وملحقات معزولة" : isFr ? "Extension Vitrée Isolée" : "Insulated Glass Extensions" },
    { key: "curtain-wall-facade", label: isAr ? "واجهات زجاجية إنشائية" : isFr ? "Façades Verre Structurelles" : "Curtain Wall Structural Facades" },
    { key: "frameless-glass-railings", label: isAr ? "درابزين زجاجي بدون إطار" : isFr ? "Garde-corps Verre Épuré" : "Frameless Glass Balustrades" },
  ];

  const officePhone = settings?.phone || siteConfig.phone;
  const officeEmail = settings?.email || siteConfig.email;
  const officeAddress = settings?.address?.full?.[locale as "en" | "ar" | "fr"] || siteConfig.address.full;

  return (
    <section id="contact" className="py-20 lg:py-28 bg-[#FAF8F5] text-stone-900 border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1360px]">
        
        {/* Header Block */}
        <div className="max-w-2xl mb-16 pb-6 border-b border-stone-200">
          <span className="text-[11px] font-mono tracking-[0.25em] uppercase text-[#B38E5D] font-medium block mb-2">
            {isAr ? "استوديو الاستشارات المعمارية" : isFr ? "Atelier & Bureau d'Études" : "Architectural Atelier Inquiry"}
          </span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-normal font-display text-stone-900 tracking-tight leading-[1.12]">
            {isAr ? "طلب استشارة ومسح ليزري لموقع فيلتك" : isFr ? "Demande d'Étude & Relevé Laser sur Site" : "Schedule Private Consultation & Laser Survey"}
          </h2>
          <p className="text-sm text-stone-600 font-light leading-relaxed mt-3">
            {isAr
              ? "يقدم مهندسونا دراسة معمارية ومسح ليزري مجاني للفيلا ونمذجة ثلاثية الأبعاد وعرض سعر مخصص."
              : isFr
              ? "Relevé laser sur site, modélisation 3D photoréaliste et devis détaillé sans engagement."
              : "Our senior design directors provide complimentary on-site laser scanning, 3D spatial renders, and structural pricing."}
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-20">
          
          {/* Left Column: Atelier Information */}
          <div className="lg:col-span-4 space-y-10">
            <div className="space-y-4">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#B38E5D] font-medium block">
                {isAr ? "المقر والمصنع في دبي" : isFr ? "Atelier Dubaï" : "Dubai Fabrication Atelier"}
              </span>
              <p className="text-sm text-stone-800 font-light leading-relaxed">
                {officeAddress}
              </p>
            </div>

            <div className="space-y-4 pt-6 border-t border-stone-200">
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#B38E5D] font-medium block">
                {isAr ? "الاتصال المباشر" : isFr ? "Lignes Directes" : "Direct Contacts"}
              </span>
              <div className="space-y-2 text-sm font-mono text-stone-800">
                <div>
                  <a href={`tel:${officePhone}`} className="hover:text-[#B38E5D] transition-colors" dir="ltr">
                    {officePhone}
                  </a>
                </div>
                <div>
                  <a href={`mailto:${officeEmail}`} className="hover:text-[#B38E5D] transition-colors">
                    {officeEmail}
                  </a>
                </div>
              </div>
            </div>

            <div className="space-y-3 pt-6 border-t border-stone-200">
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-800">
                <Compass className="h-4 w-4 text-[#B38E5D]" />
                <span>25.2048° N, 55.2708° E</span>
              </div>
              <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-wider text-stone-800">
                <ShieldCheck className="h-4 w-4 text-[#B38E5D]" />
                <span>10-Year Structural Bond</span>
              </div>
            </div>
          </div>

          {/* Right Column: Minimal Editorial Form */}
          <div className="lg:col-span-8">
            {confirmed && (
              <div className="mb-6 p-4 bg-stone-100 border-l-2 border-[#34AA49] text-xs font-mono text-stone-800">
                {confirmed}
              </div>
            )}
            {failure && (
              <div className="mb-6 p-4 bg-stone-100 border-l-2 border-rose-500 text-xs font-mono text-rose-800">
                {failure}
              </div>
            )}

            <form onSubmit={handleSubmit(sendInquiry)} className="space-y-8">
              <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} />

              {/* Solution Minimal Radio/Chips */}
              <div className="space-y-3">
                <label className="text-xs font-mono tracking-widest uppercase text-stone-600 block">
                  {isAr ? "المنظومة المعمارية المطلوبة *" : isFr ? "Système Recherché *" : "01 // Select Architectural System *"}
                </label>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {systemsList.map((item) => {
                    const isPicked = activeCategory === item.key;
                    return (
                      <button
                        key={item.key}
                        type="button"
                        onClick={() => setValue("solution", item.key, { shouldValidate: true })}
                        className={`text-left rtl:text-right p-3 text-xs font-sans transition-colors border cursor-pointer ${
                          isPicked
                            ? "bg-stone-900 text-white border-stone-900 font-medium"
                            : "bg-white text-stone-700 border-stone-200 hover:border-stone-400"
                        }`}
                      >
                        {item.label}
                      </button>
                    );
                  })}
                </div>
                {errors.solution && <p className="text-xs text-rose-600 font-mono">{errors.solution.message}</p>}
              </div>

              {/* Minimal Line Inputs */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="space-y-1">
                  <label className="text-xs font-mono tracking-widest uppercase text-stone-600 block">
                    {isAr ? "الاسم الكامل *" : isFr ? "Nom *" : "02 // Client Name *"}
                  </label>
                  <input
                    {...register("name")}
                    placeholder={isAr ? "سعادة / محمد الشامسي" : isFr ? "Nom & Prénom" : "e.g. Tariq Al Nuaimi"}
                    className="w-full py-3 bg-transparent border-0 border-b border-stone-300 rounded-none text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 text-sm font-sans"
                  />
                  {errors.name && <p className="text-xs text-rose-600 font-mono">{errors.name.message}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono tracking-widest uppercase text-stone-600 block">
                    {isAr ? "الهاتف أو البريد الإلكتروني *" : isFr ? "Contact *" : "03 // Phone or Email *"}
                  </label>
                  <input
                    {...register("contact")}
                    dir="ltr"
                    placeholder="+971 50 ... / user@domain.com"
                    className="w-full py-3 bg-transparent border-0 border-b border-stone-300 rounded-none text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 text-sm font-mono"
                  />
                  {errors.contact && <p className="text-xs text-rose-600 font-mono">{errors.contact.message}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono tracking-widest uppercase text-stone-600 block">
                  {isAr ? "موقع الفيلا / المشروع في الإمارات *" : isFr ? "Localisation *" : "04 // Project Location in UAE *"}
                </label>
                <input
                  {...register("location")}
                  placeholder={isAr ? "مثل: نخلة جميرا السعفة G، تلال الإمارات، دبي هيلز" : isFr ? "ex: Palm Jumeirah Frond G, Emirates Hills" : "e.g. Palm Jumeirah Frond G, Emirates Hills, Dubai Hills"}
                  className="w-full py-3 bg-transparent border-0 border-b border-stone-300 rounded-none text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 text-sm font-sans"
                />
                {errors.location && <p className="text-xs text-rose-600 font-mono">{errors.location.message}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-mono tracking-widest uppercase text-stone-600 block">
                  {isAr ? "ملاحظات معمارية وأبعاد تقريبية" : isFr ? "Notes de Projet" : "05 // Project Dimensions & Notes (Optional)"}
                </label>
                <textarea
                  {...register("message")}
                  rows={2}
                  placeholder={isAr ? "أبعاد المساحة أو متطلبات خاصة..." : isFr ? "Dimensions approx, teintes souhaitées..." : "e.g. 8m x 5m terrace pergola with integrated Somfy automation and LED..."}
                  className="w-full py-3 bg-transparent border-0 border-b border-stone-300 rounded-none text-stone-900 placeholder:text-stone-400 focus:outline-none focus:border-stone-900 text-sm font-sans"
                />
              </div>

              {/* Submit CTA: Square Sharp Minimalist Button with #34AA49 */}
              <div className="pt-4">
                <Button
                  type="submit"
                  disabled={submitting}
                  className="h-12 px-8 rounded-[2px] bg-[#34AA49] hover:bg-[#268537] text-white text-xs font-mono tracking-[0.2em] uppercase transition-colors cursor-pointer"
                >
                  {submitting ? (
                    <span>{isAr ? "جارٍ الإرسال..." : isFr ? "Envoi..." : "Transmitting..."}</span>
                  ) : (
                    <span className="flex items-center gap-3">
                      <span>{isAr ? "إرسال طلب الاستشارة والمعاينة" : isFr ? "Transmettre la Demande d'Étude" : "Transmit Consultation Request"}</span>
                      <ArrowUpRight className="h-4 w-4 rtl:rotate-270" />
                    </span>
                  )}
                </Button>
              </div>
            </form>
          </div>

        </div>

      </div>
    </section>
  );
}

export default ContactSection;
