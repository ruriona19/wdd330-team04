import { findProductById } from "./productData.mjs";
import { setLocalStorage, getLocalStorage } from "./utils.mjs";


export default  async function productDetails(productId) {
    const productInformation = await findProductById(productId);
    renderProductDetails(productInformation);

    document.querySelector("#addToCart").addEventListener("click", addToCartHandler);
}

//add to cart button event handler
async function addToCartHandler(e) {
    const product = await findProductById(e.target.dataset.id);
    addProductToCart(product);
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

