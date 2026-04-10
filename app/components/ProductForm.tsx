"use client";

import Image from "next/image";
import { useState } from "react";

interface ProductFormData {
  name: string;
  description: string;
  price: number;
  categoryId: number;
  imageUrl: string;
  sellerId: number;
}

interface ProductFormProps {
  categories: { id: number; name: string }[];
  onSubmit: (data: ProductFormData) => void;
}

export default function ProductForm({
  categories,
  onSubmit,
}: ProductFormProps) {
  const [formData, setFormData] = useState<ProductFormData>({
    name: "",
    description: "",
    price: 0,
    categoryId: 0,
    imageUrl: "",
    sellerId: 0,
  });

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "handcrafted_haven_products"); // "handcrafted_haven_products" is the Upload Preset I createdin my cloudinary dashboard

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/dzzsi0uoo/image/upload", // My cloudinary CloudName is the URL
      {
        method: "POST",
        body: data,
      }
    );

    const result = await res.json();

    setFormData((prev) => ({
      ...prev,
      imageUrl: result.secure_url,
    }));
  }

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "price" ||
        name === "categoryId" ||
        name === "sellerId"
          ? Number(value)
          : value,
    }));
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onSubmit(formData);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-xl mx-auto space-y-6 bg-white shadow-lg rounded-2xl p-8 border border-gray-200"
    >
      {/* Title */}
      <h2 className="text-2xl font-bold text-gray-800">
        Add New Product
      </h2>

      {/* Name */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Product Name
        </label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
      </div>

      {/* Description */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Description
        </label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
      </div>

      {/* Price */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Price
        </label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
          step="0.01"
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
      </div>

      {/* Category */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Category
        </label>
        <select
          name="categoryId"
          value={formData.categoryId}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        >
          <option value={0}>Select a category</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Upload Image
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="mt-2 block w-full text-sm border-2 border-dashed border-gray-300 rounded-lg p-3 cursor-pointer hover:border-indigo-400"
        />

        {/* Preview */}
        {formData.imageUrl && (
          <Image
            src={formData.imageUrl}
            alt="Preview"
            className="mt-4 w-32 h-32 object-cover rounded-lg border"
          />
        )}
      </div>

      {/* Seller ID */}
      <div>
        <label className="block text-sm font-semibold text-gray-700">
          Seller ID
        </label>
        <input
          type="number"
          name="sellerId"
          value={formData.sellerId}
          onChange={handleChange}
          required
          className="mt-1 w-full rounded-lg border-2 border-gray-300 p-2 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none"
        />
      </div>

      {/* Button */}
      <div className="flex justify-center pt-4">
        <button
          type="submit"
          className="bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 transition"
        >
          Save Product
        </button>
      </div>
    </form>
  );
}