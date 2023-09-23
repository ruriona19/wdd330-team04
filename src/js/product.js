import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";

function addProductToCart(product) {
  // Get the current cart items from local storage or initialize an empty array
  let cartItems = getLocalStorage("so-cart") || [];

  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }

  // Add the product to the cartItems array
  cartItems.push(product);

  // Store the updated cartItems back in local storage
  setLocalStorage("so-cart", cartItems);
}
// add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  console.log(product);
  addProductToCart(product);
  console.log("Product added to cart");
}

// add listener to Add to Cart button
document
  .getElementById("addToCart")
  .addEventListener("click", addToCartHandler);
