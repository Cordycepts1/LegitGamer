import { resolve } from "node:path";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/LegitGamer/",
  build: {
    rollupOptions: {
      input: {
        index: resolve(__dirname, "index.html"),
        products: resolve(__dirname, "products.html"),
        support: resolve(__dirname, "support.html"),
        work: resolve(__dirname, "work.html"),
        privacy: resolve(__dirname, "privacy.html"),
        thanks: resolve(__dirname, "thanks.html"),
      },
    },
  },
});
