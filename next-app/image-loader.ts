import manifest from './components/image-manifest.json';

/**
 * next/image-Loader für den statischen Export: zeigt auf die von `npm run images` erzeugten
 * WebP-Varianten in /_img/. Gewählt wird die kleinste Variante, die mindestens so breit ist
 * wie angefragt, sonst die größte. Bilder ohne Varianten bleiben unverändert.
 */
const VARIANTS: Record<string, number[]> = manifest;

export default function imageLoader({ src, width }: { src: string; width: number }) {
  const widths = VARIANTS[src];
  if (!widths) return src;
  const pick = widths.find((w) => w >= width) ?? widths[widths.length - 1];
  return `/_img${src.replace(/\.\w+$/, '')}-${pick}.webp`;
}
