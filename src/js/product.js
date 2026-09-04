// Import storage utilities and data model.
// getLocalStorage is essential because we must inspect existing cart data before writing.
import { getLocalStorage, setLocalStorage } from "./utils.mjs";
import ProductData from "./ProductData.mjs";

// Initialize data source to query products from the "tents" category
const dataSource = new ProductData("tents");

/**
 * Handles appending a product to the cart stored in localStorage.
 * 
 * WHY THIS LOGIC EXISTS:
 * 1. Storage Isolation: localStorage can only hold key-value strings. 
 *    Overwriting "so-cart" directly with an object erases prior additions.
 * 2. Data Persistence: We must pull existing items, mutate the list in memory, 
 *    and reserialize the full array back to disk.
 * 3. Defensive Programming: Checking Array.isArray prevents runtime crashes 
 *    when storage is null (first run) or corrupted by non-array data.
 */
function addProductToCart(product) {
  // Step 1: Read existing state from browser storage (deserialized via JSON.parse)
  let cart = getLocalStorage("so-cart");

  // Step 2: Ensure fallback structure. If empty or invalid, initialize an empty collection.
  if (!Array.isArray(cart)) {
    cart = [];
  }

  // Step 3: Append the newly selected product object into our in-memory array
  cart.push(product);

  // Step 4: Write the updated collection back to storage (serialized via JSON.stringify)
  setLocalStorage("so-cart", cart);
}

/**
 * Event handler triggered when the user clicks "Add to Cart".
 * Uses asynchronous resolution to fetch product details by dataset ID before updating state.
 */
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// Bind click event to trigger the retrieval and save flow
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);