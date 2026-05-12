import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { products } from "@/data/products";
import { useShop } from "@/context/ShopContext";
import { Heart, ShoppingCart, ChevronDown } from "lucide-react";

export const Route = createFileRoute("/product/$id")({ component: PDP });

function PDP() {
  const { id } = useParams({ from: "/product/$id" });
  const p = products.find((x) => x.id === Number(id));
  const { addToCart, toggleWishlist, inWishlist } = useShop();
  const [qty, setQty] = useState("1");
  const [pin, setPin] = useState("");
  const [pinMsg, setPinMsg] = useState("");
  const [emi, setEmi] = useState("");
  const [emiMsg, setEmiMsg] = useState("");
  const [openEmi, setOpenEmi] = useState(false);

  if (!p) return <div className="p-10">Product not found</div>;

  const checkPin = () => {
    if (!/^\d{6}$/.test(pin)) { setPinMsg("Please enter a valid 6-digit pincode."); return; }
    setPinMsg(`Delivery available to ${pin} in 5-7 working days.`);
  };
  const calcEmi = () => {
    const a = Number(emi);
    if (!a) return setEmiMsg("Enter a valid amount.");
    setEmiMsg(`EMI starts from ₹${Math.round(a / 12).toLocaleString()}/month for 12 months at 0% interest.`);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-10 grid lg:grid-cols-2 gap-12">
        <div>
          <img src={p.image} alt={p.name} className="w-full rounded-lg" />
        </div>
        <div>
          <div className="text-xs uppercase tracking-wider text-muted-foreground">{p.category} · {p.collection}</div>
          <h1 className="text-3xl font-serif mt-1">{p.name}</h1>
          <div className="text-amber-500 mt-1">★ {p.rating} ({Math.floor(p.rating * 20)} reviews)</div>
          <div className="flex items-baseline gap-3 mt-4">
            <span className="text-3xl font-bold text-navy">₹{p.price.toLocaleString()}</span>
            <span className="line-through text-muted-foreground">₹{p.mrp.toLocaleString()}</span>
            <span className="text-green-600 font-semibold">{p.discount}% OFF</span>
          </div>
          <p className="text-muted-foreground mt-4">{p.description}</p>

          <div className="mt-6 flex items-center gap-4">
            <label className="text-sm">Qty:
              <select id="quantity-select" value={qty} onChange={(e) => setQty(e.target.value)} className="ml-2 border rounded px-3 py-2">
                {[1, 2, 3, 4, 5].map((n) => <option key={n} value={n}>{n}</option>)}
              </select>
            </label>
          </div>

          <div className="flex gap-3 mt-6">
            <button onClick={() => { addToCart(p, Number(qty)); if (window.confirm("Item added to cart! Continue shopping?")) {} else window.open("/cart", "cartWindow", "width=1100,height=800"); }} className="add-to-cart-btn flex-1 bg-navy text-white py-3 rounded font-semibold flex items-center justify-center gap-2 hover:bg-gold hover:text-navy">
              <ShoppingCart className="h-4 w-4" /> Add to Cart
            </button>
            <button onClick={() => toggleWishlist(p)} className="wishlist-btn border-2 border-navy py-3 px-5 rounded">
              <Heart className={`h-5 w-5 ${inWishlist(p.id) ? "fill-destructive text-destructive" : ""}`} />
            </button>
          </div>

          {/* Delivery check */}
          <div className="mt-8 border-t pt-6">
            <h3 className="font-semibold mb-2">Check Delivery</h3>
            <div className="flex gap-2">
              <input id="pincode-input" value={pin} onChange={(e) => setPin(e.target.value)} placeholder="Enter pincode" className="border rounded px-3 py-2 flex-1" />
              <select id="city-select" className="border rounded px-3 py-2">
                <option>Bangalore</option><option>Mumbai</option><option>Delhi</option><option>Chennai</option><option>Hyderabad</option>
              </select>
              <button onClick={checkPin} className="bg-navy text-white px-4 rounded">Check</button>
            </div>
            {pinMsg && <div className="text-sm text-green-600 mt-2">{pinMsg}</div>}
          </div>

          {/* EMI accordion */}
          <div className="mt-6 border-t pt-6">
            <button onClick={() => setOpenEmi(!openEmi)} className="w-full flex justify-between items-center font-semibold">
              EMI Calculator <ChevronDown className={`h-4 w-4 transition ${openEmi ? "rotate-180" : ""}`} />
            </button>
            {openEmi && (
              <div className="mt-3 flex gap-2">
                <input id="emi-amount" value={emi} onChange={(e) => setEmi(e.target.value)} type="number" placeholder="Amount (₹)" className="border rounded px-3 py-2 flex-1" />
                <button onClick={calcEmi} className="bg-gold text-navy px-4 rounded font-semibold">Calculate</button>
              </div>
            )}
            {emiMsg && <div className="text-sm mt-2 text-muted-foreground">{emiMsg}</div>}
          </div>

          {/* Specs table */}
          <div className="mt-8">
            <h3 className="font-semibold mb-3">Specifications</h3>
            <table id="spec-table" className="w-full text-sm border">
              <tbody>
                <tr className="border-b"><td className="p-2 font-medium bg-secondary w-1/3">Dimensions</td><td className="p-2">{p.specs.dimensions}</td></tr>
                <tr className="border-b"><td className="p-2 font-medium bg-secondary">Material</td><td className="p-2">{p.specs.material}</td></tr>
                <tr className="border-b"><td className="p-2 font-medium bg-secondary">Weight</td><td className="p-2">{p.specs.weight}</td></tr>
                <tr className="border-b"><td className="p-2 font-medium bg-secondary">Color</td><td className="p-2">{p.specs.color}</td></tr>
                <tr><td className="p-2 font-medium bg-secondary">Warranty</td><td className="p-2">{p.specs.warranty}</td></tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
