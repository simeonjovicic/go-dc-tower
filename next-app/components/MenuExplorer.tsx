'use client';

import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import {
  ALLERGENS, CATEGORIES, DISHES, DRINKS, EXTRAS, POKE_SAUCEN,
  ORDER_URL, TAG_LABEL, fmt, priceFrom, type CategoryId, type Dish,
} from '@/components/menu-data';
import { CONTACT } from '@/components/site-data';

type Selection = CategoryId | 'alle' | 'getraenke';

const SECTIONS: { id: Selection; label: string; short: string; intro?: string }[] = [
  { id: 'alle', label: 'Alle Gerichte', short: 'Alles' },
  { id: 'vorspeisen', label: 'Vorspeisen', short: 'Vorspeisen', intro: 'Etwas Kleines vorweg. Oder mehrere Teller für die ganze Runde.' },
  { id: 'gyoza', label: 'Gyoza', short: 'Gyoza', intro: 'Hausgemachte Teigtaschen. Wähle deine Füllung und die passende Portion.' },
  { id: 'nudelsuppen', label: 'Nudelsuppen', short: 'Nudelsuppen', intro: 'La Mien mit frisch gehobelten Weizennudeln oder Pho mit Reisbandnudeln. Die Einlage suchst du dir aus.' },
  { id: 'main', label: 'Wok & Reis', short: 'Wok & Reis', intro: 'Von knuspriger Ente bis Kokos-Curry. Hier findest du etwas für den großen Hunger.' },
  { id: 'poke', label: 'Poké Bowls', short: 'Bowls', intro: 'Sushi-Reis, Avocado, Gurke, Salat und Kräuter. Dazu dein Topping und eine Sauce nach Wahl.' },
  { id: 'sushi', label: 'Sushi', short: 'Sushi', intro: 'Unsere Auswahl wechselt. Die aktuelle Sushi-Karte und die Preise erfährst du bei uns im Restaurant.' },
  { id: 'kinder', label: 'Für Kinder', short: 'Für Kinder', intro: 'Kleine Portionen für unsere kleinen Gäste.' },
  { id: 'dessert', label: 'Dessert', short: 'Dessert', intro: 'Noch etwas Süßes zum Schluss?' },
  { id: 'getraenke', label: 'Getränke', short: 'Getränke' },
];

const PHOTO_NOTES: Record<string, string> = {
  lamien: 'Abbildung: mit Rind',
  'wok-nudeln': 'Abbildung: mit Rind',
  eierreis: 'Abbildung: mit Rind',
  'chili-basilikum': 'Abbildung: mit Rind',
  bulgogi: 'Abbildung: mit Rind',
};

const normalize = (value: string) => value.normalize('NFD').replace(/\p{M}/gu, '').toLowerCase();
const categoryName = (id: string) => SECTIONS.find((section) => section.id === id)?.label ?? id;
const dishName = (dish: Dish) => dish.cat === 'poke' ? 'Poké Bowl ' + dish.name : dish.cat === 'gyoza' ? 'Gyoza · ' + dish.name : dish.name;
const pricedDishes = DISHES.filter((dish) => !dish.priceOpen);

function searchText(dish: Dish) {
  return normalize([
    dish.name, dish.sub, dish.desc, categoryName(dish.cat), dish.cat,
    ...(dish.tags ?? []),
    ...(dish.variants ?? []).flatMap((variant) => [variant.label, ...(variant.tags ?? [])]),
  ].join(' '));
}

