import { redirect } from "next/navigation";
import Link from "next/link";
import { getServerSession } from "next-auth";
import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
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
    redirect("/login?role=seller&callbackUrl=/artisans/dashboard");
  }

  const userRows = await sql`
    SELECT role
    FROM users
    WHERE email = ${session.user.email}
    LIMIT 1
  `;

  const user = userRows[0];

  if (!user) {
    redirect("/register?role=seller");
  }

  if (user.role !== "seller") {
    redirect("/sell");
  }

  const artisan = await getLoggedInArtisan(session.user.email);

  if (!artisan) {
    return (
      <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
        <Header />
        <Nav />

        <section className="flex-1 px-4 py-12 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl rounded-3xl border border-[#E5DFD3] bg-white/70 p-8 shadow-sm">
            <h1 className="text-3xl font-semibold text-[#2F241D]">
              Seller Setup Incomplete
            </h1>

            <p className="mt-3 text-[#6B5B4D]">
              This account is marked as a seller, but the artisan profile is not ready yet.
            </p>

            <Link
              href="/sell"
              className="mt-6 inline-flex items-center rounded-full bg-[#7C5A3C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#68492F]"
            >
              Complete Seller Setup
            </Link>
          </div>
        </section>

        <Footer />
      </main>
    );
  }

  const products = await getArtisanProducts(artisan.id);

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header />
      <Nav />

      <section className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl space-y-10">
          <ArtisanBanner artisan={artisan} />

          <div className="rounded-3xl border border-[#E5DFD3] bg-white/60 p-6 shadow-sm">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8A7768]">
                  Dashboard
                </p>
                <h1 className="mt-2 text-3xl font-semibold text-[#2F241D]">
                  My Products
                </h1>
                <p className="mt-2 text-[#6B5B4D]">
                  Manage the products in your inventory.
                </p>
              </div>

              <Link
                href="/products/new"
                className="inline-flex items-center justify-center rounded-full bg-[#7C5A3C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#68492F] whitespace-nowrap"
              >
                Add Product
              </Link>
            </div>

            <div className="mt-8">
              <MyProductsGrid products={products} />
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}