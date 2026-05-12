import { createFileRoute, Link } from "@tanstack/react-router";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import { useShop } from "@/context/ShopContext";

export const Route = createFileRoute("/wishlist")({ component: Wishlist });

function Wishlist() {
  const { wishlist } = useShop();
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-serif mb-6">My Wishlist ({wishlist.length})</h1>
        {wishlist.length === 0 ? (
          <div className="text-center py-16 text-muted-foreground">
            Your wishlist is empty. <Link to="/products" className="text-gold underline">Browse products</Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {wishlist.map((p) => <ProductCard key={p.id} p={p} />)}
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
