import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductDetails from "@/app/components/ProductDetails";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { sql } from "@/app/lib/db";

/* Make type safer */

type ProductSafe = {
  id: string;
  name: string;
  description: string;
  price: number;
  image_url: string;
  created_at?: string;

  seller?: {
    id: string;
    name: string;
  };

  category?: {
    id: string;
    name: string;
  };
};

/* Helper Funct*/

// function formatDate(date?: string) {
//   if (!date) return "N/A";
//   return new Date(date).toLocaleDateString("en-US", {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// }

/* Get Data */

async function getProduct(id: string): Promise<ProductSafe | null> {
  try {
    const rows = await sql`
      SELECT 
        p.id,
        p.name,
        p.description,
        p.price,
        p.image_url,
        p.created_at,

        a.id AS artisan_id,
        a.name AS seller_name

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
      created_at: row.created_at ?? undefined,

      seller: row.artisan_id
        ? {
            id: String(row.artisan_id),
            name: row.seller_name ?? "Unknown seller",
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
