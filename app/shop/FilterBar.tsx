"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { categories } from "@/app/lib/placeholder-data";

const sortOptions = [
  { label: "Newest", value: "newest" },
  { label: "Price: Low to High", value: "price-asc" },
  { label: "Price: High to Low", value: "price-desc" },
];

export default function FilterBar() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const activeCategory = searchParams.get("category") || "";
  const activeSort = searchParams.get("sort") || "newest";
  const searchQuery = searchParams.get("q") || "";

  function updateParams(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-8">
      {/* Search */}
      <input
        type="text"
        placeholder="Search products..."
        defaultValue={searchQuery}
        onChange={(e) => updateParams("q", e.target.value)}
        className="border rounded px-3 py-2 flex-1"
      />

      {/* Category filter */}
      <select
        value={activeCategory}
        onChange={(e) => updateParams("category", e.target.value)}
        className="border rounded px-3 py-2"
      >
        <option value="">All categories</option>
        {categories.map((cat) => (
          <option key={cat} value={cat}>
            {cat}
          </option>
        ))}
      </select>

      {/* Sort */}
      <select
        value={activeSort}
        onChange={(e) => updateParams("sort", e.target.value)}
        className="border rounded px-3 py-2"
      >
        {sortOptions.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
