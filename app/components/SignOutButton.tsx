"use client";

import { signOut } from "next-auth/react";

export default function SignOutButton() {
  return (
    <button
      onClick={() => signOut({ callbackUrl: "/" })}
      className="inline-flex items-center rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
    >
      Logout
    </button>
  );
}