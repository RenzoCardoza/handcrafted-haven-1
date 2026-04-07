import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

export async function GET() {
  try {
    const products = await sql`SELECT * FROM products LIMIT 5;`;
    return Response.json(products);
  } catch (err) {
    console.error("DB error:", err);
    return new Response("Internal Server Error", { status: 500 });
  }
}
