import React from "react";
import { ordersApi } from "../api";
import { Order } from "../types";

interface Props {
  orders?: Order[] | null;
  onRefresh: () => void;
  onEdit: (order: Order) => void;
  onView: (order: Order) => void;
}

export default function OrderTable({
  orders = [],
  onRefresh,
  onEdit,
  onView,
}: Props) {
  const safeOrders = Array.isArray(orders) ? orders : [];

  const remove = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await ordersApi.delete(id);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete order", error);
    }
  };

  if (safeOrders.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border mt-4 bg-gray-50 rounded">
        No orders found.
      </div>
    );
  }

  return (
    <table className="w-full border mt-4 text-sm">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">User ID</th>
          <th className="border p-2">Status</th>
          <th className="border p-2">Created At</th>
          <th className="border p-2">Items</th>
          <th className="border p-2">Total</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>

      <tbody>
        {safeOrders.map((o) => (
          <tr key={o.id}>
            <td className="border p-2 text-center">{o.id}</td>
            <td className="border p-2 text-center">{o.userId}</td>
            <td className="border p-2 text-center">{o.status}</td>

            <td className="border p-2 text-center">
              {new Date(o.createdAt).toLocaleString()}
            </td>

            {/* ITEMS COLUMN */}
            <td className="border p-2">
              <ul className="list-disc pl-4 space-y-1">
                {o.items.map((it, idx) => (
                  <li key={idx}>
                    <strong>{it.name}</strong> — {it.quantity} ×{" "}
                    {it.price.toLocaleString()}₫
                  </li>
                ))}
              </ul>
            </td>

            <td className="border p-2 font-semibold text-right">
              {o.total.toLocaleString()}₫
            </td>

            <td className="border p-2 space-x-2 whitespace-nowrap">
              <button
                className="px-3 py-1 bg-blue-600 text-white rounded"
                onClick={() => onView(o)}
              >
                View
              </button>

              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => onEdit(o)}
              >
                Edit
              </button>

              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => remove(o.id)}
              >
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
