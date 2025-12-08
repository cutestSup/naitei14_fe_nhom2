import React from "react";
import { Product } from "../types";

interface Props {
  product: Product | null;
}

export default function ProductDetail({ product }: Props) {
  if (!product) {
    return <div className="mt-4 text-gray-500">Select a product to view details.</div>;
  }

  return (
    <div className="mt-4 p-4 border rounded shadow-sm bg-white">
      <h2 className="text-xl font-bold mb-2">Product Detail</h2>

      <p><strong>ID:</strong> {product.id}</p>
      <p><strong>Name:</strong> {product.name}</p>
      <p><strong>Price:</strong> ${product.price}</p>
      <p><strong>Stock:</strong> {product.stock}</p>
      <p><strong>Category:</strong> {product.categoryId}</p>

      {product.thumbnail && (
        <img
          src={product.thumbnail}
          alt="Product"
          className="w-32 h-32 mt-3 border rounded object-cover"
        />
      )}

      {product.description && (
        <p className="mt-3">
          <strong>Description:</strong> {product.description}
        </p>
      )}
    </div>
  );
}
