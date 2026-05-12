import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import QuickViewModal from "@/components/site/QuickViewModal";
import { products, categories, collections } from "@/data/products";
import type { Product } from "@/data/products";

type Search = { category?: string; sub?: string };
export const Route = createFileRoute("/products")({
  validateSearch: (s: Record<string, unknown>): Search => ({
    category: typeof s.category === "string" ? s.category : undefined,
    sub: typeof s.sub === "string" ? s.sub : undefined,
  }),
  component: Listing,
});

const PER_PAGE = 6;

function Listing() {
  const { category: cat0 } = Route.useSearch();
  const [category, setCategory] = useState(cat0 || "");
  const [material, setMaterial] = useState("");
  const [sort, setSort] = useState("featured");
  const [page, setPage] = useState(1);
  const [qv, setQv] = useState<Product | null>(null);
  const [matFilter, setMatFilter] = useState<string[]>([]);
  const [colorFilter, setColorFilter] = useState<string[]>([]);
  const [collFilter, setCollFilter] = useState<string[]>([]);

  const toggle = (arr: string[], set: (v: string[]) => void, v: string) =>
    set(arr.includes(v) ? arr.filter((x) => x !== v) : [...arr, v]);

  const filtered = useMemo(() => {
    let r = [...products];
    if (category) r = r.filter((p) => p.category === category);
    if (material) r = r.filter((p) => p.material === material);
    if (matFilter.length) r = r.filter((p) => matFilter.includes(p.material));
    if (colorFilter.length) r = r.filter((p) => colorFilter.includes(p.color));
    if (collFilter.length) r = r.filter((p) => collFilter.includes(p.collection));
    if (sort === "low") r.sort((a, b) => a.price - b.price);
    else if (sort === "high") r.sort((a, b) => b.price - a.price);
    else if (sort === "newest") r.sort((a, b) => b.id - a.id);
    else if (sort === "rated") r.sort((a, b) => b.rating - a.rating);
    return r;
  }, [category, material, matFilter, colorFilter, collFilter, sort]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PER_PAGE));
  const cur = filtered.slice((page - 1) * PER_PAGE, page * PER_PAGE);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="bg-secondary py-6">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-3xl font-serif">{category || "All Furniture"}</h1>
          <div className="text-sm text-muted-foreground">{filtered.length} products</div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-8 grid lg:grid-cols-[260px_1fr] gap-8">
        {/* Sidebar */}
        <aside className="space-y-6">
          <div>
            <h3 className="font-semibold mb-3">Material</h3>
            {["Wood", "Metal", "Fabric", "Leather"].map((m) => (
              <label key={m} className="flex items-center gap-2 text-sm py-1">
                <input id={`filter-${m.toLowerCase()}`} type="checkbox" checked={matFilter.includes(m)} onChange={() => toggle(matFilter, setMatFilter, m)} />
                {m}
              </label>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-3">Color</h3>
            {["Brown", "White", "Black", "Grey", "Beige"].map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm py-1">
                <input type="checkbox" checked={colorFilter.includes(c)} onChange={() => toggle(colorFilter, setColorFilter, c)} />
                {c}
              </label>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-3">Collection</h3>
            {collections.map((c) => (
              <label key={c} className="flex items-center gap-2 text-sm py-1">
                <input type="checkbox" checked={collFilter.includes(c)} onChange={() => toggle(collFilter, setCollFilter, c)} />
                {c}
              </label>
            ))}
          </div>
          <div>
            <h3 className="font-semibold mb-3">Delivery</h3>
            <label className="flex items-center gap-2 text-sm py-1"><input type="radio" name="delivery-type" defaultChecked /> Home Delivery</label>
            <label className="flex items-center gap-2 text-sm py-1"><input type="radio" name="delivery-type" /> Store Pickup</label>
          </div>
          <div>
            <h3 className="font-semibold mb-3">Assembly</h3>
            <label className="flex items-center gap-2 text-sm py-1"><input type="radio" name="assembly-type" defaultChecked /> With Assembly</label>
            <label className="flex items-center gap-2 text-sm py-1"><input type="radio" name="assembly-type" /> Without Assembly</label>
          </div>
        </aside>

        {/* Main */}
        <div>
          <div className="flex flex-wrap items-center gap-3 mb-6">
            <label className="text-sm">Category:
              <select id="category-select" value={category} onChange={(e) => { setCategory(e.target.value); setPage(1); }} className="ml-2 border rounded px-2 py-1.5 text-sm">
                <option value="">All</option>
                {categories.map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="text-sm">Material:
              <select id="material-select" value={material} onChange={(e) => { setMaterial(e.target.value); setPage(1); }} className="ml-2 border rounded px-2 py-1.5 text-sm">
                <option value="">All</option>
                {["Wood", "Metal", "Fabric", "Leather", "Leatherette"].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </label>
            <label className="text-sm ml-auto">Sort By:
              <select id="sort-select" value={sort} onChange={(e) => setSort(e.target.value)} className="ml-2 border rounded px-2 py-1.5 text-sm">
                <option value="featured">Featured</option>
                <option value="low">Price Low to High</option>
                <option value="high">Price High to Low</option>
                <option value="newest">Newest</option>
                <option value="rated">Top Rated</option>
              </select>
            </label>
          </div>

          {cur.length === 0 ? (
            <div className="text-center py-16 text-muted-foreground">No products match your filters.</div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
              {cur.map((p) => <ProductCard key={p.id} p={p} onQuickView={setQv} />)}
            </div>
          )}

          {/* Pagination */}
          <div className="pagination flex justify-center gap-2 mt-10">
            <button disabled={page === 1} onClick={() => setPage(page - 1)} className="px-3 py-1.5 border rounded disabled:opacity-40">Previous</button>
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <button key={n} onClick={() => setPage(n)} className={`px-3 py-1.5 border rounded ${n === page ? "bg-navy text-white" : ""}`}>{n}</button>
            ))}
            <button disabled={page === totalPages} onClick={() => setPage(page + 1)} className="px-3 py-1.5 border rounded disabled:opacity-40">Next</button>
          </div>
        </div>
      </div>
      <Footer />
      <QuickViewModal p={qv} onClose={() => setQv(null)} />
    </div>
  );
}
