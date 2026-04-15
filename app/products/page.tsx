import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ProductGrid from "@/app/components/ProductGrid";
import FilterBar from "@/app/components/FilterBar";
import ClientFilters from "./ClientFilters";
import { sql } from "@/app/lib/db";

export const dynamic = "force-dynamic";

type SearchParams = {
  q?: string;
  material?: string;
  artisan?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: string;
};

async function getProducts(filters: SearchParams) {
  const { q, material, artisan, minPrice, maxPrice, sort } = filters;

  let query = sql`
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.image_url,
      p.material,
      p.created_at,
      p.quantity,

      a.id AS artisan_id,
      a.name AS artisan_name,

      COALESCE(AVG(r.rating), 0) AS avg_rating,
      COUNT(r.id) AS review_count

    FROM products p
    LEFT JOIN artisans a ON p.artisan_id = a.id
    LEFT JOIN reviews r ON r.product_id = p.id

    WHERE 1=1
  `;

  if (q && q.trim() !== "") {
    query = sql`${query} AND (
      p.name ILIKE ${"%" + q.trim() + "%"}
      OR p.description ILIKE ${"%" + q.trim() + "%"}
      OR a.name ILIKE ${"%" + q.trim() + "%"}
      OR p.material ILIKE ${"%" + q.trim() + "%"}
    )`;
  }

  if (material && material.trim() !== "") {
    query = sql`${query} AND LOWER(p.material) = LOWER(${material})`;
  }

  if (artisan && artisan.trim() !== "") {
    query = sql`${query} AND a.name ILIKE ${"%" + artisan + "%"}`;
  }

  if (minPrice && !isNaN(Number(minPrice))) {
    query = sql`${query} AND p.price >= ${Number(minPrice)}`;
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    query = sql`${query} AND p.price <= ${Number(maxPrice)}`;
  }

  query = sql`${query} GROUP BY p.id, a.id`;

  if (sort === "price-asc") {
    query = sql`${query} ORDER BY p.price ASC`;
  } else if (sort === "price-desc") {
    query = sql`${query} ORDER BY p.price DESC`;
  } else {
    query = sql`${query} ORDER BY p.id DESC`;
  }

  const rows = await query;

  return rows.map((row) => ({
    id: String(row.id),
    name: row.name ?? "Unnamed product",
    description: row.description ?? "",
    price: Number(row.price ?? 0),
    image_url: row.image_url ?? "",
    created_at: row.created_at
      ? new Date(row.created_at).toISOString()
      : new Date().toISOString(),
    quantity: Number(row.quantity ?? 0),

    artisan: {
      id: String(row.artisan_id ?? "unknown"),
      name: row.artisan_name ?? "Unknown seller",
    },

    category: row.material
      ? {
          id: row.material,
          name: row.material,
        }
      : undefined,

    avg_rating: Number(row.avg_rating ?? 0),
    review_count: Number(row.review_count ?? 0),
  }));
}

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const filters = await searchParams;
  const products = await getProducts(filters);

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header />
      <Nav />

      <section className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Mobile filters */}
          <div className="mb-6 md:hidden">
            <ClientFilters />
          </div>

          <div className="grid gap-8 md:grid-cols-[260px_minmax(0,1fr)] lg:gap-10">
            {/* Desktop filters */}
            <aside className="hidden md:block">
              <div className="sticky top-28 rounded-3xl border border-[#E5DFD3] bg-white/70 p-5 shadow-sm">
                <FilterBar />
              </div>
            </aside>

            {/* Main content */}
            <div>
              <div className="mb-6 rounded-3xl border border-[#E5DFD3] bg-white/60 p-6 shadow-sm">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
                  <div>
                    <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8A7768]">
                      Marketplace
                    </p>
                    <h1 className="mt-2 text-3xl font-semibold text-[#2F241D] sm:text-4xl">
                      Products
                    </h1>
                    <p className="mt-2 text-[#6B5B4D]">
                      Discover handmade pieces crafted by artisans around the world.
                    </p>
                  </div>

                  <div className="text-sm text-[#8A7768]">
                    {products.length} {products.length === 1 ? "item" : "items"}
                  </div>
                </div>
              </div>

              {products.length === 0 ? (
                <div className="rounded-3xl border border-dashed border-[#D8CFC2] bg-white/50 px-6 py-16 text-center shadow-sm">
                  <h2 className="text-2xl font-semibold text-[#2F241D]">
                    No products found
                  </h2>
                  <p className="mt-3 text-[#6B5B4D]">
                    Try adjusting your filters or search terms to find more handmade items.
                  </p>
                </div>
              ) : (
                <ProductGrid products={products} />
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}