import { sql } from "@/app/lib/db";

export async function GET() {
  try {
    const reviews = await sql`
      SELECT * FROM reviews;
    `;

    return Response.json(reviews);
  } catch (err) {
    console.error("Error fetching reviews:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}