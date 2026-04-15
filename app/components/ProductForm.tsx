"use client";

import Image from "next/image";
import { useActionState, useRef, useState } from "react";
import { createProduct, type ProductFormState } from "@/app/lib/actions";

const initialState: ProductFormState = {
  message: null,
  errors: {},
};

export default function ProductForm() {
  const [state, formAction, isPending] = useActionState(
    createProduct,
    initialState
  );
  const [imageUrl, setImageUrl] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "handcrafted_haven_products");

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzzsi0uoo/image/upload",
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    if (result.secure_url) {
      setImageUrl(result.secure_url);
    }
  }

  return (
    <form
      action={formAction}
      className="max-w-xl mx-auto space-y-6 bg-white shadow-lg rounded-2xl p-8 border border-gray-200"
    >
      {/* title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Add New Product
      </h2>

      {/* name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          required
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {state.errors?.name && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.name[0]}
          </p>
        )}
      </div>

      {/* description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          rows={4}
          required
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {state.errors?.description && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.description[0]}
          </p>
        )}
      </div>

      {/* price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
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

      {/* category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Category
        </label>
        <input
          type="text"
          name="material"
          required
          placeholder="e.g. Clay, Leather, Wood"
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
          required
          min="0"
          defaultValue={1}
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
        {state.errors?.quantity && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.quantity[0]}
          </p>
        )}
      </div>

      {/* image upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Upload Image
        </label>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 block w-full text-sm border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-indigo-400"
        />

        <input type="hidden" name="image_url" value={imageUrl} />

        {state.errors?.image_url && (
          <p className="mt-1 text-sm text-red-500">
            {state.errors.image_url[0]}
          </p>
        )}

        {/* preview */}
        {imageUrl && (
          <div className="mt-4">
            <Image
              src={imageUrl}
              alt="Preview"
              width={128}
              height={128}
              className="w-32 h-32 object-cover rounded-lg border"
            />
          </div>
        )}
      </div>

      {state.message && (
        <p className="text-sm text-red-500">{state.message}</p>
      )}

      {/* button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          disabled={isPending}
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition disabled:opacity-60"
        >
          {isPending ? "Saving..." : "Save Product"}
        </button>
      </div>
    </form>
  );
}