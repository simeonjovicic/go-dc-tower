'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent } from 'react';
import {
  ANFAHRT_VIDEOS, BRAND, CATERING, CONTACT, HOURS, KAPAZITAET, SOCIAL,
} from '@/components/site-data';
import { DISHES, dishesOf, fmt, priceFrom, type CategoryId } from '@/components/menu-data';
import { useScrollMotion } from '@/components/useScrollMotion';
import { GlfButton } from '@/components/GloriaFood';

/** Eine Auswahl, kein Katalog: die Bildreihe gleitet beim Scrollen seitwärts. */
const REEL: { name: string; cat: CategoryId; dish?: string; img: string; alt: string }[] = [
  { name: 'La Mien', cat: 'nudelsuppen', dish: 'lamien', img: '/foto/gericht-enhanced/lamien-rind.webp', alt: 'La Mien mit Rind' },
  { name: 'Gyoza', cat: 'gyoza', img: '/foto/shooting-2021-09/gyoza1.webp', alt: 'Hausgemachte Gyoza' },
  { name: 'Poké Maguro', cat: 'poke', dish: 'poke-maguro', img: '/foto/gericht-enhanced/poke-maguro.webp', alt: 'Poké Bowl mit Thunfisch' },
  { name: 'Knusprige Ente', cat: 'main', dish: 'knusprige-ente', img: '/foto/gericht-enhanced/knusprige-ente.webp', alt: 'Knusprige Ente mit Gemüse' },
  { name: 'Tuna-Tataki', cat: 'vorspeisen', dish: 'tuna-tataki', img: '/foto/gericht-enhanced/tuna-tataki.webp', alt: 'Tuna-Tataki' },
  { name: 'Xiao Long Bao', cat: 'vorspeisen', dish: 'xiao-long-bao', img: '/foto/gericht-enhanced/xiao-long-bao.webp', alt: 'Xiao Long Bao' },
  { name: 'Sushi', cat: 'sushi', img: '/foto/sushi/sushi-maki.webp', alt: 'Maki-Auswahl' },
];

const reelPrice = (item: (typeof REEL)[number]) => {
  const dishes = item.dish ? DISHES.filter((d) => d.id === item.dish) : dishesOf(item.cat);
  const min = Math.min(...dishes.map((d) => priceFrom(d) ?? Infinity));
  return Number.isFinite(min) ? `ab € ${fmt(min)}` : 'nach Tagesangebot';
};

/** Überschrift, deren Zeilen beim Scrollen nacheinander aus einer Maske gleiten. */
function Lines({ lines, as: Tag = 'h2', className, id }: { lines: string[]; as?: 'h2' | 'h3'; className?: string; id?: string }) {
  return (
    <Tag id={id} className={className} data-reveal="lines">
      {lines.map((line, i) => (
        <span className="hx-line" key={line}><span style={{ transitionDelay: `${i * 90}ms` }}>{line}</span></span>
      ))}
    </Tag>
  );
}

const MOBILE_LINKS = [
  ['/menu', 'Speisekarte'], ['#raum', 'Restaurant'], ['#reservieren', 'Tisch anfragen'],
  ['#catering', 'Feiern & Catering'], ['#newsletter', 'Newsletter'], ['#kontakt', 'Anfahrt & Zeiten'],
] as const;

function inquiry(subject: string, body?: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}

// TODO: an einen Newsletter-Anbieter (Brevo/Mailchimp) anbinden; bis dahin geht die Anmeldung per E-Mail ans Haus.
function subscribe(event: FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const email = new FormData(event.currentTarget).get('email');
  window.location.href = inquiry('Newsletter-Anmeldung',
    `Hallo liebes go-Team,\n\nbitte nehmt mich in euren Newsletter auf: ${email}\n\nIch bin mit dem Erhalt einverstanden und kann mich jederzeit wieder abmelden.`);
}

