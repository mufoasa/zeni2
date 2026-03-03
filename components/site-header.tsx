"use client";

import Link from "next/link";
import { useState } from "react";
import { ShoppingBag, Menu, X, Globe } from "lucide-react";
import { useCart } from "@/components/cart-provider";
import { useLocale } from "@/components/locale-provider";
import { cn } from "@/lib/utils";
import type { Locale } from "@/lib/translations";

export function SiteHeader() {
  const { totalItems } = useCart();
  const { t, locale, setLocale } = useLocale();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t("home") },
    { href: "/shop", label: t("shopAll") },
    { href: "/shop?category=men", label: t("men") },
    { href: "/shop?category=women", label: t("women") },
    { href: "/shop?category=new", label: t("newArrivals") },
  ];

  const locales: { value: Locale; label: string }[] = [
    { value: "sq", label: "SQ" },
    { value: "mk", label: "MK" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link href="/" className="flex items-center overflow-hidden rounded-sm font-black italic">

  <div
    className="relative flex h-8 w-24 items-center justify-center rounded-sm"
    style={{
      background: "linear-gradient(to right, #ED1C24 50%, #1B188C 50%)",
    }}
  >
    <span className="tracking-tighter text-white text-2xl">
      USTOP<sup className="ml-0.5 text-[10px] not-italic">®</sup>
    </span>
  </div>

</Link>

        <nav className="hidden items-center gap-8 md:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Language switcher */}
          <div className="flex items-center gap-1 rounded-full border border-border p-0.5">
            {locales.map((l) => (
              <button
                key={l.value}
                type="button"
                onClick={() => setLocale(l.value)}
                className={cn(
                  "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
                  locale === l.value
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {l.label}
              </button>
            ))}
          </div>

          <Link
            href="/cart"
            className="relative flex items-center gap-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingBag className="h-5 w-5" />
            {totalItems > 0 && (
              <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground">
                {totalItems}
              </span>
            )}
          </Link>

          <button
            type="button"
            className="text-muted-foreground md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? (
              <X className="h-6 w-6" />
            ) : (
              <Menu className="h-6 w-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile nav */}
      <div
        className={cn(
          "overflow-hidden border-t border-border transition-all duration-300 md:hidden",
          mobileOpen ? "max-h-80" : "max-h-0 border-t-0"
        )}
      >
        <nav className="flex flex-col gap-1 px-6 py-4">
          {navLinks.map((link) => (
            <Link
              key={link.href + link.label}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
