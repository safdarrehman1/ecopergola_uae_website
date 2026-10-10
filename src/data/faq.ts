export interface FaqItem {
  id: string;
  question: string;
  answer: string;
  category: "General" | "Installation" | "Warranty" | "Customization";
}

export const faqData: FaqItem[] = [
  {
    id: "areas-served-uae",
    category: "General",
    question: "What areas do you serve in UAE?",
    answer:
      "We provide services throughout Dubai and all emirates including Abu Dhabi, Sharjah, Ajman, Ras Al Khaimah, Fujairah, and Umm Al Quwain. Our installation team travels across UAE for residential, commercial, and industrial projects.",
  },
  {
    id: "installation-timeline",
    category: "Installation",
    question: "How long does installation typically take?",
    answer:
      "Installation timeline varies by project size. Small residential projects take 3-7 days, medium commercial projects 2-4 weeks, and large facade systems 6-12 weeks. We provide detailed timelines during consultation.",
  },
  {
    id: "warranty-coverage",
    category: "Warranty",
    question: "Do you offer warranty on products and installation?",
    answer:
      "Yes! We offer a comprehensive 10-year warranty on all aluminum and glass products, plus 2 years on installation workmanship. Our premium German-engineered systems come with manufacturer warranties up to 15 years.",
  },
  {
    id: "climate-suitability",
    category: "General",
    question: "Are your products suitable for Dubai's climate?",
    answer:
      "Absolutely! All our products are specifically designed and tested for UAE's harsh climate. They feature UV-resistant coatings, thermal breaks, and high-performance glass to withstand extreme heat, humidity, and sandstorms.",
  },
  {
    id: "residential-commercial-capability",
    category: "General",
    question: "Can you handle both residential and commercial projects?",
    answer:
      "Yes, we specialize in both sectors. From luxury villas and apartments to hotels, offices, and shopping centers. We've completed over 500 projects including high-rise towers, standalone villas, and commercial complexes.",
  },
  {
    id: "free-consultation-quotation",
    category: "Customization",
    question: "Do you provide free consultation and quotation?",
    answer:
      "Yes! We offer complimentary on-site consultations, 3D design visualization, and detailed quotations at no charge. Our expert team will assess your requirements and provide tailored solutions within 24-48 hours.",
  },
];
