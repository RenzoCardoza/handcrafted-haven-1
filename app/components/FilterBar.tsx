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

    if (value) params.set(key, value);
    else params.delete(key);

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
    if (ref.current) clearTimeout(ref.current);

    ref.current = setTimeout(() => {
      updateParams(key, value);
    }, 400);
  }

  return (
    <div className="space-y-6 text-sm">

      {/* header */}
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8A7768]">
          Filters
        </h2>

        <button
          onClick={clearFilters}
          className="text-xs font-medium text-[#7C5A3C] hover:underline"
        >
          Clear
        </button>
      </div>

      {/* artisan */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2F241D]">
          Artisan
        </label>

        <input
          type="text"
          defaultValue={artisan}
          onChange={(e) =>
            debounceUpdate("artisan", e.target.value, artisanTimeoutRef)
          }
          placeholder="Search artisan..."
          className="
            w-full rounded-lg border border-[#E5DFD3]
            bg-white px-3 py-2
            text-sm text-[#2F241D]
            placeholder:text-[#A89B8F]
            focus:outline-none focus:ring-2 focus:ring-[#D6BFA9]
          "
        />
      </div>

      {/* category */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2F241D]">
          Category
        </label>

        <select
          value={material}
          onChange={(e) => updateParams("material", e.target.value)}
          className="
            w-full rounded-lg border border-[#E5DFD3]
            bg-white px-3 py-2
            text-sm text-[#2F241D]
            focus:outline-none focus:ring-2 focus:ring-[#D6BFA9]
          "
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
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2F241D]">
          Price
        </label>

        <div className="flex gap-2">
          <input
            type="number"
            defaultValue={minPrice}
            onChange={(e) =>
              debounceUpdate("minPrice", e.target.value, minPriceTimeoutRef)
            }
            placeholder="Min"
            className="
              w-1/2 rounded-lg border border-[#E5DFD3]
              bg-white px-3 py-2
              text-sm
              focus:outline-none focus:ring-2 focus:ring-[#D6BFA9]
            "
          />

          <input
            type="number"
            defaultValue={maxPrice}
            onChange={(e) =>
              debounceUpdate("maxPrice", e.target.value, maxPriceTimeoutRef)
            }
            placeholder="Max"
            className="
              w-1/2 rounded-lg border border-[#E5DFD3]
              bg-white px-3 py-2
              text-sm
              focus:outline-none focus:ring-2 focus:ring-[#D6BFA9]
            "
          />
        </div>
      </div>

      {/* sort */}
      <div className="space-y-2">
        <label className="text-sm font-medium text-[#2F241D]">
          Sort by
        </label>

        <select
          value={sort}
          onChange={(e) => updateParams("sort", e.target.value)}
          className="
            w-full rounded-lg border border-[#E5DFD3]
            bg-white px-3 py-2
            text-sm text-[#2F241D]
            focus:outline-none focus:ring-2 focus:ring-[#D6BFA9]
          "
        >
          <option value="">Newest</option>
          <option value="price-asc">Price ↑</option>
          <option value="price-desc">Price ↓</option>
        </select>
      </div>
    </div>
  );
}