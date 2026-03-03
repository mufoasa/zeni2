import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { ProductForm } from "@/components/product-form";
import type { ProductWithSizes } from "@/lib/types";

export default async function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: product } = await supabase
    .from("products")
    .select("*, product_sizes(*)")
    .eq("id", id)
    .single();

  if (!product) {
    notFound();
  }

  return <ProductForm product={product as ProductWithSizes} />;
}
