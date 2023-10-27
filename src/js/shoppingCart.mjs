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
  
    cartTotal.textContent = `Total: $ ${total.toFixed(2)}`;
    let checkoutBtn = document.querySelector("#checkoutBtn")
    checkoutBtn.style.display = "block";
    checkoutBtn.addEventListener("click", function(){ window. location. href ="/checkout/index.html";});

  }
  
  function cartItemTemplate(item) {
    const subtotal = item.FinalPrice * parseInt(item.Qty);
    const newItem = `<li class="cart-card divider">
    <a href="/product_pages/index.html?product=${item.Id}" class="cart-card__image">
      <picture>
        <source media="(min-width: 800px)" srcset="${item.Images.PrimaryLarge}">
        <source media="(min-width: 600px)" srcset ="${item.Images.PrimaryMedium}">  
        <img src="${item.Images.PrimarySmall}" alt="${item.Name}"/>
      </picture>
    </a>
    <a href="/product_pages/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <button id="closeBtn" data-id="${item.Id}"><span class="remove-x">X</span></button>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <label class="cart-card__quantity">Quantity: <input class="productQuantity" type="number" name="quantity" min="1" max="999" data-id="${item.Id}" value=${parseInt(item.Qty)}  required></label>
    <p class="cart-card__price">$${subtotal.toFixed(2)}</p>
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
    if (this.value.length > 3) {
      this.value = this.value.slice(0,3); 
    }
    if (this.value == 0){
      this.value = 1;
      this.textContent = "1";
    }
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
    getCartCountFromLocalStorage();
  }
  
  function renderEmptyMessage() {
    const noItemsMessage = `
    <h3>Looks like your cart is empty!<h3>
    <a href="../index.html">
      <h2 class="card__name">Order Now</h2>
    </a>`;
  
    return noItemsMessage;
  }

  