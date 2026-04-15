// components/Nav.tsx
"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/products", label: "Shop" },
    { href: "/sell", label: "Sell" },
  ];

  return (
    <nav className="flex justify-center font-body space-x-8 bg-gray-100 py-2">
      {links.map((link) => {
        const isActive = pathname === link.href;
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`hover:underline ${
              isActive ? "underline font-bold" : ""
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}