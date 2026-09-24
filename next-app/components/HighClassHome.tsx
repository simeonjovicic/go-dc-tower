'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import {
  ANFAHRT,
  BRAND,
  CATERING,
  CONTACT,
  HOURS,
  KAPAZITAET,
  SOCIAL,
} from '@/components/site-data';
import { DISHES, fmt, priceFrom } from '@/components/menu-data';

/* Settled hero motif. Ramen is the only one shot with a portrait crop, so phones
   get a genuine vertical frame instead of a cropped landscape one. */
const HERO = {
  wide: '/hero-ramen-dark.jpg',
  tall: '/hero-ramen-dark-tall.jpg',
} as const;

/* Vier Gerichte, die das Haus erklären: die handgezogene Nudel, der rohe Fisch,
   der Klassiker aus dem Ofen und die Vorspeise mit der besten Küchentechnik.
   Preise und Texte kommen aus der Karte, damit hier nichts eigenes Leben führt. */
const SIGNATURE: {
  id: string;
  href: string;
  /** Nur setzen, wenn der Kartenname allein zu wenig Kontext trägt. */
  label?: string;
  desc?: string;
}[] = [
  { id: 'lamien', href: '/menu#nudelsuppen' },
  {
    id: 'poke-maguro',
    href: '/menu#poke',
    label: 'Poké Bowl Maguro',
    // Beilagen laut Kategorietext der Karte
    desc: 'Sushi-Reis · Thunfisch · Avocado · Gurke · Salat · Kräuter',
  },
  { id: 'knusprige-ente', href: '/menu#main' },
  { id: 'tuna-tataki', href: '/menu#vorspeisen' },
];

const TICKER = ['La Mien', 'Pho', 'Gyoza', 'Poké Bowl', 'Wok', 'Sushi', `seit ${BRAND.since}`];

const MOBILE_LINKS = [
  ['#philosophie', 'Haus'],
  ['/menu', 'Karte'],
  ['#raum', 'Restaurant'],
  ['#catering', 'Catering'],
  ['#reservieren', 'Reservieren'],
] as const;

