import { getParam } from "./utils.mjs";
import productDetails from "./productDetails.mjs";
import { updateCartCount } from "./utils.mjs";

const productId = getParam("product");
productDetails(productId);
updateCartCount();
