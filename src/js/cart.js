import { getLocalStorage } from "./utils.mjs";

/*
  HOW CART RENDERING WORKS:
  1. Pull the saved items out of local storage.
  2. If there are items:
     - Turn each item into an HTML card and display it.
     - Add up all the prices and show the total footer.
  3. If the cart is empty:
     - Keep the total footer hidden.
*/
function renderCartContents() {
  const cartItems = getLocalStorage("so-cart") || [];

  if (cartItems.length > 0) {
    const htmlItems = cartItems.map((item) => cartItemTemplate(item));
    document.querySelector(".product-list").innerHTML = htmlItems.join("");

    showCartTotal(cartItems);
  } else {
    document.querySelector(".product-list").innerHTML = "<p>Your cart is empty.</p>";
    document.querySelector(".cart-footer").classList.add("hide");
  }
}

/*
  HOW CART TOTAL IS CALCULATED:
  Adds up every item's price, formats it to $XX.XX,
  and unhides the total box on the screen.
*/
function showCartTotal(cartItems) {
  const total = cartItems.reduce((sum, item) => sum + item.ListPrice, 0);
  const cartFooter = document.querySelector(".cart-footer");
  const priceElement = document.querySelector(".cart-total__price");

  priceElement.textContent = `$${total.toFixed(2)}`;
  cartFooter.classList.remove("hide");
}

/*
  HOW EACH CART ITEM IS DRAWN:
  Creates an HTML card for one item in the shopping cart.
*/
function cartItemTemplate(item) {
  const newItem = `<li class="cart-card divider">
  <a href="#" class="cart-card__image">
    <img
      src="${item.Image}"
      alt="${item.Name}"
    />
  </a>
  <a href="#">
    <h2 class="card__name">${item.Name}</h2>
  </a>
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.ListPrice}</p>
</li>`;

  return newItem;
}

renderCartContents();