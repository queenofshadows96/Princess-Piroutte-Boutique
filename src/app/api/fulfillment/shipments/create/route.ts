import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  console.log("📦 [Shipments/Create] Incoming request...");

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    console.log("📨 [Shipments/Create] Request body:", body);

    const { order_id, carrier, tracking_number } = body;

    if (!order_id) {
      return NextResponse.json(
        { success: false, error: "Missing order_id" },
        { status: 400 }
      );
    }

    // 1️⃣ Ensure order exists
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      console.error("❌ Order not found:", orderError);
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Create shipment
    const now = new Date().toISOString();

    const { data, error } = await supabase
      .from("shipments")
      .insert({
        order_id,
        carrier: carrier || null,
        tracking_number: tracking_number || null,
        status: "pending",
        shipped_at: null,
        delivered_at: null,
        events: [
          {
            type: "created",
            timestamp: now,
          },
        ],
        created_at: now,
      })
      .select(
        `
        id,
        order_id,
        carrier,
        tracking_number,
        status,
        shipped_at,
        delivered_at,
        events
      `
      )
      .single();

    if (error) {
      console.error("❌ [Shipments/Create] Supabase insert error:", error);
      return NextResponse.json({
        success: false,
        error: error.message || "Unknown Supabase error",
      });
    }

    console.log("✅ [Shipments/Create] Shipment created successfully:", data);

    return NextResponse.json({
      success: true,
      shipment_id: data.id,
      shipment: data,
    });
  } catch (err) {
    console.error("💥 [Shipments/Create] Route error:", err);
    return NextResponse.json({
      success: false,
      error: err instanceof Error ? err.message : "Unknown server error",
    });
  }
}
