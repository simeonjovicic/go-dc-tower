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
  { label: 'Auto', text: 'Parken in der DC Tower Garage. Lass dein Parkticket bei uns abstempeln und parke für 1 € pro Stunde.' },
  { label: 'Im Haus', text: 'Erdgeschoß des DC Tower, barrierefrei erreichbar' },
] as const;

/** Wegbeschreibungen als Video. TODO: Dateien nach /public/videos legen und `src` setzen. */
export const ANFAHRT_VIDEOS: { title: string; text: string; src: string | null; poster?: string }[] = [
  { title: 'Von der U1 zu uns', text: 'Aussteigen in Kaisermühlen · VIC, dann zwei Minuten zu Fuß bis zum Eingang.', src: null },
  { title: 'Aus der Garage zu uns', text: 'Von der DC Tower Garage direkt ins Erdgeschoß.', src: null },
];

/** Die beiden Karten als PDF. TODO: PDFs nach /public/karten legen. */
export const MENU_CARDS = [
  { id: 'lunch', title: 'Lunchkarte', times: ['Mo–Fr 11:00 – 17:00'], href: '/karten/lunchkarte.pdf' },
  { id: 'abend', title: 'Abendkarte', times: ['Mo–Fr 17:00 – 21:00', 'So 11:00 – 17:00'], href: '/karten/abendkarte.pdf' },
] as const;

/**
 * Catering-Angebote — Texte aus dem Word-Dokument des Hauses, ergänzt um die
 * Vorgaben der Inhaberin: Catering ohne Service-Personal, servierte Menüs mit
 * mehreren Gängen nur bei uns im Restaurant, Anfragen bevorzugt per E-Mail.
 */
export const CATERING = [
  {
    id: 'zuhause',
    label: 'Wir liefern, ihr feiert',
    title: 'Catering für zu Hause oder deine Wunschlocation',
    text: 'Ob bei dir zu Hause oder an deinem Lieblingsort – wir begleiten deine Party mit einem köstlichen Catering. Gemeinsam mit dir planen wir ein abwechslungsreiches Sharing-Buffet mit warmen oder kalten Vorspeisen, leckeren Hauptspeisen und wohltuender Nudelsuppe. Zum Teilen, Genießen und Zusammenkommen – ganz nach deinen Wünschen.',
    fine: 'Wir liefern das Buffet, ohne Service-Personal vor Ort.',
    img: '/foto/leben/tafel-oben.webp',
    alt: 'Tafel mit verschiedenen asiatischen Gerichten zum Teilen',
    action: 'Catering anfragen',
    subject: 'Anfrage: Catering',
  },
  {
    id: 'business',
    label: 'Bei euch im Büro',
    title: 'Business Lunch direkt ins Büro',
    text: 'Wir bringen euren Business Lunch direkt zu euch ins Büro – frisch, lecker und unkompliziert. Wählt eure Lieblingsgerichte aus unserer Speisekarte oder lasst uns gemeinsam eine Lunchbox mit passenden Vorspeisen für euch zusammenstellen. Für eine genussvolle Mittagspause oder ein gemeinsames Essen mit dem Team.',
    fine: 'Geliefert ins Büro, ohne Service-Personal vor Ort.',
    img: '/foto/leben/sackerl-tower.webp',
    alt: 'Gast mit einer ra’mien-go-Tragetasche vor dem DC Tower',
    action: 'Business Lunch anfragen',
    subject: 'Anfrage: Business Lunch',
  },
  {
    id: 'event',
    label: 'Bei uns im Restaurant',
    title: 'Dein Event im Ra’miengo DC Tower',
    text: 'Ob Weihnachtsfeier, Geburtstagsparty oder ein entspanntes Beisammensein – wir unterstützen dich bei der Planung deines Events und verwöhnen deine Gäste mit einem abwechslungsreichen Sharing-Buffet oder einem servierten Menü.',
    fine: 'Menüs mit mehreren Gängen servieren wir ausschließlich bei uns im Restaurant.',
    img: '/foto/haus/obergeschoss.webp',
    alt: 'Gedeckte Tische im Obergeschoss des Restaurants',
    action: 'Event anfragen',
    subject: 'Anfrage: Event im go DC Tower',
  },
] as const;

export const KAPAZITAET = {
  erdgeschoss: { plaetze: 80, gruppe: 65 },
  obergeschoss: { plaetze: 45 },
  firma: { personen: 50 },
} as const;

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
