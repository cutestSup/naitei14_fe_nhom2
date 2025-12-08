import React, { useState, useEffect } from "react";
import { Product } from "./types";

interface Props {
  product: Product;
  onSave: (p: Product) => void;
}

export default function UpdateProduct({ product, onSave }: Props) {
  const [form, setForm] = useState<Product>(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "price" || name === "stock" || name === "categoryId"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  return (
    <div className="p-4 border rounded bg-white shadow mt-4">
      <h2 className="text-xl font-bold mb-3">Update Product</h2>
      <input
        name="name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="price"
        type="number"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="stock"
        type="number"
        value={form.stock}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="categoryId"
        type="number"
        value={form.categoryId}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="description"
        value={form.description || ""}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Save
      </button>
    </div>
  );
}
