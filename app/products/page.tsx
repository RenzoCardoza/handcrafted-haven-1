import Header from "@/app/components/Header";
import Nav from "../components/Nav";
import Footer from "@/app/components/Footer";
import ProductGrid from "@/app/components/ProductGrid";
import FilterBar from "../components/FilterBar";
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

      a.id AS artisan_id,
      a.name AS artisan_name,

      COALESCE(AVG(r.rating), 0) AS avg_rating,
      COUNT(r.id) AS review_count

    FROM products p
    LEFT JOIN artisans a ON p.artisan_id = a.id
    LEFT JOIN reviews r ON r.product_id = p.id

    WHERE 1=1
  `;

  // search
  if (q && q.trim() !== "") {
    query = sql`${query} AND (
      p.name ILIKE ${"%" + q.trim() + "%"}
      OR p.description ILIKE ${"%" + q.trim() + "%"}
      OR a.name ILIKE ${"%" + q.trim() + "%"}
      OR p.material ILIKE ${"%" + q.trim() + "%"}
    )`;
  }

  // category
  if (material && material.trim() !== "") {
    query = sql`${query} AND LOWER(p.material) = LOWER(${material})`;
  }

  // artisan
  if (artisan && artisan.trim() !== "") {
    query = sql`${query} AND a.name ILIKE ${"%" + artisan + "%"}`;
  }

  // price
  if (minPrice && !isNaN(Number(minPrice))) {
    query = sql`${query} AND p.price >= ${Number(minPrice)}`;
  }

  if (maxPrice && !isNaN(Number(maxPrice))) {
    query = sql`${query} AND p.price <= ${Number(maxPrice)}`;
  }

  query = sql`${query} GROUP BY p.id, a.id`;

  // sort
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
    <main className="flex flex-col min-h-screen bg-amber-50">
      <Header />
      <Nav />
      <section className="max-w-7xl mx-auto w-full px-4 py-10">
        <div className="flex gap-6">
          {/* large view filter (desktop) */}
          <aside className="w-64 hidden md:block">
            <FilterBar />
          </aside>

          {/* mobile view filter */}
          <div className="flex-1">
            <ClientFilters />

            <h1 className="text-2xl font-bold mb-4">Products</h1>

            <ProductGrid products={products} />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}