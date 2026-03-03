"use server";

import { createClient } from "@/lib/supabase/server";

interface OrderInput {
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  customer_address: string;
  total: number;
  items: {
    product_id: string;
    product_name: string;
    product_price: number;
    size: string;
    quantity: number;
  }[];
}

export async function placeOrder(input: OrderInput) {
  const supabase = await createClient();

  // Use the service role key to bypass RLS for order creation
  // since anonymous customers need to place orders
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      customer_name: input.customer_name,
      customer_email: input.customer_email,
      customer_phone: input.customer_phone,
      customer_address: input.customer_address,
      total: input.total,
      status: "pending",
    })
    .select("id")
    .single();

  if (orderError) {
    console.error("Order insert error:", orderError);
    return { error: orderError.message };
  }

  const orderItems = input.items.map((item) => ({
    order_id: order.id,
    product_id: item.product_id,
    product_name: item.product_name,
    product_price: item.product_price,
    size: item.size,
    quantity: item.quantity,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItems);

  if (itemsError) {
    console.error("Order items insert error:", itemsError);
    return { error: itemsError.message };
  }

  return { orderId: order.id };
}
