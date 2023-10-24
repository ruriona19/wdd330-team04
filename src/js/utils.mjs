import { doc } from "prettier";
import { getData } from "./productData.mjs";

// wrapper for querySelector...returns matching element
export function qs(selector, parent = document) {
  return parent.querySelector(selector);
}
// or a more concise version if you are into that sort of thing:
// export const qs = (selector, parent = document) => parent.querySelector(selector);

// retrieve data from localstorage
export function getLocalStorage(key) {
  return JSON.parse(localStorage.getItem(key));
}
// save data to local storage
export function setLocalStorage(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}
// set a listener for both touchend and click
export function setClick(selector, callback) {
  qs(selector).addEventListener("touchend", (event) => {
    event.preventDefault();
    callback();
  });
  qs(selector).addEventListener("click", callback);
}

export function getParam(param) {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const product = urlParams.get(param);
  return product;
  }

//function for loading the items in cart count
export function getCartCountFromLocalStorage() {
  const cartItems = getLocalStorage('so-cart') || [];
  if (Array.isArray(cartItems)) {
    let totalQty = 0;
    cartItems.forEach(element => {
      totalQty += parseInt(element.Qty);
    });
    const backpackBadge = document.getElementById("cart-count");
    return backpackBadge.innerHTML = totalQty;
  }
}


export function renderList(list, el) {
  const htmlStrings =  list.map(productCardTemplate);
  el.insertAdjacentHTML('afterbegin', htmlStrings.join(''));
}

export function renderListWithTemplate(templateFn, parentElement, list, position = "afterbegin", clear = true){
  if (clear == true){
    parentElement.innerHTML = "";
  }
  const htmlStrings =  list.map(templateFn);
  parentElement.insertAdjacentHTML(position, htmlStrings.join(''));
}

export async function renderWithTemplate(templateFn, parentElement, data, callback, position="afterbegin", clear = true){
  if (clear == true){
    parentElement.innerHTML = "";
  }
  let template = await templateFn(data);
  parentElement.insertAdjacentHTML(position, template);
  getCartCountFromLocalStorage()
}

function loadTemplate(path){
  return async function () {
    const res = await fetch(path);
    
    if (res.ok) {
    const html = await res.text();
    return html;
    }
  };
}

export async function loadHeaderFooter(){

  const headerTemplateFn = loadTemplate("../partials/header.html");
  const footerTemplateFn = loadTemplate("../partials/footer.html");

  let header = document.querySelector("#main-header");

  let footer = document.querySelector("#main-footer");

  await renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);
  
}

export function substractDiscount(retailPrice, finalPrice){
  return retailPrice - finalPrice;
}

export function searchBar() {

  const resultContainer = document.querySelector(".product-search-list");
  //This function will update the list of items based on the category and input entered. 
  searchForQuery(resultContainer,);
  
}

async function searchForQuery(resultContainer) {
  const searchInput = document.querySelector("#search");
  const searchCategory = document.querySelector("#category-search");
  let searchCat = "tent";
  let productsSearchList = [];

  //This event listener changes the rendered list anytime the category is updated. 
  searchCategory.addEventListener("input",async e => {
    const value = e.target.value;
    searchCat = value;
    productsSearchList = await getData(searchCat)
    renderListWithTemplate(renderResultCard,resultContainer, productsSearchList)
  })

  //This event listener changes the rendered list anytime the input is updated by comparing 
  //the query entered with the name of the product if the user enters "back" it will look for
  //that sequence of letters in that order in the name property.
  searchInput.addEventListener("input", async e => {
    const value = e.target.value.toLowerCase();
    console.log(value);
    searchCat = searchCategory.value;
    let searchedList = document.querySelector(".product-search-list");
    
    if (searchedList){
    let liElements = searchedList.querySelectorAll("li");
    //This will loop through each element of the list generated from the category selected. 
    liElements.forEach(listElement => {
        let cardName = listElement.querySelector(".product-search-name")
        let cardNameContent = cardName.textContent.toLowerCase();
        //this variable returns true or false when the value entered is included in the name 
        //of the current product being iterated.
        const isVisible = cardNameContent.includes(value);
      //This if statement checks if the query entered matched the name of the product being iterated. 
      //if it does, then the current product <li> element is not modified, but if it doesn't match,
      //the else if condition will add "hide" to the classList of the <li> element, causing that
      //card to be hidden. 
        if (isVisible){
          if (listElement.classList.contains("hide")){
            listElement.classList.remove("hide");
          } else {
            return true;
          }
        } else if (!isVisible) {
          try{
          listElement.classList.toggle("hide", !isVisible);
        } catch(error) {
            alert("No results!");
        }

        }
  }
    )}
})
}

function renderResultCard(product) {

  return `<li class="product-search-card">
  <a href="/product_pages/index.html?product=${product.Id}">
    <img
      src="${product.Images.PrimaryMedium}"
      alt="${product.Name}"
    />
  </a>
  <a href="/product_pages/index.html?product=${product.Id}">
    <h2 class="product-search-name">${product.NameWithoutBrand}</h2>
  </a>
  <p class="product-search-price">${product.FinalPrice}</p>
</li>`;
}
