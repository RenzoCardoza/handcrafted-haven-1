"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/Product";
import { deleteProduct } from "@/app/lib/actions";
import EditProductModal from "./EditProductModal";

export default function MyProductCard({ product }: { product: Product }) {
  const removeProduct = deleteProduct.bind(null, product.id);

  return (
    <div className="flex flex-col border border-gray-200 rounded-xl overflow-hidden bg-white w-full h-full">
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative w-full h-44 md:h-52 overflow-hidden">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center text-sm text-gray-400">
              No Image
            </div>
          )}
        </div>

        <div className="p-4 space-y-2">
          <h3 className="text-base md:text-lg font-heading text-gray-900 line-clamp-1">
            {product.name}
          </h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {product.description}
          </p>

          <p className="text-base md:text-lg font-semibold text-indigo-600">
            ${Number(product.price).toFixed(2)}
          </p>

          {product.quantity === 0 ? (
            <p className="text-sm text-red-500 font-medium">
              Out of stock
            </p>
          ) : (
            <p className="text-sm text-gray-600">
              Inventory: {product.quantity}
            </p>
          )}

          {product.category && (
            <p className="text-xs text-gray-400 capitalize">
              Category: {product.category.name}
            </p>
          )}

          <p className="text-xs text-gray-400">
            {product.created_at
              ? new Date(product.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "2-digit",
                  day: "2-digit",
                })
              : ""}
          </p>
        </div>
      </Link>

      <div className="p-4 pt-0 mt-auto grid grid-cols-3 gap-2">
        <Link
          href={`/products/${product.id}`}
          className="inline-flex items-center justify-center rounded-lg border border-gray-300 py-2 hover:bg-gray-50 transition"
        >
          View
        </Link>

        <EditProductModal product={product} />

        <form
          action={removeProduct}
          onSubmit={(e) => {
            const confirmed = window.confirm(
              "Are you sure you want to delete this product? This will also remove its reviews."
            );

            if (!confirmed) {
              e.preventDefault();
            }
          }}
        >
          <button
            type="submit"
            className="w-full rounded-lg bg-red-500 text-white py-2 hover:bg-red-600 transition"
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}