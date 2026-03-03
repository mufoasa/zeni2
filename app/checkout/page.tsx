"use client";

import React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Loader2, Banknote, CreditCard } from "lucide-react";
import { toast } from "sonner";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { formatPrice } from "@/lib/translations";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { createClient } from "@/lib/supabase/client";

export default function CheckoutPage() {
  const { items, totalPrice, clearCart } = useCart();
  const { t } = useLocale();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });

  if (items.length === 0) {
    return (
      <div className="flex min-h-screen flex-col">
        <SiteHeader />
        <main className="flex flex-1 flex-col items-center justify-center px-6 py-24">
          <h1 className="font-display text-3xl font-bold text-foreground">
            {t("noItemsCheckout")}
          </h1>
          <Link
            href="/shop"
            className="mt-6 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
          >
            {t("startShopping")}
          </Link>
        </main>
        <SiteFooter />
      </div>
    );
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.name || !form.email || !form.phone || !form.address) {
      toast.error(t("fillAllFields"));
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();

      const { data: order, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_name: form.name,
          customer_email: form.email,
          customer_phone: form.phone,
          customer_address: form.address,
          total: totalPrice,
          status: "pending",
        })
        .select()
        .single();

      if (orderError) throw orderError;

      const orderItems = items.map((item) => ({
        order_id: order.id,
        product_id: item.product.id,
        product_name: item.product.name,
        product_price: item.product.price,
        size: item.size,
        quantity: item.quantity,
      }));

      const { error: itemsError } = await supabase
        .from("order_items")
        .insert(orderItems);

      if (itemsError) throw itemsError;

      clearCart();
      toast.success(t("orderSuccess"));
      router.push(`/order-confirmation/${order.id}`);
    } catch {
      toast.error(t("orderFailed"));
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <div className="mx-auto max-w-3xl px-6 py-12">
          <Link
            href="/cart"
            className="mb-8 inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            {t("backToCart")}
          </Link>

          <h1 className="font-display text-4xl font-bold tracking-tight text-foreground">
            {t("checkout")}
          </h1>

          <form onSubmit={handleSubmit} className="mt-10">
            <div className="grid gap-10 lg:grid-cols-2">
              {/* Customer Info */}
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {t("shippingInfo")}
                </h2>
                <div className="mt-6 flex flex-col gap-4">
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t("fullName")}
                    </label>
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) =>
                        setForm({ ...form, name: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t("email")}
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) =>
                        setForm({ ...form, email: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="phone"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t("phone")}
                    </label>
                    <input
                      id="phone"
                      type="tel"
                      required
                      value={form.phone}
                      onChange={(e) =>
                        setForm({ ...form, phone: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                      placeholder="+389 70 000 000"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="address"
                      className="mb-1.5 block text-sm font-medium text-foreground"
                    >
                      {t("shippingAddress")}
                    </label>
                    <textarea
                      id="address"
                      required
                      rows={3}
                      value={form.address}
                      onChange={(e) =>
                        setForm({ ...form, address: e.target.value })
                      }
                      className="w-full rounded-lg border border-border bg-secondary px-4 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none focus:ring-1 focus:ring-primary"
                    />
                  </div>
                </div>

                {/* Payment Method */}
                <div className="mt-8">
                  <h2 className="font-display text-lg font-bold text-foreground">
                    {t("paymentMethod")}
                  </h2>
                  <div className="mt-4 flex flex-col gap-3">
                    {/* Cash on Delivery - selected by default */}
                    <div className="flex items-center gap-4 rounded-xl border-2 border-primary bg-primary/5 p-4">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                        <Banknote className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-foreground">{t("cashOnDelivery")}</p>
                        <p className="text-xs text-muted-foreground">{t("cashOnDeliveryDesc")}</p>
                      </div>
                      <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full border-2 border-primary">
                        <div className="h-2.5 w-2.5 rounded-full bg-primary" />
                      </div>
                    </div>

                    {/* Card Payment - disabled / coming soon */}
                    <div className="relative flex cursor-not-allowed items-center gap-4 rounded-xl border border-border bg-secondary/30 p-4 opacity-50">
                      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-secondary">
                        <CreditCard className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-semibold text-muted-foreground">{t("cardPayment")}</p>
                      </div>
                      <span className="shrink-0 rounded-full bg-secondary px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                        {t("comingSoon")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Order Summary */}
              <div>
                <h2 className="font-display text-lg font-bold text-foreground">
                  {t("orderSummary")}
                </h2>
                <div className="mt-6 rounded-xl border border-border bg-card p-5">
                  <div className="flex flex-col gap-3">
                    {items.map((item) => (
                      <div
                        key={`${item.product.id}-${item.size}`}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-muted-foreground">
                          {item.product.name} ({t("size")} {item.size}) x{" "}
                          {item.quantity}
                        </span>
                        <span className="text-foreground">
                          {formatPrice(item.product.price * item.quantity)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="my-4 border-t border-border" />
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {t("shipping")}
                    </span>
                    <span className="text-foreground">{t("free")}</span>
                  </div>
                  <div className="my-4 border-t border-border" />
                  <div className="flex justify-between">
                    <span className="font-semibold text-foreground">
                      {t("total")}
                    </span>
                    <span className="text-xl font-bold text-foreground">
                      {formatPrice(totalPrice)}
                    </span>
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-primary px-8 py-4 text-base font-semibold text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-50"
                >
                  {loading ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      {t("placingOrder")}
                    </>
                  ) : (
                    t("placeOrder")
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </main>
      <SiteFooter />
    </div>
  );
}
