import React from "react";
import { categoriesApi } from "../api";
import { Category } from "../types";

interface Props {
  categories?: Category[] | null;
  onRefresh: () => void;
  onEdit: (category: Category) => void;
}

export default function CategoryTable({
  categories = [],
  onRefresh,
  onEdit,
}: Props) {
  const safeCategories = Array.isArray(categories) ? categories : [];

  const remove = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete?")) return;

    try {
      await categoriesApi.delete(id);
      onRefresh();
    } catch (error) {
      console.error("Failed to delete category", error);
    }
  };

  if (safeCategories.length === 0) {
    return (
      <div className="p-4 text-center text-gray-500 border mt-4 bg-gray-50 rounded">
        No categories found.
      </div>
    );
  }

  return (
    <table className="w-full border mt-4">
      <thead>
        <tr className="bg-gray-100">
          <th className="border p-2">ID</th>
          <th className="border p-2">Name</th>
          <th className="border p-2">Description</th>
          <th className="border p-2">Actions</th>
        </tr>
      </thead>
      <tbody>
        {safeCategories.map((c) => (
          <tr key={c.id}>
            <td className="border p-2">{c.id}</td>
            <td className="border p-2">{c.name}</td>
            <td className="border p-2">{c.description}</td>
            <td className="border p-2 space-x-2">
              <button
                className="px-3 py-1 bg-yellow-500 text-white rounded"
                onClick={() => onEdit(c)}
              >
                Edit
              </button>
              <button
                className="px-3 py-1 bg-red-600 text-white rounded"
                onClick={() => remove(c.id)}
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
