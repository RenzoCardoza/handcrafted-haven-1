import { Product } from "@/app/types/Product";
import MyProductCard from "./MyProductCard";

interface MyProductsGridProps {
  products: Product[];
}

export default function MyProductsGrid({
  products,
}: MyProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <section className="w-full text-center py-12">
        <h3 className="text-lg text-gray-700">
          No inventory yet
        </h3>
        <p className="text-gray-500 mt-2">
          Add a product to start managing inventory here.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="grid gap-6 grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4">
        {products.map((product) => (
          <MyProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}