import { loadHeaderFooter, searchBar } from "./utils.mjs";
import Alert from "./alert.js";

const alertInstance = new Alert();
alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements());

async function main() {
  await loadHeaderFooter();
  searchBar();
}

main();
