import Image from 'next/image';
import Link from 'next/link';
import { OpeningStatus } from './OpeningStatus';
import { ORDER_URL } from './menu-data';

export function Hero() {
  return (
    <section id="top" className="poster-hero">
      <Image
        src="/go-ramen-editorial-hero.png"
        alt="Illustration einer Ramenschale mit hochgezogenen Nudeln und roten grafischen Elementen"
        fill
        priority
        sizes="100vw"
        className="poster-hero__art"
        data-parallax="86"
      />

      <div className="poster-hero__copy">
        <div className="poster-hero__script" aria-label="La Mian" data-parallax="-30">拉麵</div>
        <div className="poster-hero__wave" aria-hidden="true" data-parallax="-22" />

        <h1>
          <span data-parallax="-16">Eine Schale</span>
          <em data-parallax="-28">voller Leben.</em>
          <span data-parallax="-40">Für dich.</span>
        </h1>

        <p data-parallax="-18">
          Handgezogene Nudeln, kräftige Brühen und heißer Wok – frisch gemacht
          im Herzen der Donau City.
        </p>

        <div className="poster-hero__actions" data-parallax="-12">
          <a href="#reservieren" className="poster-button poster-button--red">
            Tisch sichern <span aria-hidden="true">↗</span>
          </a>
          <Link href="/menu" className="poster-button poster-button--ink">
            Speisekarte
          </Link>
          <a href={ORDER_URL} target="_blank" rel="noopener noreferrer" className="poster-hero__order">
            Online bestellen ↗
          </a>
        </div>

        <OpeningStatus />
      </div>

      <div className="poster-hero__seal" aria-hidden="true" data-parallax="72" data-rotate="80">
        <strong>GO</strong>
        <span>DC TOWER<br />VIENNA 22</span>
      </div>

      <div className="poster-hero__orbit poster-hero__orbit--one" aria-hidden="true" data-parallax="115" data-rotate="150" />
      <div className="poster-hero__orbit poster-hero__orbit--two" aria-hidden="true" data-parallax="-75" data-rotate="-110" />

      <div className="poster-hero__footer" aria-hidden="true" data-scroll-x="22">
        <span>LA MIAN</span>
        <span>RAMEN</span>
        <span>WOK</span>
        <i />
        <span>FRESHLY MADE · DAILY</span>
      </div>
    </section>
  );
}
