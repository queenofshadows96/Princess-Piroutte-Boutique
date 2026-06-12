import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const page = parseInt(searchParams.get("page") || "0", 10);
  const limit = 25;

  const search = searchParams.get("search") || "";
  const date = searchParams.get("date") || null;

  // ⭐ NEW SHIPMENT FILTER LOGIC
  // shipment = "none"       → orders with NO shipments
  // shipment = "fulfilled"  → orders WITH shipments (any status)
  // shipment = null         → no shipment filtering
  const shipment = searchParams.get("shipment") || null;

  // ⭐ ORDER STATUS FILTERS (unchanged)
  const order_status = searchParams.get("order_status") || null;

  const notes = searchParams.get("notes");
  const gift = searchParams.get("gift");

  const sort = searchParams.get("sort") || "newest";

  // ⭐ SEND CLEAN FILTER VALUES TO RPC
  const { data, error } = await supabase.rpc("fulfillment_orders", {
    p_page: page,
    p_limit: limit,
    p_search: search,
    p_date: date,

    // ⭐ NEW: only "none" or "fulfilled" or null
    p_shipment: shipment === "none" 
      ? "none"
      : shipment === "fulfilled"
      ? "fulfilled"
      : null,

    p_order_status: order_status,

    p_notes: notes === "true" ? true : null,
    p_gift: gift === "true" ? true : null,

    p_sort: sort,
  });

  if (error) {
    console.error("RPC ERROR:", error);
    return NextResponse.json({ data: [], error: error.message }, { status: 500 });
  }

  return NextResponse.json({ data: data || [] });
}
