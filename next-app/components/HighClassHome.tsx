'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  ANFAHRT_VIDEOS, BRAND, CATERING, CONTACT, HOURS, KAPAZITAET, MENU_CARDS, SOCIAL,
} from '@/components/site-data';
import { DISHES, dishesOf, fmt, priceFrom, type CategoryId } from '@/components/menu-data';
import { useScrollMotion } from '@/components/useScrollMotion';
import { GlfButton } from '@/components/GloriaFood';
import { SiteHeader } from '@/components/SiteHeader';

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

const BUSINESS = CATERING.find((item) => item.id === 'business')!;


function inquiry(subject: string, body?: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}

/** Business Lunch: drei Wege, je mit Bild, Satz und passendem Button. */
const LUNCH_TABS = [
  { id: 'tisch', label: 'Am Tisch', img: '/foto/leben/tafel-haende.webp', alt: 'Ein Team teilt sich viele asiatische Gerichte an einem Holztisch' },
  { id: 'mitnehmen', label: 'Zum Mitnehmen', img: '/foto/leben/sackerl-tower.webp', alt: 'Gast mit einer ra’mien-go-Tragetasche vor dem DC Tower' },
  { id: 'buero', label: 'Ins Büro', img: '/foto/leben/tafel-oben.webp', alt: 'Gedeckte Tafel mit Gyoza, Curry und Tofu von oben' },
] as const;

/**
 * Reiter über einem großen Bild. Alle Panels bleiben im DOM (nur `hidden`),
 * damit das GloriaFood-Widget sich auch an die Knöpfe in verdeckten Panels hängt.
 */
function LunchTabs() {
  const [active, setActive] = useState(0);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + LUNCH_TABS.length) % LUNCH_TABS.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="hx-shell hx-lunch" data-reveal="fade">
      <div className="hx-lunch-tabs" role="tablist" aria-label="Business Lunch" onKeyDown={onKey}>
        {LUNCH_TABS.map((tab, i) => (
          <button key={tab.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`lunch-tab-${tab.id}`}
            aria-selected={i === active} aria-controls={`lunch-panel-${tab.id}`} tabIndex={i === active ? 0 : -1}
            onClick={() => setActive(i)}>
            {tab.label}
          </button>
        ))}
      </div>
      <div className="hx-lunch-stage">
        <div className="hx-lunch-photo">
          {LUNCH_TABS.map((tab, i) => (
            <Image key={tab.id} src={tab.img} alt={tab.alt} fill sizes="(max-width: 900px) calc(100vw - 40px), 60vw" className={i === active ? 'is-active' : undefined} aria-hidden={i !== active} />
          ))}
        </div>
        <div className="hx-lunch-copy">
          <div role="tabpanel" id="lunch-panel-tisch" aria-labelledby="lunch-tab-tisch" hidden={active !== 0}>
            <h3>Team-Lunch für bis zu {KAPAZITAET.firma.personen} Personen.</h3>
            <p>Für ein gemeinsames Mittagessen mit eurem Team nehmen wir gerne Firmenreservierungen für bis zu {KAPAZITAET.firma.personen} Personen an.</p>
            <div className="hx-lunch-actions">
              <a className="hx-btn hx-btn--solid" href={inquiry('Firmenreservierung', 'Hallo liebes go-Team,\n\nwir möchten für unser Team reservieren:\nFirma: \nDatum: \nUhrzeit: \nPersonenanzahl: \n\nName und Telefonnummer: ')}>Firmenreservierung anfragen</a>
              <GlfButton kind="reservation" className="hx-link">Tisch reservieren <span aria-hidden="true">↗</span></GlfButton>
            </div>
          </div>
          <div role="tabpanel" id="lunch-panel-mitnehmen" aria-labelledby="lunch-tab-mitnehmen" hidden={active !== 1}>
            <h3>Online bestellen, im Erdgeschoss abholen.</h3>
            <p>Bestell vom Schreibtisch aus und hol dein Essen bei uns im Erdgeschoss des DC Tower ab.</p>
            <div className="hx-lunch-actions">
              <GlfButton kind="order" className="hx-btn hx-btn--solid">Online bestellen</GlfButton>
            </div>
          </div>
          <div role="tabpanel" id="lunch-panel-buero" aria-labelledby="lunch-tab-buero" hidden={active !== 2}>
            <h3>Business Lunch, frisch ins Büro.</h3>
            <p>{BUSINESS.short} Ohne Service-Personal vor Ort.</p>
            <div className="hx-lunch-actions">
              <Link className="hx-btn hx-btn--solid" href={`/catering/?angebot=${BUSINESS.id}#anfrage`}>{BUSINESS.action}</Link>
              <a className="hx-link" href="#catering">Alle Catering-Angebote <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Die zwei Etagen; auf dem Desktop bleibt der Block stehen und wechselt beim Scrollen. */
