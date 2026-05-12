import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const Route = createFileRoute("/store-locator")({ component: StoreLocator });

function StoreLocator() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-6xl mx-auto px-4 py-10 w-full">
        <h1 className="text-3xl font-serif mb-2">Find a Store Near You</h1>
        <p className="text-muted-foreground mb-6">200+ stores across India.</p>
        <iframe
          id="store-map"
          title="Store Map"
          src="https://www.openstreetmap.org/export/embed.html?bbox=77.4,12.85,77.75,13.1&layer=mapnik"
          className="w-full h-[500px] border rounded"
        />
        <div className="mt-6 grid md:grid-cols-3 gap-4">
          {["Bangalore — MG Road", "Mumbai — Bandra", "Delhi — Saket"].map((s) => (
            <div key={s} className="border rounded p-4">
              <div className="font-semibold">{s}</div>
              <div className="text-sm text-muted-foreground mt-1">Open: 10 AM – 9 PM</div>
            </div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
}
