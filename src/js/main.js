import productList from "./productList.mjs";
import { updateCartCount } from "./utils.mjs";

productList("tents", document.querySelector(".product-list"));
updateCartCount();
