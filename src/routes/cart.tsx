import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";
import { useShop } from "@/context/ShopContext";
import { Trash2 } from "lucide-react";

export const Route = createFileRoute("/cart")({ component: Cart });

function Cart() {
  const { cart, removeFromCart, clearCart } = useShop();
  const [date, setDate] = useState("");
  const total = cart.reduce((s, i) => s + i.product.price * i.qty, 0);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-serif mb-6">Your Cart ({cart.length})</h1>
        {cart.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground">Your cart is empty.</p>
            <Link to="/products" className="inline-block mt-4 bg-navy text-white px-6 py-2 rounded">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid lg:grid-cols-[1fr_320px] gap-8">
            <div className="space-y-3">
              {cart.map((i) => (
                <div key={i.product.id} className="flex gap-4 border rounded p-3">
                  <img src={i.product.image} alt={i.product.name} className="w-24 h-24 object-cover rounded" />
                  <div className="flex-1">
                    <div className="font-medium">{i.product.name}</div>
                    <div className="text-sm text-muted-foreground">Qty: {i.qty}</div>
                    <div className="font-bold mt-1">₹{(i.product.price * i.qty).toLocaleString()}</div>
                  </div>
                  <button onClick={() => removeFromCart(i.product.id)} className="text-destructive"><Trash2 className="h-4 w-4" /></button>
                </div>
              ))}
              <button onClick={clearCart} className="text-sm text-destructive">Clear cart</button>
            </div>
            <div className="border rounded p-5 h-fit space-y-4">
              <h3 className="font-semibold">Order Summary</h3>
              <div className="flex justify-between text-sm"><span>Subtotal</span><span>₹{total.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm"><span>Shipping</span><span>FREE</span></div>
              <div className="flex justify-between font-bold border-t pt-2"><span>Total</span><span>₹{total.toLocaleString()}</span></div>

              <label className="block text-sm">Choose Delivery Date
                <input id="delivery-date" type="date" value={date} onChange={(e) => setDate(e.target.value)} className="w-full mt-1 border rounded px-2 py-1.5" />
              </label>

              <button id="checkout-btn" disabled={cart.length === 0} onClick={() => { import("sonner").then(m => m.toast.success("Order placed successfully!")); }} className="w-full bg-gold text-navy py-3 rounded font-semibold disabled:opacity-50">Proceed to Checkout</button>
            </div>
          </div>
        )}
      </div>
      <Footer />
    </div>
  );
}
