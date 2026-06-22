import type { Metadata } from 'next';
import Link from 'next/link';
import { MenuSection } from '@/components/MenuSection';

export const metadata: Metadata = {
  title: 'Speisekarte & online bestellen — go DC Tower',
  description:
    'Bestelle Ramen, La Mian, Bowls, Sushi, Wok-Gerichte und Gyoza direkt online zur Abholung im DC Tower, 1220 Wien.',
};

export default function SpeisekartePage() {
  return (
    <main>
      <div
        data-pad
        style={{
          maxWidth: 1280,
          margin: '0 auto',
          padding: '32px 40px 0',
        }}
      >
        <Link
          href="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 6,
            fontSize: 13,
            fontWeight: 700,
            letterSpacing: '0.04em',
            color: '#6b6e73',
            textDecoration: 'none',
          }}
        >
          ← Zurück zur Startseite
        </Link>
      </div>
      <MenuSection />
    </main>
  );
}
