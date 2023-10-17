import {
    getLocalStorage,
    setLocalStorage,
    getCartCountFromLocalStorage,
    loadHeaderFooter,
  } from "./utils.mjs";

  export function renderCartContents() {
    let productContainer = document.querySelector(".products");
    let productList = document.querySelector(".product-list");
    try {
      const cartItems = getLocalStorage("so-cart");
      if (cartItems == null || cartItems.length === 0) {
        productContainer.innerHTML = renderEmptyMessage();
      } else {
        const htmlItems = cartItems.map((item) => cartItemTemplate(item));
        productList.innerHTML = htmlItems.join("");
        calculateTotal(cartItems);
        addRemoveFunctionality();
      }
    } catch (error) {
      alert(error.message);
    }
  }

  function calculateTotal(products) {
    // display total in cart page
    let totalCartBox = document.querySelector(".cart-total-box");
    totalCartBox.style.display = "block";
  
    let cartTotal = document.querySelector(".cart-total");
  
    let total = 0;
    products.forEach((element) => {
      total += element.FinalPrice;
    });
  
    cartTotal.textContent = `Total: $ ${total}`;
  }
  
  function cartItemTemplate(item) {
    const newItem = `<li class="cart-card divider">
    <a href="#" class="cart-card__image">
      <img
        src="${item.Image}"
        alt="${item.Name}"
      />
    </a>
    <a href="#">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <button id="closeBtn" data-id="${item.Id}"><span class="remove-x">X</span></button>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
  </li>`;
  
    return newItem;
  }

  function addRemoveFunctionality() {
    const closeButtons = document.querySelectorAll("#closeBtn");
  
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", removeItem);
    });
  }

  // Get current cart, remove corresponding item, update new cart and cart icon
function removeItem() {
    let cartItems = getLocalStorage("so-cart");
    let toRemove = this.dataset.id;
  
    let newCart = cartItems.filter((item) => item.Id != toRemove);
  
    setLocalStorage("so-cart", newCart);
  
    renderCartContents();
    cartItemsCount = getCartCountFromLocalStorage();
    backpackBadge.innerHTML = cartItemsCount;
  }
  
  function renderEmptyMessage() {
    const noItemsMessage = `
    <h3>Looks like your cart is empty!<h3>
    <a href="../index.html">
      <h2 class="card__name">Order Now</h2>
    </a>`;
  
    return noItemsMessage;
  }