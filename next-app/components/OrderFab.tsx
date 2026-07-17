import { Calendar, ArrowRight } from './Icons';
import { ORDER_URL } from './menu-data';

/** Mobile sticky order bar — fixed at the bottom on smaller screens. */
export function OrderFab({ reserveHref = '#reservieren' }: { reserveHref?: string }) {
  return (
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
        background: 'var(--go-bark)',
        color: '#FAF6EC',
        borderRadius: 999,
        boxShadow: '0 14px 34px rgba(22,24,28,0.4)',
        whiteSpace: 'nowrap',
      }}
    >
      <a
        href={ORDER_URL}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 10,
          textDecoration: 'none',
          fontWeight: 800,
          fontSize: 14.5,
        }}
      >
        Online bestellen
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: 26,
            height: 26,
            background: 'var(--go-red)',
            borderRadius: '50%',
          }}
        >
          <ArrowRight size={14} />
        </span>
      </a>
      <a
        href={reserveHref}
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
  );
}
