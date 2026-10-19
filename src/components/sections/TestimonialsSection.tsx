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
    <section className="py-20 sm:py-28 lg:py-36 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200">
      <div className="container mx-auto px-6 max-w-5xl relative z-10">
        {/* Section Header */}
        <div className="text-center space-y-4 mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white border border-stone-200 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#B38E5D] font-semibold uppercase shadow-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B38E5D]" />
            <span>{tTestimonials("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-display text-stone-900 tracking-tight">
            {tTestimonials("title")}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            {tTestimonials("subtitle")}
          </p>
        </div>

        {/* Testimonial Card */}
        <div className="relative rounded-[2px] bg-white border border-stone-200 p-8 sm:p-14 shadow-none">
          <div className="absolute top-6 right-8 rtl:right-auto rtl:left-8 text-stone-900/5 pointer-events-none">
            <Quote className="h-20 w-20" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.4 }}
              className="space-y-6 relative z-10"
            >
              {/* Star Rating */}
              <div className="flex items-center gap-1 text-[#B38E5D]">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>

              {/* Quote Body */}
              <blockquote className="text-lg sm:text-2xl font-display font-normal text-stone-900 leading-relaxed italic">
                &ldquo;{activeTestimonial.quote}&rdquo;
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between pt-6 border-t border-stone-100">
                <div className="flex items-center gap-4">
                  <div className="h-11 w-11 rounded-[2px] bg-stone-100 text-stone-900 border border-stone-200 flex items-center justify-center font-display text-base">
                    {activeTestimonial.initials}
                  </div>
                  <div>
                    <div className="font-semibold text-stone-900 flex items-center gap-1.5 text-sm">
                      <span>{activeTestimonial.name}</span>
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#34AA49]" />
                    </div>
                    <div className="text-xs text-stone-500 font-light">
                      {activeTestimonial.role} • {activeTestimonial.location}
                    </div>
                  </div>
                </div>

                {/* Carousel Controls */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevSlide}
                    aria-label="Previous testimonial"
                    className="h-9 w-9 rounded-[2px] border border-stone-300 hover:border-stone-500 bg-white flex items-center justify-center transition-colors cursor-pointer text-stone-700"
                  >
                    <ChevronLeft className="h-4 w-4 rtl:rotate-180" />
                  </button>
                  <button
                    onClick={nextSlide}
                    aria-label="Next testimonial"
                    className="h-9 w-9 rounded-[2px] border border-stone-300 hover:border-stone-500 bg-white flex items-center justify-center transition-colors cursor-pointer text-stone-700"
                  >
                    <ChevronRight className="h-4 w-4 rtl:rotate-180" />
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
