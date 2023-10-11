import { getCartCountFromLocalStorage, loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";


//const backpackBadge = document.getElementById("cart-count");
//backpackBadge.innerHTML = getCartCountFromLocalStorage();

productList("tents", document.querySelector(".product-list"));
loadHeaderFooter();

