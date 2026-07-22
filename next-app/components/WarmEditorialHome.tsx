'use client';

import { useEffect, useRef, useState } from 'react';
import type { FormEvent, PointerEvent as ReactPointerEvent, WheelEvent } from 'react';

const ORDER_URL = 'https://www.lieferando.at/speisekarte/ramien-go-donau-city-strase';

const navItems = [
  ['karte', 'Karte'],
  ['feiern', 'Feiern'],
  ['galerie', 'Galerie'],
  ['besuch', 'Besuch'],
] as const;

const dishes = [
  { image: '/menu-ramen.jpg', alt: 'Wantan-Suppe mit Shrimpsnudeln und Gemüse in der Schale', name: 'Wantan-Suppe mit Shrimpsnudel', price: '16,80', category: 'Nudelsuppen' },
  { image: '/ig-beef-greens.jpg', alt: 'Knusprige Ente mit Gemüse und Reis', name: 'Knusprige Ente', price: '18,90', category: 'Abend-Spezial' },
  { image: '/ig-wok-tofu.jpg', alt: 'Kokos-Curry mit Huhn und Gemüse aus dem Wok', name: 'Kokos-Curry mit Huhn', price: '16,80', category: 'Wok' },
  { image: '/ig-veggie-bowl.jpg', alt: 'Reisschale mit Gemüse, vegan', name: 'Reisschale Gemüse', price: '15,60', category: 'Reisschalen', extra: '· Vegan' },
];

const packages = [
  { title: 'Office Lunch', description: 'Reisschalen, Nudeln und Vorspeisen für die Mittagsrunde. Im DC Tower liefern wir mit dem Lift.', specs: [['Ab', '8 Personen'], ['Vorlauf', '24 Stunden'], ['Lieferung', 'Im Haus gratis']] },
  { title: 'Firmenfeier', description: 'Buffet oder Menü, warm und kalt. Wir stellen die Karte nach eurem Anlass zusammen.', specs: [['Ab', '20 Personen'], ['Vorlauf', '3 Tage'], ['Lieferung', 'Ganz Wien']] },
  { title: 'Private Feier', description: 'Geburtstag, Babyparty, Klassentreffen. Fingerfood kalt oder warm, auf Wunsch mit Service.', specs: [['Ab', '10 Personen'], ['Vorlauf', '3 Tage'], ['Lieferung', 'Ganz Wien']] },
];

const rooms = [
  { number: '45', suffix: 'Gäste', title: 'Private Lounge', copy: 'Erster Stock, eigener Bereich, ungestört.' },
  { number: '80', suffix: 'Gäste', title: 'Vorderraum mit Bar', copy: 'Erdgeschoss, eigene Bar, Blick nach draußen.' },
  { number: 'Alles', suffix: 'exklusiv', title: 'Das ganze Lokal', copy: 'Für Hochzeiten, Empfänge und größere Firmenfeiern.' },
];

const gallery = [
  ['/go-gyoza-steamer.jpg', 'Geöffneter Bambuskorb mit frischen Teigtaschen', 'Dim Sum'],
  ['/ig-skewers.jpg', 'Knusprige Spieße auf Salat angerichtet', 'Vorspeisen'],
  ['/ig-beef-greens.jpg', 'Stäbchen heben Rindfleisch mit Gemüse aus der Schale', 'Reisschale'],
  ['/ig-fried-gyoza.jpg', 'Gebratene Teigtaschen aus der Pfanne, Nahaufnahme', 'Jiaozi'],
  ['/hero-restaurant.jpg', 'Der Gastraum mit Holzdecke und Tischen', 'Der Gastraum'],
  ['/ig-rainbow-roll.jpg', 'Aufgeschnittene Rolle auf dunklem Teller', 'Kalte Küche'],
  ['/ig-wok-tofu.jpg', 'Tofu und Gemüse aus dem Wok', 'Aus dem Wok'],
  ['/go-shumai.jpg', 'Shaomai-Teigtaschen im Bambuskorb', 'Shaomai'],
] as const;

