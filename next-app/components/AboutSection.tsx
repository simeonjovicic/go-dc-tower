import { Reveal } from './Reveal';

export function AboutSection() {
  return (
    <section
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '72px 40px',
      }}
    >
      <div
        data-about-card
        style={{
          background: '#16181C',
          color: '#FAF6EC',
          borderRadius: 26,
          padding: '64px 56px',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            position: 'absolute',
            right: -10,
            bottom: -50,
            fontFamily: 'var(--font-saira)',
            fontWeight: 900,
            fontSize: 260,
            lineHeight: 1,
            color: 'rgba(244,165,44,0.10)',
            pointerEvents: 'none',
          }}
        >
          道
        </div>
        <Reveal style={{ position: 'relative', maxWidth: 760 }}>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#F4A52C',
            }}
          >
            Über uns
          </div>
          <h2
            data-about-h
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 800,
              fontSize: 54,
              lineHeight: 0.98,
              textTransform: 'uppercase',
              margin: '14px 0 0',
            }}
          >
            From our kitchen<br />to your soul.
          </h2>
          <p
            style={{
              fontSize: 19,
              lineHeight: 1.55,
              color: '#d9d4c7',
              margin: '22px 0 0',
            }}
          >
            Asiatische Fusionsküche, frisch &amp; gesund interpretiert: handgezogene La Mian,
            dampfende Ramen und Bowls voller Geschmack. Große Portionen, faires
            Preis-Leistungs-Verhältnis – das versteckte Juwel im DC Tower.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
