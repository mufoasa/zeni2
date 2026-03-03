"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLocale } from "@/components/locale-provider";
import { Shield } from "lucide-react";

const CONSENT_KEY = "ustop-consent-accepted";

export function ConsentBanner() {
  const { t } = useLocale();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const accepted = localStorage.getItem(CONSENT_KEY);
    if (!accepted) {
      setVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem(CONSENT_KEY, "true");
    setVisible(false);
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop overlay */}
      <div className="fixed inset-0 z-[60] bg-background/80 backdrop-blur-sm" />

      {/* Centered modal */}
      <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
        <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 shadow-2xl">
          <div className="flex flex-col items-center text-center">
            <div className="mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-primary/10">
              <Shield className="h-7 w-7 text-primary" />
            </div>

            <h2 className="font-display text-xl font-bold text-foreground">
              {t("consentTitle")}
            </h2>

            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              {t("consentMessage")}
            </p>

            <div className="mt-4 flex gap-4 text-xs">
              <Link
                href="/terms"
                className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
              >
                {t("termsOfService")}
              </Link>
              <Link
                href="/privacy"
                className="text-primary underline underline-offset-2 transition-colors hover:text-primary/80"
              >
                {t("privacyPolicy")}
              </Link>
            </div>

            <button
              type="button"
              onClick={handleAccept}
              className="mt-6 w-full rounded-xl bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {t("acceptAndContinue")}
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
