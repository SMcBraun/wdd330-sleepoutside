import { renderListWithTemplate } from "./utils.mjs";

/*
  HOW THIS CARD CREATOR WORKS:
  Think of this like a rubber stamp. We give it one product's info,
  and it stamps out the exact HTML box to show that product on the page.
  The ${...} spots just fill in the blanks with the real title, photo, and price.
*/
function productCardTemplate(product) {
    return `
    <li class="product-card">
      <a href="product_pages/index.html?product=${product.Id}">
        <img
          src="${product.Image}"
          alt="Image of ${product.Name}"
        />
        <h3 class="card__brand">${product.Brand.Name}</h3>
        <h2 class="card__name">${product.NameWithoutBrand}</h2>
        <p class="product-card__price">$${product.ListPrice}</p>
      </a>
    </li>
  `;
}

/*
  WHAT THIS MAIN ENGINE DOES:
  This controls the whole list on the homepage. 
  1. It fetches the product data.
  2. It picks out only the 4 tents we want to show so the page isn't cluttered.
  3. It sends them to the screen so the shopper can see them.
*/
export default class ProductList {
    // Setup: remember what item category we want, where to fetch it, and where to put it
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
    }

    // Start button: grabs data, trims the list, and puts them on the page
    async init() {
        const list = await this.dataSource.getData();
        const filteredList = this.filterList(list);
        this.renderList(filteredList);
    }

    // Filter: only keep the 4 specific tents we want on the home page
    filterList(list) {
        const topProductIds = ["880RR", "985RF", "985PR", "344YJ"];
        return list.filter((product) => topProductIds.includes(product.Id));
    }

    // Display: uses our helper tool to draw the cards onto the screen
    renderList(list) {
        renderListWithTemplate(productCardTemplate, this.listElement, list);
    }
}