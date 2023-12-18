"use client";
import { orderService } from "@/container/ClientContainer";
import Link from "next/link";
import { useEffect, useState } from "react";
export default function OrdersBoard() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [menu, setMenu] = useState<"new" | "completed">("new");

  useEffect(() => {
    const dispose = orderService.watchOrders((orders) => {
      if (orders?.length) setOrders(orders);
    });
    return dispose;
  }, []);

  return (
    <div className="container p-4 bg-white">
      <div className="mb-4">
        <ul className="nav nav-tabs">
          <li className="nav-item">
            <button
              onClick={() => setMenu("new")}
              className={`nav-link btn ${menu === "new" ? "active" : ""}`}
              aria-current="page"
            >
              New
            </button>
          </li>
          <li className="nav-item">
            <button
              onClick={() => setMenu("completed")}
              className={`nav-link btn ${menu === "completed" ? "active" : ""}`}
            >
              Completed
            </button>
          </li>
        </ul>
      </div>
      <ul style={{ maxHeight: "75vh" }} className="list-group overflow-auto">
        {orders
          .filter((o) => o.status === menu)
          .sort(
            (a, b) =>
              new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
          )
          .map((o, i) => (
            <li key={i} className="list-group-item">
              <div className="d-flex justify-content-between">
                <Link href={"/admin/orders/" + o.id}>
                  <div className="row">
                    <div className="col">{o?.contact?.name || "any"}</div>
                    <div className="col">{o.createdAt}</div>
                  </div>
                </Link>
                <div className="form-check">
                  <input
                    onChange={(e) => {
                      orderService.toggleOrder(
                        o.id!,
                        e.target.checked ? "completed" : "new"
                      );
                    }}
                    className="form-check-input"
                    type="checkbox"
                    checked={o.status === "completed"}
                    id={o.id}
                    value=""
                  />
                  <label className="form-check-label" htmlFor={o.id}>
                    Completed
                  </label>
                </div>
              </div>
            </li>
          ))}
      </ul>
    </div>
  );
}
