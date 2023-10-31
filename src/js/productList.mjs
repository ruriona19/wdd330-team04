import {getProductsByCategory} from "./externalServices.mjs";
import { renderListWithTemplate, substractDiscount } from "./utils.mjs";


export default async function productList(category, selector, limitNumber = 4){

    let listedProducts = await getProductsByCategory(category) || [];

    let filteredProduct = filterProducts(listedProducts, limitNumber);

    const filteredProductsCat = listedProducts.filter(product => product.Category === category); //filter by category
    //this way I can count how much products per category ex tents -> 14

    renderListWithTemplate(productCardTemplate, selector, filteredProduct);
    
    return filteredProductsCat.length
}

function filterProducts(products, numberOfTents) {
    return products.slice(0, numberOfTents);
}

function productCardTemplate(product){

  let discount = `-${substractDiscount(product.SuggestedRetailPrice, product.FinalPrice).toFixed(2)}`;

  return `<li class="product-card">
    <a href="/product_pages/index.html?product=${product.Id}">
      <picture> 
        <source media="(min-width: 800px)" srcset="${product.Images.PrimaryLarge}">
        <source media="(min-width: 600px)" srcset ="${product.Images.PrimaryMedium}">  
        <img src="${product.Images.PrimarySmall}" alt="${product.Name}"/>
      </picture>
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">Sale Price: ${product.FinalPrice}</p>
      <p class="product-card__discount">Discount: ${discount}</p>
      </a>
      <button class="quick-view" data-id="${product.Id}">&#128065</button>
  </li>`
}

