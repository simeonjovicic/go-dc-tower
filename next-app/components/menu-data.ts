/**
 * Die Karte — transkribiert aus der Abendkarte-PDF (Stand 2026/05, Lin & Huang GmbH),
 * abrufbar unter godctower.com/assets/img/menu/abendkarte.pdf.
 *
 * Preise in Euro, inkl. aller Abgaben. Buchstaben hinter den Gerichten sind die
 * gesetzlichen Allergenkennzeichnungen (EU-LMIV 1169/2011), siehe ALLERGENS.
 *
 * Fotos: hauseigene Aufnahmen aus Foto-alle, unter /public/foto/ abgelegt.
 */

export type CategoryId =
  | 'vorspeisen'
  | 'gyoza'
  | 'nudelsuppen'
  | 'main'
  | 'poke'
  | 'sushi'
  | 'kinder'
  | 'dessert';

export type Tag = 'vegan' | 'vegetarisch' | 'scharf';

/** Ein Gericht mit mehreren Einlagen zum selben Grundpreisschema. */
export type Variant = { label: string; price: number; allergens?: string; tags?: Tag[] };

export type Dish = {
  id: string;
  cat: CategoryId;
  name: string;
  /** Untertitel/Menge, z. B. "3 Stk." oder die englische Entsprechung */
  sub?: string;
  desc?: string;
  /** Einzelpreis; entfällt, wenn variants gesetzt ist */
  price?: number;
  variants?: Variant[];
  allergens?: string;
  tags?: Tag[];
  img?: string;
  /** Wenn true: Preis liegt uns noch nicht vor, UI zeigt "auf Anfrage" */
  priceOpen?: boolean;
};

export const ALLERGENS: Record<string, string> = {
  A: 'glutenhaltiges Getreide',
  B: 'Krebstiere',
  C: 'Ei',
  D: 'Fisch',
  E: 'Erdnuss',
  F: 'Soja',
  G: 'Milch oder Laktose',
  H: 'Schalenfrüchte',
  L: 'Sellerie',
  M: 'Senf',
  N: 'Sesam',
  O: 'Sulfite',
  P: 'Lupinen',
  R: 'Weichtiere',
};

export const CATEGORIES: {
  id: CategoryId;
  label: string;
  en?: string;
  intro?: string;
}[] = [
  { id: 'vorspeisen', label: 'Vorspeisen', en: 'starters' },
  { id: 'gyoza', label: 'Gyoza', en: 'homemade chinese dumplings' },
  {
    id: 'nudelsuppen',
    label: 'Nudelsuppen',
    en: 'noodle soups',
    intro: 'Das Herzstück des Hauses — Brühen, die lange ziehen, und Nudeln à la minute.',
  },
  { id: 'main', label: 'Main', en: 'with rice' },
  {
    id: 'poke',
    label: 'Poké Bowl',
    en: 'hawaiianische reisschalen mit sushi-fisch',
    intro:
      'Alle Poké Bowls werden mit Sushi-Reis, Topping, Avocado, Gurken, Salat und Kräutern serviert.',
  },
  {
    id: 'sushi',
    label: 'Sushi',
    en: '寿司',
    intro: 'Frischer Fisch, täglich selbst ausgesucht und filetiert.',
  },
  { id: 'kinder', label: 'Kinderspeisen', en: 'only for children' },
  { id: 'dessert', label: 'Dessert' },
];

