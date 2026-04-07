interface HeaderProps {
  showSearch?: boolean;
  showAuth?: boolean;
}

export default function Header({ showSearch = true, showAuth = true }: HeaderProps) {
  return (
    <header className="border-b bg-white">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="font-bold text-xl">Handcrafted Haven</div>

        {/* Search Bar */}
        {showSearch && (
          <input
            type="text"
            placeholder="Search..."
            className="border rounded px-3 py-1 w-1/3"
          />
        )}

        {/* Auth Link */}
        {showAuth && (
          <div>
            <a href="/login" className="text-gray-700 hover:text-green-600">
              Login
            </a>
          </div>
        )}
      </div>
    </header>
  );
}
