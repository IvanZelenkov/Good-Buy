<<<<<<< Updated upstream
import { createContext,useState } from "react";
import { productArray, getProductData } from "./productStore";
=======
import { createContext, createContext,useState } from "react";
import { productArray, getProductData } from "./productstore";
>>>>>>> Stashed changes

export const CartContext = createContext({
    item:[],
    getProductQuanity: () => {},
    addOneToCart: () =>{},
    removeOneFromCart: ()=> {},
    removeEverthingFromCart: ( )=> {},
    getTotall: ()=>{}
});

//Context (cart,addToCart,removeFromCart)
//provider ->


export function CartProvider({children}){
    const [cartProducts, setCartProducts] = useState([]);
    
    //{id:1,quantity:2}

    function getProductQuanity(id){
<<<<<<< Updated upstream
        const quantity = cartProducts.find(product => product.id === id)?.quantity;
        
        if(quantity === undefined){
=======
        cartProducts.find(product => product.id ===id)?.quantity
        
        if(quantity===undefined){
>>>>>>> Stashed changes
            return 0;
        }

        return quantity;
    }

    function addOneToCart(id){
        const quantity = getProductQuanity(id);

        if (quantity === 0) {//no product in cart
            setCartProducts(
            [
                ...cartProducts,
                {
                    id: id,
                    quantity: 1
                }
            ] 
        )
        }else {//product in cart
            //[{id:1, quantity:3 },{id:2, quantity:1+1}]
            setCartProducts(
                cartProducts.map(
                    product =>
                    product.id ===id  //if condtion
                    ?{...product, quantity: product.quantity +1}    //if statement true
                    :  product                                         //if statement false
                )
            )
        }
    }

    function removeEverthingFromCart(id){
        //[] if obj meet condtion , add obj to array
        //[product1, product2, product3]
        //[product1] 

        setCartProducts(
            cartProducts=>
            cartProducts.filter(currentProduct =>{
                return currentProduct.id !=id;
            })  
        )
    }


    function removeOneFromCart(id){
<<<<<<< Updated upstream
        const quantity = getProductQuanity(id);
        
        if(quantity == 1){
            removeEverthingFromCart(id);
=======
        const quantity = getProductQuanity(id)
        
        if(quantity==1){
            deleteFromCart(id);
>>>>>>> Stashed changes
        }else{
            setCartProducts(
                setCartProducts(
                    cartProducts.map(
                        product =>
                        product.id ===id  //if condtion
                        ?{...product, quantity: product.quantity -1}    //if statement true
                        :  product                                         //if statement false
                    )
                )
            )
        }

    }

    function getTotall(){
        let totallCost =0;
        cartProducts.map((cartItem)=>{
            const productData =getProductData(cartItem.id);
            totallCost += (productData.price* cartItem.quantity);
        });
        return totallCost;
    }

    const contextValue ={
        item:cartProducts,
        getProductQuanity,
        addOneToCart,
        removeOneFromCart,
        removeEverthingFromCart,
        getTotall
    }
    
    
    return (
        <CartContext.Provider value={contextValue}>
            {children}
        </CartContext.Provider>   
    )
}


<<<<<<< Updated upstream
export default CartProvider;
=======
export default Provider;
>>>>>>> Stashed changes
