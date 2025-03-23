import { products, loadProductsFetch } from '../js/Amazon.js';

export const orders = JSON.parse(localStorage.getItem('orders')) || [];

export function addOrders(order) {
    orders.unshift(order);
    saveToStorage();
}

function saveToStorage() {
    localStorage.setItem('orders', JSON.stringify(orders));
}

document.addEventListener('DOMContentLoaded', async () => {
    // 1) Load the products first
    await loadProductsFetch();

    // 2) Then show orders
    showOrders();
});

export function showOrders() {
    const ordersContainer = document.querySelector(".main .order-container");

    if (!ordersContainer) {
        console.error("Error: .order-container not found in the DOM.");
        return;
    }

    let list = "";

    orders.forEach((order) => {
        const orderDate = new Date(order.orderTime).toDateString();
        const totalCost = (order.totalCostCents / 100).toFixed(2);

        let productsHTML = "";

        order.products.forEach((product) => {
            const productDetails = products.find((p) => p.id === product.productId);
            if (!productDetails) return;

            const deliveryDate = new Date(product.estimatedDeliveryTime).toDateString();

            productsHTML += `
                <div class="product-image-container">
                  <img src="${productDetails.image}" alt="${productDetails.name}">
                </div>
  
                <div class="product-details">
                  <div class="product-name">${productDetails.name}</div>
                  <div class="product-delivery-date">Arriving on: ${deliveryDate}</div>
                  <div class="product-quantity">Quantity: ${product.quantity}</div>
                  <button class="buy-again-button button-primary">
                    <img class="buy-again-icon" src="images/icons/buy-again.png">
                    <span class="buy-again-message">Buy it again</span>
                  </button>
                </div>
  
                <div class="product-actions">
                </div>
              `;
        });

        list += `
                <div class="order-header">
                  <div class="order-header-left-section">
                    <div class="order-date">
                      <div class="order-header-label">Order Placed:</div>
                      <div>${orderDate}</div>
                    </div>
                    <div class="order-total">
                      <div class="order-header-label">Total:</div>
                      <div>$${totalCost}</div>
                    </div>
                  </div>
  
                  <div class="order-header-right-section">
                    <div class="order-header-label">Order ID:</div>
                    <div>${order.id}</div>
                  </div>
                </div>
  
                <div class="order-details-grid">
                  ${productsHTML}
                </div>
            `;
    });

    ordersContainer.innerHTML = list;
}

// Wait until the page is fully loaded before running showOrders
document.addEventListener("DOMContentLoaded", () => {
    showOrders();
});


// Ensure products are loaded before showing orders
document.addEventListener("DOMContentLoaded", () => {
    loadProductsFetch(showOrders);
});


