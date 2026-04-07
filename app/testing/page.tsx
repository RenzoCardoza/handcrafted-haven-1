"use client";

import { useState, useEffect } from "react";
import Header from "../ui/Header";
import Nav from "../ui/Nav";
import Footer from "../ui/Footer";
import SellerCard from "../ui/SellerCard";
import ProductForm from "../ui/ProductForm";
import StarRating from "../ui/StarRating";
import ProductCard from "../ui/ProductCard";

interface Product {
  id: number;
  seller_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  review_count: number;
  image_url: string;
  created_at: string;
}

export default function TestingPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch("/query"); // your API route
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProducts();
  }, []);

  const categories = [
    { id: 1, name: "Jewelry" },
    { id: 2, name: "Pottery" },
    { id: 3, name: "Knitting" },
  ];

  return (
    <main className="flex flex-col min-h-screen">
      <Header showSearch={true} showAuth={true} />
      <Nav />

      <section className="p-6 space-y-8">
        {/* SellerCard demo */}
        <SellerCard
          name="Alice Artisan"
          bio="Passionate about handmade pottery and ceramics."
          profileImageUrl="/default-avatar.png"
        />

        {/* ProductForm demo */}
        <ProductForm categories={categories} onSubmit={(data) => console.log(data)} />

        {/* StarRating demo */}
        <StarRating rating={4.2} onRate={(val) => console.log("Rated:", val)} />

        {/* Products from DB */}
        <div>
          <h2 className="text-xl font-bold mb-4">Products from Database</h2>
          {products.length > 0 ? (
            <ul className="grid grid-cols-2 gap-4">
              {products.map((p) => (
                <li key={p.id}>
                  <ProductCard product={p} />
                </li>
              ))}
            </ul>
          ) : (
            <p>Loading products...</p>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}
