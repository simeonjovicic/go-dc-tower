'use client';

import Image from 'next/image';
import { useRef, type ReactNode } from 'react';
import { useScrollMotion } from '@/components/useScrollMotion';

/**
 * Einstieg der Unterseiten: großes Foto mit Parallax, wie die Foto-Heros der Startseite.
 * `short` macht ihn niedriger, damit die Inhalte (z. B. die Speisekarte) schneller folgen.
 */
export function PhotoHero({ id, img, alt, eyebrow, title, lead, short = false, children }: {
  id: string;
  img: string;
  alt: string;
  eyebrow: string;
  title: [string, string];
  lead: ReactNode;
  short?: boolean;
  children?: ReactNode;
}) {
  const ref = useRef<HTMLElement>(null);
  useScrollMotion(ref);

  return (
    <section ref={ref} className={`hx-room-hero hx-sub-hero${short ? ' hx-sub-hero--short' : ''}`} aria-labelledby={id}>
      <div className="hx-parallax" data-parallax="0.35" data-parallax-max="160">
        <Image src={img} alt={alt} fill priority sizes="100vw" />
      </div>
      <div className="hx-shell hx-sub-hero-caption">
        <div>
          <p className="hc-eyebrow">{eyebrow}</p>
          <h1 id={id} className="hx-title hx-title--on-photo">{title[0]}<br />{title[1]}</h1>
        </div>
        <div className="hx-sub-hero-lead">
          <p>{lead}</p>
          {children}
        </div>
      </div>
    </section>
  );
}
