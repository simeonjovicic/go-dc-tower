/**
 * Die harten Fakten des Hauses. Einzige Quelle für Adresse, Zeiten, Kontakt und
 * Catering — damit dieselbe Zahl nicht an drei Stellen im Markup auseinanderläuft.
 *
 * Quellen: godctower.com (Kontakt, Öffnungszeiten, Impressum),
 * "Catering_und_Events_Ramiengo_DC_Tower.docx" (Catering-Texte und Kapazitäten).
 */

export const BRAND = {
  /** Die Marke, wie sie auf Karte, Sackerl und Leuchtschrift steht. */
  name: "ra'mien go",
  /** Der Ort, der den Laden im Kopf der Gäste verortet. */
  place: 'DC Tower',
  claim: 'Asian Fusion Kitchen',
  since: 2017,
} as const;

export const CONTACT = {
  street: 'Donau-City-Straße 7',
  zip: '1220',
  city: 'Wien',
  building: 'DC Tower, Erdgeschoß',
  phone: '+43 1 9165156',
  phoneHref: 'tel:+4319165156',
  email: 'office@godctower.com',
  maps: 'https://maps.google.com/?q=Donau-City-Stra%C3%9Fe+7,+1220+Wien',
} as const;

export const SOCIAL = {
  instagram: 'https://www.instagram.com/godctower/',
  facebook: 'https://www.facebook.com/godctower',
  tripadvisor: 'https://www.tripadvisor.at/',
} as const;

export type Hours = { days: string; time: string; note?: string; closed?: boolean };

export const HOURS: Hours[] = [
  { days: 'Montag – Freitag', time: '11:00 – 22:00', note: 'Küche bis 21:00' },
  { days: 'Sonntag', time: '11:00 – 17:00' },
  { days: 'Samstag & Feiertage', time: 'geschlossen', closed: true },
];

export const ANFAHRT = [
  { label: 'U-Bahn', text: 'U1 Kaisermühlen · VIC, zwei Gehminuten' },
  { label: 'Auto', text: 'Parken direkt in der Garage des DC Tower, vergünstigter Tarif für Gäste' },
  { label: 'Im Haus', text: 'Erdgeschoß des DC Tower, barrierefrei erreichbar' },
] as const;

/**
 * Catering-Angebote — Texte wörtlich aus dem Word-Dokument des Hauses.
 * Kapazitäten ebenfalls von dort (die Website nennt abweichende Zahlen).
 */
export const CATERING = [
  {
    id: 'zuhause',
    kicker: '01',
    title: 'Catering für zu Hause oder deine Wunschlocation',
    text: 'Ob bei dir zu Hause oder an deinem Lieblingsort – wir begleiten deine Party mit einem köstlichen Catering. Gemeinsam mit dir planen wir ein abwechslungsreiches Sharing-Buffet mit warmen oder kalten Vorspeisen, leckeren Hauptspeisen und wohltuender Nudelsuppe. Zum Teilen, Genießen und Zusammenkommen – ganz nach deinen Wünschen.',
    img: '/foto/leben/tafel-oben.webp',
  },
  {
    id: 'business',
    kicker: '02',
    title: 'Business Lunch direkt ins Büro',
    text: 'Wir bringen euren Business Lunch direkt zu euch ins Büro – frisch, lecker und unkompliziert. Wählt eure Lieblingsgerichte aus unserer Speisekarte oder lasst uns gemeinsam eine Lunchbox mit passenden Vorspeisen für euch zusammenstellen. Für eine genussvolle Mittagspause oder ein gemeinsames Essen mit dem Team.',
    img: '/foto/leben/sackerl-tower.webp',
  },
  {
    id: 'event',
    kicker: '03',
    title: 'Dein Event im Haus',
    text: 'Ob Weihnachtsfeier, Geburtstagsparty oder ein entspanntes Beisammensein – wir unterstützen dich bei der Planung deines Events und verwöhnen deine Gäste mit einem abwechslungsreichen Sharing-Buffet oder einem servierten Menü.',
    img: '/foto/haus/obergeschoss.webp',
  },
] as const;

export const KAPAZITAET = [
  { zahl: 40, ort: 'Erster Stock', detail: 'in geschlossener Gesellschaft' },
  { zahl: 65, ort: 'Erdgeschoss', detail: 'für größere Runden' },
  { zahl: 50, ort: 'Firmenreservierung', detail: 'für das Mittagessen mit dem Team' },
] as const;

export const LEGAL = {
  company: 'Lin & Huang GmbH',
  fn: 'FN 486089 m',
  court: 'Handelsgericht Wien',
  uid: 'ATU73012508',
  gf: 'Xiaoxiao Huang',
  gegenstand: 'Gastronomiebetrieb (Restaurant, Catering)',
  behoerde: 'Magistrat der Stadt Wien',
  kammer: 'Wirtschaftskammer Wien, Fachgruppe Gastronomie',
} as const;
