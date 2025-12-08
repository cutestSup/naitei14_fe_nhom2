import React from "react";
import { TopProduct } from "../../../../apis/admin/dashboardIndex";

interface Props {
  products?: TopProduct[];
}

export default function ProductTopList({ products = [] }: Props) {
  const safeProducts = Array.isArray(products) ? products : [];

  return (
    <div className="p-4 border rounded-lg shadow-lg mt-4 bg-gradient-to-r from-green-50 to-white">
      <h2 className="font-bold text-xl mb-4 text-green-800">Top Products</h2>
      <ul className="space-y-2">
        {safeProducts.map((p, index) => (
          <li
            key={p.id}
            className={`flex justify-between items-center p-2 rounded ${
              index === 0
                ? "bg-yellow-200 font-bold text-yellow-900 shadow"
                : "bg-green-100 hover:bg-green-200 transition"
            }`}
          >
            <span>{p.name}</span>
            <span className="font-semibold">{p.sales} sales</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
