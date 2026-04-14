export async function getCartProducts(cart: {
  productId: string;
  quantity: number;
}[]) {
  if (cart.length === 0) return [];

  const ids = cart.map((item) => item.productId).join(",");

  const res = await fetch(`/api/products?ids=${ids}`);

  if (!res.ok) throw new Error("Failed to fetch products");

  const products = await res.json();

  return cart.map((item) => {
    const product = products.find(
      (p: any) => p.id === item.productId
    );

    return {
      ...product,
      quantity: item.quantity,
    };
  });
}