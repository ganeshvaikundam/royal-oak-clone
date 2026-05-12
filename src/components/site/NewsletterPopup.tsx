import { useEffect, useState } from "react";
import { X } from "lucide-react";

export default function NewsletterPopup() {
  const [open, setOpen] = useState(false);
  useEffect(() => { const t = setTimeout(() => setOpen(true), 3000); return () => clearTimeout(t); }, []);
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-[200] bg-black/60 flex items-center justify-center p-4">
      <div className="bg-card rounded-lg max-w-md w-full p-8 relative">
        <button onClick={() => setOpen(false)} className="absolute top-3 right-3"><X className="h-5 w-5" /></button>
        <h3 className="text-2xl font-serif text-navy">Get 10% Off Your First Order</h3>
        <p className="text-sm text-muted-foreground mt-2">Sign up for our newsletter and receive exclusive offers.</p>
        <form onSubmit={(e) => { e.preventDefault(); alert("Subscribed! Check your inbox."); setOpen(false); }} className="mt-4 flex gap-2">
          <input required type="email" placeholder="Your email" className="flex-1 border rounded px-3 py-2 text-sm" />
          <button className="bg-gold text-navy px-4 rounded font-semibold">Subscribe</button>
        </form>
      </div>
    </div>
  );
}
