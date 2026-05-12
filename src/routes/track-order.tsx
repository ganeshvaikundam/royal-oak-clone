import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const Route = createFileRoute("/track-order")({ component: Track });
function Track() {
  const [msg, setMsg] = useState("");
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-serif mb-6">Track Your Order</h1>
        <form onSubmit={(e) => { e.preventDefault(); const id = (e.currentTarget.elements.namedItem("oid") as HTMLInputElement).value; setMsg(id ? `Order ${id}: Out for delivery, expected tomorrow.` : "Enter an order ID."); }} className="flex gap-2">
          <input id="order-id" name="oid" placeholder="Enter Order ID (e.g. RO123456)" className="flex-1 border rounded px-3 py-2" />
          <button className="bg-navy text-white px-5 rounded">Track</button>
        </form>
        {msg && <div className="mt-6 p-4 bg-secondary rounded">{msg}</div>}
      </div>
      <Footer />
    </div>
  );
}
