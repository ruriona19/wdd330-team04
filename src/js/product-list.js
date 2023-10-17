import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import { getParam } from "./utils.mjs";



//The DOMContentLoaded event ensures that the DOM is fully loaded before executing the JavaScript code. 
document.addEventListener('DOMContentLoaded', async function () { // that way I must to put everything inside it to be sure everything is loaded before counting
  const productCategory = getParam("category");
  const products = await productList(productCategory, document.querySelector(".product-list")); //it is asyncronoum
  loadHeaderFooter();
  document.querySelector(".category-title").textContent = productCategory;

  console.log(products);

  // update the breadcrumb after everything is loaded
  updateBreadcrumb(productCategory, products);
});

function updateBreadcrumb(category, count) {
  const breadcrumbElement = document.getElementById('breadcrumb');

  if (category) {
    breadcrumbElement.textContent = `${category} > (${count} items)`; //assign the texto to the breadcrumb
  } else {
    breadcrumbElement.style.display = 'none'; // it hides the breadcrumb if there's no category, not necessary actually
  }
}