export function HighClassHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

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
    <div ref={rootRef} className={`hc-page${menuOpen ? ' menu-open' : ''}`}>
      <a className="hc-skip-link" href="#main">
        Zum Inhalt springen
      </a>
      <div className="hc-noise" aria-hidden="true" />

      <header
        className={`hc-site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-header' : ''}`}
      >
        <div className="hc-nav-shell">
          <nav className="hc-split-nav hc-split-nav--left" aria-label="Hauptnavigation">
            <a href="#philosophie">Haus</a>
            <Link href="/menu">Karte</Link>
          </nav>

          <a className="hc-brand" href="#top" aria-label={`${BRAND.name} ${BRAND.place} – Startseite`}>
            <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} priority />
          </a>

          <nav className="hc-split-nav hc-split-nav--right" aria-label="Service">
            <a href="#catering">Catering</a>
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
          {MOBILE_LINKS.map(([href, label]) =>
            href.startsWith('/') ? (
              <Link key={href} href={href} onClick={closeMenu}>
                {label}
              </Link>
            ) : (
              <a key={href} href={href} onClick={closeMenu}>
                {label}
              </a>
            ),
          )}
        </nav>
        <div className="hc-mobile-meta">
          <span>
            {CONTACT.street}
            <br />
            {CONTACT.zip} {CONTACT.city}
          </span>
          <span>
            Mo–Fr 11–22
            <br />
            So 11–17
          </span>
        </div>
      </div>

      <main id="main">
        <section className="hc-hero hc-hero--tall" id="top">
          {/* native <picture> rather than next/image: the project exports statically with
              images.unoptimized, so next/image adds nothing here — and <source media> is
              the only way to hand phones a genuinely different crop instead of one file */}
          <div className="hc-hero-media" aria-hidden="true">
            <picture className="hc-hero-img hc-hero-img--ramen is-active">
              <source media="(max-width: 640px)" srcSet={HERO.tall} />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={HERO.wide} alt="" loading="eager" fetchPriority="high" />
            </picture>
          </div>

          <div className="hc-hero-shell">
            <h1 className="hc-hero-wordmark">
              <span>ra&rsquo;mien</span> <span>go</span>
            </h1>
            <p className="hc-hero-place">
              {BRAND.claim} · {BRAND.place} Wien
            </p>
          </div>

          <div className="hc-hero-badge">
            <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} />
            <span>
              {BRAND.place}
              <b>seit {BRAND.since}</b>
            </span>
          </div>

          <a className="hc-hero-scroll" href="#philosophie">
            <span>Entdecken</span>
            <i aria-hidden="true" />
          </a>
        </section>

        <div className="hc-ticker" aria-label="Kulinarisches Angebot">
          <div className="hc-ticker-track">
            {TICKER.map((item) => (
              <span className="hc-ticker-item" key={item}>
                {item}
              </span>
            ))}
            {TICKER.map((item) => (
              <span className="hc-ticker-item" aria-hidden="true" key={`copy-${item}`}>
                {item}
              </span>
            ))}
          </div>
        </div>

        <section className="hc-intro" id="philosophie">
          <div className="hc-section-mark hc-reveal">
            <span>01</span>
            <span>Das Haus</span>
          </div>
          <div className="hc-intro-copy hc-reveal">
            <p className="hc-eyebrow">Seit {BRAND.since} im DC Tower</p>
            <h2 className="hc-display">
              Eine Nudel, die erst <em>im Moment</em> entsteht.
            </h2>
            <div className="hc-intro-copy-bottom">
              <p>
                La Mien heißt: Teig aus Weizenmehl, à la minute zu fliegenden Nudeln gehobelt und
                direkt in die Brühe. Die zieht bei uns lange, aus Hühnerknochen, und kommt mit
                Pakchoi und Koriander an den Tisch. Daneben steht die vietnamesische Pho auf
                Reisbandnudeln — und der Fisch fürs Sushi wird täglich selbst ausgesucht und
                filetiert.
              </p>
              <div>
                <p>
                  Dazu Gyoza aus eigener Herstellung, Wok-Gerichte über hoher Flamme und Poké Bowls
                  auf Sushi-Reis. Von japanisch über vietnamesisch bis koreanisch inspiriert — im
                  Erdgeschoß eines Hochhauses, zwei Minuten von der U1.
                </p>
                <a className="hc-text-link" href="#raum">
                  Das Restaurant entdecken <span className="hc-arrow">→</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="hc-signature" id="signature">
          <div className="hc-signature-head hc-reveal">
            <p className="hc-eyebrow">Aus der Karte</p>
            <h2 className="hc-display">
              Vier, die das Haus <i>erklären.</i>
            </h2>
            <span className="hc-signature-count">
              {String(SIGNATURE.length).padStart(2, '0')} Gerichte
            </span>
          </div>

          <div className="hc-dish-list">
            {SIGNATURE.map((entry, index) => {
              const dish = DISHES.find((d) => d.id === entry.id);
              if (!dish) return null;
              const from = priceFrom(dish);
              return (
                <Link className="hc-dish hc-reveal" href={entry.href} key={dish.id}>
                  <span className="hc-dish-no">{String(index + 1).padStart(2, '0')}</span>
                  <span className="hc-dish-title">{entry.label ?? dish.name}</span>
                  <span className="hc-dish-desc">{entry.desc ?? dish.desc ?? dish.sub}</span>
                  <span className="hc-dish-price">
                    {dish.variants?.length ? 'ab ' : ''}
                    {from !== null ? `€ ${fmt(from)}` : ''}
                  </span>
                  {dish.img ? (
                    <span className="hc-dish-image">
                      <Image src={dish.img} alt={dish.name} fill sizes="390px" />
                    </span>
                  ) : null}
                </Link>
              );
            })}
          </div>

          <div className="hc-signature-foot hc-reveal">
            <p>
              Die ganze Karte umfasst Vorspeisen, Gyoza, Nudelsuppen, Wok- und Reisgerichte, Poké
              Bowls und Dessert — mit vegetarischen und veganen Gerichten in jeder Kategorie.
            </p>
            <Link className="hc-text-link" href="/menu">
              Die ganze Karte ansehen <span className="hc-arrow">→</span>
            </Link>
          </div>
        </section>

        <section className="hc-experience" id="raum">
          <div className="hc-experience-shell">
            <div className="hc-experience-media hc-reveal">
              <Image
                src="/foto/haus/saal-holzdecke.webp"
                alt="Gastraum mit heller Holzdecke und langen Tischreihen"
                fill
                sizes="(max-width: 980px) calc(100vw - 36px), 55vw"
              />
              <div className="hc-experience-caption">
                <small>{BRAND.place} · Erdgeschoß</small>
                <strong>Ein Raum für gute Runden.</strong>
              </div>
            </div>
            <div className="hc-experience-copy hc-reveal">
              <p className="hc-eyebrow">Der Raum</p>
              <h2 className="hc-display">
                Holz und Licht.<i>Zwei Ebenen.</i>
              </h2>
              <p>
                Eine Decke aus hellen Holzbalken, bodentiefe Fenster zur Donau City und eine rote
                Treppe, die nach oben führt. Unten der offene Gastraum mit Blick in die Küche, oben
                der Bereich für geschlossene Gesellschaften.
              </p>
              <div className="hc-facts" aria-label="Kapazitäten">
                {KAPAZITAET.map((k) => (
                  <div className="hc-fact" key={k.ort}>
                    <strong>{k.zahl}</strong>
                    <span>{k.ort}</span>
                  </div>
                ))}
              </div>
              <a className="hc-text-link" href="#reservieren">
                Einen Tisch sichern <span className="hc-arrow">→</span>
              </a>
            </div>
          </div>
        </section>

        <section className="hc-gallery" aria-label="Einblicke ins Haus">
          <GalleryImage
            image="/foto/leben/anstossen.webp"
            alt="Gäste stoßen am Tisch mit Bier und Limonade an"
            eyebrow="Am Tisch"
            title="Runden, die bleiben"
          />
          <GalleryImage
            image="/foto/haus/treppe-rot.webp"
            alt="Rote Treppe mit beleuchtetem go-Logo in den ersten Stock"
            eyebrow="Nach oben"
            title="Die rote Treppe"
          />
          <GalleryImage
            image="/foto/leben/neon-abend.webp"
            alt="Beleuchtetes go-Logo an der Glasfassade in der Abenddämmerung"
            eyebrow="Am Abend"
            title="Rot an der Fassade"
          />
        </section>

        <section className="hc-catering" id="catering">
          <div className="hc-catering-head hc-reveal">
            <div className="hc-section-mark">
              <span>02</span>
              <span>Catering &amp; Events</span>
            </div>
            <h2 className="hc-display">
              Auch dort, wo <i>ihr seid.</i>
            </h2>
            <p>
              Wir kochen für Firmenfeiern, Geburtstage und Hochzeiten — im Haus, im Büro oder an
              eurem Lieblingsort.
            </p>
          </div>

          <div className="hc-catering-list">
            {CATERING.map((item) => (
              <article className="hc-catering-item hc-reveal" key={item.id}>
                <div className="hc-catering-media">
                  <Image
                    src={item.img}
                    alt=""
                    fill
                    sizes="(max-width: 980px) calc(100vw - 36px), 30vw"
                  />
                </div>
                <span className="hc-catering-no">{item.kicker}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>

          <div className="hc-catering-foot hc-reveal">
            <p>
              Im ersten Stock bieten wir Platz für bis zu {KAPAZITAET[0].zahl} Personen in
              geschlossener Gesellschaft, im Erdgeschoss finden bis zu {KAPAZITAET[1].zahl} Personen
              Platz. Für das Mittagessen mit dem Team nehmen wir Firmenreservierungen für bis zu{' '}
              {KAPAZITAET[2].zahl} Personen an.
            </p>
            <a
              className="hc-button-dark"
              href={`mailto:${CONTACT.email}?subject=Catering-Anfrage`}
            >
              Catering anfragen <span>↗</span>
            </a>
          </div>
        </section>

        <section className="hc-reserve" id="reservieren">
          <div className="hc-reserve-shell">
            <div className="hc-reserve-aside hc-reveal">
              <p className="hc-eyebrow">Dein Tisch</p>
              <p>
                Für Gruppen, Business Lunches und private Anlässe steht der erste Stock als
                geschlossene Gesellschaft zur Verfügung.
              </p>
            </div>
            <div className="hc-reserve-main hc-reveal">
              <h2 className="hc-display">
                Wir sehen uns<i>im go.</i>
              </h2>
              <div className="hc-reserve-actions">
                <a
                  className="hc-button-dark"
                  href={`mailto:${CONTACT.email}?subject=Tischreservierung`}
                >
                  Tisch reservieren <span>↗</span>
                </a>
                <span className="hc-reserve-note">
                  Oder telefonisch
                  <br />
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </span>
              </div>
            </div>
          </div>
        </section>

        <section className="hc-location" id="kontakt">
          <div className="hc-location-shell">
            <div className="hc-location-top">
              <div className="hc-reveal">
                <p className="hc-eyebrow">So findet ihr uns</p>
                <h2 className="hc-display">
                  Donau City,
                  <br />
                  <i>Erdgeschoß.</i>
                </h2>
                <ul className="hc-anfahrt">
                  {ANFAHRT.map((a) => (
                    <li key={a.label}>
                      <small>{a.label}</small>
                      <span>{a.text}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="hc-address hc-reveal">
                <div className="hc-address-block">
                  <small>Adresse</small>
                  <p>
                    {BRAND.place} · {CONTACT.street}
                    <br />
                    {CONTACT.zip} {CONTACT.city}
                  </p>
                </div>
                <div className="hc-address-block">
                  <small>Öffnungszeiten</small>
                  <table className="hc-hours">
                    <tbody>
                      {HOURS.map((h) => (
                        <tr key={h.days} className={h.closed ? 'is-closed' : undefined}>
                          <th scope="row">{h.days}</th>
                          <td>
                            {h.time}
                            {h.note ? <em>{h.note}</em> : null}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="hc-address-block">
                  <small>Kontakt</small>
                  <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                  <br />
                  <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
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
              <span>
                © {new Date().getFullYear()} {BRAND.name} {BRAND.place}
              </span>
              <Image
                className="hc-footer-logo"
                src="/go-dc-tower-logo.png"
                alt={`${BRAND.name} ${BRAND.place}`}
                width={706}
                height={706}
              />
              <span className="hc-footer-links">
                <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
                <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">
                  Facebook
                </a>
                <Link href="/impressum">Impressum</Link>
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
