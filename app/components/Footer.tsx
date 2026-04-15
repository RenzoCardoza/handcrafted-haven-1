import Link from "next/link";

export default function Footer() {
  return (
    <footer className="bg-[#1F2937] text-white">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-x-8 gap-y-3 px-6 py-8 text-sm sm:text-base">
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="transition hover:text-[#D6BFA7]"
        >
          About
        </Link>
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="transition hover:text-[#D6BFA7]"
        >
          Contact
        </Link>
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="transition hover:text-[#D6BFA7]"
        >
          Sell
        </Link>
        <Link
          href="https://github.com/fernandoscjunior/handcrafted-haven"
          className="transition hover:text-[#D6BFA7]"
        >
          FAQ
        </Link>
      </div>
    </footer>
  );
}
