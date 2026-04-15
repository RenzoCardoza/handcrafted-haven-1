import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import BecomeSellerForm from "@/app/components/BecomeSellerForm";
import { authOptions } from "@/app/lib/auth";
import { sql } from "@/app/lib/db";

export default async function SellPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    redirect("/login?role=seller&callbackUrl=/sell");
  }

  const userRows = await sql`
    SELECT id, name, role
    FROM users
    WHERE email = ${session.user.email}
    LIMIT 1
  `;

  const user = userRows[0];

  if (!user) {
    redirect("/register?role=seller");
  }

  const artisanRows = await sql`
    SELECT id
    FROM artisans
    WHERE email = ${session.user.email}
    LIMIT 1
  `;

  const artisan = artisanRows[0];

  if (user.role === "seller" && artisan) {
    redirect("/artisans/dashboard");
  }

  return (
    <main className="flex flex-col min-h-screen">
      <Header showSearch={false} />

      <section className="flex-1 flex items-center justify-center px-4 py-10 bg-amber-50">
        <div className="w-full max-w-lg p-6 border rounded-2xl shadow-md bg-white">
          <h1 className="text-2xl font-semibold mb-2 text-center">
            Become a Seller
          </h1>

          <p className="text-sm text-gray-500 text-center mb-6">
            Set up the seller profile and start managing products from the artisan dashboard.
          </p>

          <BecomeSellerForm defaultName={user.name ?? ""} />
        </div>
      </section>

      <Footer />
    </main>
  );
}