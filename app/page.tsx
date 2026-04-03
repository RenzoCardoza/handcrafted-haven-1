import Image from "next/image";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-amber-50 py-16">
        <div className="relative w-full max-w-6xl aspect-[3/1] mb-8">
          <Image
            src="/hero.png"
            alt="Handmade crafts hero"
            fill
            className="object-cover rounded"
            priority
          />
        </div>
        <h1 className="font-heading text-4xl mb-4">Discover Unique Handmade Creations</h1>
        <p className="font-body text-lg mb-6">Support artisans. Find something special.</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Browse Collection
        </button>
      </section>

      <Footer />
    </main>
  );
}
