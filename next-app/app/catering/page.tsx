import type { Metadata } from 'next';
import { CateringForm } from '@/components/CateringForm';
import { PhotoHero } from '@/components/PhotoHero';
import { CateringOffers } from '@/components/CateringOffers';
import { HcFooter } from '@/components/HcChrome';
import { SiteHeader } from '@/components/SiteHeader';
import { CONTACT, KAPAZITAET } from '@/components/site-data';

export const metadata: Metadata = {
  title: "Catering & Events — ra'mien go DC Tower",
  description: 'Catering für zu Hause oder deine Wunschlocation, Business Lunch ins Büro und Events im ra’mien go DC Tower. Jetzt unverbindlich anfragen.',
};

export default function CateringPage() {
  return (
    <div className="hc-page hc-sub-page hx-sub">
      <a className="hc-skip-link" href="#anfrage">Zum Formular springen</a>
      <SiteHeader current="/catering" solid />
      <main id="main">
        <PhotoHero id="catering-title" img="/foto/leben/tafel-haende.webp" alt="Viele Hände teilen sich asiatische Gerichte an einer gedeckten Tafel"
          eyebrow="Catering & Events" title={['Mehr Leute.', 'Mehr zu teilen.']}
          lead="Wir liefern Sharing-Buffets und Lunchboxen zu euch oder richten eure Feier bei uns im Restaurant aus.">
          <a className="hx-btn hx-btn--solid" href="#anfrage">Jetzt anfragen <span aria-hidden="true">↓</span></a>
        </PhotoHero>

        <CateringOffers />

        <section className="hx-shell hx-request" id="anfrage" aria-labelledby="anfrage-title">
          <div className="hx-request-aside">
            <p className="hc-eyebrow hx-catering-eyebrow">Anfrage</p>
            <h2 id="anfrage-title" className="hx-title hx-title--small">Erzählt uns von eurem Anlass.</h2>
            <p>Vier kurze Schritte, dann melden wir uns. Unsere Zusage bekommt ihr schriftlich per E-Mail.</p>
            <dl>
              <div><dt>Im Restaurant</dt><dd>Erdgeschoss bis {KAPAZITAET.erdgeschoss.gruppe} Personen, Obergeschoss bis {KAPAZITAET.obergeschoss.event} (geschlossene Gesellschaft)</dd></div>
              <div><dt>Lieferung</dt><dd>Ohne Service-Personal vor Ort</dd></div>
              <div><dt>Lieber direkt?</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a> · <a href={CONTACT.phoneHref}>{CONTACT.phone}</a></dd></div>
            </dl>
          </div>
          <CateringForm />
        </section>
      </main>
      <HcFooter />
    </div>
  );
}
