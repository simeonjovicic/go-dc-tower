import type { Metadata } from 'next';
import Image from 'next/image';
import { CateringForm } from '@/components/CateringForm';
import { HcFooter, HcHeader } from '@/components/HcChrome';
import { CATERING, CONTACT, KAPAZITAET } from '@/components/site-data';

export const metadata: Metadata = {
  title: "Catering & Events — ra'mien go DC Tower",
  description: 'Catering für zu Hause oder deine Wunschlocation, Business Lunch ins Büro und Events im ra’mien go DC Tower. Jetzt unverbindlich anfragen.',
};

export default function CateringPage() {
  return (
    <div className="hc-page hc-sub-page">
      <a className="hc-skip-link" href="#anfrage">Zum Formular springen</a>
      <HcHeader current="/catering" />
      <main id="main">
        <section className="hc-page-head">
          <p className="hc-eyebrow">Feiern &amp; Catering</p>
          <h1 className="hc-display">Mehr Leute.<br /><i>Mehr zu teilen.</i></h1>
          <p>Wir liefern Sharing-Buffets und Lunchboxen zu euch oder richten eure Feier bei uns im Restaurant aus.</p>
        </section>

        <div className="hc-catering-list hc-catering-list--page">
          {CATERING.map((item) => (
            <article className="hc-catering-item" key={item.id}>
              <div className="hc-catering-media"><Image src={item.img} alt={item.alt} fill sizes="(max-width: 760px) calc(100vw - 40px), 31vw" /></div>
              <small>{item.label}</small><h2 className="hc-catering-title">{item.title}</h2><p>{item.text}</p><p className="hc-catering-fine">{item.fine}</p>
            </article>
          ))}
        </div>

        <section className="hc-order" id="anfrage" aria-labelledby="anfrage-title">
          <div className="hc-order-aside">
            <p className="hc-eyebrow">Anfrage</p>
            <h2 id="anfrage-title" className="hc-display">Erzählt uns <i>von eurem Anlass.</i></h2>
            <p>Je genauer Datum, Personenzahl und Ort, desto schneller können wir zusagen. Unsere Zusage bekommt ihr schriftlich per E-Mail.</p>
            <dl>
              <div><dt>Im Restaurant</dt><dd>Erdgeschoss bis {KAPAZITAET.erdgeschoss.gruppe} Personen, Obergeschoss bis {KAPAZITAET.obergeschoss.plaetze}</dd></div>
              <div><dt>Lieferung</dt><dd>Ohne Service-Personal vor Ort</dd></div>
              <div><dt>Lieber direkt?</dt><dd><a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a></dd></div>
            </dl>
          </div>
          <CateringForm />
        </section>
      </main>
      <HcFooter />
    </div>
  );
}
