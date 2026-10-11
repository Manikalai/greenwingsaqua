import { defineConfig } from 'astro/config';
import react from '@astrojs/react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  site: 'https://greenwingsaqua.com',
  // Keep the old addresses (/products.html, /amc.html …) so Google's index and
  // every link already shared on WhatsApp keep working.
  build: { format: 'file' },
  trailingSlash: 'never',
  integrations: [react()],
  vite: { plugins: [tailwindcss()] },
});
