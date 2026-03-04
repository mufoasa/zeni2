"use client";

import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { MapPin, Mail, Phone, Clock, Facebook, Instagram } from "lucide-react";

export function SiteFooter() {
  const { t } = useLocale();

  return (
    <footer className="border-t border-border bg-card">
      <div className="mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link
              href="/"
              className="font-display text-2xl font-bold tracking-tight text-foreground"
            >
              USTOP
            </Link>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
              {t("footerDesc")}
            </p>

            <div className="mt-6 flex gap-3">
              <a
                href="https://facebook.com/Ustop1"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Facebook className="h-4 w-4" />
              </a>

              <a
                href="https://instagram.com/ustopjeans.mk"
                target="_blank"
                rel="noopener noreferrer"
                className="flex h-9 w-9 items-center justify-center rounded-lg bg-secondary text-muted-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
              >
                <Instagram className="h-4 w-4" />
              </a>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("shop")}
            </h4>

            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/shop?category=men"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("men")}
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=women"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("women")}
                </Link>
              </li>

              <li>
                <Link
                  href="/shop?category=new"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("newArrivals")}
                </Link>
              </li>

              <li>
                <Link
                  href="/returns"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("returns")}
                </Link>
              </li>

              <li>
                <Link
                  href="/faq"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("faq")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("company")}
            </h4>

            <ul className="flex flex-col gap-3">
              <li>
                <Link
                  href="/about"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("aboutUs")}
                </Link>
              </li>

              <li>
                <Link
                  href="/shipping"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("shippingInfo2")}
                </Link>
              </li>

              <li>
                <Link
                  href="/terms"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("termsOfService")}
                </Link>
              </li>

              <li>
                <Link
                  href="/privacy"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("privacyPolicy")}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-foreground">
              {t("contact")}
            </h4>

            <ul className="flex flex-col gap-4">
              <li className="flex items-start gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="text-sm text-muted-foreground">
                  Tetovo, North Macedonia
                </span>
              </li>

              <li className="flex items-center gap-2.5">
                <Mail className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href="mailto:info.ustopjeans@gmail.com"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  info.ustopjeans@gmail.com
                </a>
              </li>

              <li className="flex items-center gap-2.5">
                <Phone className="h-4 w-4 shrink-0 text-primary" />
                <a
                  href="tel:+38971377798"
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  +389 71 377 798
                </a>
              </li>

              <li className="flex items-start gap-2.5">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <div className="flex flex-col text-sm text-muted-foreground">
                  <span>{t("workingHoursValue")}</span>
                  <span>{t("sundayClosed")}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border pt-8 sm:flex-row">
          <p className="text-sm text-muted-foreground">
            © 2026 USTOP Jeans. {t("allRightsReserved")}
          </p>

          <div className="flex gap-6">
            <Link
              href="/terms"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t("termsOfService")}
            </Link>

            <Link
              href="/privacy"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              {t("privacyPolicy")}
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
