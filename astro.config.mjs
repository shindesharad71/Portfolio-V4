import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// https://astro.build/config
export default defineConfig({
  integrations: [react()],
  // site: 'https://shrd.in',
  // Uncomment to enable sitemap generation
  // site: 'https://shrd.in',
});
