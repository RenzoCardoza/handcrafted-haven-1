"use client";

import { useEffect, useState } from "react";
import { getCart, CartItem } from "@/app/lib/cart";

export default function CartPage() {
  /* lazy starter */
  const [cart, setCart] = useState<CartItem[]>(() => {
    if (typeof window === "undefined") return [];
    return getCart();
  });

  /* keep cart updated across all tabs */
  useEffect(() => {
    function syncCart() {
      setCart(getCart());
    }

    window.addEventListener("storage", syncCart);
    return () => window.removeEventListener("storage", syncCart);
  }, []);

  
  const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <main className="max-w-4xl mx-auto px-6 py-10">
      <h1 className="text-2xl font-bold mb-6">Your Cart</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty.</p>
      ) : (
        <>
          {/* cart items */}
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.productId}
                className="border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-medium">
                    Product ID: {item.productId}
                  </p>
                  <p className="text-sm text-gray-500">
                    Quantity: {item.quantity}
                  </p>
                </div>

                {/* remove button */}
                <button
                  onClick={() => {
                    const updated = cart.filter(
                      (i) => i.productId !== item.productId
                    );
                    localStorage.setItem("cart", JSON.stringify(updated));
                    setCart(updated);
                  }}
                  className="text-sm text-red-500 hover:underline"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          {/* summary */}
          <div className="mt-8 border-t pt-6 flex justify-between items-center">
            <p className="text-lg font-semibold">
              Total Items: {totalItems}
            </p>

            <button
              onClick={() => alert("Login required before checkout")}
              className="bg-black text-white px-6 py-2 rounded-lg hover:bg-gray-800 transition"
            >
              Checkout
            </button>
          </div>
        </>
      )}
    </main>
  );
}