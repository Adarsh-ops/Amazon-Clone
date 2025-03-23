import { cart, removeProductFromCart, updateDeliveryOption } from '../js/cart.js';
import { products, getProduct } from '../js/Amazon.js';
import { formatCurrency } from '../js/money.js';
import dayjs from 'https://unpkg.com/dayjs@1.11.10/esm/index.js';
import { delivery, getDeliveryOption } from '../js/delivery.js';
import { renderPaymentSummary } from './PaymentSummary.js';

export function renderOrderSummary() {
    let list = '';
    cart.forEach((cartItem, index) => {
        let match_pro;
        products.forEach((pro) => {
            if (pro.id === cartItem.productId)
                match_pro = pro;
            else {
                console.error('No Product Found!');
                return;
            }
        });

        const deliveryOptionId = cartItem.deliveryOptionId;
        const deliveryOption = getDeliveryOption(deliveryOptionId);

        let deliveryDate = (dayjs().add(deliveryOption.deliveryDays, 'days').format('dddd, MMMM D'));
        let htmlCartleft = `
    <div class="pro " >
                    <p class="delivery-date-top">Delivery date: ${deliveryDate}</p>
                    <div class="cart-content">
                        <div class="img-details">
                            <img src="${match_pro.image}">
                            <div class="pro-details">
                                <p class="pro-name">${match_pro.name}</p>
                                <p class="pro-price">$${formatCurrency(match_pro.priceCents)}</p>
                                <p class="pro-qty">Quantity: ${cartItem.quantity}
                                    <button class="updateCart" data-product-id="${match_pro.id}">Update</button>
                                    <button class="deleteCart" data-product-name="${match_pro.name}">Delete</button>
                                </p>
                            </div>
                        </div>
                        <div class=delivery-date>
                        <p>Delivery options:</p>
                        ${deliveryOptions(match_pro, cartItem)}
                        </div>
                    </div>
                </div>
    `;
        list += htmlCartleft;
        document.querySelector('.left').innerHTML = list;
        document.querySelectorAll('.deleteCart').forEach((button) => {
            button.addEventListener('click', () => {
                const productName = button.dataset.productName;
                removeProductFromCart(productName);
                const productElement = button.closest('.pro');
                if (productElement) {
                    productElement.remove();
                    renderPaymentSummary();
                }
            });
        });
        document.querySelectorAll('.updateCart').forEach(button => {
            button.addEventListener('click', () => {
                const productId = button.dataset.productId;
                const cartItem = cart.find(item => item.productId === productId);
                if (!cartItem) return;
                const newQuantityStr = prompt("Enter new quantity:", cartItem.quantity);
                if (newQuantityStr !== null) {
                    const newQuantity = parseInt(newQuantityStr, 10);//convert to number base 10
                    if (!isNaN(newQuantity) && newQuantity > 0) {
                        cartItem.quantity = newQuantity;
                        localStorage.setItem('cart', JSON.stringify(cart));
                        // Re-render the order and payment summaries
                        renderOrderSummary();
                        renderPaymentSummary();
                    } else {
                        alert("Please enter a valid number greater than 0.");
                    }
                }
            });
        });
    });


    function deliveryOptions(matchingProduct, cartItem) {
        let delHtml = '';
        delivery.forEach((del) => {
            const deliveryDate = dayjs().add(del.deliveryDays, 'days').format('dddd, MMMM D');
            const radioId = `del-${matchingProduct.id}-${del.id}`;
            let ship = del.deliveryDays === 7 ? 'Free Shipping' : `$${formatCurrency(del.priceCents)} -Shipping`;
            let isChecked = del.id === cartItem.deliveryOptionId;
            let htmlDelivery = `
        <div class="delivery-option" data-product-id="${matchingProduct.id}"
          data-delivery-option-id="${del.id}">
            <input type="radio" id="del-${radioId}" name="delivery-option-${matchingProduct.id}" value="${del.id}" ${isChecked ? 'checked' : ''}>
            <label for="del-${radioId}">
                <div class="label">
                    <span>${deliveryDate} </span>
                    <span>${ship}</span>
                </div>
            </label>
        </div>
        `;
            delHtml += htmlDelivery;
        });
        return delHtml;
    }

    // --- After rendering your cart items ---
    document.querySelectorAll('.delivery-option input[type="radio"]').forEach((radio) => {
        radio.addEventListener('change', (e) => {
            const container = e.target.closest('.delivery-option');
            const productId = container.dataset.productId;
            const deliveryOptionId = e.target.value; // from radio's value

            updateDeliveryOption(productId, deliveryOptionId);
            // Re-render both order summary and payment summary
            renderOrderSummary();
            renderPaymentSummary();
        });
    });



}

