import {cart, addToCart,calculateCartQuantity} from '../data/cart.js';
import {products} from '../data/products.js';
import { formatCurrency } from './utils/money.js';

let productsHTML = ''

products.forEach((object)=>{
  const {image, name, rating, priceCents} = object;
  const html =  `
    <div class="product-container">
        <div class="product-image-container">
          <img class="product-image"
            src="${image}">
        </div>

        <div class="product-name limit-text-to-2-lines">
          ${name}
        </div>

        <div class="product-rating-container">
          <img src="images/ratings/rating-${rating.stars * 10}.png">
        <div class="product-rating-count link-primary">
            ${rating.count}
        </div>
        </div>

        <div class="product-price">
          $${formatCurrency(priceCents)}
        </div>

        <div class="product-quantity-container">
          <select>
            <option selected value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
            <option value="10">10</option>
          </select>
        </div>

        <div class="product-spacer"></div>

        <div class="added-to-cart js-added-to-cart-${object.id}">
          <img src="images/icons/checkmark.png">
          Added
        </div>

        <button class="add-to-cart-button button-primary js-add-to-cart-button" data-product-id="${object.id}">
          Add to Cart
        </button>
      </div>
    </div>
  </div>
`
  productsHTML += html;
  
});

const listOfElements = document.querySelector('.js-products-grid');
listOfElements.innerHTML = productsHTML;


const addCartBtn = document.querySelectorAll('.js-add-to-cart-button');

const cartQuantityElement = document.querySelector('.js-cart-quantity');



function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();
  cartQuantityElement.innerHTML = cartQuantity;
}

updateCartQuantity();

function showAddedToCartText(productId){
  const addedToCartText = document.querySelector(`.js-added-to-cart-${productId}`);

  addedToCartText.classList.add('js-added-to-cart-visible');

  setTimeout(()=>{
    addedToCartText.classList.remove('js-added-to-cart-visible');
  },2000);

}




addCartBtn.forEach((button)=>{
  button.addEventListener('click', ()=>{
  const productId = button.dataset.productId;
  
  addToCart(productId);
  updateCartQuantity();
  showAddedToCartText(productId);
});
});


