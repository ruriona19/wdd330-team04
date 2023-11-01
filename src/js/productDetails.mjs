import { findProductById } from "./externalServices.mjs";
import { setLocalStorage, getLocalStorage, getCartCountFromLocalStorage } from "./utils.mjs";
import Alert from "./alert.js";



const addButton = document.querySelector("#addToCart");

export default async function productDetails(productId) {
    const productInformation = await findProductById(productId);
    if (productInformation == undefined) {
      renderNotFoundMessage();
      addButton.remove();
    } else {
    renderProductDetails(productInformation);
    addButton.addEventListener("click", addToCartHandler);
    return {
      
    category: productInformation.Category, //return product category
  };
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
    let selectedQty = parseInt(document.querySelector("#product-selected-qty").value);
    // Ensure cartItems is an array
    if (!Array.isArray(cartItems)) {
      cartItems = [];
    }
    let check = checkProductInCart(product, cartItems);
    // If product already is in cart, add qty by 1, if not, add to cart
    if (check == true){
      let index = returnIndexOfProductInCart(product, cartItems);
      let newCount = parseInt(cartItems[index].Qty) + selectedQty;
      cartItems[index].Qty = newCount;
    } else {
      product.Qty = selectedQty;
      cartItems.push(product);
    }
  
    // Store the updated cartItems back in local storage
    setLocalStorage("so-cart", cartItems);
  }


export function renderProductDetails(object, quickView = false) {
  const id = object.Id;
  const name = object.Name;
  const nameWithoutBrand = object.NameWithoutBrand;
  const imageSrc1 = object.Images.PrimaryExtraLarge;
  const imageSrc2 = object.Images.PrimaryLarge;
  const imageSrc3 = object.Images.PrimaryMedium;
  const price = "$" + object.FinalPrice;
  const retailPrice = "$" + object.SuggestedRetailPrice;
  const color = object.Colors.ColorName;
  const description = object.DescriptionHtmlSimple;
  const selectQty = document.querySelector("#product-selected-qty");

  document.querySelector("#productName").textContent = name;
  document.querySelector("#productNameWithoutBrand").textContent = nameWithoutBrand;
  if (!quickView){
    document.querySelector(".source-1").setAttribute("srcset", imageSrc1);
    document.querySelector(".source-2").setAttribute("srcset", imageSrc2);
    document.querySelector("#productImage").setAttribute("src", imageSrc3);
    document.querySelector("#productImage").setAttribute("alt",name);
  } else {
    document.querySelector("#productImage").setAttribute("src", imageSrc3);
    document.querySelector("#productImage").setAttribute("alt",name);
  }
  document.querySelector("#productFinalPrice").textContent = price;
  document.querySelector("#suggestedRetailPrice").textContent = retailPrice;
  document.querySelector("#discountFlag").textContent = getDiscountPercentage(object.SuggestedRetailPrice, object.FinalPrice);
  document.querySelector("#productColorName").textContent = color;
  document.querySelector("#productDescriptionHtmlSimple").innerHTML = description;
  document.querySelector("#addToCart").setAttribute("data-id", id);


    // Create selection options for qty dropdown menu

    let maxQty = 4; // Allow to modify max qty per item if needed

    for (let index = 1; index <= maxQty; index++) {
      let option = new Option(`${index}`, index);
      selectQty.append(option);
    }
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

function getDiscountPercentage(oldPrice, newPrice) {
  let oPrice = Number(oldPrice),
  nPrice = Number(newPrice);
  if (nPrice > oPrice) {
    let percentage = nPrice / oPrice * 100 - 100;
    let additionPercentage = parseInt(percentage) + "% UP";
    return additionPercentage;
  } else if (nPrice < oPrice) {
    let percentage = -nPrice / oPrice * 100 + 100;
    let discountPercentage = parseInt(percentage) + "% OFF";
    return discountPercentage;
  }
};


export async function createQuickView(e){
  
  const product = await findProductById(e.target.dataset.id);
  
  let modal = document.createElement("div");
  modal.classList.add("modal");
  
   let closeBtn = document.createElement("button");
  closeBtn.textContent = "X";
  closeBtn.classList.add("close");
  closeBtn.addEventListener("click", close);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.addEventListener("click", close)
    
  modal.appendChild(closeBtn);

  let productSection = document.createElement("section");
  productSection.insertAdjacentHTML("afterbegin",`<h3 id="productName"></h3>
  <h2 class="divider" id="productNameWithoutBrand"></h2>
  <img id="productImage" class="divider" src="" alt="" />
  <p class="product__description" id="productDescriptionHtmlSimple"></p>
  <div class="product-price-discount">
    <p class="product-card__price" id="productFinalPrice"></p>
    <p class="line-through" id="suggestedRetailPrice"></p>
  </div>
  <p class="product__color" id="productColorName"></p>
  <label class="product__quantity"
    >Quantity:
    <select id="product-selected-qty"></select
  ></label>
  <div class="product-detail__add">
    <button id="addToCart" data-id="">Add to Cart</button>
  </div>
  <div id="discountFlag"></div>`);


  modal.appendChild(productSection);

  document.body.append(modal);
  document.body.append(overlay);

  renderProductDetails(product, true);
  const addButton = document.querySelector("#addToCart");
  addButton.addEventListener("click", async function() {
    await addToCartHandler(e);
    close();
  });


  function close(){
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  }
}
