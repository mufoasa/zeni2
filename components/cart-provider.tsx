"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  useRef,
  type ReactNode,
} from "react";
import type { Product, CartItem } from "@/lib/types";

const CART_STORAGE_KEY = "ustop-cart";

function loadCart(): CartItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = sessionStorage.getItem(CART_STORAGE_KEY);
    if (stored) {
      return JSON.parse(stored);
    }
  } catch {
    // ignore parse errors
  }
  return [];
}

function saveCart(items: CartItem[]) {
  if (typeof window === "undefined") return;
  try {
    sessionStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items));
  } catch {
    // ignore storage errors
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (product: Product, size: string, qty?: number) => void;
  removeItem: (productId: string, size: string) => void;
  updateQuantity: (productId: string, size: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const initialized = useRef(false);

  // Hydrate cart from sessionStorage on mount
  useEffect(() => {
    if (!initialized.current) {
      initialized.current = true;
      const stored = loadCart();
      if (stored.length > 0) {
        setItems(stored);
      }
    }
  }, []);

  // Persist cart to sessionStorage on every change
  useEffect(() => {
    if (initialized.current) {
      saveCart(items);
    }
  }, [items]);

  const addItem = useCallback((product: Product, size: string, qty = 1) => {
    // Strip extra nested data (like product_sizes) and ensure price is a number
    const { product_sizes, ...rest } = product as Product & {
      product_sizes?: unknown;
    };
    const safeProduct: Product = {
      ...rest,
      price:
        typeof rest.price === "string"
          ? Number.parseFloat(rest.price)
          : rest.price,
    };
    setItems((prev) => {
      const existing = prev.find(
        (item) => item.product.id === safeProduct.id && item.size === size
      );
      if (existing) {
        return prev.map((item) =>
          item.product.id === safeProduct.id && item.size === size
            ? { ...item, quantity: item.quantity + qty }
            : item
        );
      }
      return [...prev, { product: safeProduct, size, quantity: qty }];
    });
  }, []);

  const removeItem = useCallback((productId: string, size: string) => {
    setItems((prev) =>
      prev.filter(
        (item) => !(item.product.id === productId && item.size === size)
      )
    );
  }, []);

  const updateQuantity = useCallback(
    (productId: string, size: string, quantity: number) => {
      if (quantity <= 0) {
        removeItem(productId, size);
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          item.product.id === productId && item.size === size
            ? { ...item, quantity }
            : item
        )
      );
    },
    [removeItem]
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        addItem,
        removeItem,
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
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}
