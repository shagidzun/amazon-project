let cart = JSON.parse(localStorage.getItem('cart'));

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
  const foundItem = cart.find((cartItem) => cartItem.productId === productId);
  if (!foundItem) {
    cart.push({
    productId: productId,
    quantity: itemQuantity
    });
  } else {
    foundItem.quantity += itemQuantity;
  }

  saveToStorage();
};

function removeFromCart(productId) {
  cart = cart.filter((cartItem) => cartItem.productId !== productId);
  saveToStorage();
}

export { cart, addToCart, removeFromCart, updCartQuantity };