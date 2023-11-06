const cart = [{
  productId: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
  quantity: 2
},
{
  productId: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
  quantity: 1
}];

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