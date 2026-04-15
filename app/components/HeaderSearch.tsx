"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";

export default function HeaderSearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  function pushSearch(value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (value.trim()) {
      params.set("q", value.trim());
    } else {
      params.delete("q");
    }

    router.push(`/products?${params.toString()}`, { scroll: false });
  }

  function handleSearchChange(value: string) {
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    searchTimeoutRef.current = setTimeout(() => {
      pushSearch(value);
    }, 1000);
  }

  function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }

    const formData = new FormData(e.currentTarget);
    const value = String(formData.get("q") || "");
    pushSearch(value);
  }

  return (
    <div className="flex flex-1 justify-center">
      <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
        <input
          key={searchParams.get("q") || ""}
          type="text"
          name="q"
          defaultValue={searchParams.get("q") || ""}
          onChange={(e) => handleSearchChange(e.target.value)}
          placeholder="Search products..."
          className="
            w-full rounded-lg border px-4 py-2 text-sm
            focus:outline-none focus:ring-2 focus:ring-indigo-500
          "
        />
      </form>
    </div>
  );
}