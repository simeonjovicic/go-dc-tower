export type CategoryId =
  | 'lamian'
  | 'ramen'
  | 'bowls'
  | 'wok'
  | 'gyoza'
  | 'sushi';

export type MenuItem = {
  id: string;
  cat: CategoryId;
  name: string;
  desc: string;
  price: number;
  img: string;
  veggie?: boolean;
  spicy?: boolean;
};

export const CATEGORIES: { id: CategoryId; label: string; img: string; tagline: string }[] = [
  { id: 'lamian', label: 'La Mian', tagline: 'Handgezogene Nudeln', img: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=900&q=80&auto=format&fit=crop' },
  { id: 'ramen',  label: 'Ramen',   tagline: 'Dampfende Brühen',    img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=900&q=80&auto=format&fit=crop' },
  { id: 'bowls',  label: 'Bowls',   tagline: 'Fresh & healthy',     img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=900&q=80&auto=format&fit=crop' },
  { id: 'wok',    label: 'Wok',     tagline: 'Direkt aus dem Feuer',img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=900&q=80&auto=format&fit=crop' },
  { id: 'gyoza',  label: 'Gyoza',   tagline: 'Knusprig & saftig',   img: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=900&q=80&auto=format&fit=crop' },
  { id: 'sushi',  label: 'Sushi',   tagline: 'Frisch gerollt',      img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=900&q=80&auto=format&fit=crop' },
];

const U = (id: string) =>
  `https://images.unsplash.com/${id}?w=700&q=80&auto=format&fit=crop`;

export const MENU: MenuItem[] = [
  { id: 'l1', cat: 'lamian', name: 'Kokoscurry-La-Mian', desc: 'Handgezogene Nudeln in cremiger Kokos-Curry-Brühe mit Gemüse.', price: 14.9, veggie: true, img: U('photo-1623341214825-9f4f963727da') },
  { id: 'l2', cat: 'lamian', name: 'Bulgogi La Mian', desc: 'La Mian mit mariniertem Rindfleisch & Frühlingszwiebel.', price: 16.5, img: U('photo-1591814468924-caf88d1232e1') },
  { id: 'l3', cat: 'lamian', name: 'Dan Dan La Mian', desc: 'Scharfe Sichuan-Sesam-Brühe, Hackfleisch, Pak Choi.', price: 15.5, spicy: true, img: U('photo-1612929633738-8fe44f7ec841') },
  { id: 'l4', cat: 'lamian', name: 'Wonton La Mian', desc: 'Klare Brühe mit gefüllten Wontons & Bok Choy.', price: 15.9, img: U('photo-1607330289024-1535c6b4e1c1') },

  { id: 'r1', cat: 'ramen', name: 'Shoyu Ramen', desc: 'Klare Sojabrühe, Chashu, Ei, Nori, Lauch.', price: 15.9, img: U('photo-1557872943-16a5ac26437e') },
  { id: 'r2', cat: 'ramen', name: 'Miso Ramen', desc: 'Kräftige Miso-Brühe, Mais, Lauch, Sprossen.', price: 15.5, img: U('photo-1632709810780-b5a4343cefea') },
  { id: 'r3', cat: 'ramen', name: 'Spicy Tonkotsu', desc: 'Cremige Schweinebrühe, Chili-Öl, Ei.', price: 16.9, spicy: true, img: U('photo-1569718212165-3a8278d5f624') },
  { id: 'r4', cat: 'ramen', name: 'Veggie Ramen', desc: 'Gemüsebrühe, Tofu, Shiitake, Mais, Sprossen.', price: 14.5, veggie: true, img: U('photo-1591814468924-caf88d1232e1') },

  { id: 'b1', cat: 'bowls', name: 'Bulgogi Huhn Bowl', desc: 'Mariniertes Hähnchen, Reis, Kimchi, Edamame.', price: 14.5, img: U('photo-1546069901-ba9599a7e63c') },
  { id: 'b2', cat: 'bowls', name: 'Teriyaki Tofu Bowl', desc: 'Knuspriger Tofu, Teriyaki, Avocado, Reis.', price: 13.9, veggie: true, img: U('photo-1512621776951-a57141f2eefd') },
  { id: 'b3', cat: 'bowls', name: 'Poke Lachs Bowl', desc: 'Lachs, Sushireis, Mango, Edamame, Sesam.', price: 16.5, img: U('photo-1604908176997-125f25cc6f3d') },

  { id: 'w1', cat: 'wok', name: 'Wok Gemüse', desc: 'Saisongemüse, Knoblauch, Sojasauce, Reis.', price: 12.9, veggie: true, img: U('photo-1512058564366-18510be2db19') },
  { id: 'w2', cat: 'wok', name: 'Wok Beef', desc: 'Rindfleisch, Paprika, Zwiebel, Austernsauce.', price: 16.9, img: U('photo-1585032226651-759b368d7246') },
  { id: 'w3', cat: 'wok', name: 'Pad Thai Huhn', desc: 'Reisnudeln, Erdnuss, Ei, Limette, Sprossen.', price: 14.5, img: U('photo-1606756790138-261d2b21cd75') },

  { id: 'g1', cat: 'gyoza', name: 'Gyoza Huhn (6 St.)', desc: 'Gebratene Teigtaschen mit Ponzu-Dip.', price: 8.9, img: U('photo-1626804475297-41608ea09aeb') },
  { id: 'g2', cat: 'gyoza', name: 'Gyoza Veggie (6 St.)', desc: 'Gemüse-Füllung mit Sesam-Dip.', price: 8.5, veggie: true, img: U('photo-1604908554049-01477be51b07') },
  { id: 'g3', cat: 'gyoza', name: 'Edamame', desc: 'Gedämpft, mit Meersalz.', price: 5.5, veggie: true, img: U('photo-1547573854-74d2a71d0826') },

  { id: 's1', cat: 'sushi', name: 'Maguro Sushi (4 St.)', desc: 'Frischer Thunfisch auf Sushireis.', price: 11.9, img: U('photo-1611143669185-af224c5e3252') },
  { id: 's2', cat: 'sushi', name: 'Thunfisch Maki (8 St.)', desc: 'Thunfisch, Nori, Sushireis.', price: 9.5, img: U('photo-1617196034796-73dfa7b1fd56') },
  { id: 's3', cat: 'sushi', name: 'Lachs Maki (8 St.)', desc: 'Lachs, Nori, Sushireis.', price: 9.5, img: U('photo-1579871494447-9811cf80d66c') },
  { id: 's4', cat: 'sushi', name: 'Veggie Summerrolls (4 St.)', desc: 'Reispapier, Gemüse, Minze, Erdnuss-Dip.', price: 8.9, veggie: true, img: U('photo-1547573854-74d2a71d0826') },
];
