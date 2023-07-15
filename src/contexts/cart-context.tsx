"use client";

import { cartService } from "@/container/ClientContainer";
// import { Cart } from "@/models/User";
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
  removeFromCart: (meal: Meal) => Promise<void>;
  addToCart: (meal: Meal) => Promise<void>;
  resetCart: () => Promise<void>;
}>({
  removeFromCart: async (meal: Meal) => {},
  addToCart: async (meal: Meal) => {},
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
    // return cartService.updateCart(new Cart());
    return cartService.resetCart();
  };

  const addToCart = (meal: Meal) => {
    // const updatedCart = new Cart(cart);
    const currentCart: Cart = (cart && JSON.parse(JSON.stringify(cart))) || {
      items: [],
      totalPrice: 0,
    };
    return cartService.addToCart(currentCart, meal);
    // return cartService.updateCart(updatedCart);
  };

  const removeFromCart = (meal: Meal) => {
    // const updatedCart = new Cart(cart);

    // updatedCart.removeItem(meal);
    const currentCart = JSON.parse(JSON.stringify(cart!));
    // return cartService.updateCart(updatedCart);
    return cartService.removeFromCart(currentCart, meal);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, resetCart }}
    >
      {children}
    </CartContext.Provider>
  );
}
