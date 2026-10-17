import fs from "fs";
import path from "path";
import crypto from "crypto";

import { servicesData } from "../src/data/services";
import { pergolaTypesData } from "../src/data/pergola-types";
import { projectsData } from "../src/data/projects";
import { productsData } from "../src/data/products";
import { faqData } from "../src/data/faq";
import { newsData } from "../src/data/news";
import { blogData } from "../src/data/blog";
import { testimonialsData } from "../src/data/testimonials";
import { siteConfig } from "../src/lib/siteConfig";

// Generate deterministic UUIDv4 from a string seed
function createUUID(seed: string): string {
  const hash = crypto.createHash("sha256").update(seed).digest("hex");
  return [
    hash.slice(0, 8),
    hash.slice(8, 12),
    "4" + hash.slice(13, 16),
    ((parseInt(hash.slice(16, 18), 16) & 0x3f) | 0x80).toString(16) + hash.slice(18, 20),
    hash.slice(20, 32),
  ].join("-");
}

const contentDir = path.join(process.cwd(), "content");
if (!fs.existsSync(contentDir)) {
  fs.mkdirSync(contentDir, { recursive: true });
}

// ==========================================
// 1. PERGOLA TYPES SEED (19 Types)
// ==========================================
const pergolaArMap: Record<string, { name?: string; badge?: string; description?: string; longDescription?: string }> = {
  "aluminum-pergola": {
    name: "برجولا ألمنيوم",
    badge: "الأكثر طلباً",
    description: "هياكل ألمنيوم قوية وخفيفة ومقاومة للصدأ، مصممة خصيصاً لمناخ دبي وتتحمل الرطوبة والحرارة.",
    longDescription: "تعتبر برجولات الألمنيوم من إيكو برجولا الخيار المفضل للمنازل والفلل الحديثة في دبي بفضل مقاومتها العالية للتآكل، ووزنها الخفيف، وعمرها الافتراضي الطويل دون الحاجة لصيانة مستمرة.",
  },
  "louvered-pergola": {
    name: "برجولا شرائح ذكية (بيوكليماتيك)",
    badge: "فاخرة",
    description: "شرائح سقف متحركة وقابلة للدوران للتحكم الكامل في أشعة الشمس والتهوية ومياه الأمطار بمحركات ذكية.",
    longDescription: "تتيح لك البرجولا ذات الشرائح القابلة للتعديل التحكم الدقيق في كمية الضوء والتهوية، مع إغلاق تام مقاوم للأمطار وحساسات طقس ذكية مدمجة.",
  },
  "wooden-pergola": {
    name: "برجولا خشبية طبيعية",
    badge: "كلاسيكية",
    description: "سحر الخشب الطبيعي المعالج والمعزول بمقاومة عالية للشمس والحرارة لإضفاء دفء طبيعي على الحديقة.",
    longDescription: "مصنوعة من أخشاب التيك والماهوجني المعالجة بتقنيات خاصة لمقاومة أشعة الشمس القوية وعوامل الطقس في الإمارات مع الحفاظ على المظهر الطبيعي الأخاذ.",
  },
  "steel-pergola": {
    name: "برجولا فولاذية هيكلية",
    description: "هيكل فولاذي مخصص للمساحات الكبيرة والامتدادات الواسعة بدون أعمدة وسيطة.",
    longDescription: "قدرة تحمل استثنائية تسمح بإنشاء بحور إنشائية واسعة ومساحات مظللة ضخمة دون الحاجة لأعمدة إضافية تعيق الحركة.",
  },
  "freestanding-pergola": {
    name: "برجولا مستقلة (قائمة بذاتها)",
    description: "هيكل مستقل ومثالي للحدائق وجوانب المسابح والجلسات الخارجية دون الحاجة للتثبيت على الجدران.",
    longDescription: "تمنحك حرية كاملة في اختيار موقع جلستك المفضلة بالحديقة أو بجانب المسبح كجناح مستقل وأنيق بتصميم عصري ومتين.",
  },
  "attached-pergola": {
    name: "برجولا متصلة بالفيلا",
    description: "تتصل مباشرة بواجهة المنزل لإنشاء امتداد طبيعي ومظلل يربط بين الصالات الداخلية والحديقة.",
    longDescription: "امتداد معماري أنيق ومتكامل يقلل من حرارة الجدران الخارجية ويوفر مساحة استرخاء فسيحة على الشرفات والتراسات.",
  },
  "gable-pergola": {
    name: "برجولا سقف جمالوني مائل",
    description: "سقف مائل يسمح بتصريف فوري للمياه مع ارتفاع داخلي يمنح شعوراً بالاتساع والرحابة.",
    longDescription: "تصميم هندسي مائل يوفر ارتفاعاً داخلياً إضافياً وتصريفاً فعالاً لمياه الأمطار مع إمكانية دمج كسوات خشبية أو زجاجية.",
  },
  "retractable-pergola": {
    name: "برجولا سقف قابل للطي",
    badge: "مرنة",
    description: "سقف قماشي أو ألمنيوم قابل للفتح والإغلاق بالكامل بضغطة زر مع إضاءة LED مدمجة.",
    longDescription: "حل مثالي يمنحك حرية الاختيار بين السماء المفتوحة نهاراً أو ليلاً، والتغطية الكاملة للحماية من الشمس أو المطر بنظام محركات هادئ وسلس.",
  },
  "arched-pergola": {
    name: "برجولا مقوسة كلاسيكية",
    description: "تصميم مقوس انسيابي يضفي لمسة من النعومة والأناقة المعمارية على المداخل والممرات.",
    longDescription: "هيكل مقوس بنعومة يكسر الخطوط الحادة ويخلق ممرات حدائق ساحرة ومداخل فاخرة للفلل والقصور.",
  },
  "gazebo": {
    name: "مظلة جازيبو للحدائق",
    description: "هياكل حدائق متميزة توفر جلسة خارجية مغطاة بالكامل ومريحة للقاءات العائلية.",
    longDescription: "أجنحة حدائق قائمة بذاتها مثالية للجلسات العائلية واستقبال الضيوف في الهواء الطلق مع توفير حماية كاملة من أشعة الشمس.",
  },
  "cabana-pergola": {
    name: "كابانا مسابح فاخرة",
    description: "مقصورات استرخاء أنيقة مخصصة لجانب المسابح والمنتجعات مع ستائر خصوصية مدمجة.",
    longDescription: "كابانات مصممة خصيصاً لأحواض السباحة والشواطئ الخاصة، تجمع بين الراحة والخصوصية مع خيارات الستائر والفرش الفاخر.",
  },
  "pavilion": {
    name: "بافيليون جناح الحديقة",
    description: "هيكل خارجي مستقل متعدد الاستخدامات يوفر مساحة ترفيهية ضخمة للقصور والفلل.",
    longDescription: "مبنى خارجي مستقل متكامل يجمع بين مميزات البرجولا والغرف الزجاجية ليوفر مساحة ضيافة وترفيه استثنائية لجميع الفصول.",
  },
  "fiberglass-pergola": {
    name: "برجولا ألياف زجاجية (فايبر جلاس)",
    description: "مادة مركبة فائقة الخفة ومقاومة تماماً للتآكل والصدأ ورطوبة السواحل البحرية.",
    longDescription: "أفضل خيار للمناطق القريبة من البحر بفضل مناعتها المطلقة ضد الصدأ والتملح والأشعة فوق البنفسجية دون الحاجة لإعادة طلاء.",
  },
  "vinyl-pvc-pergola": {
    name: "برجولا فينيل / PVC بدون صيانة",
    description: "مواد صناعية معزولة ومقاومة للأشعة فوق البنفسجية لا تحتاج إلى طلاء أو صيانة مدى الحياة.",
    longDescription: "هياكل متينة لا تصدأ ولا تتشقق ولا يتغير لونها بفعل شمس دبي القوية، مع قلب ألمنيوم داخلي لضمان أقصى درجات الثبات الهيكلي.",
  },
  "fixed-roof-pergola": {
    name: "برجولا سقف ثابت معزول",
    description: "سقف ثابت صلب يوفر حماية كاملة ومستمرة من أشعة الشمس والأمطار على مدار العام.",
    longDescription: "خيار رائع لتوفير ظل دائم وعزل حراري فائق للمطابخ الخارجية وجلسات الشواء والتراسات الكبيرة في دبي.",
  },
  "awning-pergola": {
    name: "برجولا مع مظلة كاسيت متحركة",
    description: "تصميم هجين يجمع بين متانة هيكل البرجولا ومرونة المظلة المتحركة بمحرك ذكي وحساسات رياح.",
    longDescription: "تمكنك من طي القماش بالكامل داخل صندوق ألمنيوم محكم لحمايته من الأتربة عند عدم الاستخدام مع فتح سلس بلمسة زر.",
  },
  "corner-pergola": {
    name: "برجولا زاوية مخصصة",
    description: "تصميم على شكل حرف L مصمم هندسياً لاستغلال الزوايا والمساحات الخارجية غير المستغلة بكفاءة.",
    longDescription: "تحول زوايا الحدائق وأسوار الفلل إلى جلسات مريحة ودافئة مع مقاعد مدمجة وخلفيات مشربية خشبية أو ألمنيوم.",
  },
  "flyover-pergola": {
    name: "برجولا فلاي أوفر مرتفعة",
    description: "هيكل ممر مرتفع يربط بين أجنحة الفيلا أو يعلو سقف المنزل لزيادة تدفق الهواء والإضاءة الطبيعية.",
    longDescription: "تثبت أعلى خط السقف لمنح شعور بالارتفاع والرحابة الفائقة مع تعزيز حركة نسيم الهواء الطبيعي في التراسات الفاخرة.",
  },
  "concrete-pergola": {
    name: "برجولا خرسانية معمارية",
    description: "هيكل خرساني صلب ودائم بتشطيبات معمارية حديثة تدوم لأجيال بمتانة لا تضاهى.",
    longDescription: "كتل معمارية أنيقة تعكس الطابع الحداثي والمتوسطي الفاخر، صممت لتكون جزءاً دائماً من البناء بدون أي تأثر بعوامل المناخ الصحراوي.",
  },
};

