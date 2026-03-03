"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function DeleteProductButton({ productId }: { productId: string }) {
  const router = useRouter();

  async function handleDelete() {
    if (!confirm("Are you sure you want to delete this product?")) return;

    const supabase = createClient();
    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", productId);

    if (error) {
      toast.error("Failed to delete product");
      return;
    }

    toast.success("Product deleted");
    router.refresh();
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      className="rounded-md px-3 py-1.5 text-xs font-medium text-destructive transition-colors hover:bg-destructive/10"
    >
      Delete
    </button>
  );
}
