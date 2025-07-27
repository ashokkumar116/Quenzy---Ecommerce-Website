import { createContext, useContext, useEffect, useState } from "react";

const OrdersContext = createContext();

export const useOrders = ()=> useContext(OrdersContext);

export const OrdersProvider = ({children})=>{
    const [orderProducts,setOrderProducts] = useState(()=>{
        const storedOrders = localStorage.getItem("orderProducts");
        return storedOrders ? JSON.parse(storedOrders) : []
    });

    useEffect(()=>{
        localStorage.setItem("orderProducts",JSON.stringify(orderProducts));
    },[orderProducts]);
    
    const addToOrders = (product)=>{
        setOrderProducts([product]);
    }

    const addToOrdersFromCart = (products)=>{
        setOrderProducts(products);
    }

    const clearOrders = () => {
        setOrderProducts([]);
        localStorage.removeItem("orderProducts");
    };

    return <OrdersContext.Provider value={{addToOrders,orderProducts,clearOrders,addToOrdersFromCart}}>{children}</OrdersContext.Provider>
}