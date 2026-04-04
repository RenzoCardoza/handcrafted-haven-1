// app/register/page.tsx

export default function RegisterPage() {
  return (
    <main className="flex min-h-screen items-center justify-center">
      <div className="w-full max-w-md p-6 border rounded-xl shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-center">
          Create Account
        </h1>

        <form className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Name"
            className="border p-2 rounded-md"
          />

          <input
            type="email"
            placeholder="Email"
            className="border p-2 rounded-md"
          />

          <input
            type="password"
            placeholder="Password"
            className="border p-2 rounded-md"
          />

          <button
            type="submit"
            className="bg-black text-white p-2 rounded-md"
          >
            Register
          </button>
        </form>
      </div>
    </main>
  );
}