import CartDrawer from "./CartDrawer";

interface HeaderProps {
  showSearch?: boolean;
  showAuth?: boolean;
}

export default function Header({
  showSearch = true,
  showAuth = true,
}: HeaderProps) {
  return (
    <header className="border-b bg-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4 gap-4">

        {/* logo */}
        <div className="font-bold text-xl whitespace-nowrap">
          Handcrafted Haven
        </div>

        {/* search */}
        {showSearch && (
          <div className="flex-1 flex justify-center">
            <input
              type="text"
              placeholder="Search products..."
              className="
                w-full max-w-md
                border rounded-lg
                px-4 py-2
                text-sm
                focus:outline-none
                focus:ring-2 focus:ring-indigo-500
              "
            />
          </div>
        )}

        <div className="flex items-center gap-4">
          <CartDrawer />

          {showAuth && (
            <a
              href="/login"
              className="
                text-sm font-medium
                text-gray-700
                hover:text-indigo-600
                transition
              "
            >
              Login
            </a>
          )}
        </div>
      </div>
    </header>
  );
}
