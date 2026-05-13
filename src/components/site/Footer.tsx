import { Link } from "@tanstack/react-router";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-navy text-white/90 mt-20">
      <div className="max-w-7xl mx-auto px-4 py-14 grid md:grid-cols-5 gap-8">
        <div className="md:col-span-2">
          <div className="text-2xl font-serif font-bold mb-3">REGAL<span className="text-gold">OAK</span></div>
          <p className="text-sm text-white/70 mb-4">Premium furniture crafted with passion. Bringing world-class collections to your home since 1999.</p>
          <div className="flex gap-3 mb-5">
            <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy"><Facebook className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy"><Instagram className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy"><Twitter className="h-4 w-4" /></a>
            <a href="#" className="h-9 w-9 rounded-full bg-white/10 flex items-center justify-center hover:bg-gold hover:text-navy"><Youtube className="h-4 w-4" /></a>
          </div>
          <form onSubmit={(e) => { e.preventDefault(); import("sonner").then(m => m.toast.success("Subscribed successfully!")); (e.currentTarget as HTMLFormElement).reset(); }} className="flex max-w-sm">
            <input required type="email" placeholder="Your email" className="flex-1 px-3 py-2 text-sm text-foreground rounded-l outline-none" />
            <button className="bg-gold text-navy px-4 text-sm font-semibold rounded-r">Subscribe</button>
          </form>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-3 text-sm">Shop</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/products">Living</Link></li>
            <li><Link to="/products">Bedroom</Link></li>
            <li><Link to="/products">Dining</Link></li>
            <li><Link to="/products">Office</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-3 text-sm">Help</h4>
          <ul className="space-y-2 text-sm text-white/70">
            <li><Link to="/track-order">Track Order</Link></li>
            <li><Link to="/contact">Customer Support</Link></li>
            <li><Link to="/store-locator">Store Locator</Link></li>
            <li><Link to="/about">About Us</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="text-gold font-semibold mb-3 text-sm">Download App</h4>
          <div className="space-y-2">
            <div className="bg-white/10 rounded px-3 py-2 text-xs">📱 App Store</div>
            <div className="bg-white/10 rounded px-3 py-2 text-xs">▶ Google Play</div>
          </div>
          <div className="mt-4 text-xs text-white/60">We Accept</div>
          <div className="flex gap-2 mt-2 text-xs">
            <span className="bg-white text-navy px-2 py-1 rounded">VISA</span>
            <span className="bg-white text-navy px-2 py-1 rounded">MC</span>
            <span className="bg-white text-navy px-2 py-1 rounded">UPI</span>
            <span className="bg-white text-navy px-2 py-1 rounded">AMEX</span>
          </div>
        </div>
      </div>
      <div className="border-t border-white/10 py-4 text-center text-xs text-white/60">© 2026 RegalOak Furniture. All rights reserved.</div>
    </footer>
  );
}
