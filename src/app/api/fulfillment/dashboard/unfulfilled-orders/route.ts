import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  console.log("🚀 [UNFULFILLED ORDERS] EXECUTING DIRECT DATABASE PIPELINE");

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      }
    }
  );

  // Read ?limit=5 (default 5)
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") || 5);

  // Invoke the database function directly
  const { data: unfulfilledOrders, error } = await supabase
    .rpc("fetch_true_unfulfilled_orders");

  if (error) {
    console.error("❌ [RPC EXECUTING ERROR]:", error.message);
    return NextResponse.json([]);
  }

  const results = (unfulfilledOrders || []).map((o: any) => ({
    id: o.id,
    customer_name: o.customer_name,
    fulfillment_notes: o.fulfillment_notes,
    gift_message: o.gift_message,
    created_at: o.created_at
  }));

  console.log("--------------------------------------------------");
  console.log("📦 [SUMMARY] Total unfulfilled orders fetched:", results.length);
  console.log("🎯 [VERIFICATION] Is Order 45 included? (Target: true):", results.some((o: any) => o.id === 45));
  console.log("--------------------------------------------------");

  // ⭐ Return only the first 5 items
  return NextResponse.json(results.slice(0, limit));
}
