import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { getCartCountFromLocalStorage } from "./utils.mjs";

const backpackBadge = document.getElementById("cart-count");
backpackBadge.innerHTML = getCartCountFromLocalStorage();

const productId = getParam("product");
productDetails(productId);
