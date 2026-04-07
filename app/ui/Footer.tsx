// components/Footer.tsx
export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-auto">
      <div className="flex justify-center space-x-6 mb-4">
        <a href="/about" className="hover:text-green-400">About</a>
        <a href="/contact" className="hover:text-green-400">Contact</a>
        <a href="/sell" className="hover:text-green-400">Sell</a>
        <a href="/faq" className="hover:text-green-400">FAQ</a>
      </div>
      <div className="flex justify-center space-x-6">
        {/* Social icons */}
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
  );
}
