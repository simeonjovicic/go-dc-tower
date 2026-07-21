import Image from 'next/image';
import { Reveal } from './Reveal';

/**
 * Photo-led story of the actual venue in a clean, restrained brand frame.
 */
export function WelcomeSection() {
  return (
    <section id="ueber-uns" className="restaurant-story">
      <Reveal y={32}>
        <div className="restaurant-story__shell">
          <div className="restaurant-story__visual">
            <Image
              src="/go-interior-tables.jpg"
              alt="Heller Gastraum des go DC Tower mit Eichenholz, weißen Tischen und warmen Leuchten"
              fill
              sizes="(max-width: 900px) 100vw, 55vw"
              style={{ objectFit: 'cover', objectPosition: 'center' }}
            />

            <div className="restaurant-story__venue-label">
              <span
                aria-hidden="true"
                style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--go-red-soft)' }}
              />
              Donau City · Wien
            </div>

            <div className="restaurant-story__caption">
              <strong>Ein heller Ort für Lunch, Dinner &amp; gute Runden.</strong>
              <span>Erdgeschoss und Private Lounge im 1. Stock</span>
            </div>
          </div>

          <div className="restaurant-story__content">
            <div className="restaurant-story__kicker">Unser Restaurant</div>
            <h2 className="restaurant-story__title">
              Klarer Raum.<br />
              Offene Küche.<br />
              <span style={{ color: 'var(--go-red)' }}>Echtes go.</span>
            </h2>

            <p className="restaurant-story__text">
              Im Erdgeschoss des DC&nbsp;Towers trifft die klare Architektur der
              Donau City auf die Energie einer asiatischen Küche. Offene
              Kochstationen und viel Tageslicht machen aus der schnellen
              Mittagspause genauso einen guten Besuch wie aus einem langen Abend.
            </p>

            <div className="restaurant-story__details" aria-label="Restaurantdetails">
              <Detail value="2018" label="Seit" />
              <Detail value="80" label="Plätze" />
              <Detail value="2" label="Ebenen" />
            </div>

            <div className="restaurant-story__food-strip" aria-label="Einblicke in unsere Küche">
              <FoodPhoto
                src="/go-wok-bowl.jpg"
                alt="Frisches Wok-Gericht in einer Schale mit rotem go-Branding"
                position="center 52%"
              />
              <FoodPhoto
                src="/hero-steamer.jpg"
                alt="Gedämpfte Teigtaschen im traditionellen Bambuskorb"
                position="center 48%"
              />
            </div>

            <div className="restaurant-story__signature">
              From our kitchen to your soul.
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Detail({ value, label }: { value: string; label: string }) {
  return (
    <div className="restaurant-story__detail">
      <strong>{value}</strong>
      <span>{label}</span>
    </div>
  );
}

function FoodPhoto({
  src,
  alt,
  position,
}: {
  src: string;
  alt: string;
  position: string;
}) {
  return (
    <div className="restaurant-story__food">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="(max-width: 560px) 45vw, 220px"
        style={{ objectFit: 'cover', objectPosition: position }}
      />
    </div>
  );
}
