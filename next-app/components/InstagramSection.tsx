const POSTS: { img: string; likes: string }[] = [
  { img: 'https://images.unsplash.com/photo-1569718212165-3a8278d5f624?w=500&q=80&auto=format&fit=crop', likes: '1.2k' },
  { img: 'https://images.unsplash.com/photo-1623341214825-9f4f963727da?w=500&q=80&auto=format&fit=crop', likes: '892' },
  { img: 'https://images.unsplash.com/photo-1611143669185-af224c5e3252?w=500&q=80&auto=format&fit=crop', likes: '740' },
  { img: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&q=80&auto=format&fit=crop', likes: '618' },
  { img: 'https://images.unsplash.com/photo-1626804475297-41608ea09aeb?w=500&q=80&auto=format&fit=crop', likes: '512' },
  { img: 'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=500&q=80&auto=format&fit=crop', likes: '484' },
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
            className="hov-zoom hov-lift-sm"
            style={{
              position: 'relative',
              display: 'block',
              aspectRatio: '1 / 1',
              borderRadius: 14,
              backgroundColor: '#efe7d4',
              textDecoration: 'none',
              color: '#fff',
            }}
          >
            <div
              className="hov-zoom-img"
              style={{
                position: 'absolute',
                inset: 0,
                backgroundImage: `url('${p.img}')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
              }}
            />
            <div
              style={{
                position: 'absolute',
                inset: 0,
                background:
                  'linear-gradient(180deg, rgba(0,0,0,0) 50%, rgba(0,0,0,0.55) 100%)',
              }}
            />
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
