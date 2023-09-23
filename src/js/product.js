import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

let products = [];

function addProductToCart(product) {
  products.push(product);
  setLocalStorage("so-cart", products);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
