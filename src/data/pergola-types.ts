export interface PergolaType {
  id: string;
  slug: string;
  name: string;
  badge?: string;
  description: string;
  longDescription: string;
  chips: string[];
  photoId: string;
  image: string;
  material: "aluminum" | "wood" | "steel" | "composite" | "concrete";
  roofType: "louvered" | "retractable" | "fixed" | "open-beam" | "pitched";
  placement: "freestanding" | "attached" | "corner" | "flyover";
  specs: { label: string; value: string }[];
  features: string[];
}

export const pergolaTypesData: PergolaType[] = [
  {
    id: "aluminum-pergola",
    slug: "aluminum-pergola",
    name: "Aluminum Pergola",
    badge: "Popular",
    description:
      "Durable, lightweight, rust-resistant aluminum structures perfect for Dubai's climate. Low maintenance with modern aesthetics.",
    longDescription:
      "Our custom aluminum pergolas represent the gold standard for contemporary outdoor living in Dubai. Fabricated from heavy-duty 6063-T6 architectural extruded aluminum and finished with marine-grade Qualicoat powder coatings, they deliver absolute resistance to coastal humidity, intense solar UV radiation, and seasonal sandstorms with virtually zero maintenance.",
    chips: ["Weather Resistant", "Low Maintenance"],
    photoId: "1600585154526-990dced4db0d",
    image:
      "https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Material Grade", value: "6063-T6 Structural Aluminum" },
      { label: "Coating", value: "Qualicoat Class 2 Powder Coat" },
      { label: "Lifespan", value: "25+ Years" },
      { label: "Maintenance", value: "Zero maintenance (Occasional rinse)" },
      { label: "Warranty", value: "10 Years Comprehensive" },
    ],
    features: [
      "100% Rust-proof and corrosion-free formulation for UAE coastlines",
      "Available in 200+ RAL colors including textured and woodgrain effects",
      "Lightweight yet engineered for high wind load ratings up to 140 km/h",
      "Modular expansion capabilities for future shade attachments",
    ],
  },
  {
    id: "louvered-pergola",
    slug: "louvered-pergola",
    name: "Louvered Pergola",
    badge: "Premium",
    description:
      "Adjustable roof louvers for complete sun and rain control. Motorized options with smart home integration available.",
    longDescription:
      "The bio-climatic motorized louvered pergola is our most sought-after luxury outdoor solution in Dubai. With dual-wall aerofoil louvers that rotate smoothly from 0° to 140°, you can dial in precise sunlight, create cooling natural convection breezes, or close the roof completely into a 100% watertight barrier during rainfall.",
    chips: ["Adjustable Coverage", "Climate Control"],
    photoId: "1600607687939-ce8a6c25118c",
    image:
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "louvered",
    placement: "freestanding",
    specs: [
      { label: "Louver Tilt", value: "0° to 140° Motorized Rotation" },
      { label: "Motor Drive", value: "Somfy / Tuya Smart IoT Linear Actuators" },
      { label: "Drainage", value: "Integrated 4-corner internal downspouts" },
      { label: "Sensors", value: "Automatic Rain, Wind & Sunlight Detectors" },
      { label: "Warranty", value: "10 Years Frame / 5 Years Motor" },
    ],
    features: [
      "Smart automation via smartphone app, remote control, and voice assistants",
      "Perimeter LED strip lighting with dimming and RGB mood settings",
      "Concealed heavy-duty internal gutters prevent exterior water runoff",
      "Optional motorized side zip screens and infrared patio heaters",
    ],
  },
  {
    id: "wooden-pergola",
    slug: "wooden-pergola",
    name: "Wooden Pergola",
    badge: "Classic",
    description:
      "Traditional charm with natural wood beauty. Treated timber for enhanced durability in outdoor conditions.",
    longDescription:
      "Bring timeless organic warmth to your Dubai garden, villa courtyard, or rooftop terrace with our premium wooden pergolas. Crafted from sustainably harvested Teak, Iroko, Meranti, and autoclave pressure-treated Scandinavian timber, each pergola is treated with UV-blocking bio-oils to preserve its rich grain in desert heat.",
    chips: ["Natural Beauty", "Timeless Design"],
    photoId: "1600607687920-4e2a09cf159d",
    image:
      "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?w=800&q=80&auto=format&fit=crop",
    material: "wood",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Timber Species", value: "Burmese Teak, African Iroko, Pressure-Treated Pine" },
      { label: "Treatment", value: "Kiln-dried, Autoclave Class 4 & UV-Protective Oil" },
      { label: "Hardware", value: "Marine Grade 316 Stainless Steel Fasteners" },
      { label: "Aesthetic", value: "Natural matte grain or custom stain" },
      { label: "Warranty", value: "7 Years Structural" },
    ],
    features: [
      "Natural thermal insulator that stays cool to the touch under intense sun",
      "Custom carved rafter tails and classical architectural accents",
      "Sustainably sourced FSC-certified luxury hardwoods",
      "Pairs beautifully with climbing jasmine, bougainvillea, and ambient lighting",
    ],
  },
  {
    id: "steel-pergola",
    slug: "steel-pergola",
    name: "Steel Pergola",
    description:
      "Industrial strength with sleek modern lines. Powder-coated finish for maximum durability and corrosion resistance.",
    longDescription:
      "Engineered for monumental spans and bold industrial architectural statements, our structural steel pergolas combine immense load-bearing capacity with ultra-slender structural members. Hot-dip galvanized and finished with heavy-duty electrostatic powder coating, they withstand heavy rooftop equipment, suspended swings, and dramatic spans.",
    chips: ["Maximum Strength", "Modern Look"],
    photoId: "1600566752355-35792bedcfea",
    image:
      "https://images.unsplash.com/photo-1600566752355-35792bedcfea?w=800&q=80&auto=format&fit=crop",
    material: "steel",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Steel Grade", value: "S275 / S355 Structural Carbon Steel" },
      { label: "Corrosion Protection", value: "Hot-Dip Galvanized + Powder Coated (C4/C5)" },
      { label: "Clear Span", value: "Up to 12.0 meters without center columns" },
      { label: "Load Rating", value: "Heavy load-bearing (Swings, Hanging daybeds, AC units)" },
      { label: "Warranty", value: "10 Years Structural" },
    ],
    features: [
      "Ultra-slim structural profiles with immense architectural strength",
      "Capable of supporting heavy cantilevered overhangs and architectural roofs",
      "Industrial minimalist look highly favored by contemporary architects in UAE",
      "Precision robotic welding and seamless connection detailing",
    ],
  },
  {
    id: "freestanding-pergola",
    slug: "freestanding-pergola",
    name: "Freestanding Pergola",
    description:
      "Independent structure perfect for gardens, pools, or patios. Flexible placement without wall attachment required.",
    longDescription:
      "The freestanding pergola is a completely autonomous four-column (or multi-column) outdoor architectural pavilion that can be positioned anywhere across your property—by the swimming pool, amidst landscaped gardens, or on an open rooftop deck—without placing structural loads on villa walls.",
    chips: ["Flexible Placement", "Standalone Design"],
    photoId: "1600566753190-17f0baa2a6c3",
    image:
      "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Mounting", value: "Heavy-duty baseplates onto reinforced concrete footings" },
      { label: "Column Sizes", value: "120x120mm to 200x200mm structural extrusions" },
      { label: "Wind Rating", value: "Calculated up to Zone 3 UAE Wind Loads" },
      { label: "Configuration", value: "4-Post, 6-Post, or Multi-Bay Modular Layouts" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Independent structural integrity without relying on building envelopes",
      "Versatile zone definition for outdoor dining, poolside cabanas, or BBQs",
      "Internal column cable channels for hidden electrics and speakers",
      "Compatible with any roof system: louvered, glass, fabric, or lattice",
    ],
  },
  {
    id: "attached-pergola",
    slug: "attached-pergola",
    name: "Attached Pergola",
    description:
      "Connects directly to your home for seamless outdoor living extension. Ideal for terraces and patios.",
    longDescription:
      "Attached directly to your villa's external facade or structural slab, our attached pergolas create a natural transition between indoor living rooms and outdoor patios. By anchoring to the building facade on one side, it minimizes front columns for completely unobstructed garden views.",
    chips: ["Home Extension", "Seamless Flow"],
    photoId: "1600585154363-67eb9e2e2099",
    image:
      "https://images.unsplash.com/photo-1600585154363-67eb9e2e2099?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "open-beam",
    placement: "attached",
    specs: [
      { label: "Wall Attachment", value: "Chemical anchor bolts into structural concrete/masonry" },
      { label: "Thermal Barrier", value: "EPDM isolating gaskets between wall and ledger" },
      { label: "Slope Angle", value: "1° to 8° integrated pitch for water runoff" },
      { label: "Column Count", value: "Requires only 2 front posts for standard bays" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Directly extends shaded indoor comfort to outdoor terraces and balconies",
      "Reduces direct solar heat gain on villa windows and sliding doors",
      "Maximizes usable patio space by reducing ground post footprint",
      "Custom flashing and waterproof counter-flashing against villa facade",
    ],
  },
  {
    id: "gable-pergola",
    slug: "gable-pergola",
    name: "Gable Pergola",
    description:
      "Peaked roof design for enhanced rain drainage and architectural appeal. Classic pitched roof style.",
    longDescription:
      "Characterized by its vaulted triangular pitched roof, the gable pergola adds dramatic ceiling height, superior natural air ventilation, and a majestic architectural presence. The high pitched apex accelerates warm air dispersal, making the shaded area noticeably cooler during warm Dubai afternoons.",
    chips: ["Rain Drainage", "Architectural Style"],
    photoId: "1600585154340-be6161a56a0c",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "pitched",
    placement: "freestanding",
    specs: [
      { label: "Pitch Angle", value: "15° to 35° pitched roof slope" },
      { label: "Apex Height", value: "Up to 4.5m for expansive headroom" },
      { label: "Roof Options", value: "Solid Polycarbonate, Glass, or Louvered" },
      { label: "Ventilation", value: "Natural thermal stack effect" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Vaulted ceiling creates a spacious, cathedral-like outdoor room",
      "Superior thermal stack ventilation evacuates trapped hot air naturally",
      "Rapid rainwater and sand runoff along dual roof slopes",
      "Ideal location for central chandelier lighting and large ceiling fans",
    ],
  },
  {
    id: "retractable-pergola",
    slug: "retractable-pergola",
    name: "Retractable Pergola",
    badge: "Flexible",
    description:
      "Adjustable fabric canopy that retracts when not needed. Perfect for variable weather conditions.",
    longDescription:
      "Our retractable canopy pergola systems feature heavy-duty architectural PVC multi-layer membrane fabrics that glide along aluminum guide rails at the touch of a button. Fold the canopy back for stargazing under clear night skies or extend it fully for UV protection and water-tight shelter.",
    chips: ["Adjustable Shade", "Versatile"],
    photoId: "1512915922686-57c11dde9b6b",
    image:
      "https://images.unsplash.com/photo-1512915922686-57c11dde9b6b?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "retractable",
    placement: "attached",
    specs: [
      { label: "Canopy Fabric", value: "Mehler / Serge Ferrari 850g/m² Blackout PVC" },
      { label: "Wind Resistance", value: "Tested up to Beaufort Scale 11 (110 km/h)" },
      { label: "Motor Drive", value: "Somfy RTS / IO tubular drive motors" },
      { label: "Water Resistance", value: "100% Waterproof with drip-catch gutters" },
      { label: "Warranty", value: "5 Years Fabric & Motor / 10 Years Frame" },
    ],
    features: [
      "Full flexibility between open sky and complete sun/rain protection",
      "Flame-retardant (DIN 4102 B1) and 100% opaque blackout membrane",
      "Integrated dimmable LED lighting modules built into canvas profiles",
      "Quiet belt-driven sliding mechanism engineered for years of smooth use",
    ],
  },
  {
    id: "arched-pergola",
    slug: "arched-pergola",
    name: "Arched Pergola",
    description:
      "Elegant curved design adds sophistication to any outdoor space. Perfect for garden pathways and entrances.",
    longDescription:
      "With graceful curved structural beams, the arched pergola softens modern geometric architecture and creates romantic garden avenues, entrance arcades, or curved pool terrace coverings. Precision roll-bent aluminum or laminated timber curves are engineered without compromising structural stability.",
    chips: ["Elegant Design", "Garden Feature"],
    photoId: "1600566753086-00f18fb6b3ea",
    image:
      "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Curvature Radius", value: "Custom roll-bent from 2.0m to 12.0m radius" },
      { label: "Bending Method", value: "3-Roll CNC precision section bending" },
      { label: "Material", value: "Structural 6082-T6 Aluminum or Glulam Timber" },
      { label: "Finish", value: "Fine textured powder coat or anodized" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Sculptural curved aesthetic that enhances luxury villa landscape architecture",
      "Excellent pathway arbor for hanging flowering plants and accent spotlights",
      "Continuous smooth profile without sharp corners or visible seams",
      "Custom radius engineered to match site curvature and garden walkways",
    ],
  },
  {
    id: "gazebo",
    slug: "gazebo",
    name: "Gazebo",
    description:
      "Enclosed octagonal or circular structure with full roof coverage. Perfect for outdoor dining and entertainment.",
    longDescription:
      "Our bespoke modern gazebos provide a dedicated outdoor retreat featuring 360-degree views with a solid pitched or cupola roof. Whether configured in classic octagonal, hexagonal, or sleek rectangular geometries, our gazebos can be fitted with sliding glass screens, decorative mashrabiya panels, and AC cooling.",
    chips: ["Full Coverage", "360° Design"],
    photoId: "1600585154340-be6161a56a0c",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "fixed",
    placement: "freestanding",
    specs: [
      { label: "Geometry", value: "Octagonal, Hexagonal, Square, or Circular" },
      { label: "Roof Type", value: "Insulated Sandwich Panels or Double-Glazed Glass" },
      { label: "Enclosure Options", value: "Frameless Sliding Glass or Aluminum Louvers" },
      { label: "Diameter/Span", value: "3.5m to 8.0m standard sizes (custom available)" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Complete 360-degree outdoor immersion with insulated shelter overhead",
      "Can be fully enclosed and air-conditioned for year-round comfort in Dubai",
      "Integrated electrical layout for flat-screen TVs, surround sound, and lighting",
      "Built-in perimeter bench seating and luxury dining configurations available",
    ],
  },
  {
    id: "cabana-pergola",
    slug: "cabana-pergola",
    name: "Cabana Pergola",
    description:
      "Resort-style structure with fabric drapes and curtains. Ideal for poolside luxury and privacy.",
    longDescription:
      "Evoking the atmosphere of 5-star Dubai luxury resorts, our poolside cabana pergolas combine structured aluminum or timber framing with flowing outdoor sheer drapes, plush daybed platforms, and privacy louvers. Designed to provide intimate relaxation by pool decks and private beachfronts.",
    chips: ["Luxury Style", "Privacy Options"],
    photoId: "1600585154084-4e5fe7c39198",
    image:
      "https://images.unsplash.com/photo-1600585154084-4e5fe7c39198?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "louvered",
    placement: "freestanding",
    specs: [
      { label: "Drapes Fabric", value: "Sunbrella / Dickson marine-grade solution-dyed acrylic" },
      { label: "Sun Protection", value: "UPF 50+ UV filtration" },
      { label: "Frame Material", value: "Architectural Aluminum with custom wood-look finish" },
      { label: "Curtain Tracks", value: "Concealed stainless steel ceiling tracks" },
      { label: "Warranty", value: "10 Years Frame / 5 Years Fabrics" },
    ],
    features: [
      "Resort-caliber luxury poolside relaxation with flowing wind drapes",
      "Custom daybed dimensions with quick-dry outdoor foam upholstery",
      "Adjustable privacy panels to shield views from neighboring villas",
      "Water-repellent, mildew-resistant, and machine-washable fabrics",
    ],
  },
  {
    id: "pavilion",
    slug: "pavilion",
    name: "Pavilion",
    description:
      "Large covered outdoor structure for gatherings and events. Solid roof with open sides for ventilation.",
    longDescription:
      "Designed for grand outdoor entertaining, our commercial and residential pavilions cover expansive ground areas (from 50 m² to over 300 m²) with a solid insulated roof and open architectural colonnades. Perfect for hosting large family gatherings, VIP outdoor events, and hotel banquet lawns.",
    chips: ["Large Space", "Event Ready"],
    photoId: "1464146072230-91cabc968266",
    image:
      "https://images.unsplash.com/photo-1464146072230-91cabc968266?w=800&q=80&auto=format&fit=crop",
    material: "steel",
    roofType: "fixed",
    placement: "freestanding",
    specs: [
      { label: "Footprint", value: "50 m² to 500+ m² modular layout" },
      { label: "Roof Insulation", value: "50mm to 100mm PIR High Thermal Resistance Core" },
      { label: "Clear Span", value: "Engineered trusses spanning up to 15 meters" },
      { label: "Lighting Integration", value: "Recessed spotlights, chandeliers & perimeter cove LEDs" },
      { label: "Warranty", value: "10 Years Structural" },
    ],
    features: [
      "Massive covered footprint accommodating banquet seating for 50–200 guests",
      "Thermal PIR roof core drastically suppresses radiant solar heat",
      "Built-in outdoor kitchen, bar counter, and BBQ ventilation options",
      "Designed to withstand extreme UAE weather events with municipal engineering certification",
    ],
  },
  {
    id: "fiberglass-pergola",
    slug: "fiberglass-pergola",
    name: "Fiberglass Pergola",
    description:
      "Lightweight composite material resistant to rot, rust, and insects. Excellent for coastal environments.",
    longDescription:
      "Engineered from high-strength pultruded fiberglass reinforced polymers (FRP), our fiberglass pergolas offer an incredible strength-to-weight ratio with total immunity to saltwater corrosion, high humidity, rot, and insect damage. An outstanding choice for Palm Jumeirah and beachfront estates.",
    chips: ["Corrosion Proof", "Lightweight"],
    photoId: "1593696140826-c58b021acf8b",
    image:
      "https://images.unsplash.com/photo-1593696140826-c58b021acf8b?w=800&q=80&auto=format&fit=crop",
    material: "composite",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Composition", value: "Pultruded E-Glass Fiber Reinforced Polymer (FRP)" },
      { label: "Corrosion Resistance", value: "100% Saltwater & Chemical Proof" },
      { label: "Tensile Strength", value: "Greater than structural steel per weight unit" },
      { label: "Coating", value: "UV-Resistant Polyurethane gel-coat finish" },
      { label: "Warranty", value: "15 Years Comprehensive" },
    ],
    features: [
      "Zero corrosion in direct beachfront saltwater spray environments",
      "Never rots, splinters, warps, or attracts termites",
      "Lightweight structure ideal for sensitive roof terraces and timber decks",
      "Smooth automotive-grade factory finish that never requires repainting",
    ],
  },
  {
    id: "vinyl-pvc-pergola",
    slug: "vinyl-pvc-pergola",
    name: "Vinyl/PVC Pergola",
    description:
      "Maintenance-free synthetic material that never needs painting or staining. UV-resistant and weatherproof.",
    longDescription:
      "Constructed with heavy-gauge extruded PVC reinforced with internal aluminum or galvanized steel structural cores, our vinyl pergolas provide a bright, clean architectural aesthetic that never fades, yellows, chips, or requires seasonal restaining in Dubai's sunny climate.",
    chips: ["Zero Maintenance", "UV Resistant"],
    photoId: "1600298881974-6be191ceeda1",
    image:
      "https://images.unsplash.com/photo-1600298881974-6be191ceeda1?w=800&q=80&auto=format&fit=crop",
    material: "composite",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Outer Shell", value: "High-Impact Virgin Vinyl with TiO2 UV Stabilizers" },
      { label: "Internal Core", value: "Structural Aluminum / Galvanized Steel Inserts" },
      { label: "Color Fastness", value: "Guaranteed against chalking and yellowing" },
      { label: "Cleaning", value: "Simple garden hose wash" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Zero maintenance exterior: never needs sanding, staining, or painting",
      "Contains high concentrations of titanium dioxide (TiO2) to prevent UV degradation",
      "Crisp white or desert sand tones that maintain showroom luster for decades",
      "Internal metal reinforcement ensures structural rigidity without sagging",
    ],
  },
  {
    id: "fixed-roof-pergola",
    slug: "fixed-roof-pergola",
    name: "Fixed Roof Pergola",
    description:
      "Permanent solid roof structure for year-round protection. Polycarbonate or metal roofing options available.",
    longDescription:
      "When continuous 100% shade and weatherproof protection is required, our fixed roof pergolas provide an unyielding structural canopy. Built with insulated aluminum composite panels, tinted UV-absorbing multiwall polycarbonate, or double-glazed solar control safety glass.",
    chips: ["Full Protection", "Year-Round Use"],
    photoId: "1600047509807-ba8f99d2cdde",
    image:
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "fixed",
    placement: "attached",
    specs: [
      { label: "Roof Infill", value: "Insulated Sandwich Panel, Polycarbonate, or Glass" },
      { label: "Thermal Rating", value: "U-value up to 0.28 W/m²K (Insulated Panel)" },
      { label: "Waterproofing", value: "100% Hermetic EPDM gasket seals + perimeter gutters" },
      { label: "Impact Rating", value: "Shatterproof Class 1 impact certified" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Complete year-round protection from harsh Dubai sunlight, dust, and rain",
      "Insulated roof panel core significantly drops under-canopy temperature",
      "Seamless integration of ceiling fans, recessed downlights, and misting lines",
      "Engineered slope ensures swift rainwater drainage into hidden downspouts",
    ],
  },
  {
    id: "awning-pergola",
    slug: "awning-pergola",
    name: "Awning Pergola",
    description:
      "Hybrid design combining pergola structure with retractable awning. Motorized or manual operation.",
    longDescription:
      "The awning pergola bridges the gap between fixed architectural pergolas and folding lateral arm awnings. Combining a rigid frontal portal frame with motorized retractable fabric cassettes, it provides extensive shade extension over deep villa terraces and restaurant patios.",
    chips: ["Hybrid Design", "Retractable"],
    photoId: "1582268611958-ebfd161ef9cf",
    image:
      "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "retractable",
    placement: "attached",
    specs: [
      { label: "Projection", value: "Up to 6.0 meters projection from wall" },
      { label: "Cassette Type", value: "Full-cassette hermetic fabric enclosure" },
      { label: "Motorization", value: "Somfy motorized with wireless wind sensor" },
      { label: "Fabric", value: "Solution-dyed nano-coated acrylic fabric" },
      { label: "Warranty", value: "5 Years Mechanism / 10 Years Frame" },
    ],
    features: [
      "Canopy retracts completely into an aluminum cassette when not in use",
      "Automatic wind sensor retracts awning during unexpected desert gusts",
      "Front post support enables wider projections than traditional folding arm awnings",
      "Ideal for commercial restaurant dining terraces and residential patios",
    ],
  },
  {
    id: "corner-pergola",
    slug: "corner-pergola",
    name: "Corner Pergola",
    description:
      "L-shaped design perfect for corner spaces. Maximizes awkward areas with custom angled construction.",
    longDescription:
      "Transform underutilized garden corners, poolside nooks, or boundary angles into captivating outdoor conversation hubs. Our custom corner pergolas feature 90-degree L-shaped or radial layouts with integrated corner bench seating and privacy mashrabiya backdrops.",
    chips: ["Space Efficient", "Custom Angles"],
    photoId: "1600210492486-724fe5c67fb0",
    image:
      "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "open-beam",
    placement: "corner",
    specs: [
      { label: "Configuration", value: "90° L-Shape, Triangular, or Radial Custom Angle" },
      { label: "Structure", value: "Architectural Aluminum / Hardwood" },
      { label: "Seating", value: "Integrated floating hardwood corner benches" },
      { label: "Backdrop", value: "Acoustic or decorative CNC lattice privacy screens" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Optimizes boundary corners and difficult landscape geometries",
      "Creates an intimate, sheltered sanctuary for reading or private gatherings",
      "Integrated fire pit or water feature accommodations",
      "Custom engineered framing to align precisely with villa boundary walls",
    ],
  },
  {
    id: "flyover-pergola",
    slug: "flyover-pergola",
    name: "Flyover Pergola",
    description:
      "Elevated walkway or passage structure connecting two areas. Ideal for large estates and commercial properties.",
    longDescription:
      "Elevated above rooflines or connecting separate wings of a luxury villa estate, flyover pergolas create majestic shaded sky-walkways and grand architectural breezeways. By mounting structural brackets above the existing gutter line, they increase airflow and deliver majestic vertical scale.",
    chips: ["Elevated Design", "Connector"],
    photoId: "1600210491892-03d54c0aaf87",
    image:
      "https://images.unsplash.com/photo-1600210491892-03d54c0aaf87?w=800&q=80&auto=format&fit=crop",
    material: "aluminum",
    roofType: "open-beam",
    placement: "flyover",
    specs: [
      { label: "Mounting Bracket", value: "Engineered heavy-gauge Extenda-brackets over roof" },
      { label: "Elevation", value: "300mm to 1200mm above existing eaves line" },
      { label: "Ventilation", value: "Maximized 360-degree open airflow" },
      { label: "Lighting", value: "Linear under-beam LED runway lighting" },
      { label: "Warranty", value: "10 Years" },
    ],
    features: [
      "Extends roofline height, allowing natural light and cool breezes beneath",
      "Seamlessly connects guest pavilions, pool houses, and main villa wings",
      "Prevents low ceiling sensations common on single-story roof attachments",
      "Structurally calculated for high elevation wind currents in UAE",
    ],
  },
  {
    id: "concrete-pergola",
    slug: "concrete-pergola",
    name: "Concrete Pergola",
    description:
      "Ultra-durable masonry construction for permanent installations. Architectural statement with modern finishes.",
    longDescription:
      "For monumental brutalist or contemporary Mediterranean villa designs, our precast and cast-in-place concrete pergolas offer permanent architectural mass. Finished in smooth fair-faced architectural concrete, micro-cement, or stone plaster, they will endure for generations with zero weathering.",
    chips: ["Permanent", "Ultra Durable"],
    photoId: "1558618666-fcd25c85cd64",
    image:
      "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80&auto=format&fit=crop",
    material: "concrete",
    roofType: "open-beam",
    placement: "freestanding",
    specs: [
      { label: "Concrete Grade", value: "C40/50 Self-Compacting High-Strength Concrete" },
      { label: "Reinforcement", value: "Epoxy-Coated / Stainless Steel Rebar" },
      { label: "Finish", value: "Fair-Faced Off-Shutter, Micro-Cement, Travertine Render" },
      { label: "Durability", value: "50+ Years Permanent Structure" },
      { label: "Warranty", value: "15 Years Structural" },
    ],
    features: [
      "Monumental, permanent architectural statement that increases property appraisal",
      "Immune to all desert weathering, extreme UV, moisture, and sand",
      "Integrated architectural recesses for concealed LED linear lights and planters",
      "Engineered seismic and thermal expansion joints compliant with UAE codes",
    ],
  },
];
