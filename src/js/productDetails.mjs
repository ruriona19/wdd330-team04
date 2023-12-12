import { findProductById, getProductsByCategory } from "./externalServices.mjs";
import {
  setLocalStorage,
  getLocalStorage,
  getCartCountFromLocalStorage,
  renderListWithTemplate,
  firsTimeVisit,
} from "./utils.mjs";
import Alert from "./alert.js";
import { productCardTemplate } from "./productList.mjs";

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

function removeColorsFromProduct(product, wantedColor) {
  // Get Colors array and remove all expect for wanted color
  const colors = product.Colors;
  const userColor = colors.filter((color) => color.ColorName == wantedColor);
  product.Colors = userColor;
}

//add to cart button event handler
async function addToCartHandler(e) {
  const product = await findProductById(e.target.dataset.id);
  const backpackBadge = document.getElementById("cart-count");
  try {
    //Leave only color chose by user
    let userColor = document.querySelector("input[type = radio]:checked").value;
    removeColorsFromProduct(product, userColor);

    addProductToCart(product);

    let cartCount = getCartCountFromLocalStorage();

    const alertInstance = new Alert();
    window.scrollTo(0, 0);
    alertInstance
      .AlertsDatafetch()
      .then(() => alertInstance.buildAlertElements("item added"));
    backpackBadge.innerHTML = cartCount;
    backpackBadge.style.fontSize = "20px";

    setTimeout(() => {
      backpackBadge.style.fontSize = "10px";
    }, 1000);
  } catch (error) {
    const alertInstance = new Alert();
    window.scrollTo(0, 0);
    alertInstance
      .AlertsDatafetch()
      .then(() => alertInstance.buildAlertElements("color not selected"));
  }
}

function checkProductInCart(product, cart) {
  let check = false;
  cart.forEach((element) => {
    if (
      element.Id === product.Id &&
      element.Colors[0].ColorName == product.Colors[0].ColorName
    ) {
      check = true;
    }
  });
  return check;
}

function returnIndexOfProductInCart(product, cart) {
  for (let index = 0; index < cart.length; index++) {
    const element = cart[index];
    if (
      element.Id === product.Id &&
      element.Colors[0].ColorName == product.Colors[0].ColorName
    ) {
      return index;
    }
  }
}

