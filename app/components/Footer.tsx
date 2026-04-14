import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="flex justify-center space-x-6">
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="hover:text-green-400"
        >
          About
        </Link>
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="hover:text-green-400"
        >
          Contact
        </Link>
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="hover:text-green-400"
        >
          Sell
        </Link>
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="hover:text-green-400"
        >
          FAQ
        </Link>
      </div>
    </footer>
  );
}
