"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { useLocale } from "@/components/locale-provider";
import { ProductCard } from "@/components/product-card";
import type { ProductWithSizes } from "@/lib/types";

export function HomeContent({
  featuredProducts,
}: {
  featuredProducts: ProductWithSizes[];
}) {
  const { t } = useLocale();

  const categories = [
    {
      nameKey: "men",
      href: "/shop?category=men",
      image:
        "https://i.imgur.com/RTiKIoV.png",
    },
    {
      nameKey: "women",
      href: "/shop?category=women",
      image:
        "https://i.imgur.com/CfBSHdq.png",
    },
    {
      nameKey: "newArrivals",
      href: "/shop?category=new",
      image:
        "https://i.imgur.com/MYeqobH.png",
    },
  ];

  return (
    <main className="flex-1">
      {/* Hero Section */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://i.imgur.com/Lkd43MC.jpeg"
            alt="Denim fabric texture"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-background/70" />
        </div>
        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-foreground md:text-7xl lg:text-8xl">
            USTOP
            <span className="block text-primary">JEANS</span>
          </h1>
          <p className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl">
            {t("heroSubtitle")}
          </p>
          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              {t("shopCollection")}
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/shop?category=new"
              className="inline-flex items-center gap-2 rounded-lg border border-border px-8 py-3.5 text-sm font-semibold text-foreground transition-colors hover:bg-secondary"
            >
              {t("newArrivals")}
            </Link>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("shopByCategory")}
          </h2>
          <p className="mt-3 text-muted-foreground">{t("findPerfectFit")}</p>
        </div>
        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.nameKey}
              href={cat.href}
              className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-xl"
            >
              <Image
                src={cat.image || "/placeholder.svg"}
                alt={t(cat.nameKey)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />
              <div className="relative z-10 p-8">
                <h3 className="font-display text-2xl font-bold text-foreground">
                  {t(cat.nameKey)}
                </h3>
                <span className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-primary">
                  {t("shopNow")}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("featured")}
              </h2>
              <p className="mt-3 text-muted-foreground">
                {t("popularStyles")}
              </p>
            </div>
            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-primary transition-opacity hover:opacity-80 sm:inline-flex"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featuredProducts.map((product) => {
              const totalStock = product.product_sizes?.reduce(
                (sum, s) => sum + s.stock,
                0
              ) ?? 0;
              return (
                <ProductCard
                  key={product.id}
                  product={product}
                  totalStock={totalStock}
                />
              );
            })}
          </div>
        </section>
      )}

      {/* Brand Statement */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-4xl px-6 py-24 text-center">
          <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
            {t("craftedInTetovo")}
          </h2>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            {t("brandStatement")}
          </p>
        </div>
      </section>
    </main>
  );
}
