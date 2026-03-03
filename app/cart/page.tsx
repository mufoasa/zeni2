"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, Trash2, ArrowLeft, ShoppingBag } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { formatPrice } from "@/lib/translations";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";

export default function CartPage() {
  const { items, removeItem, updateQuantity, totalPrice } = useCart();
  const { t } = useLocale();

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
          <ShoppingBag className="h-16 w-16 text-muted-foreground" />
          <h1 className="mt-6 font-display text-3xl font-bold text-foreground">
            {t("yourCartEmpty")}
          </h1>
          <p className="mt-3 text-muted-foreground">{t("noItemsYet")}</p>
          <Link
            href="/shop"
            className="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("startShopping")}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-5xl px-6 py-12">
          <Link
            href="/shop"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("continueShopping")}
          </Link>

          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
            {t("shoppingCart")}
          </h1>

          <div className="mt-10 grid gap-12 lg:grid-cols-3">
            {/* Cart Items */}
            <div className="lg:col-span-2">
              <div className="flex flex-col gap-6">
                {items.map((item) => (
                  <div
                    key={`${item.product.id}-${item.size}`}
                    className="flex gap-5 rounded-xl border border-border bg-card p-4"
                  >
                    <div className="relative h-28 w-22 flex-shrink-0 overflow-hidden rounded-lg bg-secondary">
                      {item.product.images[0] && (
                        <Image
                          src={item.product.images[0] || "/placeholder.svg"}
                          alt={item.product.name}
                          fill
                          className="object-cover"
                          sizes="88px"
                        />
                      )}
                    </div>
                    <div className="flex flex-1 flex-col justify-between">
                      <div>
                        <h3 className="font-medium text-foreground">
                          {item.product.name}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {t("size")}: {item.size}
                        </p>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity - 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-muted"
                          >
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="w-6 text-center text-sm font-medium text-foreground">
                            {item.quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() =>
                              updateQuantity(
                                item.product.id,
                                item.size,
                                item.quantity + 1
                              )
                            }
                            className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary text-secondary-foreground transition-colors hover:bg-muted"
                          >
                            <Plus className="h-3 w-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              removeItem(item.product.id, item.size)
                            }
                            className="ml-2 flex h-8 w-8 items-center justify-center rounded-md text-muted-foreground transition-colors hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>
                        <p className="text-sm font-semibold text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="rounded-xl border border-border bg-card p-6">
                <h2 className="font-display text-lg font-bold text-foreground">
                  {t("orderSummary")}
                </h2>
                <div className="mt-6 flex flex-col gap-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("subtotal")}
                    </span>
                    <span className="text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("shipping")}
                    </span>
                    <span className="text-foreground">{t("free")}</span>
                  </div>
                  <div className="my-2 border-t border-border" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">
                      {t("total")}
                    </span>
                    <span className="text-lg font-bold text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>
                <Link
                  href="/checkout"
                  className="mt-6 flex w-full items-center justify-center rounded-lg bg-primary px-8 py-3.5 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
                >
                  {t("proceedToCheckout")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
