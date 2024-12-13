import React, { createContext, useState, useContext, useEffect, useCallback } from "react";
import { getUserWishlist } from "../api/wishlistApi";

const WishContext = createContext();

export const WishProvider = ({ children }) => {
  const [wishItems, setWishItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchWishlist = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await getUserWishlist();
      setWishItems(response);
      localStorage.setItem('wishItems', JSON.stringify(response));
    } catch (error) {
      console.error("Error fetching wishlist data:", error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const storedWishItems = JSON.parse(localStorage.getItem('wishItems')) || [];
    setWishItems(storedWishItems);
    fetchWishlist();
  }, [fetchWishlist]);

  const addItemToWishlist = async (item) => {
    const updatedWishItems = [...wishItems, item];
    setWishItems(updatedWishItems);
    localStorage.setItem('wishItems', JSON.stringify(updatedWishItems));
  };

  return (
    <WishContext.Provider value={{ wishItems, setWishItems, fetchWishlist, addItemToWishlist, loading, error }}>
      {children}
    </WishContext.Provider>
  );
};

export const useWish = () => {
  return useContext(WishContext);
};
