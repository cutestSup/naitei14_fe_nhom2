import React from "react";
import { Product } from "../types";

interface Props {
  products?: Product[] | null;
  onSelect: (p: Product) => void;
  onDelete: (id: number) => void;
}

export default function ProductTable({ products, onSelect, onDelete }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];
  if (safeProducts.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border mt-3">
        No product found.
      </div>
    );
  }
  return (
    <table className="w-full border">
      <thead className="bg-gray-100">
        <tr>
          <th className="p-2 border">ID</th>
          <th className="p-2 border">Name</th>
          <th className="p-2 border">Price</th>
          <th className="p-2 border">Stock</th>
          <th className="p-2 border">Category</th>
          <th className="p-2 border">Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeProducts.map((p) => (
          <tr key={p.id} className="hover:bg-gray-50">
            <td className="p-2 border">{p.id}</td>
            <td className="p-2 border">{p.name}</td>
            <td className="p-2 border">${p.price}</td>
            <td className="p-2 border">{p.stock}</td>
            <td className="p-2 border">{p.categoryId}</td>
            <td className="p-2 space-x-2">
              <button
                className="px-2 py-1 bg-blue-500 text-white rounded"
                onClick={() => onSelect(p)}
              >
                Edit
              </button>
              <button
                className="px-2 py-1 bg-red-500 text-white rounded"
                onClick={() => onDelete(p.id)}
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
