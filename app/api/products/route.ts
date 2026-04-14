import { getProducts } from "@/app/lib/db/products";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const filters = {
    material: searchParams.get("material") || undefined,
    artisan: searchParams.get("artisan") || undefined,
    minPrice: searchParams.get("minPrice") || undefined,
    maxPrice: searchParams.get("maxPrice") || undefined,
    q: searchParams.get("q") || undefined,
    sort: searchParams.get("sort") || undefined,
  };

  const products = await getProducts(filters);

  return Response.json(products);
}
