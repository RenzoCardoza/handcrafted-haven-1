"use client";

import { useState } from "react";
import { addToCart } from "@/app/lib/cart";

type Props = {
  productId: string;
  className?: string;
  quantity?: number;
};

export default function AddToCartButton({
  productId,
  quantity = 1,
  className = "",
}: Props) {
  const [loading, setLoading] = useState(false);
  const [added, setAdded] = useState(false);

  async function handleAddToCart(e?: React.MouseEvent) {
    e?.preventDefault();

    setLoading(true);

    await new Promise((r) => setTimeout(r, 250));

    addToCart(productId, quantity);

    setLoading(false);
    setAdded(true);

    setTimeout(() => setAdded(false), 1200);
  }

  return (
    <button
      onClick={handleAddToCart}
      className={`
        mt-2 w-full text-sm font-medium
        bg-indigo-600 text-white py-2 rounded-lg
        hover:bg-indigo-700 transition
        ${className}
      `}
    >
      {loading ? "Adding..." : added ? "Added ✓" : "Add to Cart"}
    </button>
  );
}