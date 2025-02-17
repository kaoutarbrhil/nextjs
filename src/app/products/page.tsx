"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "../types";

export default function Home() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then((data) => setProducts(data));
  }, []);

  const deleteProduct = async (id: number) => {
    await fetch("/api/products", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    setProducts(products.filter((p) => p.id !== id));
  };

  return (
    <div className="bg-gray-50 h-screen p-6">
      <h1 className="text-3xl font-bold mb-4 text-black">Liste des Produits</h1>
      <a href="/products/create" className="bg-blue-500 text-white px-4 py-2 rounded">
        Ajouter un produit
      </a>
      <ul className="mt-4 space-y-2">
        {products.map((product) => (
          <li
            key={product.id}
            className="bg-gray-300 p-4 rounded flex justify-between items-center text-black"
          >
            <span>
              {product.name} - {product.price} €
            </span>
            <button
              onClick={() => deleteProduct(product.id)}
              className="bg-red-500 text-white px-2 py-1 rounded"
            >
              ❌
            </button>
            <button
              onClick={() => router.push(`/products/edit/${product.id}`)}
              className="bg-green-500 text-white px-2 py-1 rounded"
            >
              Mise à jour
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}