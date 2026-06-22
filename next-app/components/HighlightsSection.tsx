import Link from 'next/link';
import { CATEGORIES } from '@/lib/menu';
import { Reveal } from './Reveal';

export function HighlightsSection() {
  return (
    <section
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 24px',
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
                color: '#E1391F',
              }}
            >
              Was wir kochen
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
              Sechs Welten. <span style={{ color: '#E1391F' }}>Eine Küche.</span>
            </h2>
          </div>
          <Link
            href="/speisekarte"
            className="hov-arrow"
            style={{
              textDecoration: 'none',
              fontWeight: 700,
              fontSize: 15,
              color: '#16181C',
              borderBottom: '2px solid #E1391F',
              paddingBottom: 2,
            }}
          >
            Komplette Speisekarte <span className="arrow">→</span>
          </Link>
        </div>
      </Reveal>

      <div
        data-hl-grid
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: 18,
          marginTop: 28,
        }}
      >
        {CATEGORIES.map((c, i) => (
          <Reveal key={c.id} delay={i * 80} y={20}>
          <Link
            href="/speisekarte"
            className="hov-zoom hov-lift"
            style={{
              position: 'relative',
              display: 'block',
              borderRadius: 18,
              minHeight: 240,
              backgroundColor: '#efe7d4',
              textDecoration: 'none',
              color: '#FAF6EC',
            }}
          >
            <div
              className="hov-zoom-img"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${c.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(22,24,28,0) 35%, rgba(22,24,28,0.78) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                left: 18,
                bottom: 16,
                right: 18,
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  color: '#F4A52C',
                  marginBottom: 4,
                }}
              >
                {c.tagline}
              </div>
              <div
                style={{
                  fontFamily: 'var(--font-saira)',
                  fontWeight: 800,
                  fontSize: 30,
                  textTransform: 'uppercase',
                  lineHeight: 1,
                }}
              >
                {c.label}
              </div>
            </div>
          </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
