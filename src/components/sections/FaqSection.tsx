"use client";

import { Link } from "@/i18n/routing";
import { useLocale } from "next-intl";
import { ArrowRight, HelpCircle } from "lucide-react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import type { Faq } from "@/lib/content/schemas";

interface FaqSectionProps {
  faqs?: Faq[];
}

export function FaqSection({ faqs = [] }: FaqSectionProps) {
  const locale = useLocale();
  const isAr = locale === "ar";
  const isFr = locale === "fr";

  const eyebrow = isAr ? "الأسئلة الشائعة" : isFr ? "Questions Fréquentes" : "Frequently Asked Questions";
  const title = isAr
    ? "إجابات واضحة ومباشرة حول خدماتنا وضماناتنا"
    : isFr
    ? "Des réponses claires sur nos installations et garanties"
    : "Clear answers regarding fabrication, installation & warranty";
  const subtitle = isAr
    ? "إليك أهم الأسئلة التي يطرحها عملاؤنا في دبي مع معلومات مؤكدة ودقيقة."
    : isFr
    ? "Retrouvez les réponses aux interrogations courantes sur les autorisations, délais et garanties."
    : "Confirmed guidance on UAE installation permits, structural timelines, and warranty terms.";

  return (
    <section id="faq" className="py-14 sm:py-16 md:py-20 lg:py-24 bg-[#FAF8F5] relative">
      <div className="container mx-auto px-5 sm:px-8 lg:px-12 max-w-[900px]">
        {/* Section Header */}
        <div className="text-center space-y-3 mb-12 sm:mb-14">
          <span className="text-[12px] sm:text-[13px] font-medium tracking-wider uppercase text-brass">
            {eyebrow}
          </span>
          <h2 className="text-[28px] sm:text-[32px] md:text-[38px] lg:text-[42px] font-semibold font-display text-foreground leading-[1.18] tracking-tight">
            {title}
          </h2>
          <p className="text-[15px] sm:text-[16px] text-muted-foreground leading-relaxed max-w-xl mx-auto">
            {subtitle}
          </p>
        </div>

        {/* Accessible Radix Accordion */}
        <div className="rounded-2xl bg-white border border-stone-200/90 p-5 sm:p-8 shadow-sm">
          <Accordion type="single" collapsible defaultValue={faqs[0]?.id || "areas-served-uae"} className="w-full">
            {faqs.map((faq) => {
              const question = faq.question[locale as "en" | "ar" | "fr"] || faq.question.en;
              const answer = faq.answer[locale as "en" | "ar" | "fr"] || faq.answer.en;

              return (
                <AccordionItem key={faq.id} value={faq.id} className="border-stone-200/70">
                  <AccordionTrigger className="text-left rtl:text-right text-sm sm:text-base font-semibold text-foreground hover:text-brass py-4 transition-colors">
                    {question}
                  </AccordionTrigger>
                  <AccordionContent className="text-xs sm:text-sm text-muted-foreground leading-relaxed pb-4">
                    {answer}
                  </AccordionContent>
                </AccordionItem>
              );
            })}
          </Accordion>
        </div>

        {/* Have More Questions Prompt */}
        <div className="mt-8 p-5 sm:p-6 rounded-2xl bg-white border border-stone-200/90 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-sm">
          <div className="space-y-0.5 text-center sm:text-left rtl:sm:text-right">
            <h4 className="text-sm font-semibold text-foreground">
              {isAr ? "هل لديك متطلبات أو استفسار خاص؟" : isFr ? "Une question technique sur votre projet ?" : "Have specific technical questions?"}
            </h4>
            <p className="text-xs text-muted-foreground">
              {isAr ? "مهندسونا جاهزون لتقديم الاستشارة والمعاينة الميدانية." : isFr ? "Nos ingénieurs sont à votre disposition pour une étude personnalisée." : "Our engineering team provides complimentary on-site assessments in Dubai."}
            </p>
          </div>
          <Button asChild size="sm" className="h-9 px-4 rounded-xl bg-brass hover:bg-brass-light text-ink text-xs font-bold shrink-0 shadow-sm shadow-brass/20">
            <Link href="/contact">
              <span>{isAr ? "تحدث مع مهندس" : isFr ? "Contacter un Ingénieur" : "Speak with an Engineer"}</span>
              <ArrowRight className="h-3.5 w-3.5 ml-1.5 rtl:mr-1.5 rtl:ml-0 rtl:rotate-180" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