export const DISHES: Dish[] = [
  // ── VORSPEISEN ────────────────────────────────────────────────────────────
  { id: 'miso-suppe', cat: 'vorspeisen', name: 'Miso Suppe', sub: 'miso soup', price: 3.8, allergens: 'A', tags: ['vegan'], img: '/foto/gericht-enhanced/misosuppe.webp' },
  { id: 'wantan-suppe', cat: 'vorspeisen', name: 'Wantan Suppe', sub: 'wonton soup', price: 6.2, allergens: 'AHF', img: '/foto/gericht-enhanced/wantansuppe.webp' },
  { id: 'edamame', cat: 'vorspeisen', name: 'Edamame', desc: 'gedämpfte japanische Sojabohnen', price: 6.0, tags: ['vegan'], img: '/foto/gericht-enhanced/edamame.webp' },
  { id: 'wakame', cat: 'vorspeisen', name: 'Wakame Seetang Salat', desc: 'jap. Algensalat', price: 6.0, allergens: 'AN', tags: ['vegan'], img: '/foto/gericht-enhanced/wakame.webp' },
  { id: 'fruehlingsrollen', cat: 'vorspeisen', name: 'Frühlingsrollen', sub: '3 Stk.', desc: 'hausgemacht, gefüllt mit Gemüse, Tofu und Glasnudel', price: 7.2, allergens: 'A', img: '/foto/gericht-enhanced/fruehlingsrollen.webp' },
  { id: 'chaoshou', cat: 'vorspeisen', name: 'Chao Shou', desc: 'Wantan gefüllt mit Schweinefleisch und Garnelen in Szechuan-Sauce', price: 6.8, allergens: 'AHN', tags: ['scharf'], img: '/foto/gericht-enhanced/chaoshou.webp' },
  { id: 'tuna-tataki', cat: 'vorspeisen', name: 'Tuna-Tataki', desc: 'kurz angebratener Thunfisch mit Koriander-Sauce', price: 12.0, allergens: 'ADFS', img: '/foto/gericht-enhanced/tuna-tataki.webp' },
  { id: 'chicken-tempura', cat: 'vorspeisen', name: 'Chicken Tempura', desc: 'Chicken Steak Tempura, Chili-Mayo', price: 7.2, allergens: 'AGO', img: '/foto/gericht-enhanced/chicken-tempura.webp' },
  { id: 'garnelen-tempura', cat: 'vorspeisen', name: 'Garnelen Tempura', sub: '3 Stk.', desc: 'Shrimps Tempura, Chili-Mayo', price: 6.8, allergens: 'AHCF', img: '/foto/gericht-enhanced/garnelen-tempura.webp' },
  { id: 'xiao-long-bao', cat: 'vorspeisen', name: 'Xiao Long Bao', sub: '4 Stk.', desc: "gedämpfte 'Shanghai'-Teigtaschen mit Schweinefleisch", price: 6.9, allergens: 'AF', img: '/foto/gericht-enhanced/xiao-long-bao.webp' },
  { id: 'gebackene-wantan', cat: 'vorspeisen', name: 'Gebackene Wantan', sub: '3 Stk.', desc: 'mit Garnelen und Schweinefleisch', price: 6.2, allergens: 'ABCF', img: '/foto/gericht-enhanced/gebackene-wantan.webp' },
  { id: 'garnelenrollen', cat: 'vorspeisen', name: 'Garnelenrollen', sub: '3 Stk.', desc: 'gebacken mit Bambussprossen', price: 7.8, allergens: 'ABCF' },
  { id: 'gruener-salat', cat: 'vorspeisen', name: 'Grüner Salat', price: 6.0, tags: ['vegan'], img: '/foto/gericht-enhanced/gruener-salat.webp' },

  // ── GYOZA ─────────────────────────────────────────────────────────────────
  { id: 'gyoza-veg', cat: 'gyoza', name: 'Vegetarisch', sub: 'vegetables', allergens: 'AFN', tags: ['vegetarisch'], variants: [{ label: '6 Stk.', price: 8.8 }, { label: '10 Stk.', price: 13.2 }] },
  { id: 'gyoza-rind', cat: 'gyoza', name: 'Rindfleisch', sub: 'with beef', allergens: 'AFN', variants: [{ label: '6 Stk.', price: 8.8 }, { label: '10 Stk.', price: 13.2 }] },
  { id: 'gyoza-huhn', cat: 'gyoza', name: 'Huhn', sub: 'with chicken', allergens: 'AFN', variants: [{ label: '6 Stk.', price: 8.8 }, { label: '10 Stk.', price: 13.2 }] },
  { id: 'gyoza-garnelen', cat: 'gyoza', name: 'Garnelen und Bärlauch', sub: 'with prawns and wild garlic', allergens: 'ABFN', variants: [{ label: '6 Stk.', price: 9.8 }, { label: '10 Stk.', price: 14.2 }] },
  { id: 'gyoza-mix', cat: 'gyoza', name: 'Mix', variants: [{ label: '8 Stk.', price: 11.4 }, { label: '12 Stk.', price: 14.8 }] },

  // ── NUDELSUPPEN ───────────────────────────────────────────────────────────
  {
    id: 'lamien', cat: 'nudelsuppen', name: 'La Mien', sub: '[laa miaehn]',
    desc: 'Fliegende Nudeln aus Weizenmehl, à la minute gehobelt in feiner Hühnerbrühe, serviert mit Pakchoi und Koriander',
    img: '/foto/gericht-enhanced/lamien-rind.webp',
    variants: [
      { label: 'mit Gemüse', price: 13.5, allergens: 'AFL', tags: ['vegetarisch'] },
      { label: 'mit Huhn', price: 13.5, allergens: 'AFL' },
      { label: 'mit Rind', price: 14.5, allergens: 'AFLR' },
      { label: 'mit Ente', price: 14.5, allergens: 'AFLR' },
      { label: 'mit Meeresfrüchten', price: 15.8, allergens: 'ABFLR' },
      { label: 'mit Kokoscurry u. Rindsfaschiertem', price: 14.8, allergens: 'ABCLH', tags: ['scharf'] },
    ],
  },
  {
    id: 'pho', cat: 'nudelsuppen', name: 'Pho', sub: '[fooh]',
    desc: 'Reisbandnudelsuppe in feiner Hühnerbrühe, serviert mit Sojasprossen, Koriander, Limette und Einlage nach Wahl',
    variants: [
      { label: 'mit Gemüse', price: 13.5, allergens: 'AFL', tags: ['vegetarisch'] },
      { label: 'mit Huhn', price: 13.5, allergens: 'AFL' },
      { label: 'mit Rind', price: 14.5, allergens: 'AFLR' },
      { label: 'mit Ente', price: 14.5, allergens: 'AFLR' },
      { label: 'mit Meeresfrüchten', price: 15.8, allergens: 'ABFLR' },
    ],
  },
  { id: 'udon-meeresfruechte', cat: 'nudelsuppen', name: 'Udon-Nudelsuppe mit Meeresfrüchte', sub: 'udon noodle soup with seafood', price: 15.8, allergens: 'ABFRL', img: '/foto/gericht-enhanced/udon-meeresfruechte.webp' },
  { id: 'wantansuppe-ente', cat: 'nudelsuppen', name: 'Wantansuppe mit Shrimpsnudel und Ente', price: 14.8, allergens: 'AHCFL', img: '/foto/gericht-enhanced/wantansuppe-ente.webp' },
  { id: 'wantansuppe-10', cat: 'nudelsuppen', name: 'Wantansuppe', sub: '10 Stück, nur Wantan', price: 14.2, allergens: 'AHCFL' },

  // ── MAIN ──────────────────────────────────────────────────────────────────
  {
    id: 'kokos-curry', cat: 'main', name: 'Kokos-Curry mit Reis', sub: 'coconut curry with rice',
    allergens: 'AF', tags: ['scharf'], img: '/foto/gericht-enhanced/kokos-curry.webp',
    variants: [
      { label: 'Garnelen', price: 17.2, allergens: 'H' },
      { label: 'Huhn', price: 16.2 },
      { label: 'Gemüse', price: 15.8, tags: ['vegetarisch'] },
    ],
  },
  {
    id: 'wok-nudeln', cat: 'main', name: 'Wok Nudeln', sub: 'fried noodles',
    allergens: 'AFR', img: '/foto/gericht-enhanced/wok-nudeln-rind.webp',
    variants: [
      { label: 'Rind', price: 16.8 },
      { label: 'Huhn', price: 16.2 },
      { label: 'Gemüse', price: 15.2, tags: ['vegetarisch'] },
    ],
  },
  {
    id: 'eierreis', cat: 'main', name: 'Gebratener Eierreis', sub: 'fried egg rice',
    allergens: 'ACF', img: '/foto/gericht-enhanced/eierreis-rind.webp',
    variants: [
      { label: 'Rind', price: 16.8, allergens: 'R' },
      { label: 'Huhn', price: 16.2 },
      { label: 'Gemüse', price: 15.8 },
      { label: 'Garnelen', price: 16.8, allergens: 'H' },
    ],
  },
  {
    id: 'chili-basilikum', cat: 'main', name: 'Chili & Basilikum', sub: 'chili and thai basil',
    allergens: 'AFRLO', tags: ['scharf'], img: '/foto/gericht-enhanced/chili-rind.webp',
    variants: [
      { label: 'Huhn', price: 16.8 },
      { label: 'Beef', price: 16.8 },
      { label: 'Ente', price: 16.8 },
      { label: 'Garnelen', price: 17.2, allergens: 'H' },
    ],
  },
  {
    id: 'bulgogi', cat: 'main', name: 'Bulgogi', desc: 'koreanische marinierte Fleischspezialität mit Spiegelei und Reis',
    price: 16.9, allergens: 'ACFNOR', img: '/foto/gericht-enhanced/bulgogi-rind.webp',
    variants: [{ label: 'mit Rind', price: 16.9 }, { label: 'mit Huhn', price: 16.9 }],
  },
  { id: 'knusprige-ente', cat: 'main', name: 'Knusprige Ente', desc: 'mit Teriyakisauce oder Knoblauchsauce, dazu gebratenes Gemüse', price: 18.9, allergens: 'AFLR', img: '/foto/gericht-enhanced/knusprige-ente.webp' },
  { id: 'lachs-gegrillt', cat: 'main', name: 'Lachs gegrillt', desc: 'mit Mangosauce oder Teriyakisauce, dazu gebratenes Gemüse', price: 17.2, allergens: 'ADFNO', img: '/foto/gericht-enhanced/lachs-gegrillt.webp' },
  { id: 'tofu-teriyaki', cat: 'main', name: 'Tofu', desc: 'gegrillt mit Gemüse und Teriyakisauce', price: 15.8, allergens: 'AF', tags: ['vegetarisch'] },
  { id: 'mapo-tofu', cat: 'main', name: 'Mapo Tofu', price: 15.8, allergens: 'AF', tags: ['scharf'], img: '/foto/gericht-enhanced/mapo-tofu.webp' },

  // ── POKÉ BOWL ─────────────────────────────────────────────────────────────
  { id: 'poke-lachs', cat: 'poke', name: 'Lachs', sub: 'salmon', price: 15.2, allergens: 'D', img: '/foto/gericht-enhanced/poke-lachs.webp' },
  { id: 'poke-maguro', cat: 'poke', name: 'Maguro', sub: 'Thunfisch | tuna', price: 16.8, allergens: 'D', img: '/foto/gericht-enhanced/poke-maguro.webp' },
  { id: 'poke-shrimps', cat: 'poke', name: 'Shrimps gegrillt', sub: 'grilled shrimps', price: 15.2, allergens: 'B', img: '/foto/gericht-enhanced/poke-shrimps.webp' },
  { id: 'poke-tofu', cat: 'poke', name: 'Tofu', price: 13.8, allergens: 'A', tags: ['vegan'], img: '/foto/gericht-enhanced/poke-tofu.webp' },
  { id: 'poke-crispy-chicken', cat: 'poke', name: 'Crispy Chicken', price: 14.2, allergens: 'ACF', img: '/foto/gericht-enhanced/poke-crispy-chicken.webp' },

  // ── SUSHI ─────────────────────────────────────────────────────────────────
  // ACHTUNG: Die Sushi-Karte liegt uns noch nicht vor. Namen sind hier nach den
  // Fotos beschrieben und ausdrücklich Platzhalter — vor dem Livegang mit den
  // echten Bezeichnungen und Preisen aus der Küche ersetzen.
  { id: 'sushi-platte', cat: 'sushi', name: 'Sushi-Auswahl des Hauses', desc: 'Platzhalter — Bezeichnung und Preis folgen', priceOpen: true, img: '/foto/sushi/sushi-platte.webp' },
  { id: 'sushi-maki', cat: 'sushi', name: 'Maki-Auswahl', desc: 'Platzhalter — Bezeichnung und Preis folgen', priceOpen: true, img: '/foto/sushi/sushi-maki.webp' },
  { id: 'sushi-mango-roll', cat: 'sushi', name: 'Inside-Out Roll mit Mango', desc: 'Platzhalter — Bezeichnung und Preis folgen', priceOpen: true, img: '/foto/sushi/sushi-mango-roll.webp' },
  { id: 'sushi-lachs-roll', cat: 'sushi', name: 'Inside-Out Roll mit Lachs', desc: 'Platzhalter — Bezeichnung und Preis folgen', priceOpen: true, img: '/foto/sushi/sushi-lachs-roll.webp' },

  // ── KINDERSPEISEN ─────────────────────────────────────────────────────────
  {
    id: 'kinder-nudeln', cat: 'kinder', name: 'Gebratene Nudeln', sub: 'fried noodles', allergens: 'AFR',
    variants: [
      { label: 'Rind', price: 9.8, allergens: 'R' },
      { label: 'Huhn', price: 9.8 },
      { label: 'Gemüse', price: 9.8, tags: ['vegetarisch'] },
      { label: 'Garnelen', price: 11.8, allergens: 'H' },
    ],
  },
  {
    id: 'kinder-eierreis', cat: 'kinder', name: 'Gebratener Eierreis', sub: 'fried egg rice', allergens: 'AF',
    variants: [
      { label: 'Rind', price: 9.8, allergens: 'R' },
      { label: 'Huhn', price: 9.8 },
      { label: 'Gemüse', price: 9.8 },
      { label: 'Garnelen', price: 11.8, allergens: 'H' },
    ],
  },
  { id: 'kinder-crispy-chicken', cat: 'kinder', name: 'Crispy Chicken mit Reis', desc: 'Mangosauce oder Teriyakisauce · mit Gemüse +1,00', price: 10.8, allergens: 'ACF' },

  // ── DESSERT ───────────────────────────────────────────────────────────────
  { id: 'hong-tang-ci-ba', cat: 'dessert', name: 'Hong Tang Ci Ba', sub: '3 Stk.', desc: 'gebackene chinesische Reiskuchen gefüllt mit Braunzucker', price: 5.0, allergens: 'FA', img: '/foto/gericht-enhanced/hong-tang-ci-ba.webp' },
  { id: 'mochi', cat: 'dessert', name: 'Mochi', sub: '1 Stk.', desc: 'hausgemachter jap. sticky rice cake, verschiedene Sorten', price: 4.0, tags: ['vegan'], img: '/foto/gericht-enhanced/mochi.webp' },
  { id: 'eis-mochi', cat: 'dessert', name: 'Eis Mochi', sub: '1 Stk.', desc: 'verschiedene Sorten', price: 2.5, tags: ['vegan'], img: '/foto/gericht-enhanced/eis-mochi.webp' },
  { id: 'eiscreme', cat: 'dessert', name: 'Eiscreme', desc: 'Matcha | Schwarzer Sesam', price: 2.5, allergens: 'G' },
];

