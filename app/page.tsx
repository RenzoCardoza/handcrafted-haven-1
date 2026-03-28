import Image from "next/image";

export default function Home() {
  return (
    <main className="flex flex-col min-h-screen">
      {/* Header */}
      <header className="border-b bg-white">
        <div className="flex items-center justify-between px-6 py-4">
          {/* Logo */}
          <div className="font-bold text-xl">Handcrafted Haven</div>

          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 w-1/3"
          />

          {/* Auth Links */}
          <div className="space-x-4">
            <a href="#" className="text-gray-700 hover:text-green-600">Login</a>
            <a href="#" className="text-gray-700 hover:text-green-600">Sign Up</a>
          </div>
        </div>

        {/* Secondary Nav */}
        <nav className="flex justify-center font-body space-x-8 bg-gray-100 py-2">
          <a href="#" className="hover:text-green-600">Home</a>
          <a href="#" className="hover:text-green-600">Shop</a>
          <a href="#" className="hover:text-green-600">Categories</a>
          <a href="#" className="hover:text-green-600">Sell</a>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center bg-amber-50 py-16">
        <div className="relative w-full max-w-6xl aspect-[3/1] mb-8">
          <Image
            src="/hero.png"
            alt="Handmade crafts hero"
            fill
            className="object-cover rounded"
            priority
          />
        </div>
        <h1 className="font-heading text-4xl mb-4">Discover Unique Handmade Creations</h1>
        <p className="font-body text-lg mb-6">Support artisans. Find something special.</p>
        <button className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700">
          Browse Collection
        </button>
      </section>
    

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-6 mt-auto">
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-green-400">About</a>
          <a href="#" className="hover:text-green-400">Contact</a>
          <a href="#" className="hover:text-green-400">Sell</a>
          <a href="#" className="hover:text-green-400">FAQ</a>
        </div>
        <div className="flex justify-center space-x-6">
          <a href="#" aria-label="Facebook">
            <svg className="w-6 h-6 fill-white hover:fill-green-400" viewBox="0 0 24 24">
              <path d="M22 12a10 10 0 1 0-11.5 9.9v-7h-2v-3h2v-2.3c0-2 1.2-3.1 3-3.1.9 0 1.8.2 1.8.2v2h-1c-1 0-1.3.6-1.3 1.2V12h2.3l-.4 3h-1.9v7A10 10 0 0 0 22 12z"/>
            </svg>
          </a>
          <a href="#" aria-label="Instagram">
            <svg className="w-6 h-6 fill-white hover:fill-green-400" viewBox="0 0 24 24">
              <path d="M7 2C4.2 2 2 4.2 2 7v10c0 2.8 2.2 5 5 5h10c2.8 0 5-2.2 5-5V7c0-2.8-2.2-5-5-5H7zm10 2c1.7 0 3 1.3 3 3v10c0 1.7-1.3 3-3 3H7c-1.7 0-3-1.3-3-3V7c0-1.7 1.3-3 3-3h10zm-5 3a5 5 0 1 0 0 10 5 5 0 0 0 0-10zm0 2a3 3 0 1 1 0 6 3 3 0 0 1 0-6zm4.5-2a1.5 1.5 0 1 0 0 3 1.5 1.5 0 0 0 0-3z"/>
            </svg>
          </a>
          <a href="#" aria-label="Twitter">
            <svg className="w-6 h-6 fill-white hover:fill-green-400" viewBox="0 0 24 24">
              <path d="M22.46 6c-.77.35-1.6.58-2.46.69a4.3 4.3 0 0 0 1.88-2.37 8.6 8.6 0 0 1-2.72 1.04 4.3 4.3 0 0 0-7.3 3.92A12.2 12.2 0 0 1 3.1 4.9a4.3 4.3 0 0 0 1.33 5.74 4.3 4.3 0 0 1-1.95-.54v.05a4.3 4.3 0 0 0 3.45 4.2 4.3 4.3 0 0 1-1.94.07 4.3 4.3 0 0 0 4.01 2.98A8.6 8.6 0 0 1 2 19.54a12.2 12.2 0 0 0 6.6 1.94c7.9 0 12.2-6.55 12.2-12.2v-.56A8.6 8.6 0 0 0 22.46 6z"/>
            </svg>
          </a>
        </div>
      </footer>

    </main>
  );
}
