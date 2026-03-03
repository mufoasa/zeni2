import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function TermsPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Terms of Service
          </h1>
          <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              Welcome to USTOP Jeans. By accessing or using our website and
              services, you agree to be bound by these Terms of Service. Please
              read them carefully.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              1. General Terms
            </h2>
            <p>
              By placing an order through our website, you confirm that you are
              at least 18 years of age and that the information you provide is
              accurate. We reserve the right to refuse service to anyone for any
              reason at any time.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              2. Products & Pricing
            </h2>
            <p>
              All prices are listed in Macedonian Denars (MKD). We strive to
              display accurate pricing and product information, but errors may
              occur. We reserve the right to correct pricing errors and cancel
              affected orders.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              3. Shipping & Delivery
            </h2>
            <p>
              We deliver to addresses within North Macedonia. Delivery times are
              estimates and not guaranteed. Standard delivery is free for all
              orders. Cash on delivery is the primary payment method.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              4. Returns & Exchanges
            </h2>
            <p>
              Items can be returned within 14 days of delivery in their original
              condition with tags attached. To initiate a return, please contact
              us at info@ustopjeans.com.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              5. Contact
            </h2>
            <p>
              For any questions regarding these terms, please contact us at
              info@ustopjeans.com or call +389 70 000 000.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
