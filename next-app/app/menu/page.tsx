import type { Metadata } from 'next';
import { HcHeader, HcFooter } from '@/components/HcChrome';
import { MenuExplorer } from '@/components/MenuExplorer';
import { ORDER_URL } from '@/components/menu-data';
import { BRAND } from '@/components/site-data';
import './menu.css';

export const metadata: Metadata = {
  title: 'Speisekarte — ' + BRAND.name + ' ' + BRAND.place,
  description: 'Entdecke unsere Speisekarte: hausgemachte Gyoza, La Mien und Pho, Wok- und Reisgerichte, Poké Bowls und Dessert. Alle Gerichte, Varianten und Preise auf einen Blick.',
};

export default function MenuPage() {
  return (
    <div className="hc-page hc-sub-page hc-menu-page">
      <a className="hc-skip-link" href="#speisekarte">Zum Inhalt springen</a>
      <HcHeader current="/menu" compact />
      <main id="speisekarte">
        <section className="mc-page-head">
          <div><p className="hc-eyebrow">ra’mien go · DC Tower</p><h1 className="hc-display">Die ganze <i>Karte.</i></h1><p>Wähle eine Kategorie. Finde dein Lieblingsgericht.</p></div>
          <a className="hc-button-dark" href={ORDER_URL} target="_blank" rel="noopener noreferrer">Online bestellen <span aria-hidden="true">↗</span></a>
        </section>
        <MenuExplorer />
      </main>
      <HcFooter />
    </div>
  );
}
