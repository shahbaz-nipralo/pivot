'use client'
// Updated CartContext.js
import { createContext, useContext, useState, useEffect } from "react";

const CartContext = createContext(undefined);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);

  // Load cart from localStorage
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      if (savedCart) {
        setItems(JSON.parse(savedCart));
      }
    } catch (error) {
      console.error("Failed to load cart from localStorage:", error);
    }
  }, []);

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(items));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [items]);

  const addItem = (newItem) => {
    setItems((currentItems) => {
      const itemWithUniqueId = {
        ...newItem,
        uniqueId: `${newItem.id}-${Date.now()}`,
        quantity: 1,
      };
      return [...currentItems, itemWithUniqueId];
    });
  };

  const removeItem = (uniqueId) => {
    setItems((currentItems) =>
      currentItems.filter((item) => item.uniqueId !== uniqueId)
    );
  };

  const updateQuantity = (id, quantity) => {
    if (quantity < 1) return;

    setItems((currentItems) =>
      currentItems.map((item) =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  // Simplified and more reliable total price calculation
  const totalPrice = items.reduce((sum, item) => {
    let priceValue = 0;
    
    if (typeof item.price === 'number') {
      priceValue = item.price;
    } else if (typeof item.price === 'string') {
      // Extract numeric value from string (remove currency symbols)
      priceValue = parseFloat(item.price.replace(/[^0-9.-]/g, '')) || 0;
    } else if (item.price?.discounted_price) {
      priceValue = parseFloat(item.price.discounted_price) || 0;
    } else if (item.price?.original_price) {
      priceValue = parseFloat(item.price.original_price) || 0;
    }

    return sum + (priceValue * (item.quantity || 1));
  }, 0);

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        totalItems: items.reduce((total, item) => total + (item.quantity || 1), 0),
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}