import type { Metadata } from 'next';
import { HcHeader, HcFooter } from '@/components/HcChrome';
import { MenuExplorer } from '@/components/MenuExplorer';
import { GlfButton } from '@/components/GloriaFood';
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
          <GlfButton kind="order" className="hc-button-dark">Online bestellen <span aria-hidden="true">↗</span></GlfButton>
        </section>
        <MenuExplorer />
      </main>
      <HcFooter />
    </div>
  );
}
