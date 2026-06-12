import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("📊 [OVERVIEW] ROUTE STARTED");

  // -----------------------------
  // DEBUG: WHAT ORDERS CAN THE API SEE?
  // -----------------------------
  const { data: debugOrders, error: debugError } = await supabase
    .from("orders")
    .select("id")
    .order("id");

  console.log("🟦 API CAN SEE THESE ORDER IDs:", debugOrders);
  if (debugError) console.log("❌ DEBUG ERROR:", debugError);

  // -----------------------------
  // TOTAL ORDERS
  // -----------------------------
  const totalOrdersCount = debugOrders?.length || 0;

  // -----------------------------
  // UNFULFILLED ORDERS
  // -----------------------------
  const { data: unfulfilledData } = await supabase
    .from("orders")
    .select(`
      id,
      shipments!left(order_id)
    `);

  const unfulfilled =
    (unfulfilledData || []).filter(
      (o: any) => !o.shipments || o.shipments.length === 0
    );

  // -----------------------------
  // PENDING SHIPMENTS
  // -----------------------------
  const { data: pending } = await supabase
    .from("shipments")
    .select("id")
    .neq("status", "delivered")
    .neq("status", "returned");

  // -----------------------------
  // SHIPPED
  // -----------------------------
  const { data: shipped } = await supabase
    .from("shipments")
    .select("id")
    .eq("status", "shipped");

  // -----------------------------
  // DELIVERED
  // -----------------------------
  const { data: delivered } = await supabase
    .from("shipments")
    .select("id")
    .eq("status", "delivered");

  // -----------------------------
  // GIFT MESSAGE COUNT
  // -----------------------------
  const { data: giftOrders } = await supabase
    .from("orders")
    .select("id")
    .not("gift_message", "is", null)
    .neq("gift_message", "")
    .neq("gift_message", " ");

  const giftMessageCount = giftOrders?.length || 0;

  // -----------------------------
  // NOTES COUNT
  // -----------------------------
  const { data: notesOrders } = await supabase
    .from("orders")
    .select("id")
    .not("notes", "is", null)
    .neq("notes", "")
    .neq("notes", " ");

  const notesCount = notesOrders?.length || 0;

  // -----------------------------
  // PRODUCTS MISSING WEIGHT/DIMENSIONS
  // -----------------------------
  const { data: products } = await supabase
    .from("products")
    .select("id, name, weight_oz, length_in, width_in, height_in");

  const missingProductDataCount = (products || []).filter((p: any) => {
    return (
      !p.weight_oz ||
      !p.length_in ||
      !p.width_in ||
      !p.height_in
    );
  }).length;

  // -----------------------------
  // RETURN COUNTS
  // -----------------------------
  return NextResponse.json({
    total_orders: totalOrdersCount,
    unfulfilled_orders: unfulfilled.length,
    orders_with_gift_messages: giftMessageCount,
    orders_with_notes: notesCount,
    pending_shipments: pending?.length || 0,
    shipped_not_delivered: shipped?.length || 0,
    delivered: delivered?.length || 0,
    missing_product_data: missingProductDataCount,
  });
}
