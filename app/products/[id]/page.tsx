import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ProductDetails from "@/app/components/ProductDetails";
import ReviewList from "../../components/ReviewList";
import ReviewForm from "../../components/ReviewForm";
import { sql } from "@/app/lib/db";
import { Product } from "@/app/types/Product";

/* Fetch Products */

async function getProduct(id: string): Promise<Product | null> {
  try {
    const rows = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.created_at,
        p.material,
        p.quantity,

        a.id AS artisan_id,
        a.name AS artisan_name

      FROM products p
      LEFT JOIN artisans a ON p.artisan_id = a.id
      WHERE p.id = ${id}
      LIMIT 1
    `;

    const row = rows[0];
    if (!row) return null;

    return {
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
    };
  } catch (err) {
    console.error("getProduct error:", err);
    return null;
  }
}

async function getReviews(id: string) {
  try {
    const rows = await sql`
      SELECT 
        r.id,
        r.product_id,
        r.rating,
        r.comment,
        u.name AS reviewer_name
      FROM reviews r
      LEFT JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${id}
    `;

    return rows.map((row) => ({
      id: String(row.id),
      productId: String(row.product_id),
      rating: Number(row.rating ?? 0),
      comment: row.comment ?? "",
      reviewerName: row.reviewer_name ?? "Anonymous",
      date: "Recently",
    }));
  } catch (err) {
    console.error("getReviews error:", err);
    return [];
  }
}

/* Page */

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const [product, reviews] = await Promise.all([
    getProduct(id),
    getReviews(id),
  ]);

  if (!product) notFound();

  return (
    <main className="flex min-h-screen flex-col bg-[#F5F1E8]">
      <Header />
      <Nav />

      <section className="flex-1 px-4 py-10 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-6xl space-y-10">
          <div className="rounded-3xl border border-[#E5DFD3] bg-white/70 p-6 shadow-sm md:p-8">
            <ProductDetails product={product} />
          </div>

          <div className="rounded-3xl border border-[#E5DFD3] bg-white/60 p-6 shadow-sm md:p-8">
            <div className="mb-8">
              <p className="text-sm font-medium uppercase tracking-[0.18em] text-[#8A7768]">
                Customer Feedback
              </p>
              <h2 className="mt-2 text-3xl font-semibold text-[#2F241D]">
                Reviews
              </h2>
              <p className="mt-2 text-[#6B5B4D]">
                See what buyers are saying about this product.
              </p>
            </div>

            <div className="space-y-8">
              <ReviewList reviews={reviews} />
              <div className="border-t border-[#E5DFD3] pt-8">
                <ReviewForm productId={product.id} />
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}