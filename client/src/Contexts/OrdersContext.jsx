import { createContext, useContext, useState } from "react";

const OrdersContext = createContext();

export const useOrders = ()=> useContext(OrdersContext);

export const OrdersProvider = ({children})=>{
    const [orderProducts,setOrderProducts] = useState([]);
    
    const addToOrders = ({product})=>{
        setOrderProducts([product]);
    }

    const clearOrders = () => {
        setOrderProducts([]);
    };


    return <OrdersContext.Provider value={{addToOrders,orderProducts,clearOrders}}>{children}</OrdersContext.Provider>

}