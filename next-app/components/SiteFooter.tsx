import Image from 'next/image';

export function SiteFooter() {
  return (
    <footer
      style={{
        background: '#16181C',
        color: 'rgba(250,246,236,0.7)',
      }}
    >
      <div
        data-pad
        data-footer-row
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '20px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 24,
          flexWrap: 'wrap',
        }}
      >
        {/* Logo + name */}
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
            style={{ width: 32, height: 32, display: 'block' }}
          />
          <span
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 800,
              fontSize: 17,
              textTransform: 'uppercase',
              letterSpacing: '0.01em',
            }}
          >
            go DC Tower
          </span>
        </a>

        {/* Socials */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            marginLeft: 'auto',
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

        {/* Divider */}
        <span
          aria-hidden="true"
          data-footer-divider
          style={{
            width: 1,
            height: 18,
            background: 'rgba(250,246,236,0.18)',
          }}
        />

        {/* Legal */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 16,
            fontSize: 13,
            color: 'rgba(250,246,236,0.55)',
          }}
        >
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            Impressum
          </a>
          <a href="#" style={{ color: 'inherit', textDecoration: 'none' }}>
            Datenschutz
          </a>
          <span style={{ color: 'rgba(250,246,236,0.4)' }}>© 2026</span>
        </div>
      </div>
    </footer>
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
        width: 34,
        height: 34,
        borderRadius: '50%',
        color: '#FAF6EC',
        background: 'rgba(250,246,236,0.06)',
        textDecoration: 'none',
      }}
    >
      {children}
    </a>
  );
}
