import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, getCartCountFromLocalStorage } from "./utils.mjs";
import Alert from "./alert.js";



const addButton = document.querySelector("#addToCart");

export default async function productDetails(productId) {
    console.log("productDetails");
    const productInformation = await findProductById(productId);
    if (productInformation == undefined) {
      renderNotFoundMessage();
      addButton.remove();
    } else {
    renderProductDetails(productInformation);
    addButton.addEventListener("click", addToCartHandler);
    }
}

//add to cart button event handler
async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    const backpackBadge = document.getElementById("cart-count");

    addProductToCart(product); 
    
    let cartCount = getCartCountFromLocalStorage();

    const alertInstance = new Alert();
    alertInstance.AlertsDatafetch().then(() => alertInstance.buildAlertElements("item added"));
    backpackBadge.innerHTML = cartCount;
    backpackBadge.style.fontSize = "20px";


    setTimeout(() => {
      backpackBadge.style.fontSize = "10px";
    }, 1000);
    
}

function checkProductInCart(product, cart){
    let check = false;
    cart.forEach(element => {
      if (element.Id === product.Id){
        check = true;
      }
    });
    return check;
}

function returnIndexOfProductInCart(product, cart){
    for (let index = 0; index < cart.length; index++) {
      const element = cart[index];
      if (element.Id === product.Id){
        return index;
      }
      
    }
}

function addProductToCart(product) {
    // Get the current cart items from local storage or initialize an empty array
    let cartItems = getLocalStorage("so-cart") || [];
  
    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    let check = checkProductInCart(product, cartItems);
    // If product already is in cart, add qty by 1, if not, add to cart
    if (check == true){
      let index = returnIndexOfProductInCart(product, cartItems);
      let newCount = parseInt(cartItems[index].Qty) + 1;
      cartItems[index].Qty = newCount;
    } else {
      product.Qty = 1;
      cartItems.push(product);
    }
  
    // Store the updated cartItems back in local storage
    setLocalStorage("so-cart", cartItems);
  }

function renderProductDetails(object) {
    const id = object.Id;
    const name = object.Name;
    const nameWithoutBrand = object.NameWithoutBrand;
    const image = object.Image;
    const price = "$" + object.FinalPrice;
    const retailPrice = "$" + object.SuggestedRetailPrice;
    const color = object.Colors.ColorName;
    const description = object.DescriptionHtmlSimple;

    document.querySelector("#productName").textContent = name;
    document.querySelector("#productNameWithoutBrand").textContent = nameWithoutBrand;
    document.querySelector("#productImage").setAttribute("src", image);
    document.querySelector("#productImage").setAttribute("alt",name);
    document.querySelector("#productFinalPrice").textContent = price;
    document.querySelector("#suggestedRetailPrice").textContent = retailPrice;
    document.querySelector("#productColorName").textContent = color;
    document.querySelector("#productDescriptionHtmlSimple").innerHTML = description;
    document.querySelector("#addToCart").setAttribute("data-id", id);
}

function renderNotFoundMessage(){
  const productDetail = document.querySelector(".product-detail");
  productDetail.insertAdjacentHTML( "afterbegin", `<h2>Product not found</h2>
  <p>We're sorry for the inconvenience! We always work hard to give you 
  the best catalog, unfortunately, right now this product is not available 
  to order, please check back again later to see if the product is 
  back or try a different name...</p>
  <a href="../index.html">Click here to see other products</a>`);

}

