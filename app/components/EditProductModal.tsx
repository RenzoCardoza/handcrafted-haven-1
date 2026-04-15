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
        className="w-full rounded-lg border border-gray-300 py-2 hover:bg-gray-50 transition"
      >
        Edit
      </button>

      {open && (
        <div className="fixed inset-0 z-50 bg-black/40 flex items-center justify-center px-4">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-gray-800">
                Edit Product
              </h2>

              <button
                type="button"
                onClick={() => setOpen(false)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                Close
              </button>
            </div>

            <form action={formAction} className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Product Name
                </label>
                <input
                  type="text"
                  name="name"
                  defaultValue={product.name}
                  required
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
                {state.errors?.name && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.name[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Description
                </label>
                <textarea
                  name="description"
                  rows={4}
                  defaultValue={product.description}
                  required
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
                {state.errors?.description && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.description[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  defaultValue={product.price}
                  required
                  step="0.01"
                  min="0.01"
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
                {state.errors?.price && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.price[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Category
                </label>
                <input
                  type="text"
                  name="material"
                  defaultValue={product.category?.name ?? ""}
                  required
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
                {state.errors?.material && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.material[0]}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700">
                  Quantity
                </label>
                <input
                  type="number"
                  name="quantity"
                  defaultValue={product.quantity}
                  required
                  min="0"
                  className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
                />
                {state.errors?.quantity && (
                  <p className="mt-1 text-sm text-red-500">
                    {state.errors.quantity[0]}
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
                  className="rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-50 transition"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={isPending}
                  className="rounded-lg bg-indigo-600 px-4 py-2 text-white hover:bg-indigo-700 transition disabled:opacity-60"
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