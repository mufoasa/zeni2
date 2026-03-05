import { Package, ShoppingCart, DollarSign, TrendingUp } from "lucide-react";
import { createClient } from "@/lib/supabase/server";

export default async function AdminDashboardPage() {
  const supabase = await createClient();

  const { count: productCount } = await supabase
    .from("products")
    .select("*", { count: "exact", head: true });

  const { data: orders } = await supabase.from("orders").select("*");

  const totalOrders = orders?.length || 0;
  const totalRevenue =
    orders?.reduce((sum, o) => sum + Number(o.total), 0) || 0;
  const pendingOrders =
    orders?.filter((o) => o.status === "pending").length || 0;

  const stats = [
    {
      label: "Total Products",
      value: productCount || 0,
      icon: Package,
    },
    {
      label: "Total Orders",
      value: totalOrders,
      icon: ShoppingCart,
    },
    {
      label: "Revenue",
      value: `${totalRevenue.toFixed(2)}`,
      icon: DollarSign,
    },
    {
      label: "Pending Orders",
      value: pendingOrders,
      icon: TrendingUp,
    },
  ];

  return (
    <div>
      <h1 className="font-display text-3xl font-bold tracking-tight text-foreground">
        Dashboard
      </h1>
      <p className="mt-2 text-muted-foreground">
        Welcome back to the USTOP admin panel.
      </p>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-border bg-card p-6"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm text-muted-foreground">{stat.label}</p>
              <stat.icon className="h-5 w-5 text-primary" />
            </div>
            <p className="mt-3 text-3xl font-bold text-foreground">
              {stat.value}
            </p>
          </div>
        ))}
      </div>

      {/* Recent orders */}
      {orders && orders.length > 0 && (
        <div className="mt-10">
          <h2 className="font-display text-xl font-bold text-foreground">
            Recent Orders
          </h2>
          <div className="mt-4 overflow-hidden rounded-xl border border-border">
            <table className="w-full">
              <thead>
                <tr className="border-b border-border bg-secondary/50">
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Order ID
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Customer
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Total
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    Status
                  </th>
                </tr>
              </thead>
              <tbody>
                {orders.slice(0, 10).map((order) => (
                  <tr
                    key={order.id}
                    className="border-b border-border last:border-b-0"
                  >
                    <td className="px-4 py-3 font-mono text-sm text-foreground">
                      {order.id.slice(0, 8)}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {order.customer_name}
                    </td>
                    <td className="px-4 py-3 text-sm text-foreground">
                      {Number(order.total).toFixed(2)}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${
                          order.status === "completed"
                            ? "bg-green-500/10 text-green-400"
                            : order.status === "shipped"
                              ? "bg-blue-500/10 text-blue-400"
                              : "bg-yellow-500/10 text-yellow-400"
                        }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
