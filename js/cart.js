export let cart=JSON.parse(localStorage.getItem('cart'))||[];
export function addToCart(button){
    let match;
        cart.forEach(car=>{
            if(car.productName===button.dataset.productName)
                match=car;
            });
        if(match)
            match.quantity+=1;
        else{
            cart.push({
                productName:button.dataset.productName,
                productId:button.dataset.productId,
                quantity:1,
                deliveryOptionId:'1'//Setting default select option 1
            });
        }
        localStorage.setItem('cart', JSON.stringify(cart));
        console.log(cart);
}
function saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(cart));
  }

export function removeProductFromCart(productName) {
    const index = cart.findIndex(item => item.productName === productName);
    if (index !== -1) {
      cart.splice(index, 1);
        saveToStorage();
      console.log(`Removed ${productName} from cart.`);
    } else {
      console.error('Product not found in cart.');
    }
  }

  export function updateDeliveryOption(productId, deliveryOptionId) {
    let matchingProduct;
    cart.forEach((cartItem) => {
        if (productId == cartItem.productId) {
            matchingProduct = cartItem;
        }
    });
    if (matchingProduct) {
        matchingProduct.deliveryOptionId = deliveryOptionId;
        saveToStorage();
    } else {
        console.error("No matching cart item found for productId:", productId);
    }
  }