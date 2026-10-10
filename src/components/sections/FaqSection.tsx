"use client";

import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { getLocalizedFaqs } from "@/data/localizedData";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";

export function FaqSection() {
  const locale = useLocale();
  const tFaq = useTranslations("faq");
  const tCommon = useTranslations("common");
  const faqs = getLocalizedFaqs(locale);

  return (
    <section id="faq" className="py-20 md:py-28 bg-background relative">
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-forest/10 dark:bg-brass/10 border border-forest/20 text-xs font-semibold text-forest dark:text-brass uppercase tracking-wider">
            <span>{tFaq("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-foreground">
            {tFaq("title")}
          </h2>
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            {tFaq("subtitle")}
          </p>
        </div>

        {/* Accordion */}
        <div className="rounded-3xl bg-card border border-border p-6 sm:p-10 shadow-lg">
          <Accordion type="single" collapsible defaultValue="areas-served-uae" className="w-full">
            {faqs.map((faq) => (
              <AccordionItem key={faq.id} value={faq.id}>
                <AccordionTrigger className="text-base sm:text-lg font-bold font-display text-foreground">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Have more questions banner */}
        <div className="mt-12 text-center p-8 rounded-2xl bg-muted/40 border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-left rtl:text-right">
            <h4 className="font-bold text-foreground text-base">{tFaq("moreQuestions")}</h4>
            <p className="text-xs text-muted-foreground">{tFaq("support247")}</p>
          </div>
          <Button asChild variant="brass" size="sm" className="font-semibold shrink-0">
            <Link href="/contact">
              <span>{tCommon("askExpert")}</span>
              <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 ml-1.5 rtl:mr-1.5 rtl:ml-0" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
