"use client";

import ConfirmOrder from "@/components/ConfirmOrder";
import { useCart } from "@/contexts/cart-context";
import ChevronDownIcon from "@/icons/ChevronDown";
import ChevronUpIcon from "@/icons/ChevronUp";
import Image from "next/image";

export default function CartPage() {
  const { cart, addToCart, removeFromCart } = useCart();

  return (
    <div className="bg-white mx-auto p-2 rounded container">
      <div className="row align-items-center">
        <div className="col-12 col-lg-6">
          <div
            style={{ maxHeight: "400px" }}
            className="border rounded p-2 overflow-auto"
          >
            <table className="table">
              <thead>
                <tr>
                  <th scope="column">#</th>
                  <th scope="column">item</th>
                  <th scope="column">price</th>
                  <th scope="column">quantity</th>
                  <th scope="column"></th>
                </tr>
              </thead>
              <tbody>
                {cart?.items.map(({ item, quantity }, index) => (
                  <tr key={index}>
                    <th scope="row">{index + 1}</th>
                    <td valign="middle">
                      <div className="hstack gap-2">
                        <span>
                          <Image
                            src={item.image}
                            width={50}
                            height={50}
                            alt={item.name}
                          />
                        </span>
                        <span>{item.name}</span>
                      </div>
                    </td>
                    <td align="center" valign="middle">
                      £{item.price}
                    </td>
                    <td align="center" valign="middle">
                      {quantity}
                    </td>
                    <td>
                      <div className="vstack gap-2">
                        <button
                          onClick={() => {
                            addToCart(item);
                          }}
                          className="btn p-0"
                        >
                          <ChevronUpIcon />
                        </button>
                        <button
                          onClick={() => {
                            removeFromCart(item);
                          }}
                          className="btn p-0"
                        >
                          <ChevronDownIcon />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <div
          style={{ minHeight: "300px" }}
          className="col-12 col-lg-6 p-4 text-center align-self-stretch"
        >
          <div className="d-flex flex-column justify-content-between h-100">
            <strong>Total: £{cart?.totalPrice.toFixed(2)}</strong>
            {(cart?.items.length && <ConfirmOrder />) || null}
          </div>
        </div>
      </div>
    </div>
  );
}
