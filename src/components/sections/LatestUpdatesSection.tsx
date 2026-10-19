"use client";

import { useEffect, useState } from "react";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { ArrowRight, Bell, Calendar } from "lucide-react";
import { getLocalizedNews } from "@/data/localizedData";
import { Badge } from "@/components/ui/badge";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";

export function LatestUpdatesSection() {
  const [api, setApi] = useState<CarouselApi>();
  const [isPaused, setIsPaused] = useState(false);
  const locale = useLocale();
  const t = useTranslations("latestUpdates");
  const news = getLocalizedNews(locale);

  useEffect(() => {
    if (!api || isPaused) return;

    const interval = setInterval(() => {
      api.scrollNext();
    }, 4500);

    return () => clearInterval(interval);
  }, [api, isPaused]);

  return (
    <section className="py-12 bg-[#FAF8F5] border-y border-stone-200/80 relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-brass">
              <Bell className="h-5 w-5" />
            </div>
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-amber-800">
                {t("eyebrow")}
              </span>
              <h2 className="text-xl sm:text-2xl font-bold font-display text-stone-900">
                {t("title")}
              </h2>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-2 text-xs text-stone-600 font-medium">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-ping" />
            <span>{t("realtimeBadge")}</span>
          </div>
        </div>

        {/* Carousel Container with Pause on Hover */}
        <div
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          className="relative px-2 sm:px-12"
        >
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent className="-ml-4">
              {news.map((item) => (
                <CarouselItem key={item.id} className="pl-4 md:basis-1/2 lg:basis-1/3">
                  <div className="bg-white rounded-2xl p-6 h-full flex flex-col justify-between border border-stone-200/90 hover:border-brass/70 transition-all duration-300 group shadow-sm hover:shadow-lg">
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <Badge variant="brass" className="text-[10px] font-semibold">
                          {item.badge}
                        </Badge>
                        <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
                          <Calendar className="h-3 w-3 text-brass" />
                          <span>{item.date}</span>
                        </div>
                      </div>

                      <h3 className="text-base font-bold font-display text-foreground group-hover:text-brass transition-colors line-clamp-2">
                        {item.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-3">
                        {item.summary}
                      </p>
                    </div>

                    <div className="pt-4 mt-2 border-t border-stone-100">
                      <Link
                        href={item.ctaLink}
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-brass hover:text-brass-dark group/btn transition-colors"
                      >
                        <span>{item.ctaText}</span>
                        <ArrowRight className="h-3.5 w-3.5 rtl:rotate-180 group-hover/btn:translate-x-1 rtl:group-hover/btn:-translate-x-1 transition-transform" />
                      </Link>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>

            <CarouselPrevious className="hidden sm:flex -left-4 bg-white hover:bg-brass hover:text-stone-950 border-stone-200 shadow-sm" />
            <CarouselNext className="hidden sm:flex -right-4 bg-white hover:bg-brass hover:text-stone-950 border-stone-200 shadow-sm" />
          </Carousel>
        </div>
      </div>
    </section>
  );
}
