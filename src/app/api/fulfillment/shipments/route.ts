import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { searchParams } = new URL(req.url);

    const page = parseInt(searchParams.get("page") || "0", 10);
    const status = searchParams.get("status") || "all";

    const limit = 25;
    const offset = page * limit;

    // ⭐ Fetch shipments using your RPC
    const { data, error } = await supabase.rpc("fetch_shipments_paginated", {
      status_filter: status,
      page_limit: limit,
      page_offset: offset,
    });

    if (error) {
      console.error("❌ Shipments fetch error:", error);
      return NextResponse.json({ data: [] }, { status: 500 });
    }

    // ⭐ Ensure consistent structure
    const formatted = (data || []).map((s: any) => ({
      ...s,
      orders: s.orders || null,
    }));

    return NextResponse.json({ data: formatted });
  } catch (err) {
    console.error("❌ Shipments route error:", err);
    return NextResponse.json({ data: [] }, { status: 500 });
  }
}
