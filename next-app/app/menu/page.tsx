import type { Metadata } from 'next';
import { HcFooter } from '@/components/HcChrome';
import { SiteHeader } from '@/components/SiteHeader';
import { MenuExplorer } from '@/components/MenuExplorer';
import { GlfButton } from '@/components/GloriaFood';
import { PhotoHero } from '@/components/PhotoHero';
import { BRAND, MENU_CARDS } from '@/components/site-data';
import './menu.css';

export const metadata: Metadata = {
  title: 'Speisekarte — ' + BRAND.name + ' ' + BRAND.place,
  description: 'Entdecke unsere Speisekarte: hausgemachte Gyoza, La Mien und Pho, Wok- und Reisgerichte, Poké Bowls und Dessert. Alle Gerichte, Varianten und Preise auf einen Blick.',
};


export default function MenuPage() {
  return (
    <div className="hc-page hc-sub-page hx-sub hc-menu-page">
      <a className="hc-skip-link" href="#speisekarte">Zum Inhalt springen</a>
      <SiteHeader current="/menu" solid />
      <main id="main">
        <PhotoHero id="menu-title" short img="/foto/shooting-2021-09/gyoza1.webp" alt="Hausgemachte Gyoza mit Dip auf einem Teller"
          eyebrow="Speisekarte" title={['Die ganze Karte.', 'Frisch gekocht.']}
          lead={MENU_CARDS.map((card, i) => <span key={card.id}>{i > 0 && <br />}{card.title} · {card.times.join(' · ')}</span>)}>
          <GlfButton kind="order" className="hx-btn hx-btn--solid">Online bestellen</GlfButton>
        </PhotoHero>
        <div id="speisekarte">
          <MenuExplorer />
        </div>
      </main>
      <HcFooter />
    </div>
  );
}
