import { createClient } from "@/lib/supabase/server";
import { OrderStatusButton } from "@/components/order-status-button";
import { DeleteOrderButton } from "@/components/delete-order-button";

export default async function AdminOrdersPage() {
  const supabase = await createClient();

  const { data: orders } = await supabase
    .from("orders")
    .select("*, order_items(*)")
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
        Orders
      </h1>
      <p className="mt-2 text-muted-foreground">
        View and manage customer orders
      </p>

      {orders && orders.length > 0 ? (
        <div className="mt-8 flex flex-col gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="rounded-xl border border-border bg-card p-6"
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-sm text-foreground">
                      #{order.id.slice(0, 8)}
                    </span>
                    <span
                      className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                        order.status === "completed"
                          ? "bg-green-500/10 text-green-400"
                          : order.status === "shipped"
                            ? "bg-blue-500/10 text-blue-400"
                            : order.status === "cancelled"
                              ? "bg-red-500/10 text-red-400"
                              : "bg-yellow-500/10 text-yellow-400"
                      }`}
                    >
                      {order.status}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-foreground">
                    {order.customer_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_email} | {order.customer_phone}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {order.customer_address}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-foreground">
                    {(Number(order.total) * 61.5).toLocaleString("mk-MK", { maximumFractionDigits: 0 })} &#1076;&#1077;&#1085;
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {new Date(order.created_at).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Order Items */}
              {order.order_items && order.order_items.length > 0 && (
                <div className="mt-4 border-t border-border pt-4">
                  <div className="flex flex-col gap-2">
                    {order.order_items.map(
                      (item: {
                        id: string;
                        product_name: string;
                        size: string;
                        quantity: number;
                        product_price: number;
                      }) => (
                        <div
                          key={item.id}
                          className="flex justify-between text-sm"
                        >
                          <span className="text-muted-foreground">
                            {item.product_name} (Size {item.size}) x{" "}
                            {item.quantity}
                          </span>
                          <span className="text-foreground">
                            {(Number(item.product_price) * item.quantity * 61.5).toLocaleString("mk-MK", { maximumFractionDigits: 0 })} &#1076;&#1077;&#1085;
                          </span>
                        </div>
                      )
                    )}
                  </div>
                </div>
              )}

              {/* Status Update */}
              <div className="mt-4 flex flex-wrap items-center gap-2 border-t border-border pt-4">
                <OrderStatusButton orderId={order.id} newStatus="shipped" currentStatus={order.status} />
                <OrderStatusButton orderId={order.id} newStatus="completed" currentStatus={order.status} />
                <OrderStatusButton orderId={order.id} newStatus="cancelled" currentStatus={order.status} />
                <div className="ml-auto">
                  <DeleteOrderButton orderId={order.id} />
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="mt-16 text-center">
          <p className="text-lg text-muted-foreground">No orders yet.</p>
        </div>
      )}
    </div>
  );
}
