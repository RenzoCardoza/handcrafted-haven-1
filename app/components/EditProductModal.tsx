"use client";

import { useActionState, useState } from "react";
import { Product } from "@/app/types/Product";
import {
  updateProduct,
  type UpdateProductState,
} from "@/app/lib/actions";

const initialState: UpdateProductState = {
  message: null,
  errors: {},
  success: false,
};

export default function EditProductModal({
  product,
}: {
  product: Product;
}) {
  const [open, setOpen] = useState(false);
  const updateProductWithId = updateProduct.bind(null, product.id);

  const [state, formAction, isPending] = useActionState(
    updateProductWithId,
    initialState
  );

  return (
    <>
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="
          w-full rounded-lg border border-[#D8CFC2] px-3 py-2
          text-sm font-medium text-[#2F241D]
          transition hover:bg-[#F8F4ED]
        "
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
          <div className="w-full max-w-lg rounded-3xl border border-[#E5DFD3] bg-[#FFFDF9] p-6 shadow-xl md:p-7">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <h2 className="text-2xl font-semibold text-[#2F241D]">
                  Edit Product
                </h2>
                <p className="mt-1 text-sm text-[#6B5B4D]">
                  Update your product details and save your changes.
                </p>
              </div>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="
                  rounded-full px-3 py-1 text-sm text-[#8A7768]
                  transition hover:bg-[#F3ECE2] hover:text-[#2F241D]
                "
              >
                Close
              </button>
            </div>

            <form action={formAction} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-[#4B3B30]">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  required
                  className="
                    mt-1 w-full rounded-xl border border-[#D8CFC2]
                    bg-white px-3 py-2.5 text-[#2F241D]
                    outline-none transition
                    focus:border-[#7C5A3C] focus:ring-2 focus:ring-[#E8D9C8]
                  "
                />
                {state.errors?.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4B3B30]">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={product.description}
                  required
                  className="
                    mt-1 w-full rounded-xl border border-[#D8CFC2]
                    bg-white px-3 py-2.5 text-[#2F241D]
                    outline-none transition
                    focus:border-[#7C5A3C] focus:ring-2 focus:ring-[#E8D9C8]
                  "
                />
                {state.errors?.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.description[0]}
                  </p>
                )}
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-[#4B3B30]">
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    defaultValue={product.price}
                    required
                    step="0.01"
                    min="0.01"
                    className="
                      mt-1 w-full rounded-xl border border-[#D8CFC2]
                      bg-white px-3 py-2.5 text-[#2F241D]
                      outline-none transition
                      focus:border-[#7C5A3C] focus:ring-2 focus:ring-[#E8D9C8]
                    "
                  />
                  {state.errors?.price && (
                    <p className="mt-1 text-sm text-red-500">
                      {state.errors.price[0]}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-semibold text-[#4B3B30]">
                    Quantity
                  </label>
                  <input
                    type="number"
                    name="quantity"
                    defaultValue={product.quantity}
                    required
                    min="0"
                    className="
                      mt-1 w-full rounded-xl border border-[#D8CFC2]
                      bg-white px-3 py-2.5 text-[#2F241D]
                      outline-none transition
                      focus:border-[#7C5A3C] focus:ring-2 focus:ring-[#E8D9C8]
                    "
                  />
                  {state.errors?.quantity && (
                    <p className="mt-1 text-sm text-red-500">
                      {state.errors.quantity[0]}
                    </p>
                  )}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#4B3B30]">
                  Category
                </label>
                <input
                  type="text"
                  name="material"
                  defaultValue={product.category?.name ?? ""}
                  required
                  className="
                    mt-1 w-full rounded-xl border border-[#D8CFC2]
                    bg-white px-3 py-2.5 text-[#2F241D]
                    outline-none transition
                    focus:border-[#7C5A3C] focus:ring-2 focus:ring-[#E8D9C8]
                  "
                />
                {state.errors?.material && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.material[0]}
                  </p>
                )}
              </div>

              {state.message && (
                <p
                  className={`text-sm ${
                    state.success ? "text-green-600" : "text-red-500"
                  }`}
                >
                  {state.message}
                </p>
              )}

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  className="
                    rounded-lg border border-[#D8CFC2] px-4 py-2
                    text-sm font-medium text-[#2F241D]
                    transition hover:bg-[#F8F4ED]
                  "
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="
                    rounded-lg bg-[#7C5A3C] px-4 py-2
                    text-sm font-medium text-white
                    transition hover:bg-[#68492F] disabled:opacity-60
                  "
                >
                  {isPending ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}