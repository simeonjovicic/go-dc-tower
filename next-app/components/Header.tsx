import Image from 'next/image';
import Link from 'next/link';

export function Header() {
  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 60,
        background: 'rgba(250,246,236,0.86)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderBottom: '1px solid rgba(22,24,28,0.08)',
      }}
    >
      <div
        data-pad
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <Link
          href="/"
          aria-label="go DC Tower – Startseite"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
            flex: 'none',
          }}
        >
          <Image
            src="/go-dc-tower-logo.png"
            alt="go DC Tower"
            width={706}
            height={706}
            priority
            style={{ width: 46, height: 46, display: 'block' }}
          />
          <span
            data-wordmark
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
            }}
          >
            go DC Tower
          </span>
        </Link>

        <nav
          data-nav
          style={{
            display: 'flex',
            gap: 26,
            marginLeft: 8,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          <a href="/#ueber-uns" className="hov-nav" style={{ textDecoration: 'none' }}>Über uns</a>
          <a href="/#reservieren" className="hov-nav" style={{ textDecoration: 'none' }}>Reservieren</a>
          <a href="/#catering" className="hov-nav" style={{ textDecoration: 'none' }}>Catering</a>
          <a href="/#standort" className="hov-nav" style={{ textDecoration: 'none' }}>Standort</a>
        </nav>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <a
            href="/#reservieren"
            className="hov-shine"
            style={{
              textDecoration: 'none',
              padding: '12px 22px',
              background: '#E1391F',
              color: '#FAF6EC',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              boxShadow: '0 6px 18px rgba(225,57,31,0.28)',
            }}
          >
            Tisch reservieren
          </a>
        </div>
      </div>
    </header>
  );
}
