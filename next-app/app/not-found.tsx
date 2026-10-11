import Link from 'next/link';
import Image from 'next/image';
import { SiteHeader } from '@/components/SiteHeader';
import { HcFooter } from '@/components/HcChrome';

export default function NotFound() {
  return (
    <div className="hc-page hx-sub hc-not-found">
      <SiteHeader solid />
      <main id="main" className="hx-shell hc-not-found-content">
        <Link href="/" className="hc-not-found-brand" aria-label="ra’mien go DC Tower – Startseite">
          <Image src="/go-dc-tower-logo.png" alt="ra’mien go DC Tower" width={706} height={706} priority />
        </Link>
        <p className="hc-not-found-code">404</p>
        <h1 className="hx-title">Diese Seite steht<br />nicht auf der Karte.</h1>
        <p>Diese Seite gibt es leider nicht. Zurück ins go?</p>
        <div className="hc-not-found-actions">
          <Link href="/" className="hx-btn hx-btn--solid">Zur Startseite</Link>
          <Link href="/menu" className="hx-btn hx-btn--line">Zur Speisekarte</Link>
        </div>
      </main>
      <HcFooter />
    </div>
  );
}
