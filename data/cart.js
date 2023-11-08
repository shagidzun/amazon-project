//import { getProduct } from "./products.js";

let cart = JSON.parse(localStorage.getItem('cart'));

function getCartItem(productId) {
  const foundItem = cart.find((cartItem) => cartItem.productId === productId);

  return foundItem;
}

function updCartQuantity() {
  let cartQuantity = 0;
  cartQuantity = cart.reduce((sum, item) => sum += item.quantity, 0);
  document.querySelector('.cart-quantity')
    .innerHTML = cartQuantity;
};

function saveToStorage() {
  localStorage.setItem('cart', JSON.stringify(cart));
}

function addToCart(productId, itemQuantity) {
  const foundItem = getCartItem(productId);
  if (!foundItem) {
    cart.push({
    productId: productId,
    quantity: itemQuantity,
    deliveryOptionId: '1'
    });
  } else {
    foundItem.quantity += itemQuantity;
  }

  saveToStorage();
};

function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
};

function updDeliveryOption(productId, deliveryOption) {
  const foundItem = getCartItem(productId);
  foundItem.deliveryOptionId = deliveryOption;
  saveToStorage();
}

export { cart, addToCart, removeFromCart, updCartQuantity, saveToStorage, updDeliveryOption };