/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  // Statischer Export kann Bilder nicht selbst verkleinern: der Loader zeigt auf die
  // vorab erzeugten Varianten (`npm run images`). deviceSizes = Breiten im Skript.
  images: {
    loader: 'custom',
    loaderFile: './image-loader.ts',
    deviceSizes: [480, 828, 1200, 1920],
    imageSizes: [],
  },
  trailingSlash: true,
};

export default nextConfig;
