/*
  HINT: Vite Configuration
 PURPOSE: Tells Vite where each HTML entry point lives when packaging the site for production.
  VALUE: Ensures 'product_pages/index.html' is bundled properly so product links don't 404 in production.
 RATIONALE: Rollup needs explicit input entries for nested multi - page apps.
*/
import { resolve } from "path";
import { defineConfig } from "vite";

export default defineConfig({
  root: "src/",
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});