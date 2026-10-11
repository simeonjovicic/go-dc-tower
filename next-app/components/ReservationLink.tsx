'use client';

import { useEffect, useState, type ReactNode } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { GLORIAFOOD } from '@/components/site-data';

export function ReservationLink({ className, children, onNavigate }: {
  className?: string;
  children: ReactNode;
  onNavigate?: () => void;
}) {
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const reset = () => setLoading(false);
    window.addEventListener('pageshow', reset);
    return () => window.removeEventListener('pageshow', reset);
  }, []);

  return <>
    <a className={className} href={GLORIAFOOD.reservationUrl} onClick={(event) => {
      if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey || event.button !== 0) return;
      onNavigate?.();
      setLoading(true);
    }}>{children}</a>
    {loading && createPortal(
      <div className="hc-page hc-reservation-loading" role="status" aria-live="polite">
        <Image src="/go-dc-tower-logo.png" alt="ra’mien go DC Tower" width={706} height={706} className="hc-reservation-logo" priority />
        <span className="hc-reservation-spinner" aria-hidden="true" />
        <p>Reservierung wird geöffnet …</p>
        <a href={GLORIAFOOD.reservationUrl}>Direkt zur Reservierung</a>
      </div>, document.body,
    )}
  </>;
}
