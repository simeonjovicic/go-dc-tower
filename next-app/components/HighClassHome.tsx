'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState, type KeyboardEvent } from 'react';
import { ANFAHRT, BRAND, CONTACT, HOURS, KAPAZITAET, SOCIAL } from '@/components/site-data';
import { DISHES, fmt, ORDER_URL, priceFrom } from '@/components/menu-data';

// The preview and menu share dish names, photos and prices.
const TASTES = [
  {
    id: 'lamien', category: 'Nudelsuppen', mood: 'Wärmend & wohltuend',
    title: 'La Mien', href: '/menu#nudelsuppen', link: 'Alle Nudelsuppen',
    desc: 'Frisch gehobelte Weizennudeln in feiner Hühnerbrühe, mit Pakchoi, Koriander und deiner Einlage nach Wahl.',
    note: 'Auf dem Bild: La Mien mit Rind',
  },
  {
    id: 'poke-maguro', category: 'Poké Bowls', mood: 'Frisch & bunt',
    title: 'Poké Bowl Maguro', href: '/menu#poke', link: 'Alle Poké Bowls',
    desc: 'Thunfisch auf Sushi-Reis, dazu Avocado, Gurke, Salat und Kräuter. Und eine Sauce ganz nach deinem Geschmack.',
    note: 'Auch mit Lachs, Shrimps oder Tofu auf der Karte',
  },
  {
    id: 'knusprige-ente', category: 'Wok & Reis', mood: 'Knusprig & herzhaft',
    title: 'Knusprige Ente', href: '/menu#main', link: 'Alle Wok- & Reisgerichte',
    desc: 'Knusprige Ente mit gebratenem Gemüse, dazu Teriyaki- oder Knoblauchsauce. Für den großen Hunger.',
    note: 'Dazu auf der Karte: Currys, Bulgogi und gebratene Nudeln',
  },
  {
    id: 'tuna-tataki', category: 'Zum Anfangen', mood: 'Bestellen & teilen',
    title: 'Tuna-Tataki', href: '/menu#vorspeisen', link: 'Alle Vorspeisen',
    desc: 'Kurz angebratener Thunfisch mit Koriander-Sauce. Ein guter Anfang für ein Essen, bei dem alle mitprobieren.',
    note: 'Oder gemeinsam starten mit Gyoza, Edamame und Frühlingsrollen',
  },
] as const;

const OCCASIONS = [
  {
    title: 'Feiern im go', label: 'Euer eigener Bereich',
    image: '/foto/haus/obergeschoss.webp', alt: 'Gedeckte Tische im ersten Stock des Restaurants',
    text: `Geburtstag oder Firmenfeier: Im ersten Stock bleibt ihr mit bis zu ${KAPAZITAET[0].zahl} Gästen unter euch. Dazu ein Sharing-Buffet oder ein serviertes Menü.`,
    action: 'Feier anfragen', subject: 'Anfrage: Feier im go DC Tower',
  },
  {
    title: 'Lunch fürs Team', label: 'Bei euch im Büro',
    image: '/foto/leben/sackerl-tower.webp', alt: 'Gast mit einer ra’mien-go-Tragetasche vor dem DC Tower',
    text: 'Lieblingsgerichte aus der Karte oder eine gemeinsam zusammengestellte Lunchbox mit Vorspeisen. Wir bringen das Mittagessen zu euch.',
    action: 'Business Lunch anfragen', subject: 'Anfrage: Business Lunch',
  },
  {
    title: 'Catering für euch', label: 'An eurem Lieblingsort',
    image: '/foto/leben/tafel-oben.webp', alt: 'Tafel mit verschiedenen asiatischen Gerichten zum Teilen',
    text: 'Warme und kalte Vorspeisen, Hauptgerichte und Nudelsuppe als Sharing-Buffet. Gemeinsam planen wir, was zu eurem Anlass passt.',
    action: 'Catering anfragen', subject: 'Anfrage: Catering',
  },
] as const;

const MOBILE_LINKS = [
  ['/menu', 'Speisekarte'], ['#raum', 'Restaurant'], ['#catering', 'Feiern & Catering'],
  ['#kontakt', 'Anfahrt & Zeiten'], ['#reservieren', 'Tisch anfragen'],
] as const;

