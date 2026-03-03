import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function ReturnsPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-4xl px-6 py-20 space-y-10">
        <h1 className="text-4xl font-bold">Returns & Exchanges</h1>

        <div className="space-y-6 text-muted-foreground leading-relaxed">
          <p>
            Products can be returned within 14 days if they are unused and in
            original packaging.
          </p>

          <p>
            Please contact customer support before sending items back.
          </p>

          <div className="p-6 border rounded-xl bg-card">
            <h2 className="font-semibold mb-2 text-foreground">
              Return Process
            </h2>

            <ul className="list-disc pl-5 space-y-2">
              <li>Contact support</li>
              <li>Prepare product</li>
              <li>Ship back safely</li>
              <li>Receive confirmation</li>
            </ul>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
