"use client";

import { useState } from "react";

export interface Review {
  id: string;
  productId: string;
  rating: number;
  comment: string;
  reviewerName: string;
  date: string;
}

/* star component */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="text-yellow-500 text-sm">
      {"★".repeat(rating)}
      {"☆".repeat(5 - rating)}
    </div>
  );
}

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const [showAll, setShowAll] = useState(false);

  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500 mb-6">No reviews yet.</p>;
  }

  const average =
    reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;

  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);

  return (
    <div className="mb-8">

      {/* summary */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-gray-600">
          <span className="font-semibold text-black">
            {average.toFixed(1)}
          </span>{" "}
          out of 5 — {reviews.length}{" "}
          {reviews.length === 1 ? "review" : "reviews"}
        </p>
      </div>

      {/* reviews */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-xl p-4 shadow-sm bg-white hover:shadow-md transition"
          >
            {/* header */}
            <div className="flex items-center justify-between mb-2">
              <span className="font-semibold text-sm">
                {review.reviewerName}
              </span>
              <span className="text-xs text-gray-400">
                {review.date}
              </span>
            </div>

            <StarRating rating={review.rating} />

            <p className="mt-2 text-gray-700 text-sm leading-relaxed">
              {review.comment}
            </p>
          </div>
        ))}
      </div>

      {/* toggle button */}
      {reviews.length > 3 && (
        <div className="mt-4 text-center">
          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="
              text-indigo-600 
              hover:text-indigo-800 
              text-sm font-medium 
              transition
            "
          >
            {showAll ? "Show less" : "See more reviews"}
          </button>
        </div>
      )}
    </div>
  );
}
