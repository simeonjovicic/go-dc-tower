'use client';

import { Icon, type IconName } from '@/components/Icon';
import Link from 'next/link';
import { useEffect, useRef, useState, type FormEvent, type KeyboardEvent } from 'react';
import { CATERING, CONTACT, FORM, KAPAZITAET } from '@/components/site-data';

type OfferId = (typeof CATERING)[number]['id'];
type State = { kind: 'idle' } | { kind: 'sending' } | { kind: 'sent'; summary: string } | { kind: 'mail' } | { kind: 'error' };

const LABELS: Record<string, string> = {
  angebot: 'Angebot', datum: 'Datum', uhrzeit: 'Uhrzeit', personen: 'Personen', ort: 'Ort / Adresse',
  wuensche: 'Wünsche', name: 'Name', firma: 'Firma', email: 'E-Mail', telefon: 'Telefon',
};

const STEPS = ['Was dürfen wir für euch machen?', 'Wann und für wie viele?', 'Erzählt uns mehr.', 'Wie erreichen wir euch?'];
const OFFER_TITLES: Record<OfferId, string> = {
  business: 'Business Lunch',
  zuhause: 'Catering',
  event: 'Feiern',
};
const OFFER_DESCRIPTIONS: Record<OfferId, string> = {
  business: 'Für euer Team im Büro.',
  zuhause: 'An euren Wunschort geliefert.',
  event: 'Bei uns im Restaurant.',
};
const OFFER_ICONS: Record<OfferId, IconName> = { business: 'office', zuhause: 'bag', event: 'party' };

function asText(data: FormData) {
  return Object.keys(LABELS)
    .map((key) => [LABELS[key], String(data.get(key) ?? '').trim()] as const)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');
}

const isOffer = (value: unknown): value is OfferId => CATERING.some((c) => c.id === value);

/**
 * Die Anfrage in vier kurzen Schritten. Alle Schritte bleiben im Formular (nur verborgen),
 * damit beim Absenden alles beisammen ist. Mit Access Key geht die Anfrage über Web3Forms
 * als E-Mail an das Haus; ohne Key öffnet sich eine vorausgefüllte E-Mail mit demselben Inhalt.
 */
