import { setLocalStorage } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import { findProductById } from "./productData.mjs";

function checkCart(localStorageKey){
  console.log(getLocalStorage(localStorageKey));
  if (getLocalStorage(localStorageKey) === null){
  return false;
  } else {
    return true;
  }
}

function addProductToCart(product) {
  let orderedItems = [];
  if(checkCart("so-cart") == true ){
  orderedItems = getLocalStorage("so-cart");
  orderedItems.push(product);
  setLocalStorage("so-cart", orderedItems);
  } else {
    orderedItems.push(product);
    setLocalStorage("so-cart", orderedItems);
    
  }
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