const restaurantSchema = {
  '@context': 'https://schema.org',
  '@type': 'Restaurant',
  name: 'go DC Tower',
  alternateName: "Ra'mien go DC Tower",
  servesCuisine: ['Asiatisch', 'Chinesisch'],
  priceRange: '€€',
  telephone: '+4319165156',
  email: 'info@godctower.com',
  address: {
    '@type': 'PostalAddress',
    streetAddress: 'Donau-City-Straße 7',
    addressLocality: 'Wien',
    postalCode: '1220',
    addressCountry: 'AT',
  },
};

function Logotype() {
  return <span className="logotype">go dc tower <span className="logotype__cn" aria-hidden="true">拉面</span></span>;
}

export function WarmEditorialHome() {
  const [loading, setLoading] = useState(true);
  const [stuck, setStuck] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [menuOpen, setMenuOpen] = useState(false);
  const [sheetOpen, setSheetOpen] = useState(false);
  const heroBgRef = useRef<HTMLDivElement>(null);
  const filmstripRef = useRef<HTMLDivElement>(null);
  const firstSheetFieldRef = useRef<HTMLSelectElement>(null);
  const drag = useRef({ down: false, startX: 0, startLeft: 0 });

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const timer = window.setTimeout(() => setLoading(false), reduced ? 0 : 1000);
    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let frame = 0;
    const update = () => {
      frame = 0;
      setStuck(window.scrollY > 70);
      if (!reduced && window.innerWidth >= 900 && heroBgRef.current && window.scrollY < window.innerHeight * 1.2) {
        heroBgRef.current.style.transform = `translate3d(0, ${window.scrollY * 0.4}px, 0)`;
      }
    };
    const onScroll = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(update);
    };
    update();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      if (frame) window.cancelAnimationFrame(frame);
    };
  }, []);

  useEffect(() => {
    const sections = ['karte', 'feiern', 'galerie', 'besuch']
      .map(id => document.getElementById(id))
      .filter((section): section is HTMLElement => Boolean(section));
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    }, { rootMargin: '-44% 0px -50% 0px', threshold: 0 });
    sections.forEach(section => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const nodes = [...document.querySelectorAll<HTMLElement>('.reveal')];
    if (reduced || !('IntersectionObserver' in window)) {
      nodes.forEach(node => node.classList.add('is-visible'));
      return;
    }
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -8% 0px' });
    nodes.forEach((node, index) => {
      node.style.transitionDelay = `${Math.min(index % 4, 3) * 55}ms`;
      observer.observe(node);
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen || sheetOpen ? 'hidden' : '';
    if (sheetOpen) window.setTimeout(() => firstSheetFieldRef.current?.focus(), 380);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== 'Escape') return;
      setMenuOpen(false);
      setSheetOpen(false);
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, sheetOpen]);

  const openSheet = () => {
    setMenuOpen(false);
    setSheetOpen(true);
  };

  const submitCatering = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    if (!form.reportValidity()) return;
    const data = [...new FormData(form).entries()]
      .filter(([, value]) => String(value).trim())
      .map(([key, value]) => `${key}: ${value}`);
    const occasion = String(new FormData(form).get('Anlass') || 'Catering');
    const people = String(new FormData(form).get('Personen') || '');
    const subject = `Catering-Anfrage — ${occasion}, ${people} Personen`;
    const body = `Guten Tag,\n\nwir möchten eine Catering-Anfrage stellen:\n\n${data.join('\n')}\n\nBeste Grüße`;
    window.location.href = `mailto:info@godctower.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  const pointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === 'touch' || !filmstripRef.current) return;
    drag.current = { down: true, startX: event.clientX, startLeft: filmstripRef.current.scrollLeft };
    filmstripRef.current.classList.add('is-dragging');
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!drag.current.down || !filmstripRef.current) return;
    filmstripRef.current.scrollLeft = drag.current.startLeft - (event.clientX - drag.current.startX);
  };

  const pointerRelease = (event: ReactPointerEvent<HTMLDivElement>) => {
    drag.current.down = false;
    filmstripRef.current?.classList.remove('is-dragging');
    if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId);
  };

  const wheelFilmstrip = (event: WheelEvent<HTMLDivElement>) => {
    const strip = filmstripRef.current;
    if (!strip || Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
    const next = strip.scrollLeft + event.deltaY;
    if (next > 0 && next < strip.scrollWidth - strip.clientWidth) {
      event.preventDefault();
      strip.scrollLeft = next;
    }
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(restaurantSchema) }} />
      <a className="skip-link" href="#main">Zum Inhalt springen</a>

      <div className={`preloader${loading ? '' : ' is-done'}`} role="status" aria-label="Seite lädt" aria-hidden={!loading}>
        <div className="preloader__mark">go dc tower</div>
        <div className="preloader__rule" aria-hidden="true" />
      </div>

      <header className={`nav${stuck || menuOpen ? ' is-stuck' : ''}${menuOpen ? ' is-menu-open' : ''}`}>
        <div className="nav__inner">
          <a href="#top" aria-label="go DC Tower — Startseite"><Logotype /></a>
          <nav className="nav__links" aria-label="Hauptnavigation">
            {navItems.map(([id, label]) => <a key={id} className={`nav__link${activeSection === id ? ' is-active' : ''}`} href={`#${id}`}>{label}</a>)}
            <a className="btn nav__cta nav__cta--catering" href="#catering">Catering</a>
            <a className="btn nav__cta" href="tel:+4319165156">Reservieren</a>
          </nav>
          <button className="nav__toggle" type="button" aria-expanded={menuOpen} aria-controls="navOverlay" aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} onClick={() => setMenuOpen(open => !open)}><span /><span /></button>
        </div>
      </header>

      <div className={`nav__overlay${menuOpen ? ' is-open' : ''}`} id="navOverlay" aria-hidden={!menuOpen}>
        {[['karte', 'Karte'], ['catering', 'Catering'], ['feiern', 'Feiern'], ['galerie', 'Galerie'], ['besuch', 'Besuch']].map(([id, label]) => (
          <a key={id} href={`#${id}`} onClick={() => setMenuOpen(false)}>{label}</a>
        ))}
      </div>

      <main id="main">
        <section className="hero" id="top" aria-label="go DC Tower — asiatische Küche im DC Tower Wien">
          <div className="hero__bg" ref={heroBgRef}><img src="/hero-steamer.jpg" alt="Frisch gedämpfte Teigtaschen im Bambuskorb" decoding="async" fetchPriority="high" /></div>
          <div className="hero__veil" aria-hidden="true" />
          <div className="hero__content">
            <span className="hero__eyebrow">DC Tower · Donau City · Wien</span>
            <h1 className="hero__wordmark">go dc tower <span className="hero__cn" aria-hidden="true">拉面</span></h1>
            <p className="hero__subline">Handgezogene Nudeln, Wok und Dim Sum. Mittags schnell, abends in Ruhe.</p>
            <div className="hero__cta"><a className="btn btn--filled" href={ORDER_URL} target="_blank" rel="noreferrer">Bestellen <span aria-hidden="true">↗</span></a><a className="btn btn--onDark" href="#catering">Catering</a></div>
          </div>
        </section>

        <section className="doors" aria-label="Direkt loslegen">
          <div className="doors__grid">
            <a className="door" href="#karte"><span className="door__fact">€ 15,60 – 18,90</span><h2>Karte &amp; bestellen</h2><p>Tageskarte fürs schnelle Mittagessen, Abendkarte mit den längeren Gerichten. Lieferung in ganz Wien.</p><span className="door__go">Zur Karte <span aria-hidden="true">→</span></span></a>
            <button className="door" type="button" onClick={openSheet}><span className="door__fact">Ab 8 Personen</span><h2>Catering fürs Büro</h2><p>Mittagessen für den Stock über uns, Buffet für die Firmenfeier. Im DC Tower liefern wir mit dem Lift.</p><span className="door__go">Anfragen <span aria-hidden="true">→</span></span></button>
            <a className="door" href="#feiern"><span className="door__fact">Bis 80 Gäste</span><h2>Feiern im Haus</h2><p>Private Lounge im ersten Stock, Vorderraum mit Bar im Erdgeschoss — oder das ganze Lokal exklusiv.</p><span className="door__go">Räume ansehen <span aria-hidden="true">→</span></span></a>
          </div>
        </section>

        <section className="section" id="karte" aria-labelledby="karteHeading">
          <span className="section__index" aria-hidden="true">01</span>
          <div className="shell">
            <div className="karte__head"><div><p className="section__label reveal">Die Karte</p><h2 className="section__heading reveal no-margin" id="karteHeading">Was heute<br />gut <em>läuft</em>.</h2></div><p className="section__intro reveal">Alles wird bestellt und dann gekocht — nicht vorbereitet und warmgehalten. Nudeln für La Mian ziehen wir von Hand, Dim Sum kommen frisch aus dem Bambuskorb.</p></div>
            <div className="dishes">{dishes.map(dish => <a className="dish reveal" key={dish.name} href={ORDER_URL} target="_blank" rel="noreferrer"><div className="dish__img"><img src={dish.image} alt={dish.alt} loading="lazy" /></div><div className="dish__body"><span className="dish__name">{dish.name}</span><span className="dish__price">{dish.price}</span></div><span className="dish__cat">{dish.category} {dish.extra && <em>{dish.extra}</em>}</span></a>)}</div>
            <p className="cats reveal">Nudelsuppen <i>·</i> La Mian <i>·</i> Dim Sum <i>·</i> Wok <i>·</i> Gebratene Nudeln <i>·</i> Reisschalen <i>·</i> Kokos-Curry <i>·</i> Go Pasta <i>·</i> Vorspeisen <i>·</i> Kindergerichte</p>
            <div className="karte__foot reveal"><div><p className="karte__price">Hauptgerichte <strong>€ 15,60 – 18,90</strong></p><div className="karte__pdfs"><a className="tlink" href="https://godctower.com/wp-content/uploads/2026/05/202605ramiengo_GO_tageskarte.pdf" target="_blank" rel="noreferrer">Tageskarte als PDF <span aria-hidden="true">↓</span></a><a className="tlink" href="https://godctower.com/wp-content/uploads/2026/05/ramiengo_DC_abendkarte_202605.pdf" target="_blank" rel="noreferrer">Abendkarte als PDF <span aria-hidden="true">↓</span></a></div></div><a className="btn btn--filled btn--lg" href={ORDER_URL} target="_blank" rel="noreferrer">Ganze Karte ansehen &amp; bestellen <span aria-hidden="true">↗</span></a></div>
          </div>
        </section>

        <div className="marquee" aria-hidden="true"><div className="marquee__track">{[0, 1].map(copy => <span className="marquee__group" key={copy}><span>Catering</span><span className="marquee__cn">鲜味</span><span>Firmenfeiern</span><span className="marquee__cn">拉面</span><span>Bis 80 Gäste</span><span className="marquee__cn">鲜味</span></span>)}</div></div>

        <section className="section section--dark" id="catering" aria-labelledby="cateringHeading">
          <span className="section__index" aria-hidden="true">02</span>
          <div className="shell"><div className="catering__head"><p className="section__label reveal">Catering</p><h2 className="section__heading reveal" id="cateringHeading">Wir kommen<br />zu <em>euch</em>.</h2><p className="section__intro reveal">Mittagessen für den Stock über uns, Buffet für die Firmenfeier, Fingerfood für die Eröffnung. Warm oder kalt, geliefert oder abgeholt.</p></div>
            <div className="pkg">{packages.map(item => <div className="pkg__item reveal" key={item.title}><h3>{item.title}</h3><p className="pkg__desc">{item.description}</p><dl className="pkg__specs">{item.specs.map(([term, value]) => <div className="pkg__spec" key={term}><dt>{term}</dt><dd>{value}</dd></div>)}</dl></div>)}</div>
            <div className="catering__cta reveal"><button className="btn btn--filled btn--lg" type="button" onClick={openSheet}>Catering anfragen</button><p className="catering__note">Drei Angaben genügen für den Start — wir melden uns mit einem Vorschlag zurück.</p></div>
          </div>
        </section>

        <section className="section" id="feiern" aria-labelledby="feiernHeading">
          <span className="section__index" aria-hidden="true">03</span>
          <div className="shell"><p className="section__label reveal">Feiern im Haus</p><h2 className="section__heading reveal" id="feiernHeading">Oder ihr kommt <em>zu uns</em>.</h2><p className="section__intro reveal">Zwei Räume, getrennt oder gemeinsam buchbar. Menü, Buffet oder Fingerfood — tagsüber wie abends.</p><div className="rooms">{rooms.map(room => <div className="room reveal" key={room.title}><span className="room__num">{room.number}<small>{room.suffix}</small></span><h3>{room.title}</h3><p>{room.copy}</p></div>)}</div><div className="visit__cta section-cta reveal"><a className="btn btn--filled" href="tel:+4319165156">+43 1 9165156</a><a className="btn" href="mailto:info@godctower.com?subject=Anfrage%20Feiern%20im%20go%20DC%20Tower">Anfrage per Mail</a></div></div>
        </section>

        <section className="gallery" id="galerie" aria-labelledby="galerieHeading">
          <span className="section__index" aria-hidden="true">04</span>
          <div className="gallery__head"><div><p className="section__label reveal">Eindrücke</p><h2 className="section__heading reveal no-margin" id="galerieHeading">Aus Küche<br />und Lokal.</h2></div><p className="gallery__hint reveal"><i /> Seitlich scrollen</p></div>
          <div className="filmstrip" ref={filmstripRef} tabIndex={0} role="region" aria-label="Bildergalerie — horizontal scrollbar" onPointerDown={pointerDown} onPointerMove={pointerMove} onPointerUp={pointerRelease} onPointerCancel={pointerRelease} onWheel={wheelFilmstrip}>{gallery.map(([image, alt, caption]) => <figure key={image}><img src={image} alt={alt} loading="lazy" draggable={false} /><figcaption>{caption}</figcaption></figure>)}</div>
        </section>

        <section className="section" id="besuch" aria-labelledby="besuchHeading">
          <span className="section__index" aria-hidden="true">05</span>
          <div className="shell"><div className="visit__grid"><div><p className="section__label reveal">Besuch</p><h2 className="section__heading reveal" id="besuchHeading">Donau City,<br />Erdgeschoss.</h2><div className="visit__parking reveal"><strong>Vergünstigt parken</strong><span>Als Gast des Restaurants parkt ihr direkt in der DC-Tower-Garage zum reduzierten Tarif. Ticket einfach mitbringen.</span></div><div className="visit__block reveal"><span className="visit__label">Adresse</span><address className="visit__address">DC Tower 1<br />Donau-City-Straße 7<br />1220 Wien</address></div><div className="visit__block reveal"><span className="visit__label">Öffnungszeiten</span><dl className="visit__hours"><div><dt>Montag — Freitag</dt><dd>11:00 – 22:00</dd></div><div><dt>Küche</dt><dd>bis 21:00</dd></div><div><dt>Sonntag</dt><dd>11:00 – 17:00</dd></div><div className="is-closed"><dt>Samstag &amp; Feiertag</dt><dd>geschlossen</dd></div></dl></div><div className="visit__block visit__contact reveal"><span className="visit__label">Kontakt</span><a href="tel:+4319165156">+43 1 9165156</a><a href="mailto:info@godctower.com">info@godctower.com</a></div><div className="visit__cta reveal"><a className="btn btn--filled" href="tel:+4319165156">Tisch reservieren</a><button className="btn" type="button" onClick={openSheet}>Catering anfragen</button></div></div>
            <figure className="photo visit__figure reveal"><img src="/hero-restaurant.jpg" alt="Der Gastraum des go DC Tower mit Fensterfront" loading="lazy" /><a className="visit__maplink" href="https://maps.google.com/?q=Donau-City-Stra%C3%9Fe+7,+1220+Wien" target="_blank" rel="noreferrer"><span>Auf Google Maps ansehen</span><span aria-hidden="true">↗</span></a></figure></div></div>
        </section>
      </main>

      <footer className="footer"><div className="shell"><div className="footer__grid"><div><Logotype /><p className="footer__tagline">Frische asiatische Küche im DC Tower, Donau City Wien.</p></div><div><span className="footer__title">Seite</span><ul className="footer__links"><li><a href="#karte">Karte &amp; bestellen</a></li><li><a href="#catering">Catering</a></li><li><a href="#feiern">Feiern</a></li><li><a href="#galerie">Galerie</a></li><li><a href="#besuch">Besuch</a></li></ul><ul className="footer__links footer__legal"><li><a href="#">Impressum</a></li><li><a href="#">Datenschutz</a></li></ul></div><div><span className="footer__title">Folgen</span><div className="footer__social"><a href="https://www.instagram.com/godctower/" target="_blank" rel="noreferrer" aria-label="Instagram">ig</a><a href="https://www.facebook.com/godctower" target="_blank" rel="noreferrer" aria-label="Facebook">f</a></div><span className="footer__title">Bestellen</span><ul className="footer__links"><li><a href={ORDER_URL} target="_blank" rel="noreferrer">Online bestellen ↗</a></li></ul></div></div><div className="footer__bar"><span>© 2026 go DC Tower · Donau-City-Straße 7, 1220 Wien</span><span>Gestaltung <a href="https://hango.at" target="_blank" rel="noreferrer">hango.at</a></span></div></div></footer>

      <div className={`sheet${sheetOpen ? ' is-open' : ''}`} role="dialog" aria-modal="true" aria-labelledby="sheetTitle" aria-hidden={!sheetOpen}><button className="sheet__scrim" type="button" onClick={() => setSheetOpen(false)} aria-label="Catering-Dialog schließen" /><div className="sheet__panel"><div className="sheet__head"><div><h2 id="sheetTitle">Catering anfragen</h2><p>Drei Angaben genügen. Wir melden uns innerhalb eines Werktags.</p></div><button className="sheet__close" type="button" onClick={() => setSheetOpen(false)} aria-label="Schließen">✕</button></div><div className="sheet__body"><form onSubmit={submitCatering}><div className="field"><label htmlFor="f-anlass">Anlass</label><select id="f-anlass" name="Anlass" required ref={firstSheetFieldRef}><option value="">Bitte wählen</option><option>Office Lunch</option><option>Firmenfeier</option><option>Private Feier</option><option>Empfang / Eröffnung</option><option>Anderes</option></select></div><div className="field--row"><div className="field"><label htmlFor="f-personen">Personen</label><input id="f-personen" name="Personen" type="number" min="1" inputMode="numeric" placeholder="z. B. 24" required /></div><div className="field"><label htmlFor="f-datum">Wunschdatum</label><input id="f-datum" name="Wunschdatum" type="date" required /></div></div><details className="more"><summary>Weitere Angaben (optional)</summary><div className="more__body"><div className="field"><label htmlFor="f-name">Name</label><input id="f-name" name="Name" type="text" autoComplete="name" /></div><div className="field"><label htmlFor="f-firma">Firma</label><input id="f-firma" name="Firma" type="text" autoComplete="organization" /></div><div className="field--row"><div className="field"><label htmlFor="f-mail">E-Mail</label><input id="f-mail" name="E-Mail" type="email" autoComplete="email" /></div><div className="field"><label htmlFor="f-tel">Telefon</label><input id="f-tel" name="Telefon" type="tel" autoComplete="tel" /></div></div><div className="field"><label htmlFor="f-nachricht">Nachricht</label><textarea id="f-nachricht" name="Nachricht" placeholder="Allergien, Wünsche, Uhrzeit …" /></div></div></details><button className="btn btn--filled sheet__submit" type="submit">Anfrage senden</button><p className="sheet__legal">Die Anfrage öffnet euer Mailprogramm mit einer vorbereiteten Nachricht an <a href="mailto:info@godctower.com">info@godctower.com</a>.</p></form></div></div></div>
    </>
  );
}
