import Image from "next/image";
import Link from "next/link";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import Nav from "./components/Nav";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Nav />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-amber-50 px-4 sm:px-6 lg:px-8 py-12 sm:py-16">

        {/* Image */}
        <div className="relative w-full max-w-6xl aspect-[4/3] sm:aspect-[16/6] md:aspect-[3/1] mb-6 sm:mb-8">
          <Image
            src="/hero.png"
            alt="Handmade crafts hero"
            fill
            className="object-cover rounded-lg"
            priority
          />
        </div>

        {/* Text */}
        <div className="text-center max-w-2xl">
          <h1 className="font-heading text-2xl sm:text-3xl md:text-4xl lg:text-5xl mb-3 sm:mb-4">
            Discover Unique Handmade Creations
          </h1>

          <p className="font-body text-base sm:text-lg text-gray-700 mb-5 sm:mb-6">
            Support artisans. Find something special.
          </p>

          {/* CTA */}
          <Link href="/products">
            <button className="bg-green-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg hover:bg-green-700 transition">
              Browse Collection
            </button>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}