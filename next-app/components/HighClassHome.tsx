'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import {
  ANFAHRT_VIDEOS, ARROW_NE, BRAND, CATERING, CONTACT, HOURS, KAPAZITAET, MENU_CARDS, SOCIAL,
} from '@/components/site-data';
import { DISHES, dishesOf, fmt, priceFrom, type CategoryId } from '@/components/menu-data';
import { onScrollFrame, requestScrollFrame, useScrollMotion } from '@/components/useScrollMotion';
import { GlfButton } from '@/components/GloriaFood';
import { SiteHeader } from '@/components/SiteHeader';
import { Icon } from '@/components/Icon';
import { MadeBy } from '@/components/HcChrome';

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

/** Die drei Gerichte aus der Begrüßung, als Fotos im Vorhang. */
/** Business Lunch: drei Wege, je mit Bild, Satz und passendem Button. */
const LUNCH_TABS = [
  { id: 'tisch', label: 'Am Tisch', img: '/foto/leben/tafel-haende.webp', alt: 'Ein Team teilt sich viele asiatische Gerichte an einem Holztisch' },
  { id: 'mitnehmen', label: 'Zum Mitnehmen', img: '/foto/leben/sackerl-tower.webp', alt: 'Gast mit einer ra’mien-go-Tragetasche vor dem DC Tower' },
  { id: 'buero', label: 'Ins Büro', img: '/foto/shooting-2022-03/4rr4bfdcvypro5kix3nt.webp', alt: 'Sushi mit Stäbchen am gedeckten Tisch im ra’mien go' },
] as const;

/**
 * Reiter über einem großen Bild. Alle Panels bleiben im DOM (nur `hidden`),
 * damit das GloriaFood-Widget sich auch an die Knöpfe in verdeckten Panels hängt.
 */
const HINT_MS = 2500;

