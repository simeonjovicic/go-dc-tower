import type { Metadata } from 'next';
import { Reveal } from '@/components/Reveal';
import { ArrowRight } from '@/components/Icons';
import { OrderFab } from '@/components/OrderFab';
import {
  CATEGORIES,
  DISHES,
  ORDER_URL,
  TAG_COLORS,
  fmt,
} from '@/components/menu-data';

export const metadata: Metadata = {
  title: 'Speisekarte — go DC Tower',
  description:
    'Die ganze Speisekarte vom go DC Tower: La Mian, Ramen, Bowls, Wok, Gyoza & Sushi – frisch zubereitet, große Portionen, faire Preise.',
};

export default function MenuPage() {
  return (
    <main style={{ paddingTop: 84 }}>
      {/* page head */}
      <section
        data-pad
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '48px 40px 36px',
        }}
      >
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
            <h1
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 64,
                lineHeight: 0.95,
                textTransform: 'uppercase',
                margin: '10px 0 0',
              }}
            >
              Die <span style={{ color: 'var(--go-red)' }}>Speisekarte</span>.
            </h1>
            <p
              style={{
                fontSize: 16,
                color: '#3a3d42',
                margin: '14px 0 0',
                maxWidth: 520,
              }}
            >
              Frisch zubereitet, große Portionen, faire Preise. Abholung oder
              Lieferung wählst du beim Bestellpartner.
            </p>
          </div>
          <OrderButton />
        </div>

        {/* category quick-nav */}
        <nav
          aria-label="Menükategorien"
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 8,
            marginTop: 26,
          }}
        >
          {CATEGORIES.map((cat) => (
            <a
              key={cat.id}
              href={`#${cat.id}`}
              className="hov-lift-sm"
              style={{
                padding: '9px 16px',
                borderRadius: 999,
                border: '1.5px solid rgba(22,24,28,0.14)',
                background: '#fff',
                color: 'var(--go-ink)',
                fontWeight: 700,
                fontSize: 13.5,
                textDecoration: 'none',
              }}
            >
              {cat.label}
            </a>
          ))}
        </nav>
      </section>

      {/* full menu on the warm sand band */}
      <section style={{ background: 'var(--go-sand)' }}>
        <div
          data-pad
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '56px 40px 72px',
          }}
        >
          <div
            data-hl-grid
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: 18,
              alignItems: 'start',
            }}
          >
            {CATEGORIES.map((cat, ci) => {
              const dishes = DISHES.filter((d) => d.cat === cat.id);
              return (
                <Reveal key={cat.id} delay={ci * 60}>
                  <div
                    id={cat.id}
                    style={{
                      background: '#fff',
                      border: '1px solid rgba(22,24,28,0.06)',
                      borderTop: '3px solid var(--go-wood)',
                      borderRadius: 18,
                      padding: '22px 22px 12px',
                      height: '100%',
                      scrollMarginTop: 100,
                    }}
                  >
                    <h2
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 9,
                        fontFamily: 'var(--font-saira)',
                        fontWeight: 800,
                        fontSize: 22,
                        textTransform: 'uppercase',
                        margin: '0 0 6px',
                      }}
                    >
                      <span
                        aria-hidden="true"
                        style={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          background: 'var(--go-red)',
                          flex: 'none',
                        }}
                      />
                      {cat.label}
                    </h2>
                    {dishes.map((d, i) => (
                      <div
                        key={d.id}
                        style={{
                          padding: '11px 0',
                          borderBottom:
                            i === dishes.length - 1
                              ? 'none'
                              : '1px solid rgba(22,24,28,0.06)',
                        }}
                      >
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-between',
                            alignItems: 'baseline',
                            gap: 12,
                          }}
                        >
                          <span
                            style={{
                              fontWeight: 700,
                              fontSize: 14.5,
                              lineHeight: 1.3,
                            }}
                          >
                            {d.name}
                            {d.tag && d.tagText ? (
                              <span
                                style={{
                                  marginLeft: 7,
                                  padding: '2px 8px',
                                  borderRadius: 999,
                                  fontSize: 10,
                                  fontWeight: 800,
                                  letterSpacing: '0.05em',
                                  textTransform: 'uppercase',
                                  verticalAlign: 'middle',
                                  background: TAG_COLORS[d.tag].bg,
                                  color: TAG_COLORS[d.tag].fg,
                                  whiteSpace: 'nowrap',
                                }}
                              >
                                {d.tagText}
                              </span>
                            ) : null}
                          </span>
                          <span
                            style={{
                              fontFamily: 'var(--font-saira)',
                              fontWeight: 800,
                              fontSize: 16,
                              color: 'var(--go-red)',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {fmt(d.price)}
                          </span>
                        </div>
                        <div
                          style={{
                            fontSize: 12.5,
                            lineHeight: 1.45,
                            color: '#6b6e73',
                            marginTop: 3,
                          }}
                        >
                          {d.desc}
                        </div>
                      </div>
                    ))}
                  </div>
                </Reveal>
              );
            })}
          </div>

          {/* bottom CTA */}
          <div style={{ textAlign: 'center', marginTop: 40 }}>
            <OrderButton large />
            <p
              style={{
                margin: '12px 0 0',
                fontSize: 13,
                fontWeight: 600,
                color: '#6b6e73',
              }}
            >
              Abholung oder Lieferung · Bestellung über unseren Bestellpartner.
            </p>
          </div>
        </div>
      </section>

      <OrderFab reserveHref="/#reservieren" />
    </main>
  );
}

function OrderButton({ large }: { large?: boolean }) {
  return (
    <a
      href={ORDER_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="hov-shine hov-arrow"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 10,
        textDecoration: 'none',
        padding: large ? '17px 32px' : '14px 24px',
        background: 'var(--go-red)',
        color: '#FAF6EC',
        borderRadius: 999,
        fontWeight: 800,
        fontSize: large ? 18 : 15,
        boxShadow: '0 10px 26px rgba(217,25,15,0.3)',
      }}
    >
      Online bestellen
      <span className="arrow" style={{ display: 'inline-flex' }}>
        <ArrowRight size={large ? 18 : 16} />
      </span>
    </a>
  );
}
