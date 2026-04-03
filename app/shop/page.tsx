import Link from "next/link";
import { products } from "@/app/lib/placeholder-data";
import ProductCard from "@/app/components/ProductCard";
import FilterBar from "./FilterBar";

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; sort?: string; q?: string }>;
}) {
  const { category, sort, q } = await searchParams;

  // Filter
  let filtered = products;

  if (category) {
    filtered = filtered.filter((p) => p.category === category);
  }

  if (q) {
    const query = q.toLowerCase();
    filtered = filtered.filter(
      (p) =>
        p.name.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
    );
  }

  // Sort
  if (sort === "price-asc") {
    filtered = [...filtered].sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered = [...filtered].sort((a, b) => b.price - a.price);
  }

  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          <Link href="/" className="font-bold text-xl">
            Handcrafted Haven
          </Link>
          <div className="space-x-4">
            <Link href="#" className="text-gray-700 hover:text-green-600">
              Login
            </Link>
            <Link href="#" className="text-gray-700 hover:text-green-600">
              Sign Up
            </Link>
          </div>
        </div>
        <nav className="flex justify-center font-body space-x-8 bg-gray-100 py-2">
          <Link href="/" className="hover:text-green-600">
            Home
          </Link>
          <Link href="/shop" className="text-green-600 font-semibold">
            Shop
          </Link>
          <Link href="/categories" className="hover:text-green-600">
            Categories
          </Link>
          <Link href="/sell" className="hover:text-green-600">
            Sell
          </Link>
        </nav>
      </header>

      {/* Shop content */}
      <section className="max-w-6xl mx-auto w-full px-6 py-10">
        <h1 className="font-heading text-3xl font-bold mb-6">Shop</h1>

        <FilterBar />

        {filtered.length === 0 ? (
          <p className="text-gray-500">No products found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filtered.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="flex justify-center space-x-6">
          <Link href="#" className="hover:text-green-400">
            About
          </Link>
          <Link href="#" className="hover:text-green-400">
            Contact
          </Link>
          <Link href="#" className="hover:text-green-400">
            Sell
          </Link>
          <Link href="#" className="hover:text-green-400">
            FAQ
          </Link>
        </div>
      </footer>
    </main>
  );
}
