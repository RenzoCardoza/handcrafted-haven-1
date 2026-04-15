import { notFound } from "next/navigation";
import Header from "@/app/components/Header";
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
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="max-w-4xl mx-auto w-full px-6 py-10">
        <ProductDetails product={product} />

        <hr className="my-10" />

        <div>
          <h2 className="text-2xl font-bold mb-6">Reviews</h2>

          <ReviewList reviews={reviews} />

          <ReviewForm productId={product.id} />
        </div>
      </section>

      <Footer />
    </main>
  );
}