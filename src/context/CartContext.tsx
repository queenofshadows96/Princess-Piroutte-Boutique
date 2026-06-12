"use client";

import { createContext, useContext, useState, useEffect, ReactNode } from "react";

export type CartItem = {
  id: string;
  name: string;
  price: number;
  size: string;
  quantity: number;
  colorId: string;
  emoji?: string;
  gradient?: string;
};

type CartContextType = {
  items: CartItem[];
  addToCart: (item: Omit<CartItem, "quantity">) => void;
  removeFromCart: (id: string, size: string, colorId: string) => void;
  updateQuantity: (
    id: string,
    size: string,
    colorId: string,
    quantity: number
  ) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [loaded, setLoaded] = useState(false); // ⭐ prevents overwriting cart

  // ⭐ Load cart BEFORE saving anything
  useEffect(() => {
    try {
      const stored = localStorage.getItem("cart");
      if (stored) {
        setItems(JSON.parse(stored));
      }
    } catch (err) {
      console.error("Failed to load cart:", err);
    }
    setLoaded(true);
  }, []);

  // ⭐ Save cart ONLY after initial load
  useEffect(() => {
    if (!loaded) return; // ❗ prevents wiping cart on mount
    localStorage.setItem("cart", JSON.stringify(items));
  }, [items, loaded]);

  const addToCart = (newItem: Omit<CartItem, "quantity">) => {
    setItems((prev) => {
      const existing = prev.find(
        (i) =>
          i.id === newItem.id &&
          i.size === newItem.size &&
          i.colorId === newItem.colorId
      );

      if (existing) {
        return prev.map((i) =>
          i.id === newItem.id &&
          i.size === newItem.size &&
          i.colorId === newItem.colorId
            ? { ...i, quantity: i.quantity + 1 }
            : i
        );
      }

      return [...prev, { ...newItem, quantity: 1 }];
    });
  };

  const removeFromCart = (id: string, size: string, colorId: string) => {
    setItems((prev) =>
      prev.filter(
        (i) => !(i.id === id && i.size === size && i.colorId === colorId)
      )
    );
  };

  const updateQuantity = (
    id: string,
    size: string,
    colorId: string,
    quantity: number
  ) => {
    if (quantity <= 0) {
      setItems((prev) =>
        prev.filter(
          (i) => !(i.id === id && i.size === size && i.colorId === colorId)
        )
      );
      return;
    }

    setItems((prev) =>
      prev.map((i) =>
        i.id === id && i.size === size && i.colorId === colorId
          ? { ...i, quantity }
          : i
      )
    );
  };

  const clearCart = () => setItems([]);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);

  const totalPrice = items.reduce(
    (sum, item) => sum + Number(item.price) * Number(item.quantity),
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
