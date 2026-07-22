import Image from 'next/image';

const POSTS = [
  { img: '/ig-rainbow-roll.jpg', alt: 'Rainbow Roll auf schwarzem Teller' },
  { img: '/ig-fried-gyoza.jpg', alt: 'Knusprig gebratene Gyoza' },
  { img: '/ig-wok-tofu.jpg', alt: 'Wok-Bowl mit Tofu und Sesam' },
  { img: '/ig-veggie-bowl.jpg', alt: 'Bunte Veggie-Bowl mit Glasnudeln' },
] as const;

export function InstagramSection() {
  return (
    <section className="social-film">
      <div className="social-film__head">
        <div>
          <span className="section-kicker section-kicker--light">Daily from the kitchen</span>
          <h2 data-scroll-x="-80">@godctower</h2>
        </div>
        <a href="https://instagram.com/godctower" target="_blank" rel="noopener noreferrer">
          Instagram öffnen <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="social-film__strip">
        {POSTS.map((post, index) => (
          <a
            key={post.img}
            href="https://instagram.com/godctower"
            target="_blank"
            rel="noopener noreferrer"
            className={`social-film__frame social-film__frame--${index + 1}`}
            aria-label={`Instagram: ${post.alt}`}
          >
            <Image
              src={post.img}
              alt={post.alt}
              fill
              sizes="(max-width: 700px) 76vw, 25vw"
              data-parallax={index % 2 === 0 ? '34' : '-26'}
            />
            <span>0{index + 1}</span>
          </a>
        ))}
      </div>
    </section>
  );
}
