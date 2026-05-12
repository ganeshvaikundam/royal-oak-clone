import { createFileRoute } from "@tanstack/react-router";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const Route = createFileRoute("/about")({ component: About });
function About() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-serif mb-6">About RegalOak</h1>
        <p className="text-muted-foreground leading-relaxed">RegalOak Furniture has been crafting premium furniture for Indian homes since 1999. With over 200 stores across the country, we bring you exclusive international collections curated from Italy, America, Malaysia and more.</p>
        <p className="text-muted-foreground leading-relaxed mt-4">Every piece is built with sustainably sourced materials and backed by industry-leading warranties.</p>
      </div>
      <Footer />
    </div>
  );
}
