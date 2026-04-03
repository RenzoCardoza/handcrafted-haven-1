"use client";

import { useState } from "react";
import { z } from "zod/v4";

const reviewSchema = z.object({
  rating: z.number().min(1, "Pick a rating").max(5),
  comment: z.string().min(3, "Comment is too short").max(500, "Comment is too long"),
});

export default function ReviewForm({ productId }: { productId: string }) {
  // TODO: replace with real auth check via next-auth useSession()
  const isLoggedIn = false;

  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [errors, setErrors] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);

  if (!isLoggedIn) {
    return (
      <p className="text-gray-500 text-sm">
        <a href="#" className="text-green-600 hover:underline">
          Log in
        </a>{" "}
        to leave a review.
      </p>
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setErrors([]);

    const result = reviewSchema.safeParse({ rating, comment });

    if (!result.success) {
      setErrors(result.error.issues.map((i) => i.message));
      return;
    }

    // TODO: send to the server (POST /api/reviews or server action)
    console.log("submitting review:", { productId, rating, comment });
    setSubmitted(true);
  }

  if (submitted) {
    return <p className="text-green-600 font-semibold">Thanks for your review!</p>;
  }

  return (
    <form onSubmit={handleSubmit} className="mt-6 space-y-4 max-w-md">
      <h3 className="font-heading text-lg font-bold">Write a review</h3>

      {/* Star picker */}
      <div>
        <label className="block text-sm text-gray-600 mb-1">Rating</label>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              key={star}
              type="button"
              onClick={() => setRating(star)}
              className={`text-2xl ${
                star <= rating ? "text-yellow-500" : "text-gray-300"
              }`}
            >
              ★
            </button>
          ))}
        </div>
      </div>

      {/* Comment */}
      <div>
        <label htmlFor="comment" className="block text-sm text-gray-600 mb-1">
          Comment
        </label>
        <textarea
          id="comment"
          rows={3}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          className="border rounded w-full px-3 py-2"
        />
      </div>

      {/* Validation errors */}
      {errors.length > 0 && (
        <ul className="text-red-500 text-sm list-disc list-inside">
          {errors.map((err, i) => (
            <li key={i}>{err}</li>
          ))}
        </ul>
      )}

      <button
        type="submit"
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
      >
        Submit review
      </button>
    </form>
  );
}
