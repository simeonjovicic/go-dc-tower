import Image from 'next/image';
import Link from 'next/link';
import { BRAND, CONTACT, SOCIAL } from '@/components/site-data';

/**
 * Kopf und Fuß für die Unterseiten. Die Startseite bringt ihre eigene, auf den
 * Hero abgestimmte Kopfzeile mit — hier zeigen die Links zurück auf die Anker
 * der Startseite, statt auf Abschnitte, die es auf dieser Seite nicht gibt.
 */
export function HcHeader({ current }: { current?: string }) {
  const links = [
    { href: '/menu', label: 'Speisekarte' },
    { href: '/#raum', label: 'Restaurant' },
    { href: '/#catering', label: 'Feiern & Catering' },
    { href: '/#reservieren', label: 'Tisch anfragen' },
  ];

  return (
    <header className="hc-sub-header">
      <Link className="hc-sub-brand" href="/" aria-label={`${BRAND.name} ${BRAND.place} – Startseite`}>
        <Image src="/go-dc-tower-logo.png" alt="" width={706} height={706} priority />
      </Link>
      <nav aria-label="Hauptnavigation">
        {links.map((l) => (
          <Link
            key={l.href}
            href={l.href}
            aria-current={l.href === current ? 'page' : undefined}
          >
            {l.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}

export function HcFooter() {
  return (
    <footer className="hc-sub-footer">
      <div className="hc-sub-footer-shell">
        <div>
          <p className="hc-sub-footer-name">
            {BRAND.name} <span>{BRAND.place}</span>
          </p>
          <p>
            {CONTACT.street}, {CONTACT.zip} {CONTACT.city}
            <br />
            <a href={CONTACT.phoneHref}>{CONTACT.phone}</a> ·{' '}
            <a href={`mailto:${CONTACT.email}`}>{CONTACT.email}</a>
          </p>
        </div>
        <div className="hc-sub-footer-links">
          <a href={SOCIAL.instagram} target="_blank" rel="noopener noreferrer">
            Instagram
          </a>
          <a href={SOCIAL.facebook} target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <Link href="/impressum">Impressum</Link>
        </div>
      </div>
    </footer>
  );
}
