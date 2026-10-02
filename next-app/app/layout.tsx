import type { Metadata, Viewport } from 'next';
import { Shippori_Mincho_B1, DM_Sans, Italiana } from 'next/font/google';
import './globals.css';
import './high-class.css';

/** Titel: japanische Mincho mit Gewicht. Die Wortmarke im Hero bleibt Italiana. */
const mincho = Shippori_Mincho_B1({
  subsets: ['latin', 'latin-ext'],
  weight: ['500', '600', '800'],
  variable: '--font-mincho',
  display: 'swap',
  // Die Schrift ist in viele Teildateien zerlegt; der Browser lädt nur die benötigten.
  preload: false,
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
  title: "ra'mien go DC Tower — Asian Fusion Kitchen in Wien",
  description:
    "Handgezogene La Mien, Pho, hausgemachte Gyoza, Wok-Gerichte und Poké Bowls im Erdgeschoß des DC Tower in Wien. Seit 2017. Tisch reservieren, online bestellen oder Catering anfragen.",
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
    <html lang="de" data-scroll-behavior="smooth" className={`${mincho.variable} ${dm.variable} ${italiana.variable}`}>
      <body style={{ fontFamily: 'var(--font-dm), system-ui, sans-serif' }}>
        {children}
      </body>
    </html>
  );
}
