import React, { useState, useEffect } from "react";
import { Product } from "./types";

interface Props {
  product: Product;
  onSave: (p: Product) => void;
  onCancel: () => void;
}

export default function UpdateProduct({ product, onSave, onCancel }: Props) {
  const [form, setForm] = useState<Product>(product);

  useEffect(() => {
    setForm(product);
  }, [product]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = () => {
    onSave(form);
  };

  // Định nghĩa style chung cho các ô input để code gọn hơn
  const inputClass =
    "border p-2 w-full rounded focus:ring-2 focus:ring-blue-500 outline-none " +
    "bg-white border-gray-300 text-gray-900 " + // Light mode styles
    "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 " + // Dark mode styles
    "transition-colors duration-200";

  const labelClass =
    "block text-xs font-semibold text-gray-500 mb-1 dark:text-gray-400";

  return (
    <div className="p-4 border rounded shadow-sm mt-4 mb-4 transition-colors duration-300 bg-blue-50 border-blue-100 dark:bg-gray-800 dark:border-blue-900/50">
      <h2 className="text-xl font-bold mb-4 text-blue-800 dark:text-blue-400">
        Update Product #{product.id}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div>
          <label className={labelClass}>Name</label>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Price</label>
          <input
            name="price"
            type="number"
            value={form.price}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Stock</label>
          <input
            name="stock"
            type="number"
            value={form.stock}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <input
            name="category"
            value={form.category}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Image URL</label>
          <input
            name="image"
            value={form.image || ""}
            onChange={handleChange}
            className={inputClass}
          />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Description</label>
          <textarea
            name="description"
            value={form.description || ""}
            onChange={handleChange}
            rows={3}
            className={inputClass}
          />
        </div>
      </div>

      <div className="flex gap-2">
        <button
          onClick={handleSubmit}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition dark:bg-blue-600 dark:hover:bg-blue-500"
        >
          Save Changes
        </button>
        <button
          onClick={onCancel}
          className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 transition dark:bg-gray-600 dark:hover:bg-gray-500"
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
