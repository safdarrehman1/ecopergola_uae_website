export interface ProductItem {
  id: string;
  categoryTag: string;
  title: string;
  copy: string;
  image: string;
  specs: { label: string; value: string }[];
  features: string[];
}

export const productsData: ProductItem[] = [
  {
    id: "metro-20-minimal-slider",
    categoryTag: "PANORAMIC SLIDER",
    title: "Metro 20 Minimal Slider",
    copy: "Ultra-slim profiles with maximum glass area for seamless indoor-outdoor living experiences with premium aluminum framing.",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1200&q=85&auto=format&fit=crop",
    specs: [
      { label: "Profile Width", value: "20mm Interlock" },
      { label: "Max Height", value: "Up to 4.5m" },
      { label: "Glass", value: "Double / Triple Glazed Low-E" },
      { label: "Threshold", value: "100% Flush Embedded Track" },
    ],
    features: [
      "Concealed outer frames recessed into floor, ceiling, and walls",
      "Effortless whisper-quiet roller bearings rated to 800kg",
      "Integrated motorized drive with smart phone app & wall switch control",
      "Superior thermal break technology designed for Dubai's extreme summers",
    ],
  },
  {
    id: "commercial-glass-facades",
    categoryTag: "FACADE SYSTEMS",
    title: "Commercial Glass Facades",
    copy: "High-performance facade systems for commercial buildings with advanced thermal and acoustic properties.",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1200&q=85&auto=format&fit=crop",
    specs: [
      { label: "System Type", value: "Unitized & Stick Curtain Wall" },
      { label: "Acoustic Rating", value: "Up to 48 dB Rw" },
      { label: "Thermal Value", value: "Ucw ≤ 1.3 W/m²K" },
      { label: "Wind Pressure", value: "Up to 4.5 kPa certified" },
    ],
    features: [
      "Custom engineered aluminum mullions and transoms with thermal isolators",
      "Solar control coatings to reduce cooling energy demand by up to 35%",
      "Engineered seismic movement joints and pressure-equalized drainage",
      "Tested and certified to ASTM, CWCT, and UAE Civil Defense fire codes",
    ],
  },
  {
    id: "bio-climatic-pergolas",
    categoryTag: "OUTDOOR SOLUTIONS",
    title: "Bio-Climatic Pergolas",
    copy: "Adjustable louver systems that provide optimal climate control for outdoor living spaces.",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
    specs: [
      { label: "Louver Rotation", value: "0° to 140° Motorized Tilt" },
      { label: "Max Span", value: "Up to 7.0m without intermediate posts" },
      { label: "Guttering", value: "Integrated perimeter drain channels" },
      { label: "Lighting", value: "Integrated dimmable RGB / Warm LED strips" },
    ],
    features: [
      "Automated rain, wind, and sun sensors with instant motorized closure",
      "Heavy-duty extruded architectural aluminum 6063-T6 construction",
      "Hidden internal downspouts preventing surface water splashing",
      "Compatible with motorized side zip screens and sliding glass walls",
    ],
  },
  {
    id: "transparent-living-spaces",
    categoryTag: "GLASS ROOMS",
    title: "Transparent Living Spaces",
    copy: "Modern glass room extensions that bring natural light into your living spaces with minimal framing.",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=1200&q=85&auto=format&fit=crop",
    specs: [
      { label: "Roof Glazing", value: "Laminated Solar Control Glass" },
      { label: "Frame Color", value: "Custom RAL & Metallic Finishes" },
      { label: "HVAC Integration", value: "Thermal break suitable for AC cooling" },
      { label: "Door Infill", value: "Minimal Sliders or Bi-fold Glass Panels" },
    ],
    features: [
      "Creates an insulated four-season sunroom or garden lounge",
      "Full solar UV and infrared radiation protection (blocking 99% UV)",
      "Engineered structural steel or reinforced aluminum roof beams",
      "Custom built to exact site dimensions and terrace geometries",
    ],
  },
  {
    id: "glass-spiral-staircases",
    categoryTag: "ARCHITECTURAL FEATURES",
    title: "Glass Spiral Staircases",
    copy: "Elegant glass spiral staircases with minimal aluminum railings for modern architectural statements.",
    image:
      "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=1200&q=85&auto=format&fit=crop",
    specs: [
      { label: "Tread Material", value: "Multi-layer Laminated Structural Glass" },
      { label: "Structure", value: "Stainless Steel / Aluminum Center Column" },
      { label: "Handrail", value: "Curved Glass or Brushed Brass / SS 316" },
      { label: "Load Capacity", value: "5.0 kN/m² Live Load Certified" },
    ],
    features: [
      "Anti-slip textured glass tread surface with LED edge illumination",
      "Seamless curved tempered glass side balustrades",
      "Precision robotic welding and mirror-polished / satin finishes",
      "A stunning centerpiece for luxury Dubai villas and penthouses",
    ],
  },
  {
    id: "professional-fabrication-team",
    categoryTag: "EXPERT CRAFTSMANSHIP",
    title: "Professional Fabrication Team",
    copy: "Skilled professionals delivering excellence in every project with precision, quality, and attention to detail.",
    image:
      "https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=1200&q=85&auto=format&fit=crop",
    specs: [
      { label: "Facility", value: "Dubai Industrial Area Manufacturing Hub" },
      { label: "Machinery", value: "5-Axis CNC Milling & Precision Cutting" },
      { label: "Certifications", value: "ISO 9001, ISO 14001, ISO 45001" },
      { label: "Team", value: "Certified European & GCC Master Fabricators" },
    ],
    features: [
      "In-house precision CNC machining ensuring sub-millimeter tolerances",
      "Rigorous multi-stage quality control from raw extrusions to finished units",
      "Pre-assembly and factory testing prior to on-site installation",
      "Dedicated after-sales maintenance and warranty support team",
    ],
  },
];
