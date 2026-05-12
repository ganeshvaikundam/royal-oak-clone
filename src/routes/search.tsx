import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import { products } from "@/data/products";

export const Route = createFileRoute("/search")({
  validateSearch: (s: Record<string, unknown>) => ({ q: typeof s.q === "string" ? s.q : "" }),
  component: SearchPage,
});

function SearchPage() {
  const { q } = Route.useSearch();
  const results = q
    ? products.filter((p) =>
        [p.name, p.category, p.material, p.description].some((f) => f.toLowerCase().includes(q.toLowerCase()))
      )
    : [];
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full">
        <h1 className="text-2xl font-serif mb-2">Search results for "{q}"</h1>
        <p className="text-sm text-muted-foreground mb-6">{results.length} products found</p>
        {results.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">No results found. Try a different keyword.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {results.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
