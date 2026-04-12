import { sql } from "@/app/lib/db";

export async function getProducts(filters: any) {
  const { material, artisan, minPrice, maxPrice, q, sort } = filters;

  let query = sql`
    SELECT 
      p.id,
      p.name,
      p.description,
      p.price,
      p.image_url,
      p.material,
      p.created_at,
      a.id AS artisan_id,
      a.name AS artisan_name
    FROM products p
    LEFT JOIN artisans a ON p.artisan_id = a.id
    WHERE 1=1
  `;

  if (material) {
    query = sql`${query} AND LOWER(p.material) = LOWER(${material})`;
  }

  if (artisan) {
    query = sql`${query} AND a.name ILIKE ${"%" + artisan + "%"}`;
  }

  if (q) {
    query = sql`${query} AND (
      p.name ILIKE ${"%" + q + "%"} OR
      p.description ILIKE ${"%" + q + "%"}
    )`;
  }

  if (minPrice) {
    query = sql`${query} AND p.price >= ${Number(minPrice)}`;
  }

  if (maxPrice) {
    query = sql`${query} AND p.price <= ${Number(maxPrice)}`;
  }

  if (sort === "price-asc") {
    query = sql`${query} ORDER BY p.price ASC`;
  } else if (sort === "price-desc") {
    query = sql`${query} ORDER BY p.price DESC`;
  } else {
    query = sql`${query} ORDER BY p.created_at DESC`;
  }

  const rows = await query;

  return rows.map((row) => ({
    id: String(row.id),
    name: row.name ?? "",
    description: row.description ?? "",
    price: Number(row.price ?? 0),
    image_url: row.image_url ?? "",
    created_at: row.created_at,

    seller: {
      id: String(row.artisan_id),
      name: row.artisan_name ?? "Unknown",
    },

    category: row.material
      ? {
          id: row.material,
          name: row.material,
        }
      : undefined,
  }));
}