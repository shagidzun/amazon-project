import { cart } from "../../data/cart.js";
import { getProduct } from "../../data/products.js";
import { getDeliveryOption } from "../../data/deliveryOprions.js";
import formatCurrency from "../utils/money.js";

function rednderPaymentSummary() {
  const paymentSum = cart.reduce((sum, cartItem) => {
    const product = getProduct(cartItem);
    sum += product.priceCents * cartItem.quantity;
    return sum;
  }, 0);

  const shippingSum = cart.reduce((sum, cartItem) => {
    const deliveryOption = getDeliveryOption(cartItem);
    sum += deliveryOption.priceCents;
    return sum;
  }, 0);

  const totalBeforeTaxCents = paymentSum + shippingSum;
  const totalTaxCents = totalBeforeTaxCents * 0.1;
  const totalCents = totalBeforeTaxCents + totalTaxCents;
  const paymentSummaryHTML = `
    <div class="payment-summary-title">
      Order Summary
    </div>

    <div class="payment-summary-row">
      <div>Items (${cart.reduce((sum, item) => sum += item.quantity, 0)}):</div>
      <div class="payment-summary-money">$${formatCurrency(paymentSum)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Shipping &amp; handling:</div>
      <div class="payment-summary-money">$${formatCurrency(shippingSum)}</div>
    </div>

    <div class="payment-summary-row subtotal-row">
      <div>Total before tax:</div>
      <div class="payment-summary-money">$${formatCurrency(totalBeforeTaxCents)}</div>
    </div>

    <div class="payment-summary-row">
      <div>Estimated tax (10%):</div>
      <div class="payment-summary-money">$${formatCurrency(totalTaxCents)}</div>
    </div>

    <div class="payment-summary-row total-row">
      <div>Order total:</div>
      <div class="payment-summary-money">$${formatCurrency(totalCents)}</div>
    </div>

    <button class="place-order-button button-primary">
      Place your order
    </button>
  `;

  document.querySelector('.payment-summary')
    .innerHTML = paymentSummaryHTML;

  console.log(paymentSum);
  console.log(shippingSum);
  console.log(totalBeforeTaxCents);
  console.log(totalTaxCents);
  console.log(totalCents);

  // cart.forEach((cartItem) => {
  //   const product = getProduct(cartItem);
  // })
};

export default rednderPaymentSummary;