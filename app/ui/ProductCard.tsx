import Image from "next/image";

interface Product {
  id: number;
  seller_id: number;
  name: string;
  description: string;
  price: number;
  category_id: number;
  review_count: number;
  image_url: string;
  created_at: string;
}

export default function ProductCard({ product }: { product: Product }) {
  function handleAddToCart() {
    // For now just log, later we will connect to cart system
    console.log(`Added product ${product.id} to cart`);
  }

  return (
    <div className="flex flex-col border rounded-lg shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden">
      {/* Product image */}
      {product.image_url && (
        <Image
          src={product.image_url}
          alt={product.name}
          width={400}
          height={300}
          className="w-full h-48 object-cover"
        />
      )}

      {/* Product content */}
      <div className="flex flex-col flex-1 p-4 space-y-2">
        <h3 className="text-lg font-semibold text-gray-900">{product.name}</h3>
        <p className="text-sm text-gray-600 line-clamp-2">{product.description}</p>
        <p className="text-green-600 font-bold">${product.price.toFixed(2)}</p>

        {/* Meta info */}
        <div className="text-xs text-gray-500 space-y-1">
          <p>Category ID: {product.category_id}</p>
          <p>Seller ID: {product.seller_id}</p>
          <p>Reviews: {product.review_count}</p>
          <p>Added on: {new Date(product.created_at).toLocaleDateString()}</p>
        </div>

        {/* Action button */}
        <button
          onClick={handleAddToCart}
          className="mt-auto w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:outline-none transition-colors"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
