export interface ProjectItem {
  id: string;
  slug: string;
  title: string;
  category: "Residential" | "Commercial" | "Villa" | "Hospitality" | "Hotel";
  description: string;
  fullNarrative: string;
  image: string;
  location: string;
  year: string;
  scope: string[];
  materials: string[];
  gallery: string[];
  relatedServices: string[];
  clientTestimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const projectsData: ProjectItem[] = [
  {
    id: "dubai-marina-luxury-tower",
    slug: "dubai-marina-luxury-tower",
    title: "Dubai Marina Luxury Tower",
    category: "Residential",
    description: "Complete facade system with minimal sliding doors",
    fullNarrative:
      "A landmark high-rise residential tower overlooking Dubai Marina featuring custom-engineered unitized aluminum curtain wall systems and over 320 minimal sliding door balcony assemblies. The building envelope delivers an acoustic attenuation of 45 dB to shield residents from marina activity while offering floor-to-ceiling panoramic Arabian Gulf views.",
    image:
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop",
    location: "Dubai Marina, Dubai, UAE",
    year: "2024",
    scope: [
      "Unitized structural glass curtain walling (14,500 m²)",
      "Minimal sliding doors for all terrace suites",
      "Structural glass balustrades with hidden shoe base channels",
      "Perimeter anodized architectural louver bands",
    ],
    materials: [
      "6063-T6 Architectural Extruded Aluminum",
      "Guardian SunGuard Double Silver Low-E Glass",
      "Qualicoat Class 2 Anodized Matte Bronze",
      "AISI 316 Stainless Steel Hardware",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
    ],
    relatedServices: ["facade-design-fabrication", "minimal-sliding-doors", "installation-project-management"],
    clientTestimonial: {
      quote: "Outstanding craftsmanship! The facade system they installed exceeded our expectations. On-time delivery, competitive pricing, and excellent after-sales support.",
      author: "Sarah Johnson",
      role: "Property Developer, Dubai Marina",
    },
  },
  {
    id: "business-bay-corporate-center",
    slug: "business-bay-corporate-center",
    title: "Business Bay Corporate Center",
    category: "Commercial",
    description: "High-performance glass facade with LEED certification",
    fullNarrative:
      "A prestigious 38-story commercial headquarters in Business Bay achieved LEED Gold certification thanks to our sustainable double-skin thermally broken facade engineering. The facade reduces solar heat gain by 40% while flooding executive office floors with glare-free natural daylight.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
    location: "Business Bay, Dubai, UAE",
    year: "2024",
    scope: [
      "High-performance double-glazed solar control curtain wall",
      "Integrated automated external shading louvers",
      "Frameless ground-floor lobby glass entrance portals",
      "Acoustic interior office partition walls",
    ],
    materials: [
      "Hydro CIRCAL Low-Carbon Recycled Aluminum",
      "Saint-Gobain Cool-Lite SKN High-Performance Glass",
      "Thermally Broken Polyamide Insulating Struts",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85&auto=format&fit=crop",
    ],
    relatedServices: ["sustainable-building-solutions", "facade-design-fabrication", "research-development"],
  },
  {
    id: "palm-jumeirah-private-villa",
    slug: "palm-jumeirah-private-villa",
    title: "Palm Jumeirah Private Villa",
    category: "Villa",
    description: "Custom bio-climatic pergola with smart automation",
    fullNarrative:
      "A luxury beachfront mansion on Palm Jumeirah featuring a 120 m² bespoke multi-zone bio-climatic louvered pergola system integrated with smart home weather sensors, motorized vertical privacy screens, and 4.2m tall minimal sliding glass patio walls opening out to the private beach.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
    location: "Palm Jumeirah Frond K, Dubai, UAE",
    year: "2024",
    scope: [
      "Multi-zone motorized louvered bio-climatic pergola (120 m²)",
      "Metro 20 minimal sliding glass doors (4.2m height)",
      "Integrated dimmable RGB LED and linear warm white cove lighting",
      "Concealed motorized ZIP drop screens with solar mesh",
    ],
    materials: [
      "Marine-Grade Qualicoat Seaside Aluminum",
      "Somfy Smart IoT Motors & Weather Sensors",
      "Laminated Low-E Safety Glass",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=85&auto=format&fit=crop",
    ],
    relatedServices: ["minimal-sliding-doors", "sustainable-building-solutions", "installation-project-management"],
    clientTestimonial: {
      quote: "Eco Pergola transformed our villa with their stunning minimal sliding doors. The quality is exceptional and the installation team was professional. Highly recommend for luxury projects in Dubai!",
      author: "Mohammed Al Rashid",
      role: "Villa Owner, Palm Jumeirah",
    },
  },
  {
    id: "downtown-dubai-restaurant",
    slug: "downtown-dubai-restaurant",
    title: "Downtown Dubai Restaurant",
    category: "Hospitality",
    description: "Retractable glass roof system with minimal framing",
    fullNarrative:
      "A Michelin-selected rooftop fine dining venue in Downtown Dubai overlooking Burj Khalifa. Eco Pergola designed and installed a motorized retractable glass skylight roof and frameless guillotine vertical glass balustrades that transition the restaurant between open-air terrace dining and climate-controlled luxury.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
    location: "Downtown Dubai, UAE",
    year: "2024",
    scope: [
      "Motorized telescopic retractable glass roof structure",
      "Motorized vertical sliding guillotine glass windows",
      "Custom laser-cut aluminum privacy screens",
      "Integrated high-pressure climate misting lines",
    ],
    materials: [
      "Heavy-Duty Structural Steel Framing with Powder Coat",
      "Double Glazed Tinted Solar Acoustic Glass",
      "Automated High-Torque Chain Drive Actuators",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
    ],
    relatedServices: ["glass-rooms-partitions", "architectural-products", "design-consultancy-services"],
    clientTestimonial: {
      quote: "We chose Eco Pergola for our hotel's glass roof system. Their innovative solutions and attention to detail are unmatched. The project was completed within budget and timeline. Excellent partner!",
      author: "Ahmed Hassan",
      role: "Hotel Manager, Downtown Dubai",
    },
  },
  {
    id: "jumeirah-beach-resort",
    slug: "jumeirah-beach-resort",
    title: "Jumeirah Beach Resort",
    category: "Hotel",
    description: "Panoramic sliding glass walls for beachfront suites",
    fullNarrative:
      "Upgrading 64 luxury beachfront suites with oversized 3-panel panoramic minimal sliding glass wall systems and custom poolside cabanas. Built with marine-grade coatings to withstand salty sea breezes while providing zero-threshold flush floor integration.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
    location: "Jumeirah Beach, Dubai, UAE",
    year: "2023",
    scope: [
      "64 panoramic beachfront suite sliding door sets",
      "Custom poolside luxury cabana pergolas",
      "Frameless structural glass poolside balustrades",
    ],
    materials: [
      "Qualicoat Seaside Certified Aluminum",
      "Heavy-Duty Micro-Bearing Stainless Steel Rollers",
      "Double Glazed Acoustic Low-E Safety Glass",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=1200&q=85&auto=format&fit=crop",
    ],
    relatedServices: ["minimal-sliding-doors", "architectural-products", "installation-project-management"],
  },
  {
    id: "arabian-ranches-estate",
    slug: "arabian-ranches-estate",
    title: "Arabian Ranches Estate",
    category: "Residential",
    description: "Outdoor living spaces with pergola and glass partitions",
    fullNarrative:
      "A complete luxury backyard transformation on a private Arabian Ranches villa plot including an expansive 85 m² freestanding aluminum pergola with motorized louvers, glass partition wind barriers, an outdoor kitchen pavilion, and integrated LED architectural landscape lighting.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
    location: "Arabian Ranches, Dubai, UAE",
    year: "2024",
    scope: [
      "Freestanding motorized louvered pergola (85 m²)",
      "Frameless glass wind barrier partitions",
      "Custom outdoor kitchen canopy with exhaust ducting",
      "Automated RGB/Warm ambient smart lighting package",
    ],
    materials: [
      "Architectural 6063-T6 Aluminum in Matte Anthracite",
      "12mm Toughened Clear Glass with Polished Edges",
      "Teak Timber Accents & Decking Integration",
    ],
    gallery: [
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=1200&q=85&auto=format&fit=crop",
    ],
    relatedServices: ["glass-rooms-partitions", "architectural-products", "design-consultancy-services"],
  },
];
