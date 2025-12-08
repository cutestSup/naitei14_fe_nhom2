import React, { useEffect, useState } from "react";
import { ordersApi } from "./api";
import { Order } from "./types";
import OrderForm from "./components/OrderForm";
import OrderTable from "./components/OrderTable";
import OrderDetail from "./components/OrderDetail";

export default function OrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [editingOrder, setEditingOrder] = useState<Order | null>(null);
  const [viewOrder, setViewOrder] = useState<Order | null>(null);

  const load = () => {
    ordersApi.getAll().then((data) => setOrders(data || []));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
  };

  const handleSuccess = () => {
    setEditingOrder(null);
    load();
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Orders</h1>

      <OrderForm order={editingOrder} onSuccess={handleSuccess} />

      <OrderTable
        orders={orders}
        onRefresh={load}
        onEdit={handleEdit}
        onView={setViewOrder}
      />

      <OrderDetail order={viewOrder} />

      <button
        onClick={() => setEditingOrder(null)}
        className="px-4 py-2 bg-green-600 text-white rounded mt-4"
      >
        + New Order
      </button>
    </div>
  );
}
