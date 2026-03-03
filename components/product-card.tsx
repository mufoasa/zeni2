"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { formatPrice } from "@/lib/translations";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export function ProductCard({
  product,
  totalStock,
}: {
  product: Product;
  totalStock?: number;
}) {
  const { t } = useLocale();
  const isSoldOut = totalStock !== undefined && totalStock <= 0;

  return (
    <Link
      href={`/product/${product.slug}`}
      className="group block overflow-hidden"
    >
      <div className="relative aspect-[3/4] overflow-hidden rounded-lg bg-secondary">
        {product.images[0] ? (
          <Image
            src={product.images[0] || "/placeholder.svg"}
            alt={product.name}
            fill
            className={cn(
              "object-cover transition-transform duration-500 group-hover:scale-105",
              isSoldOut && "opacity-40 grayscale"
            )}
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            {t("noImage")}
          </div>
        )}
        {isSoldOut && (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-lg bg-background/90 px-5 py-2 text-sm font-bold uppercase tracking-wider text-destructive">
              {t("soldOut")}
            </span>
          </div>
        )}
        {!isSoldOut && product.category === "new" && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {t("newArrival")}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className={cn(
          "text-sm font-semibold",
          isSoldOut ? "text-destructive line-through" : "text-muted-foreground"
        )}>
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
