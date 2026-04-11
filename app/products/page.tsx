import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductCard from "@/app/components/ProductCard";
import FilterBar from "../components/FilterBar";
import { sql } from "@/app/lib/db";

type SearchParams = {
  material?: string;
  artisan?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

async function getProducts(filters: SearchParams) {
  const { material, artisan, minPrice, maxPrice, sort } = filters;

  const rows = await sql`
  SELECT 
    p.id,
    p.name,
    p.description,
    p.price,
    p.image_url,
    p.material,
    a.id AS artisan_id,
    a.name AS artisan_name
  FROM products p
  LEFT JOIN artisans a ON p.artisan_id = a.id
`;

// convert to normal array
let filtered = [...rows];

  // Filters
  if (material) {
    filtered = filtered.filter(
      (p) =>
        p.material &&
        p.material.toLowerCase() === material.toLowerCase()
    );
  }

  if (artisan) {
    filtered = filtered.filter(
      (p) =>
        p.artisan_name &&
        p.artisan_name.toLowerCase().includes(artisan.toLowerCase())
    );
  }

  if (minPrice) {
    filtered = filtered.filter((p) => p.price >= Number(minPrice));
  }

  if (maxPrice) {
    filtered = filtered.filter((p) => p.price <= Number(maxPrice));
  }

  // Sort
  if (sort === "price-asc") {
    filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price-desc") {
    filtered.sort((a, b) => b.price - a.price);
  } else {
    filtered.sort((a, b) => Number(b.id) - Number(a.id));
  }

  return filtered.map((row) => ({
    id: String(row.id),
    name: row.name ?? "Unnamed product",
    description: row.description ?? "",
    price: Number(row.price ?? 0),
    image_url: row.image_url ?? "",

    seller: {
      id: String(row.artisan_id ?? "unknown"),
      name: row.artisan_name ?? "Unknown seller",
    },

    category: row.material
      ? {
          id: row.material,
          name: row.material,
        }
      : undefined,

    created_at: new Date().toISOString(),
  }));
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  // unwrap everything
  const filters = await searchParams;

  const products = await getProducts(filters);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="max-w-7xl mx-auto w-full px-4 py-10 flex gap-6">
        
        {/* Larger view */}
        <aside className="w-56 hidden md:block">
          <FilterBar />
        </aside>

        {/* Products */}
        <div className="flex-1">

          {/* MOBILE FILTER BUTTON */}
          <div className="md:hidden mb-4">
            <FilterBar mobile />
          </div>

          <h1 className="text-2xl font-bold mb-4">Products</h1>

          {products.length === 0 ? (
            <p className="text-gray-500">No products found.</p>
          ) : (
            <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </main>
  );
}