"use client";

import Link from "next/link";
import CartDrawer from "./CartDrawer";
import { Suspense } from "react";
import { useSession, signOut } from "next-auth/react";
import HeaderSearch from "./HeaderSearch";

interface HeaderProps {
  showSearch?: boolean;
  showAuth?: boolean;
}

export default function Header({ showSearch = true }: HeaderProps) {
  const { data: session, status } = useSession();

  return (
    <header className="sticky top-0 z-50 border-b bg-white">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-6 py-4">
        <Link
          href="/"
          className="whitespace-nowrap text-xl font-bold transition hover:opacity-80"
        >
          Handcrafted Haven
        </Link>

        {showSearch && (
          <Suspense fallback={<div className="flex-1" />}>
            <HeaderSearch />
          </Suspense>
        )}

        <div className="flex items-center gap-4">
          <CartDrawer />

          {status === "loading" ? (
            <span className="text-sm text-gray-500">Loading...</span>
          ) : !session ? (
            <Link
              href="/login"
              className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
            >
              Login
            </Link>
          ) : (
            <>
              <Link
                href={session.user.role === "seller" ? "/seller/dashboard" : "/user"}
                className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
              >
                {session.user.name ?? session.user.email ?? "Account"}
              </Link>

              <button
                onClick={() => signOut({ callbackUrl: "/" })}
                className="text-sm font-medium text-gray-700 transition hover:text-indigo-600"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}