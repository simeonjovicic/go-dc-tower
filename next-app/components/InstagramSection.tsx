const POSTS: { likes: string }[] = [
  { likes: '1.2k' },
  { likes: '892' },
  { likes: '740' },
  { likes: '618' },
  { likes: '512' },
  { likes: '484' },
];

export function InstagramSection() {
  return (
    <section
      data-pad
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '64px 40px 24px',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: 16,
        }}
      >
        <div>
          <div
            style={{
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: '#E1391F',
            }}
          >
            Folge uns
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
            @<span style={{ color: '#E1391F' }}>godctower</span>
          </h2>
          <p
            style={{
              fontSize: 16,
              color: '#3a3d42',
              margin: '10px 0 0',
              maxWidth: 480,
            }}
          >
            Tagesgerichte, Behind-the-Scenes aus der Küche und Eventankündigungen –
            am besten direkt auf Instagram.
          </p>
        </div>
        <a
          href="https://instagram.com/godctower"
          target="_blank"
          rel="noopener noreferrer"
          className="hov-shine"
          style={{
            textDecoration: 'none',
            padding: '14px 22px',
            background: '#16181C',
            color: '#FAF6EC',
            borderRadius: 999,
            fontWeight: 700,
            fontSize: 15,
            display: 'inline-flex',
            alignItems: 'center',
            gap: 8,
          }}
        >
          <InstagramGlyph />
          Auf Instagram folgen
        </a>
      </div>

      <div
        data-ig-grid
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(6, 1fr)',
          gap: 12,
          marginTop: 28,
        }}
      >
        {POSTS.map((p, i) => (
          <a
            key={i}
            href="https://instagram.com/godctower"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram-Post mit ${p.likes} Likes`}
            className="hov-lift-sm"
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              aspectRatio: '1 / 1',
              borderRadius: 14,
              overflow: 'hidden',
              backgroundColor: '#efe7d4',
              backgroundImage:
                'repeating-linear-gradient(45deg, #efe7d4, #efe7d4 9px, #f5efdf 9px, #f5efdf 18px)',
              border: '1px solid rgba(22,24,28,0.07)',
              textDecoration: 'none',
              color: '#16181C',
            }}
          >
            <span
              style={{
                fontFamily: 'var(--font-dm)',
                fontSize: 11,
                fontWeight: 700,
                letterSpacing: '0.06em',
                color: '#9a948280',
                background: 'rgba(250,246,236,0.7)',
                padding: '6px 10px',
                borderRadius: 999,
              }}
            >
              FOTO · {i + 1}
            </span>
            <div
              style={{
                position: 'absolute',
                left: 10,
                bottom: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 12,
                fontWeight: 700,
                color: '#6b6e73',
              }}
            >
              <HeartGlyph /> {p.likes}
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

function InstagramGlyph() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
    </svg>
  );
}

function HeartGlyph() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 21s-7-4.5-9.5-9C.7 8.3 2.7 4 7 4c2 0 3.5 1.2 5 3 1.5-1.8 3-3 5-3 4.3 0 6.3 4.3 4.5 8C19 16.5 12 21 12 21z" />
    </svg>
  );
}
