import { loadHeaderFooter } from "./utils.mjs";
import productList from "./productList.mjs";
import Alert from "./alert.js";

const alertInstance = new Alert();
alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements("test"));
loadHeaderFooter();
productList("tents", document.querySelector(".product-list"));
