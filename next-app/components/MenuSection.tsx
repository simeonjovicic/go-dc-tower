'use client';

import { useMemo, useState } from 'react';
import { CATEGORIES, MENU, type CategoryId, type MenuItem } from '@/lib/menu';
import { fmt } from '@/lib/format';
import { useCart } from './CartProvider';

const TAB_BASE: React.CSSProperties = {
  whiteSpace: 'nowrap',
  cursor: 'pointer',
  border: '1.5px solid rgba(22,24,28,0.14)',
  padding: '11px 20px',
  borderRadius: 999,
  fontWeight: 700,
  fontSize: 15,
  background: '#fff',
  color: '#16181C',
};
const TAB_ACTIVE: React.CSSProperties = {
  ...TAB_BASE,
  border: '1.5px solid #E1391F',
  background: '#E1391F',
  color: '#fff',
};

export function MenuSection() {
  const [activeCat, setActiveCat] = useState<CategoryId>('lamian');
  const visible = useMemo(
    () => MENU.filter((m) => m.cat === activeCat),
    [activeCat],
  );

  return (
    <section
      id="speisekarte"
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '48px 40px 24px',
        scrollMarginTop: 84,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          gap: 20,
          flexWrap: 'wrap',
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
            Speisekarte &amp; Online bestellen
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
            Wähl dein <span style={{ color: '#E1391F' }}>Gericht</span>.
          </h2>
        </div>
        <div
          data-hidesm
          style={{
            fontSize: 14,
            fontWeight: 600,
            color: '#6b6e73',
            maxWidth: 280,
            textAlign: 'right',
          }}
        >
          Abholung im DC Tower. Frisch zubereitet in ca. 20 Min – Uhrzeit wählst du im Checkout.
        </div>
      </div>

      {/* Tabs */}
      <div
        style={{
          display: 'flex',
          gap: 10,
          overflowX: 'auto',
          marginTop: 26,
          paddingBottom: 4,
        }}
      >
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            onClick={() => setActiveCat(c.id)}
            style={c.id === activeCat ? TAB_ACTIVE : TAB_BASE}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Layout: cards + cart */}
      <div
        data-orderwrap
        style={{
          display: 'flex',
          gap: 32,
          alignItems: 'flex-start',
          marginTop: 28,
        }}
      >
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            data-menugrid
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: 18,
            }}
          >
            {visible.map((item) => (
              <DishCard key={item.id} item={item} />
            ))}
          </div>
        </div>

        <CartPanel />
      </div>
    </section>
  );
}

