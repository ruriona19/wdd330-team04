import {
  getParam,
  loadHeaderFooter,
  updateBreadcrumb,
  searchBar,
} from "./utils.mjs";
import productDetails, { renderSuggestions, createQuickView } from "./productDetails.mjs";

const productId = getParam("product");

const suggestionsList = document.querySelector(".product-list");


async function main() {
  await loadHeaderFooter();
  searchBar();
}
main();

document.addEventListener("DOMContentLoaded", async function () {
  // Call productDetails and get the product details including category
  const productDetailsResult = await productDetails(productId);
   await renderSuggestions(suggestionsList);

  const qvBtns = document.querySelectorAll(".quick-view");
  qvBtns.forEach((btn) => {
    btn.addEventListener("click", createQuickView);
  });

  // Update breadcrumb with the category
  updateBreadcrumb(productDetailsResult.category, 0, false);
});
