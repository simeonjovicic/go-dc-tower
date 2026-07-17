import Image from 'next/image';
import { ORDER_URL } from './menu-data';

export function Hero() {
  return (
    <section
      id="top"
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
            'linear-gradient(100deg, rgba(22,24,28,0.88) 0%, rgba(22,24,28,0.6) 48%, rgba(22,24,28,0.24) 100%), linear-gradient(rgba(22,24,28,0.1) 60%, rgba(22,24,28,0.45) 100%)',
        }}
      />
      {/* kanji watermark */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          right: '3%',
          top: 10,
          fontFamily: 'var(--font-saira)',
          fontWeight: 900,
          fontSize: 250,
          lineHeight: 1,
          color: 'rgba(250,246,236,0.10)',
          pointerEvents: 'none',
        }}
      >
        麺
      </div>
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
        <div style={{ position: 'relative', paddingLeft: 28, maxWidth: 680 }}>
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
            DC Tower&apos;s hidden gem in Vienna
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
            Willkommen<br />im{' '}
            <span style={{ color: 'var(--go-red-soft)' }}>DC Tower.</span>
          </h1>
          <p
            className="intro-rise"
            style={{
              fontSize: 20,
              lineHeight: 1.5,
              maxWidth: 500,
              margin: '24px 0 0',
              color: 'rgba(250,246,236,0.88)',
              animationDelay: '1.35s',
            }}
          >
            <em style={{ fontStyle: 'normal', fontWeight: 700, color: '#FAF6EC' }}>
              From our kitchen to your soul.
            </em>{' '}
            Asian-Fusion-Restaurant in der Donau City – La Mian, Ramen, Bowls &amp; Sushi,
            frisch aus dem Wok.
          </p>
          <div
            className="intro-rise"
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
              Jetzt bestellen
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
              Tisch reservieren
            </a>
          </div>
          <div
            className="intro-rise"
            style={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 14,
              marginTop: 26,
              animationDelay: '1.55s',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 9,
                background: 'rgba(250,246,236,0.95)',
                padding: '9px 14px',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.02em',
                color: '#16181C',
              }}
            >
              <span
                style={{
                  width: 8,
                  height: 8,
                  background: '#2FA36B',
                  borderRadius: '50%',
                }}
              />
              Jetzt geöffnet
            </span>
            <span
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'rgba(250,246,236,0.8)',
              }}
            >
              Mo–Fr 11:00–22:00 · So 11:00–17:00 · Donau-City-Straße 7, 1220 Wien
            </span>
          </div>
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
