/**
 * Erzeugt verkleinerte WebP-Varianten für alle Bilder, die der Code tatsächlich verwendet.
 * Next exportiert statisch (`output: 'export'`) und kann Bilder dabei nicht selbst verkleinern;
 * ohne Varianten lädt ein Handy dieselben 2000-px-Fotos wie ein großer Monitor.
 *
 * Ausgabe: public/_img/<pfad>-<breite>.webp und components/image-manifest.json
 * (welche Breiten es pro Bild gibt). `image-loader.ts` wählt daraus die passende Datei.
 * Die Varianten werden mit eingecheckt, damit der Cloudflare-Build nichts rechnen muss.
 *
 * Aufruf: npm run images
 */
import { existsSync, mkdirSync, readFileSync, readdirSync, statSync, writeFileSync } from 'node:fs';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import sharp from 'sharp';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const PUBLIC = join(ROOT, 'public');
const OUT = join(PUBLIC, '_img');
/** Muss zu `deviceSizes` in next.config.mjs passen. */
const WIDTHS = [480, 828, 1200, 1920];
const QUALITY = 74;
/** Bilder, die per next/image laufen, aber nicht unter /foto/ liegen. */
const EXTRA = ['/go-dc-tower-logo.png'];
/** Hero als <picture>: einmal als WebP, Helligkeit/Sättigung fest eingerechnet statt per CSS-Filter. */
const HERO = [
  { src: '/hero-ramen-dark.jpg', out: '/_img/hero-ramen-dark.webp' },
  { src: '/hero-ramen-dark-tall.jpg', out: '/_img/hero-ramen-dark-tall.webp' },
];

function codeFiles(dir) {
  return readdirSync(dir).flatMap((name) => {
    const path = join(dir, name);
    if (statSync(path).isDirectory()) return codeFiles(path);
    return /\.(tsx?|css)$/.test(name) ? [path] : [];
  });
}

const used = new Set(EXTRA);
for (const file of [...codeFiles(join(ROOT, 'app')), ...codeFiles(join(ROOT, 'components'))]) {
  for (const match of readFileSync(file, 'utf8').matchAll(/\/foto\/[\w./-]+\.(?:webp|jpe?g|png)/g)) used.add(match[0]);
}

const fresh = (target, source) => existsSync(target) && statSync(target).mtimeMs >= statSync(source).mtimeMs;
const manifest = {};
let written = 0;

for (const src of [...used].sort()) {
  const source = join(PUBLIC, src);
  if (!existsSync(source)) { console.warn(`fehlt: ${src}`); continue; }
  const { width: original } = await sharp(source).metadata();
  // Alle Zielbreiten unter dem Original, dazu das Original selbst als größte Stufe.
  const widths = [...WIDTHS.filter((w) => w < original), Math.min(original, WIDTHS.at(-1))];
  manifest[src] = [...new Set(widths)];
  for (const w of manifest[src]) {
    const target = join(OUT, `${src.replace(/\.\w+$/, '')}-${w}.webp`);
    if (fresh(target, source)) continue;
    mkdirSync(dirname(target), { recursive: true });
    await sharp(source).resize({ width: w, withoutEnlargement: true }).webp({ quality: QUALITY }).toFile(target);
    written++;
  }
}

for (const { src, out } of HERO) {
  const source = join(PUBLIC, src);
  const target = join(PUBLIC, out);
  if (fresh(target, source)) continue;
  mkdirSync(dirname(target), { recursive: true });
  // linear(1.12) entspricht CSS brightness(1.12): jeder Farbkanal mal 1,12.
  await sharp(source).linear(1.12, 0).modulate({ saturation: 1.04 }).webp({ quality: 80 }).toFile(target);
  written++;
}

writeFileSync(join(ROOT, 'components/image-manifest.json'), `${JSON.stringify(manifest, null, 2)}\n`);
console.log(`${Object.keys(manifest).length} Bilder, ${written} Dateien neu geschrieben → ${relative(ROOT, OUT)}`);
