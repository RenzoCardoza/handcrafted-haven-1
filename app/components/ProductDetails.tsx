"use client";

import Image from "next/image";
import AddToCartButton from "./AddToCartButton";
import { useState } from "react";

/* make type safe, I struggle a lot with this one */
type ProductSafe = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at?: string;

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
  const [quantity, setQuantity] = useState(1);

  return (
    <div className="flex flex-col md:flex-row gap-8">

      {/* image */}
      <div className="relative w-full md:w-1/2 aspect-square bg-amber-50 rounded flex items-center justify-center">
        {product.image_url && (
          <Image
            src={product.image_url || "/fallback.png"}
            alt={product.name}
            width={300}
            height={300}
            className="object-contain"
          />
        )}
      </div>

      {/* info */}
      <div className="flex-1 flex flex-col">

        <div className="space-y-4">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <p className="text-green-600 text-2xl font-semibold">
            ${product.price.toFixed(2)}
          </p>

          <p className="text-gray-700">{product.description}</p>

          {/* seller */}
          <p className="text-sm text-gray-500">
            {product.artisan && (
              <>
                Seller:{" "}
                <a
                  href={`/artisans/${product.artisan.id}`}
                  className="text-indigo-600 hover:underline"
                >
                  {product.artisan.name}
                </a>
              </>
            )}
            
          </p>

          {/* category */}
          {product.category && (
            <p className="text-sm text-gray-500">
              Category:{" "}
              <a
                href={`/products?material=${product.category.name.toLocaleLowerCase()}`}
                className="text-indigo-600 hover:underline capitalize"
              >
                {product.category.name}
              </a>
            </p>
          )}

          {/* make the date safe */}
          <p className="text-sm text-gray-500">
            Added on: {formatDate(product.created_at)}
          </p>
        </div>

        {/* controls */}
        <div className="mt-8 flex flex-col items-center gap-4">

          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="px-3 py-1 border rounded"
            >
              -
            </button>

            <span className="text-lg w-8 text-center">
              {quantity}
            </span>

            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="px-3 py-1 border rounded"
            >
              +
            </button>
          </div>

          <AddToCartButton
            productId={product.id}
            quantity={quantity}
            className="w-full max-w-md py-3 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}