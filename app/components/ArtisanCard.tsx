"use client";

import Link from "next/link";
import Image from "next/image";
import { Artisan } from "../types/Artisan";

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <Link href={`/artisans/${artisan.id}`} className="block h-full">
      <div
        className="
          mx-auto flex h-full min-h-[380px] flex-col
          rounded-2xl border border-[#E5DFD3]
          bg-white/60 backdrop-blur-sm
          transition duration-300
          hover:shadow-lg hover:-translate-y-1
        "
      >
        {/* Image */}
        <div className="flex items-center justify-center px-6 pt-8">
          <div className="relative w-36 sm:w-40 aspect-square rounded-full bg-[#F5F1E8] p-2">
            <div className="relative w-full h-full rounded-full overflow-hidden ring-2 ring-white">
              {artisan.image_url ? (
                <Image
                  src={artisan.image_url}
                  alt={artisan.name}
                  fill
                  sizes="160px"
                  className="object-cover"
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="flex flex-1 flex-col px-6 pb-6 pt-5">
          <h3 className="text-lg font-semibold text-[#2F241D]">
            {artisan.name}
          </h3>

          <p className="mt-3 text-sm text-[#6B5B4D] line-clamp-2">
            {artisan.bio || "No description available"}
          </p>

          <div className="mt-auto pt-5">
            {artisan.location ? (
              <p className="text-xs text-[#9A8B7A]">
                📍 {artisan.location}
              </p>
            ) : (
              <p className="text-xs text-transparent">placeholder</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}