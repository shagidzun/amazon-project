const cart = [];

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
};

export { cart, addToCart };