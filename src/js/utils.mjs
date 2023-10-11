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
    const backpackBadge = document.getElementById("cart-count");
    return backpackBadge.innerHTML = cartItems.length
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
    console.log(html);
    console.log(res);
    return html;
    }
  };
}

export function loadHeaderFooter(){
  const headerTemplateFn = loadTemplate("../partials/header.html");
  const footerTemplateFn = loadTemplate("../partials/footer.html");

  let header = document.querySelector("#main-header");

  let footer = document.querySelector("#main-footer");

  renderWithTemplate(headerTemplateFn, header);
  renderWithTemplate(footerTemplateFn, footer);

}