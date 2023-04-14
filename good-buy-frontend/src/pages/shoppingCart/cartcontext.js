import { createContext,useState } from "react";
import { productArray, getProductData } from "./productStore";

export const CartContext = createContext({
    item:[],
    getProductQuanity: () => {},
    addOneToCart: () =>{},
    removeOneFromCart: ()=> {},
    removeEverthingFromCart: ( )=> {},
    getTotall: ()=>{}
});
