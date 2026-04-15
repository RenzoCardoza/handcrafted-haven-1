"use client";

import Image from "next/image";
import Link from "next/link";
import { Product } from "@/app/types/Product";
import { deleteProduct } from "@/app/lib/actions";
import EditProductModal from "./EditProductModal";

export default function MyProductCard({ product }: { product: Product }) {
  const removeProduct = deleteProduct.bind(null, product.id);

  return (
    <div
      className="
        flex h-full min-h-[460px] flex-col overflow-hidden
        rounded-2xl border border-[#E5DFD3]
        bg-white shadow-sm transition hover:shadow-md
      "
    >
      <Link href={`/products/${product.id}`} className="block">
        <div className="relative aspect-[4/3] w-full overflow-hidden bg-[#F5F1E8]">
          {product.image_url ? (
            <Image
              src={product.image_url}
              alt={product.name}
              fill
              sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
              className="object-cover transition duration-300 hover:scale-[1.02]"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-sm text-[#9A8B7A]">
              No Image
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="line-clamp-1 text-lg font-semibold text-[#2F241D]">
            {product.name}
          </h3>

          <p className="mt-2 line-clamp-2 text-sm leading-6 text-[#6B5B4D]">
            {product.description || "No description available."}
          </p>

          <p className="mt-4 text-xl font-semibold text-[#7C5A3C]">
            ${Number(product.price ?? 0).toFixed(2)}
          </p>

          {product.quantity === 0 ? (
            <p className="mt-3 text-sm font-medium text-red-500">
              Out of stock
            </p>
          ) : (
            <p className="mt-3 text-sm text-[#6B5B4D]">
              Inventory: {product.quantity ?? 0}
            </p>
          )}

          {product.category && (
            <p className="mt-1 text-xs capitalize text-[#9A8B7A]">
              Category: {product.category.name}
            </p>
          )}

          <p className="mt-1 text-xs text-[#9A8B7A]">
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

      <div className="mt-auto grid grid-cols-3 gap-2 px-5 pb-5 pt-1">
        <Link
          href={`/products/${product.id}`}
          className="
            inline-flex items-center justify-center rounded-lg
            border border-[#D8CFC2] px-3 py-2 text-sm font-medium
            text-[#2F241D] transition hover:bg-[#F8F4ED]
          "
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
            className="
              w-full rounded-lg bg-red-500 px-3 py-2
              text-sm font-medium text-white transition hover:bg-red-600
            "
          >
            Delete
          </button>
        </form>
      </div>
    </div>
  );
}