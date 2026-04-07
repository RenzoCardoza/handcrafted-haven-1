import Image from "next/image";
import { notFound } from "next/navigation";

import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ReviewList, { type Review } from "./ReviewList";
import ReviewForm from "./ReviewForm";
import { sql } from "@/app/lib/db";

/* type: it's gonna be moved*/

interface Product {
  id: string;
  seller_id: string;
  name: string;
  description: string;
  price: number;
  category_id: string;
  review_count: number;
  image_url: string;
  created_at: string;
}

type Params = Promise<{ id: string }>;

/* data */

async function getProduct(id: string): Promise<Product> {
  const [product] = await sql<Product[]>`
    SELECT * FROM products WHERE id = ${id}
  `;

  if (!product) notFound();

  return product;
}

async function getReviews(id: string): Promise<Review[]> {
  const reviews = await sql<Review[]>`
    SELECT *
    FROM reviews
    WHERE product_id = ${id};
  `;

  return reviews;
}

/* page  */

export default async function ProductPage({ params }: { params: Params }) {
  const { id } = await params;

  console.log("Product ID:", id);

  const [product, productReviews] = await Promise.all([
    getProduct(id),
    getReviews(id),
  ]);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="max-w-4xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">

          {/* Image */}
          <div className="relative w-full md:w-1/2 aspect-square bg-amber-50 rounded flex items-center justify-center">
            {product.image_url && (
              <Image
                src={product.image_url}
                alt={product.name}
                width={300}
                height={300}
                className="object-contain"
              />
            )}
          </div>

          {/* Info */}
          <div className="flex-1">
            <h1 className="font-heading text-3xl font-bold mb-2">
              {product.name}
            </h1>

            <p className="text-green-600 text-2xl font-semibold mb-4">
              ${product.price.toFixed(2)}
            </p>

            <p className="text-gray-700 mb-6">
              {product.description}
            </p>

            <p className="text-sm text-gray-500">
              Seller ID: {product.seller_id} | Category ID: {product.category_id}
            </p>

            <p className="text-sm text-gray-500">
              Added on:{" "}
              {new Date(product.created_at).toLocaleDateString()}
            </p>
          </div>
        </div>

        <hr className="my-10" />

        {/* Reviews */}
        <div>
          <h2 className="font-heading text-2xl font-bold mb-6">
            Reviews
          </h2>

          <ReviewList reviews={productReviews} />

          <ReviewForm productId={product.id} />
        </div>
      </section>

      <Footer />
    </main>
  );
}