function LunchTabs() {
  const [active, setActive] = useState(0);
  // Einmaliger Hinweis: bleibt der Block 2,5 s im Bild, wechselt er von selbst auf „Zum Mitnehmen“.
  const [hint, setHint] = useState<'idle' | 'running' | 'done'>('idle');
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);
  const listRef = useRef<HTMLDivElement>(null);

  // Nur die Reiterleiste seitlich scrollen, nie die Seite.
  const reveal = (i: number) => {
    const list = listRef.current;
    const tab = tabs.current[i];
    if (!list || !tab) return;
    const left = tab.offsetLeft - list.offsetLeft;
    if (left < list.scrollLeft || left + tab.offsetWidth > list.scrollLeft + list.clientWidth - 40) list.scrollTo({ left: Math.max(0, left - 20), behavior: 'smooth' });
  };

  const choose = (i: number) => {
    setHint('done');
    setActive(i);
    reveal(i);
  };

  const done = hint === 'done';
  useEffect(() => {
    if (done) return;
    const list = listRef.current;
    if (!list) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { setHint('done'); return; }
    let timer = 0;
    // Uhr läuft, sobald die Reiterleiste sichtbar ist (unter der Kopfleiste, über der Handy-Leiste),
    // damit es auf Handy und Desktop gleich 2,5 s dauert, egal wie hoch der Block ist.
    const observer = new IntersectionObserver(([entry]) => {
      window.clearTimeout(timer);
      if (!entry.isIntersecting) { setHint('idle'); return; }
      setHint('running');
      timer = window.setTimeout(() => { setActive(1); reveal(1); setHint('done'); }, HINT_MS);
    }, { threshold: 1, rootMargin: '-72px 0px -84px 0px' });
    observer.observe(list);
    return () => { observer.disconnect(); window.clearTimeout(timer); };
  }, [done]);

  const onKey = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + LUNCH_TABS.length) % LUNCH_TABS.length;
    choose(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="hx-shell hx-lunch" data-reveal="fade">
      <div ref={listRef} className="hx-lunch-tabs" role="tablist" aria-label="Business Lunch" onKeyDown={onKey}>
        {LUNCH_TABS.map((tab, i) => (
          <button key={tab.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`lunch-tab-${tab.id}`}
            aria-selected={i === active} aria-controls={`lunch-panel-${tab.id}`} tabIndex={i === active ? 0 : -1}
            className={hint === 'running' && i === 1 ? 'is-hinting' : undefined}
            onClick={() => choose(i)}>
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
              <GlfButton kind="reservation" className="hx-link">Tisch reservieren <span aria-hidden="true">{ARROW_NE}</span></GlfButton>
            </div>
          </div>
          <div role="tabpanel" id="lunch-panel-mitnehmen" aria-labelledby="lunch-tab-mitnehmen" hidden={active !== 1}>
            <h3>Online bestellen, im Erdgeschoss abholen.</h3>
            <p>Bestell vom Schreibtisch aus und hol dein Essen bei uns im Erdgeschoss des DC Tower ab.</p>
            <div className="hx-lunch-actions">
              <GlfButton kind="order" className="hx-btn hx-btn--solid">Online bestellen</GlfButton>
              <GlfButton kind="reservation" className="hx-link">Tisch reservieren <span aria-hidden="true">{ARROW_NE}</span></GlfButton>
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
  { label: 'Erdgeschoss', plaetze: KAPAZITAET.erdgeschoss.plaetze, text: `Unter der Holzdecke, mit Blick in die offene Küche. Für Teamlunch und Gruppen bis ${KAPAZITAET.erdgeschoss.gruppe} Personen.`, img: '/foto/haus/erdgeschoss.webp', alt: 'Gastraum im Erdgeschoss mit Holzdecke und offener Küche' },
  { label: 'Obergeschoss', plaetze: KAPAZITAET.obergeschoss.plaetze, text: `Ein Stock höher und etwas ruhiger. Ideal für Teamrunden und Geschäftsessen, als geschlossene Gesellschaft bis ${KAPAZITAET.obergeschoss.event} Personen.`, img: '/foto/haus/saal-lang.webp', alt: 'Langer, ruhiger Gastraum im Obergeschoss mit gedeckten Tischen' },
] as const;

function FloorsScroll() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [sticky, setSticky] = useState(false);

  useEffect(() => {
    const query = window.matchMedia('(prefers-reduced-motion: no-preference)');
    let progress = 0;
    let stop: (() => void) | undefined;
    const read = () => {
      const track = trackRef.current;
      if (!track) return;
      // Fortschritt = wie weit der klebende Block durch seine Strecke gewandert ist.
      const sticky = track.firstElementChild as HTMLElement;
      const rect = track.getBoundingClientRect();
      const travel = Math.max(1, rect.height - sticky.offsetHeight);
      progress = Math.max(0, Math.min(1, (sticky.getBoundingClientRect().top - rect.top) / travel));
    };
    const write = () => setActive(Math.min(FLOORS.length - 1, Math.floor(progress * FLOORS.length)));
    const sync = () => {
      setSticky(query.matches);
      stop?.();
      stop = query.matches ? onScrollFrame(read, write) : undefined;
    };
    sync();
    query.addEventListener('change', sync);
    return () => {
      query.removeEventListener('change', sync);
      stop?.();
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
  const heroRef = useRef<HTMLDivElement>(null);
  const coverRef = useRef<HTMLDivElement>(null);
  const stackRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const cateringListRef = useRef<HTMLDivElement>(null);
  const routeRef = useRef<HTMLOListElement>(null);
  const [cateringIndex, setCateringIndex] = useState(0);
  useScrollMotion(rootRef);

  useEffect(() => {
    // Cover-Effekt: --p (0…1) wächst, während sich die Speisekarte über den stehenden Hero schiebt.
    const wrap = heroRef.current;
    const cover = coverRef.current;
    if (!wrap || !cover) return;
    const animated = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    wrap.classList.toggle('is-static', !animated);
    // --p sitzt auf dem Hero selbst, nicht auf dem Wrapper: sonst müsste der Browser bei jedem Frame
    // auch die Styles der ganzen Speisekarte darunter neu berechnen.
    const heroTrack = wrap.querySelector<HTMLElement>('.hc-hero-track') ?? wrap;
    let p = 0, written = '';
    return onScrollFrame(() => {
      const top = cover.getBoundingClientRect().top;
      const heroHeight = heroTrack.offsetHeight || window.innerHeight;
      p = Math.min(1, Math.max(0, 1 - top / heroHeight));
    }, () => {
      const value = p.toFixed(3);
      if (animated && value !== written) { heroTrack.style.setProperty('--p', value); written = value; }
      // Schnellzugriff auf dem Handy, sobald die Hero-Buttons ausgeblendet bzw. vorbei sind.
      setShowQuickActions(p > 0.35);
    });
  }, []);

  useEffect(() => {
    // Wegweiser wie eine Maps-Route: die rote Linie wächst beim Scrollen, erreichte Stationen färben sich rot.
    const route = routeRef.current;
    if (!route) return;
    const steps = [...route.querySelectorAll<HTMLLIElement>('li')];
    // Zwei Pins: am Handy nur Überschrift und Route, am Desktop der ganze Anfahrt-Block.
    const mobileTrack = route.closest<HTMLElement>('.hx-route-track');
    const deskTrack = route.closest<HTMLElement>('.hx-route-track--desk');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let length = 1, p = 0, pinned = false, pinTop = 0;
    let track: HTMLElement | null | undefined;
    let reached: boolean[] = [];
    return onScrollFrame(() => {
      const first = steps[0].offsetTop + 16;
      length = Math.max(1, steps[steps.length - 1].offsetTop - steps[0].offsetTop);
      const desk = window.innerWidth > 760;
      // Desktop pinnt nur, wenn der Block samt Kopfleiste ganz ins Fenster passt.
      const deskPin = deskTrack?.firstElementChild as HTMLElement | null | undefined;
      pinned = !calm && desk && !!deskPin && deskPin.offsetHeight + 100 <= window.innerHeight;
      track = desk ? deskTrack : mobileTrack;
      const pin = track?.firstElementChild as HTMLElement | null | undefined;
      const spacer = track?.querySelector<HTMLElement>(':scope > .hx-route-spacer');
      // Mit Pin: die Linie läuft über die Strecke des Platzhalters, während der Block steht.
      const pinDistance = spacer?.offsetHeight ?? 0;
      pinTop = 0;
      if (calm) p = 1;
      else if (track && pin && pinDistance > 0) {
        pinTop = Math.max(84, (window.innerHeight - pin.offsetHeight) / 2);
        p = (pinTop - track.getBoundingClientRect().top) / pinDistance;
      } else p = (window.innerHeight * 0.6 - (route.getBoundingClientRect().top + first)) / length;
      p = Math.min(1, Math.max(0, p));
      reached = steps.map((step) => step.offsetTop - steps[0].offsetTop <= p * length + 1);
    }, () => {
      // Ändert sich der Pin, ändert sich auch die Höhe des Platzhalters: dann gleich noch einmal messen.
      if (deskTrack && deskTrack.classList.contains('is-pinned') !== pinned) {
        deskTrack.classList.toggle('is-pinned', pinned);
        requestScrollFrame();
      }
      if (track && pinTop) track.style.setProperty('--pin-top', `${pinTop}px`);
      route.style.setProperty('--route-len', `${length}px`);
      route.style.setProperty('--route', p.toFixed(3));
      steps.forEach((step, i) => step.classList.toggle('is-reached', reached[i]));
    });
  }, []);

  useEffect(() => {
    // Handy: die Catering-Karten sind eine Wischreihe; die Punkte darunter zeigen, welche Karte vorne ist.
    const list = cateringListRef.current;
    if (!list) return;
    let frame = 0;
    const update = () => {
      frame = 0;
      const card = list.firstElementChild as HTMLElement | null;
      if (!card) return;
      setCateringIndex(Math.min(CATERING.length - 1, Math.round(list.scrollLeft / (card.offsetWidth + 12))));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    list.addEventListener('scroll', onScroll, { passive: true });
    return () => { list.removeEventListener('scroll', onScroll); if (frame) cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    // Zweiter Cover-Effekt: Catering klebt mit seinem unteren Ende, der Wegweiser fährt darüber.
    const stack = stackRef.current;
    const under = stack?.querySelector<HTMLElement>('.hx-stack-under');
    const over = stack?.querySelector<HTMLElement>('.hx-stack-over');
    if (!stack || !under || !over) return;
    const animated = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
    stack.classList.toggle('is-static', !animated);
    if (!animated) return;
    // Direkt auf die betroffenen Elemente schreiben statt CSS-Variablen auf den ganzen Stapel,
    // damit nicht Catering und Wegweiser bei jedem Frame komplett neu gestylt werden.
    const shade = under.querySelector<HTMLElement>(':scope > .hx-stack-shade');
    let underTop = 0, p = 0, writtenTop = NaN, writtenShade = '';
    return onScrollFrame(() => {
      underTop = Math.min(0, window.innerHeight - under.offsetHeight);
      p = Math.min(1, Math.max(0, 1 - over.getBoundingClientRect().top / window.innerHeight));
    }, () => {
      if (underTop !== writtenTop) { under.style.top = `${underTop}px`; writtenTop = underTop; }
      const value = (p * 0.45).toFixed(3);
      if (shade && value !== writtenShade) { shade.style.opacity = value; writtenShade = value; }
    });
  }, []);

  useEffect(() => {
    // Die Bildreihe gleitet seitwärts, während die Sektion durchs Bild scrollt.
    // Desktop: per transform. Handy: über die echte Scrollposition der Wischreihe, damit man
    // jederzeit selbst wischen kann; sobald man sie anfasst, hört das Mitgleiten auf.
    const section = rootRef.current?.querySelector<HTMLElement>('.hx-reel');
    const win = section?.querySelector<HTMLElement>('.hx-reel-window');
    const track = section?.querySelector<HTMLElement>('.hx-reel-track');
    if (!section || !win || !track) return;
    const wide = window.matchMedia('(min-width: 901px)');
    const calm = window.matchMedia('(prefers-reduced-motion: reduce)');
    // Mit Scroll-Animationen übernimmt CSS das Gleiten am Desktop; hier nur noch die Strecke liefern.
    const scrollDriven = CSS.supports('animation-timeline: view()');
    let writtenDistance = -1;
    let userTook = false;
    const take = () => { userTook = true; win.classList.remove('is-auto'); };
    win.addEventListener('pointerdown', take, { passive: true });
    win.addEventListener('touchstart', take, { passive: true });
    win.addEventListener('wheel', take, { passive: true });
    let progress = 0, distance = 0, swipe = 0;
    const stop = onScrollFrame(() => {
      const rect = section.getBoundingClientRect();
      progress = Math.min(1, Math.max(0, (window.innerHeight - rect.top) / (window.innerHeight + rect.height)));
      distance = Math.max(0, track.scrollWidth - track.clientWidth);
      swipe = win.scrollWidth - win.clientWidth;
    }, () => {
      if (calm.matches) { track.style.transform = ''; win.classList.remove('is-auto'); return; }
      if (wide.matches) {
        win.classList.remove('is-auto');
        if (scrollDriven) {
          if (distance !== writtenDistance) { track.style.setProperty('--reel-distance', `${distance}px`); writtenDistance = distance; }
          return;
        }
        track.style.transform = `translate3d(${(-distance * progress).toFixed(1)}px, 0, 0)`;
        return;
      }
      track.style.transform = '';
      if (userTook) return;
      win.classList.add('is-auto');
      win.scrollLeft = progress * swipe;
    });
    return () => {
      stop();
      win.removeEventListener('pointerdown', take);
      win.removeEventListener('touchstart', take);
      win.removeEventListener('wheel', take);
    };
  }, []);

  return (
    <div ref={rootRef} className="hc-page hc-home-page">
      <a className="hc-skip-link" href="#main">Zum Inhalt springen</a>
      <div className="hc-noise" aria-hidden="true" />

      <SiteHeader home onMenuChange={setMenuOpen} />

      <main id="main">
        {/* Hero bleibt stehen, Leiste und Speisekarte schieben sich darüber. */}
        <div ref={heroRef} className="hc-cover-wrap">
        <section className="hc-hero-track" id="top" aria-label="Willkommen im ra’mien go DC Tower">
          <div className="hc-hero">
            <div className="hc-hero-media" aria-hidden="true">
              <picture>
                {/* WebP mit eingerechneter Helligkeit (npm run images); die JPGs bleiben als Fallback. */}
                <source media="(max-width: 640px)" type="image/webp" srcSet="/_img/hero-ramen-dark-tall.webp" />
                <source media="(max-width: 640px)" srcSet="/hero-ramen-dark-tall.jpg" />
                <source type="image/webp" srcSet="/_img/hero-ramen-dark.webp" />
                {/* The portrait photograph preserves the composition on phones. */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/hero-ramen-dark.jpg" alt="" loading="eager" fetchPriority="high" />
              </picture>
            </div>
            <span className="hc-hero-glyph" lang="zh" aria-hidden="true">面</span>
            <div className="hc-hero-shell hc-hero-stage--intro">
              <p className="hc-hero-place">Asian Fusion · DC Tower · Wien</p>
              <h1 className="hc-hero-wordmark"><span>ra&rsquo;mien</span><span>go</span></h1>
              <div className="hc-hero-actions">
                <GlfButton kind="reservation" className="hx-btn hx-btn--solid">Tisch reservieren</GlfButton>
                <Link className="hx-btn hx-btn--line" href="/catering#anfrage">Catering anfragen</Link>
              </div>
            </div>
            <div className="hc-hero-bottom">
              <span>Im Erdgeschoss. Seit {BRAND.since}.</span>
              <a href="#signature">Appetit holen <span aria-hidden="true">↓</span></a>
            </div>
          </div>
        </section>

        <div ref={coverRef} className="hc-cover">
        <nav className="hc-visit-strip" aria-label="Dein Besuch auf einen Blick">
          <a href="#kontakt"><small>Hier sind wir</small><span>Donau City · 2 Min. von der U1</span></a>
          <a href="#kontakt"><small>Öffnungszeiten</small><span>Mo–Fr 11–22 · So 11–17</span></a>
          <GlfButton kind="order"><small>Lieber mitnehmen?</small><span>Online bestellen</span></GlfButton>
        </nav>

        <section className="hx-reel" id="signature" aria-labelledby="menu-title">
          <div className="hx-shell hx-reel-head">
            <Lines id="menu-title" className="hx-title" lines={['Worauf hast du Lust?']} />
            <nav className="hx-menu-cards" aria-label="Unsere Karten" data-reveal="fade">
              {MENU_CARDS.map((card) => (
                <Link key={card.id} href={card.href}>
                  <strong>{card.title} <span aria-hidden="true">{ARROW_NE}</span></strong>
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
                    <span className="hx-reel-photo"><Image src={item.img} alt={item.alt} fill sizes="(max-width: 900px) 42vw, 26vw" loading="eager" fetchPriority="low" /></span>
                    <span className="hx-reel-name">{item.name}</span>
                    <span className="hx-reel-price">{reelPrice(item)}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div className="hx-shell hx-reel-actions" data-reveal="fade">
            <Link className="hx-btn hx-btn--solid" href="/menu"><Icon name="dish" size={18} />Zur Speisekarte</Link>
            <GlfButton kind="order" className="hx-btn hx-btn--line">Online bestellen</GlfButton>
          </div>
        </section>
        </div>
        </div>

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
        </section>

        {/* Catering bleibt am Ende stehen, der Wegweiser schiebt sich darüber. */}
        <div ref={stackRef} className="hx-stack">
        <section className="hx-catering hx-stack-under" id="catering" aria-labelledby="catering-title">
          <div className="hx-stack-shade" aria-hidden="true" />
          <figure className="hx-room-hero hx-catering-hero">
            <div className="hx-parallax" data-parallax="0.5" data-parallax-max="200">
              <Image src="/foto/shooting-2021-11/ramien-08102021-wf-34.webp" alt="Sushi, Dim Sum und Drinks auf einem gedeckten Tisch im ra’mien go" fill sizes="100vw" />
            </div>
            <figcaption className="hx-shell">
              <p className="hc-eyebrow">Catering &amp; Events</p>
              <Lines id="catering-title" className="hx-title hx-title--on-photo" lines={['Mehr Leute.', 'Mehr zu teilen.']} />
            </figcaption>
          </figure>
          <div ref={cateringListRef} className="hx-shell hx-catering-list">
            {CATERING.map((item, i) => (
              <Link key={item.id} id={`angebot-${item.id}`} className="hx-catering-card" href={`/catering/?angebot=${item.id}#anfrage`} data-reveal="rise" style={{ transitionDelay: `${i * 120}ms` }}>
                <span className="hx-catering-photo"><span className="hx-parallax" data-parallax="0.06"><Image src={item.img} alt={item.alt} fill sizes="(max-width: 760px) 66vw, (max-width: 900px) calc(100vw - 40px), 31vw" /></span></span>
                <strong>{item.title}</strong>
                <span className="hx-catering-short">{item.short}</span>
                <span className="hx-btn hx-btn--line hx-btn--sm">{item.action}</span>
              </Link>
            ))}
          </div>
          <div className="hx-catering-dots" aria-hidden="true">
            {CATERING.map((item, i) => <span key={item.id} className={i === cateringIndex ? 'is-on' : undefined} />)}
          </div>
        </section>

        <section className="hx-way hx-stack-over" id="anfahrt" aria-labelledby="arrival-title">
          {/* Desktop: der ganze Anfahrt-Block bleibt stehen, bis der rote Faden durchgezogen ist. */}
          <div className="hx-route-track--desk">
          <div className="hx-shell hx-arrival">
            {ANFAHRT_VIDEOS.filter((video) => video.src).slice(0, 1).map((video) => (
              <ArrivalVideo key={video.title} src={video.src!} poster={video.poster} title={video.title} text={video.text} />
            ))}
            <div className="hx-arrival-route" data-reveal="fade">
              {/* Handy: Überschrift und Route bleiben stehen, bis der rote Faden durchgezogen ist. */}
              <div className="hx-route-track">
              <div className="hx-route-pin">
              <h2 id="arrival-title">So kommst du zu uns.</h2>
              <ol ref={routeRef} className="hx-arrival-steps">
                <li><i className="hx-route-icon" aria-hidden="true">U1</i><span>01</span><div><strong>U1 bis Kaisermühlen · VIC</strong><p>Oder ab Donauinsel – von dort rund fünf Minuten zu Fuß, das Video zeigt dir den Weg.</p></div></li>
                <li><i className="hx-route-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="13" cy="4" r="2" /><path d="M10 21l2-6 3 3v3M9 12l2-4 4 1 2 3M11 8l-2 5" /></svg></i><span>02</span><div><strong>Zwei Minuten zu Fuß</strong><p>Vom Ausgang Kaisermühlen · VIC sind es zwei Gehminuten bis zum DC Tower.</p></div></li>
                <li><i className="hx-route-icon" aria-hidden="true"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.5" /></svg></i><span>03</span><div><strong>Erdgeschoss DC Tower</strong><p>{CONTACT.street}, {CONTACT.zip} {CONTACT.city} – durch die Glastür, und du bist da.</p></div></li>
              </ol>
              </div>
              <div className="hx-route-spacer" aria-hidden="true" />
              </div>
              <div className="hx-arrival-park">
                <b aria-hidden="true">P</b>
                <p><strong>Mit dem Auto</strong>Parken in der DC Tower Garage. Lass dein Parkticket bei uns abstempeln und parke für 1 € pro Stunde.</p>
              </div>
              <a className="hx-btn hx-btn--solid" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Route planen <span aria-hidden="true">{ARROW_NE}</span></a>
            </div>
          </div>
          <div className="hx-route-spacer" aria-hidden="true" />
          </div>
        </section>
        </div>

        <section className="hx-reserve" id="reservieren" aria-labelledby="reserve-title">
          <div className="hx-shell hx-reserve-shell">
            <Lines id="reserve-title" className="hx-title hx-title--reserve" lines={['Wir sehen uns', 'im go.']} />
            <div className="hx-reserve-contact" data-reveal="fade">
              <p>Zu zweit, mit Freunden oder dem ganzen Team.</p>
              <div className="hx-actions">
                <GlfButton kind="reservation" className="hx-btn hx-btn--ink">Tisch reservieren</GlfButton>
                <a className="hx-btn hx-btn--line-light" href={CONTACT.phoneHref}><Icon name="phone" size={18} />{CONTACT.phone}</a>
              </div>
            </div>
          </div>
        </section>

        <section className="hc-location hx-location" id="kontakt" aria-labelledby="contact-title">
          <div className="hc-location-shell">
            <div className="hx-contact">
              <div>
                <Lines id="contact-title" className="hx-title" lines={['Hoher Tower.', 'Ganz unten bei uns.']} />
                <p className="hx-contact-address" data-reveal="fade">{CONTACT.street}, {CONTACT.zip} {CONTACT.city}<br />Erdgeschoss DC Tower · U1 Kaisermühlen</p>
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
              <Image className="hc-footer-logo" src="/go-dc-tower-logo.png" alt={`${BRAND.name} ${BRAND.place}`} width={706} height={706} sizes="120px" />
              <span className="hc-footer-links"><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook</a><Link href="/impressum">Impressum</Link><Link href="/datenschutz">Datenschutz</Link></span>
              <MadeBy />
            </footer>
          </div>
        </section>
      </main>
      <nav className={`hc-mobile-actions${showQuickActions && !menuOpen ? ' is-visible' : ''}`} aria-label="Schnellzugriff" inert={!showQuickActions || menuOpen}>
        <GlfButton kind="reservation" className="hx-btn hx-btn--solid">Tisch reservieren</GlfButton><Link className="hx-btn hx-btn--line" href="/catering#anfrage">Catering anfragen</Link>
      </nav>
    </div>
  );
}
