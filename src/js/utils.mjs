/*
  HINT: Helper Utilities
  PURPOSE: Provide shared functions for reading browser storage, saving data, and parsing links.
  VALUE: Keeps common tasks organized in one place so multiple scripts can reuse them.
  RATIONALE: Using standard ES Module exports lets any script import only what it needs.
*/

// FUNCTION: getLocalStorage
// PURPOSE: Read data saved in the browser's local storage memory.
// VALUE: Lets our cart persist even if the user refreshes the page or leaves.
// LEARNING GAP: Local storage only stores plain text strings, so JSON.parse converts it back into real JavaScript objects/arrays.
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}

// FUNCTION: setLocalStorage
// PURPOSE: Save data into the browser's local storage memory.
// VALUE: Keeps track of cart items across multiple pages.
// LEARNING GAP: You cannot save a raw JavaScript object/array directly into localStorage; JSON.stringify converts it to plain text first.
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// FUNCTION: getParam
// PURPOSE: Reads a specific parameter from the current URL query string.
// EXAMPLE: If URL is '.../index.html?product=880RR', calling getParam('product') returns '880RR'.
// VALUE: Allows one single HTML template to display any product based on the ID passed in the link.
// RATIONALE: Using the built-in URLSearchParams avoids messy manual string splitting and regex.
// LEARNING GAP: Must have 'export' in front so 'product.js' can import it without crashing.
export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  return urlParams.get(param);
}