import { cart, removeFromCart, updCartQuantity, saveToStorage, updDeliveryOption } from "../../data/cart.js";
import { products, getProduct } from "../../data/products.js";
import formatCurrency from "../utils/money.js";
import dayjs from "https://unpkg.com/dayjs@1.11.10/esm/index.js";
import { deliveryOptions, getDeliveryOption } from "../../data/deliveryOprions.js";
import rednderPaymentSummary from "./paymentSummary.js";

console.log(cart);

function renderCartList() {
  let cartHTML = '';
  cart.forEach((cartItem) => {
    const foundItem = getProduct(cartItem);
    const deliveryOption = getDeliveryOption(cartItem);
    const today = dayjs();
    const deliveryDate = today.add(
      deliveryOption.deliveryDays,
      'days'
    );
    const dateString = deliveryDate.format('dddd, MMMM D');
    cartHTML += `
      <div class="cart-item-container-${foundItem.id}">
        <div class="delivery-date">
          Delivery date: ${dateString}
        </div>

        <div class="cart-item-details-grid">
          <img class="product-image"
            src=${foundItem.image}>

          <div class="cart-item-details">
            <div class="product-name">
              ${foundItem.name}
            </div>
            <div class="product-price">
              $${(formatCurrency(foundItem.priceCents))}
            </div>
            <div class="product-quantity">
              <span>
                Quantity: <span class="quantity-label">${cartItem.quantity}</span>
              </span>
              <span class="update-quantity-link link-primary" data-product-id="${foundItem.id}">
                Update
              </span>
              <input class="quantity-input" type="number" value="${cartItem.quantity}" min="1" max="100" />
              <span class="save-quantity-link link-primary" data-product-id="${foundItem.id}">
                Save
              </span>
              <span class="delete-quantity-link link-primary" data-product-id="${foundItem.id}">
                Delete
              </span>
            </div>
          </div>

          <div class="delivery-options">
            <div class="delivery-options-title">
              Choose a delivery option:
            </div>
              ${deliveryOptionsHTML(foundItem, cartItem)}
          </div>
        </div>
      </div>
    `;
  });

  function deliveryOptionsHTML(foundItem, cartItem) {
    let html = '';

    deliveryOptions.forEach((deliveryOption) => {
      const today = dayjs();
      const deliveryDate = today.add(
        deliveryOption.deliveryDays,
        'days'
      );
      const dateString = deliveryDate.format('dddd, MMMM D');
      const priceString = deliveryOption.priceCents === 0 ? "FREE" : `$${formatCurrency(deliveryOption.priceCents)} -`;
      const isChecked = deliveryOption.id === cartItem.deliveryOptionId;
      html += `
      <div class="delivery-option" data-product-id="${foundItem.id}" data-delivery-option-id="${deliveryOption.id}">
        <input type="radio"
          ${isChecked ? 'checked' : ''}
          class="delivery-option-input"
          name="delivery-option-${foundItem.id}">
        <div>
          <div class="delivery-option-date">
            ${dateString}
          </div>
          <div class="delivery-option-price">
            ${priceString} Shipping
          </div>
        </div>
      </div>
      `
    })
    return html;
  }

  document.querySelector('.order-summary')
    .innerHTML = cartHTML;

  updCartQuantity();

  document.querySelectorAll('.update-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const cartContainer = document.querySelector(`.cart-item-container-${link.dataset.productId}`);
        //console.log(cartContainer);
        cartContainer.classList.add('is-editing-quantity');
      })
  });

  document.querySelectorAll('.save-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        const foundItem = cart.find((item) => item.productId === link.dataset.productId);
        const cartContainer = document.querySelector(`.cart-item-container-${link.dataset.productId}`);
        const input = document.querySelector(`.cart-item-container-${link.dataset.productId} .quantity-input`);
        console.log(input.value);
        let inputValue = Number(input.value);

        if (inputValue > 0 && inputValue < 100) {
          foundItem.quantity = inputValue;
          console.log(cart);
          saveToStorage();
          renderCartList();
          rednderPaymentSummary();
          updCartQuantity();
        }
        cartContainer.classList.remove('is-editing-quantity');
      })
  });

  document.querySelectorAll('.delete-quantity-link')
    .forEach((link) => {
      link.addEventListener('click', () => {
        removeFromCart(link.dataset.productId);
        updCartQuantity();
        rednderPaymentSummary();
        document.querySelector(`.cart-item-container-${link.dataset.productId}`)
          .remove();
      })
  });

  document.querySelectorAll('.delivery-option')
    .forEach((element) => {
      element.addEventListener('click', () => {
        const {productId, deliveryOptionId} = element.dataset;
        updDeliveryOption(productId, deliveryOptionId);
        renderCartList();
        rednderPaymentSummary();
      })
    })
};

export default renderCartList;
