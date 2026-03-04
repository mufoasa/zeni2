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
      image: "https://i.imgur.com/hjVknz4.png",
    },
    {
      nameKey: "women",
      href: "/shop?category=women",
      image: "https://i.imgur.com/9H6COJe.png",
    },
    {
      nameKey: "newArrivals",
      href: "/shop?category=new",
      image: "https://i.imgur.com/MYeqobH.png",
    },
  ];

  return (
    <main className="flex-1">

      {/* ================= HERO ================= */}
      <section className="relative flex min-h-[85vh] items-center justify-center overflow-hidden">

        <div className="absolute inset-0">
          <video
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 h-full w-full object-cover"
          >
            <source src="/hero-video.mp4" type="video/mp4" />
          </video>

          <div className="absolute inset-0 bg-black/55" />
        </div>

        <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
          <h1 className="font-display text-5xl font-bold leading-tight tracking-tight text-white md:text-7xl lg:text-8xl">
            USTOP
            <span className="block text-primary">JEANS</span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-200 md:text-xl">
            {t("heroSubtitle")}
          </p>

          <div className="mt-10 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground hover:opacity-90"
            >
              {t("shopCollection")}
              <ArrowRight className="h-4 w-4" />
            </Link>

            <Link
              href="/shop?category=new"
              className="inline-flex items-center gap-2 rounded-lg border border-white/30 px-8 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
            >
              {t("newArrivals")}
            </Link>
          </div>
        </div>
      </section>

      {/* ================= CATEGORIES ================= */}
      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="mb-12 text-center">
          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {t("shopByCategory")}
          </h2>

          <p className="mt-3 text-muted-foreground">
            {t("findPerfectFit")}
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          {categories.map((cat) => (
            <Link
              key={cat.nameKey}
              href={cat.href}
              className="group relative flex aspect-[4/5] items-end overflow-hidden rounded-xl"
            >
              <Image
                src={cat.image}
                alt={t(cat.nameKey)}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/20 to-transparent" />

              <div className="relative z-10 p-8">
                <h3 className="font-display text-2xl font-bold">
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

      {/* ================= FEATURED PRODUCTS ================= */}
      {featuredProducts.length > 0 && (
        <section className="mx-auto max-w-7xl px-6 pb-24">
          <div className="mb-12 flex justify-between">
            <div>
              <h2 className="font-display text-3xl font-bold md:text-4xl">
                {t("featured")}
              </h2>

              <p className="mt-3 text-muted-foreground">
                {t("popularStyles")}
              </p>
            </div>

            <Link
              href="/shop"
              className="hidden items-center gap-1 text-sm font-medium text-primary sm:inline-flex"
            >
              {t("viewAll")}
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {featuredProducts.map((product) => {
              const totalStock =
                product.product_sizes?.reduce(
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

      {/* ================= BRAND + MAP ================= */}
      <section className="border-t border-border bg-secondary/30">
        <div className="mx-auto max-w-6xl px-6 py-24 text-center">

          <h2 className="font-display text-3xl font-bold md:text-4xl">
            {t("craftedInTetovo")}
          </h2>

          <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
            {t("brandStatement")}
          </p>

          <div className="mt-12 w-full aspect-video overflow-hidden rounded-2xl border shadow-lg">
            <iframe
              className="w-full h-full"
              loading="lazy"
              allowFullScreen
              src="https://maps.google.com/maps?q=Ustop%20Jeans%20Tetovo&output=embed"
            />
          </div>

        </div>
      </section>

    </main>
  );
}
