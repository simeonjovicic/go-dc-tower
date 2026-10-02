'use client';

import { useRef, type ReactNode } from 'react';
import { GLORIAFOOD } from '@/components/site-data';

let requested = false;

/** Lädt das GloriaFood-Skript einmalig, erst wenn ein Gast eine Aktion ansteuert. */
function loadWidget() {
  if (requested) return;
  requested = true;
  const script = document.createElement('script');
  script.src = GLORIAFOOD.script;
  script.async = true;
  document.head.appendChild(script);
}

/**
 * Reservieren- oder Bestellen-Knopf. Das Widget hängt sich an `.glf-button`
 * und öffnet sein Overlay selbst; übernimmt es nicht, öffnet sich die Seite des Anbieters.
 */
export function GlfButton({ kind, className, children }: {
  kind: 'reservation' | 'order';
  className?: string;
  children: ReactNode;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const attached = () => Boolean(ref.current && /^glfButton/.test(ref.current.id));

  const open = () => {
    if (attached()) return;
    loadWidget();
    window.setTimeout(() => {
      if (!attached()) window.open(GLORIAFOOD.fallback, '_blank', 'noopener');
    }, 1400);
  };

  return (
    <span
      ref={ref}
      role="button"
      tabIndex={0}
      className={`glf-button${kind === 'reservation' ? ' reservation' : ''} ${className ?? ''}`}
      data-glf-cuid={GLORIAFOOD.cuid}
      data-glf-ruid={GLORIAFOOD.ruid}
      {...(kind === 'reservation' ? { 'data-glf-reservation': 'true' } : {})}
      onPointerEnter={loadWidget}
      onFocus={loadWidget}
      onTouchStart={loadWidget}
      onClick={open}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          ref.current?.click();
        }
      }}
    >
      {children}
    </span>
  );
}
