"use client";
import { orderService } from "@/container/ClientContainer";
import { useEffect, useState } from "react";

export default function OrdersReport() {
  const [orderStatistics, setOrderStatistics] = useState<{
    newOrders: number;
    completedOrders: number;
    totalOrders: number;
  }>({
    newOrders: 0,
    completedOrders: 0,
    totalOrders: 0,
  });

  useEffect(() => {
    const dispose = orderService.watchOrders((orders) => {
      const newOrders = orders.filter((o) => o.status === "new").length;
      const completedOrders = orders.length - newOrders;
      setOrderStatistics({
        newOrders,
        completedOrders,
        totalOrders: orders.length,
      });
    });
    return dispose;
  }, []);

  return (
    <div>
      <h3>Orders</h3>
      <h5>New Orders: {orderStatistics.newOrders}</h5>
      <h5>Completed Orders: {orderStatistics.completedOrders}</h5>
      <h5>Total Orders: {orderStatistics.totalOrders}</h5>
    </div>
  );
}
