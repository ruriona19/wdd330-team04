import { loadHeaderFooter, searchBar, getParam } from "./utils.mjs";
import { login } from "./auth.mjs";

async function main() {
  await loadHeaderFooter();
  searchBar();
}

main();

const redirect = getParam("redirect");

let loginBtn = document.querySelector("#login-btn");

loginBtn.addEventListener("click", function () {
  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  let credentials = { email, password };
  login(credentials, redirect);
});
