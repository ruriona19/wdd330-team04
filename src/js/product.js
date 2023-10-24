import { getParam, loadHeaderFooter } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { updateBreadcrumb } from "./product-list";

const productId = getParam("product");

document.addEventListener('DOMContentLoaded', async function () {
    //loadHeaderFooter();
    

    // Call productDetails and get the product details including category
    const productDetailsResult = await productDetails(productId);
    
    
    // Update breadcrumb with the category
    updateBreadcrumb(productDetailsResult.category, 0, false);
    
});

