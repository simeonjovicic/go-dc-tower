'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

/**
 * Short brand intro shown on every page load: the red roundel pops in,
 * the wordmark rises, a red line draws — then the overlay fades out.
 */
export function IntroLoader() {
  const [fading, setFading] = useState(false);
  const [hidden, setHidden] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setHidden(true);
      return;
    }
    const t1 = setTimeout(() => setFading(true), 1350);
    const t2 = setTimeout(() => setHidden(true), 1950);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, []);

  if (hidden) return null;

  return (
    <div
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 18,
        background: 'var(--go-cream)',
        opacity: fading ? 0 : 1,
        transition: 'opacity 0.55s ease',
        pointerEvents: 'none',
      }}
    >
      <Image
        src="/go-dc-tower-logo.png"
        alt=""
        width={706}
        height={706}
        priority
        style={{
          width: 88,
          height: 88,
          animation: 'introPop 0.7s cubic-bezier(.2,.7,.2,1) both',
        }}
      />
      <div
        style={{
          fontFamily: 'var(--font-saira)',
          fontWeight: 800,
          fontSize: 15,
          letterSpacing: '0.24em',
          textTransform: 'uppercase',
          color: 'var(--go-ink)',
          animation: 'floatUp 0.6s 0.3s cubic-bezier(.2,.7,.2,1) both',
        }}
      >
        go DC Tower
      </div>
      <span
        style={{
          width: 72,
          height: 3,
          background: 'var(--go-red)',
          borderRadius: 2,
          transformOrigin: 'left',
          animation: 'introLine 0.7s 0.5s cubic-bezier(.2,.7,.2,1) both',
        }}
      />
    </div>
  );
}
