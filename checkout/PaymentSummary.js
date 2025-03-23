import { getProduct } from "../js/Amazon.js";
import { cart } from "../js/cart.js";
import { getDeliveryOption } from "../js/delivery.js";
import { formatCurrency } from "../js/money.js";
import { addOrders } from "../js/orders.js";

export function renderPaymentSummary() {
    let total = 0, numberOfItems = 0, ship = 0, list = '', totalBeforeTax = 0, total1 = 0;
    cart.forEach(cartItem => {
        let product = getProduct(cartItem.productId);
        if (!product) {
            console.error("Product not found for id:", cartItem.productId);
            return;  // Skip this cart item or handle appropriately
        }
        total1 += product.priceCents * cartItem.quantity;

        let deliveryOpt = getDeliveryOption(cartItem.deliveryOptionId);
        if (!deliveryOpt) {
            console.error("Delivery option not found for id:", cartItem.deliveryOptionId);
            return;
        }
        numberOfItems += cartItem.quantity;
        ship += deliveryOpt.priceCents;
        totalBeforeTax = total1 + ship;
        total = totalBeforeTax + (0.1 * totalBeforeTax);
    });
    document.querySelector('.checkout-items').innerHTML = `Checkout(${numberOfItems} Items)`;
    let paymentHtml = `
    <p>Order Summary</p>
                <div class="cost-calc">
                    <div class="items">
                        <span>Items(${numberOfItems}):</span>
                        <span class="totalPrice">$${formatCurrency(total1)}</span>
                    </div>
                    <div class="ship-and-handle">
                        <span>Shipping & Handling:</span>
                        <span>$${formatCurrency(ship)}</span>
                    </div>
                    <div class="total-before">
                        <span>Total before Tax:</span>
                        <span>$${formatCurrency(totalBeforeTax)}</span>
                    </div>
                    <div class="estimate-tax">
                        <span>Estimated Tax(10%):</span>
                        <span>$${formatCurrency(0.1 * totalBeforeTax)}</span>
                    </div>

                </div>

                <div class="order-total">
                    <span>Order Total</span>
                    <span>$${formatCurrency(total)}</span>
                </div>
                <div class="place-order-btn">
                    <button class="place-order">Place your Order</button>
                </div>`;

    document.querySelector('.right').innerHTML = paymentHtml;
    //Make Orders using backend
    document.querySelector('.place-order').addEventListener('click', async () => {
        try {
            const response = await fetch('https://supersimplebackend.dev/orders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    cart: cart
                })
            });
            const order=await response.json();//Wait for the response to come back and store it in order
            addOrders(order);
        } catch (error) {
            console.error('Error placing order:', error);
        }
        window.location.href = 'orders.html';
        
    });
}