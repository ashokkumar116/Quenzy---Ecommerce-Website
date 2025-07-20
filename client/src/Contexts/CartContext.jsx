// CartContext.js
import React, { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Load from localStorage initially
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("quenzy-cart")) || [];
    setCart(storedCart);
  }, []);

  // Update localStorage whenever cart changes
  useEffect(() => {
    localStorage.setItem("quenzy-cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existing = cart.find(item => item.id === product.id);
    if (existing) {
      setCart(cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      ));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
      toast.success(`${product.name} added to cart!`,)
    }
  };

  const removeFromCart = (id) => {
    setCart(cart.filter(item => item.id !== id));
  };

  const clearCart = () => {
    setCart([]);
  };

  const addQuantity = (id)=>{
    const existing = cart.find(item=> item.id === id);

    if (existing) {
        setCart(cart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity + 1 } : item))
        }
    }

    const removeQuantity= (id)=>{
        const existing = cart.find(item=> item.id === id);

    if (existing) {
        setCart(cart.map(item =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item))
        }
    }

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart ,addQuantity , removeQuantity}}>
      {children}
    </CartContext.Provider>
  );
};
