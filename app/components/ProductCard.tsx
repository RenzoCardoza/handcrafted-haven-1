interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export default function ProductCard({ product }: { product: Product }) {
  return (
    <div className="border p-4 rounded shadow">
      <h3 className="text-lg font-bold">{product.name}</h3>
      <p>{product.description}</p>
      <p className="text-green-600 font-semibold">${product.price}</p>
    </div>
  );
}
