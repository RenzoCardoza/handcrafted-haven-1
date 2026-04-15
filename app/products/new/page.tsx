import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";
import ProductForm from "@/app/components/ProductForm";

export default function NewProductPage() {
  return (
    <main className="flex flex-col min-h-screen">
      <Header />

      <section className="max-w-5xl mx-auto w-full px-4 py-10">
        <h1 className="text-3xl font-bold mb-8">Add Product</h1>
        <ProductForm />
      </section>

      <Footer />
    </main>
  );
}