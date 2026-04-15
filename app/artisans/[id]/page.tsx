import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ProductGrid from "@/app/components/ProductGrid";
import { sql } from "@/app/lib/db";
import { Artisan } from "@/app/types/Artisan";
import ArtisanBanner from "@/app/components/ArtisanBanner";

export const dynamic = "force-dynamic";

async function getArtisan(id: string): Promise<Artisan | null> {
  const rows = await sql`
    SELECT id, name, bio, location, image_url
    FROM artisans
    WHERE id = ${id}
    LIMIT 1
  `;

  const row = rows[0];
  if (!row) return null;

  return {
    id: String(row.id),
    name: row.name ?? "Unknown artisan",
    bio: row.bio ?? "",
    location: row.location ?? "",
    image_url: row.image_url ?? "",
  };
}

async function getArtisanProducts(id: string) {
  const rows = await sql`
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

    WHERE p.artisan_id = ${id}

    GROUP BY p.id, a.id
    ORDER BY p.created_at DESC
  `;

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
      id: String(row.artisan_id),
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

export default async function ArtisanPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const artisan = await getArtisan(id);
  if (!artisan) notFound();

  const products = await getArtisanProducts(id);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />
      <Nav />

      <section className="max-w-7xl mx-auto w-full px-4 py-10">

        {/* Artisan Info */}
        <ArtisanBanner artisan={artisan} />

        {/* Products */}
        <ProductGrid
          products={products}
          title="Products by this artisan"
        />
      </section>

      <Footer />
    </main>
  );
}