import type { Metadata, Viewport } from 'next';
import { Saira_Condensed, DM_Sans } from 'next/font/google';
import { Header } from '@/components/Header';
import { SiteFooter } from '@/components/SiteFooter';
import './globals.css';

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

export const metadata: Metadata = {
  title: 'go DC Tower — Asian Fusion Restaurant im DC Tower Wien',
  description:
    "Ra'mien Go DC Tower – Fresh, healthy asian. La Mian, Ramen, Bowls & Sushi mitten im DC Tower. Reservieren und Catering anfragen.",
};

export const viewport: Viewport = {
  themeColor: '#FAF6EC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" data-scroll-behavior="smooth" className={`${saira.variable} ${dm.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm), system-ui, sans-serif' }}>
        <Header />
        {children}
        <SiteFooter />
      </body>
    </html>
  );
}
