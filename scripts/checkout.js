import { cart, removeFromCart, updCartQuantity, saveToStorage } from "../data/cart.js";
import { products } from "../data/products.js";
import { formatCurrency } from "./utils/money.js";


function renderCartList() {
  let cartHTML = '';
  cart.forEach((cartItem) => {
    const productId = cartItem.productId;
    const foundItem = products.find((item) => item.id === productId);
    cartHTML += `
      <div class="cart-item-container-${foundItem.id}">
        <div class="delivery-date">
          Delivery date: Tuesday, June 21
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
            <div class="delivery-option">
              <input type="radio" checked
                class="delivery-option-input"
                name="delivery-option-${foundItem.id}">
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
                name="delivery-option-${foundItem.id}">
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
                name="delivery-option-${foundItem.id}">
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
    `;
  });

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
        document.querySelector(`.cart-item-container-${link.dataset.productId}`)
          .remove();
      })
  });
};

renderCartList();

