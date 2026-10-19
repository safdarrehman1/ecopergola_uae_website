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
    <section id="about" className="py-20 sm:py-28 lg:py-36 bg-[#FAF8F5] relative overflow-hidden border-b border-stone-200">
      <div className="container mx-auto px-6 sm:px-10 lg:px-16 max-w-[1400px]">
        {/* Top Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16 sm:mb-24">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-[2px] bg-white border border-stone-200 text-[10px] sm:text-[11px] font-mono tracking-[0.2em] text-[#B38E5D] font-semibold uppercase shadow-none">
            <span className="h-1.5 w-1.5 rounded-full bg-[#B38E5D]" />
            <span>{tAbout("eyebrow")}</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-normal font-display text-stone-900 tracking-tight">
            {tAbout("title")}
          </h2>
          <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
            {tAbout("subtitle")}
          </p>
        </div>

        {/* Split Layout: Collage Left, Narrative Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center mb-24">
          {/* Left: Photography */}
          <div className="lg:col-span-6 relative">
            <div className="relative h-[460px] sm:h-[540px] w-full rounded-[2px] overflow-hidden shadow-none border border-stone-200 bg-stone-100">
              <Image
                src="https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1000&q=85&auto=format&fit=crop"
                alt="Eco Pergola precision fabrication workshop in Dubai"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover"
              />
              <div className="absolute inset-0 bg-stone-900/10" />
            </div>

            {/* Overlapping Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="absolute -bottom-6 -right-4 sm:-right-6 rtl:-right-auto rtl:-left-4 sm:rtl:-left-6 w-60 sm:w-72 bg-white p-5 rounded-[2px] shadow-none border border-stone-200"
            >
              <div className="flex items-center gap-3">
                <div className="h-11 w-11 rounded-[2px] bg-stone-900 flex items-center justify-center text-white shrink-0 font-normal font-display text-lg">
                  {siteConfig.yearsExperience}
                </div>
                <div>
                  <div className="text-xs font-semibold uppercase tracking-wider text-stone-900">
                    {tAbout("yearsOfExcellence")}
                  </div>
                  <div className="text-xs text-stone-500 font-light">
                    {tAbout("servingUae")}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right: Narrative Story */}
          <div className="lg:col-span-6 space-y-6">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-normal font-display text-stone-900 leading-snug">
                {tAbout("storyTitle")}
              </h3>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                {tAbout("storyP1")}
              </p>
              <p className="text-sm sm:text-base text-stone-600 font-light leading-relaxed">
                {tAbout("storyP2")}
              </p>
            </div>

            {/* Why Choose Us Checkpoints */}
            <div className="space-y-3 pt-2">
              <h4 className="text-xs font-mono uppercase tracking-widest text-[#B38E5D] font-semibold">
                {tAbout("whyChooseTitle")}
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                {whyChooseList.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs sm:text-sm text-stone-700 font-light">
                    <CheckCircle2 className="h-3.5 w-3.5 text-[#34AA49] shrink-0" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-4 flex items-center gap-4">
              <Button asChild size="lg" className="rounded-[2px] font-semibold bg-[#34AA49] hover:bg-[#268537] text-white">
                <Link href="/services">
                  <span>{tCommon("exploreServices")}</span>
                  <ArrowRight className="h-3.5 w-3.5 ml-2 rtl:rotate-180 rtl:mr-2 rtl:ml-0" />
                </Link>
              </Button>
              <Button asChild variant="outline" size="lg" className="rounded-[2px] font-semibold border-stone-300 bg-white hover:bg-stone-50 text-stone-900">
                <Link href="/contact">
                  <span>{tAbout("getEstimateCTA")}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* 4 Core Principles / Vision Cards */}
        <div className="space-y-8 pt-6 border-t border-stone-200">
          <div className="text-center max-w-2xl mx-auto space-y-2">
            <h3 className="text-2xl sm:text-3xl font-normal font-display text-stone-900">
              {tAbout("visionTitle")}
            </h3>
            <p className="text-xs sm:text-sm text-stone-500 font-light">
              {tAbout("visionSubtitle")}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {visionCards.map((card, index) => {
              const IconComp = card.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="rounded-[2px] p-6 bg-white border border-stone-200 space-y-4 hover:border-stone-400 transition-colors shadow-none"
                >
                  <div className="h-10 w-10 rounded-[2px] bg-stone-50 border border-stone-200 flex items-center justify-center text-[#B38E5D]">
                    <IconComp className="h-5 w-5" />
                  </div>
                  <h4 className="text-base font-normal font-display text-stone-900">
                    {card.title}
                  </h4>
                  <p className="text-xs text-stone-500 font-light leading-relaxed">
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

export default AboutSection;
