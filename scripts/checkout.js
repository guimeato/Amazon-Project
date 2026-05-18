import{ calculateCartQuantity, cart, removeFromCart, updateQuantity } from '../data/cart.js';
import { products } from '../data/products.js'
import { formatCurrency } from './utils/money.js';
import { hello } from 'https://unpkg.com/supersimpledev@1.0.1/hello.esm.js'
import dayjs from 'https://unpkg.com/supersimpledev@8.5.0/dayjs/esm/index.js';
import { deliveryOptions } from '../data/deliveryOptions.js'



let cartItemList = ''
cart.forEach((cartItem)=>{

  const productId = cartItem.productId;

  let matchingProduct;

  

  products.forEach((product)=>{
    if(productId === product.id){
      matchingProduct = product;
    }
  });

  const deliveryOptionId = cartItem.deliveryOptionId;

  let deliveryOption;

  deliveryOptions.forEach((option)=>{
    if(option.id === deliveryOptionId){
      deliveryOption = option;
    }
  });

  const today = dayjs();
  const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');
  const dateString = deliveryDate.format('dddd, MMMM D');


  const html = 
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date js-delivery-date" data-product-id="${matchingProduct.id}">
      Delivery date: ${dateString};
    </div>

    <div class="cart-item-details-grid">
      <img class="product-image"
        src=${matchingProduct.image}>
      <div class="cart-item-details">
        <div class="product-name">
          ${matchingProduct.name}
        </div>
        <div class="product-price">
          ${formatCurrency(matchingProduct.priceCents)}
        </div>
        <div class="product-quantity">
          <span>
            Quantity: <span class="quantity-label js-cart-item-quantity-${matchingProduct.id}">${cartItem.quantity}</span>
          </span>
          <span class="update-quantity-link link-primary js-update-button" data-product-id="${matchingProduct.id}">
            Update
          </span>
        <input class="quantity-input js-quantity-input-${matchingProduct.id}">
        <span class="save-quantity-link link-primary js-save-button" data-product-id="${matchingProduct.id}">
          Save
        </span>
          <span class="delete-quantity-link link-primary js-delete-button" data-product-id="${matchingProduct.id}">
            Delete
          </span>
        </div>
      </div>

      <div class="delivery-options">
        <div class="delivery-options-title">
          Choose a delivery option:
        </div>
          ${deliveryOptionsHTML(matchingProduct, cartItem)}
        </div>
      </div>
    </div>
  `;
  cartItemList += html;
  
});


function deliveryOptionsHTML(matchingProduct, cartItem){
  let deliveryOptionsHtml = '';

  deliveryOptions.forEach((deliveryOption)=>{
    const today = dayjs();
    const deliveryDate = today.add(deliveryOption.deliveryDays, 'days');

    const dateString = deliveryDate.format('dddd, MMMM D');

    const priceString = deliveryOption.priceCents === 0? 'FREE' : `$${formatCurrency(deliveryOption.priceCents/100)} - `;

    const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
    
    const html = `
      <div class="delivery-option">
        <input type="radio"
        ${isChecked? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${matchingProduct.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} - Shipping
          </div>
        </div>
      </div>
        `
    deliveryOptionsHtml += html;
  });
  
  return deliveryOptionsHtml;
}

document.querySelector('.js-order-summary').innerHTML = cartItemList;


const deleteBtn = document.querySelectorAll('.js-delete-button');


deleteBtn.forEach((deleteButton)=>{
  deleteButton.addEventListener('click',()=>{
    const productId = deleteButton.dataset.productId;
    removeFromCart(productId);

    document.querySelector(`.js-cart-item-container-${productId}`).remove();
    updateCartQuantity();


  });
});

function updateCartQuantity(){
  const cartQuantity = calculateCartQuantity();

  const quantityElement = document.querySelector('.js-total-cart-items')
  quantityElement.innerHTML = `${cartQuantity} items`;
}
updateCartQuantity();

document.querySelectorAll('.js-update-button')
.forEach((updateButton)=>{
  const productId = updateButton.dataset.productId;
  updateButton.addEventListener('click',()=>{
    const container = document.querySelector(`.js-cart-item-container-${productId}`);
    container.classList.add('is-editing-quantity');
  });
});

document.querySelectorAll('.js-save-button')
.forEach((saveButton)=>{
  const productId = saveButton.dataset.productId;
  saveButton.addEventListener('click', ()=>{

    const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);

    const newQuantity = Number(quantityInput.value);
    if(newQuantity >= 0 && newQuantity < 1000){

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      updateQuantity(productId,newQuantity);

      document.querySelector(`.js-cart-item-quantity-${productId}`).innerHTML = newQuantity;

      updateCartQuantity();
    }
    else{
      alert('Quantidade incorreta')
    }
   
  });
});

document.querySelectorAll('.js-save-button')
.forEach((saveButton)=>{
  const productId = saveButton.dataset.productId;
  const quantityInput = document.querySelector(`.js-quantity-input-${productId}`);
  quantityInput.addEventListener('keydown',(event)=>{
    if(event.key === 'Enter'){
      const newQuantity = Number(quantityInput.value);
      if(newQuantity >= 0 && newQuantity < 1000){

      const container = document.querySelector(`.js-cart-item-container-${productId}`);
      container.classList.remove('is-editing-quantity');

      updateQuantity(productId,newQuantity);

      document.querySelector(`.js-cart-item-quantity-${productId}`).innerHTML = newQuantity;

      updateCartQuantity();
      }
      else{
      alert('Quantidade incorreta')
     }
    }
  });
})





