import { getCartCount } from './utils.mjs';
import { getLocalStorage } from './utils.mjs';
const cartItems = getLocalStorage('so-cart') || [];
//update the cart count 
function updateCartCount(count) {
    const cartCount = document.getElementById('cart-count');
    cartCount.textContent = count;
}

updateCartCount(getCartCount(cartItems))
//trying to make it more dynamic by using a window event listener
function handleAddToCartClick() {
    const updatedCartCount = getCartCount(cartItems) + 1;
    updateCartCount(updatedCartCount);
}

// Add event listener to the "Add to Cart" button
document.querySelector('#addToCart').addEventListener('click', handleAddToCartClick);