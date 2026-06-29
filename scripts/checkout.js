import { renderCheckoutHeader } from './checkout/checkoutHeader.js';
import {renderOrderSummary} from './checkout/orderSummary.js';
import { renderPaymentSummary } from './checkout/paymentSummary.js';
import { loadProducts, loadProductsFetch } from '../data/products.js';
import { loadCart } from '../data/cart.js'
//import {Car, RaceCar} from '../data/car.js';
//import '../data/backend-practice.js';


Promise.all([
  loadProductsFetch(),
  new Promise((resolve)=>{
      loadCart(()=>{
        resolve();
      });
    })
]).then(()=>{
    renderCheckoutHeader();

    renderOrderSummary();

    renderPaymentSummary();
});



/*
loadProducts(()=>{

  loadCart(()=>{
    renderCheckoutHeader();

    renderOrderSummary();

    renderPaymentSummary();
  });

  

});

*/



