import { sql } from "@/app/lib/db";

export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await context.params;

    const [product] = await sql`
      SELECT * FROM products WHERE id = ${id}
    `;

    if (!product) {
      return new Response("Not Found", { status: 404 });
    }

    return Response.json(product);
  } catch (err) {
    console.error(err);
    return new Response("Internal Server Error", { status: 500 });
  }
}