import { notFound } from "next/navigation";
import { sql } from "@/app/lib/db";

export default async function SellerPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params; 

  if (!id) notFound(); 

  const rows = await sql`
    SELECT 
      a.id,
      a.name
    FROM artisans a
    WHERE a.id = ${id}
    LIMIT 1
  `;

  const seller = rows[0];

  if (!seller) notFound();

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold">
        {seller.name}
      </h1>
    </div>
  );
}