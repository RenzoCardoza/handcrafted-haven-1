"use client";

import { useEffect, useState } from "react";
import { getCart } from "@/app/lib/cart";
import { getCartProducts } from "@/app/lib/getCartProducts";
import { ShoppingCart, Trash2 } from "lucide-react";

import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/app/components/sheet";

import { Button } from "@/app/components/button";
import Image from "next/image";

export default function CartDrawer() {
  const [cartProducts, setCartProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  /* fetching*/

  async function fetchCartSafe() {
    const cart = getCart();
    const products = await getCartProducts(cart);

    setCartProducts(products);
    setLoading(false);
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchCartSafe();
    }, 0);

    const handleUpdate = () => {
      fetchCartSafe();
    };

    window.addEventListener("cartUpdated", handleUpdate);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("cartUpdated", handleUpdate);
    };
  }, []);

  /* CART ACTIONS */

  function updateQuantity(productId: string, newQty: number) {
    let cart = getCart();

    if (newQty <= 0) {
      cart = cart.filter((i) => i.productId !== productId);
    } else {
      cart = cart.map((i) =>
        i.productId === productId
          ? { ...i, quantity: newQty }
          : i
      );
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    window.dispatchEvent(new Event("cartUpdated"));
  }

  function removeItem(productId: string) {
    const updated = getCart().filter(
      (i) => i.productId !== productId
    );

    localStorage.setItem("cart", JSON.stringify(updated));
    window.dispatchEvent(new Event("cartUpdated"));
  }



  const totalItems = cartProducts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const totalPrice = cartProducts.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    // <Sheet>
    //   <SheetTrigger asChild>
    //     <button className="relative group">
    //       <ShoppingCart className="w-6 h-6 text-gray-700 group-hover:text-indigo-600 transition" />

    //       {totalItems > 0 && (
    //         <span
    //           className="
    //             absolute -top-2 -right-2
    //             bg-indigo-600 text-white
    //             text-xs w-5 h-5 flex items-center justify-center
    //             rounded-full shadow
    //           "
    //         >
    //           {totalItems}
    //         </span>
    //       )}
    //     </button>
    //   </SheetTrigger>

    //   <SheetContent
    //     className="
    //       w-[360px] sm:w-[420px]
    //       bg-white
    //       shadow-2xl
    //       border-l
    //       flex flex-col
    //     "
    //   >
    //     <SheetHeader>
    //       <SheetTitle>Your Cart</SheetTitle>
    //       <p className="text-sm text-gray-500">
    //         Review your items before checkout
    //       </p>
    //     </SheetHeader>

    //     {/* cart items*/}
    //     <div className="mt-6 space-y-4 flex-1 overflow-y-auto pr-2">
    //       {loading ? (
    //         <p>Loading...</p>
    //       ) : cartProducts.length === 0 ? (
    //         <p className="text-gray-500">Cart is empty</p>
    //       ) : (
    //         cartProducts.map((item) => (
    //           <div
    //             key={item.id}
    //             className="
    //               flex gap-3 items-center
    //               border-b pb-3
    //               hover:bg-gray-50 p-2 rounded-lg transition
    //             "
    //           >
    //             {/* image */}
    //             <div className="relative w-16 h-16 bg-gray-100 rounded">
    //               {item.image_url && (
    //                 <Image
    //                   src={item.image_url}
    //                   alt={item.name}
    //                   fill
    //                   sizes="64px"
    //                   className="object-cover rounded"
    //                 />
    //               )}
    //             </div>

    //             {/* info */}
    //             <div className="flex-1">
    //               <p className="text-sm font-medium">
    //                 {item.name}
    //               </p>

    //               {/* quantity controls */}
    //               <div className="flex items-center gap-2 mt-1">
    //                 <button
    //                   onClick={() =>
    //                     updateQuantity(item.id, item.quantity - 1)
    //                   }
    //                   className="px-2 border rounded hover:bg-gray-200"
    //                 >
    //                   -
    //                 </button>

    //                 <span className="text-sm">
    //                   {item.quantity}
    //                 </span>

    //                 <button
    //                   onClick={() =>
    //                     updateQuantity(item.id, item.quantity + 1)
    //                   }
    //                   className="px-2 border rounded hover:bg-gray-200"
    //                 >
    //                   +
    //                 </button>
    //               </div>

    //               <p className="text-sm font-semibold mt-1">
    //                 ${(item.price * item.quantity).toFixed(2)}
    //               </p>
    //             </div>

    //             {/* delete */}
    //             <button
    //               onClick={() => removeItem(item.id)}
    //               className="
    //                 text-red-500 hover:text-red-700
    //                 transition p-1 rounded-md
    //               "
    //             >
    //               <Trash2 className="w-4 h-4" />
    //             </button>
    //           </div>
    //         ))
    //       )}
    //     </div>

    //     {/* footer */}
    //     <div className="mt-6 border-t pt-4">
    //       <p className="font-semibold mb-3">
    //         Total: ${totalPrice.toFixed(2)}
    //       </p>

    //       <Button className="w-full">
    //         Checkout
    //       </Button>
    //     </div>
    //   </SheetContent>
    // </Sheet>
    <Sheet>
      <SheetTrigger asChild>
        <button className="relative group p-1">
          <ShoppingCart className="w-6 h-6 text-gray-700 transition group-hover:text-indigo-600" />

          {totalItems > 0 && (
            <span
              className="
                absolute -top-1.5 -right-1.5
                flex h-5 w-5 items-center justify-center
                rounded-full bg-indigo-600 text-xs text-white shadow-sm
              "
            >
              {totalItems}
            </span>
          )}
        </button>
      </SheetTrigger>

      <SheetContent
        className="
          w-[360px] sm:w-[420px]
          bg-white
          border-l
          shadow-2xl
          flex flex-col
          px-0
        "
      >
        {/* Header */}
        <div className="border-b px-6 py-5">
          <SheetHeader className="space-y-1 text-left">
            <SheetTitle className="text-xl font-semibold">
              Your Cart
            </SheetTitle>
            <p className="text-sm text-gray-500">
              Review your items before checkout
            </p>
          </SheetHeader>
        </div>

        {/* Cart items */}
        <div className="flex-1 overflow-y-auto px-6 py-5">
          {loading ? (
            <p className="text-sm text-gray-500">Loading...</p>
          ) : cartProducts.length === 0 ? (
            <div className="flex h-full items-center justify-center">
              <p className="text-sm text-gray-500">Cart is empty</p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartProducts.map((item) => (
                <div
                  key={item.id}
                  className="
                    flex items-start gap-4
                    rounded-xl border border-gray-200
                    p-4
                    transition hover:bg-gray-50
                  "
                >
                  {/* image */}
                  <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-gray-100">
                    {item.image_url ? (
                      <Image
                        src={item.image_url}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    ) : (
                      <div className="flex h-full items-center justify-center text-xs text-gray-400">
                        No image
                      </div>
                    )}
                  </div>

                  {/* info */}
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium text-gray-900">
                      {item.name}
                    </p>

                    <div className="mt-3 flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-md border border-gray-300
                          text-sm text-gray-700
                          transition hover:bg-gray-100
                        "
                      >
                        -
                      </button>

                      <span className="min-w-[24px] text-center text-sm font-medium">
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="
                          flex h-8 w-8 items-center justify-center
                          rounded-md border border-gray-300
                          text-sm text-gray-700
                          transition hover:bg-gray-100
                        "
                      >
                        +
                      </button>
                    </div>

                    <p className="mt-3 text-sm font-semibold text-gray-900">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* delete */}
                  <button
                    onClick={() => removeItem(item.id)}
                    className="
                      mt-1 rounded-md p-2
                      text-red-500 transition hover:bg-red-50 hover:text-red-700
                    "
                    aria-label={`Remove ${item.name} from cart`}
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t bg-white px-6 py-5">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-sm text-gray-500">Total</span>
            <span className="text-lg font-semibold text-gray-900">
              ${totalPrice.toFixed(2)}
            </span>
          </div>

          <Button className="h-11 w-full rounded-lg">
            Checkout
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}