'use client';

import { useEffect, useState } from 'react';
import { Reveal } from './Reveal';
import { Calendar } from './Icons';
import {
  CATEGORIES,
  DISHES,
  TAG_COLORS,
  fmt,
  type CategoryId,
  type Dish,
} from './menu-data';

type CatId = 'all' | CategoryId;

const CATS: { id: CatId; label: string }[] = [
  { id: 'all', label: 'Alle' },
  ...CATEGORIES,
];

const DELIVERY_FEE = 2.9;

export function MenuSection() {
  const [cat, setCat] = useState<CatId>('all');
  const [cart, setCart] = useState<Record<string, number>>({});
  const [fulfil, setFulfil] = useState<'abholung' | 'lieferung'>('abholung');
  const [ordered, setOrdered] = useState(false);

  const filtered = cat === 'all' ? DISHES : DISHES.filter((d) => d.cat === cat);
  const items = Object.entries(cart).map(([id, qty]) => ({
    ...DISHES.find((d) => d.id === id)!,
    qty,
  }));
  const count = items.reduce((s, i) => s + i.qty, 0);
  const subtotal = items.reduce((s, i) => s + i.qty * i.price, 0);
  const fee = fulfil === 'lieferung' && subtotal > 0 ? DELIVERY_FEE : 0;
  const total = subtotal + fee;

  function add(id: string) {
    setCart((c) => ({ ...c, [id]: (c[id] || 0) + 1 }));
  }
  function change(id: string, delta: number) {
    setCart((c) => {
      const next = (c[id] || 0) + delta;
      const copy = { ...c };
      if (next <= 0) delete copy[id];
      else copy[id] = next;
      return copy;
    });
  }
  function closeOrder() {
    setOrdered(false);
    setCart({});
  }

  useEffect(() => {
    if (!ordered) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeOrder();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [ordered]);

  return (
    <section
      id="menu"
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 24px',
        scrollMarginTop: 84,
      }}
    >
      <Reveal>
        <div
          style={{
            fontWeight: 700,
            fontSize: 13,
            letterSpacing: '0.14em',
            textTransform: 'uppercase',
            color: 'var(--go-red)',
          }}
        >
          Menü &amp; Bestellen
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
          Such dir was <span style={{ color: 'var(--go-red)' }}>Gutes</span> aus.
        </h2>
        <p
          style={{
            fontSize: 16,
            color: '#3a3d42',
            margin: '12px 0 0',
            maxWidth: 520,
          }}
        >
          Große Portionen, frische Zutaten, faire Preise. Abholung oder
          Lieferung wählst du beim Checkout.
        </p>
      </Reveal>

      {/* category tabs */}
      <div
        role="group"
        aria-label="Menükategorien"
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 8,
          marginTop: 24,
        }}
      >
        {CATS.map((c) => {
          const active = c.id === cat;
          return (
            <button
              key={c.id}
              type="button"
              aria-pressed={active}
              onClick={() => setCat(c.id)}
              className="hov-lift-sm"
              style={{
                padding: '10px 18px',
                borderRadius: 999,
                border: active
                  ? '1.5px solid var(--go-red)'
                  : '1.5px solid rgba(22,24,28,0.14)',
                background: active ? 'var(--go-red)' : '#fff',
                color: active ? '#FAF6EC' : '#16181C',
                fontWeight: 700,
                fontSize: 14,
                cursor: 'pointer',
              }}
            >
              {c.label}
            </button>
          );
        })}
      </div>

      <div
        data-orderwrap
        style={{
          display: 'flex',
          gap: 24,
          alignItems: 'flex-start',
          marginTop: 24,
        }}
      >
        {/* dish grid */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            data-menugrid
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 18,
            }}
          >
            {filtered.map((d) => (
              <DishCard key={d.id} dish={d} onAdd={() => add(d.id)} />
            ))}
          </div>
        </div>

        {/* sticky cart */}
        <aside
          data-cart
          id="warenkorb"
          aria-label="Warenkorb"
          style={{
            position: 'sticky',
            top: 96,
            width: 350,
            flex: 'none',
            background: '#fff',
            borderRadius: 22,
            overflow: 'hidden',
            boxShadow: '0 18px 40px rgba(22,24,28,0.08)',
            scrollMarginTop: 96,
          }}
        >
          <span
            style={{
              display: 'block',
              height: 5,
              background:
                'linear-gradient(90deg, var(--go-red-deep) 0%, var(--go-red) 55%, var(--go-red-soft) 100%)',
            }}
          />
          <div style={{ padding: '20px 22px 22px' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                gap: 10,
              }}
            >
              <h3
                style={{
                  fontFamily: 'var(--font-saira)',
                  fontWeight: 800,
                  fontSize: 22,
                  textTransform: 'uppercase',
                  margin: 0,
                }}
              >
                Dein Warenkorb
              </h3>
              <span
                aria-label={`${count} Artikel im Warenkorb`}
                style={{
                  minWidth: 26,
                  height: 26,
                  padding: '0 8px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'var(--go-red)',
                  color: '#FAF6EC',
                  borderRadius: 999,
                  fontWeight: 800,
                  fontSize: 13,
                }}
              >
                {count}
              </span>
            </div>

            {items.length === 0 ? (
              <p
                style={{
                  margin: '18px 0',
                  padding: '18px 14px',
                  background: '#FAF6EC',
                  borderRadius: 14,
                  fontSize: 14,
                  lineHeight: 1.5,
                  color: '#6b6e73',
                  textAlign: 'center',
                }}
              >
                Noch nichts ausgewählt. 🍜
                <br />
                Tippe auf <strong style={{ color: 'var(--go-red)' }}>+</strong>,
                um Gerichte hinzuzufügen.
              </p>
            ) : (
              <ul
                style={{
                  listStyle: 'none',
                  margin: '14px 0',
                  padding: 0,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 12,
                  maxHeight: 320,
                  overflowY: 'auto',
                }}
              >
                {items.map((i) => (
                  <li
                    key={i.id}
                    style={{ display: 'flex', alignItems: 'center', gap: 12 }}
                  >
                    <span
                      aria-hidden="true"
                      style={{
                        width: 46,
                        height: 46,
                        flex: 'none',
                        borderRadius: 12,
                        backgroundImage: `url('${i.img}')`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                      }}
                    />
                    <span style={{ flex: 1, minWidth: 0 }}>
                      <span
                        style={{
                          display: 'block',
                          fontWeight: 700,
                          fontSize: 14,
                          lineHeight: 1.25,
                        }}
                      >
                        {i.name}
                      </span>
                      <span
                        style={{
                          display: 'block',
                          fontSize: 12.5,
                          color: '#6b6e73',
                          marginTop: 2,
                        }}
                      >
                        {fmt(i.price)} · Stk.
                      </span>
                    </span>
                    <span
                      style={{ display: 'inline-flex', alignItems: 'center', gap: 8 }}
                    >
                      <QtyBtn label={`${i.name}: eins weniger`} onClick={() => change(i.id, -1)}>
                        −
                      </QtyBtn>
                      <span
                        style={{
                          minWidth: 18,
                          textAlign: 'center',
                          fontWeight: 800,
                          fontSize: 14,
                        }}
                      >
                        {i.qty}
                      </span>
                      <QtyBtn label={`${i.name}: eins mehr`} onClick={() => change(i.id, +1)}>
                        +
                      </QtyBtn>
                    </span>
                  </li>
                ))}
              </ul>
            )}

            <div
              style={{
                borderTop: '1px solid rgba(22,24,28,0.08)',
                paddingTop: 14,
                display: 'flex',
                flexDirection: 'column',
                gap: 6,
              }}
            >
              <CartRow label="Zwischensumme" value={fmt(subtotal)} />
              {fee > 0 && <CartRow label="Lieferung" value={fmt(fee)} />}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'baseline',
                  marginTop: 2,
                }}
              >
                <span style={{ fontWeight: 800, fontSize: 15 }}>Gesamt</span>
                <span
                  style={{
                    fontFamily: 'var(--font-saira)',
                    fontWeight: 900,
                    fontSize: 24,
                    color: 'var(--go-red)',
                  }}
                >
                  {fmt(total)}
                </span>
              </div>
            </div>

            {/* fulfilment toggle */}
            <div
              role="group"
              aria-label="Abholung oder Lieferung"
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: 6,
                marginTop: 14,
                padding: 5,
                background: '#FAF6EC',
                borderRadius: 999,
              }}
            >
              {(
                [
                  ['abholung', 'Abholung · ~15 min'],
                  ['lieferung', 'Lieferung · ~35 min'],
                ] as const
              ).map(([key, label]) => {
                const active = fulfil === key;
                return (
                  <button
                    key={key}
                    type="button"
                    aria-pressed={active}
                    onClick={() => setFulfil(key)}
                    style={{
                      padding: '9px 6px',
                      borderRadius: 999,
                      border: 'none',
                      cursor: 'pointer',
                      fontWeight: 700,
                      fontSize: 12.5,
                      background: active ? '#16181C' : 'transparent',
                      color: active ? '#FAF6EC' : '#3a3d42',
                      transition: 'background-color 0.15s ease, color 0.15s ease',
                    }}
                  >
                    {label}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              disabled={count === 0}
              onClick={() => setOrdered(true)}
              className={count > 0 ? 'hov-shine' : undefined}
              style={{
                marginTop: 14,
                width: '100%',
                padding: '15px 20px',
                background: 'var(--go-red)',
                color: '#FAF6EC',
                border: 'none',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 16,
                cursor: count > 0 ? 'pointer' : 'default',
                opacity: count > 0 ? 1 : 0.45,
                boxShadow:
                  count > 0 ? '0 12px 28px rgba(217,25,15,0.32)' : 'none',
              }}
            >
              Zur Kasse
            </button>
            <p
              style={{
                margin: '10px 0 0',
                fontSize: 12,
                color: '#6b6e73',
                textAlign: 'center',
                lineHeight: 1.45,
              }}
            >
              Bezahlung sicher per Karte, Apple Pay oder bar bei Abholung.
            </p>
          </div>
        </aside>
      </div>

      {/* mobile sticky order bar */}
      <div
        data-fab
        style={{
          position: 'fixed',
          left: '50%',
          transform: 'translateX(-50%)',
          bottom: 14,
          zIndex: 80,
          alignItems: 'center',
          gap: 12,
          padding: '12px 14px 12px 18px',
          background: '#16181C',
          color: '#FAF6EC',
          borderRadius: 999,
          boxShadow: '0 14px 34px rgba(22,24,28,0.4)',
          whiteSpace: 'nowrap',
        }}
      >
        <a
          href="#menu"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 10,
            textDecoration: 'none',
            fontWeight: 800,
            fontSize: 14.5,
          }}
        >
          Bestellen
          <span
            style={{
              padding: '4px 10px',
              background: 'var(--go-red)',
              borderRadius: 999,
              fontSize: 12.5,
              fontWeight: 800,
            }}
          >
            {count} · {fmt(total)}
          </span>
        </a>
        <a
          href="#reservieren"
          aria-label="Tisch reservieren"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 36,
            height: 36,
            borderRadius: '50%',
            background: 'rgba(250,246,236,0.12)',
            color: '#FAF6EC',
          }}
        >
          <Calendar size={17} />
        </a>
      </div>

      {/* checkout success modal */}
      {ordered && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 120,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 20,
          }}
        >
          <div
            onClick={closeOrder}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'rgba(22,24,28,0.55)',
            }}
          />
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="order-done-title"
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: 420,
              background: '#fff',
              borderRadius: 22,
              padding: '30px 26px 24px',
              textAlign: 'center',
              boxShadow: '0 30px 70px rgba(22,24,28,0.35)',
              animation: 'floatUp 0.3s ease both',
            }}
          >
            <div
              style={{
                width: 58,
                height: 58,
                margin: '0 auto 14px',
                background: '#2FA36B',
                color: '#fff',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 28,
              }}
            >
              ✓
            </div>
            <h3
              id="order-done-title"
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 800,
                fontSize: 26,
                textTransform: 'uppercase',
                margin: 0,
              }}
            >
              Bestellung abgeschickt 🍜
            </h3>
            <p
              style={{
                margin: '10px 0 0',
                fontSize: 15,
                lineHeight: 1.5,
                color: '#3a3d42',
              }}
            >
              Danke! Wir bereiten alles vor — du bekommst gleich eine
              Bestätigung per E-Mail.
              {fulfil === 'abholung'
                ? ' Abholbereit in ca. 15 Minuten.'
                : ' Lieferung in ca. 35 Minuten.'}
            </p>
            <button
              type="button"
              onClick={closeOrder}
              className="hov-shine"
              style={{
                marginTop: 18,
                width: '100%',
                padding: '14px 20px',
                background: 'var(--go-red)',
                color: '#FAF6EC',
                border: 'none',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                cursor: 'pointer',
              }}
            >
              Alles klar
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

