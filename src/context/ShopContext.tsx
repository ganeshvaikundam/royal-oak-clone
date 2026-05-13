import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { toast } from "sonner";
import type { Product } from "@/data/products";

type CartItem = { product: Product; qty: number };
type Ctx = {
  cart: CartItem[];
  wishlist: Product[];
  addToCart: (p: Product, qty?: number) => void;
  removeFromCart: (id: number) => void;
  toggleWishlist: (p: Product) => void;
  inWishlist: (id: number) => boolean;
  clearCart: () => void;
};

const ShopCtx = createContext<Ctx | null>(null);

export function ShopProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    try {
      const c = localStorage.getItem("cart");
      const w = localStorage.getItem("wishlist");
      if (c) setCart(JSON.parse(c));
      if (w) setWishlist(JSON.parse(w));
    } catch {}
  }, []);
  useEffect(() => { localStorage.setItem("cart", JSON.stringify(cart)); }, [cart]);
  useEffect(() => { localStorage.setItem("wishlist", JSON.stringify(wishlist)); }, [wishlist]);

  const addToCart = (p: Product, qty = 1) => {
    setCart((prev) => {
      const ex = prev.find((i) => i.product.id === p.id);
      if (ex) return prev.map((i) => i.product.id === p.id ? { ...i, qty: i.qty + qty } : i);
      return [...prev, { product: p, qty }];
    });
  };
  const removeFromCart = (id: number) => setCart((p) => p.filter((i) => i.product.id !== id));
  const toggleWishlist = (p: Product) => {
    setWishlist((prev) => {
      const ex = prev.find((i) => i.id === p.id);
      if (ex) { toast("Removed from wishlist"); return prev.filter((i) => i.id !== p.id); }
      toast.success("Added to wishlist");
      return [...prev, p];
    });
  };
  const inWishlist = (id: number) => wishlist.some((p) => p.id === id);
  const clearCart = () => setCart([]);

  return <ShopCtx.Provider value={{ cart, wishlist, addToCart, removeFromCart, toggleWishlist, inWishlist, clearCart }}>{children}</ShopCtx.Provider>;
}

export const useShop = () => {
  const c = useContext(ShopCtx);
  if (!c) throw new Error("useShop outside provider");
  return c;
};
