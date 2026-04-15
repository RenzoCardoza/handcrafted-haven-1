"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function BecomeSellerForm({
  defaultName = "",
}: {
  defaultName?: string;
}) {
  const router = useRouter();

  const [name, setName] = useState(defaultName);
  const [bio, setBio] = useState("");
  const [location, setLocation] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [message, setMessage] = useState("");
  const [messageType, setMessageType] = useState<"success" | "error" | "">("");
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  async function handleImageUpload(
    e: React.ChangeEvent<HTMLInputElement>
  ) {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setMessage("");
    setMessageType("");

    try {
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

      if (!result.secure_url) {
        setMessage("Image upload failed.");
        setMessageType("error");
        setUploading(false);
        return;
      }

      setImageUrl(result.secure_url);
    } catch (error) {
      console.error("Seller image upload error:", error);
      setMessage("Image upload failed.");
      setMessageType("error");
    } finally {
      setUploading(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setMessageType("");

    try {
      const res = await fetch("/api/become-seller", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, bio, location, image_url: imageUrl }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || "Something went wrong");
        setMessageType("error");
        setLoading(false);
        return;
      }

      setMessage(data.message || "Seller profile created successfully!");
      setMessageType("success");

      setTimeout(() => {
        router.push("/artisans/dashboard");
        router.refresh();
      }, 1000);
    } catch (error) {
      console.error("Become seller form error:", error);
      setMessage("Something went wrong");
      setMessageType("error");
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <input
        type="text"
        placeholder="Display name"
        className="border p-3 rounded-md"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="text"
        placeholder="Location"
        className="border p-3 rounded-md"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />

      <textarea
        placeholder="Tell people a little about the work and style"
        className="border p-3 rounded-md min-h-28"
        value={bio}
        onChange={(e) => setBio(e.target.value)}
      />

      <div>
        <label className="block text-sm font-medium mb-2 text-gray-700">
          Profile image
        </label>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageUpload}
          className="block w-full text-sm border rounded-md p-3"
        />

        {uploading && (
          <p className="mt-2 text-sm text-gray-500">
            Uploading image...
          </p>
        )}

        {imageUrl && (
          <div className="mt-4">
            <Image
              src={imageUrl}
              alt="Seller preview"
              width={120}
              height={120}
              className="w-24 h-24 rounded-full object-cover border"
            />
          </div>
        )}
      </div>

      <button
        type="submit"
        disabled={loading || uploading}
        className="bg-black text-white p-3 rounded-md disabled:opacity-60"
      >
        {loading ? "Saving..." : "Become a Seller"}
      </button>

      {message && (
        <p
          className={`text-sm text-center ${
            messageType === "success" ? "text-green-600" : "text-red-500"
          }`}
        >
          {message}
        </p>
      )}
    </form>
  );
}