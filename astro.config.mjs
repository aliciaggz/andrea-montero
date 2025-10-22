// @ts-check
import { defineConfig } from 'astro/config';
import vue from '@astrojs/vue';
import path from 'path';

const isProd = process.env.NODE_ENV === 'production';


// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  base: isProd ? '/andrea-portfolio' : '/',
  site: isProd ? 'https://aliciaggz.github.io/andrea-portfolio' : 'http://localhost:4321',
  vite: {
    resolve: {
      alias: {
        '@': path.resolve('./src')
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variables" as *; 
                 `
      },
      },
    },
  },
});
