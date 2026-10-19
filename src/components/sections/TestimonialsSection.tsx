"use client";

import { useState, useEffect } from "react";
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from "lucide-react";
import { useLocale, useTranslations } from "next-intl";
import { getLocalizedTestimonials } from "@/data/localizedData";
import { motion, AnimatePresence } from "framer-motion";

export function TestimonialsSection() {
  const [current, setCurrent] = useState(0);
  const locale = useLocale();
  const tTestimonials = useTranslations("testimonials");
  const testimonials = getLocalizedTestimonials(locale);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials.length]);

  const prevSlide = () => {
    setCurrent((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  };

  const activeTestimonial = testimonials[current] || testimonials[0];

  return (
    <section className="py-20 md:py-28 bg-[#070B14] text-white relative overflow-hidden border-t border-white/10">
      <div className="container mx-auto px-4 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold font-display text-white tracking-tight">
            {tTestimonials("title")}
          </h2>
          <p className="text-sm sm:text-base text-slate-300 leading-relaxed">
            {tTestimonials("subtitle")}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-3xl bg-slate-900/90 border border-white/10 p-8 sm:p-14 shadow-2xl">
          {/* Quote Icon Background */}
          <div className="absolute top-6 right-8 rtl:right-auto rtl:left-8 text-white/[0.04] pointer-events-none">
            <Quote className="h-24 w-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative z-10"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-teal-400">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-current" />
                ))}
              </div>

              {/* Quote Body */}
              <blockquote className="text-lg sm:text-2xl font-sans font-medium text-white leading-relaxed">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <div className="h-12 w-12 rounded-2xl bg-teal-500/20 text-teal-400 border border-teal-500/30 flex items-center justify-center font-display font-bold text-lg shadow-xs">
                    {activeTestimonial.initials}
                  </div>
                  <div>
                    <div className="font-bold text-white flex items-center gap-1.5">
                      <span>{activeTestimonial.name}</span>
                      <CheckCircle2 className="h-4 w-4 text-[#34AA49]" />
                    </div>
                    <div className="text-xs text-slate-400">
                      {activeTestimonial.role} • {activeTestimonial.location}
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                    className="h-10 w-10 rounded-full border border-white/10 bg-slate-800 text-white hover:border-teal-400 hover:text-teal-400 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronLeft className="h-5 w-5 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                    className="h-10 w-10 rounded-full border border-white/10 bg-slate-800 text-white hover:border-teal-400 hover:text-teal-400 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <ChevronRight className="h-5 w-5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}

export default TestimonialsSection;
