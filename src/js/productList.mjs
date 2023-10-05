import {getData} from "./productData.mjs";
import { renderListWithTemplate } from "./utils.mjs";


export default async function productList(category, selector, limitNumber = 4){

    let listedProducts = await getData(category) || [];

    let filteredProduct = filterProducts(listedProducts, limitNumber);

    renderListWithTemplate(productCardTemplate, selector, filteredProduct);
    

}

function filterProducts(products, numberOfTents) {
    return products.slice(0, numberOfTents);
}

function productCardTemplate(product){
    return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img
        src="${product.Image}"
        alt="${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">${product.FinalPrice}</p></a
    >
  </li>`
}