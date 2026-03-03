import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-20">
          <h1 className="font-display text-3xl font-bold text-foreground">
            Privacy Policy
          </h1>
          <div className="mt-8 flex flex-col gap-6 text-sm leading-relaxed text-muted-foreground">
            <p>
              USTOP Jeans is committed to protecting your privacy. This policy
              explains how we collect, use, and safeguard your personal
              information.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              1. Information We Collect
            </h2>
            <p>
              When you place an order, we collect your name, email address,
              phone number, and shipping address. This information is necessary
              to process and deliver your order.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              2. How We Use Your Information
            </h2>
            <p>
              We use your personal information solely for order processing,
              delivery, and customer support. We do not sell, trade, or share
              your information with third parties for marketing purposes.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              3. Data Security
            </h2>
            <p>
              We implement appropriate security measures to protect your
              personal data. However, no method of transmission over the
              internet is 100% secure.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              4. Cookies
            </h2>
            <p>
              Our website uses essential cookies to maintain your shopping cart
              and language preferences. We do not use tracking or advertising
              cookies.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              5. Your Rights
            </h2>
            <p>
              You have the right to access, correct, or delete your personal
              data at any time. Contact us at info@ustopjeans.com to exercise
              these rights.
            </p>
            <h2 className="text-lg font-semibold text-foreground">
              6. Contact
            </h2>
            <p>
              For privacy-related inquiries, email us at info@ustopjeans.com or
              call +389 70 000 000.
            </p>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
