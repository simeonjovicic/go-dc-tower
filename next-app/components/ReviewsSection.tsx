import { Reveal } from './Reveal';

type Review = {
  quote: string;
  name: string;
  source: string;
  stars: number;
};

const REVIEWS: Review[] = [
  {
    quote: 'Beste Ramen-Bowl, die ich in Wien je hatte. Brühe ist ein Traum, Portion riesig.',
    name: 'Sarah K.',
    source: 'Tripadvisor',
    stars: 5,
  },
  {
    quote: 'Mittagspause aus dem DC Tower – in 10 Minuten frisch am Tisch. Faire Preise, ehrliche Küche.',
    name: 'Max H.',
    source: 'Google Reviews',
    stars: 5,
  },
  {
    quote: 'Die Bulgogi La Mian hat mich umgehauen. Wir kommen seit Jahren, nie enttäuscht.',
    name: 'Lisa M.',
    source: 'Instagram',
    stars: 5,
  },
  {
    quote: 'Tolles Ambiente, freundliches Personal, perfekt für After-Work mit Kollegen.',
    name: 'Tom F.',
    source: 'Tripadvisor',
    stars: 4,
  },
  {
    quote: 'Sushi überraschend frisch für einen Lunch-Spot im Office-Tower. Daumen hoch!',
    name: 'Anna B.',
    source: 'Google Reviews',
    stars: 5,
  },
  {
    quote: 'Veggie Ramen ist mein Wohlfühl-Anker bei Regenwetter. Versteckte Perle in der Donau City.',
    name: 'Julia W.',
    source: 'Instagram',
    stars: 5,
  },
  {
    quote: 'Handgezogene Nudeln, denen man bei der Zubereitung zusehen kann – besser geht es nicht.',
    name: 'David R.',
    source: 'Google Reviews',
    stars: 5,
  },
  {
    quote: 'Gyoza außen knusprig, innen saftig, der Dip perfekt. Und das Parken in der Garage ist top gelöst.',
    name: 'Nina S.',
    source: 'Tripadvisor',
    stars: 5,
  },
  {
    quote: 'Zur Mittagszeit gut besucht – zu Recht. Die Tonkotsu schmeckt wie in Tokio.',
    name: 'Peter L.',
    source: 'Google Reviews',
    stars: 4,
  },
  {
    quote: 'Team-Lunch für 12 Personen: alles kam gleichzeitig und heiß an den Tisch. Respekt an die Küche.',
    name: 'Miriam T.',
    source: 'Google Reviews',
    stars: 5,
  },
  {
    quote: 'Buddha Bowl frisch, bunt und riesig. Endlich ehrlich gesundes Essen in der Donau City.',
    name: 'Stefan G.',
    source: 'Tripadvisor',
    stars: 5,
  },
  {
    quote: 'Vom Büro runter, kurz bestellt, 15 Minuten später glücklich. Mein Kantinenersatz seit zwei Jahren.',
    name: 'Elena P.',
    source: 'Google Reviews',
    stars: 5,
  },
];

export function ReviewsSection() {
  // Track is doubled so the -50% translate loops seamlessly.
  const loop = [...REVIEWS, ...REVIEWS];

  return (
    <section
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '72px 40px 24px',
      }}
    >
      <Reveal>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 16,
          }}
        >
          <div>
            <div
              style={{
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: 'var(--go-red)',
              }}
            >
              Stimmen aus Wien
            </div>
            <h2
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 800,
                fontSize: 52,
                lineHeight: 1,
                textTransform: 'uppercase',
                margin: '10px 0 0',
              }}
            >
              Was Gäste <span style={{ color: 'var(--go-red)' }}>sagen</span>.
            </h2>
          </div>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              background: '#fff',
              border: '1px solid rgba(22,24,28,0.08)',
              borderRadius: 999,
              padding: '10px 16px',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 22,
                color: 'var(--go-ink)',
                lineHeight: 1,
              }}
            >
              4,6
            </span>
            <Stars n={5} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#6b6e73' }}>
              · 380+ Bewertungen
            </span>
          </div>
        </div>
      </Reveal>

      <div
        className="marquee"
        style={{ marginTop: 28 }}
        aria-label="Gäste-Stimmen, automatisch durchlaufend"
      >
        <div className="marquee-track">
          {loop.map((r, i) => (
            <article
              key={i}
              className="marquee-card"
              aria-hidden={i >= REVIEWS.length || undefined}
              style={{
                background: '#fff',
                border: '1px solid rgba(22,24,28,0.08)',
                borderTop: '3px solid var(--go-wood)',
                borderRadius: 18,
                padding: 22,
                display: 'flex',
                flexDirection: 'column',
                gap: 14,
              }}
            >
              <Stars n={r.stars} />
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.5,
                  color: 'var(--go-ink)',
                  margin: 0,
                  flex: 1,
                }}
              >
                „{r.quote}"
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                <span style={{ fontWeight: 700, fontSize: 14, color: 'var(--go-ink)' }}>
                  {r.name}
                </span>
                <span
                  style={{
                    fontSize: 12,
                    fontWeight: 600,
                    color: '#6b6e73',
                    letterSpacing: '0.02em',
                  }}
                >
                  {r.source}
                </span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span
      style={{
        display: 'inline-flex',
        gap: 2,
        color: '#F4A52C',
        fontSize: 15,
      }}
    >
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} style={{ opacity: i < n ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}
