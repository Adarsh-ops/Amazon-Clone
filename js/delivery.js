export let delivery=[{
    id:'1',
    deliveryDays:7,
    priceCents:0
},
{
    id:'2',
    deliveryDays:3,
    priceCents:499
},
{
    id:'3',
    deliveryDays:1,
    priceCents:999
}]

export function getDeliveryOption(deliveryOptionId){
    let deliveryOption;
    delivery.forEach((delOpt)=>{
        if(delOpt.id==deliveryOptionId)
            deliveryOption=delOpt;
    })
    return deliveryOption||delivery[0];
}