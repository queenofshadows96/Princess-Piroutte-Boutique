import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const orderId = Number(params.id);

  try {
    // 1️⃣ Ensure order exists
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { success: false, error: "Order not found" },
        { status: 404 }
      );
    }

    // 2️⃣ Check if shipment already exists
    const { data: existing } = await supabase
      .from("shipments")
      .select("id")
      .eq("order_id", orderId)
      .limit(1);

    if (existing && existing.length > 0) {
      return NextResponse.json({
        success: true,
        message: "Shipment already exists",
      });
    }

    // 3️⃣ Create new shipment
    const { error: insertError } = await supabase.from("shipments").insert({
      order_id: orderId,
      status: "pending",
      carrier: null,
      tracking_number: null,
      shipped_at: null,
      delivered_at: null,
      events: [],
    });

    if (insertError) {
      console.error("❌ Shipment creation error:", insertError);
      return NextResponse.json(
        { success: false, error: "Failed to create shipment" },
        { status: 500 }
      );
    }

    console.log(`✅ Shipment created for order ${orderId}`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("💥 Fulfill route error:", err);
    return NextResponse.json(
      { success: false, error: "Server error" },
      { status: 500 }
    );
  }
}
