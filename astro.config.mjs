import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  output: 'static',
  site: 'https://www.goldpricenepal.online',
  integrations: [
    react(),
    tailwind(),
  ],
  build: {
    assets: '_astro',
  },
});
