"use client";

import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

export function OrderStatusButton({
  orderId,
  newStatus,
  currentStatus,
}: {
  orderId: string;
  newStatus: string;
  currentStatus: string;
}) {
  const router = useRouter();

  async function handleUpdate() {
    const supabase = createClient();
    const { error } = await supabase
      .from("orders")
      .update({ status: newStatus, updated_at: new Date().toISOString() })
      .eq("id", orderId);

    if (error) {
      toast.error("Failed to update order status");
      return;
    }

    toast.success(`Order marked as ${newStatus}`);
    router.refresh();
  }

  const isActive = currentStatus === newStatus;

  return (
    <button
      type="button"
      onClick={handleUpdate}
      disabled={isActive}
      className={cn(
        "rounded-md px-3 py-1.5 text-xs font-medium capitalize transition-colors",
        isActive
          ? "bg-primary/10 text-primary cursor-default"
          : "bg-secondary text-secondary-foreground hover:bg-muted"
      )}
    >
      {newStatus}
    </button>
  );
}
