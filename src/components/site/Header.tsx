import { Link, useNavigate } from "@tanstack/react-router";
import { useState, useRef, useEffect } from "react";
import { Search, Heart, ShoppingCart, User, MapPin, ChevronDown } from "lucide-react";
import { products, categories, collections } from "@/data/products";
import { useShop } from "@/context/ShopContext";

const megaMenu: Record<string, string[]> = {
  "International Collection": ["Italian", "American", "Malaysian", "Wood World"],
  Living: ["Sofas", "Recliners", "Chairs", "TV Units", "Storage", "Bookshelves"],
  Bedroom: ["Beds", "Wardrobes", "Nightstands", "Dressers", "Mirrors"],
  Dining: ["Dining Sets", "Dining Tables", "Bar Stools", "Crockery Units"],
  Office: ["Office Chairs", "Desks", "Storage", "Conference Tables"],
  Outdoor: ["Patio Sets", "Loungers", "Swings", "Umbrellas"],
  Kids: ["Beds", "Study", "Storage", "Bunk Beds"],
  Mattresses: ["Memory Foam", "Latex", "Spring", "Orthopedic"],
};

export default function Header() {
  const navigate = useNavigate();
  const { cart, wishlist } = useShop();
  const [q, setQ] = useState("");
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [showSug, setShowSug] = useState(false);
  const sugRef = useRef<HTMLFormElement>(null);

  const suggestions = q.trim().length > 0
    ? products.filter((p) =>
        [p.name, p.category, p.material, p.description].some((f) => f.toLowerCase().includes(q.toLowerCase()))
      ).slice(0, 6)
    : [];

  useEffect(() => {
    const h = (e: MouseEvent) => { if (!sugRef.current?.contains(e.target as Node)) setShowSug(false); };
    document.addEventListener("mousedown", h);
    return () => document.removeEventListener("mousedown", h);
  }, []);

  const onSearch = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!q.trim()) return;
    navigate({ to: "/search", search: { q } as any });
    setShowSug(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-background border-b">
      {/* Utility bar */}
      <div className="bg-navy text-white text-xs">
        <div className="max-w-7xl mx-auto px-4 h-9 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="h-3 w-3 text-gold" />
            <span>Deliver to:</span>
            <input id="pincode-top" placeholder="Pincode" className="bg-transparent border-b border-white/30 w-20 outline-none px-1" />
          </div>
          <nav className="hidden md:flex gap-5">
            <Link to="/track-order" className="hover:text-gold">Track Order</Link>
            <Link to="/store-locator" className="hover:text-gold">Store Locator</Link>
            <a href="#" className="hover:text-gold">Franchise Enquiry</a>
            <Link to="/about" className="hover:text-gold">About Us</Link>
            <Link to="/contact" className="hover:text-gold">Customer Support</Link>
            <a href="#" className="hover:text-gold">Careers</a>
          </nav>
        </div>
      </div>

      {/* Main bar */}
      <div className="max-w-7xl mx-auto px-4 h-20 flex items-center justify-between gap-6">
        <Link to="/" className="flex flex-col leading-none">
          <span className="text-2xl font-serif font-bold tracking-wider text-navy">REGAL<span className="text-gold">OAK</span></span>
          <span className="text-[10px] tracking-[0.3em] text-muted-foreground">FURNITURE • SINCE 1999</span>
        </Link>

        <form onSubmit={onSearch} className="flex-1 max-w-xl relative" ref={sugRef}>
          <div className="flex items-center border border-input rounded-full overflow-hidden bg-secondary">
            <input
              id="search-bar"
              value={q}
              onChange={(e) => { setQ(e.target.value); setShowSug(true); }}
              onFocus={() => setShowSug(true)}
              placeholder="Search for sofas, beds, dining sets..."
              className="flex-1 bg-transparent px-5 py-2.5 outline-none text-sm"
            />
            <button type="submit" className="px-5 bg-navy text-white h-full py-2.5"><Search className="h-4 w-4" /></button>
          </div>
          {showSug && suggestions.length > 0 && (
            <div className="absolute top-full mt-1 w-full bg-card border rounded-md shadow-lg overflow-hidden z-50">
              {suggestions.map((p) => (
                <Link key={p.id} to="/product/$id" params={{ id: String(p.id) }}
                  onClick={() => setShowSug(false)}
                  className="flex items-center gap-3 px-4 py-2 hover:bg-secondary text-sm">
                  <img src={p.image} alt="" className="w-10 h-10 object-cover rounded" />
                  <div><div>{p.name}</div><div className="text-xs text-muted-foreground">{p.category}</div></div>
                </Link>
              ))}
            </div>
          )}
        </form>

        <div className="flex items-center gap-5 text-navy">
          <button title="Login"><User className="h-5 w-5" /></button>
          <Link to="/wishlist" className="relative"><Heart className="h-5 w-5" />{wishlist.length > 0 && <span className="absolute -top-2 -right-2 bg-gold text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{wishlist.length}</span>}</Link>
          <button onClick={() => window.open("/cart", "cartWindow", "width=1100,height=800")} className="relative">
            <ShoppingCart className="h-5 w-5" />
            {cart.length > 0 && <span className="absolute -top-2 -right-2 bg-gold text-[10px] rounded-full w-4 h-4 flex items-center justify-center">{cart.length}</span>}
          </button>
        </div>
      </div>

      {/* Mega menu */}
      <nav className="border-t bg-secondary/50">
        <div className="max-w-7xl mx-auto px-4 flex justify-center gap-8 h-11 items-center text-sm font-medium relative">
          {Object.keys(megaMenu).map((cat) => (
            <div key={cat} className="h-full flex items-center" onMouseEnter={() => setOpenMenu(cat)} onMouseLeave={() => setOpenMenu(null)}>
              <Link to="/products" search={{ category: cat } as any} className="flex items-center gap-1 hover:text-gold transition-colors">
                {cat} <ChevronDown className="h-3 w-3" />
              </Link>
              {openMenu === cat && (
                <div className="absolute top-full left-0 right-0 bg-card border-t shadow-xl py-6 z-40">
                  <div className="max-w-7xl mx-auto px-8 grid grid-cols-4 gap-8">
                    {megaMenu[cat].map((s) => (
                      <Link key={s} to="/products" search={{ category: cat, sub: s } as any}
                        className="text-sm text-foreground hover:text-gold py-1 block">{s}</Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </nav>
    </header>
  );
}
