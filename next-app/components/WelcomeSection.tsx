import { CountUp } from './CountUp';
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
              color: '#E1391F',
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
            Liebe Gäste, <span style={{ color: '#E1391F' }}>schön</span>,<br />dass ihr da seid.
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
            knuspriges Sushi. Große Portionen, faires Preis-Leistungs-Verhältnis.
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 28,
              marginTop: 26,
            }}
          >
            <Stat label="Eröffnet">
              <CountUp end={2018} start={1990} duration={1800} />
            </Stat>
            <Stat label="Gerichte">
              <CountUp end={22} suffix="+" />
            </Stat>
            <Stat label="Plätze">
              <CountUp end={80} />
            </Stat>
            <Stat label="Tripadvisor">
              <CountUp end={4.6} decimals={1} suffix="★" />
            </Stat>
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
              caption="FOTO · Restaurant innen"
            />
            <VenueTile caption="FOTO · Detail" />
            <VenueTile caption="FOTO · Atmosphäre" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VenueTile({
  caption,
  gridRow,
}: {
  caption?: string;
  gridRow?: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        gridRow,
        borderRadius: 20,
        overflow: 'hidden',
        backgroundColor: '#efe7d4',
        backgroundImage:
          'repeating-linear-gradient(45deg, #efe7d4, #efe7d4 11px, #f5efdf 11px, #f5efdf 22px)',
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
          color: '#16181C',
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
