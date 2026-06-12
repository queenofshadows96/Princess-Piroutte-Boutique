import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  console.log("🔍 [PENDING SHIPMENTS] ROUTE STARTED");

  const { data, error } = await supabase
    .from("shipments")
    .select("id, order_id, tracking_number, carrier, status, created_at")
    // Correct fix: chain neq() filters
    .neq("status", "delivered")
    .neq("status", "returned")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("❌ [PENDING SHIPMENTS] Supabase error:", error);
    return NextResponse.json([]);
  }

  console.log("🚚 [PENDING SHIPMENTS] RAW RESULTS:", data);
  console.log("📦 [PENDING SHIPMENTS] COUNT:", data?.length || 0);

  return NextResponse.json(data || []);
}
