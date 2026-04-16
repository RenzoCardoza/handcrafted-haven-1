import { getServerSession } from "next-auth";
import { authOptions } from "@/app/lib/auth";
import { z } from "zod/v4";
import { sql } from "@/app/lib/db";

const reviewSchema = z.object({
  productId: z.string().min(1, "Product ID is required"),
  rating: z
    .number()
    .int()
    .min(1, "Pick a rating")
    .max(5, "Rating must be between 1 and 5"),
  comment: z
    .string()
    .min(3, "Comment is too short")
    .max(500, "Comment is too long"),
});

export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions);
    console.log("REVIEW SESSION", session);
    if (!session?.user?.id) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await req.json();
    const parsed = reviewSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        { error: parsed.error.issues.map((i) => i.message).join(", ") },
        { status: 400 }
      );
    }

    const { productId, rating, comment } = parsed.data;
    const userId = session.user.id;

    const existingRows = await sql`
      SELECT id
      FROM reviews
      WHERE user_id = ${userId}
        AND product_id = ${productId}
      LIMIT 1
    `;

    if (existingRows.length > 0) {
      return Response.json(
        { error: "You have already reviewed this product" },
        { status: 409 }
      );
    }

    await sql`
      INSERT INTO reviews (rating, comment, user_id, product_id)
      VALUES (${rating}, ${comment.trim()}, ${userId}, ${productId})
    `;

    return Response.json({ success: true });
  } catch (err) {
    console.error("Error creating review:", err);
    return Response.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}