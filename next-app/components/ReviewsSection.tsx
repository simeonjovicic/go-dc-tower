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
    quote: 'Tolles Ambiente, freundliches Personal, perfekt für After-Work mit Kollegen.',
    name: 'Tom F.',
    source: 'Tripadvisor',
    stars: 4,
  },
];

export function ReviewsSection() {
  return (
    <section
      data-pad
      className="reviews-section"
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 16px',
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
            <div className="section-kicker">Stimmen aus Wien</div>
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
            <strong style={{ fontFamily: 'var(--font-saira)', fontSize: 22, lineHeight: 1 }}>
              4,6
            </strong>
            <Stars n={5} />
            <span style={{ fontSize: 13, fontWeight: 600, color: '#6b6e73' }}>
              380+ Bewertungen
            </span>
          </div>
        </div>
      </Reveal>

      <div className="reviews-grid">
        {REVIEWS.map((review, index) => (
          <Reveal key={review.name} delay={index * 80}>
            <article
              className="review-card"
              style={{
                height: '100%',
                background: '#fff',
                border: '1px solid rgba(22,24,28,0.08)',
                borderTop: '3px solid var(--go-red)',
                borderRadius: 18,
                padding: 24,
                display: 'flex',
                flexDirection: 'column',
                gap: 15,
              }}
            >
              <Stars n={review.stars} />
              <p style={{ margin: 0, flex: 1, fontSize: 16, lineHeight: 1.55, color: 'var(--go-ink)' }}>
                „{review.quote}“
              </p>
              <div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>{review.name}</div>
                <div style={{ marginTop: 2, color: '#6b6e73', fontSize: 12, fontWeight: 600 }}>
                  {review.source}
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function Stars({ n }: { n: number }) {
  return (
    <span aria-label={`${n} von 5 Sternen`} style={{ display: 'inline-flex', gap: 2, color: '#F4A52C', fontSize: 15 }}>
      {Array.from({ length: 5 }).map((_, index) => (
        <span key={index} aria-hidden="true" style={{ opacity: index < n ? 1 : 0.25 }}>
          ★
        </span>
      ))}
    </span>
  );
}