function DishCard({ item }: { item: MenuItem }) {
  const { add } = useCart();
  return (
    <article
      className="hov-zoom hov-lift"
      style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#fff',
        border: '1px solid rgba(22,24,28,0.07)',
        borderRadius: 18,
      }}
    >
      <div
        className="hov-zoom-img"
        style={{
          position: 'relative',
          height: 170,
          backgroundColor: '#efe7d4',
          backgroundImage: `url('${item.img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {item.veggie ? (
          <span
            style={{
              position: 'absolute',
              left: 12,
              top: 12,
              display: 'inline-flex',
              alignItems: 'center',
              gap: 5,
              background: '#2FA36B',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 9px',
              borderRadius: 999,
            }}
          >
            ● Veggie
          </span>
        ) : null}
        {item.spicy ? (
          <span
            style={{
              position: 'absolute',
              right: 12,
              top: 12,
              background: 'rgba(225,57,31,0.95)',
              color: '#fff',
              fontSize: 11,
              fontWeight: 700,
              padding: '4px 9px',
              borderRadius: 999,
            }}
          >
            scharf
          </span>
        ) : null}
      </div>
      <div
        style={{
          padding: '16px 16px 18px',
          display: 'flex',
          flexDirection: 'column',
          flex: 1,
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-saira)',
            fontWeight: 700,
            fontSize: 24,
            lineHeight: 1.05,
            margin: 0,
            textTransform: 'uppercase',
          }}
        >
          {item.name}
        </h3>
        <p
          style={{
            fontSize: 14,
            lineHeight: 1.45,
            color: '#6b6e73',
            margin: '7px 0 0',
          }}
        >
          {item.desc}
        </p>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 'auto',
            paddingTop: 16,
          }}
        >
          <span
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 800,
              fontSize: 24,
              color: '#16181C',
            }}
          >
            {fmt(item.price)}
          </span>
          <button
            onClick={() => add(item.id)}
            aria-label={`${item.name} zum Warenkorb hinzufügen`}
            className="hov-pop"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 7,
              background: '#E1391F',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              padding: '10px 16px',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
            }}
          >
            <span style={{ fontSize: 18, lineHeight: 1, marginTop: -1 }}>+</span>
            Hinzufügen
          </button>
        </div>
      </div>
    </article>
  );
}

function CartPanel() {
  const {
    lines, cartCount, hasItems, cartEmpty,
    total,
    inc, dec, openCheckout,
  } = useCart();

  return (
    <aside
      id="cart"
      data-cart
      style={{
        position: 'sticky',
        top: 96,
        width: 360,
        flex: 'none',
        background: '#fff',
        border: '1px solid rgba(22,24,28,0.08)',
        borderRadius: 20,
        padding: 22,
        boxShadow: '0 18px 40px rgba(22,24,28,0.06)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-saira)',
            fontWeight: 800,
            fontSize: 26,
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          Dein Warenkorb
        </h3>
        <span
          style={{
            background: '#F4A52C',
            color: '#16181C',
            fontWeight: 800,
            fontSize: 13,
            padding: '4px 10px',
            borderRadius: 999,
          }}
        >
          {cartCount}
        </span>
      </div>

      {cartEmpty ? (
        <div
          style={{
            padding: '34px 8px',
            textAlign: 'center',
            color: '#9a9488',
          }}
        >
          <div style={{ fontSize: 34 }}>🍜</div>
          <p style={{ fontSize: 14, fontWeight: 600, margin: '10px 0 0' }}>
            Noch nichts ausgewählt.<br />Füg ein Gericht hinzu.
          </p>
        </div>
      ) : null}

      {hasItems ? (
        <>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 12,
              marginTop: 18,
            }}
          >
            {lines.map((line) => (
              <div
                key={line.id}
                style={{ display: 'flex', gap: 12, alignItems: 'center' }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 700, fontSize: 15, lineHeight: 1.2 }}>
                    {line.name}
                  </div>
                  <div
                    style={{
                      fontSize: 13,
                      color: '#6b6e73',
                      fontWeight: 600,
                    }}
                  >
                    {fmt(line.price)} · {fmt(line.lineTotal)}
                  </div>
                </div>
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 8,
                    background: '#FAF6EC',
                    borderRadius: 999,
                    padding: 4,
                  }}
                >
                  <button
                    onClick={() => dec(line.id)}
                    aria-label="Weniger"
                    style={{
                      width: 30, height: 30, border: 'none',
                      background: '#fff', borderRadius: '50%',
                      cursor: 'pointer', fontSize: 18, fontWeight: 700,
                      lineHeight: 1,
                    }}
                  >
                    −
                  </button>
                  <span
                    style={{
                      minWidth: 18,
                      textAlign: 'center',
                      fontWeight: 800,
                      fontSize: 15,
                    }}
                  >
                    {line.qty}
                  </span>
                  <button
                    onClick={() => inc(line.id)}
                    aria-label="Mehr"
                    style={{
                      width: 30, height: 30, border: 'none',
                      background: '#16181C', color: '#fff',
                      borderRadius: '50%', cursor: 'pointer',
                      fontSize: 18, fontWeight: 700, lineHeight: 1,
                    }}
                  >
                    +
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Pickup info */}
          <div
            style={{
              marginTop: 18,
              padding: '10px 14px',
              background: '#FAF6EC',
              borderRadius: 12,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              fontSize: 13,
              fontWeight: 600,
              color: '#16181C',
            }}
          >
            <span
              style={{
                width: 8,
                height: 8,
                background: '#2FA36B',
                borderRadius: '50%',
                flex: 'none',
              }}
            />
            Abholung im DC Tower · Uhrzeit wählst du an der Kasse
          </div>

          <div
            style={{
              marginTop: 14,
              paddingTop: 14,
              borderTop: '1px dashed rgba(22,24,28,0.15)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 800,
                fontSize: 22,
                textTransform: 'uppercase',
              }}
            >
              Gesamt
            </span>
            <span
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 30,
                color: '#E1391F',
              }}
            >
              {fmt(total)}
            </span>
          </div>
          <button
            onClick={openCheckout}
            className="hov-shine"
            style={{
              width: '100%',
              marginTop: 18,
              padding: 16,
              background: '#E1391F',
              color: '#fff',
              border: 'none',
              cursor: 'pointer',
              borderRadius: 999,
              fontWeight: 800,
              fontSize: 18,
              boxShadow: '0 10px 24px rgba(225,57,31,0.28)',
            }}
          >
            Zur Kasse
          </button>
        </>
      ) : null}
    </aside>
  );
}
