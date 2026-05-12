import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import ProductCard from "@/components/site/ProductCard";
import QuickViewModal from "@/components/site/QuickViewModal";
import NewsletterPopup from "@/components/site/NewsletterPopup";
import { products } from "@/data/products";
import type { Product } from "@/data/products";

export const Route = createFileRoute("/")({ component: Home });

const heroes = [
  { img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=1600&q=70", title: "The Italian Collection", sub: "Luxury crafted by master artisans", cta: "Explore Now" },
  { img: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?auto=format&fit=crop&w=1600&q=70", title: "Festive Sale — Up to 60% Off", sub: "On sofas, beds & dining sets", cta: "Shop Sale" },
  { img: "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=1600&q=70", title: "Outdoor Living", sub: "Bring elegance to your patio", cta: "Discover" },
];

const tiles = [
  { name: "Sofas", img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=400&q=70" },
  { name: "Recliners", img: "https://images.unsplash.com/photo-1567538096630-e0c55bd6374c?auto=format&fit=crop&w=400&q=70" },
  { name: "Beds", img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?auto=format&fit=crop&w=400&q=70" },
  { name: "Wardrobes", img: "https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=400&q=70" },
  { name: "Dining", img: "https://images.unsplash.com/photo-1577140917170-285929fb55b7?auto=format&fit=crop&w=400&q=70" },
  { name: "Office", img: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?auto=format&fit=crop&w=400&q=70" },
];

function Home() {
  const [slide, setSlide] = useState(0);
  const [qv, setQv] = useState<Product | null>(null);
  const [count, setCount] = useState(8);
  const featured = products.slice(0, count);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <NewsletterPopup />

      {/* Hero */}
      <section className="relative h-[70vh] overflow-hidden">
        {heroes.map((h, i) => (
          <div key={i} className={`absolute inset-0 transition-opacity duration-700 ${i === slide ? "opacity-100" : "opacity-0"}`}>
            <img src={h.img} alt={h.title} className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent" />
            <div className="absolute inset-0 flex items-center max-w-7xl mx-auto px-8">
              <div className="text-white max-w-lg">
                <div className="text-gold uppercase tracking-[0.3em] text-xs">Premium Collection</div>
                <h1 className="font-serif text-5xl md:text-6xl mt-3 leading-tight">{h.title}</h1>
                <p className="mt-3 text-white/80">{h.sub}</p>
                <Link to="/products" className="inline-block mt-6 bg-gold text-navy px-6 py-3 rounded font-semibold hover:bg-white">{h.cta}</Link>
              </div>
            </div>
          </div>
        ))}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroes.map((_, i) => (
            <button key={i} onClick={() => setSlide(i)} className={`h-2 rounded-full transition-all ${i === slide ? "bg-gold w-8" : "bg-white/50 w-2"}`} />
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl text-center font-serif mb-2">Shop by Category</h2>
        <div className="h-1 w-16 bg-gold mx-auto mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {tiles.map((t) => (
            <Link key={t.name} to="/products" search={{ category: t.name } as any} className="group text-center">
              <div className="aspect-square rounded-full overflow-hidden border-4 border-secondary group-hover:border-gold transition">
                <img src={t.img} alt={t.name} className="w-full h-full object-cover group-hover:scale-110 transition" />
              </div>
              <div className="mt-3 font-medium group-hover:text-gold">{t.name}</div>
            </Link>
          ))}
        </div>
      </section>

      {/* Offer banner */}
      <section className="bg-navy text-white py-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <div className="text-gold uppercase tracking-[0.3em] text-xs">Limited Time</div>
          <h2 className="text-4xl mt-2">Festive Sale — Flat 40% Off</h2>
          <p className="mt-2 text-white/70">+ No-Cost EMI · Free Delivery · 5-Year Warranty</p>
          <Link to="/products" className="inline-block mt-5 bg-gold text-navy px-6 py-3 rounded font-semibold">Shop Now</Link>
        </div>
      </section>

      {/* Featured */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl text-center font-serif mb-2">Featured Products</h2>
        <div className="h-1 w-16 bg-gold mx-auto mb-10" />
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {featured.map((p) => <ProductCard key={p.id} p={p} onQuickView={setQv} />)}
        </div>
        {count < products.length && (
          <div className="text-center mt-8">
            <button onClick={() => setCount((c) => Math.min(c + 4, products.length))} className="border-2 border-navy text-navy px-8 py-3 rounded font-semibold hover:bg-navy hover:text-white">Load More Products</button>
          </div>
        )}
      </section>

      {/* Brand story */}
      <section className="bg-secondary py-14">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="text-gold uppercase tracking-[0.3em] text-xs">Our Story</div>
          <h2 className="text-3xl mt-2 font-serif">Crafting Legacy Since 1999</h2>
          <p className="mt-4 text-muted-foreground">From a single workshop to over 200 stores nationwide, RegalOak has redefined premium furniture in India. Every piece is a celebration of craftsmanship, design, and uncompromising quality.</p>
        </div>
      </section>

      {/* Testimonials */}
      <section className="max-w-7xl mx-auto px-4 py-14">
        <h2 className="text-3xl text-center font-serif mb-10">What Our Customers Say</h2>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { n: "Priya S.", t: "Beautiful craftsmanship and on-time delivery. The Verona bed is stunning!" },
            { n: "Rajesh M.", t: "Excellent service. Bought a complete dining set — quality beyond expectation." },
            { n: "Anita K.", t: "The Italian sofa is the centerpiece of our living room. Worth every rupee." },
          ].map((r) => (
            <div key={r.n} className="bg-card border rounded-lg p-6">
              <div className="text-gold mb-2">★★★★★</div>
              <p className="text-sm text-muted-foreground">"{r.t}"</p>
              <div className="mt-3 font-semibold">— {r.n}</div>
            </div>
          ))}
        </div>
      </section>

      <Footer />
      <QuickViewModal p={qv} onClose={() => setQv(null)} />
    </div>
  );
}
