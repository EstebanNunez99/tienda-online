import React, { createContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(
    JSON.parse(localStorage.getItem('cartItems')) || []
  );

  const updateLocalStorage = (newCartItems) => {
    localStorage.setItem('cartItems', JSON.stringify(newCartItems));
  };

  const addToCart = (product, quantity) => {
    const exists = cartItems.find((item) => item._id === product._id);
    const newCartItems = exists
      ? cartItems.map((item) =>
          item._id === product._id
            ? { ...item, qty: item.qty + quantity }
            : item
        )
      : [...cartItems, { ...product, qty: quantity }];

    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };

  const removeFromCart = (id) => {
    const newCartItems = cartItems.filter((item) => item._id !== id);
    setCartItems(newCartItems);
    updateLocalStorage(newCartItems);
  };

  const clearCart = () => {
    setCartItems([]);
    updateLocalStorage([]);
  };

  const contextValue = {
    cartItems,
    addToCart,
    removeFromCart,
    clearCart,
    cartTotal: cartItems.reduce((acc, item) => acc + item.precio * item.qty, 0).toFixed(2),
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export { CartContext };
