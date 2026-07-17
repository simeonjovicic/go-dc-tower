/** Quiet, static divider line in the wood tone — replaces the animated ticker. */
export function TasteDivider() {
  return (
    <div
      aria-hidden="true"
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: 18,
        padding: '30px 20px 4px',
        fontFamily: 'var(--font-saira)',
        fontWeight: 700,
        fontSize: 13,
        letterSpacing: '0.3em',
        textTransform: 'uppercase',
        color: 'var(--go-wood-deep)',
        textAlign: 'center',
      }}
    >
      {['La Mian', 'Ramen', 'Bowls', 'Sushi'].map((label, i) => (
        <span
          key={label}
          style={{ display: 'inline-flex', alignItems: 'center', gap: 18 }}
        >
          {i > 0 && (
            <span
              style={{
                width: 5,
                height: 5,
                borderRadius: '50%',
                background: 'var(--go-red)',
              }}
            />
          )}
          {label}
        </span>
      ))}
    </div>
  );
}
