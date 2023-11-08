const deliveryOptions = [{
  id: '1',
  deliveryDays: 7,
  priceCents: 0
}, {
  id: '2',
  deliveryDays: 3,
  priceCents: 499
}, {
  id: '3',
  deliveryDays: 1,
  priceCents: 999
}];

function getDeliveryOption(cartItem) {
  const deliveryOptionId = cartItem.deliveryOptionId;
  const deliveryOption = deliveryOptions.find((option) => deliveryOptionId === option.id);
  return deliveryOption;
}

export { deliveryOptions, getDeliveryOption };