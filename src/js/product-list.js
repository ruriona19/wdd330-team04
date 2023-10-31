import {
  loadHeaderFooter,
  searchBar,
  updateBreadcrumb,
  getParam,
} from "./utils.mjs";
import productList from "./productList.mjs";
import { createQuickView } from "./productDetails.mjs";

const productCategory = getParam("category");
//document.querySelector(".category-title").textContent = productCategory;

async function main() {
  await loadHeaderFooter();
  searchBar();
}
main();

//The DOMContentLoaded event ensures that the DOM is fully loaded before executing the JavaScript code.
document.addEventListener("DOMContentLoaded", async function () {
  // that way I must to put everything inside it to be sure everything is loaded before counting

  //productList(productCategory, document.querySelector(".product-list"));
  const products = await productList(
    productCategory,
    document.querySelector(".product-list")
  ); //it is asyncronoum

  //loadHeaderFooter();
  document.querySelector(".category-title").textContent = productCategory;

  //add quick lookup functionality to the QL Buttons
  const qvBtns = document.querySelectorAll(".quick-view");
  qvBtns.forEach((btn) => {
    btn.addEventListener("click", createQuickView);
  });

  // update the breadcrumb after everything is loaded
  updateBreadcrumb(productCategory, products);
});
