// components/StarRating.tsx
interface StarRatingProps {
  rating: number; // average rating
  onRate?: (value: number) => void; // optional for interactive mode
}

export default function StarRating({ rating, onRate }: StarRatingProps) {
  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          onClick={() => onRate && onRate(star)}
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill={star <= rating ? "currentColor" : "none"}
          className={`w-5 h-5 ${star <= rating ? "text-yellow-400" : "text-gray-300"} ${
            onRate ? "cursor-pointer" : ""
          }`}
        >
          <path
            fillRule="evenodd"
            d="M10 15l-5.878 3.09 1.122-6.545L.488 6.91l6.562-.955L10 0l2.95 5.955 6.562.955-4.756 4.635 1.122 6.545z"
            clipRule="evenodd"
          />
        </svg>
      ))}
      <span className="text-sm text-gray-600">{rating.toFixed(1)}</span>
    </div>
  );
}
