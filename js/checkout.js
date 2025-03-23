import { renderOrderSummary } from "../checkout/OrderSummary.js";
import { renderPaymentSummary } from "../checkout/PaymentSummary.js";
import { loadProducts,loadProductsFetch } from '../js/Amazon.js'

async function loadPage(){
    try{
        //throw 'error1';Goes to catch block directly
        await loadProductsFetch();
    }
    catch(error){
        console.log('Unexpected error. Please try again later.');
    }

    renderOrderSummary();
    renderPaymentSummary();
}
loadPage();
    

/*
new Promise((resolve) => {
    loadProductsFetch().then(()=>{
        resolve('Products loaded');
    });
}).then((status) => {
    renderOrderSummary();
    renderPaymentSummary();
});*/