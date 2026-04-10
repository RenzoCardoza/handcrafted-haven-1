import { sql } from "@/app/lib/db";
import { Review } from "@/app/types/Review";

export async function GET(
  request: Request,
  context: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await context.params; 

    const rows = await sql`
      SELECT 
        r.id,
        r.product_id,
        r.rating,
        r.review_text,
        u.name AS reviewer_name,
        r.created_at
      FROM reviews r
      JOIN users u ON r.user_id = u.id
      WHERE r.product_id = ${productId};
    `;

    const reviews: Review[] = rows.map((row) => ({
      id: String(row.id),
      productId: String(row.product_id),
      rating: row.rating,
      comment: row.review_text,
      reviewerName: row.reviewer_name,
      date: new Date(row.created_at).toLocaleDateString(),
    }));

    return Response.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}