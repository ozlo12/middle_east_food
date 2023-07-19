"use client";

import useSWR, { Fetcher } from "swr";

const fetcher: Fetcher<Order, string> = (id: string) =>
  orderService.getOrder(id);

import { orderService } from "@/container/ClientContainer";

export default function OrderDetails({ id }: { id: string }) {
  const { data, isLoading, error } = useSWR(id, fetcher);
  return (
    <div className="container bg-white mx-auto rounded p-4">
      <h3 className="fs-3 text-center mb-4">Order Deetails</h3>
      <div className="mb-2">Created Date: {data?.createdAt}</div>
      <div>Contact Details:</div>
      <div className="m-4">
        <div>Customer Name: {data?.contact.name}</div>
        <div>Customer Phone: {data?.contact.phone}</div>
        <div>Customer Email: {data?.contact.email}</div>
        <div>Customer Address: {data?.contact.address}</div>
        <div>Customer Pstcode: {data?.contact.postcode}</div>
        <div>Customer City: {data?.contact.city}</div>
      </div>
      <div>Order Items:</div>
      <div className="m-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">name</th>
              <th scope="col">Quantity</th>
              <th scope="col">Price</th>
            </tr>
          </thead>
          <tbody>
            {data?.cart.items.map((item, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.item.name}</td>
                <td>{item.quantity}</td>
                <td>{item.item.price}</td>
              </tr>
            ))}
            <tr>
              <th colSpan={2} scope="row">
                Total:
              </th>
              <th align="center" colSpan={2}>
                <div className="text-center">{data?.cart.totalPrice}</div>
              </th>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
