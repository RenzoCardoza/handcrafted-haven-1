"use client";

import Link from "next/link";
import CartDrawer from "./CartDrawer";
import { useRouter, useSearchParams } from "next/navigation";
import { useRef } from "react";
import { useSession, signOut } from "next-auth/react";

interface HeaderProps {
  showSearch?: boolean;
  showAuth?: boolean;
}

export default function Header({
  showSearch = true,
  //showAuth = true,
}: HeaderProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const { data: session } = useSession();

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
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-4">
        {/* logo */}
        <Link
          href="/"
          className="font-bold text-xl whitespace-nowrap hover:opacity-80 transition"
        >
          Handcrafted Haven
        </Link>

        {/* search */}
        {showSearch && (
          <div className="flex-1 flex justify-center">
            <form onSubmit={handleSearchSubmit} className="w-full max-w-md">
              <input
                key={searchParams.get("q") || ""}
                type="text"
                name="q"
                defaultValue={searchParams.get("q") || ""}
                onChange={(e) => handleSearchChange(e.target.value)}
                placeholder="Search products..."
                className="
                  w-full
                  border rounded-lg
                  px-4 py-2
                  text-sm
                  focus:outline-none
                  focus:ring-2 focus:ring-indigo-500
                "
              />
            </form>
          </div>
        )}

        <div className="flex items-center gap-4">
          <CartDrawer />
          {!session ? (
            <a
              href="/login"
              className="
                text-sm font-medium
                text-gray-700
                hover:text-indigo-600
                transition
              "
            >
              Login
            </a>
          ) : (
            <button
              onClick={() => signOut({ callbackUrl: "/" })}
              className="
                text-sm font-medium
                text-gray-700
                hover:text-indigo-600
                transition
              "
            >
              Logout
            </button>
          )}
        </div>
      </div>
    </header>
  );
}