function inquiry(subject: string, body?: string) {
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}${body ? `&body=${encodeURIComponent(body)}` : ''}`;
}

export function HighClassHome() {
  const rootRef = useRef<HTMLDivElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const [taste, setTaste] = useState(0);

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
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    // Content stays visible without JS; only offscreen elements receive an entrance.
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.remove('will-reveal');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.08 });
    root.querySelectorAll<HTMLElement>('.hc-reveal').forEach((element) => {
      if (element.getBoundingClientRect().top > window.innerHeight) {
        element.classList.add('will-reveal');
        observer.observe(element);
      }
    });
    return () => observer.disconnect();
  }, []);

  function onTasteKey(event: KeyboardEvent<HTMLButtonElement>, index: number) {
    let next = index;
    if (event.key === 'ArrowRight' || event.key === 'ArrowDown') next = (index + 1) % TASTES.length;
    else if (event.key === 'ArrowLeft' || event.key === 'ArrowUp') next = (index + TASTES.length - 1) % TASTES.length;
    else if (event.key === 'Home') next = 0;
    else if (event.key === 'End') next = TASTES.length - 1;
    else return;
    event.preventDefault();
    setTaste(next);
    document.getElementById(`taste-tab-${next}`)?.focus();
  }

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
            <a className="hc-nav-reserve" href="#reservieren">Tisch anfragen <span aria-hidden="true">↗</span></a>
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
          <div className="hc-hero-shell">
            <p className="hc-hero-place">Asian Fusion · DC Tower · Wien</p>
            <h1 className="hc-hero-wordmark"><span>ra&rsquo;mien</span><span>go</span></h1>
            <p className="hc-hero-invitation">Deine Mittagspause.<br />Euer Abend. Unsere Küche.</p>
            <div className="hc-hero-actions">
              <Link className="hc-button-red" href="/menu">Speisekarte <span aria-hidden="true">↗</span></Link>
              <a className="hc-hero-reserve" href="#reservieren">Tisch anfragen <span aria-hidden="true">↗</span></a>
            </div>
          </div>
          <div className="hc-hero-bottom">
            <span>Im Erdgeschoß. Seit {BRAND.since}.</span>
            <a href="#signature">Appetit holen <span aria-hidden="true">↓</span></a>
          </div>
        </section>

        <nav className="hc-visit-strip" aria-label="Dein Besuch auf einen Blick">
          <a href="#kontakt"><small>Hier sind wir</small><span>Donau City · 2 Min. von der U1 <b aria-hidden="true">↗</b></span></a>
          <a href="#kontakt"><small>Öffnungszeiten</small><span>Mo–Fr 11–22 · So 11–17 <b aria-hidden="true">↗</b></span></a>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer"><small>Lieber mitnehmen?</small><span>Online bestellen <b aria-hidden="true">↗</b></span></a>
        </nav>

        <section className="hc-welcome hc-reveal" id="philosophie">
          <p className="hc-eyebrow">Willkommen im go</p>
          <h2 className="hc-display">Mitten in Wien.<br /><i>Ein Stück Asien.</i></h2>
          <p>La Mien, frisch gehobelt und direkt in die Brühe. Hausgemachte Gyoza zum Teilen.
            Sushi, Wok und bunte Bowls. Komm auf dein Lieblingsgericht vorbei — oder finde ein neues.</p>
        </section>

        <section className="hc-taste" id="signature" aria-labelledby="taste-heading">
          <div className="hc-taste-shell">
            <div className="hc-taste-head hc-reveal">
              <div><p className="hc-eyebrow">Ein Vorgeschmack</p><h2 id="taste-heading" className="hc-display">Worauf hast du <i>Lust?</i></h2></div>
              <Link className="hc-text-link" href="/menu">Die ganze Speisekarte <span className="hc-arrow" aria-hidden="true">↗</span></Link>
            </div>
            <div className="hc-taste-layout hc-reveal">
              <div className="hc-taste-choices">
                <div className="hc-taste-tabs" role="tablist" aria-label="Gerichte entdecken">
                  {TASTES.map((entry, index) => (
                    <button key={entry.id} id={`taste-tab-${index}`} role="tab" type="button"
                      aria-selected={taste === index} aria-controls={`taste-panel-${index}`}
                      tabIndex={taste === index ? 0 : -1} onClick={() => setTaste(index)} onKeyDown={(event) => onTasteKey(event, index)}>
                      <span><small>{entry.mood}</small><strong>{entry.category}</strong></span><span aria-hidden="true">↗</span>
                    </button>
                  ))}
                </div>
                <p className="hc-taste-hint">Einmal durchprobieren? Wähle, was dich anspricht.</p>
              </div>
              <div className="hc-taste-preview">
                {TASTES.map((entry, index) => {
                  const dish = DISHES.find((item) => item.id === entry.id)!;
                  const price = priceFrom(dish);
                  return (
                    <div id={`taste-panel-${index}`} key={entry.id} className="hc-taste-panel" role="tabpanel"
                      aria-labelledby={`taste-tab-${index}`} hidden={taste !== index} tabIndex={0}>
                      <Link className="hc-taste-image" href={entry.href} aria-label={`${entry.title} in der Speisekarte ansehen`}>
                        <Image src={dish.img!} alt={entry.title} fill sizes="(max-width: 760px) calc(100vw - 40px), 54vw" />
                        <span className="hc-taste-photo-note">{entry.note}</span>
                      </Link>
                      <div className="hc-taste-description">
                        <div className="hc-taste-title"><h3>{entry.title}</h3><span>{dish.variants?.length ? 'ab ' : ''}€ {fmt(price!)}</span></div>
                        <p>{entry.desc}</p>
                        <Link className="hc-text-link" href={entry.href}>{entry.link} <span className="hc-arrow" aria-hidden="true">↗</span></Link>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="hc-taste-foot">
              <span>Auch vegetarisch &amp; vegan: zum Beispiel Poké mit Tofu, Edamame oder Gemüse-Gyoza.</span>
              <Link href="/menu#sushi">Lust auf Sushi? <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </section>

        <section className="hc-experience" id="raum">
          <div className="hc-experience-shell">
            <div className="hc-experience-photos hc-reveal">
              <div className="hc-experience-media"><Image src="/foto/haus/saal-holzdecke.webp"
                alt="Heller Gastraum mit Holzdecke, gedeckten Tischen und offener Küche" fill sizes="(max-width: 760px) 90vw, 48vw" /></div>
              <div className="hc-experience-detail"><Image src="/foto/leben/anstossen.webp"
                alt="Freunde stoßen beim gemeinsamen Essen im go an" fill sizes="(max-width: 760px) 44vw, 23vw" /></div>
              <span className="hc-photo-caption">Ein Platz für deine Pause. Und eure Runde.</span>
            </div>
            <div className="hc-experience-copy hc-reveal">
              <p className="hc-eyebrow">Dein Platz im DC Tower</p>
              <h2 className="hc-display">Kurz raus.<br /><i>Gerne länger bleiben.</i></h2>
              <p>Durch die Glastür, unter die Holzdecke, an deinen Tisch. Bei uns sitzt du mitten
                in der Donau City — und bist für eine Weile ganz woanders.</p>
              <div className="hc-visit-moments">
                <div><h3>Mittags eine gute Pause.</h3><p>Mit den Kollegen an den Tisch oder dein Lieblingsgericht mitnehmen. Unter der Woche ab 11 Uhr.</p></div>
                <div><h3>Abends zusammenkommen.</h3><p>Vorspeisen teilen, etwas Neues probieren und noch auf ein Getränk bleiben. Mo–Fr bis 22 Uhr, Küche bis 21 Uhr.</p></div>
              </div>
              <a className="hc-text-link" href="#reservieren">Wir halten euch einen Platz frei <span className="hc-arrow" aria-hidden="true">↗</span></a>
            </div>
          </div>
        </section>

        <section className="hc-catering" id="catering">
          <div className="hc-catering-head hc-reveal">
            <div><p className="hc-eyebrow">Feiern &amp; Catering</p><h2 className="hc-display">Mehr Leute.<br /><i>Mehr zu teilen.</i></h2></div>
            <p>Bei uns, bei euch im Büro oder an eurem Lieblingsort. Ihr bringt den Anlass, wir kümmern uns ums Essen.</p>
          </div>
          <div className="hc-catering-list">
            {OCCASIONS.map((item) => (
              <article className="hc-catering-item hc-reveal" key={item.title}>
                <div className="hc-catering-media"><Image src={item.image} alt={item.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), 31vw" /></div>
                <small>{item.label}</small><h3>{item.title}</h3><p>{item.text}</p>
                <a className="hc-text-link" href={inquiry(item.subject, 'Hallo liebes go-Team,\n\nwir planen ein gemeinsames Essen:\nDatum: \nPersonenanzahl: \nOrt / Anlass: \n\nUnsere Wünsche: \n\nName und Telefonnummer: ')}>
                  {item.action} <span className="hc-arrow" aria-hidden="true">↗</span>
                </a>
              </article>
            ))}
          </div>
          <p className="hc-catering-note">Für eure Anfrage helfen uns Datum, Personenanzahl und Anlass. Den Rest planen wir gemeinsam.</p>
        </section>

        <section className="hc-reserve" id="reservieren">
          <div className="hc-reserve-shell hc-reveal">
            <div><p className="hc-eyebrow">Ein Tisch für euch</p><h2 className="hc-display">Wir sehen uns <i>im go.</i></h2></div>
            <div className="hc-reserve-contact">
              <p>Zu zweit, mit Freunden oder dem ganzen Team. Schreibt uns, wann ihr kommen möchtet und wie viele ihr seid.</p>
              <a className="hc-button-dark" href={inquiry('Tischreservierung', 'Hallo liebes go-Team,\n\nich möchte einen Tisch anfragen:\nDatum: \nUhrzeit: \nPersonenanzahl: \nName: \nTelefonnummer: \n\nVielen Dank!')}>
                Tisch per E-Mail anfragen <span aria-hidden="true">↗</span>
              </a>
              <a className="hc-reserve-phone" href={CONTACT.phoneHref}>Lieber anrufen? <span>{CONTACT.phone} ↗</span></a>
              <small>Reservierungen sind nach unserer Bestätigung fix.</small>
            </div>
          </div>
        </section>

        <section className="hc-location" id="kontakt">
          <div className="hc-location-shell">
            <div className="hc-location-top">
              <div className="hc-reveal">
                <p className="hc-eyebrow">Dein Weg zu uns</p>
                <h2 className="hc-display">Hoher Tower.<br /><i>Ganz unten bei uns.</i></h2>
                <p className="hc-location-address">{CONTACT.street} · {CONTACT.zip} {CONTACT.city}<br />Im Erdgeschoß des DC Tower</p>
                <a className="hc-text-link" href={CONTACT.maps} target="_blank" rel="noopener noreferrer">Route in Google Maps <span className="hc-arrow" aria-hidden="true">↗</span></a>
                <ul className="hc-anfahrt">{ANFAHRT.map((item) => <li key={item.label}><small>{item.label}</small><span>{item.text}</span></li>)}</ul>
              </div>
              <div className="hc-address hc-reveal">
                <div className="hc-address-block"><h3>Wann wir für euch da sind</h3>
                  <table className="hc-hours"><tbody>{HOURS.map((hour) => (
                    <tr key={hour.days} className={hour.closed ? 'is-closed' : undefined}><th scope="row">{hour.days}</th><td>{hour.time}{hour.note ? <em>{hour.note}</em> : null}</td></tr>
                  ))}</tbody></table>
                </div>
                <div className="hc-address-block"><h3>Noch eine Frage?</h3><a href={CONTACT.phoneHref}>{CONTACT.phone}</a><br /><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></div>
                <div className="hc-location-pickup"><span>Das go für unterwegs.</span><a href={ORDER_URL} target="_blank" rel="noopener noreferrer">Online bestellen <span aria-hidden="true">↗</span></a></div>
              </div>
            </div>
            <footer className="hc-footer">
              <span>© {new Date().getFullYear()} {BRAND.name} {BRAND.place}</span>
              <Image className="hc-footer-logo" src="/go-dc-tower-logo.png" alt={`${BRAND.name} ${BRAND.place}`} width={706} height={706} />
              <span className="hc-footer-links"><a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">Instagram</a><a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">Facebook</a><Link href="/impressum">Impressum</Link></span>
            </footer>
          </div>
        </section>
      </main>
      <nav className={`hc-mobile-actions${showQuickActions && !menuOpen ? ' is-visible' : ''}`} aria-label="Schnellzugriff" inert={!showQuickActions || menuOpen}>
        <Link href="/menu">Speisekarte <span aria-hidden="true">↗</span></Link><a href="#reservieren">Tisch anfragen <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  );
}
