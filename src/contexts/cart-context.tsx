"use client";

import { cartService } from "@/container/ClientContainer";
import { MealDoc } from "@/models/Meal";
import { Cart } from "@/models/User";
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./auth-context";

const CartContext = createContext<{
  cart?: Cart;
  removeFromCart: (meal: MealDoc) => Promise<void>;
  addToCart: (meal: MealDoc) => Promise<void>;
  resetCart: () => Promise<void>;
}>({
  removeFromCart: async (meal: MealDoc) => {},
  addToCart: async (meal: MealDoc) => {},
  resetCart: async () => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>();
  const { auth } = useAuth();

  useEffect(() => {
    const dispose = cartService.watchCart((cart) => {
      setCart(cart);
    });

    return () => {
      dispose.then((disposer) => disposer());
    };
  }, [auth.user]);

  const resetCart = () => {
    return cartService.updateCart(new Cart());
  };

  const addToCart = (meal: MealDoc) => {
    const updatedCart = new Cart(cart);
    updatedCart.addItem(meal);
    return cartService.updateCart(updatedCart);
  };

  const removeFromCart = (meal: MealDoc) => {
    const updatedCart = new Cart(cart);
    updatedCart.removeItem(meal);
    return cartService.updateCart(updatedCart);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