const FLOORS = [
  { label: 'Erdgeschoss', plaetze: KAPAZITAET.erdgeschoss.plaetze, text: `Unter der Holzdecke, mit Blick in die offene Küche. Für Teamlunch und Gruppen bis ${KAPAZITAET.erdgeschoss.gruppe} Personen.`, img: '/foto/haus/obergeschoss.webp', alt: 'Gastraum im Erdgeschoss mit Holzdecke und offener Küche' },
  { label: 'Obergeschoss', plaetze: KAPAZITAET.obergeschoss.plaetze, text: 'Ein Stock höher und etwas ruhiger. Ideal für Teamrunden und Geschäftsessen unter euch.', img: '/foto/haus/saal-lang.webp', alt: 'Langer, ruhiger Gastraum im Obergeschoss mit gedeckten Tischen' },
] as const;

function FloorsScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)');
    let frame = 0;
    const update = () => {
      frame = 0;
      const track = trackRef.current;
      if (!track) return;
      const rect = track.getBoundingClientRect();
      const progress = Math.max(0, Math.min(1, -rect.top / Math.max(1, rect.height - window.innerHeight)));
      setActive(Math.min(FLOORS.length - 1, Math.floor(progress * FLOORS.length)));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    const sync = () => {
      setSticky(query.matches);
      window.removeEventListener('scroll', onScroll);
      if (query.matches) { window.addEventListener('scroll', onScroll, { passive: true }); update(); }
    };
    sync();
    query.addEventListener('change', sync);
    return () => {
      query.removeEventListener('change', sync);
      window.removeEventListener('scroll', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div className="hx-floors-track" ref={trackRef}>
      <div className="hx-shell hx-floors-sticky">
        <p className="hx-floors-head">Der Raum</p>
        <div className="hx-floors-stage">
          {FLOORS.map((floor, i) => (
            <article key={floor.label} className={`hx-floor${i === active ? ' is-active' : ''}`} aria-hidden={sticky && i !== active ? true : undefined}>
              <div className="hx-floor-copy">
                <small>{floor.label}</small>
                <p className="hx-floor-number"><b>{floor.plaetze}</b><span>Sitzplätze</span></p>
                <p>{floor.text}</p>
                <div className="hx-floor-progress" aria-hidden="true">
                  {FLOORS.map((f, j) => <span key={f.label} className={j === i ? 'is-on' : undefined} />)}
                </div>
              </div>
              <div className="hx-floor-photo"><Image src={floor.img} alt={floor.alt} fill sizes="(max-width: 900px) calc(100vw - 40px), 60vw" /></div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}

/**
 * Wegvideo im Handy-Format. Auf dem Desktop läuft es stumm, sobald es sichtbar ist; auf dem
 * Handy und bei „Bewegung reduzieren“ startet es erst auf Tipp (die Datei ist groß).
 */
function ArrivalVideo({ src, poster, title, text }: { src: string; poster?: string; title: string; text: string }) {
  const ref = useRef<HTMLVideoElement>(null);
  const [auto, setAuto] = useState(false);
  const [muted, setMuted] = useState(true);

  useEffect(() => {
    const video = ref.current;
    if (!video || !window.matchMedia('(min-width: 901px) and (prefers-reduced-motion: no-preference)').matches) return;
    setAuto(true);
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) video.play().catch(() => {});
      else video.pause();
    }, { threshold: 0.5 });
    observer.observe(video);
    return () => observer.disconnect();
  }, []);

  return (
    <figure className="hx-arrival-video" data-reveal="fade">
      <div className="hx-arrival-frame">
        <video ref={ref} src={src} poster={poster} muted={muted} loop playsInline preload="none" controls={!auto} aria-label={title} />
        {auto && (
          <button type="button" className="hx-arrival-sound" aria-pressed={!muted} onClick={() => setMuted((m) => !m)}>
            {muted ? 'Ton an' : 'Ton aus'}
          </button>
        )}
      </div>
      <figcaption><strong>{title}</strong>{text}</figcaption>
    </figure>
  );
}

export function HighClassHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  useScrollMotion(rootRef);

  useEffect(() => {
    const onScroll = () => {
      const actions = rootRef.current?.querySelector('.hc-hero-actions');
      setShowQuickActions(Boolean(actions && actions.getBoundingClientRect().bottom < 68));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

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
    <div ref={rootRef} className="hc-page">
      <a className="hc-skip-link" href="#main">Zum Inhalt springen</a>
      <div className="hc-noise" aria-hidden="true" />

      <SiteHeader home onMenuChange={setMenuOpen} />

      <main id="main">
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
              <Link className="hx-btn hx-btn--line" href="/catering#anfrage">Catering anfragen</Link>
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
            <nav className="hx-menu-cards" aria-label="Unsere Karten" data-reveal="fade">
              {MENU_CARDS.map((card) => (
                <Link key={card.id} href={card.href}>
                  <strong>{card.title} <span aria-hidden="true">↗</span></strong>
                  <span>{card.times.join(' · ')}</span>
                </Link>
              ))}
            </nav>
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
          <figure className="hx-room-hero" id="firmen">
            <div className="hx-parallax" data-parallax="0.35" data-parallax-max="160">
              <Image src="/foto/haus/saal-holzdecke.webp" alt="Heller Gastraum mit Holzdecke, gedeckten Tischen und offener Küche" fill sizes="100vw" />
            </div>
            <figcaption className="hx-shell">
              <p className="hc-eyebrow">Business Lunch · Mo–Fr ab 11 Uhr</p>
              <Lines id="room-title" className="hx-title hx-title--on-photo" lines={['Lunch im DC Tower.', 'Für dich und dein Team.']} />
            </figcaption>
          </figure>
          <LunchTabs />
          <FloorsScroll />
          <div className="hx-shell hx-arrival">
            {ANFAHRT_VIDEOS.filter((video) => video.src).slice(0, 1).map((video) => (
              <ArrivalVideo key={video.title} src={video.src!} poster={video.poster} title={video.title} text={video.text} />
            ))}
            <div className="hx-arrival-route" data-reveal="fade">
              <h3>So kommst du zu uns.</h3>
              <ol className="hx-arrival-steps">
                <li><span>01</span><div><strong>U1 bis Kaisermühlen · VIC</strong><p>Oder ab Donauinsel – von dort rund fünf Minuten zu Fuß, das Video zeigt dir den Weg.</p></div></li>
                <li><span>02</span><div><strong>Zwei Minuten zu Fuß</strong><p>Vom Ausgang Kaisermühlen · VIC sind es zwei Gehminuten bis zum DC Tower.</p></div></li>
                <li><span>03</span><div><strong>Erdgeschoss DC Tower</strong><p>{CONTACT.street}, {CONTACT.zip} {CONTACT.city} – durch die Glastür, und du bist da.</p></div></li>
              </ol>
              <div className="hx-arrival-park">
                <b aria-hidden="true">P</b>
                <p><strong>Mit dem Auto</strong>Parken in der DC Tower Garage. Lass dein Parkticket bei uns abstempeln und parke für 1 € pro Stunde.</p>
              </div>
              <a className="hx-btn hx-btn--solid" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Route planen <span aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="hx-catering" id="catering" aria-labelledby="catering-title">
          <figure className="hx-room-hero hx-catering-hero">
            <div className="hx-parallax" data-parallax="0.35" data-parallax-max="160">
              <Image src="/foto/leben/anstossen.webp" alt="Gäste stoßen am gedeckten Tisch mit Drinks und Bier an" fill sizes="100vw" />
            </div>
            <figcaption className="hx-shell">
              <p className="hc-eyebrow">Catering &amp; Events</p>
              <Lines id="catering-title" className="hx-title hx-title--on-photo" lines={['Mehr Leute.', 'Mehr zu teilen.']} />
            </figcaption>
          </figure>
          <div className="hx-shell hx-catering-list">
            {CATERING.map((item, i) => (
              <Link key={item.id} id={`angebot-${item.id}`} className="hx-catering-card" href={`/catering/?angebot=${item.id}#anfrage`} data-reveal="rise" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="hx-catering-photo"><span className="hx-parallax" data-parallax="0.06"><Image src={item.img} alt={item.alt} fill sizes="(max-width: 900px) calc(100vw - 40px), 31vw" /></span></span>
                <strong>{item.title}</strong>
                <span className="hx-catering-short">{item.short}</span>
                <span className="hx-btn hx-btn--line hx-btn--sm">{item.action}</span>
              </Link>
            ))}
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
