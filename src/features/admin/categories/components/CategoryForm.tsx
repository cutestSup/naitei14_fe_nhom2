import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { categoriesApi } from "../api";
import { Category } from "../types";

interface Props {
  category?: Category | null;
  onSuccess: () => void;
}

export default function CategoryForm({ category, onSuccess }: Props) {
  const { register, handleSubmit, reset, setValue } =
    useForm<Partial<Category>>();

  useEffect(() => {
    if (category) {
      setValue("name", category.name);
      setValue("description", category.description);
    } else {
      reset();
    }
  }, [category, reset, setValue]);

  const onSubmit = async (data: Partial<Category>) => {
    if (category) {
      await categoriesApi.update(category.id, data);
    } else {
      await categoriesApi.create(data);
    }
    reset();
    onSuccess();
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-2 p-4 border mt-4"
    >
      <input
        {...register("name", { required: true })}
        className="border p-2 w-full"
        placeholder="Category name"
      />
      <textarea
        {...register("description")}
        className="border p-2 w-full"
        placeholder="Description"
      />
      <button
        className="px-4 py-2 bg-blue-600 text-white rounded"
        type="submit"
      >
        {category ? "Update" : "Create"}
      </button>
    </form>
  );
}
