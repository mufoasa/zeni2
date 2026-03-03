"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";

export function ShopFilters({
  activeCategory,
  activeSort,
}: {
  activeCategory?: string;
  activeSort?: string;
}) {
  const { t } = useLocale();

  const categories = [
    { value: undefined, labelKey: "all" },
    { value: "men", labelKey: "men" },
    { value: "women", labelKey: "women" },
    { value: "new", labelKey: "newArrivals" },
  ];

  const sorts = [
    { value: undefined, labelKey: "newest" },
    { value: "price-asc", labelKey: "priceLowHigh" },
    { value: "price-desc", labelKey: "priceHighLow" },
  ];

  function buildHref(category?: string, sort?: string) {
    const params = new URLSearchParams();
    if (category) params.set("category", category);
    if (sort) params.set("sort", sort);
    const qs = params.toString();
    return `/shop${qs ? `?${qs}` : ""}`;
  }

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap gap-2">
        {categories.map((cat) => (
          <Link
            key={cat.labelKey}
            href={buildHref(cat.value, activeSort)}
            className={cn(
              "rounded-full px-4 py-2 text-sm font-medium transition-colors",
              activeCategory === cat.value ||
                (!activeCategory && !cat.value)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {t(cat.labelKey)}
          </Link>
        ))}
      </div>
      <div className="flex gap-2">
        {sorts.map((sort) => (
          <Link
            key={sort.labelKey}
            href={buildHref(activeCategory, sort.value)}
            className={cn(
              "rounded-full px-4 py-2 text-xs font-medium transition-colors",
              activeSort === sort.value || (!activeSort && !sort.value)
                ? "bg-primary text-primary-foreground"
                : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
            )}
          >
            {t(sort.labelKey)}
          </Link>
        ))}
      </div>
    </div>
  );
}
