import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("🚚 [SHIPPED NOT DELIVERED] ROUTE STARTED");
  console.log("📌 Logic: status = 'shipped'");

  // Fetch shipments with status = shipped
  const { data, error } = await supabase
    .from("shipments")
    .select("id, order_id, tracking_number, carrier, status, shipped_at")
    .eq("status", "shipped")
    .order("shipped_at", { ascending: false });

  if (error) {
    console.error("❌ [SHIPPED NOT DELIVERED] Supabase error:", error);
    return NextResponse.json([]);
  }

  console.log("📦 [SHIPPED NOT DELIVERED] RAW RESULTS:", data);
  console.log("📦 [SHIPPED NOT DELIVERED] COUNT:", data?.length || 0);

  return NextResponse.json(data || []);
}
