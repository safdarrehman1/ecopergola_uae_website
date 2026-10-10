export interface ServiceItem {
  id: string;
  slug: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  image: string;
  features: string[];
  specs: { label: string; value: string }[];
  benefits: string[];
  relatedPergolas?: string[];
  relatedProjects?: string[];
}

export const servicesData: ServiceItem[] = [
  {
    id: "facade-design-fabrication",
    slug: "facade-design-fabrication",
    title: "Facade Design & Fabrication",
    shortDescription:
      "High-quality facade systems combining aesthetics, functionality, and sustainability for modern architectural excellence.",
    fullDescription:
      "Eco Pergola delivers cutting-edge facade design, engineering, and precision fabrication services tailored for Dubai's demanding climate and prestigious architectural standards. Our facade systems blend structural aluminum profiles with high-performance low-E glass to achieve unmatched thermal efficiency, acoustic insulation, and breathtaking aesthetic impact for high-rise residential, commercial, and mixed-use developments.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
    features: [
      "Custom structural curtain wall systems (unitized and stick systems)",
      "High thermal break performance engineered for UAE extreme temperatures",
      "Acoustic attenuation up to 48dB for urban serenity",
      "Seismic, wind load, and blast resistance certified engineering",
      "LEED & Estidama compliant sustainable materials",
    ],
    specs: [
      { label: "Material", value: "6063-T6 Architectural Grade Aluminum" },
      { label: "Glass Options", value: "Double / Triple Glazed Low-E, Laminated" },
      { label: "Finish", value: "PVDF Coating / Anodized (Qualicoat Class 2)" },
      { label: "Wind Load", value: "Up to 4.5 kPa custom engineered" },
      { label: "Warranty", value: "10 Years Comprehensive" },
    ],
    benefits: [
      "Reduces cooling load by up to 35% through advanced thermal breaks",
      "Maximizes natural daylighting while mitigating solar heat gain",
      "Increases commercial property valuation and tenant appeal",
      "Engineered to withstand extreme sandstorm conditions and humidity",
    ],
    relatedPergolas: ["louvered-pergola", "fixed-roof-pergola"],
    relatedProjects: ["dubai-marina-luxury-tower", "business-bay-corporate-center"],
  },
  {
    id: "minimal-sliding-doors",
    slug: "minimal-sliding-doors",
    title: "Minimal Sliding Doors",
    shortDescription:
      "Ultra-slim profiles with maximum glass area for seamless indoor-outdoor living experiences with premium aluminum framing.",
    fullDescription:
      "Experience seamless architectural continuity with our state-of-the-art minimal sliding door systems. Designed with ultra-narrow sightlines (as slim as 20mm), these systems dissolve boundaries between indoor living spaces and Dubai's outdoor landscapes, terraces, and pool decks. Equipped with concealed bottom tracks and effortless motorized or manual sliding mechanisms.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
    features: [
      "Ultra-slim 20mm interlock sightline for panoramic views",
      "Concealed flush floor track for barrier-free transition",
      "Smooth multi-track configurations (up to 6 sliding panels)",
      "Smart motorized operation with smartphone & home automation integration",
      "Multi-point high security locking mechanisms",
    ],
    specs: [
      { label: "Sightline", value: "20mm ultra-narrow central interlock" },
      { label: "Max Panel Weight", value: "Up to 800 kg per panel" },
      { label: "Max Panel Height", value: "Up to 4.5 meters" },
      { label: "Thermal Value", value: "Uw down to 1.1 W/m²K" },
      { label: "Acoustic Rating", value: "Rw up to 43 dB" },
    ],
    benefits: [
      "Expansive uninterrupted panoramic views across Dubai's horizons",
      "Effortless glide with stainless steel micro-bearings",
      "Zero-trip hazard flush threshold design for seamless luxury living",
      "Weather-tight sealing against dust, rain, and desert winds",
    ],
    relatedPergolas: ["aluminum-pergola", "retractable-pergola"],
    relatedProjects: ["palm-jumeirah-private-villa", "jumeirah-beach-resort"],
  },
  {
    id: "sustainable-building-solutions",
    slug: "sustainable-building-solutions",
    title: "Sustainable Building Solutions",
    shortDescription:
      "Eco-friendly building solutions that minimize environmental impact while maximizing performance and aesthetics.",
    fullDescription:
      "At Eco Pergola, sustainability is built into our core philosophy. We engineer eco-conscious architectural systems utilizing recycled low-carbon aluminum, smart solar louvers, and thermally insulated glazing that drastically reduce building energy consumption across the UAE. Our solutions help residential and commercial properties attain Green Building Regulations and LEED Gold/Platinum certifications.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
    features: [
      "Hydro CIRCAL recycled aluminum with minimum 75% post-consumer scrap",
      "Bio-climatic automated shading to reduce HVAC energy consumption",
      "Integrated photovoltaic (BIPV) solar glass options",
      "Cradle-to-Cradle circular material sourcing",
      "Compliance with Dubai Green Building Regulations (Al Sa'fat)",
    ],
    specs: [
      { label: "Carbon Footprint", value: "< 2.3 kg CO2 per kg aluminum" },
      { label: "Energy Reduction", value: "Up to 40% in cooling load" },
      { label: "Compliance", value: "Al Sa'fat, LEED, Estidama Pearl" },
      { label: "Recyclability", value: "100% End-of-life recyclable" },
      { label: "Thermal Insulation", value: "U-values optimized for GCC Climate Zone 1" },
    ],
    benefits: [
      "Substantially lowers lifetime utility bills and operating expenses",
      "Contributes directly to UAE Net Zero 2050 targets",
      "Healthier indoor environmental quality with optimal natural light",
      "Long-term structural resilience requiring minimal maintenance",
    ],
    relatedPergolas: ["louvered-pergola", "cabana-pergola"],
    relatedProjects: ["business-bay-corporate-center", "palm-jumeirah-private-villa"],
  },
  {
    id: "glass-rooms-partitions",
    slug: "glass-rooms-partitions",
    title: "Glass Rooms & Partitions",
    shortDescription:
      "Transparent architectural extensions and minimal framing systems for modern residential and commercial applications.",
    fullDescription:
      "Create bright, functional, and soundproof spaces with our bespoke glass room extensions, conservatory enclosures, and acoustic interior partitions. Whether transforming an open terrace into a four-season glass solarium or configuring luxury office partition walls, our frameless and minimal-aluminum systems deliver timeless architectural clarity.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
    features: [
      "Custom frameless and slim-profile glass room enclosures",
      "Acoustic laminated glass partitions with sound ratings up to 50 dB",
      "Switchable smart privacy glass (PDLC) technology",
      "Integrated sliding and pivot glass door systems",
      "Weatherproof roof glazing with solar control tinting",
    ],
    specs: [
      { label: "Glass Thickness", value: "10mm to 24mm Toughened / Laminated" },
      { label: "Frame Finish", value: "Matte Black, Champagne, Brushed Brass, Anodized" },
      { label: "Sound Insulation", value: "36 dB to 50 dB Rw" },
      { label: "Door Types", value: "Pivot, Soft-Close Sliding, Telescopic" },
      { label: "Weather Sealing", value: "Double EPDM gaskets" },
    ],
    benefits: [
      "Expands usable living or office square footage year-round",
      "Creates acoustic privacy without sacrificing spatial openness",
      "Transforms outdoor terraces into climate-controlled luxury spaces",
      "Bespoke modular designs tailored to specific interior geometry",
    ],
    relatedPergolas: ["freestanding-pergola", "gazebo"],
    relatedProjects: ["arabian-ranches-estate", "downtown-dubai-restaurant"],
  },
  {
    id: "design-consultancy-services",
    slug: "design-consultancy-services",
    title: "Design & Consultancy Services",
    shortDescription:
      "Expert design consultation and project planning to bring your architectural vision to life with precision and creativity.",
    fullDescription:
      "Our team of specialized facade engineers, architects, and structural designers provide comprehensive technical consultancy from initial concept to fabrication sign-off. We utilize advanced 3D modeling, BIM integration, finite element structural analysis, and thermal simulation software to eliminate design clashes and ensure flawless execution.",
    image:
      "https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=1200&q=85&auto=format&fit=crop",
    features: [
      "BIM (Building Information Modeling) Level 2 coordination",
      "Finite Element structural calculations for wind and dead loads",
      "3D photorealistic architectural visualization and solar studies",
      "Shop drawings, fabrication schedules, and material take-offs",
      "Authority approvals & municipality compliance coordination in UAE",
    ],
    specs: [
      { label: "Software Stack", value: "Revit, Rhino, Grasshopper, AutoCAD, STAAD.Pro" },
      { label: "Simulation", value: "Thermal (Therm/Window), Solar Radiation, Structural FEA" },
      { label: "Turnaround", value: "24–48 hours for preliminary concepts" },
      { label: "Standards", value: "ASTM, EN, BS, UAE Fire and Life Safety Code" },
      { label: "Deliverables", value: "Full shop drawing package & 3D renders" },
    ],
    benefits: [
      "De-risks complex engineering challenges before fabrication commences",
      "Guarantees compliance with strict Dubai Municipality codes",
      "Optimizes material utilization and reduces project lead times",
      "Gives clients clear 3D visualization of the finished installation",
    ],
    relatedPergolas: ["steel-pergola", "arched-pergola"],
    relatedProjects: ["dubai-marina-luxury-tower", "arabian-ranches-estate"],
  },
  {
    id: "installation-project-management",
    slug: "installation-project-management",
    title: "Installation & Project Management",
    shortDescription:
      "Complete project management from concept to completion, ensuring quality installation and timely delivery every time.",
    fullDescription:
      "Eco Pergola executes turnkey project delivery with dedicated certified project managers, master craftsmen, and HSE officers. We maintain strict adherence to timeline milestones, quality control protocols, and zero-compromise safety practices across all residential villas, hotel resorts, and commercial developments in the UAE.",
    image:
      "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=1200&q=85&auto=format&fit=crop",
    features: [
      "Dedicated bilingual Project Manager assigned to every project",
      "Certified riggers and facade installation specialists",
      "Comprehensive site logistics, craneage, and scaffolding management",
      "Strict QA/QC inspections at every installation milestone",
      "Full compliance with UAE Health, Safety & Environment regulations",
    ],
    specs: [
      { label: "Safety Standard", value: "ISO 45001 & Dubai Municipality HSE" },
      { label: "Quality Standard", value: "ISO 9001:2015 Certified QA/QC" },
      { label: "Project Reporting", value: "Weekly milestone progress with site photos" },
      { label: "Warranty", value: "2 Years on Installation Workmanship + 10 Years Material" },
      { label: "Support", value: "24/7 dedicated site engineering response" },
    ],
    benefits: [
      "On-time delivery guarantee backed by disciplined scheduling",
      "Zero disruption to surrounding residential or commercial spaces",
      "Rigorous pre-handover snagging and watertightness testing",
      "Comprehensive operation manuals and post-handover care",
    ],
    relatedPergolas: ["attached-pergola", "pavilion"],
    relatedProjects: ["dubai-marina-luxury-tower", "jumeirah-beach-resort"],
  },
  {
    id: "architectural-products",
    slug: "architectural-products",
    title: "Architectural Products",
    shortDescription:
      "Innovative architectural solutions designed to enhance your space with style, efficiency, and long-lasting sustainability.",
    fullDescription:
      "Our bespoke architectural product lineup includes precision glass balustrades, architectural canopies, decorative laser-cut aluminum mashrabiya panels, motorized skylights, and custom stainless-steel hardware. Every component is engineered to deliver stunning visual refinement while performing reliably in harsh coastal desert climates.",
    image:
      "https://images.unsplash.com/photo-1497366216548-37526070297c?w=1200&q=85&auto=format&fit=crop",
    features: [
      "Frameless structural glass balustrades with LED base channels",
      "Custom laser-cut aluminum mashrabiya privacy screens",
      "Motorized opening roof lights and architectural canopies",
      "Marine-grade 316 stainless steel fittings and custom hardware",
      "Anodized and textured powder coat finishes in 200+ RAL colors",
    ],
    specs: [
      { label: "Balustrade Load", value: "Tested up to 3.0 kN/m line load" },
      { label: "Screen Thickness", value: "3mm to 8mm solid aluminum plate" },
      { label: "Hardware Grade", value: "AISI 316 Marine Grade Stainless Steel" },
      { label: "Coating Standard", value: "Qualicoat Seaside certified powder coating" },
      { label: "Customization", value: "100% parametric bespoke fabrication" },
    ],
    benefits: [
      "Adds signature luxury accents to interior and exterior spaces",
      "Provides elegant sun shading and culturally inspired privacy",
      "Corrosion-resistant materials built for Dubai waterfront properties",
      "Seamless integration with structural aluminum and glass framing",
    ],
    relatedPergolas: ["vinyl-pvc-pergola", "awning-pergola"],
    relatedProjects: ["arabian-ranches-estate", "downtown-dubai-restaurant"],
  },
  {
    id: "research-development",
    slug: "research-development",
    title: "Research & Development",
    shortDescription:
      "Continuous innovation in materials and techniques to stay at the forefront of architectural technology and design trends.",
    fullDescription:
      "Eco Pergola invests continuously in research and development to pioneer next-generation building envelopes. In collaboration with European engineering partners, our R&D division tests advanced thermal breaks, vacuum insulated glass, smart motorized mechanisms, and nano-coatings that repel dust and withstand high solar irradiance.",
    image:
      "https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1200&q=85&auto=format&fit=crop",
    features: [
      "In-house testing facility for wind, water penetration, and thermal cycle testing",
      "Development of proprietary ultra-slim aluminum profiles",
      "Testing of self-cleaning and hydrophilic glass coatings for GCC dust conditions",
      "Smart IoT integration for climate-reactive pergola louvers",
      "Life-cycle analysis for low-carbon building systems",
    ],
    specs: [
      { label: "Testing Rig", value: "AAMA 501.1 Dynamic Water & Air Infiltration" },
      { label: "Thermal Chamber", value: "-10°C to +80°C accelerated weather testing" },
      { label: "Patent Pipeline", value: "Proprietary gutter & interlocking seal designs" },
      { label: "Partnerships", value: "Leading European extrusion & hardware labs" },
      { label: "Certifications", value: "ISO 9001, ISO 14001, ISO 45001" },
    ],
    benefits: [
      "Pioneers industry-first technologies before standard market adoption",
      "Ensures zero failure rate in extreme UAE summer temperatures",
      "Custom engineering capabilities for bespoke architectural projects",
      "Protects client investments with rigorously verified structural integrity",
    ],
    relatedPergolas: ["louvered-pergola", "retractable-pergola"],
    relatedProjects: ["business-bay-corporate-center", "palm-jumeirah-private-villa"],
  },
];
