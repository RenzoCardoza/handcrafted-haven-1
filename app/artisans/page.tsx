import Header from "@/app/components/Header";
import Nav from "@/app/components/Nav";
import Footer from "@/app/components/Footer";
import ArtisanCard from "@/app/components/ArtisanCard";
import { sql } from "@/app/lib/db";
import { Artisan } from "@/app/types/Artisan";

export const dynamic = "force-dynamic";

async function getArtisans(): Promise<Artisan[]> {
  const rows = await sql`
    SELECT id, name, bio, location, image_url
    FROM artisans
    ORDER BY name ASC
  `;

  return rows.map((row) => ({
    id: String(row.id),
    name: row.name ?? "Unknown artisan",
    bio: row.bio ?? "",
    location: row.location ?? "",
    image_url: row.image_url ?? "",
  }));
}

export default async function ArtisansPage() {
  const artisans = await getArtisans();

  return (
    <main className="flex min-h-screen flex-col">
      <Header />
      <Nav />

      <section className="mx-auto w-full max-w-7xl px-4 py-10">
        <h1 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
          Artisans
        </h1>

        {artisans.length === 0 ? (
          <p className="text-gray-500">No artisans found.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {artisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </main>
  );
}