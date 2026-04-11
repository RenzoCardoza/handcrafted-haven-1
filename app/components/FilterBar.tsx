"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function FilterBar({ mobile = false }: { mobile?: boolean }) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [open, setOpen] = useState(false);

  const artisan = searchParams.get("artisan") || "";
  const material = searchParams.get("material") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) params.set(key, value);
    else params.delete(key);

    router.push(`/products?${params.toString()}`);
  }

  function clearFilters() {
    router.push("/products");
  }

  const content = (
    <div className="space-y-4 text-sm">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-xs text-indigo-600 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* Artisan */}
      <div>
        <h3 className="font-medium mb-1 text-gray-700">Artisan</h3>
        <input
          type="text"
          value={artisan}
          onChange={(e) => updateParams("artisan", e.target.value)}
          className="w-full border px-2 py-1 rounded text-sm"
        />
      </div>

      {/* Category */}
      <div>
        <h3 className="font-medium mb-1 text-gray-700">Category</h3>
        <select
          value={material}
          onChange={(e) => updateParams("material", e.target.value)}
          className="w-full border px-2 py-1 rounded text-sm"
        >
          <option value="">All</option>
          <option value="wood">Wood</option>
          <option value="leather">Leather</option>
          <option value="ceramic">Ceramic</option>
          <option value="metal">Metal</option>
        </select>
      </div>

      {/* Price */}
      <div>
        <h3 className="font-medium mb-1 text-gray-700">Price</h3>
        <div className="flex gap-1">
          <input
            type="number"
            value={minPrice}
            onChange={(e) => updateParams("minPrice", e.target.value)}
            placeholder="Min"
            className="w-1/2 border px-2 py-1 rounded text-sm"
          />
          <input
            type="number"
            value={maxPrice}
            onChange={(e) => updateParams("maxPrice", e.target.value)}
            placeholder="Max"
            className="w-1/2 border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* Sort */}
      <div>
        <h3 className="font-medium mb-1 text-gray-700">Sort</h3>
        <select
          value={sort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="w-full border px-2 py-1 rounded text-sm"
        >
          <option value="">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>
    </div>
  );

  // Mobile version
  if (mobile) {
    return (
      <>
        <button
          onClick={() => setOpen(true)}
          className="border px-4 py-2 rounded text-sm bg-white shadow"
        >
          Filters
        </button>

        {open && (
          <div className="fixed inset-0 bg-black/40 z-50 flex justify-end">
            <div className="w-72 bg-white h-full p-4 overflow-y-auto shadow-xl m-2 rounded-lg">
              <button
                onClick={() => setOpen(false)}
                className="mb-4 text-sm text-gray-500"
              >
                Close
              </button>
              {content}
            </div>
          </div>
        )}
      </>
    );
  }

  // Desktop
  return <div>{content}</div>;
}