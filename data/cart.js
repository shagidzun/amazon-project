let cart = JSON.parse(localStorage.getItem('cart'));


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

export { cart, addToCart, removeFromCart };