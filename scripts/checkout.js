import{calculateCartQuantity, cart, removeFromCart, updateQuantity} from '../data/cart.js';
import{products} from '../data/products.js'
import { formatCurrency } from './utils/money.js';

let cartItemList = ''
cart.forEach((cartItem)=>{

  const productId = cartItem.productId;

  let matchingProduct;

  

  products.forEach((product)=>{
    if(productId === product.id){
      matchingProduct = product;
    }
  });

  
  const html = 
  `
  <div class="cart-item-container js-cart-item-container-${matchingProduct.id}">
    <div class="delivery-date">
      Delivery date: Tuesday, June 21
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
        <div class="delivery-option">
          <input type="radio" checked
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Tuesday, June 21
            </div>
            <div class="delivery-option-price">
              FREE Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Wednesday, June 15
            </div>
            <div class="delivery-option-price">
              $4.99 - Shipping
            </div>
          </div>
        </div>
        <div class="delivery-option">
          <input type="radio"
            class="delivery-option-input"
            name="delivery-option-${matchingProduct.id}">
          <div>
            <div class="delivery-option-date">
              Monday, June 13
            </div>
            <div class="delivery-option-price">
              $9.99 - Shipping
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  `
  cartItemList += html;
  
});

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




