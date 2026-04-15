"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Nav() {
  const pathname = usePathname();

  const links = [
    { href: "/", label: "Home" },
    { href: "/artisans", label: "Artisans"},
    { href: "/products", label: "Shop" },
    { href: "/sell", label: "Sell" },
  ];

  return (
    <nav className="flex justify-center bg-[#F5F1E8]/80 backdrop-blur border-b border-[#E5DFD3]">
      <div className="flex items-center gap-10 px-6 py-4 font-medium">
        {links.map((link) => {
          const isActive =
            link.href === "/"
              ? pathname === "/"
              : pathname.startsWith(link.href);

          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group relative text-sm md:text-base tracking-wide transition ${
                isActive
                  ? "text-indigo-600"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {link.label}

              <span
                className={`absolute left-0 -bottom-1 h-[2px] w-full transition-all duration-300 ${
                  isActive
                    ? "bg-indigo-600"
                    : "bg-transparent group-hover:bg-gray-300"
                }`}
              />
            </Link>
          );
        })}
      </div>
    </nav>
  );
}