'use client';

import { useEffect, type RefObject } from 'react';

/**
 * Dezente Scroll-Momente für die Startseite.
 * - [data-reveal="lines" | "curtain" | "fade"]: Einblenden, sobald das Element in den Bildschirm kommt.
 * - [data-parallax="0.1"]: leichte Verschiebung gegen die Scrollrichtung, höchstens ±40 px.
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
    let frame = 0;
    const update = () => {
      frame = 0;
      const mid = window.innerHeight / 2;
      layers.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.bottom < -200 || rect.top > window.innerHeight + 200) return;
        const factor = Number(el.dataset.parallax) || 0.1;
        const offset = Math.max(-40, Math.min(40, (rect.top + rect.height / 2 - mid) * -factor));
        el.style.transform = `translate3d(0, ${offset.toFixed(1)}px, 0) scale(1.1)`;
      });
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    if (layers.length) {
      update();
      window.addEventListener('scroll', onScroll, { passive: true });
      window.addEventListener('resize', onScroll, { passive: true });
    }

    return () => {
      reveal.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [rootRef]);
}
