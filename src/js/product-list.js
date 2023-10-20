import { loadHeaderFooter,searchBar } from "./utils.mjs";
import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

const productCategory = getParam("category");

loadHeaderFooter();
document.querySelector(".category-title").textContent = productCategory;
productList(productCategory, document.querySelector(".product-list"));
searchBar();
