import { X } from "lucide-react";
import type { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";

export default function QuickViewModal({ p, onClose }: { p: Product | null; onClose: () => void }) {
  const { addToCart } = useShop();
  if (!p) return null;
  return (
    <div className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-card max-w-3xl w-full rounded-lg overflow-hidden grid md:grid-cols-2" onClick={(e) => e.stopPropagation()}>
        <img src={p.image} alt={p.name} className="w-full h-72 md:h-full object-cover" />
        <div className="p-6 relative">
          <button onClick={onClose} className="absolute top-3 right-3"><X className="h-5 w-5" /></button>
          <div className="text-xs text-muted-foreground uppercase">{p.category}</div>
          <h2 className="text-2xl font-serif mt-1">{p.name}</h2>
          <div className="flex items-center gap-2 mt-2">
            <span className="text-2xl font-bold text-navy">₹{p.price.toLocaleString()}</span>
            <span className="text-sm line-through text-muted-foreground">₹{p.mrp.toLocaleString()}</span>
          </div>
          <p className="text-sm text-muted-foreground mt-3">{p.description}</p>
          <button onClick={() => { addToCart(p); alert("Added to cart!"); onClose(); }} className="mt-5 w-full bg-navy text-white py-3 rounded font-semibold hover:bg-gold hover:text-navy">Add to Cart</button>
        </div>
      </div>
    </div>
  );
}
