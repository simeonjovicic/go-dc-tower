/** A restrained dark brand bridge between the hero and the content. */
export function TasteDivider() {
  return (
    <div
      className="taste-divider"
      aria-hidden="true"
    >
      <div className="taste-divider__inner">
        <span className="taste-divider__label">Frisch aus unserer Küche</span>
        <div className="taste-divider__items">
          {['La Mian', 'Ramen', 'Bowls', 'Sushi'].map((label, i) => (
            <span
              key={label}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}
            >
              {i > 0 && <span className="taste-divider__dot" />}
              {label}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
