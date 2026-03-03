import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { createClient } from "@/lib/supabase/server";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ProductCard } from "@/components/product-card";
import { HomeContent } from "@/components/home-content";
import type { ProductWithSizes } from "@/lib/types";

export default async function HomePage() {
  const supabase = await createClient();

  const { data: featuredProducts } = await supabase
    .from("products")
    .select("*, product_sizes(*)")
    .eq("featured", true)
    .limit(4);

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <HomeContent
        featuredProducts={(featuredProducts as ProductWithSizes[]) || []}
      />
      <SiteFooter />
    </div>
  );
}