export function HighClassHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  useScrollMotion(rootRef);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      const actions = rootRef.current?.querySelector('.hc-hero-actions');
      setShowQuickActions(Boolean(actions && actions.getBoundingClientRect().bottom < 68));
    };
    const onResize = () => { if (window.innerWidth > 980) setMenuOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Keep focus on the disclosure button; Tab enters the navigation.
    const onKeyDown = (event: globalThis.KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const links = mobilePanelRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        const first = links?.[0];
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuButtonRef.current) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); menuButtonRef.current?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen]);

  useEffect(() => {
    // Desktop: die Bildreihe gleitet seitwärts, während die Sektion durchs Bild scrollt.
    // Handy: normale Wischreihe, ohne Eingriff.
    const section = rootRef.current?.querySelector<HTMLElement>('.hx-reel');
    const track = section?.querySelector<HTMLElement>('.hx-reel-track');
    if (!section || !track) return;
    const wide = window.matchMedia('(min-width: 901px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    let frame = 0;
    const update = () => {
      frame = 0;
      if (!wide.matches || calm.matches) { track.style.transform = ''; return; }
      const rect = section.getBoundingClientRect();
      const progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      const distance = Math.max(0, track.scrollWidth - track.clientWidth);
      track.style.transform = `translate3d(${(-distance * progress).toFixed(1)}px, 0, 0)`;
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div ref={rootRef} className={`hc-page${menuOpen ? ' menu-open' : ''}`}>
      <a className="hc-skip-link" href="#main">Zum Inhalt springen</a>
      <div className="hc-noise" aria-hidden="true" />

      <header className={`hc-site-header${scrolled ? ' is-scrolled' : ''}${menuOpen ? ' menu-header' : ''}`}>
        <div className="hc-nav-shell">
          <nav className="hc-split-nav hc-split-nav--left" aria-label="Hauptnavigation" inert={menuOpen}>
            <Link href="/menu">Speisekarte</Link><a href="#raum">Restaurant</a>
          </nav>
          <a className="hc-brand" href="#top" inert={menuOpen} aria-label={`${BRAND.name} ${BRAND.place} – Startseite`}>
            <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} priority />
          </a>
          <nav className="hc-split-nav hc-split-nav--right" aria-label="Service" inert={menuOpen}>
            <a href="#catering">Feiern &amp; Catering</a>
            <GlfButton kind="reservation" className="hx-btn hx-btn--line hx-btn--sm">Tisch reservieren</GlfButton>
          </nav>
          <button ref={menuButtonRef} className="hc-menu-button" type="button"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen}
            aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </header>

      <div ref={mobilePanelRef} id="mobile-navigation" className="hc-mobile-panel" inert={!menuOpen} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile Navigation">
          {MOBILE_LINKS.map(([href, label]) => href.startsWith('/') ? (
            <Link key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</Link>
          ) : <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>)}
        </nav>
        <div className="hc-mobile-meta">
          <span>{CONTACT.street}<br />{CONTACT.zip} {CONTACT.city}</span>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </div>
      </div>

      <main id="main" inert={menuOpen}>
        <section className="hc-hero" id="top" aria-label="Willkommen im ra’mien go DC Tower">
          <div className="hc-hero-media" aria-hidden="true">
            <picture>
              <source media="(max-width: 640px)" srcSet="/hero-ramen-dark-tall.jpg" />
              {/* The portrait photograph preserves the composition on phones. */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src="/hero-ramen-dark.jpg" alt="" loading="eager" fetchPriority="high" />
            </picture>
          </div>
          <span className="hc-hero-glyph" lang="zh" aria-hidden="true">面</span>
          <div className="hc-hero-shell">
            <p className="hc-hero-place">Asian Fusion · DC Tower · Wien</p>
            <h1 className="hc-hero-wordmark"><span>ra&rsquo;mien</span><span>go</span></h1>
            <div className="hc-hero-actions">
              <GlfButton kind="reservation" className="hx-btn hx-btn--solid">Tisch reservieren</GlfButton>
              <Link className="hx-btn hx-btn--line" href="/menu">Speisekarte</Link>
            </div>
          </div>
          <div className="hc-hero-bottom">
            <span>Im Erdgeschoß. Seit {BRAND.since}.</span>
            <a href="#signature">Appetit holen <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <nav className="hc-visit-strip" aria-label="Dein Besuch auf einen Blick">
          <a href="#kontakt"><small>Hier sind wir</small><span>Donau City · 2 Min. von der U1</span></a>
          <a href="#kontakt"><small>Öffnungszeiten</small><span>Mo–Fr 11–22 · So 11–17</span></a>
          <GlfButton kind="order"><small>Lieber mitnehmen?</small><span>Online bestellen</span></GlfButton>
        </nav>

        {/* Philosophie: Text kommt von Lee, bis dahin bleibt die Begrüßung. */}
        <section className="hx-welcome" id="philosophie" aria-labelledby="welcome-title">
          <div className="hx-shell">
            <Lines id="welcome-title" className="hx-title hx-title--statement" lines={['Mitten in Wien.', 'Ein Stück Asien.']} />
            <p data-reveal="fade">La Mien, frisch gehobelt und direkt in die Brühe. Hausgemachte Gyoza zum Teilen.
              Sushi, Wok und bunte Bowls. Komm auf dein Lieblingsgericht vorbei — oder finde ein neues.</p>
          </div>
        </section>

        <section className="hx-reel" id="signature" aria-labelledby="menu-title">
          <div className="hx-shell hx-reel-head">
            <Lines id="menu-title" className="hx-title" lines={['Worauf hast du Lust?']} />
            <p data-reveal="fade">Lunch Mo–Fr 11–17 · Abendkarte ab 17 Uhr · Sonntag 11–17</p>
          </div>
          <div className="hx-reel-window">
            <ul className="hx-reel-track">
              {REEL.map((item) => (
                <li key={item.name}>
                  <Link href={`/menu#${item.cat}`} aria-label={`${item.name}, ${reelPrice(item)}, in der Speisekarte ansehen`}>
                    <span className="hx-reel-photo"><Image src={item.img} alt={item.alt} fill sizes="(max-width: 900px) 72vw, 26vw" /></span>
                    <span className="hx-reel-name">{item.name}</span>
                    <span className="hx-reel-price">{reelPrice(item)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hx-shell hx-reel-actions" data-reveal="fade">
            <Link className="hx-btn hx-btn--solid" href="/menu">Zur Speisekarte</Link>
            <GlfButton kind="order" className="hx-btn hx-btn--line">Online bestellen</GlfButton>
          </div>
        </section>

        <section className="hx-room" id="raum" aria-labelledby="room-title">
          <figure className="hx-room-hero">
            <div className="hx-parallax" data-parallax="0.12">
              <Image src="/foto/haus/saal-holzdecke.webp" alt="Heller Gastraum mit Holzdecke, gedeckten Tischen und offener Küche" fill sizes="100vw" />
            </div>
            <figcaption className="hx-shell">
              <Lines id="room-title" className="hx-title hx-title--on-photo" lines={['Kurz raus.', 'Gerne länger bleiben.']} />
            </figcaption>
          </figure>
          <div className="hx-shell hx-room-intro">
            <p data-reveal="fade">Durch die Glastür, unter die Holzdecke, an deinen Tisch. Bei uns sitzt du mitten
              in der Donau City — und bist für eine Weile ganz woanders.</p>
            <div className="hx-moments" data-reveal="fade">
              <div><h3>Mittags eine gute Pause.</h3><p>Mit den Kollegen an den Tisch oder dein Lieblingsgericht mitnehmen. Unter der Woche ab 11 Uhr.</p></div>
              <div><h3>Abends zusammenkommen.</h3><p>Vorspeisen teilen, etwas Neues probieren und noch auf ein Getränk bleiben. Mo–Fr bis 22 Uhr, Küche bis 21 Uhr.</p></div>
            </div>
          </div>
          <div className="hx-shell hx-floors">
            <article>
              <div className="hx-floor-photo" data-reveal="curtain"><Image src="/foto/haus/saal-lang.webp" alt="Langer Gastraum im Erdgeschoss mit gedeckten Tischen" fill sizes="(max-width: 760px) calc(100vw - 40px), 44vw" /></div>
              <p className="hx-floor-figure"><b>{KAPAZITAET.erdgeschoss.plaetze}</b><span>Sitzplätze im Erdgeschoss</span></p>
              <p>Unter der Holzdecke, mit Blick in die offene Küche. Für Gruppen bis {KAPAZITAET.erdgeschoss.gruppe} Personen.</p>
            </article>
            <article>
              <div className="hx-floor-photo" data-reveal="curtain"><Image src="/foto/haus/obergeschoss.webp" alt="Gedeckte Tische im Obergeschoss des Restaurants" fill sizes="(max-width: 760px) calc(100vw - 40px), 44vw" /></div>
              <p className="hx-floor-figure"><b>{KAPAZITAET.obergeschoss.plaetze}</b><span>Sitzplätze im Obergeschoss</span></p>
              <p>Ein Stock höher und etwas ruhiger. Ideal, wenn ihr als Runde unter euch sein wollt.</p>
            </article>
          </div>
          <div className="hx-shell hx-company" data-reveal="fade">
            <h3>Mittagessen mit dem ganzen Team</h3>
            <p>Für ein gemeinsames Mittagessen mit eurem Team nehmen wir gerne Firmenreservierungen für bis zu {KAPAZITAET.firma.personen} Personen an.</p>
            <a className="hx-btn hx-btn--line hx-btn--sm" href={inquiry('Firmenreservierung', 'Hallo liebes go-Team,\n\nwir möchten für unser Team reservieren:\nFirma: \nDatum: \nUhrzeit: \nPersonenanzahl: \n\nName und Telefonnummer: ')}>
              Firmenreservierung anfragen
            </a>
          </div>
          <div className="hx-shell hx-arrival">
            <div className="hx-arrival-copy" data-reveal="fade">
              <h3>So kommst du zu uns</h3>
              <dl>
                <div><dt>Parken</dt><dd>Parken in der DC Tower Garage. Lass dein Parkticket bei uns abstempeln und parke für 1 € pro Stunde.</dd></div>
                <div><dt>U-Bahn</dt><dd>Mit der U1 bis Kaisermühlen · VIC, von dort sind es zwei Gehminuten. Oder ab Donauinsel in rund fünf Minuten – das Video zeigt dir den Weg.</dd></div>
              </dl>
            </div>
            <div className="hx-arrival-videos">
              {ANFAHRT_VIDEOS.map((video) => (
                <figure key={video.title} data-reveal="curtain">
                  {video.src ? (
                    <video src={video.src} poster={video.poster} controls preload="none" playsInline aria-label={video.title} />
                  ) : (
                    <div className="hx-video-placeholder" role="img" aria-label={`Video folgt: ${video.title}`}><span>Video folgt</span></div>
                  )}
                  <figcaption><strong>{video.title}</strong>{video.text}</figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>

        <section className="hx-reserve" id="reservieren" aria-labelledby="reserve-title">
          <div className="hx-shell hx-reserve-shell">
            <Lines id="reserve-title" className="hx-title hx-title--reserve" lines={['Wir sehen uns', 'im go.']} />
            <div className="hx-reserve-contact" data-reveal="fade">
              <p>Zu zweit, mit Freunden oder dem ganzen Team.</p>
              <div className="hx-actions">
                <GlfButton kind="reservation" className="hx-btn hx-btn--ink">Tisch reservieren</GlfButton>
                <a className="hx-btn hx-btn--line-light" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="hx-catering" id="catering" aria-labelledby="catering-title">
          <div className="hx-shell hx-catering-head">
            <Lines id="catering-title" className="hx-title" lines={['Mehr Leute.', 'Mehr zu teilen.']} />
            <p data-reveal="fade">Bei uns, bei euch im Büro oder an eurem Lieblingsort.</p>
          </div>
          <div className="hx-shell hx-catering-list">
            {CATERING.map((item, i) => (
              <Link key={item.id} className="hx-catering-card" href={`/catering/?angebot=${item.id}#anfrage`} data-reveal="rise" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="hx-catering-photo"><span className="hx-parallax" data-parallax="0.06"><Image src={item.img} alt={item.alt} fill sizes="(max-width: 900px) calc(100vw - 40px), 31vw" /></span></span>
                <strong>{item.title}</strong>
                <span className="hx-catering-short">{item.short}</span>
                <span className="hx-btn hx-btn--line hx-btn--sm">{item.action}</span>
              </Link>
            ))}
          </div>
        </section>

        <section className="hx-newsletter" id="newsletter" aria-labelledby="newsletter-heading">
          <form className="hx-shell hx-newsletter-shell" onSubmit={subscribe} data-reveal="fade">
            <h2 id="newsletter-heading" className="hx-title hx-title--small">Neues aus dem go.</h2>
            <div className="hx-newsletter-fields">
              <div className="hx-newsletter-row">
                <label className="hc-visually-hidden" htmlFor="newsletter-email">E-Mail-Adresse</label>
                <input id="newsletter-email" name="email" type="email" required autoComplete="email" placeholder="deine@email.at" />
                <button className="hx-btn hx-btn--solid" type="submit">Anmelden</button>
              </div>
              <label className="hx-consent">
                <input type="checkbox" name="consent" required />
                <span>Ich möchte den Newsletter erhalten und kann mich jederzeit abmelden.</span>
              </label>
            </div>
          </form>
        </section>

        <section className="hc-location hx-location" id="kontakt" aria-labelledby="contact-title">
          <div className="hc-location-shell">
            <div className="hx-contact">
              <div>
                <Lines id="contact-title" className="hx-title" lines={['Hoher Tower.', 'Ganz unten bei uns.']} />
                <p className="hx-contact-address" data-reveal="fade">{CONTACT.street}, {CONTACT.zip} {CONTACT.city}<br />Erdgeschoß DC Tower · U1 Kaisermühlen</p>
                <div className="hx-actions" data-reveal="fade">
                  <a className="hx-btn hx-btn--line hx-btn--sm" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Route planen</a>
                  <a className="hx-btn hx-btn--line hx-btn--sm" href={CONTACT.phoneHref}>{CONTACT.phone}</a>
                </div>
              </div>
              <table className="hx-hours" data-reveal="stagger"><tbody>{HOURS.map((hour) => (
                <tr key={hour.days} className={hour.closed ? 'is-closed' : undefined}><th scope="row">{hour.days}</th><td>{hour.time}</td></tr>
              ))}</tbody></table>
            </div>
            <footer className="hc-footer">
              <span>© {new Date().getFullYear()} {BRAND.name} {BRAND.place}</span>
              <Image className="hc-footer-logo" src="/go-dc-tower-logo.png" alt={`${BRAND.name} ${BRAND.place}`} width={706} height={706} />
              <span className="hc-footer-links"><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook</a><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></span>
            </footer>
          </div>
        </section>
      </main>
      <nav className={`hc-mobile-actions${showQuickActions && !menuOpen ? ' is-visible' : ''}`} aria-label="Schnellzugriff" inert={!showQuickActions || menuOpen}>
        <Link className="hx-btn hx-btn--line" href="/menu">Speisekarte</Link><GlfButton kind="reservation" className="hx-btn hx-btn--solid">Reservieren</GlfButton>
      </nav>
    </div>
  );
}
