import Link from "next/link";
import Image from "next/image";

interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: string;
  image: string;
  seller: { id: string; name: string };
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Link
      href={`/products/${product.id}`}
      className="border rounded shadow hover:shadow-md transition-shadow block"
    >
      <div className="relative w-full aspect-square bg-amber-50 flex items-center justify-center rounded-t">
        <Image
          src={product.image}
          alt={product.name}
          width={150}
          height={150}
          className="object-contain"
        />
      </div>
      <div className="p-4">
        <span className="text-xs text-gray-400 uppercase">{product.category}</span>
        <h3 className="text-lg font-bold mt-1">{product.name}</h3>
        <p className="text-green-600 font-semibold">${product.price}</p>
        <p className="text-sm text-gray-500 mt-1">by {product.seller.name}</p>
      </div>
    </Link>
  );
}
