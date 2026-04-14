"use client";

import Link from "next/link";
import Image from "next/image";
import { Artisan } from "../types/Artisan";

export default function ArtisanCard({ artisan }: { artisan: Artisan }) {
  return (
    <Link href={`/artisans/${artisan.id}`}>
      <div className="border rounded-xl overflow-hidden bg-white hover:shadow-md transition cursor-pointer max-w-sm mx-auto">
        
        {/* image */}
        <div className="relative w-full aspect-[4/3] md:aspect-[3/2] bg-gray-100">
          {artisan.image_url ? (
            <Image
              src={artisan.image_url}
              alt={artisan.name}
              fill
              className="object-contain bg-gray-100 p-2"
            />
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-4 space-y-2">
          <h3 className="font-semibold text-lg">{artisan.name}</h3>

          <p className="text-sm text-gray-600 line-clamp-2">
            {artisan.bio || "No description available"}
          </p>

          {artisan.location && (
            <p className="text-xs text-gray-400">
              📍 {artisan.location}
            </p>
          )}
        </div>
      </div>
    </Link>
  );
}