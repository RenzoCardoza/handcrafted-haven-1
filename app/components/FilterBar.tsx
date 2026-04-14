"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const artisanTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const minPriceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const maxPriceTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const artisan = searchParams.get("artisan") || "";
  const material = searchParams.get("material") || "";
  const minPrice = searchParams.get("minPrice") || "";
  const maxPrice = searchParams.get("maxPrice") || "";
  const sort = searchParams.get("sort") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  function clearFilters() {
    router.push("/products", { scroll: false });
  }

  function debounceUpdate(
    key: string,
    value: string,
    ref: React.MutableRefObject<ReturnType<typeof setTimeout> | null>
  ) {
    if (ref.current) {
      clearTimeout(ref.current);
    }

    ref.current = setTimeout(() => {
      updateParams(key, value);
    }, 400);
  }

  return (
    <div className="space-y-4 text-sm">

      {/* erase filter button */}
      <div className="flex justify-between items-center">
        <h2 className="font-semibold text-gray-800">Filters</h2>
        <button
          onClick={clearFilters}
          className="text-xs text-indigo-600 hover:underline"
        >
          Clear
        </button>
      </div>

      {/* artisan */}
      <div>
        <h3 className="font-medium mb-1 text-gray-700">Artisan</h3>
        <input
          type="text"
          defaultValue={artisan}
          onChange={(e) =>
            debounceUpdate("artisan", e.target.value, artisanTimeoutRef)
          }
          placeholder="Search artisan..."
          className="w-full border px-2 py-1 rounded text-sm"
        />
      </div>

      {/* category */}
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
          <option value="clay">Clay</option>
          <option value="textile">Textile</option>
        </select>
      </div>

      {/* price */}
      <div>
        <h3 className="font-medium mb-1 text-gray-700">Price</h3>
        <div className="flex gap-1">
          <input
            type="number"
            defaultValue={minPrice}
            onChange={(e) =>
              debounceUpdate("minPrice", e.target.value, minPriceTimeoutRef)
            }
            placeholder="Min"
            className="w-1/2 border px-2 py-1 rounded text-sm"
          />
          <input
            type="number"
            defaultValue={maxPrice}
            onChange={(e) =>
              debounceUpdate("maxPrice", e.target.value, maxPriceTimeoutRef)
            }
            placeholder="Max"
            className="w-1/2 border px-2 py-1 rounded text-sm"
          />
        </div>
      </div>

      {/* sort */}
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
}