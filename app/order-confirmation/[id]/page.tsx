import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { OrderConfirmContent } from "@/components/order-confirm-content";

export default async function OrderConfirmationPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <OrderConfirmContent orderId={id} />
      <SiteFooter />
    </div>
  );
}
