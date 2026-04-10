"use client";

import Image from "next/image";
import { Product } from "../types/Product";
import AddToCartButton from "./AddToCartButton";

export default function ProductCard({ product }: { product: Product }) {

  return (
    <div
      className="
        group
        flex flex-col
        border border-gray-200
        rounded-xl
        overflow-hidden
        bg-white
        hover:shadow-md
        transition
        max-w-sm
        mx-auto
      "
    >
      {/* Image */}
      <div className="relative w-full h-40 md:h-44 overflow-hidden">
        {product.image_url ? (
          <Image
            src={product.image_url}
            alt={product.name}
            fill
            sizes="
              (max-width: 640px) 100vw,
              (max-width: 768px) 50vw,
              (max-width: 1024px) 33vw,
              25vw
            "
            loading="eager"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
            No Image
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-4 space-y-2">
        
        {/* Title */}
        <h3 className="text-base font-heading text-gray-900 line-clamp-1">
          {product.name}
        </h3>

        {/* Description */}
        <p className="text-sm text-gray-600 font-body line-clamp-2">
          {product.description || "No description available"}
        </p>

        {/* Price */}
        <p className="text-base font-semibold text-indigo-600 font-body">
          ${Number(product.price).toFixed(2)}
        </p>

        {/* Meta */}
        <div className="text-xs text-gray-400 flex justify-between">
          <span>⭐ {product.review_count || 0}</span>
          <span>
            {product.created_at
              ? new Date(product.created_at).toLocaleDateString()
              : ""}
          </span>
        </div>

        {/* Button */}
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}