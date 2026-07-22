import { Reveal } from './Reveal';

const REVIEWS = [
  {
    quote: 'Beste Ramen-Bowl, die ich in Wien je hatte. Die Brühe ist ein Traum.',
    name: 'Sarah K.',
    source: 'Tripadvisor',
  },
  {
    quote: 'In zehn Minuten frisch am Tisch – genau richtig für die Mittagspause.',
    name: 'Max H.',
    source: 'Google Reviews',
  },
  {
    quote: 'Tolles Ambiente und perfekt für After-Work mit dem ganzen Team.',
    name: 'Tom F.',
    source: 'Tripadvisor',
  },
] as const;

export function ReviewsSection() {
  return (
    <section className="editorial-reviews">
      <div className="editorial-reviews__grid">
        <Reveal className="editorial-reviews__score">
          <span className="section-kicker">Stimmen aus Wien</span>
          <strong data-parallax="-38">4,6</strong>
          <div className="editorial-reviews__stars" aria-label="4,6 von 5 Sternen">★★★★★</div>
          <small>380+ Bewertungen</small>
        </Reveal>

        <Reveal className="editorial-reviews__lead" delay={90}>
          <span className="editorial-reviews__mark" aria-hidden="true" data-parallax="70" data-rotate="35">“</span>
          <blockquote data-parallax="-22">{REVIEWS[0].quote}</blockquote>
          <p>{REVIEWS[0].name} · {REVIEWS[0].source}</p>
        </Reveal>
      </div>

      <div className="editorial-reviews__more">
        {REVIEWS.slice(1).map((review, index) => (
          <Reveal key={review.name} delay={index * 80}>
            <blockquote data-parallax={index === 0 ? '-14' : '14'}>„{review.quote}“</blockquote>
            <p>{review.name} · {review.source}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