const pergolaFrMap: Record<string, { name?: string; badge?: string; description?: string; longDescription?: string }> = {
  "aluminum-pergola": {
    name: "Pergola en Aluminium",
    badge: "Populaire",
    description: "Structure en aluminium robuste, légère et anticorrosion, idéale pour le climat ensoleillé de Dubaï.",
    longDescription: "Les pergolas en aluminium Eco Pergola allient légèreté, longévité exceptionnelle et résistance parfaite aux embruns marins et aux températures extrêmes sans aucun entretien requis.",
  },
  "louvered-pergola": {
    name: "Pergola Bioclimatique à Lames",
    badge: "Premium",
    description: "Lames orientables motorisées pour une gestion sur mesure de l'ensoleillement et une protection pluie totale.",
    longDescription: "Grâce à ses lames orientables motorisées, cette pergola régule naturellement la température, la lumière et la ventilation avec capteurs météo intelligents.",
  },
  "wooden-pergola": {
    name: "Pergola en Bois Naturel",
    badge: "Classique",
    description: "Le charme intemporel du bois noble traité anti-UV pour apporter chaleur et élégance à votre jardin.",
    longDescription: "Conçue à partir d'essences de bois massif traitées contre la chaleur et l'humidité, cette pergola apporte authenticité et raffinement à votre extérieur.",
  },
  "steel-pergola": {
    name: "Pergola en Acier Structurel",
    description: "Force industrielle et lignes architecturales épurées pour couvrir de grands espaces sans piliers intermédiaires.",
    longDescription: "Conçue pour supporter des portées monumentales avec des profilés très fins, elle offre une résistance mécanique exceptionnelle pour les projets d'envergure.",
  },
  "freestanding-pergola": {
    name: "Pergola Autoportante",
    description: "Structure autonome idéale pour les jardins, abords de piscine et terrasses sans fixation murale requise.",
    longDescription: "Offre une flexibilité totale d'implantation pour créer un havre de paix ombragé n'importe où dans votre propriété.",
  },
  "attached-pergola": {
    name: "Pergola Adossée Murale",
    description: "Fixée directement à la façade de la maison pour une continuité naturelle et ombragée vers le jardin.",
    longDescription: "Prolongement harmonieux de votre intérieur créant un espace de détente abrité tout en réduisant la chaleur sur vos baies vitrées.",
  },
  "gable-pergola": {
    name: "Pergola à Toit en Pente (Pignon)",
    description: "Toiture inclinée favorisant l'évacuation rapide des eaux pluviales et offrant une hauteur sous plafond majestueuse.",
    longDescription: "La forme triangulaire assure une excellente aération thermique naturelle et confère une allure architecturale imposante.",
  },
  "retractable-pergola": {
    name: "Pergola Rétractable Motorisée",
    badge: "Flexible",
    description: "Toiture rétractable motorisée pour ouvrir complètement l'espace extérieur en un clic.",
    longDescription: "Idéale pour profiter pleinement des nuits étoilées ou se protéger d'un soleil ardent grâce à une toile technique haute résistance rétractable électriquement.",
  },
  "arched-pergola": {
    name: "Pergola Voutée / Cintrée",
    description: "Design courbé élégant apportant douceur et raffinement aux allées de jardin et entrées de villa.",
    longDescription: "Les profilés cintrés adoucissent l'architecture géométrique et créent des passages ombragés romantiques et sophistiqués.",
  },
  "gazebo": {
    name: "Kiosque de Jardin (Gazebo)",
    description: "Pavillon de jardin autoportant offrant un abri ombragé pour vos moments de détente en famille.",
    longDescription: "Structure autoportante élégante créant un havre de paix au cœur de votre jardin pour les repas et la détente en plein air.",
  },
  "cabana-pergola": {
    name: "Cabana Pergola de Piscine",
    description: "Structure de style villégiature avec rideaux fluides pour une intimité et un confort absolu au bord de l'eau.",
    longDescription: "Évoquant l'atmosphère des hôtels 5 étoiles de Dubaï, nos cabanas allient structure aluminium robuste et voilages extérieurs raffinés.",
  },
  "pavilion": {
    name: "Pavillon d'Extérieur Grand Format",
    description: "Grande structure couverte pour réceptions et événements avec toiture isolée et côtés ouverts pour la ventilation.",
    longDescription: "Conçu pour abriter de grands rassemblements familiaux ou événements professionnels dans un confort thermique optimal.",
  },
  "fiberglass-pergola": {
    name: "Pergola en Fibre de Verre (FRP)",
    description: "Matériau composite ultra-léger et totalement insensible à la corrosion saline des côtes maritimes de Dubaï.",
    longDescription: "Insensible au brouillard salin, à la rouille et aux insectes, idéale pour les résidences côtières de Palm Jumeirah.",
  },
  "vinyl-pvc-pergola": {
    name: "Pergola en Vinyle / PVC sans Entretien",
    description: "Matériau synthétique sans aucun entretien requis, résistant aux rayons UV et aux intempéries extrêmes.",
    longDescription: "Ne nécessite ni peinture ni ponçage, avec une armature métallique interne assurant une rigidité structurelle parfaite.",
  },
  "fixed-roof-pergola": {
    name: "Pergola à Toiture Fixe Isolée",
    description: "Toit plein permanent assurant une protection thermique et solaire complète tout au long de l'année.",
    longDescription: "Fournit une ombre continue et un bouclier thermique étanche contre les fortes chaleurs et les averses soudaines.",
  },
  "awning-pergola": {
    name: "Pergola à Store Banne Intégré",
    description: "Solution hybride combinant armature rigide et toile rétractable motorisée avec capteur de vent.",
    longDescription: "Permet d'étendre la toile au gré de vos besoins tout en la protégeant hermétiquement dans son coffre en aluminium.",
  },
  "corner-pergola": {
    name: "Pergola d'Angle sur Mesure",
    description: "Structure en L optimisant intelligemment les angles de terrasse et espaces extérieurs atypiques.",
    longDescription: "Transforme un coin de jardin ou de patio en un salon intimiste avec banquettes intégrées et claustras décoratifs.",
  },
  "flyover-pergola": {
    name: "Pergola Surélevée (Flyover)",
    description: "Structure surélevée au-dessus de la ligne de toiture créant une sensation d'espace et une ventilation maximale.",
    longDescription: "Idéale pour relier différentes ailes d'une villa ou créer une galerie ombragée haute et ventilée naturellement.",
  },
  "concrete-pergola": {
    name: "Pergola en Béton Architectural",
    description: "Ouvrage maçonné pérenne et sculptural aux finitions contemporaines pour une durabilité infinie.",
    longDescription: "Structure monumentale s'intégrant de façon définitive à l'architecture de prestige de votre villa moderne à Dubaï.",
  },
};

