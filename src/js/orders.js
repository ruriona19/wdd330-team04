import { displayOrders } from "./adminProcess.mjs";
import { checkLogin } from "./auth.mjs";
import { getOrders } from "./externalServices.mjs";
import { loadHeaderFooter, searchBar } from "./utils.mjs";

const token = checkLogin();

async function main() {
  await loadHeaderFooter();
  searchBar();
}

main();

let tableSelector = document.querySelector(".table-body");
displayOrders(tableSelector);
