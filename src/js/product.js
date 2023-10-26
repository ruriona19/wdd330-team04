import {
  getParam,
  loadHeaderFooter,
  updateBreadcrumb,
  searchBar,
} from "./utils.mjs";
import productDetails from "./productDetails.mjs";

const productId = getParam("product");

async function main() {
  await loadHeaderFooter();
  searchBar();
}
main();

document.addEventListener("DOMContentLoaded", async function () {
  // Call productDetails and get the product details including category
  const productDetailsResult = await productDetails(productId);

  // Update breadcrumb with the category
  updateBreadcrumb(productDetailsResult.category, 0, false);
});
