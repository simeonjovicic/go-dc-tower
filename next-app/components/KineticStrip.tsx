const WORDS = ['HAND PULLED', 'HOT WOK', 'FRESH DAILY', 'VIENNA 22'] as const;

export function KineticStrip() {
  return (
    <section className="kinetic-strip" aria-label="Frisch zubereitet im go DC Tower">
      <div className="kinetic-strip__row kinetic-strip__row--red" data-scroll-x="-260">
        {[...WORDS, ...WORDS].map((word, index) => (
          <span key={`${word}-${index}`}>{word}<i /></span>
        ))}
      </div>
      <div className="kinetic-strip__row kinetic-strip__row--ink" data-scroll-x="210">
        {[...WORDS].reverse().concat([...WORDS].reverse()).map((word, index) => (
          <span key={`${word}-${index}`}>{word}<i /></span>
        ))}
      </div>
    </section>
  );
}
