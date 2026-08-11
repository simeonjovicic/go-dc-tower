'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

const DISHES = [
  {
    number: '01',
    name: 'Beef La Mian',
    description: 'Geschmortes Rind · Pak Choi · Sesam · handgezogene Nudeln',
    price: '€ 15,90',
    image: '/menu-lamian.jpg',
    href: '/menu#la-mian',
  },
  {
    number: '02',
    name: 'Tonkotsu Ramen',
    description: 'Cremige Brühe · Chashu · Ei · Nori · Frühlingszwiebel',
    price: '€ 15,50',
    image: '/menu-ramen.jpg',
    href: '/menu#ramen',
  },
  {
    number: '03',
    name: 'Beef Wok',
    description: 'Rindfleisch · Brokkoli · Cashew · Oystersauce · Wok hei',
    price: '€ 14,50',
    image: '/go-wok-bowl.jpg',
    href: '/menu#wok',
  },
  {
    number: '04',
    name: 'Steamed Gyoza',
    description: 'Feiner Teig · Hühnerfüllung · Sesamöl · Soja · Frühlingszwiebel',
    price: '€ 7,90',
    image: '/hero-steamer.jpg',
    href: '/menu#gyoza',
  },
] as const;

/* Preview switcher — lets the hero photo be picked in the browser instead of in code.
   Strip this (and HERO_STORAGE_KEY) once the final image is settled. */
/* Ramen leads: it is the only motif with a portrait crop, so it is the one that renders
   correctly on phones. The others fall back to a cropped landscape frame. */
const HERO_IMAGES = [
  { key: 'ramen', wide: '/hero-ramen-dark.jpg', tall: '/hero-ramen-dark-tall.jpg', label: 'Ramen' },
  { key: 'lamian', wide: '/hero-lamian-dark.jpg', tall: null, label: 'La Mian' },
  { key: 'beef', wide: '/hero-beef-dark.jpg', tall: null, label: 'Beef' },
] as const;

const HERO_STORAGE_KEY = 'hc-hero-image';

const MOBILE_LINKS = [
  ['#philosophie', 'Philosophie'],
  ['#signature', 'Menü'],
  ['#raum', 'Restaurant'],
  ['#reservieren', 'Reservieren'],
] as const;

