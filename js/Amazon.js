import { cart, addToCart } from '../js/cart.js';
import { formatCurrency } from './money.js';

loadProducts(renderProducts);

export function getProduct(productId) {
    let matchingProduct;

    products.forEach((product) => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    return matchingProduct;
}
class Product {
    id; image; name; rating; priceCents;
    constructor(productDetails) {
        this.id = productDetails.id;
        this.image = productDetails.image;
        this.name = productDetails.name;
        this.rating = productDetails.rating;
        this.priceCents = productDetails.priceCents;
    }
}
/*
export let products = [{
    id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
    image: 'images/socks.jpg',
    name: 'Black and Gray Atlethic Cotton Socks',
    rating: {
        stars: 4.5,
        reviews: 87
    },
    priceCents: 1090
},
{
    id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
    image: 'images/basketball.jpg',
    name: 'Intermediate Size Basketball',
    rating:
    {
        stars: 4,
        reviews: 127
    },
    priceCents: 2095
},
{
    id: "83d4ca15-0f35-48f5-b7a3-1ea210004f2e",
    image: 'images/shirt.jpg',
    name: 'Adults Plain Cotton T-shirt 2 Pack',
    rating: {
        stars: 4.5,
        reviews: 56
    },
    priceCents: 799
}, {
    id: "54e0eccd-8f36-462b-b68a-8182611d9add",
    image: 'images/toaster.jpg',
    name: '2 Slot Toaster- Black',
    rating: {
        stars: 4.5,
        reviews: 2197
    },
    priceCents: 1899
}].map((productDetails) => {
    return new Product(productDetails);
});
*/
export let products = [];

export function loadProductsFetch(){
    const promise=fetch('https://supersimplebackend.dev/products').then(response => {
        return response.json();
    }).then(data => {
        products = data.map((productDetails) => {
            return new Product(productDetails);
        });
    }).catch(error => {
        console.log('Unexpected error. Please try again later.');
    });
    return promise;
}

export function loadProducts(callback) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('load', () => {
        products = JSON.parse(xhr.response).map((productDetails) => {
            return new Product(productDetails);
        });
        callback();
    });

    xhr.addEventListener('error', (error) => {
        console.log('Unexpected error. Please try again later.');
    });
    xhr.open('GET', 'https://supersimplebackend.dev/products');
    xhr.send();
}


function renderProducts() {
    let list = '';
    products.forEach((prod) => {
        let html = `
    <div class="pro">
                <img src="${prod.image}">
                <p>${prod.name}</p>
                <div class="rating">
                    <img src="images/ratings/rating-${prod.rating.stars * 10}.png"></span>
                    <span>(${prod.rating.count})</span>
                </div>
                <p>$${formatCurrency(prod.priceCents)}</p>
                <select name="noOfItems" id="noOfItems">
                    <option value="noOfItems">1</option>
                    <option value="noOfItems">2</option>
                </select>
                <div class="addToCartButton">
                    <div class="added-to-cart">
                    </div>
                <button class="addToCart" data-product-name="${prod.name}" data-product-id="${prod.id}">
                Add to Cart</button>
                </div>
            </div>
    `;
        list += html;
        const productsContainer = document.querySelector('.products');
        if (productsContainer) {
            productsContainer.innerHTML = list;
        }
        document.querySelectorAll('.addToCart').forEach(button => {
            button.addEventListener('click', () => {
                const container = button.closest('.addToCartButton');
                container.querySelector('.added-to-cart').innerHTML = `
                    <img src="images/icons/checkmark.png">
                    Added
                `;
                addToCart(button);
                let total = 0;
                cart.forEach(car => {
                    total += car.quantity;
                });
                document.querySelector('.cart-count').innerHTML = total;
            });
        });
        
    });

}



