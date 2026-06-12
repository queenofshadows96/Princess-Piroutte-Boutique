import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req, { params }) {
  const { id } = params;

  const supabase = createClient();

  const { data: order, error } = await supabase
    .from("orders")
    .select(`
      id,
      created_at,
      customer_name,
      customer_email,
      shipping_address,
      total,
      status,
      stripe_payment_id,
      tracking_number,
      fulfilled_at,
      shipped_at,
      refunded_at,
      order_items (
        id,
        quantity,
        size,
        product_id,
        products (
          name,
          price
        )
      )
    `)
    .eq("id", id)
    .single();

  if (error || !order) {
    console.error("Order fetch error:", error);
    return NextResponse.json({ order: null }, { status: 200 });
  }

  return NextResponse.json({ order });
}
