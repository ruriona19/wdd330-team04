import { getLocalStorage } from "./utils.mjs";
import { checkout } from "./externalServices.mjs";

function formDataToJSON(formElement) {
    const formData = new FormData(formElement),
      convertedJSON = {};
  
    formData.forEach(function (value, key) {
      convertedJSON[key] = value;
    });
  
    return convertedJSON;
  }

  function packageItems(items) {
    const simplifiedItems = items.map((item) => {
      //console.log(item);
      return {
        id: item.Id,
        price: item.FinalPrice,
        name: item.Name,
        quantity: 1,
      };
    });
    return simplifiedItems;
  }


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
    // Calculate total quantities including if item is repeated
    let numberItems = document.querySelector( this.outputSelector + " #number-of-items");
    const quantities = this.list.map((item)=> item.Qty);
    const totalQtys = quantities.reduce((sum, item) => sum + parseFloat(item));
    numberItems.textContent = totalQtys; 
    
  },
  calculateOrdertotal: function() {
    // calculate the shipping and tax amounts. Then use them to along with the cart total to figure out the order total
    this.tax = (this.itemTotal * 0.06).toFixed(2);
    this.shipping = 10 + ((this.list.length - 1) * 2).toFixed(2);
    
    // display the totals.
    this.displayOrderTotals();
  },
  displayOrderTotals: function() {
    // once the totals are all calculated display them in the order summary page
    let taxElement = document.querySelector(this.outputSelector + " #tax-subtotal");
    let shippingElement = document.querySelector(this.outputSelector + " #shipping-estimate");
    let totalElement = document.querySelector(this.outputSelector + " #order-total");
    
    taxElement.textContent = this.tax;
    shippingElement.textContent = this.shipping;
    let total = parseFloat(this.itemTotal) + parseFloat(this.tax) + parseFloat(this.shipping);
    this.orderTotal = total;
    totalElement.textContent = total;
  },
  
  checkout: async function (form) {
    const json = formDataToJSON(form);
    // add totals, and item details
    json.orderDate = new Date();
    json.orderTotal = this.orderTotal;
    json.tax = this.tax;
    json.shipping = this.shipping;
    json.items = packageItems(this.list);
    console.log(json);
    try {
      const res = await checkout(json);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
    }

}



export default checkoutProcess;