import React, { useState } from "react";
import { Product } from "./types";
import { productsApi } from "./api"; // Import local API

interface Props {
  onCreate: (p: Product) => void;
}

export default function CreateProduct({ onCreate }: Props) {
  // Khởi tạo state khớp với Product interface mới
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock: 0,
    category: "", // String
    image: "", // String url
    description: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "price" || name === "stock" ? Number(value) : value,
    }));
  };

  const handleSubmit = async () => {
    try {
      const newProduct = await productsApi.create(form);
      onCreate(newProduct);
      // Reset form
      setForm({
        name: "",
        price: 0,
        stock: 0,
        category: "",
        image: "",
        description: "",
      });
    } catch (error) {
      alert("Error creating product: " + error);
    }
  };

  // Định nghĩa style chung cho input để code gọn và đồng bộ
  const inputClass =
    "border p-2 rounded focus:ring-2 focus:ring-green-500 outline-none w-full " +
    "bg-white border-gray-300 text-gray-900 " + // Light mode styles
    "dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:placeholder-gray-400 " + // Dark mode styles
    "transition-colors duration-200";

  return (
    <div className="p-4 border rounded shadow-sm mb-6 bg-white dark:bg-gray-800 dark:border-gray-700 transition-colors duration-300">
      <h2 className="text-xl font-bold mb-4 text-gray-800 dark:text-white">
        Create New Product
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <input
          name="name"
          placeholder="Product Name"
          value={form.name}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="price"
          type="number"
          placeholder="Price"
          value={form.price || ""}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="stock"
          type="number"
          placeholder="Stock Quantity"
          value={form.stock || ""}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="category"
          placeholder="Category Name (e.g. Cây cảnh)"
          value={form.category}
          onChange={handleChange}
          className={inputClass}
        />
        <input
          name="image"
          placeholder="Image URL (e.g. /images/products/...)"
          value={form.image}
          onChange={handleChange}
          className={`${inputClass} md:col-span-2`}
        />
        <textarea
          name="description"
          placeholder="Description"
          value={form.description}
          onChange={handleChange}
          rows={3}
          className={`${inputClass} md:col-span-2`}
        />
      </div>

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition font-medium dark:hover:bg-green-500 shadow-sm"
      >
        Create Product
      </button>
    </div>
  );
}
