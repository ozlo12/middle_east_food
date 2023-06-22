"use client";
import ConfirmAddress from "@/components/ConfirmAddress";
import { CartItem, Cart } from "@/models/cart";
import { Meal } from "@/models/Meal";
import Image from "next/image";
import { useRef, useState } from "react";
import { ref } from "yup";
import useClickout from "@/hooks/use-clickout";

export default function CartPage() {
  const confirmAddressRef = useRef(null);
  // const [showConfirm, setShowConfirm] = useState(true);
  const { show, setShow } = useClickout(confirmAddressRef);
  const cart = new Cart(
    [
      new CartItem(
        new Meal(
          "2133",
          "Test Meal",
          "Very Tasty Meal",
          ["syrian", "vegan"],
          "/shawerma.jpg",
          23,
          "2023-6-15"
        ),
        3
      ),
      new CartItem(
        new Meal(
          "3133",
          "Test Meal2",
          "Very Tasty Meal",
          ["syrian", "vegan"],
          "/shawerma.jpg",
          33,
          "2023-6-15"
        ),
        2
      ),
    ],
    455
  );

  return (
    <div className="container">
      <div ref={confirmAddressRef}>
        <ConfirmAddress show={show} closeHandler={() => setShow(false)} />
      </div>
      <div className="table-responsive p-2 m-2 bg-primary-subtle rounded">
        <table className="table table-primary">
          <thead>
            <tr className="">
              <th scope="col">#</th>
              <th scope="col">Meal</th>
              <th scope="col">Price</th>
              <th scope="col">Quanitity</th>
              <th scope="col">Remove</th>
              <th scope="col">Add</th>
            </tr>
          </thead>
          <tbody>
            {cart.items.map(({ item, quantity }, i) => (
              <tr key={i}>
                <th scope="row">{i + 1}</th>
                <td>
                  <div className="hstack gap-2">
                    <Image
                      src={item.image}
                      height={40}
                      width={40}
                      alt={item.name}
                    />
                    <span>{item.name}</span>
                  </div>
                </td>
                <td>{item.price}</td>
                <td>x{quantity}</td>
                <td>
                  <button className="btn text-danger fs-4 rounded-circle">
                    -
                  </button>
                </td>
                <td>
                  <button className="btn text-primary fs-4 rounded-circle">
                    +
                  </button>
                </td>
              </tr>
            ))}
            <tr>
              <th className="align-middle" scope="row">
                Total
              </th>
              <td className="align-middle text-center" colSpan={4}>
                ${cart.totalPrice}
              </td>
              <td>
                <button
                  onClick={() => setShow(true)}
                  className="btn btn-primary float-end my-2"
                >
                  Order
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
