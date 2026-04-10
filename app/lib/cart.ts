export type CartItem = {
  productId: string;
  quantity: number;
};

const CART_KEY = "cart";

/* get cart */
export function getCart(): CartItem[] {
  if (typeof window === "undefined") return [];

  const cart = localStorage.getItem(CART_KEY);
  return cart ? JSON.parse(cart) : [];
}

/* save cart */
export function saveCart(cart: CartItem[]) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
}

/* add item */
export function addToCart(productId: string, quantity: number = 1) {
  const cart = getCart();

  const existing = cart.find((item) => item.productId === productId);

  if (existing) {
    existing.quantity += quantity;
  } else {
    cart.push({ productId, quantity });
  }

  saveCart(cart);

  // update the ui everywhere, optional though
  window.dispatchEvent(new Event("cartUpdated"));
}