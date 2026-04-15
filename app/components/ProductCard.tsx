"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "../types/Product";
import AddToCartButton from "./AddToCartButton";

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating - fullStars >= 0.5;

  return (
    <>
      {"★".repeat(fullStars)}
      {hasHalf && "☆"}
      {"☆".repeat(5 - fullStars - (hasHalf ? 1 : 0))}
    </>
  );
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="group flex flex-col h-full overflow-hidden rounded-2xl border border-[#E5DFD3] bg-white/90 shadow-sm transition hover:shadow-lg hover:-translate-y-1">

      <Link href={`/products/${product.id}`} className="block">

        {/* image */}
        <div className="relative w-full h-48 md:h-56 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className="object-cover transition-transform duration-500 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center bg-gray-100 text-sm text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col p-5 space-y-2">

          <h3 className="text-base md:text-lg font-semibold text-[#2F241D] line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-[#6B5B4D] line-clamp-2">
            {product.description || "No description available"}
          </p>

          <p className="text-lg font-semibold text-[#7C5A3C]">
            ${Number(product.price).toFixed(2)}
          </p>

          {product.quantity === 0 ? (
            <p className="text-sm text-red-500 font-medium">
              Out of stock
            </p>
          ) : (
            <p className="text-xs text-[#8A7768]">
              In stock: {product.quantity}
            </p>
          )}

          {/* rating + date */}
          <div className="flex flex-col gap-1 text-xs text-[#8A7768]">

            <span>
              {product.review_count && product.review_count > 0 ? (
                <>
                  <span className="text-yellow-500">
                    {renderStars(product.avg_rating || 0)}
                  </span>{" "}
                  ({product.review_count})
                </>
              ) : (
                <span className="text-gray-400">No reviews yet</span>
              )}
            </span>

            <span className="text-gray-400">
              {product.created_at
                ? new Date(product.created_at).toLocaleDateString("en-US")
                : ""}
            </span>

          </div>
        </div>
      </Link>

      {/* button */}
      <div className="p-5 pt-0 mt-auto">
        {product.quantity > 0 ? (
          <AddToCartButton productId={product.id} />
        ) : (
          <button
            disabled
            className="w-full rounded-xl bg-gray-200 py-2.5 text-gray-500 cursor-not-allowed"
          >
            Out of stock
          </button>
        )}
      </div>
    </div>
  );
}