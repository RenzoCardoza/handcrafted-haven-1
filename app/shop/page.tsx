import { products } from "@/app/lib/placeholder-data";
import ProductCard from "@/app/components/ProductCard";
import FilterBar from "./FilterBar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

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
      <Header />

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

      <Footer />
    </main>
  );
}
