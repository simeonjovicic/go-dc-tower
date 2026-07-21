'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { ORDER_URL } from './menu-data';

const NAV_LINKS = [
  ['/menu', 'Menü'],
  ['/#ueber-uns', 'Über uns'],
  ['/#reservieren', 'Reservieren'],
  ['/#catering', 'Catering'],
  ['/#standort', 'Standort'],
] as const;

export function Header() {
  const [open, setOpen] = useState(false);
  // On the homepage the header is hidden over the full-bleed hero and
  // slides in on scroll; on all other pages it is always visible.
  const [shown, setShown] = useState(false);
  const pathname = usePathname();
  const isHome = pathname === '/';
  const close = () => setOpen(false);

  useEffect(() => {
    if (!isHome) {
      setShown(true);
      return;
    }
    const onScroll = () => setShown(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [isHome]);

  useEffect(() => {
    if (!shown) setOpen(false);
  }, [shown]);

  return (
    <header
      className="site-header"
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 60,
        background: 'rgba(250,246,236,0.86)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        borderTop: '4px solid var(--go-red)',
        borderBottom: '1px solid rgba(22,24,28,0.08)',
        transform: shown ? 'none' : 'translateY(-110%)',
        visibility: shown ? 'visible' : 'hidden',
        transition:
          'transform 0.35s cubic-bezier(.2,.7,.2,1), visibility 0.35s',
      }}
    >
      <div
        data-pad
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '14px 40px',
          display: 'flex',
          alignItems: 'center',
          gap: 28,
        }}
      >
        <Link
          href="/"
          aria-label="go DC Tower – Startseite"
          onClick={close}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 12,
            textDecoration: 'none',
            flex: 'none',
          }}
        >
          <Image
            src="/go-dc-tower-logo.png"
            alt="go DC Tower"
            width={706}
            height={706}
            priority
            style={{ width: 46, height: 46, display: 'block' }}
          />
          <span
            data-wordmark
            style={{
              fontFamily: 'var(--font-saira)',
              fontWeight: 800,
              fontSize: 22,
              letterSpacing: '0.01em',
              textTransform: 'uppercase',
            }}
          >
            go DC Tower
          </span>
        </Link>

        <nav
          data-nav
          style={{
            display: 'flex',
            gap: 26,
            marginLeft: 8,
            fontWeight: 600,
            fontSize: 15,
          }}
        >
          {NAV_LINKS.map(([href, label]) => (
            <a key={href} href={href} className="hov-nav" style={{ textDecoration: 'none' }}>
              {label}
            </a>
          ))}
        </nav>

        <div
          style={{
            marginLeft: 'auto',
            display: 'flex',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <a
            href="/#reservieren"
            data-resv-btn
            className="hov-shine"
            style={{
              textDecoration: 'none',
              padding: '12px 22px',
              background: 'var(--go-red)',
              color: '#FAF6EC',
              borderRadius: 999,
              fontWeight: 700,
              fontSize: 15,
              boxShadow: '0 6px 18px rgba(217,25,15,0.28)',
            }}
          >
            Tisch reservieren
          </a>
          <button
            type="button"
            data-burger
            aria-label={open ? 'Menü schließen' : 'Menü öffnen'}
            aria-expanded={open}
            onClick={() => setOpen((o) => !o)}
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              width: 44,
              height: 44,
              borderRadius: 12,
              border: '1.5px solid rgba(22,24,28,0.14)',
              background: '#fff',
              color: '#16181C',
              cursor: 'pointer',
            }}
          >
            {open ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" aria-hidden="true">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav
          data-mobilenav
          aria-label="Mobile Navigation"
          style={{
            borderTop: '1px solid rgba(22,24,28,0.08)',
            background: 'rgba(250,246,236,0.98)',
            padding: '10px 24px 20px',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {NAV_LINKS.map(([href, label]) => (
            <a
              key={href}
              href={href}
              onClick={close}
              style={{
                padding: '13px 4px',
                textDecoration: 'none',
                fontWeight: 700,
                fontSize: 17,
                borderBottom: '1px solid rgba(22,24,28,0.06)',
              }}
            >
              {label}
            </a>
          ))}
          <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
            <a
              href={ORDER_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              style={{
                flex: 1,
                textAlign: 'center',
                textDecoration: 'none',
                padding: '13px 16px',
                background: 'var(--go-red)',
                color: '#FAF6EC',
                borderRadius: 999,
                fontWeight: 800,
                fontSize: 15,
              }}
            >
              Online bestellen
            </a>
            <a
              href="/#reservieren"
              onClick={close}
              style={{
                flex: 1,
                textAlign: 'center',
                textDecoration: 'none',
                padding: '13px 16px',
                border: '1.5px solid #16181C',
                borderRadius: 999,
                fontWeight: 700,
                fontSize: 15,
              }}
            >
              Reservieren
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
