import { Link } from "@tanstack/react-router";
import { Heart, Eye, ShoppingCart } from "lucide-react";
import type { Product } from "@/data/products";
import { useShop } from "@/context/ShopContext";

export default function ProductCard({ p, onQuickView }: { p: Product; onQuickView?: (p: Product) => void }) {
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const onAdd = () => {
    if (window.confirm("Item added to cart! Continue shopping?")) {
      addToCart(p);
    } else {
      addToCart(p);
      window.open("/cart", "cartWindow", "width=1100,height=800");
    }
  };
  const openProduct = () => window.open(`/product/${p.id}`, `prod_${p.id}`);

  return (
    <div className="product-card group relative bg-card border rounded-lg overflow-hidden hover:shadow-xl transition-all">
      <div className="relative aspect-square overflow-hidden bg-secondary cursor-pointer" onClick={openProduct}>
        <img src={p.image} alt={p.name} loading="lazy" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
        <span title={`Save ${p.discount}% today`} className="absolute top-2 left-2 bg-gold text-navy text-xs font-bold px-2 py-1 rounded">-{p.discount}%</span>
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-center gap-2 pb-3 opacity-0 group-hover:opacity-100">
          <button className="quick-view-btn bg-white text-navy p-2 rounded-full shadow" onClick={(e) => { e.stopPropagation(); onQuickView?.(p); }} title="Quick View"><Eye className="h-4 w-4" /></button>
          <button className="wishlist-btn bg-white text-navy p-2 rounded-full shadow" onClick={(e) => { e.stopPropagation(); toggleWishlist(p); }} title="Wishlist">
            <Heart className={`h-4 w-4 ${inWishlist(p.id) ? "fill-destructive text-destructive" : ""}`} />
          </button>
          <button className="add-to-cart-btn bg-navy text-white p-2 rounded-full shadow" onClick={(e) => { e.stopPropagation(); onAdd(); }} title="Add to cart"><ShoppingCart className="h-4 w-4" /></button>
        </div>
      </div>
      <div className="p-3">
        <div className="text-[10px] text-muted-foreground uppercase tracking-wider">{p.category} · {p.collection}</div>
        <Link to="/product/$id" params={{ id: String(p.id) }} className="text-sm font-medium line-clamp-2 hover:text-gold">{p.name}</Link>
        <div className="flex items-center gap-2 mt-2">
          <span className="font-bold text-navy">₹{p.price.toLocaleString()}</span>
          <span className="text-xs text-muted-foreground line-through">₹{p.mrp.toLocaleString()}</span>
          <span className="text-xs text-green-600 font-semibold">{p.discount}% off</span>
        </div>
        <div className="text-xs text-amber-500 mt-1">★ {p.rating}</div>
      </div>
    </div>
  );
}
