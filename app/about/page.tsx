import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function AboutPage() {
  return (
    <>
      <SiteHeader />

      <main className="mx-auto max-w-5xl px-6 py-20">
        <div className="space-y-10">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold tracking-tight">About USTOP Jeans</h1>
            <p className="text-muted-foreground leading-relaxed max-w-3xl">
              USTOP Jeans is a modern clothing brand focused on high quality denim
              products built for comfort, durability, and urban style.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10 text-muted-foreground">
            <p>
              Our mission is to deliver premium fashion products with clean design
              and long lasting material quality.
            </p>

            <p>
              We believe clothing should combine style, comfort, and confidence.
              Every product is carefully selected and tested.
            </p>
          </div>
        </div>
      </main>

      <SiteFooter />
    </>
  );
}
