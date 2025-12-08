import React, { useEffect, useState } from "react";
import { Product } from "./types";
import { productsApi } from "../../../apis/admin/productsIndex";
import ProductTable from "./components/ProductTable";
import ProductDetail from "./components/ProductDetail";
import CreateProduct from "./CreateProduct";
import UpdateProduct from "./UpdateProduct";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selected, setSelected] = useState<Product | null>(null);

  useEffect(() => {
    productsApi.getAll().then(setProducts);
  }, []);

  const handleSave = async (product: Product) => {
    await productsApi.update(product.id, product);
    setProducts((prev) => prev.map((p) => (p.id === product.id ? product : p)));
    alert("Product updated!");
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Are you sure?")) {
      await productsApi.delete(id);
      setProducts((prev) => prev.filter((p) => p.id !== id));
      if (selected?.id === id) setSelected(null);
      alert("Product deleted!");
    }
  };

  const handleCreate = (product: Product) => {
    setProducts((prev) => [...prev, product]);
    alert("Product created!");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products Management</h1>
      <CreateProduct onCreate={handleCreate} />
      <ProductTable
        products={products}
        onSelect={setSelected}
        onDelete={handleDelete}
      />
      {selected && <UpdateProduct product={selected} onSave={handleSave} />}
      <ProductDetail product={selected} />
    </div>
  );
}
