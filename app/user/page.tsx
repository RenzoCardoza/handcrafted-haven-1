import { getServerSession } from "next-auth";

export default async function UserPage() {
  const session = await getServerSession();

  if (!session) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1>Not authorized</h1>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen items-center justify-center">
      <div className="p-6 border rounded-xl shadow-md">
        <h1 className="text-xl font-semibold mb-2">
          User Dashboard
        </h1>
        <p>Welcome {session.user?.email}</p>
      </div>
    </div>
  );
}