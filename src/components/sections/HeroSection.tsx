"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Phone, MessageSquare, ShieldCheck, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";

export function HeroSection() {
  const [count, setCount] = useState({ projects: 0, years: 0, satisfaction: 0 });
  const tHero = useTranslations("hero");

  useEffect(() => {
    const duration = 2000;
    const steps = 50;
    const interval = duration / steps;
    let step = 0;

    const timer = setInterval(() => {
      step++;
      const progress = step / steps;
      setCount({
        projects: Math.floor(500 * progress),
        years: Math.floor(10 * progress),
        satisfaction: Math.floor(98 * progress),
      });

      if (step >= steps) {
        clearInterval(timer);
        setCount({ projects: 500, years: 10, satisfaction: 98 });
      }
    }, interval);

    return () => clearInterval(timer);
  }, []);

  const headlineWords = [
    tHero("titleWord1"),
    tHero("titleWord2"),
    tHero("titleWord3"),
    tHero("titleWord4"),
    tHero("titleWord5"),
    tHero("titleWord6"),
  ];

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-ink text-sand-light pt-12 pb-24">
      {/* Background Image with Slow Ken-Burns Zoom & Parallax */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <motion.div
          initial={{ scale: 1.15, opacity: 0 }}
          animate={{ scale: 1.05, opacity: 1 }}
          transition={{ duration: 2.4, ease: [0.16, 1, 0.3, 1] }}
          className="relative w-full h-full"
        >
          <Image
            src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=90&auto=format&fit=crop"
            alt="Luxury glass facade and architectural aluminum in Dubai"
            fill
            priority
            sizes="100vw"
            className="object-cover object-center brightness-[0.35]"
          />
        </motion.div>

        {/* Gradient & Noise Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/60 to-transparent z-10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/90 via-ink/40 to-transparent z-10" />
        <div className="absolute inset-0 noise-overlay opacity-30 z-10" />
      </div>

      <div className="container mx-auto px-4 max-w-7xl relative z-20">
        <div className="max-w-3xl space-y-8">
          {/* Eyebrow Badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-forest/40 border border-forest-light/30 backdrop-blur-md text-xs font-semibold text-sand-light"
          >
            <span className="h-2 w-2 rounded-full bg-brass pulse-ring" />
            <span className="tracking-widest uppercase text-brass">{tHero("eyebrow")}</span>
          </motion.div>

          {/* H1 Split-Word Mask Reveal */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold font-display tracking-tight text-white leading-[1.1]">
            {headlineWords.map((word, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.15 + index * 0.08,
                  ease: [0.16, 1, 0.3, 1],
                }}
                className="inline-block mr-3 rtl:mr-0 rtl:ml-3"
              >
                {index === 1 || index === 3 ? (
                  <span className="brass-gradient-text">{word}</span>
                ) : (
                  word
                )}
              </motion.span>
            ))}
          </h1>

          {/* Subtitle / Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            className="text-base sm:text-lg md:text-xl text-sand-dark max-w-2xl font-body leading-relaxed"
          >
            {tHero("description")}
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 pt-4"
          >
            <Button
              asChild
              variant="brass"
              size="lg"
              className="rounded-xl font-semibold shadow-lg shadow-brass/25 hover:shadow-brass/40 transition-all text-base px-7"
            >
              <Link href="/services">
                <span>{tHero("ctaServices")}</span>
                <ArrowRight className="h-4 w-4 ml-2 rtl:rotate-180 rtl:mr-2 rtl:ml-0" />
              </Link>
            </Button>

            <Button
              asChild
              variant="outline"
              size="lg"
              className="rounded-xl border-white/20 bg-white/5 hover:bg-white/10 text-white backdrop-blur-md text-base px-6"
            >
              <a
                href={siteConfig.whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <MessageSquare className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-brass" />
                <span>{tHero("ctaWhatsapp")}</span>
              </a>
            </Button>

            <Button
              asChild
              variant="ghost"
              size="lg"
              className="rounded-xl text-sand-light hover:text-brass hover:bg-white/5 text-base"
            >
              <a href={`tel:${siteConfig.phone}`}>
                <Phone className="h-4 w-4 mr-2 rtl:ml-2 rtl:mr-0 text-brass" />
                <span>{tHero("ctaCall")}</span>
              </a>
            </Button>
          </motion.div>

          {/* Trust Banner Micro-Copy */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="flex items-center gap-2 pt-2 text-xs text-sand-dark"
          >
            <ShieldCheck className="h-4 w-4 text-brass" />
            <span>{tHero("isoBadge")}</span>
          </motion.div>
        </div>
      </div>

      {/* Floating Interactive Stat Strip */}
      <div className="absolute bottom-6 left-0 right-0 z-20 hidden lg:block">
        <div className="container mx-auto px-4 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.1 }}
            className="grid grid-cols-4 gap-6 p-6 rounded-2xl bg-forest-dark/40 backdrop-blur-xl border border-white/10 shadow-2xl"
          >
            <div className="border-r rtl:border-r-0 rtl:border-l border-white/10 pr-6 rtl:pr-0 rtl:pl-6">
              <div className="text-3xl font-bold font-display text-brass">{count.projects}+</div>
              <div className="text-xs text-sand-dark mt-1 font-medium">{tHero("stats.projects")}</div>
            </div>

            <div className="border-r rtl:border-r-0 rtl:border-l border-white/10 pr-6 rtl:pr-0 rtl:pl-6">
              <div className="text-3xl font-bold font-display text-brass">{count.years}+</div>
              <div className="text-xs text-sand-dark mt-1 font-medium">{tHero("stats.experience")}</div>
            </div>

            <div className="border-r rtl:border-r-0 rtl:border-l border-white/10 pr-6 rtl:pr-0 rtl:pl-6">
              <div className="text-3xl font-bold font-display text-brass">{count.satisfaction}%</div>
              <div className="text-xs text-sand-dark mt-1 font-medium">{tHero("stats.satisfaction")}</div>
            </div>

            <div>
              <div className="text-3xl font-bold font-display text-brass">100%</div>
              <div className="text-xs text-sand-dark mt-1 font-medium">{tHero("stats.certified")}</div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Down Hint for Mobile */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 z-20 lg:hidden text-sand-dark animate-bounce">
        <ChevronDown className="h-6 w-6 text-brass" />
      </div>
    </section>
  );
}
