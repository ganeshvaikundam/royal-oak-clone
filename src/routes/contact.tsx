import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const Route = createFileRoute("/contact")({ component: Contact });

function Contact() {
  const [errs, setErrs] = useState<Record<string, string>>({});
  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const name = String(f.get("name") || "");
    const email = String(f.get("email") || "");
    const phone = String(f.get("phone") || "");
    const city = String(f.get("city") || "");
    const message = String(f.get("message") || "");
    const er: Record<string, string> = {};
    if (!name.trim()) er.name = "Name is required";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) er.email = "Invalid email";
    if (!/^\d{10}$/.test(phone)) er.phone = "Phone must be 10 digits";
    if (!city.trim()) er.city = "City is required";
    if (!message.trim()) er.message = "Message is required";
    setErrs(er);
    if (Object.keys(er).length === 0) {
      (await import("sonner")).toast.success("Message sent successfully! We'll get back to you soon.");
      e.currentTarget.reset();
    }
  };
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="max-w-3xl mx-auto px-4 py-12 w-full">
        <h1 className="text-3xl font-serif mb-2">Contact Us</h1>
        <p className="text-muted-foreground mb-8">We'd love to hear from you. Fill the form below and our team will respond shortly.</p>
        <form id="contact-form" onSubmit={submit} className="space-y-4">
          {[
            { id: "name", label: "Name", type: "text" },
            { id: "email", label: "Email", type: "email" },
            { id: "phone", label: "Phone", type: "tel" },
            { id: "city", label: "City", type: "text" },
          ].map((f) => (
            <div key={f.id}>
              <label className="block text-sm mb-1">{f.label}</label>
              <input id={f.id} name={f.id} type={f.type} className="w-full border rounded px-3 py-2" />
              {errs[f.id] && <div className="text-xs text-destructive mt-1">{errs[f.id]}</div>}
            </div>
          ))}
          <div>
            <label className="block text-sm mb-1">Message</label>
            <textarea id="message" name="message" rows={4} className="w-full border rounded px-3 py-2" />
            {errs.message && <div className="text-xs text-destructive mt-1">{errs.message}</div>}
          </div>
          <button id="contact-submit" type="submit" className="bg-navy text-white px-6 py-3 rounded font-semibold">Send Message</button>
        </form>
      </div>
      <Footer />
    </div>
  );
}
