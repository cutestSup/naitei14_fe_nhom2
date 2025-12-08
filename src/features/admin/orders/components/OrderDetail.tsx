import React from "react";
import { Order } from "../types";

interface Props {
  order: Order | null;
}

export default function OrderDetail({ order }: Props) {
  if (!order)
    return (
      <div className="p-4 border mt-4 text-gray-500">
        Select an order to view details
      </div>
    );

  return (
    <div className="p-4 border mt-4">
      <h2 className="text-xl font-semibold mb-2">Order Detail #{order.id}</h2>
      <p>User ID: {order.userId}</p>
      <p>Total: {order.total}</p>

      <h3 className="font-bold mt-2">Items</h3>
      <ul className="list-disc pl-6">
        {order.items?.map((item, index) => (
          <li key={index}>
            {item.productId} × {item.quantity}
          </li>
        ))}
      </ul>
    </div>
  );
}
