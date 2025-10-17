// @ts-check
import { defineConfig } from 'astro/config';
import mdx from '@astrojs/mdx';
import sitemap from '@astrojs/sitemap';
import tailwind from '@astrojs/tailwind';

// https://astro.build/config
export default defineConfig({
  site: 'https://bomfather.bitbomdev.org', // Replace with actual domain when available
  integrations: [
    mdx(),
    sitemap(),
    tailwind()
  ],
  vite: {
    build: {
      rollupOptions: {
        output: {
          // Ensure scripts are properly chunked
          manualChunks: {
            gsap: ['gsap']
          }
        }
      }
    },
    // This ensures GSAP plugins are properly imported
    optimizeDeps: {
      include: ['gsap']
    }
  }
});
