import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage, getCartCountFromLocalStorage } from "./utils.mjs";



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
    let cartCount = getCartCountFromLocalStorage();
    cartCount++;
    const product = await findProductById(e.target.dataset.id);
    const backpackBadge = document.getElementById("cart-count");

    addProductToCart(product);

    // Add Cart Button animated
    this.innerHTML = "Adding, please wait";

    setTimeout(() => {
      this.innerHTML = "Added To Cart!";
      backpackBadge.innerHTML = cartCount;
      backpackBadge.style.fontSize = "20px";
    }, 2500);

    setTimeout(() => {
      this.innerHTML = "Add to Cart";
      backpackBadge.style.fontSize = "10px";
    }, 5000);
    
}
 

function addProductToCart(product) {
    // Get the current cart items from local storage or initialize an empty array
    let cartItems = getLocalStorage("so-cart") || [];
  
    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
  
    // Add the product to the cartItems array
    cartItems.push(product);
  
    // Store the updated cartItems back in local storage
    setLocalStorage("so-cart", cartItems);
  }

function renderProductDetails(object) {
    const id = object.Id;
    const name = object.Name;
    const nameWithoutBrand = object.NameWithoutBrand;
    const image = object.Image;
    const price = object.FinalPrice;
    const color = object.Colors.ColorName;
    const description = object.DescriptionHtmlSimple;

    document.querySelector("#productName").textContent = name;
    document.querySelector("#productNameWithoutBrand").textContent = nameWithoutBrand;
    document.querySelector("#productImage").setAttribute("src", image);
    document.querySelector("#productImage").setAttribute("alt",name);
    document.querySelector("#productFinalPrice").textContent = price;
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

