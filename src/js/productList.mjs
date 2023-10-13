import {getData} from "./productData.mjs";
import { renderListWithTemplate, substractDiscount } from "./utils.mjs";


export default async function productList(category, selector, limitNumber = 4){

    let listedProducts = await getData(category) || [];

    let filteredProduct = filterProducts(listedProducts, limitNumber);

    renderListWithTemplate(productCardTemplate, selector, filteredProduct);
    

}

function filterProducts(products, numberOfTents) {
    return products.slice(0, numberOfTents);
}

function productCardTemplate(product){

  let discount = `-${substractDiscount(product.SuggestedRetailPrice, product.FinalPrice)}.00`;

  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">Sale Price: ${product.FinalPrice}</p>
      <p class="product-card__discount">Discount: ${discount}</p>
      </a>
  </li>`
}