/* ----- helpers ----- */

function DishCard({ dish, onAdd }: { dish: Dish; onAdd: () => void }) {
  const tag = dish.tag ? TAG_COLORS[dish.tag] : null;
  return (
    <article
      className="hov-lift"
      style={{
        background: '#fff',
        border: '1px solid rgba(22,24,28,0.08)',
        borderRadius: 18,
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <div className="hov-zoom" style={{ position: 'relative' }}>
        <div
          className="hov-zoom-img"
          role="img"
          aria-label={dish.name}
          style={{
            aspectRatio: '4 / 3',
            backgroundImage: `url('${dish.img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundColor: '#efe7d4',
          }}
        />
        {tag && (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: 12,
              padding: '5px 11px',
              background: tag.bg,
              color: tag.fg,
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 11.5,
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
            }}
          >
            {dish.tagText}
          </span>
        )}
      </div>
      <div
        style={{
          padding: '16px 18px 18px',
          display: 'flex',
          flexDirection: 'column',
          gap: 6,
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-saira)',
            fontWeight: 800,
            fontSize: 21,
            lineHeight: 1.05,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          {dish.name}
        </h3>
        <p
          style={{
            margin: 0,
            fontSize: 13.5,
            lineHeight: 1.45,
            color: '#6b6e73',
            flex: 1,
          }}
        >
          {dish.desc}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 8,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 900,
              fontSize: 21,
              color: 'var(--go-red)',
            }}
          >
            {fmt(dish.price)}
          </span>
          <button
            type="button"
            onClick={onAdd}
            aria-label={`${dish.name} zum Warenkorb hinzufügen`}
            className="hov-pop"
            style={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              border: 'none',
              background: 'var(--go-red)',
              color: '#FAF6EC',
              fontSize: 22,
              fontWeight: 700,
              lineHeight: 1,
              cursor: 'pointer',
              boxShadow: '0 8px 18px rgba(217,25,15,0.3)',
            }}
          >
            +
          </button>
        </div>
      </div>
    </article>
  );
}

function QtyBtn({
  children,
  label,
  onClick,
}: {
  children: React.ReactNode;
  label: string;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="hov-lift-sm"
      style={{
        width: 26,
        height: 26,
        borderRadius: '50%',
        border: '1.5px solid rgba(22,24,28,0.16)',
        background: '#fff',
        fontSize: 15,
        fontWeight: 700,
        lineHeight: 1,
        cursor: 'pointer',
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {children}
    </button>
  );
}

function CartRow({ label, value }: { label: string; value: string }) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: 14,
        color: '#3a3d42',
        fontWeight: 600,
      }}
    >
      <span>{label}</span>
      <span>{value}</span>
    </div>
  );
}
