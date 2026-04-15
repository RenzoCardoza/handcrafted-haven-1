"use client";

import Image from "next/image";

type Artisan = {
  id: string;
  name: string;
  bio?: string;
  image_url?: string;
  location?: string;
};

export default function ArtisanBanner({ artisan }: { artisan: Artisan }) {
  return (
    <div className="w-full bg-gradient-to-r from-amber-50 to-white border rounded-2xl p-6 md:p-8 mb-10">
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-6">
        
        {/* PROFILE IMAGE */}
        <div className="relative w-28 h-28 md:w-32 md:h-32 rounded-full overflow-hidden bg-gray-100 flex-shrink-0">
          {artisan.image_url ? (
            <Image
              src={artisan.image_url}
              alt={artisan.name}
              fill
              className="object-contain p-2"
              sizes="128px"
              priority
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-400 text-sm">
              No Image
            </div>
          )}
        </div>

        {/* INFO */}
        <div className="text-center md:text-left">
          <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
            {artisan.name}
          </h1>

          {artisan.bio && (
            <p className="text-gray-600 mt-2 max-w-xl">
              {artisan.bio}
            </p>
          )}

          {artisan.location && (
            <p className="text-gray-600 mt-2 max-w-xl">
              Location: {artisan.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}