function addProductToCart(product) {
  // Get the current cart items from local storage or initialize an empty array
  let cartItems = getLocalStorage("so-cart") || [];
  let selectedQty = parseInt(
    document.querySelector("#product-selected-qty").value
  );
  // Ensure cartItems is an array
  if (!Array.isArray(cartItems)) {
    cartItems = [];
  }
  let check = checkProductInCart(product, cartItems);
  // If product already is in cart, add qty by 1, if not, add to cart
  if (check == true) {
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
  const colors = object.Colors;
  const description = object.DescriptionHtmlSimple;
  let selectQty = document.querySelector("#product-selected-qty");
  const imagesContainer = document.querySelector(".picture-container");

  let parent = document.querySelector("[data-product-info]");

  if (quickView){
    parent = document.querySelector("[data-modal]");
  }

  parent.querySelector("#productName").textContent = name;
  parent.querySelector("#productNameWithoutBrand").textContent =
    nameWithoutBrand;
  if (!quickView) {
    if (object.Images.ExtraImages != null) {
      loadImageCarousel(object.Images.ExtraImages, imagesContainer);
      slideMovingFunctionality();
    }
    document.querySelector(".source-1").setAttribute("srcset", imageSrc1);
    document.querySelector(".source-2").setAttribute("srcset", imageSrc2);
    document.querySelector("#productImage").setAttribute("src", imageSrc3);
    document.querySelector("#productImage").setAttribute("alt", name);
  } else {
    parent.querySelector("#productImage").setAttribute("src", imageSrc3);
    parent.querySelector("#productImage").setAttribute("alt", name);
  }
  parent.querySelector("#productFinalPrice").textContent = price;
  parent.querySelector("#suggestedRetailPrice").textContent = retailPrice;
  parent.querySelector("#discountFlag").textContent = getDiscountPercentage(
    object.SuggestedRetailPrice,
    object.FinalPrice
  );
  let productDiv = parent.querySelector("#productColorName");
  renderColorsOption(colors, productDiv);
  parent.querySelector("#productDescriptionHtmlSimple").innerHTML =
    description;
    parent.querySelector("#addToCart").setAttribute("data-id", id);

  // Create selection options for qty dropdown menu

  let maxQty = 4; // Allow to modify max qty per item if needed
  selectQty = parent.querySelector("#product-selected-qty");

  for (let index = 1; index <= maxQty; index++) {
    let option = new Option(`${index}`, index);
    selectQty.append(option);
  }
}

function renderColorsOption(colors, selector) {
  // For each color available create a label and a radio option with a swatch
  for (let index = 0; index < colors.length; index++) {
    let label = document.createElement("label");
    label.classList.add("product-color");
    label.textContent = colors[index].ColorName;

    let option = document.createElement("input");
    option.setAttribute("type", "radio");
    option.setAttribute("name", "color-option");
    option.setAttribute("value", colors[index].ColorName);

    let img = document.createElement("img");
    img.setAttribute("src", colors[index].ColorChipImageSrc);
    img.setAttribute("alt", colors[index].ColorName);
    img.classList.add("color-img");

    label.appendChild(option);
    label.appendChild(img);
    selector.appendChild(label);
  }
  // Make first color default selected
  selector.querySelectorAll(`input[name="color-option"]`)[0].checked = true;
}

function renderNotFoundMessage() {
  const productDetail = document.querySelector(".product-detail");
  productDetail.insertAdjacentHTML(
    "afterbegin",
    `<h2>Product not found</h2>
  <p>We're sorry for the inconvenience! We always work hard to give you 
  the best catalog, unfortunately, right now this product is not available 
  to order, please check back again later to see if the product is 
  back or try a different name...</p>
  <a href="../index.html">Click here to see other products</a>`
  );
}

function getDiscountPercentage(oldPrice, newPrice) {
  let oPrice = Number(oldPrice),
    nPrice = Number(newPrice);
  if (nPrice > oPrice) {
    let percentage = (nPrice / oPrice) * 100 - 100;
    let additionPercentage = parseInt(percentage) + "% UP";
    return additionPercentage;
  } else if (nPrice < oPrice) {
    let percentage = (-nPrice / oPrice) * 100 + 100;
    let discountPercentage = parseInt(percentage) + "% OFF";
    return discountPercentage;
  }
}

export async function createQuickView(e) {
  const product = await findProductById(e.target.dataset.id);

  let modal = document.createElement("div");
  modal.classList.add("modal");


  let closeBtn = document.createElement("button");
  closeBtn.textContent = "X";
  closeBtn.classList.add("close");
  closeBtn.addEventListener("click", close);

  let overlay = document.createElement("div");
  overlay.classList.add("overlay");
  overlay.addEventListener("click", close);

  modal.appendChild(closeBtn);

  let productSection = document.createElement("section");
  productSection.setAttribute("data-modal", "");
  productSection.insertAdjacentHTML(
    "afterbegin",
    `<h3 id="productName"></h3>
  <h2 class="divider" id="productNameWithoutBrand"></h2>
  <img id="productImage" class="divider" src="" alt="" />
  <p class="product__description" id="productDescriptionHtmlSimple"></p>
  <div class="product-price-discount">
    <p class="product-card__price" id="productFinalPrice"></p>
    <p class="line-through" id="suggestedRetailPrice"></p>
  </div>
  <div class="product__color" id="productColorName"></div>
  <label class="product__quantity"
    >Quantity:
    <select id="product-selected-qty"></select
  ></label>
  <div class="product-detail__add">
    <button id="addToCart" data-id="">Add to Cart</button>
  </div>
  <div id="discountFlag"></div>`
  );

  modal.appendChild(productSection);

  document.body.append(modal);
  document.body.append(overlay);

  renderProductDetails(product, true);
  const addButton = document.querySelector("[data-modal]").querySelector("#addToCart");
  addButton.addEventListener("click", async function () {
    await addToCartHandler(e);
    close();
  });

  function close() {
    document.body.removeChild(modal);
    document.body.removeChild(overlay);
  }
}

async function getSuggestions(
  category1 = "tents",
  category2 = "sleeping-bags",
  category3 = "backpacks",
  category4 = "hammocks",
  productId
) {
  const categories = [category1, category2, category3, category4];
  let listedProductArrays = await Promise.all(
    categories.map((category) => getProductsByCategory(category))
  );
  let listedProducts = listedProductArrays.flat(1);
  let shuffled = listedProducts.sort(() => 0.5 - Math.random());
  let filteredProduct = shuffled.slice(0, 3);
  filteredProduct.forEach((product) => {
    if (product == productId){
      product = shuffled[5];
    }
  });
  return filteredProduct;
}

export async function renderSuggestions(selector, renderedProductId) {
  renderListWithTemplate(productCardTemplate, selector, await getSuggestions(renderedProductId));
}

function loadImageCarousel(extraImages, selector) {
  //Empty parent container
  //selector.innerHTML = "";

  // Setup previous and next btns
  let btnPrev = document.createElement("button");
  let btnNext = document.createElement("button");
  btnPrev.classList.add("carousel-btn");
  btnPrev.classList.add("prev");
  btnPrev.setAttribute("data-button", "prev");
  btnPrev.innerHTML = "&#8249;";

  btnNext.classList.add("carousel-btn");
  btnNext.classList.add("next");
  btnNext.innerHTML = "&#8250;";
  btnNext.setAttribute("data-button", "next");

  //Creation of ul as container for pictures
  let ul = document.createElement("ul");
  ul.setAttribute("data-slides", "");

  let li = document.createElement("li");
  let pictureElement = document.querySelector(".original-picture");
  li.classList.add("slide");
  li.classList.add("active");
  li.appendChild(pictureElement);
  ul.appendChild(li);

  for (let i = 0; i < extraImages.length; i++) {
    const imageSrc = extraImages[i].Src;
    const imageAlt = extraImages[i].Title;

    let slide = document.createElement("li");
    slide.classList.add("slide");

/*     // Set first image as active
    if (i == 0) {
      slide.classList.add("active");
    } */

    let img = document.createElement("img");
    img.setAttribute("src", imageSrc);
    img.setAttribute("alt", imageAlt);

    slide.appendChild(img);
    ul.appendChild(slide);
  }

  // Append all children to parent element
  selector.appendChild(ul);
  selector.appendChild(btnPrev);
  selector.appendChild(btnNext);
}

function slideMovingFunctionality() {
  const buttons = document.querySelectorAll(".carousel-btn");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const offset = button.dataset.button === "next" ? 1 : -1;
      const slides = button
        .closest(".picture-container")
        .querySelector("[data-slides]");

      const activeSlide = slides.querySelector(".active");
      let newIndex = [...slides.children].indexOf(activeSlide) + offset;
      if (newIndex < 0) {
        newIndex = slides.children.length - 1;
      }
      if (newIndex >= slides.children.length) {
        newIndex = 0;
      }

      activeSlide.classList.remove("active");
      slides.children[newIndex].classList.add("active");
    });
  });
}
