import { Product } from "@/app/types/Product";
import MyProductCard from "./MyProductCard";
import Link from "next/link";

interface MyProductsGridProps {
  products: Product[];
}

export default function MyProductsGrid({
  products,
}: MyProductsGridProps) {
  if (!products || products.length === 0) {
    return (
      <section className="w-full">
        <div className="rounded-2xl border border-dashed border-[#D8CFC2] bg-[#FCFAF6] px-6 py-14 text-center">
          <h3 className="text-xl font-medium text-[#2F241D]">
            No inventory yet
          </h3>

          <p className="mt-2 text-[#6B5B4D]">
            Add your first product to start managing your inventory here.
          </p>

          <Link
            href="/products/new"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#7C5A3C] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#68492F]"
          >
            Add Your First Product
          </Link>
        </div>
      </section>
    );
  }

  return (
    <section className="w-full">
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
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