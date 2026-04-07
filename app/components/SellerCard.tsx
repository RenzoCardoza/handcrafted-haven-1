// components/SellerCard.tsx
import Image from "next/image";

interface SellerCardProps {
  name: string;
  bio?: string;
  profileImageUrl?: string;
}

export default function SellerCard({ name, bio, profileImageUrl }: SellerCardProps) {
  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex items-center space-x-4">
      <Image
        src={profileImageUrl || "/default-avatar.png"}
        width={64}
        height={64}
        alt={name}
        className="w-16 h-16 rounded-full object-cover border border-gray-200"
      />
      <div>
        <h3 className="text-lg font-semibold text-gray-900">{name}</h3>
        {bio && <p className="text-sm text-gray-600 line-clamp-2">{bio}</p>}
      </div>
    </div>
  );
}
