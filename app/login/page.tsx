"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function LoginPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/user";
  const role = searchParams.get("role") || "buyer";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const result = await signIn("credentials", {
      email,
      password,
      redirect: false,
      callbackUrl,
    });

    if (result?.error) {
      setMessage("Invalid email or password.");
      return;
    }

    window.location.href = result?.url || callbackUrl;
  }

  async function handleGitHubSignIn() {
    await signIn("github", {
      callbackUrl,
    });
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header showSearch={false} showAuth={false} />

      <section className="flex-1 flex items-center justify-center px-4 py-10 bg-amber-50">
        <div className="w-full max-w-md p-6 border rounded-2xl shadow-md bg-white">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Login
          </h1>

          <p className="text-sm text-gray-500 text-center mb-6">
            Sign in with your account or continue with GitHub.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="border p-3 rounded-md"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border p-3 rounded-md"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="bg-black text-white p-3 rounded-md"
            >
              Sign In
            </button>
          </form>

          <div className="my-4 text-center text-sm text-gray-400">
            or
          </div>

          <button
            onClick={handleGitHubSignIn}
            className="w-full border p-3 rounded-md hover:bg-gray-50 transition"
          >
            Continue with GitHub
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-gray-600">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register?role=${role}`}
              className="text-indigo-600 hover:underline"
            >
              Register here
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}