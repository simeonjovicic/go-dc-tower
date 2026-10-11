'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Gemeinsamer Takt für alle Scroll-Effekte der Startseite: pro Frame laufen erst alle Lese-,
 * dann alle Schreibschritte. Lesen (getBoundingClientRect, offsetHeight) nach einem Schreiben
 * (Styles, Klassen) zwingt den Browser jedes Mal zu einer neuen Layout-Berechnung; mit acht
 * einzelnen Handlern passierte das pro Frame mehrfach und ließ das Scrollen ruckeln.
 */
type ScrollJob = { read: () => void; write: () => void };
const jobs = new Set<ScrollJob>();
let frame = 0;
const runFrame = () => {
  frame = 0;
  const list = [...jobs];
  list.forEach((job) => job.read());
  list.forEach((job) => job.write());
};
/** Plant einen Frame, z. B. wenn ein Schreibschritt das Layout für den nächsten Lesevorgang ändert. */
export const requestScrollFrame = () => { if (!frame) frame = requestAnimationFrame(runFrame); };

/** Meldet einen Effekt am gemeinsamen Takt an (läuft sofort einmal); die Rückgabe meldet ihn wieder ab. */
export function onScrollFrame(read: () => void, write: () => void) {
  const job = { read, write };
  if (!jobs.size) {
    window.addEventListener('scroll', requestScrollFrame, { passive: true });
    window.addEventListener('resize', requestScrollFrame, { passive: true });
  }
  jobs.add(job);
  read();
  write();
  return () => {
    jobs.delete(job);
    if (jobs.size) return;
    window.removeEventListener('scroll', requestScrollFrame);
    window.removeEventListener('resize', requestScrollFrame);
    if (frame) { cancelAnimationFrame(frame); frame = 0; }
  };
}

/**
 * Dezente Scroll-Momente für die Startseite.
 * - [data-reveal="lines" | "curtain" | "fade"]: Einblenden, sobald das Element in den Bildschirm kommt.
 * - [data-parallax="0.1"]: leichte Verschiebung gegen die Scrollrichtung, höchstens ±40 px
 *   (oder ±[data-parallax-max] px für stärkere Ebenen).
 * Inhalte sind ohne JS sichtbar; nur Elemente unterhalb des ersten Bildschirms bekommen einen Auftritt.
 * Bei „Bewegung reduzieren“ passiert nichts.
 */
export function useScrollMotion(rootRef: RefObject<HTMLElement | null>) {
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    // Ein „Vorhang“ ist per clip-path unsichtbar und würde vom Observer nie als sichtbar gemeldet;
    // deshalb wird dort das Elternelement beobachtet.
    const targets = new Map<Element, HTMLElement[]>();
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        targets.get(entry.target)?.forEach((el) => el.classList.remove('is-pending'));
        targets.delete(entry.target);
        reveal.unobserve(entry.target);
      });
    }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });

    root.querySelectorAll<HTMLElement>('[data-reveal]').forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight * 0.92) {
        const watched = el.dataset.reveal === 'curtain' && el.parentElement ? el.parentElement : el;
        el.classList.add('is-pending');
        targets.set(watched, [...(targets.get(watched) ?? []), el]);
        reveal.observe(watched);
      }
    });

    const layers = [...root.querySelectorAll<HTMLElement>('[data-parallax]')];
    let offsets: [HTMLElement, number][] = [];
    const stop = layers.length ? onScrollFrame(() => {
      const mid = window.innerHeight / 2;
      offsets = [];
      layers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const factor = Number(el.dataset.parallax) || 0.1;
        const max = Number(el.dataset.parallaxMax) || 40;
        offsets.push([el, Math.max(-max, Math.min(max, (rect.top + rect.height / 2 - mid) * -factor))]);
      });
    }, () => {
      offsets.forEach(([el, offset]) => { el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.1)`; });
    }) : undefined;

    return () => {
      reveal.disconnect();
      stop?.();
    };
  }, [rootRef]);
}
