import type { Metadata } from 'next';
import { HcFooter, HcHeader } from '@/components/HcChrome';
import { CONTACT, LEGAL } from '@/components/site-data';

export const metadata: Metadata = {
  title: "Datenschutz — ra'mien go DC Tower",
  description: 'Datenschutzerklärung von ra’mien go DC Tower.',
  robots: { index: false },
};

/**
 * ENTWURF: Gerüst der Datenschutzerklärung. Vor dem Livegang rechtlich prüfen und
 * vervollständigen lassen (Hosting-Anbieter, Speicherdauer, Rechtsgrundlagen).
 */
export default function DatenschutzPage() {
  return (
    <div className="hc-page hc-sub-page">
      <HcHeader />
      <main id="main">
        <section className="hc-page-head">
          <p className="hc-eyebrow">Datenschutz</p>
          <h1 className="hc-display">Eure <i>Daten.</i></h1>
          <p>Welche Daten wir auf dieser Website verarbeiten und wofür.</p>
        </section>
        <div className="hc-legal-text">
          <h2>Verantwortlich</h2>
          <p>{LEGAL.company}, {CONTACT.street}, {CONTACT.zip} {CONTACT.city}. Kontakt: <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>, <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>.</p>

          <h2>Tischreservierung und Onlinebestellung</h2>
          <p>Für Reservierungen und Bestellungen nutzen wir den Dienst GloriaFood. Dessen Skript wird erst geladen, wenn ihr eine Reservierung oder Bestellung öffnet. Die Daten, die ihr dort eingebt, verarbeitet GloriaFood in unserem Auftrag.</p>

          <h2>Catering-Anfragen</h2>
          <p>Die Angaben aus dem Anfrageformular (Angebot, Datum, Personenzahl, Ort, Wünsche, Name, Firma, E-Mail, Telefon) erhalten wir per E-Mail über den Formular-Dienst Web3Forms. Wir nutzen sie nur, um eure Anfrage zu beantworten.</p>

          <h2>Newsletter</h2>
          <p>Wenn ihr euch für den Newsletter anmeldet, verwenden wir eure E-Mail-Adresse nur für den Versand. Ihr könnt euch jederzeit per E-Mail abmelden.</p>

          <h2>Video und Karten</h2>
          <p>Das Anfahrtsvideo liegt auf unserem eigenen Server. Der Link zu Google Maps öffnet die Seite von Google erst, wenn ihr ihn anklickt.</p>

          <h2>Eure Rechte</h2>
          <p>Ihr habt das Recht auf Auskunft, Berichtigung, Löschung, Einschränkung, Datenübertragbarkeit und Widerspruch. Beschwerden könnt ihr an die österreichische Datenschutzbehörde richten.</p>
        </div>
      </main>
      <HcFooter />
    </div>
  );
}
