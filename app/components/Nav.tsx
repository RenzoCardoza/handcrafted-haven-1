// components/Nav.tsx
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="flex justify-center font-body space-x-8 bg-gray-100 py-2">
      <Link href="/" className="hover:text-green-600">Home</Link>
      <Link href="/shop" className="hover:text-green-600">Shop</Link>
      <Link href="/categories" className="hover:text-green-600">Categories</Link>
      <Link href="/sell" className="hover:text-green-600">Sell</Link>
    </nav>
  );
}
