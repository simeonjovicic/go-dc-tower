'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ORDER_URL } from './menu-data';

const NAV_LINKS = [
  ['/menu', 'Menü'],
  ['/#story', 'Unsere Story'],
  ['/#restaurant', 'Restaurant'],
  ['/#reservieren', 'Reservieren'],
  ['/#standort', 'Standort'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const overlay = pathname === '/' && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 42);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  return (
    <header className={`story-header${overlay ? ' is-overlay' : ''}${open ? ' is-open' : ''}`}>
      <div className="story-header__inner">
        <Link href="/" className="story-header__brand" aria-label="go DC Tower – Startseite" onClick={() => setOpen(false)}>
          <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} priority />
          <span>go DC Tower</span>
        </Link>

        <nav className="story-header__nav" aria-label="Hauptnavigation">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href}>{label}</a>
          ))}
        </nav>

        <div className="story-header__actions">
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="story-header__order">
            Bestellen
          </a>
          <a href="/#reservieren" className="story-header__reserve">Tisch sichern</a>
          <button
            type="button"
            className="story-header__burger"
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((value) => !value)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>

      {open ? (
        <nav className="story-header__mobile" aria-label="Mobile Navigation">
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} onClick={() => setOpen(false)}>{label}</a>
          ))}
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" onClick={() => setOpen(false)}>
            Online bestellen ↗
          </a>
        </nav>
      ) : null}
    </header>
  );
}
