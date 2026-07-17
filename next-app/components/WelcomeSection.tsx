import { Reveal } from './Reveal';

export function WelcomeSection() {
  return (
    <section
      id="ueber-uns"
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 24px',
        scrollMarginTop: 84,
      }}
    >
      <div
        data-welcome-grid
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 48,
          alignItems: 'center',
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
            Willkommen
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
            Liebe Gäste, <span style={{ color: 'var(--go-red)' }}>schön</span>,<br />dass ihr da seid.
          </h2>
          <p
            style={{
              fontSize: 18,
              lineHeight: 1.6,
              color: '#3a3d42',
              margin: '20px 0 0',
              maxWidth: 520,
            }}
          >
            Wir sind das Asian-Fusion-Restaurant im Erdgeschoss des DC&nbsp;Towers –
            ein kleines, lebendiges Stück Asien mitten in der Donau&nbsp;City.
            Handgezogene La&nbsp;Mian, dampfende Ramen, frische Bowls und
            knuspriges Sushi – frisch &amp; gesund interpretiert, große Portionen,
            faires Preis-Leistungs-Verhältnis. Das versteckte Juwel im DC&nbsp;Tower.
          </p>
          <p
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              margin: '18px 0 0',
            }}
          >
            <span
              aria-hidden="true"
              style={{
                width: 26,
                height: 3,
                background: 'var(--go-red)',
                borderRadius: 2,
                flex: 'none',
              }}
            />
            <em
              style={{
                fontFamily: 'var(--font-saira)',
                fontStyle: 'normal',
                fontWeight: 800,
                fontSize: 19,
                letterSpacing: '0.02em',
                textTransform: 'uppercase',
                color: 'var(--go-red)',
              }}
            >
              From our kitchen to your soul.
            </em>
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 28,
              marginTop: 26,
            }}
          >
            <Stat label="Eröffnet">2018</Stat>
            <Stat label="Gerichte">22+</Stat>
            <Stat label="Plätze">80</Stat>
            <Stat label="Tripadvisor">4,6★</Stat>
          </div>
        </Reveal>

        <Reveal delay={150} y={32}>
          <div
            data-welcome-art
            style={{
              display: 'grid',
              gridTemplateColumns: '1.4fr 1fr',
              gridTemplateRows: '1fr 1fr',
              gap: 14,
              minHeight: 460,
            }}
          >
            <VenueTile
              gridRow="1 / 3"
              img="/go-wok-bowl.jpg"
              alt="Wok-Gericht mit Garnelen in einer go-Schüssel"
            />
            <VenueTile
              img="/go-shumai.jpg"
              alt="Shumai im Bambusdämpfer"
            />
            <VenueTile
              img="/go-interior-tables.jpg"
              alt="Heller Gastraum mit weißen Tischen im go DC Tower"
            />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VenueTile({
  caption,
  gridRow,
  img,
  alt,
}: {
  caption?: string;
  gridRow?: string;
  img?: string;
  alt?: string;
}) {
  return (
    <div
      role={img ? 'img' : undefined}
      aria-label={img ? alt : undefined}
      style={{
        position: 'relative',
        gridRow,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#efe7d4',
        backgroundImage: img
          ? `url('${img}')`
          : 'repeating-linear-gradient(45deg, #efe7d4, #efe7d4 11px, #f5efdf 11px, #f5efdf 22px)',
        backgroundSize: img ? 'cover' : undefined,
        backgroundPosition: img ? 'center' : undefined,
        border: '1px solid rgba(22,24,28,0.07)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {caption ? (
        <span
          style={{
            fontFamily: 'var(--font-dm)',
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.08em',
            color: '#9a948280',
            background: 'rgba(250,246,236,0.7)',
            padding: '7px 12px',
            borderRadius: 999,
            whiteSpace: 'nowrap',
          }}
        >
          {caption}
        </span>
      ) : null}
    </div>
  );
}

function Stat({
  children,
  label,
}: {
  children: React.ReactNode;
  label: string;
}) {
  return (
    <div>
      <div
        style={{
          fontFamily: 'var(--font-saira)',
          fontWeight: 900,
          fontSize: 38,
          lineHeight: 1,
          color: 'var(--go-wood-deep)',
        }}
      >
        {children}
      </div>
      <div
        style={{
          marginTop: 4,
          fontSize: 12,
          fontWeight: 700,
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: '#6b6e73',
        }}
      >
        {label}
      </div>
    </div>
  );
}