export function HighClassHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [heroIndex, setHeroIndex] = useState(0);

  // read after mount so the server and first client render agree
  useEffect(() => {
    const stored = Number(window.localStorage.getItem(HERO_STORAGE_KEY));
    if (Number.isInteger(stored) && stored >= 0 && stored < HERO_IMAGES.length) {
      setHeroIndex(stored);
    }
  }, []);

  const pickHero = (index: number) => {
    setHeroIndex(index);
    window.localStorage.setItem(HERO_STORAGE_KEY, String(index));
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    const onResize = () => {
      if (window.innerWidth > 980) setMenuOpen(false);
    };

    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? 'hidden' : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>('.hc-reveal');
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px' },
    );

    elements.forEach((element, index) => {
      element.style.transitionDelay = `${Math.min(index % 3, 2) * 70}ms`;
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  const closeMenu = () => setMenuOpen(false);

  return (
    <div
      ref={rootRef}
      className={`hc-page${menuOpen ? ' menu-open' : ''}`}
    >
      <a className="hc-skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <div className="hc-noise" aria-hidden="true" />

      <header
        className={`hc-site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-header' : ''}`}
      >
        <div className="hc-nav-shell">
          <nav className="hc-split-nav hc-split-nav--left" aria-label="Hauptnavigation">
            <a href="#philosophie">Philosophie</a>
            <a href="#signature">Karte</a>
          </nav>

          <a className="hc-brand" href="#top" aria-label="go DC Tower – Startseite">
            <Image
              src="/go-dc-tower-logo.png"
              alt=""
              width={706}
              height={706}
              priority
            />
          </a>

          <nav className="hc-split-nav hc-split-nav--right" aria-label="Service">
            <a href="#raum">Restaurant</a>
            <a href="#reservieren">Reservieren</a>
          </nav>

          <button
            className="hc-menu-button"
            type="button"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="hc-mobile-panel" aria-hidden={!menuOpen}>
        <nav aria-label="Mobile Navigation">
          {MOBILE_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={closeMenu}>
              {label}
            </a>
          ))}
        </nav>
        <div className="hc-mobile-meta">
          <span>Donau-City-Straße 7<br />1220 Wien</span>
          <span>Mo–Fr 11–22<br />So 11–17</span>
        </div>
      </div>

      <main id="main">
        <section
          className={`hc-hero${HERO_IMAGES[heroIndex].tall ? ' hc-hero--tall' : ''}`}
          id="top"
        >
          {/* native <picture> rather than next/image: the project exports statically with
              images.unoptimized, so next/image adds nothing here — and <source media> is
              the only way to hand phones a genuinely different crop instead of one file */}
          <div className="hc-hero-media" aria-hidden="true">
            {HERO_IMAGES.map((image, index) => (
              <picture
                key={image.key}
                className={`hc-hero-img hc-hero-img--${image.key}${index === heroIndex ? ' is-active' : ''}`}
              >
                {image.tall && <source media="(max-width: 640px)" srcSet={image.tall} />}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={image.wide}
                  alt=""
                  loading={index === 0 ? 'eager' : 'lazy'}
                  fetchPriority={index === 0 ? 'high' : 'auto'}
                />
              </picture>
            ))}
          </div>

          <div className="hc-hero-shell">
            <h1 className="hc-hero-wordmark">
              <span>go</span> <span>DC Tower</span>
            </h1>
          </div>

          <div className="hc-hero-badge">
            <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} />
            <span>
              DC Tower
              <b>Wien 1220</b>
            </span>
          </div>

          <a className="hc-hero-scroll" href="#philosophie">
            <span>Entdecken</span>
            <i aria-hidden="true" />
          </a>

          <div className="hc-hero-switch" role="group" aria-label="Hero-Motiv wählen">
            <span className="hc-hero-switch-label">Motiv</span>
            {HERO_IMAGES.map((image, index) => (
              <button
                key={image.key}
                type="button"
                className={index === heroIndex ? 'is-active' : undefined}
                aria-pressed={index === heroIndex}
                onClick={() => pickHero(index)}
              >
                {image.label}
              </button>
            ))}
          </div>
        </section>

        <div className="hc-ticker" aria-label="Kulinarisches Angebot">
          <div className="hc-ticker-track">
            {['La Mian', 'Ramen', 'Sushi', 'Wok', 'Asian Soul', 'Vienna 22'].map((item) => (
              <span className="hc-ticker-item" key={item}>{item}</span>
            ))}
            {['La Mian', 'Ramen', 'Sushi', 'Wok', 'Asian Soul', 'Vienna 22'].map((item) => (
              <span className="hc-ticker-item" aria-hidden="true" key={`copy-${item}`}>{item}</span>
            ))}
          </div>
        </div>

        <section className="hc-intro" id="philosophie">
          <div className="hc-section-mark hc-reveal"><span>01</span><span>Our point of view</span></div>
          <div className="hc-intro-copy hc-reveal">
            <p className="hc-eyebrow">Eine neue Perspektive</p>
            <h2 className="hc-display">Asia ist kein Ort. Es ist eine <em>Haltung.</em></h2>
            <div className="hc-intro-copy-bottom">
              <p>
                Wir nehmen Klassiker ernst — aber nicht wörtlich. Bei go treffen präzise asiatische Techniken auf die urbane Energie Wiens. Schnell, wenn es sein muss. Besonders, wenn es sein darf.
              </p>
              <div>
                <p>
                  Offene Küche, ehrliche Zutaten und ein Raum, der Luft lässt. Für den Business Lunch ebenso wie für den langen Abend mit Menschen, die bleiben sollen.
                </p>
                <a className="hc-text-link" href="#raum">Das Restaurant entdecken <span className="hc-arrow">→</span></a>
              </div>
            </div>
          </div>
        </section>

        <section className="hc-signature" id="signature">
          <div className="hc-signature-head hc-reveal">
            <p className="hc-eyebrow">Signature selection</p>
            <h2 className="hc-display">Made to <i>move you.</i></h2>
            <span className="hc-signature-count">04 selected dishes</span>
          </div>

          <div className="hc-dish-list">
            {DISHES.map((dish) => (
              <Link className="hc-dish hc-reveal" href={dish.href} key={dish.number}>
                <span className="hc-dish-no">{dish.number}</span>
                <span className="hc-dish-title">{dish.name}</span>
                <span className="hc-dish-desc">{dish.description}</span>
                <span className="hc-dish-price">{dish.price}</span>
                <span className="hc-dish-image">
                  <Image src={dish.image} alt={dish.name} fill sizes="390px" />
                </span>
              </Link>
            ))}
          </div>

          <div className="hc-signature-foot hc-reveal">
            <p>Unsere Karte folgt der Saison und dem besten Produkt — mit veganen Optionen und Gerichten für jede Tageszeit.</p>
            <Link className="hc-text-link" href="/menu">Die ganze Karte ansehen <span className="hc-arrow">→</span></Link>
          </div>
        </section>

        <section className="hc-experience" id="raum">
          <div className="hc-experience-shell">
            <div className="hc-experience-media hc-reveal">
              <Image
                src="/go-interior-tables.jpg"
                alt="Heller Gastraum des go DC Tower mit Holz und offenen Tischen"
                fill
                sizes="(max-width: 980px) calc(100vw - 36px), 55vw"
              />
              <div className="hc-experience-caption">
                <small>DC Tower · Ground floor</small>
                <strong>Ein Raum für gute Runden.</strong>
              </div>
            </div>
            <div className="hc-experience-copy hc-reveal">
              <p className="hc-eyebrow">The space</p>
              <h2 className="hc-display">Urban energy.<i>Warm soul.</i></h2>
              <p>
                Klare Linien, helles Holz, viel Tageslicht. Das Interieur nimmt die Architektur des Towers auf und macht sie menschlich. Unsere offene Küche bringt Bewegung in den Raum — und den Duft des Woks direkt an den Tisch.
              </p>
              <div className="hc-facts" aria-label="Restaurantdetails">
                <div className="hc-fact"><strong>80</strong><span>Sitzplätze</span></div>
                <div className="hc-fact"><strong>2</strong><span>Ebenen</span></div>
                <div className="hc-fact"><strong>1</strong><span>Open kitchen</span></div>
              </div>
              <a className="hc-text-link" href="#reservieren">Einen Tisch sichern <span className="hc-arrow">→</span></a>
            </div>
          </div>
        </section>

        <section className="hc-gallery" aria-label="Einblicke in die Küche">
          <GalleryImage image="/ig-beef-greens.jpg" alt="Asiatisches Beef-Gericht mit frischem Gemüse" eyebrow="From the wok" title="Fire & precision" />
          <GalleryImage image="/ig-rainbow-roll.jpg" alt="Frisch zubereitete Rainbow Roll" eyebrow="Made by hand" title="Freshly rolled" />
          <GalleryImage image="/ig-dimsum.jpg" alt="Dim Sum aus der Küche des go DC Tower" eyebrow="Little rituals" title="Steam & soul" />
        </section>

        <section className="hc-reserve" id="reservieren">
          <div className="hc-reserve-shell">
            <div className="hc-reserve-aside hc-reveal">
              <p className="hc-eyebrow">Your table</p>
              <p>Für Gruppen, Business Lunches und private Anlässe steht unsere Lounge im ersten Stock zur Verfügung.</p>
            </div>
            <div className="hc-reserve-main hc-reveal">
              <h2 className="hc-display">Meet me at<i>go.</i></h2>
              <div className="hc-reserve-actions">
                <a className="hc-button-dark" href="mailto:info@godctower.com?subject=Tischreservierung%20go%20DC%20Tower">Tisch reservieren <span>↗</span></a>
                <span className="hc-reserve-note">Oder telefonisch<br />+43 1 916 51 56</span>
              </div>
            </div>
          </div>
        </section>

        <section className="hc-location" id="kontakt">
          <div className="hc-location-shell">
            <div className="hc-location-top">
              <div className="hc-reveal">
                <p className="hc-eyebrow">Find us</p>
                <h2 className="hc-display">Vienna,<br /><i>on another level.</i></h2>
              </div>
              <div className="hc-address hc-reveal">
                <div className="hc-address-block">
                  <small>Adresse</small>
                  <p>DC Tower · Donau-City-Straße 7<br />1220 Wien</p>
                </div>
                <div className="hc-address-block">
                  <small>Öffnungszeiten</small>
                  <p>Mo–Fr 11:00–22:00 · Küche bis 21:00<br />So 11:00–17:00 · Sa &amp; Feiertage geschlossen</p>
                </div>
                <div className="hc-address-block">
                  <small>Kontakt</small>
                  <a href="tel:+4319165156">+43 1 916 51 56</a><br />
                  <a href="mailto:info@godctower.com">info@godctower.com</a>
                </div>
                <a
                  className="hc-text-link"
                  href="https://www.google.com/maps/dir/?api=1&destination=Donau-City-Stra%C3%9Fe+7,+1220+Wien"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Route planen <span className="hc-arrow">↗</span>
                </a>
              </div>
            </div>

            <footer className="hc-footer">
              <span>© 2026 go DC Tower</span>
              <Image className="hc-footer-logo" src="/go-dc-tower-logo.png" alt="go DC Tower" width={706} height={706} />
              <span className="hc-footer-links">
                <a href="https://instagram.com/godctower" target="_blank" rel="noopener noreferrer">Instagram</a>
                <a href="#">Impressum</a>
                <a href="#">Datenschutz</a>
              </span>
            </footer>
          </div>
        </section>
      </main>
    </div>
  );
}

function GalleryImage({
  image,
  alt,
  eyebrow,
  title,
}: {
  image: string;
  alt: string;
  eyebrow: string;
  title: string;
}) {
  return (
    <div className="hc-gallery-item">
      <Image src={image} alt={alt} fill sizes="(max-width: 640px) 100vw, 40vw" />
      <div className="hc-gallery-label">
        <small>{eyebrow}</small>
        <strong>{title}</strong>
      </div>
    </div>
  );
}
