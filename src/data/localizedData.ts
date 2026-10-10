import { servicesData, ServiceItem } from "./services";
import { pergolaTypesData, PergolaType } from "./pergola-types";
import { projectsData, ProjectItem } from "./projects";
import { productsData, ProductItem } from "./products";
import { faqData, FaqItem } from "./faq";
import { newsData, NewsItem } from "./news";
import { blogData, BlogPost } from "./blog";
import { testimonialsData, TestimonialItem } from "./testimonials";

// ==========================================
// ARABIC TRANSLATIONS FOR SERVICES
// ==========================================
const servicesAr: Record<string, Partial<ServiceItem>> = {
  "facade-design-fabrication": {
    title: "تصميم وتصنيع الواجهات المعمارية",
    shortDescription: "أنظمة واجهات متطورة تجمع بين الجمالية، والأداء الوظيفي، والاستدامة للمشاريع الحديثة.",
    fullDescription: "تقدم إيكو برجولا خدمات تصميم وهندسة وتصنيع دقيقة لأنظمة الواجهات الزجاجية والألمنيوم المصممة خصيصاً لمناخ دبي والمعايير المعمارية الفاخرة. تدمج أنظمتنا بين قطاعات الألمنيوم الهيكلية والزجاج العازل عالي الأداء لتحقيق كفاءة حرارية وعزل صوتي لا مثيل لهما.",
  },
  "minimal-sliding-doors": {
    title: "أنظمة الأبواب المنزلقة الدقيقة",
    shortDescription: "قطاعات نحيفة للغاية مع أقصى مساحة زجاجية لدمج المساحات الداخلية والخارجية بسلاسة.",
    fullDescription: "استمتع باتصال بصري ومعماري فائق مع أنظمة الأبواب المنزلقة الدقيقة من إيكو برجولا. مصممة بإطارات نحيفة فائقة النعومة بسماكة 20 مم، تتيح اندماجاً مثالياً بين الصالات الداخلية والحدائق والشرفات وأحواض السباحة.",
  },
  "sustainable-building-solutions": {
    title: "حلول البناء المستدام والأبنية الخضراء",
    shortDescription: "ممارسات تصنيع موفرة للطاقة ومواد صديقة للبيئة معتمدة للريادة الخضراء في دبي.",
    fullDescription: "حلول هندسية ومعمارية صديقة للبيئة تتوافق مع معايير السعفات الخضراء في دبي ونظام استدامة وشهادات LEED، لتقليل البصمة الكربونية وتوفير استهلاك الطاقة.",
  },
  "glass-room-extensions": {
    title: "غرف زجاجية وملحقات الحدائق",
    shortDescription: "توسعات زجاجية معزولة ومكيفة تتيح الاستمتاع بحديقة الفيلا على مدار العام.",
    fullDescription: "صمم غرفتك الزجاجية الفاخرة بتكييف متكامل وعزل حراري كامل للاستمتاع بإطلالات الحديقة في جميع فصول السنة مع الحماية الكاملة من حرارة الصيف.",
  },
  "glass-railings-balustrades": {
    title: "درابزين وحواجز زجاجية بدون إطار",
    shortDescription: "حواجز أمان زجاجية شفافة للشرفات والمسابح والأسطح تمنحك إطلالة بانورامية بدون عوائق.",
    fullDescription: "أنظمة درابزين زجاجي مقسى ومصفح معتمدة هندسياً ومقاومة لأحمال الرياح العالية، مع خيارات تثبيت مخفية تحت الأرضيات لمظهر عصري أنيق.",
  },
  "bespoke-aluminum-fabrication": {
    title: "تصنيع الألمنيوم المعماري المخصص",
    shortDescription: "تشكيل وهندسة دقيقة لقطاعات الألمنيوم لتنفيذ أرقى التصاميم المعمارية في الإمارات.",
    fullDescription: "تصنيع هياكل وأسقف وكسوات ألمنيوم معمارية مخصصة للفلل والقصور والمشاريع التجارية باستخدام أحدث تقنيات الليزر وCNC وقطع دقيق.",
  },
  "spiral-glass-staircases": {
    title: "سلالم زجاجية وحلزونية فاخرة",
    shortDescription: "سلالم معمارية عائمة تمنح منزلك طابعاً استثنائياً يجمع بين الهندسة الدقيقة والجمال.",
    fullDescription: "سلالم هيكلية مخصصة من الفولاذ المقاوم للصدأ والزجاج الإنشائي متعدد الطبقات لتحفة فنية في قلب الفيلا أو المكتب الفاخر.",
  },
  "smart-glass-partitions": {
    title: "قواطع زجاجية ذكية للمكاتب والمنازل",
    shortDescription: "قواطع زجاجية عازلة للصوت مع تقنية الزجاج الذكي للتحكم الفوري بالخصوصية.",
    fullDescription: "فواصل زجاجية عصرية مع إمكانية التحويل بين الشفافية والعتامة بلمسة زر لتوفير أقصى درجات المرونة والخصوصية في بيئات العمل والمنازل.",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR SERVICES
// ==========================================
const servicesFr: Record<string, Partial<ServiceItem>> = {
  "facade-design-fabrication": {
    title: "Conception & Fabrication de Façades",
    shortDescription: "Systèmes de façades haut de gamme alliant esthétique, performance thermique et durabilité architecturale.",
    fullDescription: "Eco Pergola conçoit et fabrique des façades architecturales d'exception adaptées au climat de Dubaï. Profilés aluminium haute performance et vitrages isolants de pointe pour vos projets prestigieux.",
  },
  "minimal-sliding-doors": {
    title: "Portes Coulissantes Minimalistes",
    shortDescription: "Profilés ultra-fins avec surface vitrée maximale pour une continuité parfaite intérieur-extérieur.",
    fullDescription: "Redéfinissez vos espaces de vie avec nos baies coulissantes minimales aux profilés ultra-fins de 20 mm, offrant une ouverture panoramique sur vos jardins et terrasses.",
  },
  "sustainable-building-solutions": {
    title: "Solutions de Bâtiment Durable",
    shortDescription: "Matériaux écologiques et fabrication éco-responsable certifiée LEED pour l'architecture moderne.",
    fullDescription: "Solutions d'ingénierie verte réduisant les charges thermiques et conformes aux normes environnementales les plus exigeantes des Émirats.",
  },
  "glass-room-extensions": {
    title: "Extensions & Vérandas Vitrées",
    shortDescription: "Espaces vitrés climatisés pour profiter de votre jardin tout au long de l'année avec isolation thermique.",
    fullDescription: "Agrandissez votre villa avec nos pièces vitrées sur mesure, équipées de double vitrage à contrôle solaire pour un confort absolu en toute saison.",
  },
  "glass-railings-balustrades": {
    title: "Garde-Corps & Balustrades en Verre",
    shortDescription: "Systèmes de sécurité transparents sans cadre pour balcons, terrasses et abords de piscine.",
    fullDescription: "Garde-corps en verre trempé feuilleté de sécurité avec fixations invisibles pour une vue panoramique dégagée.",
  },
  "bespoke-aluminum-fabrication": {
    title: "Fabrication Aluminium sur Mesure",
    shortDescription: "Usinage de précision et structures en aluminium architectural pour projets sur mesure à Dubaï.",
    fullDescription: "Fabrication sur mesure de structures complexes, brise-soleil et habillages en aluminium extrudé de qualité marine.",
  },
  "spiral-glass-staircases": {
    title: "Escaliers Hélicoïdaux & Verre",
    shortDescription: "Escaliers architecturaux suspendus alliant verre structurel et acier pour un design spectaculaire.",
    fullDescription: "Création d'escaliers uniques en verre et métal devenant la pièce maîtresse architecturale de votre intérieur.",
  },
  "smart-glass-partitions": {
    title: "Cloisons Vitrées Intelligentes",
    shortDescription: "Séparations acoustiques et vitrage commutable pour une intimité instantanée sur commande.",
    fullDescription: "Cloisons de bureaux et résidentielles avec technologie de verre commutable passant de transparent à opaque en un clic.",
  },
};

// ==========================================
// ARABIC TRANSLATIONS FOR PERGOLA TYPES
// ==========================================
const pergolaAr: Record<string, Partial<PergolaType>> = {
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
  "retractable-pergola": {
    name: "برجولا سقف قابل للطي",
    badge: "مرنة",
    description: "سقف قماشي أو ألمنيوم قابل للفتح والإغلاق بالكامل بضغطة زر مع إضاءة LED مدمجة.",
    longDescription: "حل مثالي يمنحك حرية الاختيار بين السماء المفتوحة نهاراً أو ليلاً، والتغطية الكاملة للحماية من الشمس أو المطر بنظام محركات هادئ وسلس.",
  },
  "modern-pergola": {
    name: "برجولا حديثة عصرية",
    badge: "تصميم حديث",
    description: "خطوط معمارية هندسية نقية مع دمج أحدث تقنيات الإضاءة والأتمتة الذكية للفلل الحديثة.",
    longDescription: "تصميم معاصر يركز على البساطة والجمال مع قطاعات ألمنيوم نحيفة وإضاءة ليد مخفية تتناغم مع الفلل المودرن في دبي.",
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
  "glass-roof-pergola": {
    name: "برجولا سقف زجاجي",
    description: "سقف زجاجي مقسى عازل للحرارة يسمح بمرور الضوء الطبيعي مع حماية كاملة من الغبار والأمطار.",
    longDescription: "تجمع بين فخامة الزجاج وحماية السقف المعزول، مع استخدام زجاج معالج حرارياً ومصفح يمنع دخول الحرارة والأشعة فوق البنفسجية.",
  },
  "bio-climatic-pergola": {
    name: "برجولا مناخية بيوكليماتيك",
    badge: "تقنية متطورة",
    description: "نظام بيوكليماتيك متكامل يتكيف تلقائياً مع حساسات المطر والرياح والحرارة لراحة قصوى.",
    longDescription: "قمة التكنولوجيا في التظليل الخارجي، حيث تتكامل الحساسات مع الأتمتة لضبط زوايا الشرائح تلقائياً بما يضمن أفضل مناخ داخلي.",
  },
  "metal-pergola": {
    name: "برجولا معدنية صلبة",
    description: "هياكل معدنية متينة مصممة لتحمل الرياح الشديدة ومغطاة بدهانات مقاومة للتآكل.",
    longDescription: "هياكل صلبة شديدة المتانة معالجة بطبقات مقاومة للصدأ والتآكل، مثالية للمساحات الكبيرة والمشاريع التجارية.",
  },
  "steel-pergola": {
    name: "برجولا فولاذية هيكلية",
    description: "هيكل فولاذي مخصص للمساحات الكبيرة والامتدادات الواسعة بدون أعمدة وسيطة.",
    longDescription: "قدرة تحمل استثنائية تسمح بإنشاء بحور إنشائية واسعة ومساحات مظللة ضخمة دون الحاجة لأعمدة إضافية تعيق الحركة.",
  },
  "minimalist-pergola": {
    name: "برجولا مينيماليست نقية",
    description: "بساطة هندسية مع أعمدة رفيعة ووصلات مخفية تناسب واجهات الفلل المودرن.",
    longDescription: "ترتكز على فلسفة البساطة المعمارية مع إخفاء كامل لكافة البراغي ومسارات تصريف المياه داخل الأعمدة لمظهر في غاية الأناقة.",
  },
  "luxury-pergola": {
    name: "برجولا VIP الفاخرة",
    badge: "حصرية",
    description: "أرقى تشطيبات الألمنيوم المؤكسد مع كسوات خشبية وإضاءة محيطية وأنظمة صوت متكاملة.",
    longDescription: "صممت خصيصاً للقصور والفلل الراقية مع دمج أنظمة التكييف الخارجي ورذاذ التبريد والإضاءة المحيطية المخفية وأنظمة الصوت الذكية.",
  },
  "traditional-pergola": {
    name: "برجولا تراثية تقليدية",
    description: "تصاميم كلاسيكية تناسب الطراز المعماري الأندلسي والخليجي للفلل الراقية.",
    longDescription: "تجمع بين عراقة التصميم الكلاسيكي وجودة المواد الحديثة لتوفر مظلة متينة تناسب الطابع المعماري التراثي والإسلامي.",
  },
  "rustic-pergola": {
    name: "برجولا ريفية دافئة",
    description: "أخشاب معتقة بلمسات ريفية عفوية تندمج بانسجام مع الطبيعة الخضراء.",
    longDescription: "تمنح حديقتك طابعاً دافئاً مستوحى من الطبيعة الريفية مع تطبيق أحدث تقنيات المعالجة لمقاومة الرطوبة والشمس في دبي.",
  },
  "white-pergola": {
    name: "برجولا بيضاء ناصعة",
    description: "طلاء أبيض مقاوم للاصفرار والأشعة فوق البنفسجية ليعكس حرارة شمس دبي بأناقة.",
    longDescription: "تتميز بلونها الأبيض الناصع الذي يعكس أشعة الشمس ويقلل من امتصاص الحرارة، مع طلاء مسحوق إلكتروستاتيكي يدوم طويلاً دون تغيير.",
  },
  "pitched-roof-pergola": {
    name: "برجولا سقف مائل (جمالوني)",
    description: "سقف مائل يسمح بتصريف فوري للمياه مع ارتفاع داخلي يمنح شعوراً بالاتساع.",
    longDescription: "تصميم هندسي مائل يوفر ارتفاعاً داخلياً إضافياً وتصريفاً فعالاً لمياه الأمطار مع إمكانية دمج كسوات خشبية أو زجاجية.",
  },
  "motorized-pergola": {
    name: "برجولا بمحركات ذكية",
    badge: "ذكية",
    description: "تحكم كامل عبر الهاتف الذكي والريموت كونترول مع توافق مع أنظمة المنازل الذكية.",
    longDescription: "مزودة بمحركات فرنسية وألمانية عالية الاعتمادية تتيح التحكم الدقيق بفتحات السقف والإضاءة والستائر بلمسة زر واحدة.",
  },
  "pavilion": {
    name: "بافيليون جناح الحديقة",
    description: "هيكل خارجي مستقل متعدد الاستخدامات يوفر مساحة ترفيهية ضخمة للقصور والفلل.",
    longDescription: "مبنى خارجي مستقل متكامل يجمع بين مميزات البرجولا والغرف الزجاجية ليوفر مساحة ضيافة وترفيه استثنائية لجميع الفصول.",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR PERGOLA TYPES
// ==========================================
const pergolaFr: Record<string, Partial<PergolaType>> = {
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
  "retractable-pergola": {
    name: "Pergola Rétractable",
    badge: "Flexible",
    description: "Toiture rétractable motorisée pour ouvrir complètement l'espace extérieur en un clic.",
    longDescription: "Idéale pour profiter pleinement des nuits étoilées ou se protéger d'un soleil ardent grâce à une toile technique haute résistance rétractable électriquement.",
  },
  "modern-pergola": {
    name: "Pergola Moderne & Épurée",
    badge: "Design",
    description: "Lignes architecturales épurées, éclairage LED intégré et finitions contemporaines haut de gamme.",
    longDescription: "Un design minimaliste aux lignes épurées et profilés ultra-fins avec éclairage LED indirect, parfait pour l'architecture contemporaine de Dubaï.",
  },
  "gazebo": {
    name: "Kiosque de Jardin (Gazebo)",
    description: "Pavillon de jardin autoportant offrant un abri ombragé pour vos moments de détente en famille.",
    longDescription: "Structure autoportante élégante créant un havre de paix au cœur de votre jardin pour les repas et la détente en plein air.",
  },
  "cabana-pergola": {
    name: "Cabana de Piscine de Luxe",
    description: "Espace lounge élégant pour bord de piscine avec rideaux intégrés pour une intimité préservée.",
    longDescription: "Conçue pour sublimer les abords de piscines de villas et d'hôtels de luxe avec voilages et assises intégrées.",
  },
  "glass-roof-pergola": {
    name: "Pergola à Toiture en Verre",
    description: "Toit en verre feuilleté traité anti-chaleur offrant une luminosité naturelle et une étanchéité parfaite.",
    longDescription: "Laisse passer la lumière du jour tout en bloquant la chaleur grâce à un vitrage trempé feuilleté à contrôle solaire de dernière génération.",
  },
  "bio-climatic-pergola": {
    name: "Pergola Bioclimatique Intelligente",
    badge: "Haute Technologie",
    description: "Gestion automatisée avec capteurs météo de pluie, vent et température pour un confort optimal.",
    longDescription: "La référence de l'ombrage automatisé : capteurs météo intelligents régulant l'inclinaison des lames pour un confort thermique permanent.",
  },
  "metal-pergola": {
    name: "Pergola Métallique Haute Résistance",
    description: "Structure en métal renforcé conçue pour résister aux vents violents avec traitement anticorrosion.",
    longDescription: "Une robustesse à toute épreuve avec revêtement thermolaqué marin résistant aux conditions climatiques les plus sévères.",
  },
  "steel-pergola": {
    name: "Pergola en Acier Structurel",
    description: "Ouvrage en acier structurel permettant de très grandes portées sans poteaux intermédiaires.",
    longDescription: "Permet de couvrir de vastes terrasses sans poteaux intermédiaires grâce à la résistance mécanique supérieure de l'acier structurel.",
  },
  "minimalist-pergola": {
    name: "Pergola Minimaliste",
    description: "Design épuré avec profilés ultra-fins et fixations invisibles pour villas contemporaines.",
    longDescription: "Fixations dissimulées et gouttières intégrées aux montants pour une intégration discrète et raffinée dans l'architecture moderne.",
  },
  "luxury-pergola": {
    name: "Pergola Luxe VIP",
    badge: "Exclusif",
    description: "Finitions d'excellence avec éclairage d'ambiance, audio intégré et aluminium brossé.",
    longDescription: "Équipements sur mesure d'exception : climatisation extérieure, nébulisation, sonorisation intégrée et finitions or ou bronze anodisé.",
  },
  "traditional-pergola": {
    name: "Pergola Traditionnelle",
    description: "Architecture classique s'intégrant parfaitement aux villas de style méditerranéen ou oriental.",
    longDescription: "Éléments décoratifs soignés et proportions classiques créant une atmosphère chaleureuse et noble.",
  },
  "rustic-pergola": {
    name: "Pergola Rustique",
    description: "Bois d'aspect authentique créant une harmonie naturelle avec la végétation environnante.",
    longDescription: "Texture naturelle et teintes chaleureuses traitées pour une durabilité maximale sous le soleil des Émirats.",
  },
  "white-pergola": {
    name: "Pergola Blanche Éclatante",
    description: "Revêtement blanc pur résistant aux UV pour refléter la chaleur du soleil avec éclat.",
    longDescription: "Finition blanche immaculée traitée anti-jaunissement, reflétant efficacement les rayons solaires pour une terrasse plus fraîche.",
  },
  "pitched-roof-pergola": {
    name: "Pergola à Toit Incliné",
    description: "Toiture en pente garantissant un écoulement parfait des eaux et un volume intérieur spacieux.",
    longDescription: "Toit à double ou simple pente offrant une impressionnante hauteur sous plafond et un drainage naturel parfait.",
  },
  "motorized-pergola": {
    name: "Pergola Motorisée Connectée",
    badge: "Smart Home",
    description: "Contrôle domotique complet via smartphone, télécommande ou assistants vocaux.",
    longDescription: "Intégration domotique totale compatible avec les systèmes intelligents de votre villa pour un pilotage à distance sans effort.",
  },
  "pavilion": {
    name: "Pavillon de Résidence",
    description: "Structure majestueuse autoportante créant un vaste espace de réception extérieur.",
    longDescription: "Vaste pavillon indépendant conçu pour accueillir salons de jardin et espaces de réception extérieurs tout au long de l'année.",
  },
};

// ==========================================
// ARABIC TRANSLATIONS FOR PRODUCTS
// ==========================================
const productsAr: Record<string, Partial<ProductItem>> = {
  "metro-20-minimal-slider": {
    title: "نظام الأبواب المنزلقة مترو 20",
    categoryTag: "أبواب منزلقة بانورامية",
    copy: "قطاعات ألمنيوم فائقة النحافة بسماكة 20 مم مع مساحات زجاجية شاسعة لدمج مثالي بين الصالات والحدائق.",
  },
  "commercial-glass-facades": {
    title: "واجهات زجاجية تجارية وهيكلية",
    categoryTag: "أنظمة الواجهات",
    copy: "أنظمة واجهات متطورة للأبراج والمباني التجارية توفر أعلى معدلات العزل الحراري والصوتي المعتمد.",
  },
  "bio-climatic-pergolas": {
    title: "برجولات بيوكليماتيك ذكية",
    categoryTag: "حلول التظليل الخارجي",
    copy: "شرائح ألمنيوم دوارة ومتحركة بمحركات كهربائية ذكية لتوفير تحكم كامل بالمناخ الخارجي.",
  },
  "transparent-living-spaces": {
    title: "غرف زجاجية وتوسعات عصرية",
    categoryTag: "الغرف الزجاجية",
    copy: "توسعات ومجالس زجاجية مكيفة تتيح الاستمتاع بالضوء الطبيعي والمناظر الخارجية على مدار فصول السنة.",
  },
  "glass-spiral-staircases": {
    title: "سلالم زجاجية حلزونية فاخرة",
    categoryTag: "عناصر معمارية مميزة",
    copy: "سلالم زجاجية إنشائية بتصميم حلزوني أنيق ودرابزين ألمنيوم مخفي تضفي لمسة فنية فريدة على الفيلا.",
  },
  "bespoke-laser-cut-screens": {
    title: "قواطع وكسوات ألمنيوم مقطوعة بالليزر",
    categoryTag: "كسوات مخصصة",
    copy: "ألواح ألمنيوم وزخارف معمارية مفرغة بالليزر لتوفير الخصوصية والتظليل الهندسي الراقي.",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR PRODUCTS
// ==========================================
const productsFr: Record<string, Partial<ProductItem>> = {
  "metro-20-minimal-slider": {
    title: "Baie Coulissante Minimale Metro 20",
    categoryTag: "COULISSANT PANORAMIQUE",
    copy: "Profilés ultra-fins de 20 mm avec vitrage panoramique pour une continuité parfaite entre intérieur et extérieur.",
  },
  "commercial-glass-facades": {
    title: "Façades Vitrées Commerciales & Murs-Rideaux",
    categoryTag: "SYSTÈMES DE FAÇADES",
    copy: "Systèmes de façades haute performance pour bâtiments tertiaires avec isolation thermique et acoustique renforcée.",
  },
  "bio-climatic-pergolas": {
    title: "Pergolas Bioclimatiques Motorisées",
    categoryTag: "SOLUTIONS D'EXTÉRIEUR",
    copy: "Lames aluminium orientables pour une régulation thermique naturelle et un confort extérieur optimal.",
  },
  "transparent-living-spaces": {
    title: "Espaces de Vie & Vérandas Vitrées",
    categoryTag: "PIÈCES VITRÉES",
    copy: "Extensions vitrées contemporaines climatisées apportant luminosité naturelle et bien-être tout au long de l'année.",
  },
  "glass-spiral-staircases": {
    title: "Escaliers Hélicoïdaux en Verre Structurel",
    categoryTag: "ÉLÉMENTS D'EXCEPTION",
    copy: "Escaliers suspendus alliant marches en verre feuilleté structurel et garde-corps minimalistes design.",
  },
  "bespoke-laser-cut-screens": {
    title: "Panneaux Découpés au Laser & Brise-Soleil",
    categoryTag: "HABILLAGES SUR MESURE",
    copy: "Habillages aluminium artistiques découpés au laser pour une intimité raffinée et une signature visuelle unique.",
  },
};

// ==========================================
// ARABIC TRANSLATIONS FOR PROJECTS
// ==========================================
const projectsAr: Record<string, Partial<ProjectItem>> = {
  "dubai-marina-luxury-tower": {
    title: "برج سكني فاخر في دبي مارينا",
    location: "دبي مارينا، دبي",
    description: "تصنيع وتركيب واجهات زجاجية هيكلية عالية الأداء وشرفات زجاجية بانورامية لبرج سكني شاهق.",
  },
  "business-bay-corporate-center": {
    title: "المركز التجاري في الخليج التجاري",
    location: "الخليج التجاري، دبي",
    description: "نظام واجهات ستائرية زجاجية موحدة مع زجاج ذكي مدمج لتوفير كفاءة طاقة متقدمة معتمدة LEED Gold.",
  },
  "palm-jumeirah-private-villa": {
    title: "فيلا خاصة فاخرة في نخلة جميرا",
    location: "سعفة نخلة جميرا، دبي",
    description: "أبواب منزلقة دقيقة للغاية بارتفاع 4.2 متر مع برجولا بيوكليماتيك مكيفة بجانب حوض السباحة.",
  },
  "emirates-hills-modern-residence": {
    title: "قصر عصري في تلال الإمارات",
    location: "تلال الإمارات، دبي",
    description: "توسعات غرف زجاجية حرارية، سلالم حلزونية عائمة من الزجاج الهيكلي، وحواجز أمان مسبح بدون إطار.",
  },
  "downtown-dubai-commercial-hub": {
    title: "مجمع تجاري في داون تاون دبي",
    location: "داون تاون دبي",
    description: "كسوات ألمنيوم معمارية مخصصة وقواطع زجاجية ذكية عازلة للصوت للمكاتب التنفيذية.",
  },
  "jumeirah-beach-residence-penthouse": {
    title: "بنتهاوس فاخر في جميرا بيتش ريزيدنس",
    location: "جميرا بيتش ريزيدنس، دبي",
    description: "أنظمة أبواب منزلقة بحرية مقاومة للأملاح مع برجولا سقف متحرك بالكامل على السطح البانورامي.",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR PROJECTS
// ==========================================
const projectsFr: Record<string, Partial<ProjectItem>> = {
  "dubai-marina-luxury-tower": {
    title: "Tour Résidentielle de Luxe Dubai Marina",
    location: "Dubai Marina, Dubaï",
    description: "Conception et pose de façades vitrées structurelles et garde-corps panoramiques pour une tour de prestige.",
  },
  "business-bay-corporate-center": {
    title: "Centre d'Affaires Business Bay",
    location: "Business Bay, Dubaï",
    description: "Murs-rideaux unitisés à vitrage thermique haute performance certifiés LEED Gold.",
  },
  "palm-jumeirah-private-villa": {
    title: "Villa Privée de Prestige Palm Jumeirah",
    location: "Palm Jumeirah Frond, Dubaï",
    description: "Baies coulissantes minimalistes de 4,2 m de haut et pergola bioclimatique climatisée en bord de piscine.",
  },
  "emirates-hills-modern-residence": {
    title: "Résidence Contemporaine Emirates Hills",
    location: "Emirates Hills, Dubaï",
    description: "Extensions en verre isolant, escaliers hélicoïdaux en verre suspendu et balustrades invisibles.",
  },
  "downtown-dubai-commercial-hub": {
    title: "Complexe Commercial Downtown Dubaï",
    location: "Downtown Dubaï",
    description: "Habillages aluminium sur mesure et cloisons vitrées intelligentes pour bureaux de direction.",
  },
  "jumeirah-beach-residence-penthouse": {
    title: "Penthouse de Luxe JBR",
    location: "Jumeirah Beach Residence, Dubaï",
    description: "Baies coulissantes de qualité marine et pergola rétractable motorisée sur terrasse panoramique.",
  },
};

// ==========================================
// ARABIC TRANSLATIONS FOR NEWS
// ==========================================
const newsAr: Record<string, Partial<NewsItem>> = {
  "award-winning-facade-project": {
    title: "جائزة التميز لأفضل مشروع واجهات",
    summary: "إيكو برجولا تفوز بجائزة 'أفضل تنفيذ للواجهات المعمارية' في برج دبي مارينا السكني الفاخر.",
    badge: "جائزة التميز",
    ctaText: "اقرأ المزيد",
  },
  "new-sustainable-product-line": {
    title: "إطلاق خط منتجات العمارة الخضراء المستدامة",
    summary: "طرح أنظمة برجولات بيوكليماتيك حاصلة على شهادة LEED توفر 40% من الطاقة ومصممة لمناخ الإمارات.",
    badge: "الاستدامة",
    ctaText: "معرفة المزيد",
  },
  "strategic-partnership-announcement": {
    title: "شراكة استراتيجية مع كبرى المصانع الأوروبية",
    summary: "توقيع اتفاقية تعاون لجلب أحدث تقنيات الأبواب المنزلقة فائقة النحافة إلى سوق دبي الفاخر.",
    badge: "شراكة استراتيجية",
    ctaText: "عرض التفاصيل",
  },
  "expanded-production-facility": {
    title: "افتتاح منشأة تصنيع جديدة بمساحة 50,000 قدم",
    summary: "توسيع طاقتنا الإنتاجية بأحدث ماكينات CNC الليزرية الدقيقة في مدينة دبي الصناعية.",
    badge: "توسع استراتيجي",
    ctaText: "اكتشف المزيد",
  },
  "free-consultation-services": {
    title: "جلسات استشارة ومعاينة وتصميم ثلاثي الأبعاد مجاناً",
    summary: "نوفر الآن خدمات المعاينة الميدانية والتصميم ثلاثي الأبعاد التفاعلي مجاناً لكافة المشاريع في الدولة.",
    badge: "خدمة حصرية",
    ctaText: "احجز الآن",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR NEWS
// ==========================================
const newsFr: Record<string, Partial<NewsItem>> = {
  "award-winning-facade-project": {
    title: "Prix de la Meilleure Réalisation de Façade",
    summary: "Eco Pergola récompensé pour l'installation des façades vitrées de la tour de luxe de Dubai Marina.",
    badge: "Distinction",
    ctaText: "Lire la Suite",
  },
  "new-sustainable-product-line": {
    title: "Nouvelle Gamme de Pergolas Éco-Responsables",
    summary: "Lancement de nos pergolas bioclimatiques certifiées LEED offrant 40% d'économies d'énergie.",
    badge: "Développement Durable",
    ctaText: "En Savoir Plus",
  },
  "strategic-partnership-announcement": {
    title: "Partenariat Stratégique Européen",
    summary: "Alliance avec des fabricants européens pour proposer des coulissants minimalistes de nouvelle génération.",
    badge: "Partenariat",
    ctaText: "Voir les Détails",
  },
  "expanded-production-facility": {
    title: "Extension de Notre Usine de Production",
    summary: "Inauguration de notre nouvelle usine de 5 000 m² à Dubaï avec centres d'usinage CNC haute précision.",
    badge: "Expansion",
    ctaText: "Découvrir Plus",
  },
  "free-consultation-services": {
    title: "Consultation & Modélisation 3D Offertes",
    summary: "Étude technique et visualisation 3D personnalisée offertes pour tous vos projets aux Émirats.",
    badge: "Service Offert",
    ctaText: "Réserver",
  },
};

// ==========================================
// ARABIC TRANSLATIONS FOR TESTIMONIALS
// ==========================================
const testimonialsAr: Record<string, Partial<TestimonialItem>> = {
  "mohammed-al-maktoum": {
    name: "م. محمد الشامسي",
    role: "مطور عقاري ومستثمر",
    location: "نخلة جميرا، دبي",
    quote: "تفاني إيكو برجولا في الجودة ودقة المواعيد لا مثيل له. أنظمة الأبواب المنزلقة والواجهات التي تم تنفيذها في فيلتنا فاقت كل التوقعات وحققت عزلاً حرارياً وصوتياً مبهراً.",
  },
  "sarah-jenkins": {
    name: "سارة جنكينز",
    role: "مهندسة ديكور داخلي",
    location: "دبي هيلز، دبي",
    quote: "تصميم البرجولا البيوكليماتيك الذكية حول الحديقة إلى مساحة معيشة فاخرة نستخدمها في جميع فصول السنة. الحرفية في تشطيب الألمنيوم مذهلة.",
  },
  "khalid-al-nuaimi": {
    name: "د. خالد النعيمي",
    role: "مالك عقار خاص",
    location: "تلال الإمارات، دبي",
    quote: "أفضل شركة تصنيع ألمنيوم وزجاج تعاملت معها في الإمارات. هندسة متقنة، التزام بالجدول الزمني وخدمة عملاء ممتازة على مدار الساعة.",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR TESTIMONIALS
// ==========================================
const testimonialsFr: Record<string, Partial<TestimonialItem>> = {
  "mohammed-al-maktoum": {
    name: "M. Mohammed Al Shamsi",
    role: "Promoteur Immobilier",
    location: "Palm Jumeirah, Dubaï",
    quote: "L'engagement d'Eco Pergola en matière de qualité et de respect des délais est exemplaire. Leurs coulissants minimaux offrent une isolation thermique et une élégance parfaites.",
  },
  "sarah-jenkins": {
    name: "Sarah Jenkins",
    role: "Architecte d'Intérieur",
    location: "Dubai Hills, Dubaï",
    quote: "Leur pergola bioclimatique motorisée a totalement métamorphosé notre espace extérieur. Les finitions de l'aluminium et l'intégration domotique sont irréprochables.",
  },
  "khalid-al-nuaimi": {
    name: "Dr. Khalid Al Nuaimi",
    role: "Propriétaire de Villa",
    location: "Emirates Hills, Dubaï",
    quote: "De loin la meilleure entreprise de fabrication aluminium et verre aux Émirats. Ingénierie précise, finitions soignées et service après-vente très réactif.",
  },
};

// ==========================================
// ARABIC TRANSLATIONS FOR FAQs
// ==========================================
const faqAr: Record<string, Partial<FaqItem>> = {
  "areas-served-uae": {
    question: "ما هي المناطق التي تغطيها خدمات إيكو برجولا في الإمارات؟",
    answer: "نقدم خدماتنا في كافة مناطق دبي (بما فيها نخلة جميرا، تلال الإمارات، دبي هيلز، دبي مارينا، المرابع العربية)، إضافة إلى أبوظبي، الشارقة، عجمان، رأس الخيمة، وكافة أنحاء دولة الإمارات.",
  },
  "warranty-coverage": {
    question: "ما هي مدة ونطاق الضمان على منتجاتكم؟",
    answer: "نقدم ضماناً شاملاً يصل إلى 10 سنوات على الهياكل الإنشائية وقطاعات الألمنيوم والطلاء ضد التآكل والبهتان، مع ضمان لمدة 5 سنوات على المحركات والأنظمة الكهربائية والزجاج المزدوج.",
  },
  "climate-resistance": {
    question: "كيف تتحمل منتجاتكم حرارة ورطوبة الصيف الشديدة في دبي؟",
    answer: "تصنع جميع قطاعاتنا من ألمنيوم معمارى 6063-T6 معالجة بحرارياً بطبقات أكسدة أو دهان بودرة كهروساكنة معتمدة Qualicoat Seaside Class 2، مع زجاج عازل حرارياً بتقنية Low-E يمنع 99% من الأشعة فوق البنفسجية.",
  },
  "lead-time-installation": {
    question: "كم يستغرق وقت تصنيع وتركيب البرجولا أو الواجهات الزجاجية؟",
    answer: "يستغرق التصنيع الهندسي المخصص عادة من 2 إلى 4 أسابيع بحسب حجم المشروع، ويتم التركيب الميداني خلال 2 إلى 5 أيام بواسطة فريقنا الفني المتخصص والمعتمد.",
  },
  "custom-designs": {
    question: "هل يمكنكم تنفيذ تصاميم وأبعاد مخصصة حسب طلب المعماري؟",
    answer: "نعم بالتأكيد. نقوم بتصميم وتفصيل كل برجولا وواجهة زجاجية بمقاسات دقيقة بالميليمتر ومطابقة للمخططات المعمارية مع توفير رسومات 3D وحسابات إنشائية معتمدة.",
  },
  "permits-approvals": {
    question: "هل تساعدون في استخراج تصاريح البناء والبلدية في دبي؟",
    answer: "نعم، يوفر فريقنا الهندسي المخططات والرسومات الفنية والحسابات الإنشائية اللازمة للحصول على الموافقات من بلدية دبي، وتراخيص، والمجمعات السكنية مثل إعمار ونخيل وميراس.",
  },
};

// ==========================================
// FRENCH TRANSLATIONS FOR FAQs
// ==========================================
const faqFr: Record<string, Partial<FaqItem>> = {
  "areas-served-uae": {
    question: "Quelles sont les zones desservies par Eco Pergola aux Émirats ?",
    answer: "Nous intervenons dans tout Dubaï (Palm Jumeirah, Emirates Hills, Dubai Hills, Marina, etc.), ainsi qu'à Abou Dhabi, Sharjah et sur l'ensemble des Émirats Arabes Unis.",
  },
  "warranty-coverage": {
    question: "Quelle est la durée et l'étendue de vos garanties ?",
    answer: "Nous offrons une garantie décennale complète (10 ans) sur les structures aluminium et les thermolaquages, ainsi que 5 ans sur les motorisations et les vitrages isolants.",
  },
  "climate-resistance": {
    question: "Comment vos produits résistent-ils au climat extrême de Dubaï ?",
    answer: "Nos profilés en aluminium 6063-T6 bénéficient d'un traitement Qualicoat Seaside de classe 2, combinés à des vitrages à contrôle solaire Low-E filtrant 99% des rayons UV et la chaleur.",
  },
  "lead-time-installation": {
    question: "Quels sont les délais de fabrication et de pose ?",
    answer: "La fabrication sur mesure prend généralement de 2 à 4 semaines, suivie d'une installation soignée sur site en 2 à 5 jours ouvrés par nos équipes qualifiées.",
  },
  "custom-designs": {
    question: "Réalisez-vous des structures 100% sur mesure ?",
    answer: "Oui, chaque ouvrage est conçu et usiné sur mesure au millimètre près d'après vos plans architecturaux, avec modélisation 3D et notes de calcul structurel.",
  },
  "permits-approvals": {
    question: "Prenez-vous en charge les permis et approbations de copropriété ?",
    answer: "Notre bureau d'études fournit tous les plans techniques nécessaires pour l'obtention des permis de la municipalité de Dubaï et des promoteurs (Emaar, Nakheel, Meraas).",
  },
};

// ==========================================
// EXPORT HELPER FUNCTIONS
// ==========================================

export function getLocalizedServices(locale: string): ServiceItem[] {
  if (locale === "ar") {
    return servicesData.map((s) => ({
      ...s,
      ...(servicesAr[s.id] || {}),
    }));
  }
  if (locale === "fr") {
    return servicesData.map((s) => ({
      ...s,
      ...(servicesFr[s.id] || {}),
    }));
  }
  return servicesData;
}

export function getLocalizedService(slug: string, locale: string): ServiceItem | undefined {
  const all = getLocalizedServices(locale);
  return all.find((s) => s.slug === slug);
}

export function getLocalizedPergolaTypes(locale: string): PergolaType[] {
  if (locale === "ar") {
    return pergolaTypesData.map((p) => ({
      ...p,
      ...(pergolaAr[p.id] || {}),
    }));
  }
  if (locale === "fr") {
    return pergolaTypesData.map((p) => ({
      ...p,
      ...(pergolaFr[p.id] || {}),
    }));
  }
  return pergolaTypesData;
}

export function getLocalizedPergola(slug: string, locale: string): PergolaType | undefined {
  const all = getLocalizedPergolaTypes(locale);
  return all.find((p) => p.slug === slug);
}

export function getLocalizedProducts(locale: string): ProductItem[] {
  if (locale === "ar") {
    return productsData.map((p) => ({
      ...p,
      ...(productsAr[p.id] || {}),
    }));
  }
  if (locale === "fr") {
    return productsData.map((p) => ({
      ...p,
      ...(productsFr[p.id] || {}),
    }));
  }
  return productsData;
}

export function getLocalizedProduct(id: string, locale: string): ProductItem | undefined {
  const all = getLocalizedProducts(locale);
  return all.find((p) => p.id === id);
}

export function getLocalizedProjects(locale: string): ProjectItem[] {
  if (locale === "ar") {
    return projectsData.map((p) => ({
      ...p,
      ...(projectsAr[p.id] || {}),
    }));
  }
  if (locale === "fr") {
    return projectsData.map((p) => ({
      ...p,
      ...(projectsFr[p.id] || {}),
    }));
  }
  return projectsData;
}

export function getLocalizedProject(id: string, locale: string): ProjectItem | undefined {
  const all = getLocalizedProjects(locale);
  return all.find((p) => p.id === id);
}

export function getLocalizedNews(locale: string): NewsItem[] {
  if (locale === "ar") {
    return newsData.map((n) => ({
      ...n,
      ...(newsAr[n.id] || {}),
    }));
  }
  if (locale === "fr") {
    return newsData.map((n) => ({
      ...n,
      ...(newsFr[n.id] || {}),
    }));
  }
  return newsData;
}

export function getLocalizedNewsItem(id: string, locale: string): NewsItem | undefined {
  const all = getLocalizedNews(locale);
  return all.find((n) => n.id === id);
}

export function getLocalizedTestimonials(locale: string): TestimonialItem[] {
  if (locale === "ar") {
    return testimonialsData.map((t) => ({
      ...t,
      ...(testimonialsAr[t.id] || {}),
    }));
  }
  if (locale === "fr") {
    return testimonialsData.map((t) => ({
      ...t,
      ...(testimonialsFr[t.id] || {}),
    }));
  }
  return testimonialsData;
}

export function getLocalizedFaqs(locale: string): FaqItem[] {
  if (locale === "ar") {
    return faqData.map((f) => ({
      ...f,
      ...(faqAr[f.id] || {}),
    }));
  }
  if (locale === "fr") {
    return faqData.map((f) => ({
      ...f,
      ...(faqFr[f.id] || {}),
    }));
  }
  return faqData;
}

export function getLocalizedBlog(locale: string): BlogPost[] {
  if (locale === "ar") {
    return blogData.map((b) => ({
      ...b,
      readingTime: "قراءة 6 دقائق",
    }));
  }
  if (locale === "fr") {
    return blogData.map((b) => ({
      ...b,
      readingTime: "6 min de lecture",
    }));
  }
  return blogData;
}

export function getLocalizedBlogPost(slug: string, locale: string): BlogPost | undefined {
  const all = getLocalizedBlog(locale);
  return all.find((b) => b.slug === slug);
}
