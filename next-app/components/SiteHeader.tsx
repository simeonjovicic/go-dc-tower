'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GlfButton } from '@/components/GloriaFood';
import { ReservationLink } from '@/components/ReservationLink';
import { BRAND, CONTACT, GLORIAFOOD } from '@/components/site-data';

const MOBILE_LINKS = [
  ['#raum', 'Restaurant'], ['/menu', 'Speisekarte'], ['/catering', 'Feiern & Catering'],
  [GLORIAFOOD.reservationUrl, 'Tisch reservieren'], ['#kontakt', 'Kontakt'],
] as const;

/**
 * Die Navigation aller Seiten: Links und Logo mittig, rechts „Tisch reservieren“, transparent über
 * dem Foto und fest, sobald gescrollt wird; auf dem Handy ein Menü-Icon mit Vollbild-Panel.
 * Auf Unterseiten (`home` false) zeigen die Anker zurück auf die Startseite.
 * `solid`: von Anfang an mit dunklem Balken (alle Unterseiten), plus Platzhalter darunter;
 * nur die Startseite startet transparent über dem Hero.
 */
export function SiteHeader({ home = false, current, solid = false, onMenuChange }: {
  home?: boolean;
  current?: string;
  solid?: boolean;
  onMenuChange?: (open: boolean) => void;
}) {
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const mobilePanelRef = useRef<HTMLDivElement>(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const to = (anchor: string) => (home || anchor.startsWith('/') ? anchor : `/${anchor}`);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    const onResize = () => { if (window.innerWidth > 980) setMenuOpen(false); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  useEffect(() => {
    onMenuChange?.(menuOpen);
    document.getElementById('main')?.toggleAttribute('inert', menuOpen);
    if (!menuOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    // Fokus bleibt am Menü-Knopf; Tab wandert durch die Links im Panel.
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setMenuOpen(false);
        menuButtonRef.current?.focus();
      }
      if (event.key === 'Tab') {
        const links = mobilePanelRef.current?.querySelectorAll<HTMLAnchorElement>('a');
        const first = links?.[0];
        const last = links?.[links.length - 1];
        if (event.shiftKey && document.activeElement === menuButtonRef.current) {
          event.preventDefault(); last?.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault(); menuButtonRef.current?.focus();
        } else if (event.shiftKey && document.activeElement === first) {
          event.preventDefault(); menuButtonRef.current?.focus();
        }
      }
    };
    document.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [menuOpen, onMenuChange]);

  const navLink = (href: string, label: string) => {
    const target = to(href);
    const isCurrent = current === target ? 'page' : undefined;
    return target.startsWith('#')
      ? <a key={href} href={target}>{label}</a>
      : <Link key={href} href={target} aria-current={isCurrent}>{label}</Link>;
  };

  return (
    <div className={`hc-nav-root${menuOpen ? ' menu-open' : ''}`}>
      <header className={`hc-site-header${scrolled || solid ? ' is-scrolled' : ''}${menuOpen ? ' menu-header' : ''}`}>
        <div className="hc-nav-shell">
          <nav className="hc-split-nav hc-split-nav--left" aria-label="Hauptnavigation" inert={menuOpen}>
            {navLink('/menu', 'Speisekarte')}{navLink('/catering', 'Feiern & Catering')}
          </nav>
          <a className="hc-brand" href={home ? '#top' : '/'} inert={menuOpen} aria-label={`${BRAND.name} ${BRAND.place} – Startseite`}>
            <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} sizes="120px" priority />
          </a>
          <nav className="hc-split-nav hc-split-nav--right" aria-label="Service" inert={menuOpen}>
            {navLink('#kontakt', 'Anfahrt & Zeiten')}
            <GlfButton kind="reservation" className="hx-btn hx-btn--line hx-btn--sm">Tisch reservieren</GlfButton>
          </nav>
          <button ref={menuButtonRef} className="hc-menu-button" type="button"
            aria-label={menuOpen ? 'Menü schließen' : 'Menü öffnen'} aria-expanded={menuOpen}
            aria-controls="mobile-navigation" onClick={() => setMenuOpen((open) => !open)}>
            <span /><span />
          </button>
        </div>
      </header>

      <div ref={mobilePanelRef} id="mobile-navigation" className="hc-mobile-panel" inert={!menuOpen} aria-hidden={!menuOpen}>
        <nav aria-label="Mobile Navigation">
          {MOBILE_LINKS.map(([href, label]) => {
            if (href === GLORIAFOOD.reservationUrl) return <ReservationLink key={href} onNavigate={() => setMenuOpen(false)}>{label}</ReservationLink>;
            const target = to(href);
            return target.startsWith('#')
              ? <a key={href} href={target} onClick={() => setMenuOpen(false)}>{label}</a>
              : <Link key={href} href={target} aria-current={current === target ? 'page' : undefined} onClick={() => setMenuOpen(false)}>{label}</Link>;
          })}
        </nav>
        <div className="hc-mobile-meta">
          <span>{CONTACT.street}<br />{CONTACT.zip} {CONTACT.city}</span>
          <a href={CONTACT.phoneHref}>{CONTACT.phone}</a>
        </div>
      </div>
      {solid && <div className="hc-nav-spacer" aria-hidden="true" />}
    </div>
  );
}
