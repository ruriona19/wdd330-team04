import {
    getLocalStorage,
    setLocalStorage,
    getCartCountFromLocalStorage
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
        updateQuantity();
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
      total += (element.FinalPrice * element.Qty);
    });
  
    cartTotal.textContent = `Total: $ ${total}`;
  }
  
  function cartItemTemplate(item) {
    const subtotal = item.FinalPrice * parseInt(item.Qty);
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
    <label class="cart-card__quantity">Quantity: <select class="productQuantity" name="quantity" data-id="${item.Id}" required>
      <option value=${item.Qty} selected>${item.Qty}</option>
      <option value="1">1</option>
      <option value="2">2</option>
      <option value="3">3</option>
      <option value="4">4</option>
    </select></label>
    
    <p class="cart-card__price">$${subtotal}</p>
  </li>`;
  
    return newItem;
  }

  function addRemoveFunctionality() {
    const closeButtons = document.querySelectorAll("#closeBtn");
  
    closeButtons.forEach((btn) => {
      btn.addEventListener("click", removeItem);
    });
  }

  // Add functionality to update cart in local storage everytime user clicks a new quantity selection in cart page
  function updateQuantity() {
    const selection = document.querySelectorAll(".productQuantity");
  
    selection.forEach((select) => {
      select.addEventListener("change", updateItem);
    });
  }

  // Get current cart, update quantity based on product selection, update cart in local storage
function updateItem(){
    let cartItems = getLocalStorage("so-cart");
    let toUpdate = this.dataset.id;

    let item = cartItems.find((element) => element.Id === toUpdate);
    item.Qty = this.value;
    setLocalStorage("so-cart", cartItems);
    getCartCountFromLocalStorage();
    renderCartContents();
    calculateTotal(cartItems);
}

  // Get current cart, remove corresponding item, update new cart and cart icon
function removeItem() {
    let cartItems = getLocalStorage("so-cart");
    let toRemove = this.dataset.id;
  
    let newCart = cartItems.filter((item) => item.Id != toRemove);
  
    setLocalStorage("so-cart", newCart);
  
    renderCartContents();
    let cartItemsCount = getCartCountFromLocalStorage();
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