# BYU-Pathway Worldwide Online

## WDD 330 - Web Frontend Development II

### ⛺ SleepOutside Starter Code

- This repository is the start of the SleepOutside web application project for WDD 330. The repository contains branches which are checkpoints for the team and individual assignments throughout the course.

- <https://byui-cse.github.io/wdd330-ww-course/week01/team.html>

### Prerequisites

- You must have Node installed to run the following commands.
[WDD 330 Setup Environment](https://byui-cse.github.io/wdd330-ww-course/intro/)

### Common Workflow Commands

- `npm run lint` to run ESLint against your code to find errors.
- `npm run format` to run Prettier to automatically format your code.
- `npm run start` starts up a local server and updates on any JS or CSS/SCSS
- `npm run build` to build final files when you are ready to turn in.

---
_BYU-Pathway Worldwide improves lives through access to spiritually based, online affordable higher education. Its mission is to develop disciples of Jesus Christ who are leaders in their homes, the Church, and their communities._


## Dynamic Product Detail Architecture (Week 2)

### What Was Happening Before
The project had 4 separate static HTML files for 4 tents (`marmot-ajax-3.html`, `cedar-ridge-rimrock-2.html`, etc.). If an online store had 1,000 items, building 1,000 separate HTML files would be impossible to maintain.

### How It Works Now
We replaced those separate files with one single reusable template page (`src/product_pages/index.html`):

1. **One Reusable Page:** `src/product_pages/index.html` acts like an empty picture frame ready for any tent.
2. **Read the Link:** When someone clicks a tent link like `?product=880RR`, our helper `getParam()` reads `880RR`.
3. **Look Up the Item:** `ProductData.mjs` searches the tent list to find the matching tent details.
4. **Fill the Frame:** `ProductDetails.mjs` stamps the tent's name, price, picture, and description into the page and activates the "Add to Cart" button.


