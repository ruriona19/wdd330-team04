import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

const productCategory = getParam("category");

loadHeaderFooter();
productList(productCategory, document.querySelector(".product-list"));
