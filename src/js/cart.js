import { getLocalStorage } from "./utils.mjs";

function renderCartContents() {
  let productContainer = document.querySelector(".products");
  let productList = document.querySelector(".product-list");
  try {
    const cartItems = getLocalStorage("so-cart");
    if (cartItems == null) {
      productContainer.innerHTML = renderEmptyMessage();
    } else {
      const htmlItems = cartItems.map((item) => cartItemTemplate(item));
      productList.innerHTML = htmlItems.join("");
    }
  } catch (error) {
    alert(error.message);
  }
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
  <p class="cart-card__color">${item.Colors[0].ColorName}</p>
  <p class="cart-card__quantity">qty: 1</p>
  <p class="cart-card__price">$${item.FinalPrice}</p>
</li>`;

  return newItem;
}

function renderEmptyMessage() {
  const noItemsMessage = `
  <h3>Looks like your cart is empty!<h3>
<a href="../index.html">
    <h2 class="card__name">Order Now</h2>
  </a>`;

  return noItemsMessage;
}

renderCartContents();