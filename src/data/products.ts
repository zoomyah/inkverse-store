import type { Product } from "@/api/types";
import { img } from "./images";

// ===== INKVERSE catalog — 14 products across 6 categories =====
// Invented anime series: Neo Samurai, Crystal Maiden, Mecha Reign,
// Sakura Yokai, Phantom Academy, Star Voyager.

const neoSamurai1 = img(
  "detailed samurai anime figure with glowing katana, dark pedestal, studio lighting, neon pink rim light, product photography, manga ink style"
);
const neoSamurai2 = img(
  "ronin warrior figure in dynamic pose, neon city background, collectible, dramatic product shot"
);
const crystal1 = img(
  "magical girl anime figure with crystal staff, pastel neon glow, dark background, product photography"
);
const mecha1 = img(
  "giant mecha robot figure, weathered armor, battle pose, studio lighting, dark background, collectible"
);
const yokai1 = img(
  "anime fox spirit figure with glowing mask, sakura petals, dark background, product shot"
);
const phantom1 = img(
  "anime school ghost figure, eerie glow, dark pedestal, collectible, dramatic lighting"
);
const star1 = img(
  "space pilot anime figure with helmet, stars background, neon glow, collectible product shot"
);

const mangaNeo = img(
  "manga volume cover Neo Samurai, bold ink art, samurai with katana, dynamic shonen composition, vibrant"
);
const mangaCrystal = img(
  "manga volume cover Crystal Maiden, magical girl, pastel ink, stars and crystals, dramatic"
);
const mangaMecha = img(
  "manga volume cover Mecha Reign, giant robot battle, bold mecha ink art, explosive composition"
);
const mangaPhantom = img(
  "manga volume cover Phantom Academy, eerie school horror ink art, ghosts, dramatic shadows"
);

const teeNeo = img(
  "anime graphic t-shirt flat lay, Neo Samurai skull and katana neon print on black fabric, manga panel design"
);
const hoodieMecha = img(
  "anime graphic hoodie flat lay, Mecha Reign robot neon print on black fabric, mecha design"
);
const teeSakura = img(
  "anime graphic t-shirt flat lay, Sakura Yokai fox spirit neon print on black fabric, vibrant"
);

const posterNeo = img(
  "anime art poster, Neo Samurai warrior dramatic ink illustration, wall mounted, neon pink accents"
);
const posterStar = img(
  "anime art poster, Star Voyager space scene, vibrant ink, wall mounted, neon cyan accents"
);

const plushYokai = img(
  "cute anime fox yokai plush toy, soft lighting, product shot, pastel neon glow, dark background"
);
const plushCrystal = img(
  "cute anime magical girl plush toy, crystal accessory, soft lighting, product shot"
);

const pinNeo = img(
  "anime enamel pin collection macro, Neo Samurai katana pins, dark background, neon reflections"
);
const keychainMecha = img(
  "anime mecha keychain collection macro, robot keychains, dark background, neon reflections"
);
const accessoriesSet = img(
  "anime enamel pin and keychain collection macro, dark background, neon reflections, product photography"
);

