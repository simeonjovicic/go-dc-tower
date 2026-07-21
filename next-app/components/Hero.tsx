import Image from 'next/image';
import { ORDER_URL } from './menu-data';
import { OpeningStatus } from './OpeningStatus';

export function Hero() {
  return (
    <section
      id="top"
      className="restaurant-hero"
      style={{
        position: 'relative',
        minHeight: '100dvh',
        display: 'flex',
        alignItems: 'center',
        padding: '72px 0 88px',
        overflow: 'hidden',
      }}
    >
      {/* full-bleed photo of the actual restaurant */}
      <Image
        src="/hero-restaurant.jpg"
        alt="Gastraum des go DC Tower – helle Tische unter warmer Holzdecke"
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', objectPosition: 'center' }}
      />
      {/* legibility overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(100deg, rgba(24,19,15,0.91) 0%, rgba(31,24,18,0.66) 48%, rgba(22,24,28,0.12) 100%), linear-gradient(rgba(22,24,28,0.02) 56%, rgba(22,24,28,0.44) 100%)',
        }}
      />
      {/* rotating roundel stamp — same red disc as the logo */}
      <div
        data-stamp
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: 48,
          bottom: 48,
          width: 108,
          height: 108,
          filter: 'drop-shadow(0 10px 22px rgba(22,24,28,0.45))',
        }}
      >
        <svg
          className="spin-slow"
          width="108"
          height="108"
          viewBox="0 0 108 108"
          style={{ position: 'absolute', inset: 0 }}
        >
          <circle cx="54" cy="54" r="54" fill="#D9190F" />
          <defs>
            <path
              id="stamp-arc"
              d="M 54 13 a 41 41 0 1 1 -0.01 0"
              fill="none"
            />
          </defs>
          <text
            style={{
              fontFamily: 'var(--font-dm), system-ui, sans-serif',
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: '0.14em',
              fill: '#FAF6EC',
            }}
          >
            <textPath href="#stamp-arc" textLength="255">
              FROM OUR KITCHEN · TO YOUR SOUL ·{' '}
            </textPath>
          </text>
        </svg>
        <Image
          src="/go-dc-tower-logo.png"
          alt=""
          width={706}
          height={706}
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            width: 58,
            height: 58,
          }}
        />
      </div>

      <div
        data-pad
        style={{
          position: 'relative',
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: '0 40px',
        }}
      >
        <div className="hero-copy-panel" style={{ position: 'relative', paddingLeft: 28, maxWidth: 680 }}>
          <div
            style={{
              position: 'absolute',
              left: 0,
              top: 6,
              bottom: 6,
              width: 4,
              background: 'linear-gradient(var(--go-red), var(--go-red-soft))',
              borderRadius: 4,
            }}
          />
          <div
            className="intro-rise"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--go-red-soft)',
              animationDelay: '1.15s',
            }}
          >
            <span
              style={{
                width: 7,
                height: 7,
                background: 'var(--go-red-soft)',
                borderRadius: '50%',
              }}
            />
            Ra&apos;mien go · Wien
          </div>
          <h1
            data-h1
            className="intro-rise"
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 900,
              fontSize: 96,
              lineHeight: 0.92,
              letterSpacing: '-0.01em',
              textTransform: 'uppercase',
              margin: '16px 0 0',
              color: '#FAF6EC',
              animationDelay: '1.25s',
            }}
          >
            Asian Kitchen.<br />
            <span style={{ color: 'var(--go-red-soft)' }}>Im DC Tower.</span>
          </h1>
          <p
            className="intro-rise hero-intro-text"
            style={{
              fontSize: 20,
              lineHeight: 1.5,
              maxWidth: 500,
              margin: '24px 0 0',
              color: 'rgba(250,246,236,0.88)',
              animationDelay: '1.35s',
            }}
          >
            La Mian, Ramen, Bowls &amp; Sushi – frisch zubereitet in unserer offenen Küche.
          </p>
          <div
            className="intro-rise hero-actions"
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 12,
              marginTop: 32,
              animationDelay: '1.45s',
            }}
          >
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="hov-shine"
              style={{
                textDecoration: 'none',
                padding: '17px 30px',
                background: 'var(--go-red)',
                color: '#FAF6EC',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 18,
                boxShadow: '0 10px 26px rgba(217,25,15,0.4)',
              }}
            >
              Bestellen
            </a>
            <a
              href="#reservieren"
              className="hov-fill-light"
              style={{
                textDecoration: 'none',
                padding: '17px 30px',
                border: '1.5px solid rgba(250,246,236,0.75)',
                color: '#FAF6EC',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 18,
              }}
            >
              Reservieren
            </a>
          </div>
          <OpeningStatus />
        </div>
      </div>

      {/* scroll hint */}
      <div
        data-hero-scroll
        style={{
          position: 'absolute',
          left: '50%',
          bottom: 22,
          transform: 'translateX(-50%)',
          display: 'inline-flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          color: 'rgba(250,246,236,0.75)',
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.16em',
          textTransform: 'uppercase',
        }}
      >
        Scroll
        <span
          style={{
            width: 2,
            height: 28,
            background: 'linear-gradient(rgba(250,246,236,0.9), transparent)',
          }}
        />
      </div>
    </section>
  );
}
