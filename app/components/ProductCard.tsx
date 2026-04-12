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
    <div className="group flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white hover:shadow-md transition w-full h-full">
      
      <Link href={`/products/${product.id}`} className="block">
        
        {/* iomage */}
        <div className="relative w-full h-44 md:h-52 lg:h-56 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}
        </div>

        {/* content */}
        <div className="flex flex-col p-4 space-y-2">
          
          <h3 className="text-base md:text-lg font-heading text-gray-900 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description || "No description available"}
          </p>

          <p className="text-base md:text-lg font-semibold text-indigo-600">
            ${Number(product.price).toFixed(2)}
          </p>

          {/* rating + date */}
          <div className="text-xs text-gray-500 flex flex-col gap-1">
            
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
                ? new Date(product.created_at).toLocaleDateString("en-US", {
                                                                              year: "numeric",
                                                                              month: "2-digit",
                                                                              day: "2-digit",
                                                                            })
                : ""}
            </span>

          </div>
        </div>
      </Link>

      {/* button */}
      <div className="p-4 pt-0 mt-auto">
        <AddToCartButton productId={product.id} />
      </div>
    </div>
  );
}