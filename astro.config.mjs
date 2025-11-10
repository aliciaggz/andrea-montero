// @ts-check
import { defineConfig } from "astro/config";
import vue from "@astrojs/vue";
import path from "path";

const isVercel = process.env.VERCEL === "1";
const isProd = process.env.NODE_ENV === "production";

// https://astro.build/config
export default defineConfig({
  integrations: [vue()],
  base: isVercel ? "/" : "/andrea-portfolio",
  site: isVercel
    ? "https://andrea-portfolio.vercel.app"
    : "https://aliciaggz.github.io/andrea-portfolio",
  vite: {
    resolve: {
      alias: {
        "@": path.resolve("./src"),
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `
          @use "@/styles/variables" as *; 
                 `,
        },
      },
    },
  },
});
