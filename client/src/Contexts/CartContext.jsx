import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { toast } from "react-toastify";
import axios from "../axios"; 
import { AuthContext} from "./AuthContext"; 

const CartContext = createContext();

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }) => {
  const { user } = useContext(AuthContext);
  const [cart, setCart] = useState([]);
  const [hasSynced, setHasSynced] = useState(false);




  const syncCartToDB = async (localCart) => {
    try {
      await axios.post("/carts/synctocart", { cart: localCart }); 
      localStorage.removeItem("quenzy-cart");
      toast.success("Cart synced to account");
    } catch (error) {
      toast.error("Failed to sync cart to DB");
      console.error(error);
    }
  };

  const fetchCartFromDB = async () => {
    try {
      const res = await axios.get("/carts/getcartitems");
      setCart(res.data.cart || []);
    } catch (error) {
      toast.error("Failed to load cart from DB");
      console.error(error);
    }
  };

//   useEffect(() => {
//     const updateCartInDB = async () => {
//       if (user && hasSynced) {
//         try {
//           await axios.post("/carts/synctocart", { cart }); // ⛔ triggers again on fetch
//         } catch (error) {
//           console.error("Failed to update cart in DB", error);
//         }
//       }
//     };
  
//     updateCartInDB();
//   }, [cart, user, hasSynced]);
  
  
  
  

  useEffect(() => {
    const loadCart = async () => {
      if (user) {
        const localCart = JSON.parse(localStorage.getItem("quenzy-cart"));
        if (localCart && localCart.length > 0) {
          await syncCartToDB(localCart);
          localStorage.removeItem("quenzy-cart"); 
        }
        await fetchCartFromDB();
        setHasSynced(true);
      } else {
        const storedCart = JSON.parse(localStorage.getItem("quenzy-cart")) || [];
        setCart(storedCart);
      }
    };
  
    loadCart();
  }, [user]);
  

  useEffect(() => {
    if (!user) {
      localStorage.setItem("quenzy-cart", JSON.stringify(cart));
    } else {

      localStorage.removeItem("quenzy-cart");
    }
  }, [cart, user]);


  
  const addToCart = async (product) => {
    const existing = cart.find(item => item.id === product.id);
    let newCart;
  
    if (existing) {
      newCart = cart.map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
      toast.success(`${product.name} added to cart!`);
    }
  
    setCart(newCart);
  
    if (user) {
      try {
        await axios.post("/carts/synctocart", { cart: newCart });
      } catch (error) {
        toast.error("Failed to sync to DB");
        console.error(error);
      }
    }
  };
  

  const removeFromCart = async (id) => {
    if (user) {
      try {
        await axios.delete(`/carts/removeitem/${id}`);
      } catch (error) {
        toast.error("Failed to remove item from DB");
        console.error(error);
      }
    }
    setCart(cart.filter(item => item.id !== id));
  };
  
  const clearCart = async () => {
    if (user) {
      try {
        await axios.delete("/carts/clear");
      } catch (error) {
        toast.error("Failed to clear cart from DB");
        console.error(error);
      }
    }
    setCart([]);
  };
  

  const addQuantity = async (id) => {
    const updatedCart = cart.map(item =>
      item.id === id ? { ...item, quantity: item.quantity + 1 } : item
    );
    setCart(updatedCart);
  
    if (user) {
      try {
        await axios.post("/carts/synctocart", { cart: updatedCart });
      } catch (error) {
        toast.error("Failed to update quantity in DB");
        console.error(error);
      }
    }
  };
  
  const removeQuantity = async (id) => {
    const updatedCart = cart.map(item =>
      item.id === id && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setCart(updatedCart);
  
    if (user) {
      try {
        await axios.post("/carts/synctocart", { cart: updatedCart });
      } catch (error) {
        toast.error("Failed to update quantity in DB");
        console.error(error);
      }
    }
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart, addQuantity, removeQuantity }}>
      {children}
    </CartContext.Provider>
  );
};
