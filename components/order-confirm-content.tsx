"use client";

import Link from "next/link";
import { CheckCircle } from "lucide-react";
import { useLocale } from "@/components/locale-provider";

export function OrderConfirmContent({ orderId }: { orderId: string }) {
  const { t } = useLocale();

  return (
    <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
      <CheckCircle className="h-20 w-20 text-primary" />
      <h1 className="mt-6 font-display text-4xl font-bold text-foreground">
        {t("orderConfirmed")}
      </h1>
      <p className="mt-4 max-w-md text-center text-muted-foreground">
        {t("thankYou")}
      </p>
      <p className="mt-2 text-sm text-muted-foreground">
        {t("orderId")}:{" "}
        <span className="font-mono text-foreground">
          {orderId.slice(0, 8)}
        </span>
      </p>
      <Link
        href="/shop"
        className="mt-10 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
      >
        {t("continueShopping")}
      </Link>
    </main>
  );
}
