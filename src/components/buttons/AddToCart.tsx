"use client";

import { useCart } from "@/contexts/cart-context";

export default function AddToCart({ meal }: { meal: Meal }) {
  const { addToCart } = useCart();
  return (
    <button onClick={() => addToCart(meal)} className="btn btn-primary">
      Add to Cart
    </button>
  );
}
