import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";

loadHeaderFooter();
productList("tents", document.querySelector(".product-list"));
