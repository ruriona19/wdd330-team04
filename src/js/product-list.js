import { loadHeaderFooter, searchBar, updateBreadcrumb } from "./utils.mjs";
import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";

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

  // update the breadcrumb after everything is loaded
  updateBreadcrumb(productCategory, products);
});
