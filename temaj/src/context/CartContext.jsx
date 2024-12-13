import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getCartsUser } from "../api/cartApi";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getCartsUser();
      setCartItems(response);
      localStorage.setItem('cartItems', JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching cart data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedCartItems = JSON.parse(localStorage.getItem('cartItems')) || [];
    setCartItems(storedCartItems);
    fetchCart();
  }, [fetchCart]);

  const addItemToCart = async (item) => {
    const updatedCartItems = [...cartItems, item];
    setCartItems(updatedCartItems);
    localStorage.setItem('cartItems', JSON.stringify(updatedCartItems));
  };

  return (
    <CartContext.Provider value={{ cartItems, setCartItems, fetchCart, addItemToCart, loading, error }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};
