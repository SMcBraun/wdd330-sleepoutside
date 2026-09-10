import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

/**
 * ============================================================================
 * LEARNING NOTE / VIDEO SCRIPT: Main Homepage Controller (main.js)
 * ----------------------------------------------------------------------------
 * 1. PURPOSE:
 *    Acts as the entry point orchestrator for the homepage. It connects the
 *    data retrieval module (ProductData) with the UI rendering module (ProductList).
 *
 * 2. STEP-BY-STEP FLOW:
 *    - Step A: Instantiate ProductData with the "tents" category so it knows
 *              which JSON dataset to pull.
 *    - Step B: Locate the target container in index.html (<ul class="product-list">).
 *    - Step C: Instantiate ProductList, passing the category, the data source,
 *              and the DOM destination into the constructor.
 *    - Step D: Call productList.init() to trigger the async data fetch and
 *              render the product cards dynamically.
 * ============================================================================
 */

// Step A: Configure where the data comes from
const dataSource = new ProductData("tents");

// Step B: Target where the HTML cards will be injected
const listElement = document.querySelector(".product-list");

// Step C: Initialize the list manager with our dependencies
const productList = new ProductList("tents", dataSource, listElement);

// Step D: Execute the data fetch and DOM insertion
productList.init();