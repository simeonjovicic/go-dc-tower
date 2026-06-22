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
              img="https://images.unsplash.com/photo-1559339352-11d035aa65de?w=900&q=80&auto=format&fit=crop"
              caption="Unser Restaurant · Erdgeschoss"
            />
            <VenueTile img="https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=600&q=80&auto=format&fit=crop" />
            <VenueTile img="https://images.unsplash.com/photo-1466978913421-dad2ebd01d17?w=600&q=80&auto=format&fit=crop" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function VenueTile({
  img,
  caption,
  gridRow,
}: {
  img: string;
  caption?: string;
  gridRow?: string;
}) {
  return (
    <div
      className="hov-zoom"
      style={{
        position: 'relative',
        gridRow,
        borderRadius: 20,
        backgroundColor: '#efe7d4',
      }}
    >
      <div
        className="hov-zoom-img"
        style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `url('${img}')`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />
      {caption ? (
        <span
          style={{
            position: 'absolute',
            left: 14,
            bottom: 14,
            background: 'rgba(250,246,236,0.95)',
            padding: '7px 12px',
            borderRadius: 999,
            fontSize: 12,
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#16181C',
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
