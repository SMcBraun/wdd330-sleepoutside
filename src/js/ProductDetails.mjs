// NOTE: Grab our tools to open and save items in browser memory.
// WHY WE DO THIS: Keep save/load code in one spot so we don't repeat it everywhere.
import { setLocalStorage, getLocalStorage } from "./utils.mjs";

// FUNCTION: productDetailsTemplate
// WHAT IT DOES: An empty picture frame with fill-in-the-blank slots.
// WHY WE DO THIS: We use backticks (`) and ${} to drop real words into the blanks without messy plus signs.
// WATCH OUT: If you use regular quotes instead of backticks, the blanks will not work.
function productDetailsTemplate(product) {
    return `<section class="product-detail"> 
    <!-- Fill in the brand name (like Marmot) -->
    <h3>${product.Brand.Name}</h3>

    <!-- Fill in the tent name -->
    <h2 class="divider">${product.NameWithoutBrand}</h2>

    <!-- Show the tent picture and its description label -->
    <img
      class="divider"
      src="${product.Image}"
      alt="${product.NameWithoutBrand}"
    />

    <!-- Fill in the price tag -->
    <p class="product-card__price">$${product.FinalPrice}</p>

    <!-- Pick the first color name from the color list -->
    <p class="product__color">${product.Colors[0].ColorName}</p>

    <!-- Paste in the description text -->
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>

    <!-- The button the user clicks to buy -->
    <div class="product-detail__add">
      <button id="addToCart" data-id="${product.Id}">Add to Cart</button>
    </div>
  </section>`;
}

// CLASS: ProductDetails
// WHAT IT DOES: The helper in charge of building the tent page, grabbing info, and watching the button.
// WHY WE DO THIS: Keeping all tent page tasks in one helper keeps our project neat and easy to fix.
export default class ProductDetails {
    // CONSTRUCTOR: The setup step that runs first.
    // WHAT IT DOES: Remembers the tent ID number and which file reader to use.
    constructor(productId, dataSource) {
        this.productId = productId; // The ID of the tent clicked (example: "880RR")
        this.product = {};          // An empty spot waiting to hold the tent info
        this.dataSource = dataSource; // The helper that reads our tent info file
    }

    // METHOD: init
    // WHAT IT DOES: The step-by-step checklist to set up the screen before the user sees it.
    // WATCH OUT: Must use 'async' because reading files from the internet takes time.
    async init() {
        // 1. Wait for the file reader to find the tent matching our ID number.
        this.product = await this.dataSource.findProductById(this.productId);

        // 2. Put the tent info into our blank template and draw it on the screen inside <main>.
        this.renderProductDetails("main");

        // 3. Turn on the "Add to Cart" button so it reacts when clicked.
        // WATCH OUT: .bind(this) makes sure JavaScript remembers this helper, not just the button.
        document
            .getElementById("addToCart")
            .addEventListener("click", this.addProductToCart.bind(this));
    }

    // METHOD: addProductToCart
    // WHAT IT DOES: Puts the chosen tent into the user's saved cart list.
    // WHY WE DO THIS: Fixes the bug where adding a new item erased the old item.
    addProductToCart() {
        // 1. Open the saved list in browser memory to see what is already there.
        let cart = getLocalStorage("so-cart");

        // WATCH OUT: If the cart is empty or brand new, make a fresh empty list [] so it won't break.
        if (!Array.isArray(cart)) {
            cart = [];
        }

        // 2. Add the current tent to the end of our list.
        cart.push(this.product);

        // 3. Save the full list back into browser memory under the name 'so-cart'.
        setLocalStorage("so-cart", cart);
    }

    // METHOD: renderProductDetails
    // WHAT IT DOES: Finds the main area on the page and drops our finished tent card inside.
    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.innerHTML = productDetailsTemplate(this.product);
    }
}