class Cart{
    cartItems;
    localStorageKey;
  
    constructor(localStorageKey){
      this.localStorageKey=localStorageKey;
      this.cartItems=JSON.parse(localStorage.getItem(localStorageKey))||[];
    }
  
    addToCart(product){
      let match;
      this.cartItems.forEach(car=>{
          if(car.productName===product.productName)
              match=car;
          });
      if(match)
          match.quantity+=1;
      else{
          this.cartItems.push({
              productName:product.productName,
              id:product.productId,
              quantity:1,
              deliveryOptionId:'1'//Setting default select option 1
          });
      }
      localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
      console.log(this.cartItems);
    }
  
    removeProductFromCart(productName) {
      const index = this.cartItems.findIndex(item => item.productName === productName);
      if (index !== -1) {
        this.cartItems.splice(index, 1);
        localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
        console.log(`Removed ${productName} from cart.`);
      } else {
        console.error('Product not found in cart.');
      }
    }
  
    updateDeliveryOption(productId, deliveryOptionId) {
      let matchingProduct;
      this.cartItems.forEach((cartItem) => {
          if (productId == cartItem.productId) {
              matchingProduct = cartItem;
          }
      });
      if (matchingProduct) {
          matchingProduct.deliveryOptionId = deliveryOptionId;
          localStorage.setItem(this.localStorageKey, JSON.stringify(this.cartItems));
      } else {
          console.error("No matching cart item found for productId:", productId);
      }
    }
  
  
  
  }

  const cart=new Cart('cart');
  const businessCart=new Cart('businessCart');

  