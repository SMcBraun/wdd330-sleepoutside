/*
  HINT: Module Imports
  PURPOSE: Bring in the helper tools needed to run this page.
  VALUE: Splits large code files into small, focused workers.
  RATIONALE: 'utils.mjs' reads the web link, 'ProductData.mjs' fetches the file, 
             and 'ProductDetails.mjs' draws the product on screen.
  LEARNING GAP: Always include the file extensions (.mjs or .js) in browser module imports.
*/
import { getParam } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductDetails from "./ProductDetails.mjs";

/*
  HINT: Step 1 - Stockroom Worker
  PURPOSE: Tells ProductData to open the "tents" category list.
  VALUE: Prepares our data fetcher so it knows where to search.
*/
const dataSource = new ProductData("tents");

/*
  HINT: Step 2 - Read Order Ticket
  PURPOSE: Pulls the product ID out of the address bar (?product=880RR -> "880RR").
  VALUE: Allows this single file to work for any tent clicked.
  LEARNING GAP: If the URL has no '?product=', this returns null.
*/
const productId = getParam("product");

/*
  HINT: Step 3 - Create Floor Manager
  PURPOSE: Bundles the tent ID and the data reader into a ProductDetails object.
  VALUE: Keeps all rendering and cart-handling logic isolated in one clean helper class.
*/
const product = new ProductDetails(productId, dataSource);

/*
  HINT: Step 4 - Initialize
  PURPOSE: Starts the sequence: fetches the tent data, builds the HTML, and hooks up the Add to Cart button.
  VALUE: Ensures the HTML elements exist BEFORE trying to attach the click listener, preventing null errors.
*/
product.init();