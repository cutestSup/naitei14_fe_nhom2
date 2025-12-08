import React, { useState } from "react";
import { Product } from "./types";
import { productsApi } from "../../../apis/admin/productsIndex";

interface Props {
  onCreate: (p: Product) => void;
}

export default function CreateProduct({ onCreate }: Props) {
  const [form, setForm] = useState<Partial<Product>>({
    name: "",
    price: 0,
    stock: 0,
    categoryId: 0,
    description: "",
  });

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

  const handleSubmit = async () => {
    const newProduct = await productsApi.create(form);
    onCreate(newProduct);
    setForm({ name: "", price: 0, stock: 0, categoryId: 0, description: "" });
  };
  
  return (
    <div className="p-4 border rounded bg-white shadow mb-4">
      <h2 className="text-xl font-bold mb-3">Create Product</h2>
      <input
        name="name"
        placeholder="Name"
        value={form.name}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="price"
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="stock"
        type="number"
        placeholder="Stock"
        value={form.stock}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="categoryId"
        type="number"
        placeholder="Category ID"
        value={form.categoryId}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <input
        name="description"
        placeholder="Description"
        value={form.description}
        onChange={handleChange}
        className="border p-2 w-full mb-2"
      />
      <button
        onClick={handleSubmit}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Create
      </button>
    </div>
  );
}
