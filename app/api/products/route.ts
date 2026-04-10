import { sql } from "@/app/lib/db";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const ids = req.nextUrl.searchParams.get("ids");

  if (!ids) {
    return Response.json([]);
  }

  const idArray = ids.split(",");

  const products = await sql`
    SELECT * FROM products
    WHERE id = ANY(${idArray})
  `;

  return Response.json(products);
}
