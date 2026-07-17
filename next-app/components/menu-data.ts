export type CategoryId = 'la-mian' | 'ramen' | 'bowls' | 'wok' | 'gyoza' | 'sushi';

export type Tag = 'spicy' | 'veg' | 'new';

export type Dish = {
  id: string;
  cat: CategoryId;
  name: string;
  desc: string;
  price: number;
  tag?: Tag;
  tagText?: string;
  img: string;
};

/** External ordering system (restaurantlogin.at) — provided by the client. */
export const ORDER_URL =
  'https://www.restaurantlogin.at/ordering/?restaurant_uid=548b70b8-d40c-4821-9093-68a955a5afb5&utm_source=ig&utm_medium=social&utm_content=link_in_bio&return_url=https%3A%2F%2Fgodctower.com%2F';

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'la-mian', label: 'La Mian' },
  { id: 'ramen', label: 'Ramen' },
  { id: 'bowls', label: 'Bowls' },
  { id: 'wok', label: 'Wok' },
  { id: 'gyoza', label: 'Gyoza & Rolls' },
  { id: 'sushi', label: 'Sushi' },
];

export const DISHES: Dish[] = [
  // LA MIAN
  { id: 'lm-coco', cat: 'la-mian', name: 'Kokoscurry La Mian', desc: 'Handgezogene Nudeln · Hühnchen · Kokos · Limettenblatt', price: 14.9, tag: 'spicy', tagText: 'Mild scharf',
    img: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=700&q=80&auto=format&fit=crop' },
  { id: 'lm-bul', cat: 'la-mian', name: 'Bulgogi Huhn La Mian', desc: 'Mariniertes Huhn · Frühlingszwiebel · scharfe Brühe', price: 14.5, tag: 'spicy', tagText: 'Scharf',
    img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=700&q=80&auto=format&fit=crop' },
  { id: 'lm-beef', cat: 'la-mian', name: 'Beef La Mian', desc: 'Geschmorte Rindfleischscheiben · Pak Choi · Sesam', price: 15.9,
    img: 'https://images.unsplash.com/photo-1612929633738-8fe44f7ec841?w=700&q=80&auto=format&fit=crop' },
  { id: 'lm-veg', cat: 'la-mian', name: 'Veggie La Mian', desc: 'Knackiges Marktgemüse · Misobrühe · Tofu', price: 12.9, tag: 'veg', tagText: 'Vegan',
    img: 'https://images.unsplash.com/photo-1607330289024-1535c6b4e1c1?w=700&q=80&auto=format&fit=crop' },
  // RAMEN
  { id: 'ra-tonk', cat: 'ramen', name: 'Tonkotsu Ramen', desc: 'Cremige Schweineknochen-Brühe · Chashu · Ei · Nori', price: 15.5, tag: 'new', tagText: 'Neu',
    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=700&q=80&auto=format&fit=crop' },
  { id: 'ra-shoyu', cat: 'ramen', name: 'Shoyu Ramen', desc: 'Klassische Sojasaucenbrühe · Hühnchen · Bambus', price: 14.5,
    img: 'https://images.unsplash.com/photo-1557872943-16a5ac26437e?w=700&q=80&auto=format&fit=crop' },
  { id: 'ra-miso', cat: 'ramen', name: 'Miso Ramen', desc: 'Rote Miso-Brühe · Mais · Frühlingszwiebel · Sesam', price: 14.5,
    img: 'https://images.unsplash.com/photo-1632709810780-b5a4343cefea?w=700&q=80&auto=format&fit=crop' },
  { id: 'ra-veg', cat: 'ramen', name: 'Veggie Shio Ramen', desc: 'Klare Salzbrühe · Tofu · Spinat · Pilze', price: 13.5, tag: 'veg', tagText: 'Vegan',
    img: 'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=700&q=80&auto=format&fit=crop' },
  // BOWLS
  { id: 'bo-bulgo', cat: 'bowls', name: 'Bulgogi Huhn Bowl', desc: 'Jasminreis · mariniertes Huhn · Edamame · Sesam', price: 13.9,
    img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=700&q=80&auto=format&fit=crop' },
  { id: 'bo-lachs', cat: 'bowls', name: 'Teriyaki Lachs Bowl', desc: 'Lachs · Avocado · Edamame · Sushi-Reis', price: 15.9,
    img: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?w=700&q=80&auto=format&fit=crop' },
  { id: 'bo-poke', cat: 'bowls', name: 'Tuna Poke Bowl', desc: 'Thunfisch · Mango · Gurke · Wakame · Sesam', price: 15.5,
    img: 'https://images.unsplash.com/photo-1604908176997-125f25cc6f3d?w=700&q=80&auto=format&fit=crop' },
  { id: 'bo-buddha', cat: 'bowls', name: 'Buddha Bowl', desc: 'Quinoa · Süßkartoffel · Avocado · Hummus', price: 12.9, tag: 'veg', tagText: 'Vegan',
    img: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=700&q=80&auto=format&fit=crop' },
  // WOK
  { id: 'wo-beef', cat: 'wok', name: 'Beef Wok', desc: 'Rindfleisch · Brokkoli · Cashew · Oystersauce', price: 14.5,
    img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=700&q=80&auto=format&fit=crop' },
  { id: 'wo-huhn', cat: 'wok', name: 'Cashew Huhn', desc: 'Huhn · Paprika · Cashew · süß-scharfe Sauce', price: 13.9, tag: 'spicy', tagText: 'Scharf',
    img: 'https://images.unsplash.com/photo-1606756790138-261d2b21cd75?w=700&q=80&auto=format&fit=crop' },
  { id: 'wo-veg', cat: 'wok', name: 'Veggie Wok', desc: 'Marktgemüse · Glasnudeln · Ingwer · Limette', price: 12.5, tag: 'veg', tagText: 'Vegan',
    img: 'https://images.unsplash.com/photo-1512058564366-18510be2db19?w=700&q=80&auto=format&fit=crop' },
  // GYOZA
  { id: 'gy-huhn', cat: 'gyoza', name: 'Klassik Gyoza (6 St.)', desc: 'Hühnchenfüllung · Sojasauce · Sesamöl', price: 7.9,
    img: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=700&q=80&auto=format&fit=crop' },
  { id: 'gy-veg', cat: 'gyoza', name: 'Veggie Gyoza (6 St.)', desc: 'Gemüsefüllung · Ponzu · Frühlingszwiebel', price: 7.5, tag: 'veg', tagText: 'Vegan',
    img: 'https://images.unsplash.com/photo-1604908554049-01477be51b07?w=700&q=80&auto=format&fit=crop' },
  { id: 'gy-sum', cat: 'gyoza', name: 'Veggie Summerrolls', desc: 'Reispapier · Avocado · Glasnudeln · Erdnusssauce', price: 6.9, tag: 'veg', tagText: 'Vegan',
    img: 'https://images.unsplash.com/photo-1547573854-74d2a71d0826?w=700&q=80&auto=format&fit=crop' },
  // SUSHI
  { id: 'su-mag', cat: 'sushi', name: 'Maguro Sushi (4 St.)', desc: 'Thunfisch · Sushi-Reis · Wasabi · Soja', price: 9.9,
    img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=700&q=80&auto=format&fit=crop' },
  { id: 'su-thun', cat: 'sushi', name: 'Thunfisch Maki (8 St.)', desc: 'Klassische Maki-Rolle · Wasabi · Gari', price: 8.9,
    img: 'https://images.unsplash.com/photo-1617196034796-73dfa7b1fd56?w=700&q=80&auto=format&fit=crop' },
  { id: 'su-lachs', cat: 'sushi', name: 'Lachs Maki (8 St.)', desc: 'Frischer Lachs · Sushi-Reis · Nori', price: 8.5,
    img: 'https://images.unsplash.com/photo-1579871494447-9811cf80d66c?w=700&q=80&auto=format&fit=crop' },
  { id: 'su-rain', cat: 'sushi', name: 'Rainbow Roll (8 St.)', desc: 'Lachs · Thunfisch · Avocado · Surimi', price: 13.9, tag: 'new', tagText: 'Neu',
    img: 'https://images.unsplash.com/photo-1553621042-f6e147245754?w=700&q=80&auto=format&fit=crop' },
];

export const TAG_COLORS: Record<Tag, { bg: string; fg: string }> = {
  veg: { bg: '#2FA36B', fg: '#fff' },
  spicy: { bg: 'var(--go-red)', fg: '#FAF6EC' },
  new: { bg: '#16181C', fg: '#FAF6EC' },
};

export const fmt = (n: number) => '€ ' + n.toFixed(2).replace('.', ',');
