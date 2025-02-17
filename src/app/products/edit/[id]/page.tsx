"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useParams } from "next/navigation";
import { Product } from "@/app/types";

export default function EditProduct() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>(); 
  const [product, setProduct] = useState<Product>({ id: 0, name: "", price: "" });

  useEffect(() => {
    if (id) {
      fetch(`/api/products`)
        .then((res) => res.json())
        .then((data) => {
          const foundProduct = data.find((p: Product) => p.id === parseInt(id)); 
          if (foundProduct) setProduct(foundProduct);
        });
    }
  }, [id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await fetch(`/api/products`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...product }),
    });
    router.push("/");
  };

  return (
    <div className="h-screen bg-gray-50 p-6">
      <h1 className="text-2xl font-bold">Modifier un Produit</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={product.name}
          onChange={(e) => setProduct({ ...product, name: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="number"
          value={product.price}
          onChange={(e) => setProduct({ ...product, price: e.target.value })}
          className="w-full border p-2 rounded"
          required
        />
        <button type="submit" className="bg-yellow-500 text-white px-4 py-2 rounded">
          Modifier
        </button>
        <button
          type="button"
          onClick={() => router.push("/")}
          className="bg-red-500 text-white px-4 py-2 rounded"
        >
          Annuler
        </button>
      </form>
    </div>
  );
}