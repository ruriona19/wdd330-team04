import { getCartCountFromLocalStorage } from "./utils.mjs";

const backpackBadge = document.getElementById("cart-count");

backpackBadge.innerHTML = getCartCountFromLocalStorage();
