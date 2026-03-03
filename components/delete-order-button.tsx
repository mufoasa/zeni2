"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";

export function DeleteOrderButton({ orderId }: { orderId: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [confirming, setConfirming] = useState(false);

  async function handleDelete() {
    if (!confirming) {
      setConfirming(true);
      return;
    }

    setLoading(true);
    try {
      const supabase = createClient();

      // Delete order items first (cascade should handle this, but be explicit)
      await supabase.from("order_items").delete().eq("order_id", orderId);

      const { error } = await supabase
        .from("orders")
        .delete()
        .eq("id", orderId);

      if (error) throw error;

      toast.success("Order deleted");
      router.refresh();
    } catch {
      toast.error("Failed to delete order");
    } finally {
      setLoading(false);
      setConfirming(false);
    }
  }

  return (
    <button
      type="button"
      onClick={handleDelete}
      onBlur={() => setConfirming(false)}
      disabled={loading}
      className={`inline-flex items-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
        confirming
          ? "bg-destructive text-destructive-foreground"
          : "bg-secondary text-destructive hover:bg-destructive/10"
      } disabled:opacity-50`}
    >
      {loading ? (
        <Loader2 className="h-3 w-3 animate-spin" />
      ) : (
        <Trash2 className="h-3 w-3" />
      )}
      {loading ? "Deleting..." : confirming ? "Confirm Delete?" : "Delete"}
    </button>
  );
}
