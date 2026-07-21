const POSTS: { likes: string; img: string; alt: string }[] = [
  { likes: '1.2k', img: '/ig-rainbow-roll.jpg', alt: 'Rainbow Roll auf schwarzem Teller' },
  { likes: '892', img: '/ig-fried-gyoza.jpg', alt: 'Knusprig gebratene Gyoza' },
  { likes: '740', img: '/ig-wok-tofu.jpg', alt: 'Wok-Bowl mit Tofu und Sesam' },
  { likes: '512', img: '/ig-veggie-bowl.jpg', alt: 'Bunte Veggie-Bowl mit Glasnudeln' },
];

export function InstagramSection() {
  return (
    <section
      data-pad
      className="instagram-section"
      style={{
        maxWidth: 1280,
        margin: '0 auto',
        padding: '54px 40px 20px',
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
              color: 'var(--go-red)',
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
            @<span style={{ color: 'var(--go-red)' }}>godctower</span>
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
            background: 'var(--go-bark)',
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
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 12,
          marginTop: 28,
        }}
      >
        {POSTS.map((p) => (
          <a
            key={p.img}
            href="https://instagram.com/godctower"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Instagram-Post: ${p.alt} – ${p.likes} Likes`}
            className="hov-lift-sm hov-zoom instagram-photo"
            style={{
              position: 'relative',
              display: 'block',
              aspectRatio: '1 / 1',
              borderRadius: 14,
              overflow: 'hidden',
              backgroundColor: '#efe7d4',
              border: '1px solid rgba(22,24,28,0.07)',
              textDecoration: 'none',
            }}
          >
            <div
              className="hov-zoom-img"
              role="img"
              aria-label={p.alt}
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
                left: 8,
                bottom: 8,
                display: 'inline-flex',
                alignItems: 'center',
                gap: 5,
                fontSize: 11.5,
                fontWeight: 700,
                color: '#16181C',
                background: 'rgba(250,246,236,0.92)',
                padding: '4px 9px',
                borderRadius: 999,
              }}
            >
              <span style={{ color: 'var(--go-red)', display: 'inline-flex' }}>
                <HeartGlyph />
              </span>
              {p.likes}
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
