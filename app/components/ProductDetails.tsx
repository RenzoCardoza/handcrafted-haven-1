"use client";

import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

type ProductSafe = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at?: string;
  quantity: number;

  artisan?: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };
};

function formatDate(date?: string) {
  if (!date) return "N/A";
  return new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default function ProductDetails({
  product,
}: {
  product: ProductSafe;
}) {
  const [quantity, setQuantity] = useState(product.quantity > 0 ? 1 : 0);

  return (
    <div className="flex flex-col gap-10 md:flex-row">

      {/* IMAGE */}
      <div className="relative w-full md:w-1/2 aspect-square rounded-2xl bg-[#F8F4ED] flex items-center justify-center overflow-hidden">
        {product.image_url && (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-contain p-6"
          />
        )}
      </div>

      {/* INFO */}
      <div className="flex flex-1 flex-col">

        {/* TEXT CONTENT */}
        <div className="space-y-5">

          <h1 className="text-3xl md:text-4xl font-semibold text-[#2F241D]">
            {product.name}
          </h1>

          <p className="text-2xl font-semibold text-[#7C5A3C]">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-[#6B5B4D] leading-relaxed">
            {product.description}
          </p>

          {/* STOCK */}
          {product.quantity === 0 ? (
            <p className="text-red-500 font-medium">
              Out of stock
            </p>
          ) : (
            <p className="text-sm text-[#8A7768]">
              {product.quantity} available
            </p>
          )}

          {/* META */}
          <div className="space-y-1 text-sm text-[#8A7768]">

            {product.artisan && (
              <p>
                Seller:{" "}
                <a
                  href={`/artisans/${product.artisan.id}`}
                  className="text-[#7C5A3C] hover:underline"
                >
                  {product.artisan.name}
                </a>
              </p>
            )}

            {product.category && (
              <p>
                Category:{" "}
                <a
                  href={`/products?material=${product.category.name.toLowerCase()}`}
                  className="text-[#7C5A3C] hover:underline capitalize"
                >
                  {product.category.name}
                </a>
              </p>
            )}

            <p>Added on: {formatDate(product.created_at)}</p>
          </div>
        </div>

        {/* CONTROLS */}
        <div className="mt-10 space-y-5">

          {/* quantity selector */}
          <div className="flex items-center gap-4">

            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              disabled={product.quantity === 0}
              className="
                w-10 h-10 rounded-lg border border-[#E5DFD3]
                bg-white text-lg
                hover:bg-[#F5F1E8]
                disabled:opacity-40
              "
            >
              -
            </button>

            <span className="text-lg w-10 text-center font-medium">
              {quantity}
            </span>

            <button
              onClick={() =>
                setQuantity((q) => Math.min(product.quantity, q + 1))
              }
              disabled={product.quantity === 0 || quantity >= product.quantity}
              className="
                w-10 h-10 rounded-lg border border-[#E5DFD3]
                bg-white text-lg
                hover:bg-[#F5F1E8]
                disabled:opacity-40
              "
            >
              +
            </button>
          </div>

          {/* CTA */}
          {product.quantity > 0 ? (
            <AddToCartButton
              productId={product.id}
              quantity={quantity}
              className="
                w-full max-w-md
                py-3
                rounded-xl
                bg-[#7C5A3C]
                text-white
                hover:bg-[#68492F]
                transition
              "
            />
          ) : (
            <button
              disabled
              className="w-full max-w-md py-3 rounded-xl bg-gray-300 text-gray-500"
            >
              Out of stock
            </button>
          )}
        </div>
      </div>
    </div>
  );
}