/** Aufpreise, die quer über die Karte gelten. */
export const EXTRAS: { label: string; price: number; note?: string }[] = [
  { label: 'extra Jasmin Reis', price: 2.5 },
  { label: 'extra Koriander', price: 1.5 },
  { label: 'extra Sauce', price: 1.5 },
  { label: 'Kokoscurry zu jeder La Mien- oder Pho-Suppe', price: 1.0, note: 'scharf' },
];

export const POKE_SAUCEN = [
  'Sesam-Soja',
  'Mango',
  'Spicy Korean',
  'Wasabi-Creme',
  'Trüffel-Mayo',
];

/** Getränke — Auszug aus der Karte, gruppiert wie im Original. */
export const DRINKS: { group: string; items: { name: string; detail?: string; price: string }[] }[] = [
  {
    group: 'Alkoholfrei',
    items: [
      { name: 'Hausgemachte Limonade', detail: 'Jasmin-Zitronengras · Ingwer-Limette · 0,3 l / 0,5 l', price: '3,50 / 5,50' },
      { name: 'Vöslauer prickelnd | still', detail: '0,33 l / 0,75 l', price: '3,40 / 6,20' },
      { name: 'Apfelsaft naturtrüb', detail: '0,25 l', price: '3,60' },
      { name: 'Pago Fruchtsäfte', detail: 'Mango · Johannisbeere · Marille · Erdbeere · Drachenfrucht-Guava · 0,2 l', price: '4,20' },
      { name: 'Coca Cola | Zero · Sprite | Fanta · Almdudler', detail: '0,33 l', price: '3,90' },
      { name: 'Lycheesaft', detail: '0,25 l', price: '3,80' },
    ],
  },
  {
    group: 'Tee & Kaffee',
    items: [
      { name: 'Grüner Tee | Jasmin | Chrysanthemen', price: '3,80' },
      { name: 'Gen Mai', detail: 'japanischer grüner Reistee', price: '3,80' },
      { name: 'Ingwer Tee · Goji Rosen Tee', price: '3,80' },
      { name: 'Matcha Latte', detail: 'kalt oder warm', price: '5,50' },
      { name: 'Espresso | Brauner | Macchiato', detail: 'klein / groß', price: '3,20 / 3,60' },
      { name: 'Melange · Cappuccino', price: '4,50' },
      { name: 'Cafe Latte', price: '5,50' },
    ],
  },
  {
    group: 'Bier',
    items: [
      { name: 'Ottakringer Helles vom Fass', detail: '0,33 l / 0,5 l', price: '4,20 / 5,90' },
      { name: 'Ottakringer Citrus Radler', detail: '0,33 l', price: '4,20' },
      { name: 'Ottakringer Null Komma Josef', detail: 'alkoholfrei · 0,33 l', price: '4,20' },
      { name: 'Asahi · Tsingtao', detail: '0,33 l', price: '4,50' },
    ],
  },
  {
    group: 'Reiswein & Digestif',
    items: [
      { name: 'Ozeki Jumai Sake', detail: 'dry, 15 % · 0,125 l', price: '6,00' },
      { name: 'Yuzu Sparkling Sake', detail: '5 % · 0,25 l', price: '10,00' },
      { name: 'Soju', detail: 'koreanischer Reiswein, 16,5 % · 4 cl / 0,3 l', price: '4,00 / 15,00' },
      { name: 'Fen Chiew', detail: 'chinesischer Schnaps aus Hirse und Weizen, 51 % · 2 cl', price: '6,00' },
      { name: 'Averna · Bambusschnaps', detail: '4 cl / 2 cl', price: '4,00' },
    ],
  },
];

/** Externes Bestellsystem (restaurantlogin.at) — vom Kunden bereitgestellt. */
export const ORDER_URL =
  'https://www.restaurantlogin.at/ordering/?restaurant_uid=548b70b8-d40c-4821-9093-68a955a5afb5&utm_source=ig&utm_medium=social&utm_content=link_in_bio&return_url=https%3A%2F%2Fgodctower.com%2F';

export const TAG_LABEL: Record<Tag, string> = {
  vegan: 'vegan',
  vegetarisch: 'vegetarisch',
  scharf: 'scharf',
};

export const fmt = (n: number) => n.toFixed(2).replace('.', ',');

/** Kleinster Preis eines Gerichts — für "ab €" bei Gerichten mit Varianten. */
export const priceFrom = (d: Dish): number | null => {
  if (typeof d.price === 'number') return d.price;
  if (d.variants?.length) return Math.min(...d.variants.map((v) => v.price));
  return null;
};

export const dishesOf = (cat: CategoryId) => DISHES.filter((d) => d.cat === cat);
