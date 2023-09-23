import { setLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";
import { getLocalStorage } from "./utils.mjs";

/**
 * Returns true if the local storage object that contains the
 * data related to the Cart is empty
 * @param {String} localStorageKey The name of the localStorage key.
 * @return {Boolean} A boolean flag to determine wheter the cart is empty or not.
 */
function isCartEmpty(localStorageKey) {
  return (getLocalStorage(localStorageKey) === null) ? true : false;
}

function addProductToCart(product) {
  let products;
  if(isCartEmpty("so-cart")){
    products = [];
  }else{
    products = getLocalStorage("so-cart");
  }

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
