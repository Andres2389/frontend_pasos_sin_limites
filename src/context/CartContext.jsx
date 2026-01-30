// src/context/CartContext.js
import React, { createContext, useState, useEffect } from "react";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  // Estado inicial desde localStorage
  const [items, setItems] = useState(() => {
    try {
      const stored = localStorage.getItem("costehuilense_cart");
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  // Persistencia
  useEffect(() => {
    console.log('[CART CONTEXT - ITEMS]', items);
    localStorage.setItem("costehuilense_cart", JSON.stringify(items));
  }, [items]);

  // ➕ Agregar producto (o sumar si ya existe)
  const addItem = (product) => {
    setItems((prev) => {
      const idx = prev.findIndex((i) => i._id === product._id && i.talla === product.talla);

      if (idx >= 0) {
        const copy = [...prev];
        copy[idx].cantidad += 1;
        return copy;
      }

      const newItem = { ...product, cantidad: 1 };
      console.log('[CART CONTEXT - ADD]', newItem);
      return [...prev, newItem];
    });
  };

  // ➖ Actualizar cantidad exacta
  const updateItemQuantity = (productId, cantidad) => {
    setItems((prev) => {
      if (cantidad <= 0) {
        return prev.filter((i) => i._id !== productId);
      }

      return prev.map((item) =>
        item._id === productId
          ? { ...item, cantidad }
          : item
      );
    });
  };

  // ❌ Eliminar producto
  const removeItem = (productId) => {
    setItems((prev) => prev.filter((i) => i._id !== productId));
  };

  // 🧹 Vaciar carrito
  const clearCart = () => setItems([]);

  // 🧮 Totales
  const totalItems = items.reduce((sum, i) => sum + i.cantidad, 0);
  const totalPrice = items.reduce(
    (sum, i) => sum + i.cantidad * i.valor,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        updateItemQuantity, 
        removeItem,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
