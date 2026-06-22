import type { ReactNode } from 'react';
import { Reveal } from './Reveal';
import {
  MapPin,
  Clock,
  Phone,
  Mail,
  Train,
  Parking,
  ArrowRight,
} from './Icons';

export function LocationSection() {
  return (
    <section
      id="standort"
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 64px',
        scrollMarginTop: 84,
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
          Standort &amp; Öffnungszeiten
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
          So findest du uns.
        </h2>
      </Reveal>

      <div
        data-loc
        style={{
          marginTop: 32,
          display: 'grid',
          gridTemplateColumns: '0.85fr 1.15fr',
          gap: 32,
          alignItems: 'start',
        }}
      >
        {/* ─── INFO STACK ─── */}
        <Reveal>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            <InfoRow icon={<MapPin />}>
              <div style={value}>DC Tower · Donau-City-Straße 7</div>
              <div style={sub}>1220 Wien</div>
            </InfoRow>

            <InfoRow icon={<Clock />}>
              <div style={value}>
                Mo–Fr 11:00–22:00
                <span style={muted}> · Küche bis 21:00</span>
              </div>
              <div style={sub}>
                Sonntag 11:00–17:00 · Samstag &amp; Feiertage geschlossen
              </div>
            </InfoRow>

            <InfoRow icon={<Phone />} href="tel:+4319165156">
              <div style={value}>+43&nbsp;1&nbsp;9165156</div>
            </InfoRow>

            <InfoRow icon={<Mail />} href="mailto:info@godctower.com" last>
              <div style={value}>info@godctower.com</div>
            </InfoRow>

            <a
              href="https://www.google.com/maps/dir/?api=1&destination=Donau-City-Stra%C3%9Fe+7,+1220+Wien"
              target="_blank"
              rel="noopener noreferrer"
              className="hov-shine hov-arrow"
              style={{
                marginTop: 24,
                display: 'inline-flex',
                alignItems: 'center',
                alignSelf: 'flex-start',
                gap: 8,
                padding: '13px 22px',
                background: '#16181C',
                color: '#FAF6EC',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
                textDecoration: 'none',
              }}
            >
              <MapPin size={16} />
              Route planen
              <span className="arrow" style={{ display: 'inline-flex' }}>
                <ArrowRight size={15} />
              </span>
            </a>
          </div>
        </Reveal>

        {/* ─── MAP ─── */}
        <Reveal delay={120}>
          <div
            style={{
              position: 'relative',
              minHeight: 420,
              borderRadius: 20,
              overflow: 'hidden',
              border: '1px solid rgba(22,24,28,0.1)',
              background: '#eef0f2',
              aspectRatio: '16 / 11',
            }}
          >
            <iframe
              title="Karte: DC Tower, Donau-City-Straße 7, 1220 Wien"
              src="https://www.google.com/maps?q=Donau-City-Stra%C3%9Fe+7,+1220+Wien&t=&z=16&ie=UTF8&iwloc=&output=embed"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              style={{
                position: 'absolute',
                inset: 0,
                width: '100%',
                height: '100%',
                border: 0,
                filter: 'grayscale(0.15) contrast(1.05)',
              }}
            />
          </div>
        </Reveal>
      </div>

      {/* ─── PARKING + TRANSIT ─── */}
      <Reveal delay={80}>
        <div
          data-park-card
          style={{
            marginTop: 28,
            display: 'grid',
            gridTemplateColumns: '0.85fr 1.15fr',
            gap: 28,
            padding: 28,
            background: '#fff',
            border: '1px solid rgba(22,24,28,0.08)',
            borderRadius: 20,
            alignItems: 'center',
          }}
        >
          <div>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '6px 12px 6px 8px',
                background: '#005ca9',
                color: '#fff',
                borderRadius: 8,
                fontWeight: 800,
                fontSize: 12,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              <Parking size={16} />
              DC Tower Garage
            </div>
            <h3
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 800,
                fontSize: 32,
                lineHeight: 1.05,
                textTransform: 'uppercase',
                margin: '14px 0 10px',
              }}
            >
              Parken mit <span style={{ color: '#E1391F' }}>Vergünstigung</span>.
            </h3>
            <p
              style={{
                fontSize: 14.5,
                lineHeight: 1.55,
                color: '#3a3d42',
                margin: '0 0 16px',
              }}
            >
              Gäste parken direkt in der DC-Tower-Garage – einfach nach dem Essen
              an der Kassa Bescheid geben.
            </p>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 10,
                padding: '10px 14px',
                background: '#FAF6EC',
                borderRadius: 12,
                fontSize: 13.5,
                fontWeight: 600,
                color: '#16181C',
              }}
            >
              <span style={{ color: '#2FA36B', display: 'inline-flex' }}>
                <Train size={18} />
              </span>
              U1 Kaisermühlen-VIC · 4 Min. zu Fuß
            </div>
          </div>

          <div
            style={{
              overflow: 'auto',
              border: '1px solid rgba(22,24,28,0.1)',
              borderRadius: 14,
            }}
          >
            <table
              style={{
                width: '100%',
                borderCollapse: 'collapse',
                fontSize: 14,
              }}
            >
              <thead>
                <tr style={{ background: '#FAF6EC' }}>
                  <th style={th}>Dauer</th>
                  <th style={th}>Mo–Fr<br />11:00–18:00</th>
                  <th style={th}>Mo–Fr 18:00–24:00<br />&amp; Sa–So (ganzer Tag)</th>
                </tr>
              </thead>
              <tbody>
                <Row label="erste Stunde" a="1 €" b="1 €" />
                <Row label="zwei Stunden" a="2 €" b="2 €" />
                <Row label="drei Stunden" a="5 €" b="3 €" />
                <Row label="weitere Stunden" a="+ 3 €" b="+ 3 €" last />
              </tbody>
            </table>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

