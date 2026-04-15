import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ArtisanBanner from "@/app/components/ArtisanBanner";
import MyProductsGrid from "@/app/components/MyProductsGrid";
import { sql } from "@/app/lib/db";
import { authOptions } from "@/app/lib/auth";
import { Artisan } from "@/app/types/Artisan";
import { Product } from "@/app/types/Product";

export const dynamic = "force-dynamic";

async function getLoggedInArtisan(email: string): Promise<Artisan | null> {
  const rows = await sql`
    SELECT id, name, bio, location, image_url
    FROM artisans
    WHERE email = ${email}
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

async function getArtisanProducts(artisanId: string): Promise<Product[]> {
  const rows = await sql`
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

    WHERE p.artisan_id = ${artisanId}

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
    quantity: Number(row.quantity ?? 0),

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

export default async function ArtisanDashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/api/auth/signin");
  }

  let artisan = await getLoggedInArtisan(session.user.email);

  // testing block below
  if (!artisan && process.env.NODE_ENV === "development") {
    const rows = await sql`
      SELECT id, name, bio, location, image_url
      FROM artisans
      ORDER BY name ASC
      LIMIT 1
    `;

    const row = rows[0];

    if (row) {
      artisan = {
        id: String(row.id),
        name: row.name ?? "Unknown artisan",
        bio: row.bio ?? "",
        location: row.location ?? "",
        image_url: row.image_url ?? "",
      };
    }
  }
  // testing block above

  if (!artisan) {
    return (
      <main className="flex flex-col min-h-screen">
        <Header />

        <section className="max-w-4xl mx-auto w-full px-4 py-10">
          <h1 className="text-3xl font-bold mb-4">My Products</h1>
          <p className="text-gray-600 mb-6">
            No artisan profile is linked to this account yet.
          </p>

          <Link
            href="/products"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Back to Products
          </Link>
        </section>

        <Footer />
      </main>
    );
  }

  const products = await getArtisanProducts(artisan.id);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="max-w-7xl mx-auto w-full px-4 py-10">
        <ArtisanBanner artisan={artisan} />

        <div className="flex items-center justify-between mb-8 gap-4">
          <div>
            <h1 className="text-3xl font-bold">My Products</h1>
            <p className="text-gray-600 mt-1">
              Manage the products in my inventory.
            </p>
          </div>

          <Link
            href="/products/new"
            className="inline-block bg-indigo-600 text-white px-5 py-2 rounded-lg hover:bg-indigo-700 transition whitespace-nowrap"
          >
            Add Product
          </Link>
        </div>

        <MyProductsGrid products={products} />
      </section>

      <Footer />
    </main>
  );
}