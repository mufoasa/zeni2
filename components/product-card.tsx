"use client";

import Image from "next/image";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { formatPrice } from "@/lib/translations";
import type { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const { t } = useLocale();

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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 50vw, 25vw"
          />
        ) : (
          <div className="flex h-full items-center justify-center text-muted-foreground">
            {t("noImage")}
          </div>
        )}
        {product.category === "new" && (
          <span className="absolute left-3 top-3 rounded-full bg-primary px-3 py-1 text-xs font-semibold text-primary-foreground">
            {t("newArrival")}
          </span>
        )}
      </div>
      <div className="mt-4 flex flex-col gap-1">
        <h3 className="text-sm font-medium text-foreground transition-colors group-hover:text-primary">
          {product.name}
        </h3>
        <p className="text-sm font-semibold text-muted-foreground">
          {formatPrice(product.price)}
        </p>
      </div>
    </Link>
  );
}
