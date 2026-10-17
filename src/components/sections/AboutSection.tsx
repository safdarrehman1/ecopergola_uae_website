"use client";

import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { CheckCircle2, Shield, Leaf, Lightbulb, Users, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { siteConfig } from "@/lib/siteConfig";

export function AboutSection() {
  const locale = useLocale();
  const tAbout = useTranslations("about");
  const tCommon = useTranslations("common");

  const whyChooseList =
    locale === "ar"
      ? [
          "أنظمة إدارة جودة معتمدة بشهادات ISO العالمية",
          "تصنيع هندسي دقيق بمعايير وتقنيات ألمانية",
          "تغطية ضمان شاملة لمدة 10 سنوات على الهياكل",
          "حلول مستدامة موفرة للطاقة ومطابقة للمباني الخضراء",
          "فريق دعم واستشارات فنية متكامل على مدار الساعة",
          "التزام صارم بمواعيد التسليم والتركيب الميداني",
        ]
      : locale === "fr"
      ? [
          "Systèmes de gestion de la qualité certifiés ISO",
          "Ingénierie de précision et savoir-faire technologique allemand",
          "Garantie décennale complète de 10 ans",
          "Solutions durables et éco-énergétiques certifiées LEED",
          "Accompagnement et support technique dédié 24/7",
          "Garantie de livraison et pose dans les délais",
        ]
      : [
          "ISO-certified quality management systems",
          "German-engineered precision manufacturing",
          "10-year comprehensive warranty coverage",
          "Energy-efficient sustainable solutions",
          "24/7 dedicated customer support",
          "On-time project delivery guarantee",
        ];

  const visionCards =
    locale === "ar"
      ? [
          {
            title: "الريادة في الاستدامة",
            description:
              "ابتكار حلول بناء صديقة للبيئة تقلل الانبعاثات الكربونية وتوفر استهلاك الطاقة بكفاءة عالية.",
            icon: Leaf,
          },
          {
            title: "الابتكار والتكنولوجيا",
            description:
              "تطوير مستمر لأنظمة الواجهات والمنتجات المعمارية من خلال البحث والتطوير وأحدث ماكينات التصنيع.",
            icon: Lightbulb,
          },
          {
            title: "التميز في خدمة العملاء",
            description:
              "تقديم حلول متكاملة ومخصصة مع خدمة استثنائية للمهندسين المعماريين والمطورين وأصحاب الفلل.",
            icon: Users,
          },
          {
            title: "ضمان الجودة الصارمة",
            description:
              "تطبيق أعلى معايير الجودة العالمية في كل مرحلة من مراحل التصميم والتصنيع والتركيب.",
            icon: Shield,
          },
        ]
      : locale === "fr"
      ? [
          {
            title: "Leadership en Durabilité",
            description:
              "Pionniers des solutions architecturales écologiques réduisant l'empreinte carbone et maximisant l'efficacité énergétique.",
            icon: Leaf,
          },
          {
            title: "Innovation & Technologie",
            description:
              "Perfectionnement constant des systèmes de façades et de vitrages grâce à la R&D et aux technologies de pointe.",
            icon: Lightbulb,
          },
          {
            title: "Excellence Client",
            description:
              "Accompagnement personnalisé et solutions clés en main pour architectes, promoteurs et propriétaires de prestige.",
            icon: Users,
          },
          {
            title: "Assurance Qualité",
            description:
              "Contrôles rigoureux et conformité aux standards internationaux à chaque étape de conception et pose.",
            icon: Shield,
          },
        ]
      : [
          {
            title: "Sustainability Leadership",
            description:
              "Pioneering eco-friendly building solutions that reduce carbon footprint while maximizing energy efficiency and performance.",
            icon: Leaf,
          },
          {
            title: "Innovation & Technology",
            description:
              "Continuously advancing facade systems and architectural products through R&D and cutting-edge manufacturing techniques.",
            icon: Lightbulb,
          },
          {
            title: "Client Excellence",
            description:
              "Delivering personalized, turnkey solutions with exceptional service for architects, developers, and luxury homeowners.",
            icon: Users,
          },
          {
            title: "Quality Assurance",
            description:
              "Maintaining stringent quality controls and international standards across every phase of design, production, and installation.",
            icon: Shield,
          },
        ];

  return (
    <section id="about" className="py-20 md:py-28 bg-[#FAF8F5] relative overflow-hidden">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-20">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/90 border border-amber-300/80 text-[11px] font-mono tracking-widest text-amber-900 font-semibold uppercase shadow-xs">
            <span className="h-2 w-2 rounded-full bg-brass animate-pulse" />
            <span>{tAbout("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold font-display text-stone-900 tracking-tight">
            {tAbout("title")}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 leading-relaxed">
            {tAbout("subtitle")}
          </p>
        </div>

        {/* Split Layout: Collage Left, Narrative Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left: Layered Image Collage with Parallax */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[460px] sm:h-[540px] w-full rounded-3xl overflow-hidden shadow-2xl border border-border">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=85&auto=format&fit=crop"
                alt="Eco Pergola precision fabrication workshop in Dubai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
            </div>

            {/* Overlapping Secondary Card */}
            <motion.div
              initial={{ opacity: 0, x: 20, y: 20 }}
              whileInView={{ opacity: 1, x: 0, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="absolute -bottom-8 -right-4 sm:-right-8 rtl:-right-auto rtl:-left-4 sm:rtl:-left-8 w-60 sm:w-72 bg-white p-5 rounded-2xl shadow-xl border border-stone-200/90"
            >
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-xl bg-brass flex items-center justify-center text-stone-950 shrink-0 font-bold font-display text-xl">
                  {siteConfig.yearsExperience}
                </div>
                <div>
                  <div className="text-xs font-bold uppercase tracking-wider text-amber-800">
                    {tAbout("yearsOfExcellence")}
                  </div>
                  <div className="text-xs text-stone-600">
                    {tAbout("servingUae")}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground leading-snug">
                {tAbout("storyTitle")}
              </h3>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tAbout("storyP1")}
              </p>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                {tAbout("storyP2")}
              </p>
            </div>

            {/* Why Choose Us Checkpoints */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-bold uppercase tracking-wider text-brass">
                {tAbout("whyChooseTitle")}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {whyChooseList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-foreground font-medium">
                    <CheckCircle2 className="h-4 w-4 text-brass shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button asChild variant="brass" size="lg" className="rounded-xl font-semibold">
                <Link href="/services">
                  <span>{tCommon("exploreServices")}</span>
                  <ArrowRight className="h-4 w-4 ml-2 rtl:rotate-180 rtl:mr-2 rtl:ml-0" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-xl font-semibold border-stone-200 bg-white hover:bg-stone-50 text-stone-900">
                <Link href="/contact">
                  <span>{tAbout("getEstimateCTA")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Core Principles / Vision Cards */}
        <div className="space-y-8">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-bold font-display text-foreground">
              {tAbout("visionTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {tAbout("visionSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionCards.map((card, index) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-2xl p-6 bg-white border border-stone-200/90 space-y-4 hover:border-brass/70 transition-all shadow-sm hover:shadow-lg"
                >
                  <div className="h-10 w-10 rounded-xl bg-amber-50 border border-amber-200/60 flex items-center justify-center text-brass">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-bold font-display text-foreground">
                    {card.title}
                  </h4>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    {card.description}
                  </p>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
