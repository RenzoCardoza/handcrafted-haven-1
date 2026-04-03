import Image from "next/image";
import { notFound } from "next/navigation";
import { products, reviews } from "@/app/lib/placeholder-data";
import ReviewList from "./ReviewList";
import ReviewForm from "./ReviewForm";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default async function ProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  // TODO: replace with a real database query
  const product = products.find((p) => p.id === id);

  if (!product) {
    notFound();
  }

  const productReviews = reviews.filter((r) => r.productId === id);

  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      {/* Product detail */}
      <section className="max-w-4xl mx-auto w-full px-6 py-10">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Product image */}
          <div className="relative w-full md:w-1/2 aspect-square bg-amber-50 rounded flex items-center justify-center">
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="object-contain"
            />
          </div>

          {/* Product info */}
          <div className="flex-1">
            <h1 className="font-heading text-3xl font-bold mb-2">
              {product.name}
            </h1>
            <p className="text-green-600 text-2xl font-semibold mb-4">
              ${product.price}
            </p>
            <p className="text-gray-700 mb-6">{product.description}</p>
            <p className="text-sm text-gray-500">
              Sold by{" "}
              <a
                href={`/sellers/${product.seller.id}`}
                className="text-green-600 hover:underline"
              >
                {product.seller.name}
              </a>
            </p>
          </div>
        </div>

        <hr className="my-10" />

        {/* Reviews section */}
        <div>
          <h2 className="font-heading text-2xl font-bold mb-6">Reviews</h2>
          <ReviewList reviews={productReviews} />
          <ReviewForm productId={product.id} />
        </div>
      </section>

      <Footer />
    </main>
  );
}