export function MenuExplorer() {
  // All sections remain available in the HTML before hydration.
  const [active, setActive] = useState<Selection>('alle');
  const [query, setQuery] = useState('');
  const [expandedDish, setExpandedDish] = useState<string | null>(null);
  const [anchor, setAnchor] = useState('');
  const resultsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const readLocation = () => {
      const hash = window.location.hash.slice(1);
      const dish = DISHES.find((item) => 'gericht-' + item.id === hash);
      const section = SECTIONS.find((item) => item.id === hash);
      if (hash === 'allergene') {
        setAnchor(hash);
        return;
      }
      if (hash && !dish && !section) return;
      setQuery('');
      setExpandedDish(dish?.id ?? null);
      if (dish) {
        setActive(dish.cat);
      } else if (section) {
        setActive(section.id);
      } else {
        setActive('vorspeisen');
      }
      setAnchor(dish || section ? hash : '');
    };
    readLocation();
    window.addEventListener('hashchange', readLocation);
    return () => window.removeEventListener('hashchange', readLocation);
  }, []);

  useEffect(() => {
    if (!anchor) return;
    const frame = requestAnimationFrame(() => {
      if (anchor === 'allergene') {
        const details = document.getElementById(anchor) as HTMLDetailsElement | null;
        if (details) details.open = true;
      }
      const target = SECTIONS.some((section) => section.id === anchor) ? resultsRef.current : document.getElementById(anchor);
      target?.scrollIntoView({ block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [active, expandedDish, anchor]);

  function chooseCategory(id: Selection) {
    setActive(id);
    setQuery('');
    setExpandedDish(null);
    if (window.location.hash !== '#' + id) window.history.pushState(null, '', '#' + id);
    setAnchor(id);
  }

  const terms = normalize(query.trim()).split(/\s+/).filter(Boolean);
  const searching = terms.length > 0;
  const matched = DISHES.filter((dish) => terms.every((term) => searchText(dish).includes(term)));
  const visible = matched.filter((dish) => searching || active === 'alle' || dish.cat === active);
  const drinkGroups = DRINKS.map((group) => ({
    ...group,
    items: group.items.filter((item) => terms.every((term) => normalize([group.group, item.name, item.detail, 'Getränke'].join(' ')).includes(term))),
  })).filter((group) => group.items.length > 0);
  const showDrinks = active === 'getraenke' || searching;
  const drinkCount = showDrinks ? drinkGroups.reduce((count, group) => count + group.items.length, 0) : 0;
  const showSushi = visible.some((dish) => dish.cat === 'sushi');
  const total = visible.filter((dish) => !dish.priceOpen).length + drinkCount;
  const groups = CATEGORIES.map((category) => ({
    ...category, dishes: visible.filter((dish) => dish.cat === category.id),
  })).filter((category) => category.dishes.length);
  const current = SECTIONS.find((section) => section.id === active)!;

  return (
    <div className="mc-layout">
      <aside className="mc-sidebar">
        <p className="mc-nav-label">Unsere Karte</p>
        <nav className="mc-categories" aria-label="Speisekategorien">
          {SECTIONS.map((section) => (
            <a key={section.id} href={'#' + section.id}
              aria-current={!searching && active === section.id ? 'true' : undefined}
              onClick={(event) => {
                if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
                event.preventDefault(); chooseCategory(section.id);
              }}>
              <span className="mc-category-full">{section.label}</span><span className="mc-category-short">{section.short}</span>
              <small>{section.id === 'sushi' ? '↗' : section.id === 'getraenke' ? DRINKS.reduce((n, group) => n + group.items.length, 0) : pricedDishes.filter((dish) => section.id === 'alle' || dish.cat === section.id).length}</small>
            </a>
          ))}
        </nav>
        <a className="mc-allergen-link" href="#allergene" onClick={() => {
          const details = document.getElementById('allergene') as HTMLDetailsElement | null;
          if (details) details.open = true;
        }}>Allergene &amp; Hinweise ↗</a>
      </aside>

      <div className="mc-content">
        <div className="mc-search" role="search">
          <svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none"><circle cx="10.5" cy="10.5" r="6.5" stroke="currentColor" strokeWidth="1.4" /><path d="m16 16 5 5" stroke="currentColor" strokeWidth="1.4" /></svg>
          <label className="mc-sr-only" htmlFor="menu-search">Speisekarte durchsuchen</label>
          <input id="menu-search" type="search" value={query} onChange={(event) => setQuery(event.target.value)}
            placeholder="Worauf hast du Lust? z. B. Ente, Gyoza, Tofu" autoComplete="off" />
          {query && <button type="button" aria-label="Suche zurücksetzen" onClick={() => setQuery('')}>×</button>}
        </div>

        <div className="mc-results" ref={resultsRef} id={searching ? 'suchergebnisse' : active === 'alle' ? 'alle' : undefined}>
          <div className="mc-results-head">
            <div><p className="mc-kicker">{searching ? 'In der ganzen Karte' : 'Frisch aus unserer Küche'}</p>
              <h2>{searching ? 'Deine Suche: ' + query.trim() : current.label}</h2></div>
            <span className="mc-count" role="status">{showSushi && total === 0 ? 'Nach Tagesangebot' : total + (searching ? ' Treffer' : active === 'getraenke' ? ' Getränke' : ' Gerichte')}{showSushi && total > 0 ? ' + Sushi' : ''}</span>
          </div>
          {!searching && current.intro && <p className="mc-intro">{current.intro}</p>}
          {total === 0 && !showSushi && <div className="mc-empty"><h3>Da haben wir gerade nichts gefunden.</h3><p>Versuch einen anderen Suchbegriff oder schau dir die ganze Karte an.</p><button type="button" onClick={() => chooseCategory('alle')}>Alle Gerichte ansehen <span aria-hidden="true">↗</span></button></div>}

          {groups.map((category) => (
            <section className="mc-section" id={category.id} key={category.id} aria-label={categoryName(category.id)}>
              {(searching || active === 'alle') && <h3 className="mc-group-title">{categoryName(category.id)}</h3>}
              {category.id === 'sushi' ? (
                <div className="mc-sushi">
                  <div className="mc-sushi-photo"><Image src="/foto/sushi/sushi-platte.webp" alt="Sushi-Auswahl im go DC Tower" fill sizes="(max-width: 760px) 90vw, 45vw" /></div>
                  <div><h3>Sushi nach Tagesangebot.</h3><p>Die aktuelle Auswahl und Preise erfährst du im Restaurant oder telefonisch. Wir helfen dir gerne bei der Auswahl.</p><a className="hc-text-link" href={CONTACT.phoneHref}>{CONTACT.phone} <span aria-hidden="true">↗</span></a></div>
                </div>
              ) : (
                <ul className="mc-dishes">
                  {category.dishes.map((dish) => <MenuDish dish={dish} key={dish.id} expandVariants={expandedDish === dish.id || (searching && terms.some((term) => term.length >= 3 && dish.variants?.some((variant) => normalize(variant.label).includes(term))))} />)}
                </ul>
              )}
              {category.id === 'poke' && <div className="mc-category-note"><strong>Deine Sauce dazu</strong><p>{POKE_SAUCEN.join(' · ')}</p></div>}
              {(category.id === 'main' || category.id === 'nudelsuppen') && <details className="mc-extras"><summary>Extras &amp; Beilagen <span aria-hidden="true">+</span></summary><ul>{EXTRAS.filter((extra) => category.id === 'nudelsuppen' || !extra.label.startsWith('Kokoscurry')).map((extra) => <li key={extra.label}><span>{extra.label}</span><span>€ {fmt(extra.price)}</span></li>)}</ul></details>}
            </section>
          ))}

          {showDrinks && drinkCount > 0 && <section id="getraenke" className="mc-section" aria-label="Getränke">
            {searching && <h3 className="mc-group-title">Getränke</h3>}
            <div className="mc-drinks">{drinkGroups.map((group) => <div key={group.group}><h3>{group.group}</h3><ul>{group.items.map((item) => <li key={item.name}><span><strong>{item.name}</strong>{item.detail && <small>{item.detail}</small>}</span><span className="mc-drink-price">€ {item.price}</span></li>)}</ul></div>)}</div>
          </section>}
        </div>

        <details className="mc-allergens" id="allergene">
          <summary>Allergene &amp; Hinweise <span aria-hidden="true">+</span></summary>
          <div><p>Die Allergenangaben findest du direkt beim jeweiligen Gericht. Bei Fragen zu Zutaten und Unverträglichkeiten hilft dir unser Team gerne weiter. Unsere Gerichte können Spuren anderer Stoffe enthalten, die in der Küche verwendet werden.</p>
            <ul>{Object.entries(ALLERGENS).map(([code, label]) => <li key={code}><b>{code}</b><span>{label}</span></li>)}</ul>
            <p>Alle Preise in Euro, inklusive aller Abgaben. Stand der Karte: 05/2026 · Lin &amp; Huang GmbH.</p>
          </div>
        </details>
      </div>
      <nav className="mc-mobile-switch" aria-label="Schnellzugriff zur Speisekarte">
        <div className="mc-mobile-category"><label htmlFor="menu-category">Kategorie</label><select id="menu-category" value={searching ? 'alle' : active} onChange={(event) => chooseCategory(event.target.value as Selection)}>{SECTIONS.map((section) => <option key={section.id} value={section.id}>{section.label}</option>)}</select></div>
        <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">Bestellen <span aria-hidden="true">↗</span></a>
      </nav>
    </div>
  );
}

function MenuDish({ dish, expandVariants }: { dish: Dish; expandVariants: boolean }) {
  const [open, setOpen] = useState(expandVariants);
  useEffect(() => { setOpen(expandVariants); }, [expandVariants]);
  // The static export serves pre-sized thumbnails for the compact menu rows.
  const photo = dish.img?.replace('/gericht-enhanced/', '/gericht-enhanced/thumbs/');
  const variants = dish.variants ?? [];
  const from = priceFrom(dish);
  const codes = [...new Set([dish.allergens ?? '', ...variants.map((variant) => variant.allergens ?? '')].join('').split(''))];
  return (
    <li className={'mc-dish' + (dish.img ? ' has-photo' : '')} id={'gericht-' + dish.id}>
      <div className="mc-dish-overview">
        {dish.img && <div className="mc-dish-photo"><Image src={photo!} alt={dishName(dish)} fill sizes="(max-width: 760px) 120px, 160px" />{PHOTO_NOTES[dish.id] && <small>{PHOTO_NOTES[dish.id]}</small>}</div>}
        <div className="mc-dish-copy">
          <div className="mc-dish-title"><h3>{dishName(dish)}</h3><span className="mc-price">{variants.length > 0 ? <small>ab </small> : null}{from === null ? 'auf Anfrage' : '€ ' + fmt(from)}</span></div>
          {dish.sub && /^\d+\s*Stk/.test(dish.sub) && <p className="mc-portion">{dish.sub}</p>}
          {dish.desc && <p className="mc-dish-description">{dish.desc}</p>}
          {dish.tags?.length ? <div className="mc-tags">{dish.tags.map((tag) => <span key={tag} className={'mc-tag mc-tag--' + tag}>{TAG_LABEL[tag]}</span>)}</div> : null}
          {variants.length > 0 && <button className="mc-variant-toggle" type="button" aria-expanded={open} aria-controls={'varianten-' + dish.id} onClick={() => setOpen(!open)}>
            {open ? 'Varianten schließen' : variants.length + ' Varianten & Preise'}<span aria-hidden="true">{open ? '−' : '+'}</span>
          </button>}
        </div>
      </div>
      {variants.length > 0 && <ul className="mc-variants" id={'varianten-' + dish.id} hidden={!open}>{variants.map((variant) => <li key={variant.label}><span>{variant.label}{variant.tags?.map((tag) => <small className={'mc-tag mc-tag--' + tag} key={tag}>{TAG_LABEL[tag]}</small>)}{variant.allergens && <small className="mc-variant-allergens" title={variant.allergens.split('').map((code) => ALLERGENS[code] ?? code).join(', ')}>{variant.allergens}</small>}</span><span>€ {fmt(variant.price)}</span></li>)}</ul>}
      {codes.length > 0 && <details className="mc-dish-allergens"><summary>Allergene <span aria-hidden="true">+</span></summary><p>{variants.length > 0 ? 'Je nach Variante: ' : ''}{codes.map((code) => code + ': ' + (ALLERGENS[code] ?? code)).join(' · ')}</p></details>}
    </li>
  );
}
