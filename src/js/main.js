import { getCartCount } from "./utils.mjs";
import { getLocalStorage } from "./utils.mjs";
import productList from "./productList.mjs";

productList("tents", document.querySelector(".product-list"));

const cartItems = getLocalStorage("so-cart") || [];
//update the cart count
function updateCartCount(count) {
  const cartCount = document.getElementById("cart-count");
  cartCount.textContent = count;
}

updateCartCount(getCartCount(cartItems));
//trying to make it more dynamic by using a handle addtocartclick so it can update without refresh
function handleAddToCartClick() {
  const updatedCartCount = getCartCount(cartItems) + 1;
  updateCartCount(updatedCartCount);
}

// Add event listener to the "Add to Cart" button
document
  .querySelector("#addToCart")
  .addEventListener("click", handleAddToCartClick);
