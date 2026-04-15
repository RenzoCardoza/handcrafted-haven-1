// "use client";

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
    <div
      className="
        w-full rounded-3xl border border-[#E5DFD3]
        bg-white/60 backdrop-blur-sm
        p-6 md:p-8
      "
    >
      <div className="flex flex-col items-center gap-6 md:flex-row md:items-start">
        
        {/* profile pic */}
        <div className="flex-shrink-0">
          <div className="relative h-28 w-28 md:h-32 md:w-32 rounded-full bg-[#F5F1E8] p-2">
            <div className="relative h-full w-full overflow-hidden rounded-full ring-4 ring-white">
              {artisan.image_url ? (
                <Image
                  src={artisan.image_url}
                  alt={artisan.name}
                  fill
                  sizes="128px"
                  className="object-cover"
                  priority
                />
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No Image
                </div>
              )}
            </div>
          </div>
        </div>

        {/* info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl md:text-4xl font-semibold text-[#2F241D] leading-[1.2]">
            {artisan.name}
          </h1>

          {artisan.bio && (
            <p className="mt-4 max-w-2xl text-base leading-7 text-[#5C4B3F]">
              {artisan.bio}
            </p>
          )}

          {artisan.location && (
            <p className="mt-4 text-sm font-medium text-[#8A7768]">
              📍 {artisan.location}
            </p>
          )}
        </div>
      </div>
    </div>
  );

}