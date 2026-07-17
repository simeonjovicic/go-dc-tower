import Link from 'next/link';
import { Reveal } from './Reveal';
import { ArrowRight } from './Icons';
import { CATEGORIES, DISHES, ORDER_URL, type CategoryId } from './menu-data';
import { OrderFab } from './OrderFab';

const TILE_META: Record<CategoryId, { img: string; tagline: string }> = {
  'la-mian': { img: '/menu-lamian.jpg', tagline: 'Handgezogene Nudeln' },
  ramen: { img: '/menu-ramen.jpg', tagline: 'Dampfende Brühen' },
  bowls: { img: '/ig-veggie-bowl.jpg', tagline: 'Frisch & bunt' },
  wok: { img: '/ig-wok-tofu.jpg', tagline: 'Heiß aus dem Wok' },
  gyoza: { img: '/ig-fried-gyoza.jpg', tagline: 'Knusprig & gedämpft' },
  sushi: { img: '/ig-rainbow-roll.jpg', tagline: 'Frisch gerollt' },
};

/** Homepage teaser: the six menu categories as photo tiles, linking to /menu. */
export function MenuTeaser() {
  return (
    <section
      id="menu"
      style={{
        background: 'var(--go-sand)',
        scrollMarginTop: 84,
        marginTop: 56,
      }}
    >
      <div
        data-pad
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '72px 40px 76px',
        }}
      >
        <Reveal>
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: 18,
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
                Menü
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
                Das gibt&apos;s <span style={{ color: 'var(--go-red)' }}>bei uns</span>.
              </h2>
              <p
                style={{
                  fontSize: 16,
                  color: '#3a3d42',
                  margin: '12px 0 0',
                  maxWidth: 520,
                }}
              >
                Sechs Kategorien, frisch zubereitet – die ganze Speisekarte
                findest du auf einer eigenen Seite.
              </p>
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
              <Link
                href="/menu"
                className="hov-shine hov-arrow"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 10,
                  textDecoration: 'none',
                  padding: '14px 24px',
                  background: 'var(--go-red)',
                  color: '#FAF6EC',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 15,
                  boxShadow: '0 10px 26px rgba(217,25,15,0.3)',
                }}
              >
                Zur Speisekarte
                <span className="arrow" style={{ display: 'inline-flex' }}>
                  <ArrowRight size={16} />
                </span>
              </Link>
              <a
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="hov-fill-dark"
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  textDecoration: 'none',
                  padding: '14px 24px',
                  border: '1.5px solid var(--go-ink)',
                  color: 'var(--go-ink)',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 15,
                }}
              >
                Online bestellen
              </a>
            </div>
          </div>
        </Reveal>

        {/* six category tiles */}
        <div
          data-hl-grid
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 18,
            marginTop: 28,
          }}
        >
          {CATEGORIES.map((cat, ci) => {
            const meta = TILE_META[cat.id];
            const count = DISHES.filter((d) => d.cat === cat.id).length;
            return (
              <Reveal key={cat.id} delay={ci * 60}>
                <Link
                  href={`/menu#${cat.id}`}
                  className="hov-lift hov-zoom"
                  aria-label={`${cat.label} – ${count} Gerichte ansehen`}
                  style={{
                    position: 'relative',
                    display: 'block',
                    aspectRatio: '4 / 3',
                    borderRadius: 18,
                    overflow: 'hidden',
                    textDecoration: 'none',
                    backgroundColor: '#efe7d4',
                    boxShadow: '0 10px 26px rgba(22,24,28,0.1)',
                  }}
                >
                  <div
                    className="hov-zoom-img"
                    role="img"
                    aria-label={cat.label}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      backgroundImage: `url('${meta.img}')`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                    }}
                  />
                  <div
                    aria-hidden="true"
                    style={{
                      position: 'absolute',
                      inset: 0,
                      background:
                        'linear-gradient(rgba(22,24,28,0) 40%, rgba(22,24,28,0.72) 100%)',
                    }}
                  />
                  <div
                    style={{
                      position: 'absolute',
                      left: 18,
                      right: 18,
                      bottom: 15,
                      display: 'flex',
                      alignItems: 'flex-end',
                      justifyContent: 'space-between',
                      gap: 10,
                    }}
                  >
                    <div>
                      <div
                        style={{
                          fontFamily: 'var(--font-saira)',
                          fontWeight: 800,
                          fontSize: 26,
                          lineHeight: 1,
                          textTransform: 'uppercase',
                          color: '#FAF6EC',
                        }}
                      >
                        {cat.label}
                      </div>
                      <div
                        style={{
                          marginTop: 5,
                          fontSize: 13,
                          fontWeight: 600,
                          color: 'rgba(250,246,236,0.85)',
                        }}
                      >
                        {meta.tagline} · {count} Gerichte
                      </div>
                    </div>
                    <span
                      aria-hidden="true"
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 34,
                        height: 34,
                        flex: 'none',
                        borderRadius: '50%',
                        background: 'var(--go-red)',
                        color: '#FAF6EC',
                      }}
                    >
                      <ArrowRight size={16} />
                    </span>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </div>

      <OrderFab />
    </section>
  );
}
