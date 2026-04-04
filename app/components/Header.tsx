import Link from "next/link";
import AuthButton from "./AuthButton";

export default function Header() {
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        <Link href="/" className="font-bold text-xl">
          Handcrafted Haven
        </Link>
        <AuthButton />
      </div>
      <nav className="flex justify-center font-body space-x-8 bg-gray-100 py-2">
        <Link href="/" className="hover:text-green-600">
          Home
        </Link>
        <Link href="/shop" className="hover:text-green-600">
          Shop
        </Link>
        <Link href="/categories" className="hover:text-green-600">
          Categories
        </Link>
        <Link href="/sell" className="hover:text-green-600">
          Sell
        </Link>
      </nav>
    </header>
  );
}
