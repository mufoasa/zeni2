import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ShippingPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-20 space-y-10">
        <h1 className="text-4xl font-bold">Shipping Information</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>Orders are usually processed within 1-2 business days.</p>
          <p>Delivery time depends on your location.</p>
          <p>Cash on delivery is currently supported.</p>

          <div className="p-6 border rounded-xl bg-card">
            <h2 className="font-semibold mb-2 text-foreground">
              Delivery Policy
            </h2>
            <p>
              Shipping costs may vary depending on destination and order size.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
