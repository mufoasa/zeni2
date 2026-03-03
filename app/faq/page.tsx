import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";


export default function FAQPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-16">
      <h1 className="mb-6 text-3xl font-bold">Frequently Asked Questions</h1>

      <div className="space-y-6 text-muted-foreground">
        <div>
          <h2 className="font-semibold">How do I order?</h2>
          <p>Add items to cart and proceed to checkout.</p>
        </div>

        <div>
          <h2 className="font-semibold">Payment methods?</h2>
          <p>Cash on delivery at the moment, we will add more payment methods soon!</p>
        </div>
      </div>
    </main>
  );
}
