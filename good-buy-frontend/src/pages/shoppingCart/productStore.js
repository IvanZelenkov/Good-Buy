const productArray= [
    
        {
            "id": "123",
            "name":"Product1",
            "img":"default.jpg",
            "price":12.34,
            "count":5,
            "selected":true
        },
        {
            "id": "133",
            "name":"Product2",
            "img":"default.jpg",
            "price":56.78,
            "count":4,
            "selected":true
        },
        {
            "id": "245",
            "name":"Product3",
            "img":"default.jpg",
            "price":30.12,
            "count":3,
            "selected":false
        }
]

function getProductData(id){
    let productData = productArray.find(product=> product.id === id)
    //this helper get id from above array

    if (productData === undefined){
        console.log("product does not exist for id:" +id);
        return undefined;
    }

    return productData;
}

export {productArray, getProductData};