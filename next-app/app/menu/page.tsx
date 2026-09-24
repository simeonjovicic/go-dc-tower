import type { Metadata } from 'next';
import Image from 'next/image';
import { HcHeader, HcFooter } from '@/components/HcChrome';
import {
  ALLERGENS,
  CATEGORIES,
  DRINKS,
  EXTRAS,
  ORDER_URL,
  POKE_SAUCEN,
  TAG_LABEL,
  dishesOf,
  fmt,
  type Dish,
} from '@/components/menu-data';
import { BRAND, CONTACT } from '@/components/site-data';

export const metadata: Metadata = {
  title: `Speisekarte — ${BRAND.name} ${BRAND.place}`,
  description:
    'Die ganze Karte: La Mien und Pho, hausgemachte Gyoza, Wok- und Reisgerichte, Poké Bowls, Vorspeisen und Dessert. Frisch gekocht im Erdgeschoß des DC Tower.',
};

export default function MenuPage() {
  return (
    <div className="hc-page hc-sub-page">
      <HcHeader current="/menu" />

      <main id="main">
        <section className="hc-menu-head">
          <div className="hc-menu-head-shell">
            <p className="hc-eyebrow">Abendküche</p>
            <h1 className="hc-display">
              Die ganze <i>Karte.</i>
            </h1>
            <p className="hc-menu-intro">
              Alle Preise in Euro, inklusive aller Abgaben. Die Buchstaben hinter den Gerichten sind
              die gesetzlichen Allergenkennzeichnungen — die Auflösung steht am Ende der Seite.
            </p>
            <div className="hc-menu-actions">
              <a
                className="hc-button-dark"
                href={ORDER_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                Online bestellen <span>↗</span>
              </a>
              <a className="hc-text-link" href={CONTACT.phoneHref}>
                Oder anrufen: {CONTACT.phone}
              </a>
            </div>

            <nav className="hc-menu-nav" aria-label="Kategorien">
              {CATEGORIES.map((c) => (
                <a key={c.id} href={`#${c.id}`}>
                  {c.label}
                </a>
              ))}
              <a href="#getraenke">Getränke</a>
            </nav>
          </div>
        </section>

        {CATEGORIES.map((cat) => {
          const dishes = dishesOf(cat.id);
          if (!dishes.length) return null;
          return (
            <section className="hc-menu-cat" id={cat.id} key={cat.id}>
              <div className="hc-menu-cat-shell">
                <header className="hc-menu-cat-head">
                  <h2>{cat.label}</h2>
                  {cat.en ? <span>{cat.en}</span> : null}
                  {cat.intro ? <p>{cat.intro}</p> : null}
                </header>

                <ul className="hc-menu-list">
                  {dishes.map((dish) => (
                    <DishRow dish={dish} key={dish.id} />
                  ))}
                </ul>

                {cat.id === 'poke' ? (
                  <p className="hc-menu-note">
                    <strong>Saucen:</strong> {POKE_SAUCEN.join(' · ')}
                  </p>
                ) : null}

                {cat.id === 'main' ? (
                  <p className="hc-menu-note">
                    {EXTRAS.map((e) => `${e.label} € ${fmt(e.price)}`).join(' · ')}
                  </p>
                ) : null}

                {cat.id === 'sushi' ? (
                  <p className="hc-menu-note hc-menu-note--flag">
                    Unsere Sushi-Karte wechselt. Die aktuelle Auswahl und die Preise erfahrt ihr im
                    Restaurant oder telefonisch unter {CONTACT.phone}.
                  </p>
                ) : null}
              </div>
            </section>
          );
        })}

        <section className="hc-menu-cat" id="getraenke">
          <div className="hc-menu-cat-shell">
            <header className="hc-menu-cat-head">
              <h2>Getränke</h2>
              <span>drinks</span>
            </header>
            <div className="hc-drinks">
              {DRINKS.map((group) => (
                <div className="hc-drink-group" key={group.group}>
                  <h3>{group.group}</h3>
                  <ul>
                    {group.items.map((item) => (
                      <li key={item.name}>
                        <span className="hc-drink-name">
                          {item.name}
                          {item.detail ? <em>{item.detail}</em> : null}
                        </span>
                        <span className="hc-drink-price">{item.price}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="hc-menu-legend">
          <div className="hc-menu-cat-shell">
            <h2>Allergene</h2>
            <p>
              Unsere Mitarbeiter informieren euch gerne über allergene Zutaten in unserem Speisen-
              und Getränkeangebot. Die Kennzeichnung der 14 Hauptallergene erfolgt entsprechend der
              EU-Lebensmittelinformationsverordnung 1169/2011. Trotz sorgfältiger Herstellung können
              unsere Gerichte Spuren anderer Stoffe enthalten, die im Produktionsprozess in der
              Küche verwendet werden.
            </p>
            <ul>
              {Object.entries(ALLERGENS).map(([code, label]) => (
                <li key={code}>
                  <b>{code}</b> {label}
                </li>
              ))}
            </ul>
            <p className="hc-menu-source">
              Stand der Karte: 05/2026 · alle Preise in Euro, inkl. aller Abgaben · Lin &amp; Huang
              GmbH
            </p>
          </div>
        </section>
      </main>

      <HcFooter />
    </div>
  );
}

function DishRow({ dish }: { dish: Dish }) {
  const hasVariants = Boolean(dish.variants?.length);

  return (
    <li className={`hc-menu-item${dish.img ? ' has-photo' : ''}`}>
      {dish.img ? (
        <div className="hc-menu-photo">
          <Image src={dish.img} alt={dish.name} fill sizes="120px" />
        </div>
      ) : null}

      <div className="hc-menu-body">
        <div className="hc-menu-line">
          <h3>
            {dish.name}
            {dish.sub ? <span className="hc-menu-sub">{dish.sub}</span> : null}
            {dish.allergens ? <sup className="hc-menu-allergen">{dish.allergens}</sup> : null}
            {dish.tags?.map((t) => (
              <span className={`hc-menu-tag hc-menu-tag--${t}`} key={t}>
                {TAG_LABEL[t]}
              </span>
            ))}
          </h3>
          {!hasVariants ? (
            <span className="hc-menu-price">
              {dish.priceOpen ? 'auf Anfrage' : typeof dish.price === 'number' ? fmt(dish.price) : ''}
            </span>
          ) : null}
        </div>

        {dish.desc ? <p className="hc-menu-desc">{dish.desc}</p> : null}

        {hasVariants ? (
          <ul className="hc-menu-variants">
            {dish.variants!.map((v) => (
              <li key={v.label}>
                <span>
                  {v.label}
                  {v.allergens ? <sup className="hc-menu-allergen">{v.allergens}</sup> : null}
                  {v.tags?.map((t) => (
                    <span className={`hc-menu-tag hc-menu-tag--${t}`} key={t}>
                      {TAG_LABEL[t]}
                    </span>
                  ))}
                </span>
                <span className="hc-menu-price">{fmt(v.price)}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </li>
  );
}
