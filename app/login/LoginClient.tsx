"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Nav from "@/app/components/Nav";

export default function LoginClient() {
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
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header showSearch={false} showAuth={false} />
      <Nav />

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-[#E5DFD3] bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-center text-2xl font-semibold text-[#2F241D]">
            Login
          </h1>

          <p className="mb-6 text-center text-sm text-[#6B5B4D]">
            Sign in with your account or continue with GitHub.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Email"
              className="rounded-xl border border-[#D8CFC2] p-3 outline-none focus:border-[#7C5A3C]"
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="rounded-xl border border-[#D8CFC2] p-3 outline-none focus:border-[#7C5A3C]"
              onChange={(e) => setPassword(e.target.value)}
            />

            <button
              type="submit"
              className="rounded-xl bg-[#7C5A3C] p-3 text-white transition hover:bg-[#68492F]"
            >
              Sign In
            </button>
          </form>

          <div className="my-4 text-center text-sm text-[#9A8B7A]">or</div>

          <button
            onClick={handleGitHubSignIn}
            className="w-full rounded-xl border border-[#D8CFC2] p-3 transition hover:bg-[#F8F4ED]"
          >
            Continue with GitHub
          </button>

          {message && (
            <p className="mt-4 text-center text-sm text-red-500">{message}</p>
          )}

          <p className="mt-6 text-center text-sm text-[#6B5B4D]">
            Don&apos;t have an account?{" "}
            <Link
              href={`/register?role=${role}`}
              className="text-[#7C5A3C] hover:underline"
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