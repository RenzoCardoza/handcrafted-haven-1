"use client";

import { signIn } from "next-auth/react";
import { useState } from "react";



export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    async function handleSubmit(e: React.FormEvent) {
  e.preventDefault();

  const result = await signIn("credentials", {
    email,
    password,
    redirect: true,
    callbackUrl: "/user",
  });

  console.log(result);
}

return (
  <main className="flex min-h-screen items-center justify-center">
    <div className="w-full max-w-md p-6 border rounded-xl shadow-md">
      <h1 className="text-2xl font-semibold mb-4 text-center">
        Login
      </h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <input
          type="email"
          placeholder="Email"
          className="border p-2 rounded-md"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="border p-2 rounded-md"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          type="submit"
          className="bg-black text-white p-2 rounded-md"
        >
          Sign In
        </button>
      </form>
    </div>
  </main>
);
}