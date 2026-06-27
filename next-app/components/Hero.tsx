export function Hero() {
  return (
    <section
      id="top"
      data-hero-section
      style={{
        position: 'relative',
        minHeight: 'calc(100dvh - 72px)',
        display: 'flex',
        alignItems: 'center',
        paddingTop: 32,
        paddingBottom: 32,
      }}
    >
      <div
        data-pad
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          width: '100%',
          padding: '0 40px',
        }}
      >
        <div
          data-hero
          style={{
            display: 'grid',
            gridTemplateColumns: '1.05fr 0.95fr',
            gap: 48,
            alignItems: 'center',
          }}
        >
          <div style={{ position: 'relative', paddingLeft: 28 }}>
            <div
              style={{
                position: 'absolute',
                left: 0,
                top: 6,
                bottom: 6,
                width: 4,
                background: 'linear-gradient(#E1391F, #F4A52C)',
                borderRadius: 4,
              }}
            />
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                fontWeight: 700,
                fontSize: 13,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#E1391F',
              }}
            >
              <span
                style={{
                  width: 7,
                  height: 7,
                  background: '#2FA36B',
                  borderRadius: '50%',
                }}
              />
              DC Tower&apos;s hidden gem in Vienna
            </div>
            <h1
              data-h1
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 96,
                lineHeight: 0.92,
                letterSpacing: '-0.01em',
                textTransform: 'uppercase',
                margin: '16px 0 0',
              }}
            >
              Willkommen<br />im{' '}
              <span style={{ color: '#E1391F' }}>DC Tower.</span>
            </h1>
            <p
              style={{
                fontSize: 20,
                lineHeight: 1.5,
                maxWidth: 480,
                margin: '24px 0 0',
                color: '#3a3d42',
              }}
            >
              <em style={{ fontStyle: 'normal', fontWeight: 700, color: '#16181C' }}>
                From our kitchen to your soul.
              </em>{' '}
              Asian-Fusion-Restaurant in der Donau City – La Mian, Ramen, Bowls &amp; Sushi,
              frisch aus dem Wok.
            </p>
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: 12,
                marginTop: 32,
              }}
            >
              <a
                href="#reservieren"
                className="hov-shine"
                style={{
                  textDecoration: 'none',
                  padding: '17px 30px',
                  background: '#E1391F',
                  color: '#FAF6EC',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 18,
                  boxShadow: '0 10px 26px rgba(225,57,31,0.3)',
                }}
              >
                Tisch reservieren
              </a>
              <a
                href="#standort"
                className="hov-fill-dark"
                style={{
                  textDecoration: 'none',
                  padding: '17px 30px',
                  border: '1.5px solid #16181C',
                  borderRadius: 999,
                  fontWeight: 700,
                  fontSize: 18,
                }}
              >
                Standort &amp; Öffnungszeiten
              </a>
            </div>
            <p
              style={{
                margin: '24px 0 0',
                fontSize: 14,
                fontWeight: 600,
                color: '#6b6e73',
              }}
            >
              Mo–Fr 11:00–22:00 · So 11:00–17:00 · Donau-City-Straße 7, 1220 Wien
            </p>
          </div>

          <div
            data-hero-art
            style={{
              position: 'relative',
              minHeight: 520,
              height: '70dvh',
              maxHeight: 680,
              borderRadius: 22,
              overflow: 'hidden',
              backgroundColor: '#efe7d4',
              backgroundImage:
                "url('https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=1400&q=80&auto=format&fit=crop')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              border: '1px solid rgba(22,24,28,0.07)',
              boxShadow: '0 30px 60px rgba(22,24,28,0.18)',
            }}
          >
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(160deg, rgba(22,24,28,0) 30%, rgba(22,24,28,0.55) 100%)',
              }}
            />
            <div
              style={{
                position: 'absolute',
                right: 18,
                top: -14,
                fontFamily: 'var(--font-saira)',
                fontWeight: 900,
                fontSize: 240,
                lineHeight: 1,
                color: 'rgba(250,246,236,0.18)',
                pointerEvents: 'none',
              }}
            >
              麺
            </div>
            <div
              style={{
                position: 'absolute',
                left: 20,
                bottom: 20,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                background: 'rgba(250,246,236,0.95)',
                padding: '10px 14px',
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
            </div>
          </div>
        </div>

        {/* scroll hint */}
        <div
          data-hero-scroll
          style={{
            position: 'absolute',
            left: '50%',
            bottom: 24,
            transform: 'translateX(-50%)',
            display: 'inline-flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 8,
            color: '#6b6e73',
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
              background: 'linear-gradient(#16181C, transparent)',
            }}
          />
        </div>
      </div>
    </section>
  );
}
