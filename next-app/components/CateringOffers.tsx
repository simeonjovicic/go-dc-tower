'use client';

import Image from 'next/image';
import { useRef, useState, type KeyboardEvent } from 'react';
import { CATERING } from '@/components/site-data';

type OfferId = (typeof CATERING)[number]['id'];

const TAB_LABEL: Record<OfferId, string> = {
  business: 'Business Lunch',
  zuhause: 'Zuhause & Wunschort',
  event: 'Event bei uns',
};

/** Gibt dem Anfrage-Dialog Bescheid, welches Angebot gewählt wurde, und scrollt hin. */
export function requestOffer(id: OfferId) {
  window.dispatchEvent(new CustomEvent('catering:offer', { detail: id }));
  document.getElementById('anfrage')?.scrollIntoView({ block: 'start' });
}

/** Die drei Angebote als Reiter über einem großen Bild; der Button öffnet den Anfrage-Dialog darunter. */
export function CateringOffers() {
  const [active, setActive] = useState(0);
  const [businessExpanded, setBusinessExpanded] = useState(false);
  const tabs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (event: KeyboardEvent) => {
    const step = event.key === 'ArrowRight' ? 1 : event.key === 'ArrowLeft' ? -1 : 0;
    if (!step) return;
    event.preventDefault();
    const next = (active + step + CATERING.length) % CATERING.length;
    setActive(next);
    tabs.current[next]?.focus();
  };

  return (
    <div className="hx-shell hx-lunch hx-offers" data-reveal="fade">
      <div className="hx-lunch-tabs" role="tablist" aria-label="Unsere Angebote" onKeyDown={onKey}>
        {CATERING.map((item, i) => (
          <button key={item.id} ref={(el) => { tabs.current[i] = el; }} type="button" role="tab" id={`offer-tab-${item.id}`}
            aria-selected={i === active} aria-controls={`offer-panel-${item.id}`} tabIndex={i === active ? 0 : -1}
            onClick={(event) => { setActive(i); event.currentTarget.scrollIntoView({ block: 'nearest', inline: 'nearest' }); }}>
            {TAB_LABEL[item.id]}
          </button>
        ))}
      </div>
      <div className="hx-lunch-stage">
        <div className="hx-lunch-photo">
          {CATERING.map((item, i) => (
            <Image key={item.id} src={item.img} alt={item.alt} fill sizes="(max-width: 900px) calc(100vw - 40px), 60vw" className={i === active ? 'is-active' : undefined} aria-hidden={i !== active} />
          ))}
        </div>
        <div className="hx-lunch-copy">
          {CATERING.map((item, i) => (
            <div key={item.id} role="tabpanel" id={`offer-panel-${item.id}`} aria-labelledby={`offer-tab-${item.id}`} hidden={i !== active}>
              <small className="hx-offer-label">{item.label}</small>
              <h3>{item.title}</h3>
              <div id={`offer-description-${item.id}`} className={item.id === 'business' ? `hx-offer-description${businessExpanded ? ' is-expanded' : ''}` : undefined}>
                <p>{item.text}</p>
                <p className="hx-offer-fine">{item.fine}</p>
              </div>
              {item.id === 'business' && (
                <button type="button" className="hx-offer-more" aria-expanded={businessExpanded} aria-controls={`offer-description-${item.id}`} onClick={() => setBusinessExpanded(!businessExpanded)}>
                  {businessExpanded ? 'Weniger anzeigen' : 'Mehr anzeigen'}
                </button>
              )}
              <div className="hx-lunch-actions">
                <button type="button" className="hx-btn hx-btn--solid" onClick={() => requestOffer(item.id)}>Dieses Angebot anfragen</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
