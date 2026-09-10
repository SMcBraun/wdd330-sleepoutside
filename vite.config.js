import { resolve } from "path";
import { defineConfig } from "vite";

/**
 * ============================================================================
 * ARCHITECTURE & LEARNING NOTE: Why Vite Config Changed
 * ----------------------------------------------------------------------------
 * 1. STATIC TO DYNAMIC TRANSITION:
 *    Originally, the project had 4 separate, hardcoded HTML files for individual
 *    tents (rimrock, ajax, alpine, talus).
 * 
 * 2. SINGLE ENTRY POINT:
 *    In Week 1, we replaced those 4 static files with one dynamic template:
 *    `src/product_pages/index.html`. This page dynamically reads the product ID
 *    from the URL parameter (e.g. ?product=880RR) and populates the details.
 * 
 * 3. PREVENTING BUILD FAILURES:
 *    Rollup/Vite needs to know every HTML entry point to compile the app.
 *    If Rollup still searches for the deleted individual HTML files, `npm run build`
 *    crashes. Replacing them with the single `product` entry keeps our build
 *    lean, modular, and DRY (Don't Repeat Yourself).
 * ============================================================================
 */

export default defineConfig({
  // Tells Vite that our working source code lives in the 'src/' directory
  root: "src/",

  build: {
    // Outputs the bundled, minified production files up one level into 'dist/'
    outDir: "../dist",
    rollupOptions: {
      input: {
        // Multi-page entry points for the bundler:
        main: resolve(__dirname, "src/index.html"),
        cart: resolve(__dirname, "src/cart/index.html"),
        checkout: resolve(__dirname, "src/checkout/index.html"),
        // Dynamic product detail page:
        product: resolve(__dirname, "src/product_pages/index.html"),
      },
    },
  },
});