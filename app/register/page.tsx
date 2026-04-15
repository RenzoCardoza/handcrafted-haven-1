// "use client";

// import Image from "next/image";
// import { useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { signIn } from "next-auth/react";
// import Link from "next/link";
// import Header from "@/app/components/Header";
// import Footer from "@/app/components/Footer";

// export default function RegisterPage() {
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   const defaultRole = searchParams.get("role") === "seller" ? "seller" : "buyer";

//   const [name, setName] = useState("");
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [role, setRole] = useState(defaultRole);
//   const [bio, setBio] = useState("");
//   const [location, setLocation] = useState("");
//   const [imageUrl, setImageUrl] = useState("");
//   const [message, setMessage] = useState("");
//   const [messageType, setMessageType] = useState<"success" | "error" | "">("");
//   const [uploading, setUploading] = useState(false);

//   async function handleImageUpload(
//     e: React.ChangeEvent<HTMLInputElement>
//   ) {
//     const file = e.target.files?.[0];
//     if (!file) return;

//     setUploading(true);
//     setMessage("");
//     setMessageType("");

//     try {
//       const data = new FormData();
//       data.append("file", file);
//       data.append("upload_preset", "handcrafted_haven_products");

//       const res = await fetch(
//         "https://api.cloudinary.com/v1_1/dzzsi0uoo/image/upload",
//         {
//           method: "POST",
//           body: data,
//         }
//       );

//       const result = await res.json();

//       if (!result.secure_url) {
//         setMessage("Image upload failed.");
//         setMessageType("error");
//         setUploading(false);
//         return;
//       }

//       setImageUrl(result.secure_url);
//     } catch (error) {
//       console.error("Register seller image upload error:", error);
//       setMessage("Image upload failed.");
//       setMessageType("error");
//     } finally {
//       setUploading(false);
//     }
//   }

//   async function handleSubmit(e: React.FormEvent) {
//     e.preventDefault();
//     setMessage("");
//     setMessageType("");

//     const body =
//       role === "seller"
//         ? { name, email, password, role, bio, location, image_url: imageUrl }
//         : { name, email, password, role };

//     const res = await fetch("/api/register", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify(body),
//     });

//     const data = await res.json();

//     if (res.ok) {
//       setMessage("Account created successfully! Redirecting to login...");
//       setMessageType("success");

//       setTimeout(() => {
//         router.push(`/login?role=${role}`);
//       }, 1500);
//     } else {
//       setMessage(data.error || "Something went wrong");
//       setMessageType("error");
//     }
//   }

//   async function handleGitHubSignIn() {
//     if (role === "seller") return;

//     await signIn("github", {
//       callbackUrl: "/products",
//     });
//   }

//   return (
//     <main className="flex flex-col min-h-screen">
//       <Header showSearch={false} showAuth={false} />

//       <section className="flex-1 flex items-center justify-center px-4 py-10 bg-amber-50">
//         <div className="w-full max-w-md p-6 border rounded-2xl shadow-md bg-white">
//           <h1 className="text-2xl font-semibold mb-2 text-center">
//             Create Account
//           </h1>

//           <p className="text-sm text-gray-500 text-center mb-6">
//             Create an account manually or continue with GitHub.
//           </p>

//           <form onSubmit={handleSubmit} className="flex flex-col gap-4">
//             <input
//               type="text"
//               placeholder="Name"
//               className="border p-3 rounded-md"
//               onChange={(e) => setName(e.target.value)}
//             />

//             <input
//               type="email"
//               placeholder="Email"
//               className="border p-3 rounded-md"
//               onChange={(e) => setEmail(e.target.value)}
//             />

//             <input
//               type="password"
//               placeholder="Password"
//               className="border p-3 rounded-md"
//               onChange={(e) => setPassword(e.target.value)}
//             />

//             <select
//               value={role}
//               onChange={(e) => setRole(e.target.value)}
//               className="border p-3 rounded-md"
//             >
//               <option value="buyer">Buyer Account</option>
//               <option value="seller">Seller Account</option>
//             </select>

//             {role === "seller" && (
//               <>
//                 <input
//                   type="text"
//                   placeholder="Location"
//                   className="border p-3 rounded-md"
//                   onChange={(e) => setLocation(e.target.value)}
//                 />

//                 <textarea
//                   placeholder="Tell people a little about the work and style"
//                   className="border p-3 rounded-md min-h-28"
//                   onChange={(e) => setBio(e.target.value)}
//                 />

//                 <div>
//                   <label className="block text-sm font-medium mb-2 text-gray-700">
//                     Profile image
//                   </label>

//                   <input
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     className="block w-full text-sm border rounded-md p-3"
//                   />

//                   {uploading && (
//                     <p className="mt-2 text-sm text-gray-500">
//                       Uploading image...
//                     </p>
//                   )}

//                   {imageUrl && (
//                     <div className="mt-4">
//                       <Image
//                         src={imageUrl}
//                         alt="Seller preview"
//                         width={120}
//                         height={120}
//                         className="w-24 h-24 rounded-full object-cover border"
//                       />
//                     </div>
//                   )}
//                 </div>
//               </>
//             )}

//             <button
//               type="submit"
//               disabled={uploading}
//               className="bg-black text-white p-3 rounded-md disabled:opacity-60"
//             >
//               Register
//             </button>
//           </form>

//           <div className="my-4 text-center text-sm text-gray-400">
//             or
//           </div>

//           <button
//             onClick={handleGitHubSignIn}
//             disabled={role === "seller"}
//             className={`w-full border p-3 rounded-md transition ${
//               role === "seller"
//                 ? "bg-gray-100 text-gray-400 cursor-not-allowed"
//                 : "hover:bg-gray-50"
//             }`}
//           >
//             Continue with GitHub
//           </button>

//           {role === "seller" && (
//             <p className="mt-2 text-center text-xs text-gray-500">
//               GitHub signup is only available for buyer accounts right now because seller signup needs profile details and image upload.
//             </p>
//           )}

//           {message && (
//             <p
//               className={`mt-4 text-center text-sm ${
//                 messageType === "success" ? "text-green-600" : "text-red-500"
//               }`}
//             >
//               {message}
//             </p>
//           )}

//           <p className="mt-6 text-center text-sm text-gray-600">
//             Already have an account?{" "}
//             <Link
//               href={`/login?role=${role}`}
//               className="text-indigo-600 hover:underline"
//             >
//               Login here
//             </Link>
//           </p>
//         </div>
//       </section>

//       <Footer />
//     </main>
//   );
// }
import { Suspense } from "react";
import RegisterClient from "./RegisterClient";

export default function RegisterPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#F5F1E8]" />}>
      <RegisterClient />
    </Suspense>
  );
}