export function CateringForm() {
  const [offer, setOffer] = useState<OfferId | null>(null);
  const [step, setStep] = useState(0);
  const [state, setState] = useState<State>({ kind: 'idle' });
  const [today, setToday] = useState('');
  const steps = useRef<(HTMLFieldSetElement | null)[]>([]);
  const moved = useRef(false);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const form = formRef.current;
    if (!form) return;
    const offers = form.querySelector('.hx-wizard-offers');
    if (!offers) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      form.classList.add('is-visible');
      observer.disconnect();
    }, { threshold: .85, rootMargin: '-88px 0px -24px 0px' });
    observer.observe(offers);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const wanted = new URLSearchParams(window.location.search).get('angebot');
    if (isOffer(wanted)) { setOffer(wanted); setStep(1); }
    setToday(new Date().toISOString().slice(0, 10));
    const onOffer = (event: Event) => {
      const id = (event as CustomEvent).detail;
      if (!isOffer(id)) return;
      moved.current = true;
      setOffer(id);
      setStep(1);
    };
    window.addEventListener('catering:offer', onOffer);
    return () => window.removeEventListener('catering:offer', onOffer);
  }, []);

  // Nach einem Schrittwechsel: Fokus auf das erste Feld bzw. die Frage — nicht beim Laden der Seite.
  useEffect(() => {
    if (!moved.current) return;
    const current = steps.current[step];
    const target = current?.querySelector<HTMLElement>('input:not([type="hidden"]), textarea') ?? current?.querySelector<HTMLElement>('legend');
    target?.focus({ preventScroll: true });
  }, [step]);

  const current = CATERING.find((c) => c.id === offer);
  const isEvent = offer === 'event';

  function go(to: number) {
    moved.current = true;
    setStep(to);
  }

  function next() {
    const fields = steps.current[step]?.querySelectorAll<HTMLInputElement | HTMLTextAreaElement>('input, textarea') ?? [];
    for (const field of fields) {
      if (!field.checkValidity()) { field.reportValidity(); return; }
    }
    go(step + 1);
  }

  function choose(id: OfferId) {
    setOffer(id);
    go(1);
  }

  function onKeyDown(event: KeyboardEvent<HTMLFormElement>) {
    const target = event.target as HTMLElement;
    if (event.key === 'Enter' && target.tagName === 'INPUT' && step < STEPS.length - 1) {
      event.preventDefault();
      next();
    }
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!current) { go(0); return; }
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
      <div className="hx-wizard hx-wizard--done" role="status">
        <small className="hx-wizard-kicker">Anfrage gesendet</small>
        <h3 className="hx-wizard-question">Danke, eure Anfrage ist bei uns.</h3>
        <p className="hx-wizard-hint">Wir melden uns per E-Mail und bestätigen euch alles schriftlich.</p>
        <pre className="hx-wizard-summary">{state.summary}</pre>
        <Link className="hx-link" href="/">Zurück zur Startseite <span aria-hidden="true">↗</span></Link>
      </div>
    );
  }

  return (
    <form ref={formRef} className="hx-wizard" onSubmit={submit} onKeyDown={onKeyDown}>
      <div className="hx-wizard-top">
        <span className="hx-wizard-count" aria-live="polite">Schritt {step + 1} von {STEPS.length}</span>
        {current && step > 0 && (
          <span className="hx-wizard-chip">{current.title}<button type="button" onClick={() => go(0)}>ändern</button></span>
        )}
      </div>
      <div className="hx-wizard-bar" aria-hidden="true"><span style={{ transform: `scaleX(${(step + 1) / STEPS.length})` }} /></div>

      <fieldset ref={(el) => { steps.current[0] = el; }} className="hx-wizard-step" hidden={step !== 0}>
        <legend className="hx-wizard-question" tabIndex={-1}>{STEPS[0]}</legend>
        <p className="hx-wizard-selection-hint">Wählt ein Angebot aus, um fortzufahren.</p>
        <div className="hx-wizard-offers">
          {CATERING.map((c) => (
            <button key={c.id} type="button" className={`hx-wizard-offer hx-wizard-offer--${c.id}`} aria-label={`${c.title} auswählen`} onClick={() => choose(c.id)}>
              <Icon name={OFFER_ICONS[c.id]} size={40} className="hx-wizard-offer-icon" />
              <span className="hx-wizard-offer-text"><strong>{OFFER_TITLES[c.id]}</strong><small>{OFFER_DESCRIPTIONS[c.id]}</small></span>
              <span className="hx-wizard-offer-select" aria-hidden="true">Auswählen <svg viewBox="0 0 24 24" fill="none"><path d="M5 12h14m-6-6 6 6-6 6" /></svg></span>
            </button>
          ))}
        </div>
      </fieldset>

      <fieldset ref={(el) => { steps.current[1] = el; }} className="hx-wizard-step" hidden={step !== 1}>
        <legend className="hx-wizard-question" tabIndex={-1}>{STEPS[1]}</legend>
        <div className="hx-wizard-fields">
          <label className="hx-field"><span>Datum</span><input type="date" name="datum" required min={today || undefined} /></label>
          <label className="hx-field"><span>Uhrzeit <em>optional</em></span><input type="time" name="uhrzeit" /></label>
          <label className="hx-field hx-field--wide"><span>Personen</span>
            <input type="number" name="personen" required min={1} max={isEvent ? KAPAZITAET.erdgeschoss.gruppe : 500} inputMode="numeric" placeholder={isEvent ? `bis ${KAPAZITAET.erdgeschoss.gruppe}` : 'z. B. 20'} />
          </label>
        </div>
      </fieldset>

      <fieldset ref={(el) => { steps.current[2] = el; }} className="hx-wizard-step" hidden={step !== 2}>
        <legend className="hx-wizard-question" tabIndex={-1}>{STEPS[2]}</legend>
        <div className="hx-wizard-fields">
          {!isEvent && (
            <label className="hx-field hx-field--wide"><span>Ort / Adresse</span>
              <input type="text" name="ort" required autoComplete="street-address" placeholder={offer === 'business' ? 'Firma, Straße, Stockwerk' : 'Straße, PLZ, Ort'} />
            </label>
          )}
          <label className="hx-field hx-field--wide"><span>Wünsche <em>optional</em></span>
            <textarea name="wuensche" rows={3} placeholder="Anlass, Lieblingsgerichte, vegetarisch oder vegan, Allergien …" />
          </label>
        </div>
      </fieldset>

      <fieldset ref={(el) => { steps.current[3] = el; }} className="hx-wizard-step" hidden={step !== 3}>
        <legend className="hx-wizard-question" tabIndex={-1}>{STEPS[3]}</legend>
        <div className="hx-wizard-fields">
          <label className="hx-field"><span>Name</span><input type="text" name="name" required autoComplete="name" /></label>
          <label className="hx-field"><span>Firma <em>optional</em></span><input type="text" name="firma" autoComplete="organization" /></label>
          <label className="hx-field"><span>E-Mail</span><input type="email" name="email" required autoComplete="email" /></label>
          <label className="hx-field"><span>Telefon</span><input type="tel" name="telefon" required autoComplete="tel" /></label>
        </div>
        <label className="hx-wizard-consent">
          <input type="checkbox" name="consent" required />
          <span>Ich bin einverstanden, dass ihr meine Angaben zur Bearbeitung der Anfrage nutzt. <Link href="/datenschutz/">Datenschutz</Link></span>
        </label>
      </fieldset>
      <input type="checkbox" name="botcheck" className="visually-hidden" tabIndex={-1} aria-hidden="true" />

      <div className="hx-wizard-actions">
        {step > 0 ? <button type="button" className="hx-wizard-back" onClick={() => go(step - 1)}>← Zurück</button> : <span />}
        {step === 0 && <p className="hx-wizard-hint">Unverbindlich · Zusage schriftlich per E-Mail</p>}
        {step > 0 && step < STEPS.length - 1 && <button type="button" className="hx-btn hx-btn--solid" onClick={next}>Weiter</button>}
        {step === STEPS.length - 1 && (
          <button type="submit" className="hx-btn hx-btn--solid" disabled={state.kind === 'sending'} aria-busy={state.kind === 'sending'}>
            {state.kind === 'sending' ? 'Wird gesendet …' : 'Anfrage senden'}
          </button>
        )}
      </div>

      {state.kind === 'mail' && (
        <p className="hx-wizard-note" role="status">Euer E-Mail-Programm öffnet sich mit der fertigen Anfrage. Falls nicht, schreibt uns direkt an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
      )}
      {state.kind === 'error' && (
        <p className="hx-wizard-note is-error" role="alert">Die Anfrage ist nicht angekommen. Bitte versucht es noch einmal oder schreibt uns an <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>.</p>
      )}
    </form>
  );
}
