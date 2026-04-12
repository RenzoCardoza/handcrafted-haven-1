"use client";

import ProductCard from "./ProductCard";
import { Product } from "../types/Product";

interface ProductGridProps {
  products: Product[];
  title?: string;
}

export default function ProductGrid({
  products,
  title,
}: ProductGridProps) {
  if (!products || products.length === 0) {
    return (
      <section className="w-full text-center py-12">
        {title && (
          <h2 className="text-2xl font-heading mb-4">
            {title}
          </h2>
        )}

        <h3 className="text-lg text-gray-700">
          No products found
        </h3>
        <p className="text-gray-500 mt-2">
          Try adjusting your filters or check back later.
        </p>
      </section>
    );
  }

  return (
    <section className="w-full">
      {title && (
        <h2 className="text-2xl font-heading mb-6">
          {title}
        </h2>
      )}

      <div className="
          grid 
          gap-6 
          grid-cols-2 
          sm:grid-cols-2 
          md:grid-cols-3 
          lg:grid-cols-4 
          xl:grid-cols-4
        ">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </section>
  );
}