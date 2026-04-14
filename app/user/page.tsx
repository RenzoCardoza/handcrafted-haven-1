"use client";

import { useSession, signOut } from "next-auth/react";

export default function UserPage() {
  const { data: session } = useSession();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <a href="/login" className="underline">
          Go to Login
        </a>
      </div>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="p-6 border rounded-xl shadow-md text-center">
        <h1 className="text-xl font-semibold mb-2">
          User Dashboard
        </h1>

        <p className="mb-4">
          Welcome {session.user?.name}
        </p>

        <button
          onClick={() => signOut({ callbackUrl: "/" })}
          className="bg-red-500 text-white px-4 py-2 rounded-md"
        >
          Logout
        </button>
      </div>
    </main>
  );
}