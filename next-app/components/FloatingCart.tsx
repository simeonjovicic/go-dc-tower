'use client';

import { useCart } from './CartProvider';
import { fmt } from '@/lib/format';

export function FloatingCart() {
  const { hasItems, cartCount, total, openCheckout } = useCart();

  if (!hasItems) return null;

  return (
    <button
      type="button"
      onClick={openCheckout}
      aria-label={`Warenkorb öffnen – ${cartCount} Artikel, ${fmt(total)}`}
      data-fab
      className="hov-pop"
      style={{
        position: 'fixed',
        right: 'max(20px, env(safe-area-inset-right))',
        bottom: 'max(20px, env(safe-area-inset-bottom))',
        zIndex: 70,
        display: 'inline-flex',
        alignItems: 'center',
        gap: 14,
        padding: '12px 22px 12px 12px',
        background: '#E1391F',
        color: '#FAF6EC',
        border: 'none',
        cursor: 'pointer',
        borderRadius: 999,
        boxShadow:
          '0 18px 40px rgba(225,57,31,0.45), 0 6px 14px rgba(22,24,28,0.18)',
        animation: 'floatUp 0.3s ease',
        fontFamily: 'inherit',
      }}
    >
      <span
        style={{
          position: 'relative',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 40,
          height: 40,
          background: 'rgba(250,246,236,0.18)',
          borderRadius: '50%',
          flex: 'none',
        }}
      >
        <BagGlyph />
        <span
          style={{
            position: 'absolute',
            top: -4,
            right: -4,
            minWidth: 20,
            height: 20,
            padding: '0 5px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: '#F4A52C',
            color: '#16181C',
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 800,
            lineHeight: 1,
          }}
        >
          {cartCount}
        </span>
      </span>
      <span
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-start',
          lineHeight: 1.15,
        }}
      >
        <span
          style={{
            fontSize: 10,
            fontWeight: 700,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            opacity: 0.85,
          }}
        >
          Warenkorb
        </span>
        <span
          style={{
            fontFamily: 'var(--font-saira)',
            fontWeight: 800,
            fontSize: 20,
            lineHeight: 1,
            marginTop: 2,
          }}
        >
          {fmt(total)}
        </span>
      </span>
      <span aria-hidden="true" style={{ fontSize: 18, fontWeight: 800, lineHeight: 1 }}>
        →
      </span>
    </button>
  );
}

function BagGlyph() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 7h14l-1.2 12.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z" />
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
    </svg>
  );
}