/* ───────── helpers ───────── */

function InfoRow({
  icon,
  children,
  href,
  last,
}: {
  icon: ReactNode;
  children: ReactNode;
  href?: string;
  last?: boolean;
}) {
  const content = (
    <>
      <span
        style={{
          color: '#E1391F',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: 32,
          flex: 'none',
          marginTop: 2,
        }}
      >
        {icon}
      </span>
      <div style={{ flex: 1, minWidth: 0 }}>{children}</div>
    </>
  );

  const baseStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 16,
    padding: '16px 0',
    borderBottom: last ? 'none' : '1px solid rgba(22,24,28,0.08)',
  };

  if (href) {
    return (
      <a
        href={href}
        className="hov-row"
        style={{ ...baseStyle, textDecoration: 'none', color: 'inherit', padding: '16px 12px', margin: '0 -12px' }}
      >
        {content}
      </a>
    );
  }
  return <div style={baseStyle}>{content}</div>;
}

const value: React.CSSProperties = {
  fontSize: 17,
  fontWeight: 700,
  lineHeight: 1.3,
  color: '#16181C',
};
const sub: React.CSSProperties = {
  fontSize: 14,
  color: '#6b6e73',
  fontWeight: 500,
  marginTop: 4,
  lineHeight: 1.4,
};
const muted: React.CSSProperties = {
  color: '#9a9488',
  fontWeight: 500,
};

const th: React.CSSProperties = {
  padding: '12px 14px',
  textAlign: 'left',
  fontWeight: 800,
  fontSize: 12,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#16181C',
  borderBottom: '1px solid rgba(22,24,28,0.1)',
};
const td: React.CSSProperties = {
  padding: '12px 14px',
  borderBottom: '1px solid rgba(22,24,28,0.08)',
  fontSize: 15,
};

function Row({
  label, a, b, last,
}: { label: string; a: string; b: string; last?: boolean }) {
  const border = last ? 'none' : '1px solid rgba(22,24,28,0.08)';
  return (
    <tr>
      <td style={{ ...td, fontWeight: 700, borderBottom: border }}>{label}</td>
      <td style={{ ...td, fontFamily: 'var(--font-saira)', fontWeight: 800, fontSize: 18, borderBottom: border }}>
        {a}
      </td>
      <td style={{ ...td, fontFamily: 'var(--font-saira)', fontWeight: 800, fontSize: 18, borderBottom: border }}>
        {b}
      </td>
    </tr>
  );
}
