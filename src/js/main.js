import { getCartCountFromLocalStorage } from "./utils.mjs";
import productList from "./productList.mjs";
import Alert from "./alert.js";

const backpackBadge = document.getElementById("cart-count");
backpackBadge.innerHTML = getCartCountFromLocalStorage();
const alertInstance = new Alert();
alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements());
productList("tents", document.querySelector(".product-list"));
