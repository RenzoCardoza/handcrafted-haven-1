"use client";

import { useSession, signIn, signOut } from "next-auth/react";

export default function AuthButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return <span className="text-gray-400 text-sm">...</span>;
  }

  if (session?.user) {
    return (
      <div className="flex items-center gap-3">
        <span className="text-sm text-gray-700">{session.user.name}</span>
        <button
          onClick={() => signOut()}
          className="text-gray-700 hover:text-green-600"
        >
          Sign Out
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={() => signIn("github")}
      className="text-gray-700 hover:text-green-600"
    >
      Sign in with GitHub
    </button>
  );
}
