import type { Metadata, Viewport } from 'next';
import { Saira_Condensed, DM_Sans, Italiana } from 'next/font/google';
import { SiteShell } from '@/components/SiteShell';
import './globals.css';
import './high-class.css';

const saira = Saira_Condensed({
  subsets: ['latin'],
  weight: ['500', '600', '700', '800', '900'],
  variable: '--font-saira',
  display: 'swap',
});

const dm = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm',
  display: 'swap',
});

const italiana = Italiana({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-italiana',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'go DC Tower — Asian Fusion Restaurant im DC Tower Wien',
  description:
    "Ra'mien Go DC Tower – Fresh, healthy asian. La Mian, Ramen, Bowls & Sushi mitten im DC Tower. Online bestellen, Tisch reservieren und Catering anfragen.",
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
};

export const viewport: Viewport = {
  themeColor: '#11110F',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${saira.variable} ${dm.variable} ${italiana.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm), system-ui, sans-serif' }}>
        <SiteShell>{children}</SiteShell>
      </body>
    </html>
  );
}
