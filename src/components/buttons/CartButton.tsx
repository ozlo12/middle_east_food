"use client";
import CartIcon from "@/icons/Cart";
import { MouseEventHandler } from "react";

export function CartButton({ onClick }: { onClick: MouseEventHandler }) {
  return (
    <button onClick={onClick} className="btn">
      <CartIcon color="dark" />
    </button>
  );
}
