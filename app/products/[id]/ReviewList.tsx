interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
}

function StarRating({ rating }: { rating: number }) {
  return (
    <span className="text-yellow-500">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </span>
  );
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  if (reviews.length === 0) {
    return <p className="text-gray-500 mb-6">No reviews yet.</p>;
  }

  const average = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  return (
    <div className="mb-8">
      <p className="text-gray-600 mb-4">
        {average.toFixed(1)} out of 5 — {reviews.length}{" "}
        {reviews.length === 1 ? "review" : "reviews"}
      </p>

      <div className="space-y-4">
        {reviews.map((review) => (
          <div key={review.id} className="border rounded p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold">{review.reviewerName}</span>
              <span className="text-sm text-gray-400">{review.date}</span>
            </div>
            <StarRating rating={review.rating} />
            <p className="mt-2 text-gray-700">{review.comment}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
