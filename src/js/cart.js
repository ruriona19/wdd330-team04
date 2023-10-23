import { loadHeaderFooter, searchBar } from "./utils.mjs";
import { renderCartContents } from "./shoppingCart.mjs";

renderCartContents();
async function main() {
  await loadHeaderFooter();
  searchBar();
}
main();
