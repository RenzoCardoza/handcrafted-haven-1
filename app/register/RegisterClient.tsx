"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function RegisterClient() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const defaultRole =
    searchParams.get("role") === "seller" ? "seller" : "buyer";

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState(defaultRole);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    setMessageType("");

    try {
      const data = new FormData();
      data.append("file", file);
      data.append("upload_preset", "handcrafted_haven_products");

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dzzsi0uoo/image/upload",
        {
          method: "POST",
          body: data,
        }
      );

      const result = await res.json();

      if (!result.secure_url) {
        setMessage("Image upload failed.");
        setMessageType("error");
        setUploading(false);
        return;
      }

      setImageUrl(result.secure_url);
    } catch (error) {
      console.error("Register seller image upload error:", error);
      setMessage("Image upload failed.");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setMessage("");
    setMessageType("");

    const body =
      role === "seller"
        ? { name, email, password, role, bio, location, image_url: imageUrl }
        : { name, email, password, role };

    const res = await fetch("/api/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      setMessage("Account created successfully! Redirecting to login...");
      setMessageType("success");

      setTimeout(() => {
        router.push(`/login?role=${role}`);
      }, 1500);
    } else {
      setMessage(data.error || "Something went wrong");
      setMessageType("error");
    }
  }

  async function handleGitHubSignIn() {
    if (role === "seller") return;

    await signIn("github", {
      callbackUrl: "/products",
    });
  }

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header showSearch={false} showAuth={false} />

      <section className="flex flex-1 items-center justify-center px-4 py-10">
        <div className="w-full max-w-md rounded-3xl border border-[#E5DFD3] bg-white p-6 shadow-sm">
          <h1 className="mb-2 text-center text-2xl font-semibold text-[#2F241D]">
            Create Account
          </h1>

          <p className="mb-6 text-center text-sm text-[#6B5B4D]">
            Create an account manually or continue with GitHub.
          </p>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              className="rounded-xl border border-[#D8CFC2] p-3 outline-none focus:border-[#7C5A3C]"
              onChange={(e) => setName(e.target.value)}
            />

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

            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="rounded-xl border border-[#D8CFC2] p-3 outline-none focus:border-[#7C5A3C]"
            >
              <option value="buyer">Buyer Account</option>
              <option value="seller">Seller Account</option>
            </select>

            {role === "seller" && (
              <>
                <input
                  type="text"
                  placeholder="Location"
                  className="rounded-xl border border-[#D8CFC2] p-3 outline-none focus:border-[#7C5A3C]"
                  onChange={(e) => setLocation(e.target.value)}
                />

                <textarea
                  placeholder="Tell people a little about the work and style"
                  className="min-h-28 rounded-xl border border-[#D8CFC2] p-3 outline-none focus:border-[#7C5A3C]"
                  onChange={(e) => setBio(e.target.value)}
                />

                <div>
                  <label className="mb-2 block text-sm font-medium text-[#4B3B30]">
                    Profile image
                  </label>

                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="block w-full rounded-xl border border-[#D8CFC2] p-3 text-sm"
                  />

                  {uploading && (
                    <p className="mt-2 text-sm text-[#6B5B4D]">
                      Uploading image...
                    </p>
                  )}

                  {imageUrl && (
                    <div className="mt-4">
                      <Image
                        src={imageUrl}
                        alt="Seller preview"
                        width={120}
                        height={120}
                        className="h-24 w-24 rounded-full border object-cover"
                      />
                    </div>
                  )}
                </div>
              </>
            )}

            <button
              type="submit"
              disabled={uploading}
              className="rounded-xl bg-[#7C5A3C] p-3 text-white transition hover:bg-[#68492F] disabled:opacity-60"
            >
              Register
            </button>
          </form>

          <div className="my-4 text-center text-sm text-[#9A8B7A]">or</div>

          <button
            onClick={handleGitHubSignIn}
            disabled={role === "seller"}
            className={`w-full rounded-xl border p-3 transition ${
              role === "seller"
                ? "cursor-not-allowed border-[#E5DFD3] bg-gray-100 text-gray-400"
                : "border-[#D8CFC2] hover:bg-[#F8F4ED]"
            }`}
          >
            Continue with GitHub
          </button>

          {role === "seller" && (
            <p className="mt-2 text-center text-xs text-[#6B5B4D]">
              GitHub signup is only available for buyer accounts right now because seller signup needs profile details and image upload.
            </p>
          )}

          {message && (
            <p
              className={`mt-4 text-center text-sm ${
                messageType === "success" ? "text-green-600" : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}

          <p className="mt-6 text-center text-sm text-[#6B5B4D]">
            Already have an account?{" "}
            <Link
              href={`/login?role=${role}`}
              className="text-[#7C5A3C] hover:underline"
            >
              Login here
            </Link>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}