import { loadHeaderFooter } from "./utils.mjs";
import checkoutProcess from "./checkoutProcess.mjs";

loadHeaderFooter();

checkoutProcess.init("so-cart", ".checkout-summary");

document
  .querySelector("#zip")
  .addEventListener(
    "blur",
    checkoutProcess.calculateOrdertotal.bind(checkoutProcess)
  );

// this is how it would look if we listen for the submit on the form
document.forms["checkout"].addEventListener("submit", (e) => {
  e.preventDefault();
  let myForm = document.forms[0];
  let check_status = myForm.checkValidity();
  myForm.reportValidity();

  // e.target would contain our form in this case
  if (check_status) {
    checkoutProcess.checkout(e.target);
  }
});
