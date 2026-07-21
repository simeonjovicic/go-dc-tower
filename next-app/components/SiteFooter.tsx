import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer
      className="site-footer"
      style={{
        background: 'var(--go-bark)',
        color: 'rgba(250,246,236,0.72)',
      }}
    >
      <div
        data-pad
        data-footer-grid
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '52px 40px 36px',
          display: 'grid',
          gridTemplateColumns: '1.5fr 1fr 1fr 1fr',
          gap: 36,
          alignItems: 'start',
        }}
      >
        {/* Brand */}
        <div>
          <a
            href="/"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 10,
              textDecoration: 'none',
              color: '#FAF6EC',
            }}
          >
            <Image
              src="/go-dc-tower-logo.png"
              alt="go DC Tower"
              width={706}
              height={706}
              style={{ width: 40, height: 40, display: 'block' }}
            />
            <span
              style={{
                fontFamily: 'var(--font-saira)',
                fontWeight: 800,
                fontSize: 19,
                textTransform: 'uppercase',
                letterSpacing: '0.01em',
              }}
            >
              go DC Tower
            </span>
          </a>
          <p style={{ margin: '14px 0 0', fontSize: 14.5, lineHeight: 1.6 }}>
            Ra&apos;mien go DC Tower
            <br />
            Asian Fusion · La Mian · Ramen · Bowls &amp; Sushi
          </p>
          <p
            style={{
              margin: '10px 0 0',
              fontSize: 14,
              fontStyle: 'italic',
              color: 'var(--go-red-soft)',
              fontWeight: 600,
            }}
          >
            From our kitchen to your soul.
          </p>
        </div>

        {/* Kontakt */}
        <div>
          <FooterHead>Kontakt</FooterHead>
          <p style={colText}>
            Donau-City-Straße 7<br />
            1220 Wien
          </p>
          <p style={colText}>
            <a href="tel:+4319165156" style={colLink}>
              +43 1 9165156
            </a>
            <br />
            <a href="mailto:info@godctower.com" style={colLink}>
              info@godctower.com
            </a>
          </p>
        </div>

        {/* Öffnungszeiten */}
        <div>
          <FooterHead>Öffnungszeiten</FooterHead>
          <p style={colText}>
            Mo–Fr · 11:00–22:00
            <br />
            So · 11:00–17:00
            <br />
            <span style={{ color: 'rgba(250,246,236,0.45)' }}>
              Sa &amp; Feiertage geschlossen
            </span>
          </p>
        </div>

        {/* Folgen */}
        <div>
          <FooterHead>Folgen</FooterHead>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 8,
              marginTop: 2,
            }}
          >
            <Social href="https://instagram.com/godctower" label="Instagram">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="5" />
                <circle cx="12" cy="12" r="4" />
                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
              </svg>
            </Social>
            <Social href="#" label="Facebook">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M13.5 21v-7h2.4l.4-3h-2.8V9.1c0-.9.3-1.5 1.6-1.5h1.7V5c-.3 0-1.3-.1-2.4-.1-2.4 0-4.1 1.5-4.1 4.1V11H8v3h2.3v7h3.2z" />
              </svg>
            </Social>
            <Social href="#" label="TikTok">
              <svg viewBox="0 0 24 24" width="18" height="18" fill="currentColor" aria-hidden="true">
                <path d="M19.6 8.3a6.5 6.5 0 0 1-3.8-1.2v7.3a5.4 5.4 0 1 1-5.4-5.4c.3 0 .6 0 .9.1v2.8c-.3-.1-.6-.1-.9-.1a2.6 2.6 0 1 0 2.6 2.6V3h2.8a3.8 3.8 0 0 0 3.8 3.6v1.7z" />
              </svg>
            </Social>
          </div>
          <p style={{ ...colText, marginTop: 14 }}>@godctower</p>
        </div>
      </div>

      {/* Bottom bar */}
      <div style={{ borderTop: '1px solid rgba(250,246,236,0.12)' }}>
        <div
          data-pad
          style={{
            maxWidth: 1280,
            margin: '0 auto',
            padding: '18px 40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
            fontSize: 13,
            color: 'rgba(250,246,236,0.55)',
          }}
        >
          <span>© 2026 go DC Tower</span>
          <span style={{ display: 'inline-flex', gap: 16 }}>
            <a href="#" style={colLink}>
              Impressum
            </a>
            <a href="#" style={colLink}>
              Datenschutz
            </a>
            <a href="#" style={colLink}>
              AGB
            </a>
          </span>
        </div>
      </div>
    </footer>
  );
}

/* ----- helpers ----- */

const colText: React.CSSProperties = {
  margin: '12px 0 0',
  fontSize: 14.5,
  lineHeight: 1.65,
};

const colLink: React.CSSProperties = {
  color: 'inherit',
  textDecoration: 'none',
};

function FooterHead({ children }: { children: React.ReactNode }) {
  return (
    <h4
      style={{
        margin: 0,
        fontFamily: 'var(--font-saira)',
        fontWeight: 700,
        fontSize: 14,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: '#FAF6EC',
      }}
    >
      {children}
    </h4>
  );
}

function Social({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target={href.startsWith('http') ? '_blank' : undefined}
      rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
      aria-label={label}
      className="hov-social"
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 36,
        height: 36,
        borderRadius: '50%',
        color: '#FAF6EC',
        background: 'rgba(250,246,236,0.08)',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}
