'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState, type FormEvent } from 'react';
import { Icon } from '@/components/Icon';
import { CATERING, CONTACT, FORM } from '@/components/site-data';

type OfferId = (typeof CATERING)[number]['id'];
type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; summary: string } | { kind: 'mail' } | { kind: 'error' };

const LABELS: Record<string, string> = {
  angebot: 'Angebot', datum: 'Datum', uhrzeit: 'Uhrzeit', personen: 'Personen', ort: 'Ort / Adresse',
  wuensche: 'Wünsche', name: 'Name', firma: 'Firma', email: 'E-Mail', telefon: 'Telefon',
};

function asText(data: FormData) {
  return Object.keys(LABELS)
    .map((key) => [LABELS[key], String(data.get(key) ?? '').trim()] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

/**
 * Der Anfragezettel. Mit Access Key geht die Anfrage über Web3Forms als E-Mail an
 * das Haus; ohne Key öffnet sich eine vorausgefüllte E-Mail mit demselben Inhalt.
 */
export function CateringForm() {
  const [offer, setOffer] = useState<OfferId>('zuhause');
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [today, setToday] = useState('');

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('angebot');
    if (CATERING.some((c) => c.id === wanted)) setOffer(wanted as OfferId);
    setToday(new Date().toISOString().slice(0, 10));
  }, []);

  const current = CATERING.find((c) => c.id === offer)!;

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    data.set('angebot', current.title);
    const text = asText(data);
    const subject = `Anfrage: ${current.title}`;

    if (!FORM.accessKey) {
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(`Hallo liebes go-Team,\n\n${text}\n\nVielen Dank!`)}`;
      setState({ kind: 'mail' });
      return;
    }

    setState({ kind: 'sending' });
    try {
      const response = await fetch(FORM.endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          access_key: FORM.accessKey,
          subject,
          from_name: 'Website ra’mien go',
          replyto: data.get('email'),
          botcheck: data.get('botcheck'),
          message: text,
        }),
      });
      const result = await response.json();
      if (!response.ok || !result.success) throw new Error(result.message);
      setState({ kind: 'sent', summary: text });
    } catch {
      setState({ kind: 'error' });
    }
  }

  if (state.kind === 'sent') {
    return (
      <div className="order-slip is-stamped" role="status">
        <span className="stamp" aria-hidden="true"><Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} /></span>
        <h3>Danke, eure Anfrage ist bei uns.</h3>
        <p>Wir melden uns per E-Mail und bestätigen euch alles schriftlich.</p>
        <pre className="order-summary">{state.summary}</pre>
        <Link className="hc-text-link" href="/">Zurück zur Startseite <span className="hc-arrow" aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  const isEvent = offer === 'event';

  return (
    <form className="order-slip" onSubmit={submit} noValidate={false}>
      <fieldset className="order-offers">
        <legend>Was dürfen wir für euch machen?</legend>
        {CATERING.map((c) => (
          <label key={c.id} className="tick">
            <input type="radio" name="angebot-wahl" value={c.id} checked={offer === c.id} onChange={() => setOffer(c.id)} />
            <span className="tick-box" aria-hidden="true"><Icon name="check" size={16} /></span>
            <span><strong>{c.title}</strong><small>{c.fine}</small></span>
          </label>
        ))}
      </fieldset>

      <div className="order-fields">
        <label className="field"><span>Datum</span><input type="date" name="datum" required min={today || undefined} /></label>
        <label className="field"><span>Uhrzeit <em>optional</em></span><input type="time" name="uhrzeit" /></label>
        <label className={`field${isEvent ? ' field-wide' : ''}`}><span>Personen</span><input type="number" name="personen" required min={1} max={isEvent ? 80 : 500} inputMode="numeric" placeholder={isEvent ? 'bis 80' : 'z. B. 20'} /></label>
        {!isEvent && (
          <label className="field"><span>Ort / Adresse</span><input type="text" name="ort" required autoComplete="street-address" placeholder={offer === 'business' ? 'Firma, Straße, Stockwerk' : 'Straße, PLZ, Ort'} /></label>
        )}
        <label className="field field-wide"><span>Wünsche <em>optional</em></span><textarea name="wuensche" rows={4} placeholder="Anlass, Lieblingsgerichte, vegetarisch oder vegan, Allergien …" /></label>
        <label className="field"><span>Name</span><input type="text" name="name" required autoComplete="name" /></label>
        <label className="field"><span>Firma <em>optional</em></span><input type="text" name="firma" autoComplete="organization" /></label>
        <label className="field"><span>E-Mail</span><input type="email" name="email" required autoComplete="email" /></label>
        <label className="field"><span>Telefon</span><input type="tel" name="telefon" required autoComplete="tel" /></label>
      </div>
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} aria-hidden="true" />

      <label className="tick order-consent">
        <input type="checkbox" name="consent" required />
        <span className="tick-box" aria-hidden="true"><Icon name="check" size={16} /></span>
        <span>Ich bin einverstanden, dass ihr meine Angaben zur Bearbeitung der Anfrage nutzt. <Link href="/datenschutz/">Datenschutz</Link></span>
      </label>

      <div className="order-submit">
        <button type="submit" className="hx-btn hx-btn--solid" disabled={state.kind === 'sending'} aria-busy={state.kind === 'sending'}>
          {state.kind === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
        </button>
        <p>Unverbindlich. Ihr bekommt unsere Zusage schriftlich per E-Mail.</p>
      </div>

      {state.kind === 'mail' && (
        <p className="order-note" role="status">Euer E-Mail-Programm öffnet sich mit der fertigen Anfrage. Falls nicht, schreibt uns direkt an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
      )}
      {state.kind === 'error' && (
        <p className="order-note is-error" role="alert">Die Anfrage ist nicht angekommen. Bitte versucht es noch einmal oder schreibt uns an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
      )}
    </form>
  );
}
