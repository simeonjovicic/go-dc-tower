import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight } from './Icons';
import { OrderFab } from './OrderFab';
import { Reveal } from './Reveal';
import { ORDER_URL } from './menu-data';

const SIGNATURES = [
  {
    number: '01',
    title: 'La Mian',
    line: 'Von Hand gezogen',
    copy: 'Elastische Nudeln, kräftige Saucen und frische Toppings.',
    image: '/menu-lamian.jpg',
    href: '/menu#la-mian',
  },
  {
    number: '02',
    title: 'Ramen',
    line: 'Langsam gekocht',
    copy: 'Tiefe Brühen, klare Aromen und eine Schale voller Wärme.',
    image: '/menu-ramen.jpg',
    href: '/menu#ramen',
  },
  {
    number: '03',
    title: 'Bowls & Wok',
    line: 'Frisch vollendet',
    copy: 'Knackiges Gemüse, Reis und intensive Hitze aus dem Wok.',
    image: '/ig-wok-tofu.jpg',
    href: '/menu#bowls',
  },
] as const;

export function MenuTeaser() {
  return (
    <section id="menu" className="signature-menu">
      <div className="signature-menu__head">
        <Reveal>
          <div className="section-kicker section-kicker--light">Unsere Signatures</div>
          <h2 data-parallax="-26">Das bleibt<br /><em data-parallax="-14">im Kopf.</em></h2>
        </Reveal>
        <Reveal delay={100}>
          <div className="signature-menu__intro">
            <p>Drei Handschriften, eine Küche: kraftvolle Brühen, handgezogene Nudeln und die direkte Hitze des Woks.</p>
            <div>
              <Link href="/menu" className="button button--red">Ganze Speisekarte <ArrowRight size={16} /></Link>
              <a href={ORDER_URL} target="_blank" rel="noopener noreferrer">Online bestellen ↗</a>
            </div>
          </div>
        </Reveal>
      </div>

      <div className="signature-menu__grid">
        {SIGNATURES.map((item, index) => (
          <Reveal
            key={item.title}
            delay={index * 90}
            className={`signature-menu__item signature-menu__item--${index + 1}`}
          >
            <Link href={item.href} className="signature-card">
              <Image
                src={item.image}
                alt={item.title}
                fill
                sizes="(max-width: 800px) 100vw, 33vw"
                data-parallax={index === 0 ? '42' : index === 1 ? '-28' : '32'}
              />
              <div className="signature-card__overlay" />
              <span className="signature-card__number">{item.number}</span>
              <div className="signature-card__copy">
                <span>{item.line}</span>
                <h3>{item.title}</h3>
                <p>{item.copy}</p>
              </div>
              <i><ArrowRight size={18} /></i>
            </Link>
          </Reveal>
        ))}
      </div>
      <OrderFab />
    </section>
  );
}