const mapPergolaMaterial = (raw: string): ("aluminum" | "wood" | "steel" | "vinyl" | "fiberglass" | "concrete" | "fabric")[] => {
  if (raw === "aluminum") return ["aluminum"];
  if (raw === "wood") return ["wood"];
  if (raw === "steel") return ["steel"];
  if (raw === "concrete") return ["concrete"];
  if (raw === "composite") return ["fiberglass"];
  return ["aluminum"];
};

const pergolaTypesSeed = pergolaTypesData.map((pt, idx) => {
  const ar = pergolaArMap[pt.slug] || {};
  const fr = pergolaFrMap[pt.slug] || {};

  let materials: ("aluminum" | "wood" | "steel" | "vinyl" | "fiberglass" | "concrete" | "fabric")[] = ["aluminum"];
  if (pt.slug === "fiberglass-pergola") materials = ["fiberglass"];
  else if (pt.slug === "vinyl-pvc-pergola") materials = ["vinyl"];
  else materials = mapPergolaMaterial(pt.material);

  let roofType = pt.roofType as "louvered" | "fixed" | "retractable" | "gable" | "arched" | "flat" | "none" | "open-beam" | "pitched";
  if (pt.slug === "gable-pergola") roofType = "gable";
  if (pt.slug === "arched-pergola") roofType = "arched";

  return {
    id: createUUID(`pergola-${pt.slug}`),
    slug: pt.slug,
    status: "published" as const,
    featured: idx < 6,
    order: idx,
    verified: true,
    seo: {
      metaTitle: {
        en: `${pt.name} Dubai | Custom Luxury Pergolas | Eco Pergola`,
        ar: `${ar.name || pt.name} دبي | إيكو برجولا`,
        fr: `${fr.name || pt.name} Dubaï | Eco Pergola`,
      },
      metaDescription: {
        en: `${pt.description} Custom engineered for UAE climate with 10-year warranty. Free 3D design & consultation.`,
        ar: `${ar.description || pt.description} تصنيع وتركيب في دبي والإمارات مع ضمان 10 سنوات.`,
        fr: `${fr.description || pt.description} Conception et installation sur mesure à Dubaï avec garantie de 10 ans.`,
      },
      ogImage: {
        src: pt.image,
        alt: {
          en: `${pt.name} in Dubai outdoor luxury living`,
          ar: `${ar.name || pt.name} في دبي`,
          fr: `${fr.name || pt.name} à Dubaï`,
        },
      },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: {
      en: pt.name,
      ar: ar.name || pt.name,
      fr: fr.name || pt.name,
    },
    badge: pt.badge
      ? {
          en: pt.badge,
          ar: ar.badge || pt.badge,
          fr: fr.badge || pt.badge,
        }
      : undefined,
    description: {
      en: pt.description,
      ar: ar.description || pt.description,
      fr: fr.description || pt.description,
    },
    longDescription: {
      en: pt.longDescription,
      ar: ar.longDescription || pt.longDescription,
      fr: fr.longDescription || pt.longDescription,
    },
    chips: pt.chips.map((c) => ({ en: c })),
    material: materials,
    roofType,
    placement: pt.placement,
    image: {
      src: pt.image,
      alt: {
        en: `${pt.name} installed in Dubai residence`,
        ar: `تركيب ${ar.name || pt.name} في فيلا بدبي`,
        fr: `Installation ${fr.name || pt.name} dans une villa à Dubaï`,
      },
    },
    gallery: [
      {
        src: pt.image,
        alt: {
          en: `${pt.name} architectural detail view`,
          ar: `تفاصيل معمارية ${ar.name || pt.name}`,
          fr: `Détail architectural ${fr.name || pt.name}`,
        },
      },
    ],
    specs: pt.specs.map((s) => ({
      label: { en: s.label },
      value: { en: s.value },
    })),
    features: pt.features.map((f) => ({ en: f })),
    catalogPdf: "/catalog/eco-pergola-catalogue-2026.pdf",
  };
});

fs.writeFileSync(path.join(contentDir, "pergola-types.json"), JSON.stringify(pergolaTypesSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${pergolaTypesSeed.length} pergola types to content/pergola-types.json`);

// ==========================================
// 2. SERVICES SEED (8 Services)
// ==========================================
const servicesSeed = servicesData.map((s, idx) => ({
  id: createUUID(`service-${s.slug}`),
  slug: s.slug,
  status: "published" as const,
  featured: idx < 4,
  order: idx,
  verified: true,
  seo: {
    metaTitle: {
      en: `${s.title} in Dubai | Eco Pergola`,
      ar: `${s.title} في دبي | إيكو برجولا`,
      fr: `${s.title} à Dubaï | Eco Pergola`,
    },
    metaDescription: {
      en: `${s.shortDescription} Premium fabrication and installation across UAE.`,
      ar: `${s.shortDescription} خدمات تصنيع وتركيب في كافة أنحاء الإمارات.`,
      fr: `${s.shortDescription} Fabrication et installation haut de gamme aux Émirats.`,
    },
    ogImage: {
      src: s.image,
      alt: { en: s.title },
    },
    noindex: false,
  },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  title: { en: s.title },
  summary: { en: s.shortDescription },
  body: { en: s.fullDescription },
  image: {
    src: s.image,
    alt: { en: `${s.title} Dubai engineering` },
  },
  gallery: [{ src: s.image, alt: { en: `${s.title} overview` } }],
  benefits: s.benefits.map((b) => ({
    title: { en: b.split(" by ")[0] || "Key Benefit" },
    text: { en: b },
  })),
  specs: s.specs.map((sp) => ({
    label: { en: sp.label },
    value: { en: sp.value },
  })),
  features: s.features.map((f) => ({ en: f })),
  faqIds: [],
  relatedIds: s.relatedPergolas || [],
  catalogPdf: "/catalog/eco-pergola-catalogue-2026.pdf",
}));
fs.writeFileSync(path.join(contentDir, "services.json"), JSON.stringify(servicesSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${servicesSeed.length} services to content/services.json`);

// ==========================================
// 3. PRODUCTS SEED (6 Products)
// ==========================================
const productsSeed = productsData.map((p, idx) => ({
  id: createUUID(`product-${p.id}`),
  slug: p.id,
  status: "published" as const,
  featured: idx < 4,
  order: idx,
  verified: true,
  seo: {
    metaTitle: { en: `${p.title} | Premium Architectural Products Dubai` },
    metaDescription: { en: `${p.copy} Precision engineered for UAE.` },
    ogImage: { src: p.image, alt: { en: p.title } },
    noindex: false,
  },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  category: { en: p.categoryTag },
  title: { en: p.title },
  summary: { en: p.copy },
  image: {
    src: p.image,
    alt: { en: `${p.title} showcase` },
  },
  gallery: [{ src: p.image, alt: { en: `${p.title} detail view` } }],
  specs: p.specs.map((sp) => ({
    label: { en: sp.label },
    value: { en: sp.value },
  })),
  features: p.features.map((f) => ({ en: f })),
  highlights: p.specs.slice(0, 3).map((sp) => ({ en: `${sp.label}: ${sp.value}` })),
  catalogPdf: "/catalog/eco-pergola-catalogue-2026.pdf",
}));
fs.writeFileSync(path.join(contentDir, "products.json"), JSON.stringify(productsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${productsSeed.length} products to content/products.json`);

// ==========================================
// 4. MATERIALS SEED (Comparison Matrix)
// ==========================================
const materialsSeed = [
  {
    id: createUUID("material-aluminum"),
    slug: "aluminum",
    status: "published" as const,
    featured: true,
    order: 0,
    verified: true,
    seo: {
      metaTitle: { en: "Aluminum Pergolas Dubai | Durable & Rust-Proof Material" },
      metaDescription: { en: "Compare architectural aluminum 6063-T6 against other outdoor shade materials in Dubai." },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Architectural Aluminum (6063-T6)", ar: "ألمنيوم معماري (6063-T6)", fr: "Aluminium Architectural (6063-T6)" },
    tagline: { en: "Zero maintenance, rust-proof, Dubai's #1 choice", ar: "بدون صيانة، مقاوم للصدأ، الخيار الأول في دبي", fr: "Sans entretien, anticorrosion, le choix N°1 à Dubaï" },
    description: { en: "Heavy-duty structural extruded aluminum treated with marine-grade Qualicoat Class 2 powder coating.", ar: "قطاعات ألمنيوم عالية المتانة مطلية بطبقات مسحوق كواليكوت فئة 2 البحرية.", fr: "Profilés en aluminium extrudé haute résistance avec finition poudre marine Qualicoat." },
    durabilityScore: 10,
    maintenanceScore: 10,
    costLevel: "premium" as const,
    windResistance: { en: "Tested to 140 km/h (Zone 3 UAE)" },
    pros: [
      { en: "100% rust-proof and corrosion resistant in coastal humidity" },
      { en: "Lightweight yet engineered for extreme spans" },
      { en: "Available in 200+ RAL colors and woodgrain finishes" },
    ],
    cons: [
      { en: "Higher initial investment than treated pine" },
    ],
    bestFor: { en: "Modern villas, coastal properties, bio-climatic motorized roofs" },
    lifespan: { en: "25+ Years" },
  },
  {
    id: createUUID("material-wood"),
    slug: "wood",
    status: "published" as const,
    featured: true,
    order: 1,
    verified: true,
    seo: {
      metaTitle: { en: "Hardwood Pergolas Dubai | Teak & Iroko Timber" },
      metaDescription: { en: "Natural luxury hardwood pergolas treated for the UAE desert climate." },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Luxury Hardwood (Teak & Iroko)", ar: "خشب طبيعي فاخر (تيك وإيروكو)", fr: "Bois Noble (Teck & Iroko)" },
    tagline: { en: "Timeless organic warmth and natural charm", ar: "دفء طبيعي وسحر كلاسيكي أخاذ", fr: "Chaleur naturelle et authenticité intemporelle" },
    description: { en: "Kiln-dried, autoclave treated premium tropical hardwoods finished with UV-blocking bio-oils.", ar: "أخشاب صلبة استوائية مجففة بالفرن ومعالجة بزيوت طبيعية مقاومة للأشعة فوق البنفسجية.", fr: "Bois exotiques de premier choix traités sous pression avec huiles de protection anti-UV." },
    durabilityScore: 8,
    maintenanceScore: 6,
    costLevel: "luxury" as const,
    windResistance: { en: "Heavy mass provides superior natural wind stability" },
    pros: [
      { en: "Unmatched organic luxury and natural cooling feel" },
      { en: "Custom artisan joinery and traditional craftsmanship" },
      { en: "Stays cool to the touch even under 45°C summer sun" },
    ],
    cons: [
      { en: "Requires periodic oiling every 18-24 months in Dubai" },
    ],
    bestFor: { en: "Lush garden settings, classic villas, organic architectural themes" },
    lifespan: { en: "15-20 Years" },
  },
  {
    id: createUUID("material-steel"),
    slug: "steel",
    status: "published" as const,
    featured: false,
    order: 2,
    verified: true,
    seo: {
      metaTitle: { en: "Structural Steel Pergolas Dubai | Maximum Span & Strength" },
      metaDescription: { en: "Galvanized structural steel pergolas for monumental spans and commercial projects." },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Galvanized Structural Steel", ar: "فولاذ هيكلي مجلفن", fr: "Acier Galvanisé Structurel" },
    tagline: { en: "Monumental spans, industrial strength", ar: "بحور إنشائية واسعة وقوة صناعية هائلة", fr: "Portées monumentales et robustesse industrielle" },
    description: { en: "Hot-dip galvanized structural carbon steel with electrostatic epoxy / powder coating.", ar: "فولاذ كربوني هيكلي مجلفن بالغمس الساخن مع طلاء إلكتروستاتيكي مقاوم للعوامل الجوية.", fr: "Acier au carbone galvanisé à chaud avec revêtement époxy et thermolaqué." },
    durabilityScore: 9,
    maintenanceScore: 8,
    costLevel: "premium" as const,
    windResistance: { en: "Maximum structural load resistance up to Zone 4" },
    pros: [
      { en: "Spans up to 15 meters without intermediate columns" },
      { en: "Supports heavy suspended daybeds, rooftop AC, and solar panels" },
      { en: "Ultra-slender profiles with monumental load capacity" },
    ],
    cons: [
      { en: "Heavy structure requiring reinforced concrete footings" },
    ],
    bestFor: { en: "Commercial venues, large event pavilions, cantilevered modern roofs" },
    lifespan: { en: "25+ Years" },
  },
  {
    id: createUUID("material-vinyl"),
    slug: "vinyl",
    status: "published" as const,
    featured: false,
    order: 3,
    verified: true,
    seo: {
      metaTitle: { en: "Vinyl & PVC Pergolas Dubai | Maintenance-Free Outdoor Shade" },
      metaDescription: { en: "High-impact vinyl pergolas with internal metal cores for zero maintenance." },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "High-Impact Vinyl / PVC", ar: "فينيل / PVC معزز", fr: "Vinyle / PVC Haute Résistance" },
    tagline: { en: "Never needs paint, impervious to rot", ar: "لا يحتاج إلى طلاء، مقاوم للتآكل والتشقق", fr: "Sans peinture, insensible à la pourriture" },
    description: { en: "UV-stabilized virgin vinyl outer profile with inner galvanized steel reinforcement.", ar: "هياكل فينيل معززة بحبيبات ثاني أكسيد التيتانيوم للحماية من الشمس مع قلب فولاذي داخلي.", fr: "Profilé vinyle stabilisé aux UV avec renforts internes en acier galvanisé." },
    durabilityScore: 8,
    maintenanceScore: 10,
    costLevel: "moderate" as const,
    windResistance: { en: "Engineered with internal structural anchors" },
    pros: [
      { en: "Zero maintenance: washes clean with a garden hose" },
      { en: "Never yellows, peels, chalks, or warps" },
      { en: "Cost effective compared to motorized aluminum" },
    ],
    cons: [
      { en: "Limited color palette (predominantly white and beige)" },
    ],
    bestFor: { en: "Budget-conscious family gardens, rental properties, classic white gazebos" },
    lifespan: { en: "20+ Years" },
  },
  {
    id: createUUID("material-fiberglass"),
    slug: "fiberglass",
    status: "published" as const,
    featured: false,
    order: 4,
    verified: true,
    seo: {
      metaTitle: { en: "Fiberglass FRP Pergolas Dubai | Beachfront & Marine Grade" },
      metaDescription: { en: "100% saltwater corrosion proof fiberglass composite pergolas for coastal Dubai." },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Pultruded Fiberglass Composite (FRP)", ar: "ألياف زجاجية بوليمرية (FRP)", fr: "Fibre de Verre Pultrudée (FRP)" },
    tagline: { en: "Total immunity to coastal saltwater humidity", ar: "مناعة تامة ضد رطوبة وأملاح البحر", fr: "Immunité totale contre l'air salin côtier" },
    description: { en: "High-strength fiber-reinforced polymer with automotive-grade gel coat finish.", ar: "مركبات بوليمرية معززة بالألياف الزجاجية مع طبقة طلاء جيل كوت فائقة الحماية.", fr: "Polymère renforcé de fibres avec finition gel-coat qualité automobile." },
    durabilityScore: 10,
    maintenanceScore: 9,
    costLevel: "premium" as const,
    windResistance: { en: "Exceptional tensile strength higher than structural steel" },
    pros: [
      { en: "Absolute zero corrosion in direct beach saltwater spray" },
      { en: "Lightweight and ideal for roof decks with load limits" },
      { en: "High thermal dimensional stability under direct sun" },
    ],
    cons: [
      { en: "Requires specialist fabrication tools on site" },
    ],
    bestFor: { en: "Palm Jumeirah beachfronts, coastal marinas, rooftop terraces" },
    lifespan: { en: "25+ Years" },
  },
  {
    id: createUUID("material-concrete"),
    slug: "concrete",
    status: "published" as const,
    featured: false,
    order: 5,
    verified: true,
    seo: {
      metaTitle: { en: "Architectural Concrete Pergolas Dubai | Permanent Modern Shade" },
      metaDescription: { en: "Fair-faced architectural concrete pergolas for monumental contemporary villas." },
      noindex: false,
    },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Architectural Concrete", ar: "خرسانة معمارية مسلحة", fr: "Béton Architectural" },
    tagline: { en: "Permanent sculptural mass, 50+ year lifespan", ar: "كتل معمارية دائمة تدوم لأكثر من 50 عاماً", fr: "Masse sculpturale permanente, durée de vie 50+ ans" },
    description: { en: "Precast or cast-in-place C40/50 self-compacting concrete with epoxy-coated steel rebar.", ar: "خرسانة ذاتية الدمك عالية القوة مع حديد تسليح مطلي بالإيبوكسي المقاوم للرطوبة.", fr: "Béton autoplaçant C40/50 préfabriqué ou coulé en place avec armatures époxy." },
    durabilityScore: 10,
    maintenanceScore: 10,
    costLevel: "luxury" as const,
    windResistance: { en: "Immune to any wind velocity or storm event" },
    pros: [
      { en: "Monumental, permanent architectural integration into the estate" },
      { en: "Completely immune to desert heat, UV, and sandstorms" },
      { en: "Seamless finishes: off-shutter, travertine render, or micro-cement" },
    ],
    cons: [
      { en: "Permanent installation that cannot be relocated or altered" },
    ],
    bestFor: { en: "Monumental luxury palaces, minimalist Mediterranean villas" },
    lifespan: { en: "50+ Years" },
  },
];
fs.writeFileSync(path.join(contentDir, "materials.json"), JSON.stringify(materialsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${materialsSeed.length} materials to content/materials.json`);

// ==========================================
// 5. PROJECTS SEED (6 Case Studies)
// ==========================================
const projectsSeed = projectsData.map((pr, idx) => ({
  id: createUUID(`project-${pr.slug}`),
  slug: pr.slug,
  status: "published" as const,
  featured: idx < 3,
  order: idx,
  verified: true,
  seo: {
    metaTitle: { en: `${pr.title} | Portfolio Case Study | Eco Pergola` },
    metaDescription: { en: `${pr.description} Completed in ${pr.year} in ${pr.location}.` },
    ogImage: { src: pr.image, alt: { en: pr.title } },
    noindex: false,
  },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  title: { en: pr.title },
  category: { en: pr.category },
  location: { en: pr.location },
  emirate: "Dubai" as const,
  year: pr.year,
  summary: { en: pr.description },
  fullNarrative: { en: pr.fullNarrative },
  image: {
    src: pr.image,
    alt: { en: `${pr.title} architectural exterior` },
  },
  gallery: pr.gallery.map((g, gIdx) => ({
    src: g,
    alt: { en: `${pr.title} gallery photo ${gIdx + 1}` },
  })),
  scope: pr.scope.map((sc) => ({ en: sc })),
  materials: pr.materials.map((m) => ({ en: m })),
  relatedServiceIds: pr.relatedServices || [],
  clientTestimonial: pr.clientTestimonial
    ? {
        quote: { en: pr.clientTestimonial.quote },
        author: { en: pr.clientTestimonial.author },
        role: { en: pr.clientTestimonial.role },
      }
    : undefined,
}));
fs.writeFileSync(path.join(contentDir, "projects.json"), JSON.stringify(projectsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${projectsSeed.length} projects to content/projects.json`);

// ==========================================
// 6. TESTIMONIALS SEED (3 Client Reviews)
// ==========================================
const testimonialsSeed = testimonialsData.map((t, idx) => ({
  id: createUUID(`testimonial-${t.id}`),
  slug: t.id,
  status: "published" as const,
  featured: true,
  order: idx,
  verified: t.verified,
  seo: { noindex: true },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  quote: { en: t.quote },
  name: { en: t.name },
  role: { en: t.role },
  location: { en: t.location },
  rating: t.rating,
  initials: t.initials,
  date: "2024-11-10",
  source: "Verified Google Client Review",
}));
fs.writeFileSync(path.join(contentDir, "testimonials.json"), JSON.stringify(testimonialsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${testimonialsSeed.length} testimonials to content/testimonials.json`);

// ==========================================
// 7. FAQS SEED (6 Items)
// ==========================================
const faqsSeed = faqData.map((f, idx) => ({
  id: createUUID(`faq-${f.id}`),
  slug: f.id,
  status: "published" as const,
  featured: idx < 4,
  order: idx,
  verified: true,
  seo: { noindex: false },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  question: { en: f.question },
  answer: { en: f.answer },
  category: { en: f.category },
  pages: ["general", "services", "pergola-types"],
}));
fs.writeFileSync(path.join(contentDir, "faqs.json"), JSON.stringify(faqsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${faqsSeed.length} faqs to content/faqs.json`);

// ==========================================
// 8. NEWS SEED (5 Updates)
// ==========================================
const newsSeed = newsData.map((n, idx) => ({
  id: createUUID(`news-${n.id}`),
  slug: n.id,
  status: "published" as const,
  featured: idx < 3,
  order: idx,
  verified: true,
  seo: { noindex: false },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  date: n.date,
  monthYear: { en: n.monthYear },
  title: { en: n.title },
  summary: { en: n.summary },
  badge: { en: n.badge },
  ctaText: { en: n.ctaText },
  ctaLink: n.ctaLink,
  image: n.image ? { src: n.image, alt: { en: n.title } } : undefined,
}));
fs.writeFileSync(path.join(contentDir, "news.json"), JSON.stringify(newsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${newsSeed.length} news items to content/news.json`);

// ==========================================
// 9. BLOG POSTS SEED (3 Posts)
// ==========================================
const postsSeed = blogData.map((p, idx) => ({
  id: createUUID(`post-${p.slug}`),
  slug: p.slug,
  status: "published" as const,
  featured: idx === 0,
  order: idx,
  verified: true,
  seo: {
    metaTitle: { en: `${p.title} | Eco Pergola Insights` },
    metaDescription: { en: p.excerpt },
    ogImage: { src: p.image, alt: { en: p.title } },
    noindex: false,
  },
  createdAt: "2025-01-01T00:00:00.000Z",
  updatedAt: "2025-01-01T00:00:00.000Z",
  title: { en: p.title },
  excerpt: { en: p.excerpt },
  category: { en: p.category },
  author: {
    name: { en: p.author.name },
    role: { en: p.author.role },
  },
  publishedAt: p.publishedAt,
  readingTime: { en: p.readingTime },
  image: {
    src: p.image,
    alt: { en: p.title },
  },
  tableOfContents: p.tableOfContents.map((toc) => ({
    id: toc.id,
    title: { en: toc.title },
  })),
  content: { en: p.content },
  tags: p.tags.map((t) => ({ en: t })),
}));
fs.writeFileSync(path.join(contentDir, "posts.json"), JSON.stringify(postsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${postsSeed.length} blog posts to content/posts.json`);

// ==========================================
// 10. STATS SEED (Verified & Unverified claims)
// ==========================================
const statsSeed = [
  {
    id: createUUID("stat-years"),
    slug: "years-experience",
    status: "published" as const,
    featured: true,
    order: 0,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    value: "10",
    suffix: "+",
    label: { en: "Years of Engineering Excellence", ar: "سنوات من التميز الهندسي", fr: "Années d'Excellence Technique" },
    description: { en: "Continuous architectural fabrication in Dubai & UAE" },
  },
  {
    id: createUUID("stat-projects"),
    slug: "executed-projects",
    status: "published" as const,
    featured: true,
    order: 1,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    value: "500",
    suffix: "+",
    label: { en: "Delivered Luxury Projects", ar: "مشاريع فاخرة تم تسليمها", fr: "Projets de Prestige Réalisés" },
    description: { en: "Across premier Dubai villas, hotels, and towers" },
  },
  {
    id: createUUID("stat-satisfaction"),
    slug: "client-satisfaction",
    status: "published" as const,
    featured: true,
    order: 2,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    value: "98",
    suffix: "%",
    label: { en: "Client Recommendation Rate", ar: "نسبة رضا وتوصية العملاء", fr: "Taux de Recommandation Client" },
    description: { en: "Measured across 2023-2025 handover surveys" },
  },
  {
    id: createUUID("stat-facility"),
    slug: "facility-size",
    status: "published" as const,
    featured: false,
    order: 3,
    verified: false, // Flagged false per TODO-verify.md awaiting client verification
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    value: "50,000",
    suffix: " sq ft",
    label: { en: "Advanced Fabrication Facility", ar: "مساحة منشأة التصنيع المتطورة", fr: "Surface de l'Usine de Fabrication" },
    description: { en: "CNC precision machinery & assembly plant in Dubai" },
  },
  {
    id: createUUID("stat-team"),
    slug: "team-size",
    status: "published" as const,
    featured: false,
    order: 4,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    value: "45",
    suffix: "+",
    label: { en: "Engineers & Certified Installers", ar: "مهندسين وفنيين تركيب معتمدين", fr: "Ingénieurs & Installateurs Certifiés" },
    description: { en: "Dedicated full-time in-house execution teams" },
  },
];
fs.writeFileSync(path.join(contentDir, "stats.json"), JSON.stringify(statsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${statsSeed.length} stats to content/stats.json`);

// ==========================================
// 11. CERTIFICATIONS SEED
// ==========================================
const certificationsSeed = [
  {
    id: createUUID("cert-qualicoat"),
    slug: "qualicoat-class-2",
    status: "published" as const,
    featured: true,
    order: 0,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    title: { en: "Qualicoat Seaside Class 2 Powder Coating", ar: "كواليكوت سي سايد فئة 2 للبيئات البحرية", fr: "Thermolaquage Qualicoat Seaside Classe 2" },
    issuer: { en: "Qualicoat International Architectural Standard" },
    number: "QC-UAE-2024-C2",
    summary: { en: "Guarantees 10+ years gloss retention and film integrity against coastal saltwater and UV radiation." },
  },
  {
    id: createUUID("cert-warranty"),
    slug: "10-year-structural-warranty",
    status: "published" as const,
    featured: true,
    order: 1,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    title: { en: "10-Year Comprehensive Structural Warranty", ar: "ضمان هيكلي شامل لمدة 10 سنوات", fr: "Garantie Structurelle Décennale Complète" },
    issuer: { en: "Eco Pergola Quality Assurance Division" },
    number: "EP-QA-WAR-10Y",
    summary: { en: "Covers aluminum structural frames, weld integrity, and extrusion deflection under engineered wind loads." },
  },
  {
    id: createUUID("cert-iso-9001"),
    slug: "iso-9001-quality-management",
    status: "published" as const,
    featured: false,
    order: 2,
    verified: false, // Flagged false per TODO-verify.md awaiting client certificate copy
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    title: { en: "ISO 9001:2015 Quality Management System", ar: "نظام إدارة الجودة ISO 9001:2015", fr: "Système de Management de la Qualité ISO 9001" },
    issuer: { en: "Awaiting Client Document (TUV / Bureau Veritas)" },
    number: "AWAITING_CLIENT_REG_NUM",
    summary: { en: "Quality certified procurement, CNC machining, and architectural installation processes." },
  },
];
fs.writeFileSync(path.join(contentDir, "certifications.json"), JSON.stringify(certificationsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${certificationsSeed.length} certifications to content/certifications.json`);

// ==========================================
// 12. PARTNERS SEED (Verified Suppliers Only)
// ==========================================
const partnersSeed = [
  {
    id: createUUID("partner-somfy"),
    slug: "somfy-automation",
    status: "published" as const,
    featured: true,
    order: 0,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: "Somfy Smart Automation",
    category: "Hardware" as const,
    logo: {
      src: "https://images.unsplash.com/photo-1513694203232-719a280e022f?w=400&q=80&auto=format&fit=crop",
      alt: { en: "Somfy Smart Motors & Actuators Logo" },
    },
    website: "https://www.somfy.com",
    description: { en: "French tubular motors and smart home weather sensor integration for bio-climatic louvers." },
  },
  {
    id: createUUID("partner-guardian"),
    slug: "guardian-glass",
    status: "published" as const,
    featured: true,
    order: 1,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: "Guardian SunGuard Glass",
    category: "Glass" as const,
    logo: {
      src: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=400&q=80&auto=format&fit=crop",
      alt: { en: "Guardian Glass Architectural Coatings Logo" },
    },
    website: "https://www.guardianglass.com",
    description: { en: "High-performance double silver low-E solar control glass manufactured for extreme GCC solar loads." },
  },
  {
    id: createUUID("partner-saint-gobain"),
    slug: "saint-gobain",
    status: "published" as const,
    featured: true,
    order: 2,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: "Saint-Gobain Glass",
    category: "Glass" as const,
    logo: {
      src: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=400&q=80&auto=format&fit=crop",
      alt: { en: "Saint-Gobain Glass Logo" },
    },
    website: "https://www.saint-gobain-glass.com",
    description: { en: "Acoustic laminated safety glazing and solar thermal insulation for minimal sliding glass doors." },
  },
  {
    id: createUUID("partner-jotun"),
    slug: "jotun-powder-coatings",
    status: "published" as const,
    featured: true,
    order: 3,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: "Jotun Durasol Architectural Powder Coatings",
    category: "Systems" as const,
    logo: {
      src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=400&q=80&auto=format&fit=crop",
      alt: { en: "Jotun Architectural Coatings Logo" },
    },
    website: "https://www.jotun.com",
    description: { en: "Hyper-durable Qualicoat Class 2 coatings engineered for harsh UAE coastal UV and humidity resistance." },
  },
];
fs.writeFileSync(path.join(contentDir, "partners.json"), JSON.stringify(partnersSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${partnersSeed.length} partners to content/partners.json`);

// ==========================================
// 13. TEAM SEED
// ==========================================
const teamSeed = [
  {
    id: createUUID("team-tariq"),
    slug: "tariq-al-mansoori",
    status: "published" as const,
    featured: true,
    order: 0,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Tariq Al Mansoori", ar: "طارق المنصوري", fr: "Tariq Al Mansoori" },
    role: { en: "Lead Architectural Engineer", ar: "كبير المهندسين المعماريين", fr: "Ingénieur Architecte Principal" },
    bio: { en: "Over 14 years of facade engineering experience across high-profile UAE residential and hospitality developments." },
    photo: {
      src: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80&auto=format&fit=crop",
      alt: { en: "Tariq Al Mansoori - Lead Engineer" },
    },
  },
  {
    id: createUUID("team-layla"),
    slug: "layla-al-hashimi",
    status: "published" as const,
    featured: true,
    order: 1,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Eng. Layla Al Hashimi", ar: "م. ليلى الهاشمي", fr: "Ing. Layla Al Hashimi" },
    role: { en: "Senior Sustainability & Facade Specialist", ar: "أخصائية أولى للاستدامة والواجهات", fr: "Spécialiste Senior en Durabilité & Façades" },
    bio: { en: "LEED AP certified facade specialist focusing on solar heat mitigation and thermal break efficiency in desert environments." },
    photo: {
      src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=600&q=80&auto=format&fit=crop",
      alt: { en: "Eng. Layla Al Hashimi - Sustainability Specialist" },
    },
  },
  {
    id: createUUID("team-karim"),
    slug: "karim-el-sayed",
    status: "published" as const,
    featured: true,
    order: 2,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    name: { en: "Karim El Sayed", ar: "كريم السيد", fr: "Karim El Sayed" },
    role: { en: "Head of Precision Fabrication", ar: "مدير التصنيع الدقيق", fr: "Responsable de la Fabrication de Précision" },
    bio: { en: "Expert in CNC multi-axis machining, automated Qualicoat powder application, and unitized system assembly." },
    photo: {
      src: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=600&q=80&auto=format&fit=crop",
      alt: { en: "Karim El Sayed - Fabrication Head" },
    },
  },
];
fs.writeFileSync(path.join(contentDir, "team.json"), JSON.stringify(teamSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${teamSeed.length} team members to content/team.json`);

// ==========================================
// 14. PROCESS STEPS SEED ("How We Work")
// ==========================================
const processSeed = [
  {
    id: createUUID("process-1"),
    slug: "consultation-3d-design",
    status: "published" as const,
    featured: true,
    order: 0,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    stepNumber: 1,
    title: { en: "On-Site Consultation & 3D Modeling", ar: "الاستشارة الميدانية والنمذجة ثلاثية الأبعاد", fr: "Consultation sur Site & Modélisation 3D" },
    summary: { en: "Laser survey of your terrace or garden with photorealistic 3D rendering of the pergola in your actual outdoor space." },
    icon: "Compass",
  },
  {
    id: createUUID("process-2"),
    slug: "engineering-calculations",
    status: "published" as const,
    featured: true,
    order: 1,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    stepNumber: 2,
    title: { en: "Structural Engineering & Approvals", ar: "الحسابات الإنشائية والموافقات البلدية", fr: "Ingénierie Structurelle & Autorisations" },
    summary: { en: "Detailed wind load calculations (up to 4.5 kPa) compliant with Dubai Municipality and UAE Civil Defense codes." },
    icon: "FileCheck",
  },
  {
    id: createUUID("process-3"),
    slug: "cnc-precision-fabrication",
    status: "published" as const,
    featured: true,
    order: 2,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    stepNumber: 3,
    title: { en: "Precision CNC Fabrication", ar: "التصنيع الدقيق بماكينات CNC", fr: "Fabrication de Précision CNC" },
    summary: { en: "Multi-axis aluminum extrusion cutting, seamless concealed welding, and certified Qualicoat Class 2 coating." },
    icon: "Wrench",
  },
  {
    id: createUUID("process-4"),
    slug: "clean-installation",
    status: "published" as const,
    featured: true,
    order: 3,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    stepNumber: 4,
    title: { en: "Clean & Quiet Site Installation", ar: "التركيب النظيف والدقيق في الموقع", fr: "Installation Propre & Silencieuse" },
    summary: { en: "Factory pre-assembled modular bays erected in 2-4 days by certified in-house teams with zero mess or disturbance." },
    icon: "Hammer",
  },
  {
    id: createUUID("process-5"),
    slug: "handover-warranty",
    status: "published" as const,
    featured: true,
    order: 4,
    verified: true,
    seo: { noindex: true },
    createdAt: "2025-01-01T00:00:00.000Z",
    updatedAt: "2025-01-01T00:00:00.000Z",
    stepNumber: 5,
    title: { en: "Commissioning, Smart Setup & 10Y Warranty", ar: "التشغيل الذكي والربط والضمان لـ 10 سنوات", fr: "Mise en Service, Connexion & Garantie 10 Ans" },
    summary: { en: "Smartphone automation calibration, rain/wind sensor testing, and issuance of your official 10-year warranty certificate." },
    icon: "ShieldCheck",
  },
];
fs.writeFileSync(path.join(contentDir, "process.json"), JSON.stringify(processSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote ${processSeed.length} process steps to content/process.json`);

// ==========================================
// 15. NAVIGATION SEED (Mega Menu & Footers)
// ==========================================
const navigationSeed = {
  header: [
    {
      id: "nav-home",
      label: { en: "Home", ar: "الرئيسية", fr: "Accueil" },
      href: "/",
      groups: [],
      children: [],
    },
    {
      id: "nav-pergola-types",
      label: { en: "Pergola Types", ar: "أنواع البرجولات", fr: "Types de Pergolas" },
      href: "/pergola-types",
      featuredCard: {
        title: { en: "Bio-Climatic Louvered Pergola", ar: "برجولا بيوكليماتيك ذكية", fr: "Pergola Bioclimatique à Lames" },
        description: { en: "Motorized 0°-140° rotation with smart rain and wind automation sensors.", ar: "تحكم ذكي بالدوران وحساسات طقس مدمجة.", fr: "Rotation motorisée 0°-140° avec capteurs météo." },
        href: "/pergola-types/louvered-pergola",
        image: {
          src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80&auto=format&fit=crop",
          alt: { en: "Louvered Pergola Dubai Luxury" },
        },
        cta: { en: "Explore Specifications", ar: "عرض المواصفات", fr: "Voir les Spécifications" },
      },
      groups: [
        {
          groupTitle: { en: "By Material", ar: "حسب المادة", fr: "Par Matériau" },
          items: [
            { label: { en: "Aluminum Pergolas", ar: "برجولات ألمنيوم", fr: "Pergolas en Aluminium" }, href: "/pergola-types/aluminum-pergola" },
            { label: { en: "Wooden Pergolas", ar: "برجولات خشبية", fr: "Pergolas en Bois" }, href: "/pergola-types/wooden-pergola" },
            { label: { en: "Steel Pergolas", ar: "برجولات فولاذية", fr: "Pergolas en Acier" }, href: "/pergola-types/steel-pergola" },
            { label: { en: "Fiberglass Pergolas", ar: "برجولات فايبر جلاس", fr: "Pergolas en Fibre de Verre" }, href: "/pergola-types/fiberglass-pergola" },
            { label: { en: "Vinyl / PVC Pergolas", ar: "برجولات فينيل", fr: "Pergolas en Vinyle" }, href: "/pergola-types/vinyl-pvc-pergola" },
            { label: { en: "Concrete Pergolas", ar: "برجولات خرسانية", fr: "Pergolas en Béton" }, href: "/pergola-types/concrete-pergola" },
          ],
        },
        {
          groupTitle: { en: "By Roof System", ar: "حسب نظام السقف", fr: "Par Système de Toit" },
          items: [
            { label: { en: "Motorized Louvered", ar: "شرائح ذكية بيوكليماتيك", fr: "Lames Orientables" }, href: "/pergola-types/louvered-pergola" },
            { label: { en: "Retractable Canopy", ar: "سقف قماشي قابل للطي", fr: "Toile Rétractable" }, href: "/pergola-types/retractable-pergola" },
            { label: { en: "Solid Insulated Roof", ar: "سقف معزول ثابت", fr: "Toiture Fixe Isolée" }, href: "/pergola-types/fixed-roof-pergola" },
            { label: { en: "Gable Pitched Roof", ar: "سقف مائل جمالوني", fr: "Toit en Pignon" }, href: "/pergola-types/gable-pergola" },
            { label: { en: "Arched Curved Roof", ar: "سقف مقوس انسيابي", fr: "Toiture Cintrée" }, href: "/pergola-types/arched-pergola" },
          ],
        },
        {
          groupTitle: { en: "Specialty Structures", ar: "هياكل تخصصية", fr: "Structures d'Exception" },
          items: [
            { label: { en: "Poolside Cabana", ar: "كابانا المسابح", fr: "Cabana de Piscine" }, href: "/pergola-types/cabana-pergola" },
            { label: { en: "Garden Gazebo", ar: "جازيبو الحدائق", fr: "Gazebo de Jardin" }, href: "/pergola-types/gazebo" },
            { label: { en: "Grand Event Pavilion", ar: "بافيليون الفعاليات", fr: "Pavillon de Réception" }, href: "/pergola-types/pavilion" },
            { label: { en: "Flyover Breezeway", ar: "برجولا فلاي أوفر", fr: "Passerelle Flyover" }, href: "/pergola-types/flyover-pergola" },
            { label: { en: "Corner L-Shape", ar: "برجولا زاوية", fr: "Pergola d'Angle" }, href: "/pergola-types/corner-pergola" },
          ],
        },
      ],
      children: [],
    },
    {
      id: "nav-services",
      label: { en: "Services", ar: "الخدمات", fr: "Services" },
      href: "/services",
      groups: [
        {
          groupTitle: { en: "Architectural Glazing", ar: "الزجاج المعماري", fr: "Vitrage Architectural" },
          items: [
            { label: { en: "Facade Design & Fabrication", ar: "تصميم وتصنيع الواجهات", fr: "Conception & Fabrication de Façades" }, href: "/services/facade-design-fabrication" },
            { label: { en: "Minimal Sliding Doors", ar: "أبواب منزلقة دقيقة", fr: "Portes Coulissantes Minimalistes" }, href: "/services/minimal-sliding-doors" },
            { label: { en: "Glass Room Extensions", ar: "غرف زجاجية وملحقات", fr: "Extensions & Vérandas Vitrées" }, href: "/services/glass-room-extensions" },
            { label: { en: "Frameless Balustrades", ar: "درابزين زجاجي بدون إطار", fr: "Garde-Corps en Verre" }, href: "/services/glass-railings-balustrades" },
          ],
        },
        {
          groupTitle: { en: "Engineering & Fabrication", ar: "الهندسة والتصنيع", fr: "Ingénierie & Fabrication" },
          items: [
            { label: { en: "Bespoke Aluminum Fabrication", ar: "تصنيع ألمنيوم مخصص", fr: "Fabrication Aluminium sur Mesure" }, href: "/services/bespoke-aluminum-fabrication" },
            { label: { en: "Sustainable Building Solutions", ar: "حلول البناء المستدام", fr: "Solutions de Bâtiment Durable" }, href: "/services/sustainable-building-solutions" },
            { label: { en: "Spiral Glass Staircases", ar: "سلالم زجاجية وحلزونية", fr: "Escaliers Hélicoïdaux & Verre" }, href: "/services/spiral-glass-staircases" },
            { label: { en: "Smart Glass Partitions", ar: "قواطع زجاجية ذكية", fr: "Cloisons Vitrées Intelligentes" }, href: "/services/smart-glass-partitions" },
          ],
        },
      ],
      children: [],
    },
    {
      id: "nav-products",
      label: { en: "Products", ar: "المنتجات", fr: "Produits" },
      href: "/products",
      groups: [],
      children: [
        { label: { en: "Metro 20 Minimal Slider", ar: "أبواب مترو 20 المنزلقة", fr: "Baie Coulissante Metro 20" }, href: "/products#metro-20-minimal-slider" },
        { label: { en: "Commercial Glass Facades", ar: "واجهات زجاجية تجارية", fr: "Façades Vitrées Tertiaires" }, href: "/products#commercial-glass-facades" },
        { label: { en: "Bio-Climatic Pergolas", ar: "برجولات بيوكليماتيك", fr: "Pergolas Bioclimatiques" }, href: "/products#bio-climatic-pergolas" },
        { label: { en: "Transparent Living Spaces", ar: "غرف زجاجية شفافة", fr: "Vérandas Panoramiques" }, href: "/products#transparent-living-spaces" },
        { label: { en: "Glass Spiral Staircases", ar: "سلالم زجاجية حلزونية", fr: "Escaliers en Verre Suspendus" }, href: "/products#glass-spiral-staircases" },
      ],
    },
    {
      id: "nav-projects",
      label: { en: "Portfolio", ar: "المشاريع", fr: "Réalisations" },
      href: "/projects",
      groups: [],
      children: [],
    },
    {
      id: "nav-about",
      label: { en: "About", ar: "من نحن", fr: "À Propos" },
      href: "/about",
      groups: [],
      children: [],
    },
    {
      id: "nav-blog",
      label: { en: "Insights", ar: "المقالات", fr: "Blog" },
      href: "/blog",
      groups: [],
      children: [],
    },
    {
      id: "nav-contact",
      label: { en: "Contact", ar: "اتصل بنا", fr: "Contact" },
      href: "/contact",
      groups: [],
      children: [],
    },
  ],
  footer: {
    services: [
      { label: { en: "Facade Design & Fabrication" }, href: "/services/facade-design-fabrication" },
      { label: { en: "Minimal Sliding Doors" }, href: "/services/minimal-sliding-doors" },
      { label: { en: "Sustainable Building Solutions" }, href: "/services/sustainable-building-solutions" },
      { label: { en: "Glass Room Extensions" }, href: "/services/glass-room-extensions" },
      { label: { en: "Glass Railings & Balustrades" }, href: "/services/glass-railings-balustrades" },
      { label: { en: "Bespoke Aluminum Fabrication" }, href: "/services/bespoke-aluminum-fabrication" },
    ],
    pergolas: [
      { label: { en: "Aluminum Pergola" }, href: "/pergola-types/aluminum-pergola" },
      { label: { en: "Louvered Bio-Climatic Pergola" }, href: "/pergola-types/louvered-pergola" },
      { label: { en: "Retractable Pergola" }, href: "/pergola-types/retractable-pergola" },
      { label: { en: "Wooden Pergola" }, href: "/pergola-types/wooden-pergola" },
      { label: { en: "Steel Pergola" }, href: "/pergola-types/steel-pergola" },
      { label: { en: "Poolside Cabana Pergola" }, href: "/pergola-types/cabana-pergola" },
    ],
    company: [
      { label: { en: "About Eco Pergola" }, href: "/about" },
      { label: { en: "Featured Portfolio" }, href: "/projects" },
      { label: { en: "Latest Insights & News" }, href: "/blog" },
      { label: { en: "FAQ & Consultations" }, href: "/faq" },
      { label: { en: "Contact Our Engineers" }, href: "/contact" },
      { label: { en: "Download Product Catalogue (PDF)" }, href: "/catalog/eco-pergola-catalogue-2026.pdf" },
    ],
    legal: [
      { label: { en: "Privacy Policy" }, href: "/privacy-policy" },
      { label: { en: "Terms & Conditions" }, href: "/terms" },
      { label: { en: "Warranty Terms" }, href: "/faq" },
      { label: { en: "Photo Credits" }, href: "/credits" },
    ],
  },
};
fs.writeFileSync(path.join(contentDir, "navigation.json"), JSON.stringify(navigationSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote navigation menus to content/navigation.json`);

// ==========================================
// 16. SETTINGS SEED (Single Source of Truth)
// ==========================================
const settingsSeed = {
  name: siteConfig.name,
  legalName: siteConfig.legalName,
  tagline: {
    en: siteConfig.tagline,
    ar: "نبتكر مساحات خارجية فاخرة في دبي",
    fr: "Sublimer les Espaces Extérieurs de Prestige à Dubaï",
  },
  description: {
    en: siteConfig.description,
    ar: "برجولات ألمنيوم فاخرة مخصصة، واجهات زجاجية، وقواطع معمارية في دبي والإمارات. جودة معتمدة وفق أعلى المعايير.",
    fr: "Pergolas sur mesure en aluminium, façades vitrées et solutions architecturales à Dubaï et aux Émirats.",
  },
  domain: siteConfig.domain,
  canonicalUrl: siteConfig.canonicalUrl,
  phone: siteConfig.phone,
  phoneDisplay: siteConfig.phoneDisplay,
  whatsapp: siteConfig.whatsapp,
  whatsappDisplay: siteConfig.whatsappDisplay,
  whatsappUrl: siteConfig.whatsappUrl,
  email: siteConfig.email,
  workingHours: {
    days: { en: siteConfig.workingHours.days, ar: "الإثنين - السبت", fr: "Lun – Sam" },
    hours: { en: siteConfig.workingHours.hours, ar: "8:00 ص – 6:00 م", fr: "8h00 – 18h00" },
    display: { en: siteConfig.workingHours.display, ar: "الإثنين - السبت: 8:00 ص - 6:00 م", fr: "Lun - Sam: 8h00 - 18h00" },
    schema: siteConfig.workingHours.schema,
  },
  address: {
    street: { en: siteConfig.address.street, ar: "منطقة القوز الصناعية 3", fr: "Al Quoz Industrial Area 3" },
    poBox: siteConfig.address.poBox,
    city: { en: siteConfig.address.city, ar: "دبي", fr: "Dubaï" },
    region: siteConfig.address.region,
    country: { en: siteConfig.address.country, ar: "الإمارات العربية المتحدة", fr: "Émirats Arabes Unis" },
    full: { en: siteConfig.address.full, ar: "منطقة القوز الصناعية 3، دبي، الإمارات العربية المتحدة، ص.ب 390774", fr: siteConfig.address.full },
  },
  geo: siteConfig.geo,
  social: siteConfig.social,
  announcementBar: {
    enabled: true,
    text: {
      en: "Complimentary 3D Consultation & Engineering Site Survey in Dubai · 10-Year Warranty",
      ar: "استشارة ميدانية وتصميم ثلاثي الأبعاد مجاني في دبي · ضمان 10 سنوات",
      fr: "Consultation 3D et Étude Technique Offerte à Dubaï · Garantie 10 Ans",
    },
    link: "/contact",
    badge: { en: "Spring 2026", ar: "عروض 2026", fr: "Offre 2026" },
  },
  seo: {
    defaultMetaTitle: {
      en: "Custom Aluminum Pergolas & Glass Systems Dubai | Eco Pergola",
      ar: "برجولات ألمنيوم وأنظمة زجاجية مخصصة في دبي | إيكو برجولا",
      fr: "Pergolas en Aluminium & Systèmes Vitrés à Dubaï | Eco Pergola",
    },
    defaultMetaDescription: {
      en: "Premier manufacturer of luxury bio-climatic pergolas, minimal sliding doors, and architectural facade engineering in Dubai & UAE. 10-year warranty.",
      ar: "الشركة الرائدة في تصنيع البرجولات البيوكليماتيكية الفاخرة والأبواب المنزلقة الدقيقة والواجهات المعمارية في دبي والإمارات.",
      fr: "Concepteur et fabricant leader de pergolas bioclimatiques de luxe, baies coulissantes minimales et façades architecturales à Dubaï.",
    },
    ogImage: {
      src: "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=1200&q=85&auto=format&fit=crop",
      alt: { en: "Eco Pergola Dubai Luxury Outdoor Architecture" },
    },
  },
};
fs.writeFileSync(path.join(contentDir, "settings.json"), JSON.stringify(settingsSeed, null, 2), "utf-8");
console.log(`[Seed] Wrote site settings to content/settings.json`);

// ==========================================
// 17. REDIRECTS SEED
// ==========================================
fs.writeFileSync(path.join(contentDir, "redirects.json"), JSON.stringify([], null, 2), "utf-8");
console.log(`[Seed] Wrote empty redirects registry to content/redirects.json`);

console.log("\n>>> Content seed migration completed successfully! All 16 collections generated verbatim.");
