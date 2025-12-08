import React, { useEffect, useState } from "react";
import { categoriesApi } from "./api";
import { Category } from "./types";
import CategoryForm from "./components/CategoryForm";
import CategoryTable from "./components/CategoryTable";

export default function AdminCategories() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);

  const load = () => {
    categoriesApi.getAll().then((data) => setCategories(data || []));
  };

  useEffect(() => {
    load();
  }, []);

  const handleEdit = (category: Category) => {
    setEditingCategory(category);
  };

  const handleSuccess = () => {
    setEditingCategory(null);
    load();
  };

  return (
    <div>
      <h1 className="text-2xl font-bold">Categories</h1>
      <CategoryForm category={editingCategory} onSuccess={handleSuccess} />
      <CategoryTable
        categories={categories}
        onRefresh={load}
        onEdit={handleEdit}
      />
    </div>
  );
}
