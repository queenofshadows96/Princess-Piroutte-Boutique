import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("📦 [DELIVERED SHIPMENTS] ROUTE STARTED");
  console.log("📌 Logic: status = 'delivered'");

  // Fetch delivered shipments
  const { data, error } = await supabase
    .from("shipments")
    .select("id, order_id, tracking_number, carrier, status, delivered_at")
    .eq("status", "delivered")
    .order("delivered_at", { ascending: false });

  if (error) {
    console.error("❌ [DELIVERED SHIPMENTS] Supabase error:", error);
    return NextResponse.json([]);
  }

  console.log("🚚 [DELIVERED SHIPMENTS] RAW RESULTS:", data);
  console.log("📦 [DELIVERED SHIPMENTS] COUNT:", data?.length || 0);

  return NextResponse.json(data || []);
}
