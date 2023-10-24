import { getLocalStorage } from "./utils.mjs";

const checkoutProcess = {
    key: "",
    outputSelector: "",
    list: [],
    itemTotal: 0,
    shipping: 0,
    tax: 0,
    orderTotal: 0,
    init: function (key, outputSelector) {
        this.key = key;
        this.outputSelector = outputSelector;
        this.list = getLocalStorage(key);
        this.calculateItemSummary();
    },
  calculateItemSummary: function() {
    // calculate and display the total amount of the items in the cart, and the number of items.
    let cartSubTotal = document.querySelector( this.outputSelector + " #subtotal");
    const amounts = this.list.map((item) => item.FinalPrice);
    this.itemTotal = amounts.reduce((sum, item) => sum + item);
    cartSubTotal.textContent = `$ ${this.itemTotal}`;
    let numberItems = document.querySelector( this.outputSelector + " #number-of-items");
    numberItems.textContent = this.list.length; // TO FIX MAP AND REDUCE FOR LIST.QTY
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = this.itemTotal * 0.06.toFixed(2);
    this.shipping = 10 + ((this.list.length - 1) * 2);
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    let taxElement = document.querySelector(this.outputSelector + " #tax-subtotal");
    let shippingElement = document.querySelector(this.outputSelector + " #shipping-estimate");
    let totalElement = document.querySelector(this.outputSelector + " #order-total");
    
    taxElement.textContent = this.tax.toFixed(2);
    shippingElement.textContent = this.shipping.toFixed(2);
    let total = this.itemTotal + this.tax + this.shipping;
    totalElement.textContent = total.toFixed(2);
  }
  
}
export default checkoutProcess;