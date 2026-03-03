"use client";

import { useLocale } from "@/components/locale-provider";

export function ShopTitle({
  category,
  count,
}: {
  category?: string;
  count: number;
}) {
  const { t } = useLocale();

  const categoryLabels: Record<string, string> = {
    men: t("men"),
    women: t("women"),
    new: t("newArrivals"),
  };

  const title = category ? categoryLabels[category] || t("shopAll") : t("allProducts");

  return (
    <div className="mb-10">
      <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
        {title}
      </h1>
      <p className="mt-2 text-muted-foreground">
        {count} {t("products")}
      </p>
    </div>
  );
}
