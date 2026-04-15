"use client";

import { useSession, signOut } from "next-auth/react";
import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import Link from "next/link";
import Image from "next/image";

export default function UserPage() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return (
      <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
        <Header />
        <Nav />

        <section className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="w-full max-w-2xl animate-pulse rounded-3xl border border-[#E5DFD3] bg-white/70 p-8 shadow-sm">
            <div className="h-4 w-24 rounded bg-[#EDE7DD]" />
            <div className="mt-4 h-8 w-48 rounded bg-[#EDE7DD]" />
            <div className="mt-8 space-y-4">
              <div className="h-16 rounded-2xl bg-[#EDE7DD]" />
              <div className="h-16 rounded-2xl bg-[#EDE7DD]" />
              <div className="h-16 rounded-2xl bg-[#EDE7DD]" />
            </div>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  if (!session) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
        <Header showAuth={false} />
        <Nav />

        <section className="flex flex-1 items-center justify-center px-4 py-10">
          <div className="w-full max-w-xl rounded-3xl border border-[#E5DFD3] bg-white/70 p-8 text-center shadow-sm">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8A7768]">
              Account
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#2F241D]">
              You’re not signed in
            </h1>

            <p className="mt-3 text-[#6B5B4D]">
              Log in to view your account details and manage your activity.
            </p>

            <Link
              href="/login"
              className="mt-6 inline-flex items-center rounded-full bg-[#7C5A3C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#68492F]"
            >
              Go to Login
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const userName = session.user?.name || "Unknown User";
  const userEmail = session.user?.email || "No email available";
  const userImage = session.user?.image;

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header />
      <Nav />

      <section className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-5xl space-y-8">
          {/* Intro */}
          <div className="rounded-3xl border border-[#E5DFD3] bg-white/60 p-6 shadow-sm md:p-8">
            <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8A7768]">
              Account
            </p>

            <h1 className="mt-2 text-3xl font-semibold text-[#2F241D] md:text-4xl">
              User Dashboard
            </h1>

            <p className="mt-2 text-[#6B5B4D]">
              Manage your account information and review your profile details.
            </p>
          </div>

          {/* Main card */}
          <div className="rounded-3xl border border-[#E5DFD3] bg-white/70 p-6 shadow-sm md:p-8">
            <div className="flex flex-col gap-8 md:flex-row md:items-start">
              {/* Avatar */}
              <div className="flex justify-center md:justify-start">
                {userImage ? (
                  <div className="relative h-24 w-24">
                    <Image
                      src={userImage}
                      alt={userName}
                      fill
                      sizes="96px"
                      className="rounded-full border border-[#E5DFD3] object-cover"
                    />
                  </div>
                ) : (
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-[#E5DFD3] bg-[#F8F4ED] text-2xl font-semibold text-[#7C5A3C]">
                    {userName.charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <h2 className="text-2xl font-semibold text-[#2F241D]">
                  {userName}
                </h2>

                <p className="mt-1 text-[#6B5B4D]">
                  Welcome back to your account.
                </p>

                <div className="mt-6 grid gap-4 sm:grid-cols-2">
                  <div className="rounded-2xl border border-[#E5DFD3] bg-[#FCFAF6] p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8A7768]">
                      Full Name
                    </p>
                    <p className="mt-2 text-base font-medium text-[#2F241D]">
                      {userName}
                    </p>
                  </div>

                  <div className="rounded-2xl border border-[#E5DFD3] bg-[#FCFAF6] p-4">
                    <p className="text-xs font-medium uppercase tracking-[0.14em] text-[#8A7768]">
                      Email
                    </p>
                    <p className="mt-2 break-all text-base font-medium text-[#2F241D]">
                      {userEmail}
                    </p>
                  </div>
                </div>

                <div className="mt-8">
                  <button
                    onClick={() => signOut({ callbackUrl: "/" })}
                    className="inline-flex items-center rounded-full bg-red-500 px-6 py-3 text-sm font-medium text-white transition hover:bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}