export const PRODUCTS: Product[] = [
  // ===== FIGURES (4) =====
  {
    id: "p01",
    slug: "neo-samurai-ronin-figure",
    name: "Ronin of the Neon Dawn — Figure",
    category: "figures",
    series: "Neo Samurai",
    price: 89.0,
    compareAtPrice: 119.0,
    images: [neoSamurai1, neoSamurai2],
    description:
      "Hand-painted collectible figure of the nameless ronin who walks the neon-lit alleys of New Edo. Includes swappable katana and sheath, magnetic base, and glow-in-the-dark energy blade trail. Limited run of 1,500 units worldwide.",
    specs: {
      Scale: "1/7 (approx. 24cm)",
      Material: "PVC, ABS, magnetic base",
      Edition: "Limited 1,500",
      Releases: "Q1 2026",
    },
    rating: 4.9,
    reviewsCount: 218,
    stock: 32,
    featured: true,
    isNew: true,
    createdAt: "2026-05-12T10:00:00Z",
  },
  {
    id: "p02",
    slug: "crystal-maiden-seraphina-figure",
    name: "Seraphina of the Shattered Star — Figure",
    category: "figures",
    series: "Crystal Maiden",
    price: 94.0,
    images: [crystal1],
    description:
      "The Crystal Maiden Seraphina in her ascended form, holding the Shattered Star staff with a translucent crystal that catches the light. A pastel-neon paint job and a sculpted cosmic base make this a centerpiece.",
    specs: {
      Scale: "1/7 (approx. 25cm)",
      Material: "PVC, ABS, LED-ready base",
      Edition: "Standard",
      Releases: "Q2 2026",
    },
    rating: 4.8,
    reviewsCount: 142,
    stock: 18,
    featured: true,
    isNew: false,
    createdAt: "2026-04-02T10:00:00Z",
  },
  {
    id: "p03",
    slug: "mecha-reign-vanguard-figure",
    name: "Vanguard Mk-IV Mecha — Figure",
    category: "figures",
    series: "Mecha Reign",
    price: 129.0,
    compareAtPrice: 159.0,
    images: [mecha1],
    description:
      "A heavily armored Vanguard Mk-IV from the Mecha Reign frontline. Die-cast joints, weathered battle damage paint, and 38 points of articulation. Comes with two rifle accessories and a rechargeable eye-LED unit.",
    specs: {
      Scale: "1/12 (approx. 20cm)",
      Material: "Die-cast alloy, ABS, PVC",
      Articulation: "38 points",
      Releases: "Q1 2026",
    },
    rating: 4.7,
    reviewsCount: 96,
    stock: 11,
    featured: false,
    isNew: true,
    createdAt: "2026-05-20T10:00:00Z",
  },
  {
    id: "p04",
    slug: "sakura-yokai-kitsune-figure",
    name: "Kitsune of the Hollow Mask — Figure",
    category: "figures",
    series: "Sakura Yokai",
    price: 79.0,
    images: [yokai1],
    description:
      "The nine-tailed Kitsune guardian in mid-dance, holding her hollowed Noh mask. Sculpted sakura petals swirl around the base, and the tails are wired for custom posing.",
    specs: {
      Scale: "1/8 (approx. 22cm)",
      Material: "PVC, ABS, wired tails",
      Edition: "Standard",
      Releases: "Q2 2026",
    },
    rating: 4.9,
    reviewsCount: 174,
    stock: 25,
    featured: true,
    isNew: false,
    createdAt: "2026-03-15T10:00:00Z",
  },

  // ===== MANGA (4) =====
  {
    id: "p05",
    slug: "neo-samurai-vol-1-manga",
    name: "Neo Samurai — Vol. 1 (Manga)",
    category: "manga",
    series: "Neo Samurai",
    price: 12.5,
    images: [mangaNeo],
    description:
      "The debut volume of Neo Samurai. Follow the nameless ronin across a neon-soaked New Edo as he hunts the seven warlords who burned his temple. Premium ink-on-cream paper, first-print foil cover, and a reversible jacket.",
    specs: {
      Pages: "208",
      Format: "Tankobon paperback",
      Language: "English (translated)",
      Releases: "Vol. 1 of 6",
    },
    rating: 4.8,
    reviewsCount: 412,
    stock: 140,
    featured: false,
    isNew: false,
    createdAt: "2026-01-10T10:00:00Z",
  },
  {
    id: "p06",
    slug: "crystal-maiden-vol-3-manga",
    name: "Crystal Maiden — Vol. 3 (Manga)",
    category: "manga",
    series: "Crystal Maiden",
    price: 13.0,
    images: [mangaCrystal],
    description:
      "Volume 3 of Crystal Maiden. Seraphina unlocks the Shattered Star and faces the Obsidian Choir. Includes a four-page color gallery and translator notes on the rune script.",
    specs: {
      Pages: "196",
      Format: "Tankobon paperback",
      Language: "English (translated)",
      Releases: "Vol. 3 of 5",
    },
    rating: 4.6,
    reviewsCount: 188,
    stock: 95,
    featured: false,
    isNew: true,
    createdAt: "2026-05-05T10:00:00Z",
  },
  {
    id: "p07",
    slug: "mecha-reign-vol-2-manga",
    name: "Mecha Reign — Vol. 2 (Manga)",
    category: "manga",
    series: "Mecha Reign",
    price: 11.0,
    compareAtPrice: 15.0,
    images: [mangaMecha],
    description:
      "The Vanguard squadron assaults the orbital fortress in this explosive second volume. Heavy mecha ink work, fold-out battle schematic, and a foreword from the creator.",
    specs: {
      Pages: "184",
      Format: "Tankobon paperback",
      Language: "English (translated)",
      Releases: "Vol. 2 of 8",
    },
    rating: 4.7,
    reviewsCount: 233,
    stock: 60,
    featured: true,
    isNew: false,
    createdAt: "2026-02-22T10:00:00Z",
  },
  {
    id: "p08",
    slug: "phantom-academy-vol-1-manga",
    name: "Phantom Academy — Vol. 1 (Manga)",
    category: "manga",
    series: "Phantom Academy",
    price: 12.0,
    images: [mangaPhantom],
    description:
      "A haunted-school horror debut. Transfer student Rei discovers the seventh staircase that only appears at 4:44 AM. Cream paper, deep-ink shadows, and a glow-in-the-dark cover accent.",
    specs: {
      Pages: "200",
      Format: "Tankobon paperback",
      Language: "English (translated)",
      Releases: "Vol. 1 of 4",
    },
    rating: 4.5,
    reviewsCount: 121,
    stock: 78,
    featured: false,
    isNew: false,
    createdAt: "2026-01-28T10:00:00Z",
  },

  // ===== APPAREL (2) =====
  {
    id: "p09",
    slug: "neo-samurai-skull-tee",
    name: "Neo Samurai — Skull & Katana Tee",
    category: "apparel",
    series: "Neo Samurai",
    price: 34.0,
    compareAtPrice: 42.0,
    images: [teeNeo],
    description:
      "Heavy-weight black tee with a bold manga-panel print of the ronin's skull crest and katana. Neon-pink and cyan discharge ink for a soft hand-feel that won't crack.",
    specs: {
      Fabric: "240gsm combed cotton",
      Fit: "Unisex regular",
      Print: "Discharge ink, neon",
      Sizes: "S–2XL",
    },
    rating: 4.7,
    reviewsCount: 87,
    stock: 200,
    featured: true,
    isNew: false,
    createdAt: "2026-03-01T10:00:00Z",
  },
  {
    id: "p10",
    slug: "mecha-reign-pilot-hoodie",
    name: "Mecha Reign — Pilot Hoodie",
    category: "apparel",
    series: "Mecha Reign",
    price: 64.0,
    images: [hoodieMecha],
    description:
      "Mid-weight black hoodie with a Mecha Reign Vanguard back-print and a chest cockpit insignia. Brushed fleece interior, neon-cyan drawstrings, and a hidden interior pocket.",
    specs: {
      Fabric: "320gsm brushed fleece",
      Fit: "Unisex relaxed",
      Print: "Plastisol, neon-cyan",
      Sizes: "S–3XL",
    },
    rating: 4.8,
    reviewsCount: 64,
    stock: 120,
    featured: false,
    isNew: true,
    createdAt: "2026-05-18T10:00:00Z",
  },

  // ===== POSTERS (1) =====
  {
    id: "p11",
    slug: "neo-samurai-dawn-poster",
    name: "Neo Samurai — Dawn Blade Poster",
    category: "posters",
    series: "Neo Samurai",
    price: 22.0,
    images: [posterNeo],
    description:
      "A2 gallery print of the ronin drawing his blade at dawn over New Edo. Heavy matte paper, museum-grade inks, and a subtle neon-pink foil on the katana edge. Ships in a rigid tube.",
    specs: {
      Size: "A2 (42 × 59.4cm)",
      Paper: "250gsm matte archival",
      Finish: "Foil accent on katana",
      Edition: "Open",
    },
    rating: 4.9,
    reviewsCount: 56,
    stock: 85,
    featured: true,
    isNew: false,
    createdAt: "2026-02-10T10:00:00Z",
  },

  // ===== PLUSHIES (2) =====
  {
    id: "p12",
    slug: "sakura-yokai-kitsune-plush",
    name: "Sakura Yokai — Kitsune Plush",
    category: "plushies",
    series: "Sakura Yokai",
    price: 29.0,
    images: [plushYokai],
    description:
      "A soft nine-tailed Kitsune plush with embroidered hollow mask and a sakura-petal belly patch. Filled with PP cotton, tails are floppy and cuddly. Suitable for ages 3+.",
    specs: {
      Height: "28cm",
      Material: "Plush polyester, PP cotton",
      Safety: "CE/UKCA, ages 3+",
      Edition: "Standard",
    },
    rating: 4.8,
    reviewsCount: 143,
    stock: 90,
    featured: false,
    isNew: true,
    createdAt: "2026-05-22T10:00:00Z",
  },
  {
    id: "p13",
    slug: "crystal-maiden-star-plush",
    name: "Crystal Maiden — Star Plush",
    category: "plushies",
    series: "Crystal Maiden",
    price: 27.0,
    compareAtPrice: 33.0,
    images: [plushCrystal],
    description:
      "Seraphina in chibi plush form, clutching a soft star with a satin crystal accent. Embroidered eyes and a removable hooded cape. Spot clean only.",
    specs: {
      Height: "24cm",
      Material: "Plush polyester, PP cotton, satin",
      Safety: "CE/UKCA, ages 3+",
      Edition: "Standard",
    },
    rating: 4.7,
    reviewsCount: 78,
    stock: 65,
    featured: false,
    isNew: false,
    createdAt: "2026-04-08T10:00:00Z",
  },

  // ===== ACCESSORIES (1) =====
  {
    id: "p14",
    slug: "neo-samurai-enamel-pin-set",
    name: "Neo Samurai — Katana Pin Set",
    category: "accessories",
    series: "Neo Samurai",
    price: 18.0,
    images: [pinNeo, keychainMecha, accessoriesSet],
    description:
      "A trio of hard-enamel pins: the ronin's katana, the lotus kamon, and the warlord's burning eye. Gold-plated rims, rubber backers, and a printed manga-panel backing card.",
    specs: {
      Material: "Hard enamel, gold plating",
      Size: "Each ~35mm",
      Backing: "Rubber clutch",
      Set: "3 pins",
    },
    rating: 4.9,
    reviewsCount: 102,
    stock: 150,
    featured: true,
    isNew: false,
    createdAt: "2026-02-28T10:00:00Z",
  },
];
