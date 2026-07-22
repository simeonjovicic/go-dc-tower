'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

const CHAPTERS = [
  {
    number: '01',
    kicker: 'Offene Küche',
    title: 'Du siehst, wo dein Essen entsteht.',
    copy: 'Kein Verstecken hinter Türen: Unsere Küche bleibt Teil des Raums. Du siehst die Bewegung, hörst den Wok und bekommst jedes Gericht direkt aus der Hitze.',
    image: '/hero-restaurant.jpg',
    alt: 'Der helle Gastraum des go DC Tower mit offener Küche',
    position: 'center',
  },
  {
    number: '02',
    kicker: 'Von Hand',
    title: 'Frisch beginnt erst nach deiner Bestellung.',
    copy: 'La Mian werden gezogen, Gyoza gefaltet und Wokgerichte à la minute vollendet. Das braucht ein paar Handgriffe mehr – und genau die schmeckt man.',
    image: '/hero-steamer.jpg',
    alt: 'Frische Teigtaschen im dampfenden Bambuskorb',
    position: 'center 48%',
  },
  {
    number: '03',
    kicker: 'Am Tisch',
    title: 'Große Aromen. Kein großes Theater.',
    copy: 'Kräftige Brühen, knackiges Gemüse und intensive Aromen kommen ohne Umwege an den Tisch. Modern Asian Food für den schnellen Lunch und den langen Abend.',
    image: '/go-wok-bowl.jpg',
    alt: 'Frisches Wokgericht in einer Schale mit go Branding',
    position: 'center 54%',
  },
] as const;

export function ScrollStory() {
  const [active, setActive] = useState(0);

  useEffect(() => {
    const steps = Array.from(document.querySelectorAll<HTMLElement>('[data-story-step]'));
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(Number((visible.target as HTMLElement).dataset.storyStep));
      },
      { rootMargin: '-28% 0px -38% 0px', threshold: [0.15, 0.35, 0.6] },
    );

    steps.forEach((step) => observer.observe(step));
    return () => observer.disconnect();
  }, []);

  return (
    <section id="story" className="scroll-story">
      <div className="scroll-story__intro">
        <div className="scroll-story__symbols" aria-hidden="true">
          <i data-parallax="120" data-rotate="180" />
          <i data-parallax="-70" data-rotate="-120" />
        </div>
        <div className="scroll-story__intro-meta" data-parallax="-18">
          <div className="section-kicker">The go way</div>
          <span>01 — 03</span>
        </div>
        <h2 data-parallax="-34">Frische ist kein Wort.<br /><em>Es ist der Ablauf.</em></h2>
        <p data-parallax="-18">Vom ersten Handgriff bis zur letzten Schale.</p>
      </div>

      <div className="scroll-story__layout">
        <div className="scroll-story__visual" aria-live="polite">
          {CHAPTERS.map((chapter, index) => (
            <div
              key={chapter.number}
              className={`scroll-story__frame${active === index ? ' is-active' : ''}`}
              aria-hidden={active !== index}
            >
              <Image
                src={chapter.image}
                alt={active === index ? chapter.alt : ''}
                fill
                sizes="(max-width: 900px) 100vw, 58vw"
                style={{ objectFit: 'cover', objectPosition: chapter.position }}
                data-parallax={index === 0 ? '38' : index === 1 ? '54' : '32'}
              />
            </div>
          ))}
          <div className="scroll-story__shade" />
          <div className="scroll-story__counter">
            <span>{CHAPTERS[active].number}</span>
            <div className="scroll-story__progress">
              {CHAPTERS.map((chapter, index) => (
                <i key={chapter.number} className={index === active ? 'is-active' : ''} />
              ))}
            </div>
            <small>03</small>
          </div>
          <span className="scroll-story__image-label">{CHAPTERS[active].kicker}</span>
        </div>

        <div className="scroll-story__chapters">
          {CHAPTERS.map((chapter, index) => (
            <article
              key={chapter.number}
              data-story-step={index}
              className={`scroll-story__chapter${active === index ? ' is-active' : ''}`}
            >
              <div className="scroll-story__mobile-image">
                <Image
                  src={chapter.image}
                  alt={chapter.alt}
                  fill
                  sizes="100vw"
                  style={{ objectFit: 'cover', objectPosition: chapter.position }}
                  data-parallax={index % 2 === 0 ? '34' : '-26'}
                />
              </div>
              <span>{chapter.number} · {chapter.kicker}</span>
              <h3 data-parallax="-18">{chapter.title}</h3>
              <p data-parallax="-10">{chapter.copy}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
