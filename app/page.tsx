import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header />
      <Nav />

      {/* Hero Section */}
      <section className="flex flex-1 flex-col items-center justify-center px-4 py-12 sm:px-6 sm:py-16 lg:px-8">
        {/* Image */}
        <div className="relative mb-8 w-full max-w-5xl aspect-[4/3] overflow-hidden rounded-2xl shadow-sm sm:aspect-[16/7] md:aspect-[3/1]">
          <Image
            src="/hero.png"
            alt="Handmade crafts hero"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 960px"
            className="object-cover"
            priority
          />
        </div>

        {/* Text */}
        <div className="max-w-2xl text-center">
          <h1 className="mb-4 font-heading text-3xl leading-tight text-[#2F241D] sm:text-4xl md:text-5xl lg:text-6xl">
            Discover Unique Handmade Creations
          </h1>

          <p className="mb-7 font-body text-base text-[#6B5B4D] sm:text-lg">
            Support artisans. Find something special.
          </p>

          <Link
            href="/products"
            className="
              inline-flex items-center justify-center
              rounded-full
              bg-[#7C5A3C] text-white
              px-7 py-3.5
              text-sm md:text-base font-medium
              shadow-sm
              transition hover:bg-[#68492F] hover:shadow-md hover:-translate-y-0.5
            "
          >
            Browse Collection
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}