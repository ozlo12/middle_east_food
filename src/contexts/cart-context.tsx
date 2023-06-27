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
  removeFromCart: (meal: MealDoc) => void;
  addToCart: (meal: MealDoc) => void;
}>({
  removeFromCart: (meal: MealDoc) => {},
  addToCart: (meal: MealDoc) => {},
});

export const useCart = () => useContext(CartContext);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Cart>();
  const { auth } = useAuth();

  useEffect(() => {
    const dispose = cartService.watchCart((cart) => {
      console.log("cart updated");
      setCart(cart);
    });

    return () => {
      dispose.then((disposer) => disposer());
    };
  }, [auth.user]);

  const addToCart = (meal: MealDoc) => {
    const updatedCart = new Cart(cart);
    updatedCart.addItem(meal);
    cartService.updateCart(updatedCart);
  };

  const removeFromCart = (meal: MealDoc) => {
    const updatedCart = new Cart(cart);
    updatedCart.removeItem(meal);
    cartService.updateCart(updatedCart);
  };

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
}
