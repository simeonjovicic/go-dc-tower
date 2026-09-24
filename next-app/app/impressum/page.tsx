import type { Metadata } from 'next';
import { HcHeader, HcFooter } from '@/components/HcChrome';
import { BRAND, CONTACT, LEGAL } from '@/components/site-data';

export const metadata: Metadata = {
  title: `Impressum — ${BRAND.name} ${BRAND.place}`,
  description: `Impressum und Offenlegung gemäß § 5 ECG und § 25 MedienG für ${LEGAL.company}.`,
};

const ROWS: { label: string; value: React.ReactNode }[] = [
  { label: 'Unternehmen', value: LEGAL.company },
  {
    label: 'Anschrift',
    value: (
      <>
        {CONTACT.street}, {CONTACT.building}
        <br />
        {CONTACT.zip} {CONTACT.city}, Österreich
      </>
    ),
  },
  { label: 'Unternehmensgegenstand', value: LEGAL.gegenstand },
  { label: 'Geschäftsführung', value: LEGAL.gf },
  { label: 'Firmenbuchnummer', value: LEGAL.fn },
  { label: 'Firmenbuchgericht', value: LEGAL.court },
  { label: 'UID-Nummer', value: LEGAL.uid },
  { label: 'Aufsichtsbehörde', value: LEGAL.behoerde },
  { label: 'Kammerzugehörigkeit', value: LEGAL.kammer },
  {
    label: 'Kontakt',
    value: (
      <>
        <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        <br />
        <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
      </>
    ),
  },
];

export default function ImpressumPage() {
  return (
    <div className="hc-page hc-sub-page">
      <HcHeader />

      <main id="main">
        <section className="hc-menu-head">
          <div className="hc-menu-head-shell">
            <p className="hc-eyebrow">Offenlegung</p>
            <h1 className="hc-display">
              Impressum<i>.</i>
            </h1>
            <p className="hc-menu-intro">
              Angaben gemäß § 5 E-Commerce-Gesetz und § 25 Mediengesetz.
            </p>
          </div>
        </section>

        <section className="hc-legal">
          <div className="hc-menu-cat-shell">
            <dl className="hc-legal-list">
              {ROWS.map((row) => (
                <div key={row.label}>
                  <dt>{row.label}</dt>
                  <dd>{row.value}</dd>
                </div>
              ))}
            </dl>

            <h2>Verbraucherstreitbeilegung</h2>
            <p>
              Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren vor einer
              Verbraucherschlichtungsstelle teilzunehmen. Bei Anliegen wendet euch bitte direkt an
              uns — telefonisch unter <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> oder per Mail
              an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.
            </p>

            <h2>Haftung für Inhalte</h2>
            <p>
              Die Inhalte dieser Seite werden mit Sorgfalt erstellt. Für die Richtigkeit,
              Vollständigkeit und Aktualität können wir keine Gewähr übernehmen. Für die Inhalte
              verlinkter externer Seiten sind ausschließlich deren Betreiber verantwortlich.
            </p>

            <h2>Bildrechte</h2>
            <p>
              Sämtliche Aufnahmen des Restaurants, der Räume und der Gerichte stammen aus eigenen
              Fotoproduktionen des Hauses.
            </p>
          </div>
        </section>
      </main>

      <HcFooter />
    </div>
  );
}
