"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { formatPrice } from "@/lib/translations";
import { cn } from "@/lib/utils";
import type { ProductWithSizes } from "@/lib/types";

export function ProductDetail({ product }: { product: ProductWithSizes }) {
  const { addItem } = useCart();
  const { t } = useLocale();
  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);

  const sizes = product.product_sizes.sort(
    (a, b) => Number(a.size) - Number(b.size)
  );

  const images = product.images?.length ? product.images : [];

  function handleAddToCart() {
    if (!selectedSize) {
      toast.error(t("pleaseSelectSize"));
      return;
    }
    addItem(product, selectedSize, quantity);
    toast.success(
      `${product.name} (${t("size")} ${selectedSize}) ${t("addedToCart")}`
    );
  }

  const categoryLabel =
    product.category === "new"
      ? t("newArrival")
      : product.category === "men"
        ? t("men")
        : t("women");

  return (
    <div>
      <Link
        href="/shop"
        className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-4 w-4" />
        {t("backToShop")}
      </Link>

      <div className="grid gap-12 lg:grid-cols-2">
        {/* Images */}
        <div className="flex flex-col gap-4">
          {/* Main Image */}
          <div className="relative aspect-[3/4] overflow-hidden rounded-xl bg-secondary">
            {images.length > 0 ? (
              <Image
                src={images[activeImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover transition-opacity duration-300"
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            ) : (
              <div className="flex h-full items-center justify-center text-muted-foreground">
                {t("noImage")}
              </div>
            )}
            {product.category === "new" && (
              <span className="absolute left-4 top-4 rounded-full bg-primary px-4 py-1.5 text-sm font-semibold text-primary-foreground">
                {t("newArrival")}
              </span>
            )}
          </div>

          {/* Thumbnail Strip */}
          {images.length > 1 && (
            <div className="flex gap-3 overflow-x-auto pb-1">
              {images.map((img, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setActiveImage(i)}
                  className={cn(
                    "relative h-20 w-20 shrink-0 overflow-hidden rounded-lg border-2 transition-all",
                    activeImage === i
                      ? "border-primary ring-1 ring-primary"
                      : "border-border opacity-60 hover:opacity-100"
                  )}
                >
                  <Image
                    src={img || "/placeholder.svg"}
                    alt={`${product.name} ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Details */}
        <div className="flex flex-col justify-center">
          <p className="text-sm font-medium uppercase tracking-wider text-primary">
            {categoryLabel}
          </p>
          <h1 className="mt-2 font-display text-4xl font-bold tracking-tight text-foreground">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-bold text-foreground">
            {formatPrice(product.price)}
          </p>
          <p className="mt-6 leading-relaxed text-muted-foreground">
            {product.description}
          </p>

          {/* Sizes */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("size")}
            </h3>
            <div className="flex flex-wrap gap-3">
              {sizes.map((s) => (
                <button
                  key={s.id}
                  type="button"
                  disabled={s.stock === 0}
                  onClick={() => setSelectedSize(s.size)}
                  className={cn(
                    "flex h-12 w-14 items-center justify-center rounded-lg border text-sm font-medium transition-all",
                    selectedSize === s.size
                      ? "border-primary bg-primary text-primary-foreground"
                      : "border-border bg-secondary text-secondary-foreground hover:border-primary/50",
                    s.stock === 0 && "cursor-not-allowed opacity-30"
                  )}
                >
                  {s.size}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity */}
          <div className="mt-8">
            <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("quantity")}
            </h3>
            <div className="flex items-center gap-4">
              <button
                type="button"
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-8 text-center text-lg font-semibold text-foreground">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity(quantity + 1)}
                className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Add to cart */}
          <button
            type="button"
            onClick={handleAddToCart}
            className="mt-10 flex items-center justify-center gap-3 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            <ShoppingBag className="h-5 w-5" />
            {t("addToCart")}
          </button>
        </div>
      </div>
    </div>
  );
}
