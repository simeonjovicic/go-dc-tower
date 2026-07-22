import Image from 'next/image';
import { Reveal } from './Reveal';

export function WelcomeSection() {
  return (
    <section id="restaurant" className="venue-editorial">
      <div className="venue-editorial__ghost" aria-hidden="true">VIENNA 22</div>

      <div className="venue-editorial__inner">
        <Reveal className="venue-editorial__photo">
          <Image
            src="/go-interior-tables.jpg"
            alt="Der obere Restaurantbereich des go DC Tower mit Blick über Wien"
            fill
            sizes="(max-width: 900px) 100vw, 65vw"
            data-parallax="54"
          />
          <span>DC Tower · First floor</span>
        </Reveal>

        <Reveal className="venue-editorial__panel" delay={120}>
          <div className="section-kicker section-kicker--light">Der Ort</div>
          <h2 data-parallax="-22">Dein Tisch.<br />Deine Runde.<br /><em>Dein Wien.</em></h2>
          <p data-parallax="-10">
            Lunch mit dem Team, Dinner mit Freunden oder eine private Feier:
            zwei Ebenen geben kleinen Pausen und großen Runden den richtigen Raum.
          </p>
          <a href="#reservieren" className="go-action go-action--red">
            Tisch oder Event anfragen <span aria-hidden="true">↗</span>
          </a>

          <div className="venue-editorial__facts" data-parallax="16">
            <Fact value="80" label="Plätze unten" />
            <Fact value="45" label="Plätze Lounge" />
            <Fact value="4 min" label="Von der U1" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function Fact({ value, label }: { value: string; label: string }) {
  return (
    <div>
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
