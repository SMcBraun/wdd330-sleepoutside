// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}
//trying to push a change

// -----------------------------------------------------------------------------
// TOOL 5: getParam (Read URL Query Parameters)
// -----------------------------------------------------------------------------
// WHAT IT DOES: Reads specific variables passed through the browser's address bar.
// WHY WE DO IT: We don't want to build 100 different HTML files for 100 products.
// Instead, we use one generic page: "product_pages/index.html?product=880RR".
// This helper inspects that web address, pulls out "880RR", and hands it to our
// JavaScript so the page knows which product's details to download and display.
// PARAMETERS:
//   - "param": The key name we are looking for in the web address (e.g., "product").
export function getParam(param) {
  // "window.location.search" extracts the question mark and everything after it (e.g., "?product=880RR").
  const queryString = window.location.search;

  // "URLSearchParams" is a built-in browser engine that splits query strings into key/value pairs.
  const urlParams = new URLSearchParams(queryString);

  // We ask the engine for the exact value paired with our key name, and return it.
  return urlParams.get(param);
}

/**
 * ============================================================================
 * LEARNING NOTE / VIDEO SCRIPT: renderListWithTemplate Utility
 * ----------------------------------------------------------------------------
 * A pure, reusable helper function that maps any data array through any
 * template function and inserts the resulting HTML string into the DOM.
 * Includes optional parameters for insertion position and element clearing.
 * ============================================================================
 */
export function renderListWithTemplate(
  templateFn,
  parentElement,
  list,
  position = "afterbegin",
  clear = false
) {
  if (clear) {
    parentElement.innerHTML = "";
  }
  const htmlStrings = list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(""));
}