import type { Metadata, Viewport } from 'next';
import { Inter, Noto_Sans_SC, Outfit } from 'next/font/google';
import './globals.css';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '800'],
  variable: '--font-outfit',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-inter',
  display: 'swap',
});

const notoSansSc = Noto_Sans_SC({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-noto-sc',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'go DC Tower — Asiatische Küche, Catering & Feiern im DC Tower Wien',
  description:
    'Frische asiatische Küche im DC Tower, Wien. La Mian, Wok, Dim Sum, Reisschalen, Catering fürs Büro und Feiern bis 80 Gäste.',
  icons: { icon: '/favicon.png', apple: '/favicon.png' },
  openGraph: {
    type: 'website',
    locale: 'de_AT',
    title: 'go DC Tower — Asiatische Küche, Catering & Feiern',
    description: 'La Mian, Wok und Dim Sum im DC Tower. Online bestellen, Catering fürs Büro und Feiern bis 80 Gäste.',
  },
};

export const viewport: Viewport = {
  themeColor: '#F7F3EC',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="de" className={`${outfit.variable} ${inter.variable} ${notoSansSc.variable}`}>
      <body>{children}</body>
    </html>
  );
}
