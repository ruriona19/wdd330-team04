import { loadHeaderFooter, searchBar, firsTimeVisit  } from "./utils.mjs";
import Alert from "./alert.js";

const alertInstance = new Alert();
alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements());
let visitBox = document.querySelector(".first-visit");

async function main() {
  await loadHeaderFooter();
  searchBar();
  firsTimeVisit(visitBox);
}

main();
