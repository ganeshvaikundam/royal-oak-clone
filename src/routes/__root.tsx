import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Outlet, Link, createRootRouteWithContext, useRouter, HeadContent, Scripts } from "@tanstack/react-router";
import appCss from "../styles.css?url";
import { ShopProvider } from "@/context/ShopContext";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold">404</h1>
        <p className="mt-2 text-sm text-muted-foreground">Page not found.</p>
        <Link to="/" className="inline-block mt-6 rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground">Go home</Link>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  const router = useRouter();
  console.error(error);
  return (
    <div className="p-10 text-center">
      <h1 className="text-xl font-semibold">Something went wrong</h1>
      <button onClick={() => { router.invalidate(); reset(); }} className="mt-4 rounded bg-primary px-4 py-2 text-primary-foreground">Try again</button>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "RegalOak Furniture — Premium Furniture Store" },
      { name: "description", content: "Shop premium furniture: sofas, beds, dining sets, and more." },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", type: "image/svg+xml", href: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Crect width='100' height='100' rx='20' fill='%23222b45'/%3E%3Ctext x='50' y='68' font-family='serif' font-size='60' font-weight='bold' text-anchor='middle' fill='%23d4a64a'%3ER%3C/text%3E%3C/svg%3E" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head><HeadContent /></head>
      <body style={{ fontFamily: "Inter, sans-serif" }}>{children}<Scripts /></body>
    </html>
  );
}
function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <ShopProvider><Outlet /></ShopProvider>
      <Toaster />
    </QueryClientProvider>
  );
}
