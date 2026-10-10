import Link from 'next/link';
import { BRAND, CONTACT, SOCIAL } from '@/components/site-data';

/** Fuß für die Unterseiten. Die Navigation aller Seiten ist `SiteHeader`. */
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
          <Link href="/datenschutz">Datenschutz</Link>
        </div>
      </div>
    </footer>
  );
}
