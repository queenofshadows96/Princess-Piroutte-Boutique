import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const { order_id, customer_email, reason, details, photo_urls } = body;

    // Basic validation
    if (!order_id || !customer_email || !reason) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // Validate that the order exists and email matches
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("id, customer_email, status")   // ⭐ include status
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      return NextResponse.json(
        { error: "Order not found" },
        { status: 404 }
      );
    }

    if (order.customer_email !== customer_email) {
      return NextResponse.json(
        { error: "Email does not match this order" },
        { status: 400 }
      );
    }

    // ⭐ Store the original order status
    const originalStatus = order.status;

    // Insert return request
    const { data, error } = await supabase
      .from("returns")
      .insert({
        order_id,
        customer_email,
        reason,
        details: details || null,
        status: "pending",
        photo_urls: photo_urls || [],
        original_order_status: originalStatus,   // ⭐ save it here
      })
      .select()
      .single();

    if (error) {
      console.error("Return insert error:", error);
      return NextResponse.json(
        { error: "Failed to create return request" },
        { status: 500 }
      );
    }

    return NextResponse.json({ success: true, return: data });
  } catch (err) {
    console.error("Unexpected error:", err);
    return NextResponse.json(
      { error: "Unexpected server error" },
      { status: 500 }
    );
  }
}
