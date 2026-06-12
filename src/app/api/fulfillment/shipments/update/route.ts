import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const body = await req.json();
    const { shipment_id, status, carrier, tracking_number } = body;

    if (!shipment_id) {
      return NextResponse.json(
        { success: false, error: "Missing shipment_id" },
        { status: 400 }
      );
    }

    // Fetch existing shipment
    const { data: existing, error: fetchError } = await supabase
      .from("shipments")
      .select("*")
      .eq("id", shipment_id)
      .single();

    if (fetchError || !existing) {
      return NextResponse.json(
        { success: false, error: "Shipment not found" },
        { status: 404 }
      );
    }

    const updateData: any = {};
    const events = existing.events || [];
    const now = new Date().toISOString();

    // ⭐ STATUS UPDATE
    if (status) {
      const allowed = ["pending", "shipped", "delivered"];

      if (!allowed.includes(status)) {
        return NextResponse.json(
          { success: false, error: "Invalid status" },
          { status: 400 }
        );
      }

      updateData.status = status;

      if (status === "shipped") {
        updateData.shipped_at = now;
        events.push({ type: "shipped", timestamp: now });
      }

      if (status === "delivered") {
        updateData.delivered_at = now;
        events.push({ type: "delivered", timestamp: now });
      }
    }

    // ⭐ TRACKING + CARRIER UPDATE
    if (carrier !== undefined) updateData.carrier = carrier;
    if (tracking_number !== undefined) updateData.tracking_number = tracking_number;

    // ⭐ EVENTS UPDATE
    updateData.events = events;

    const { error } = await supabase
      .from("shipments")
      .update(updateData)
      .eq("id", shipment_id);

    if (error) {
      console.error("Update shipment error:", error);
      return NextResponse.json({ success: false });
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Update shipment route error:", err);
    return NextResponse.json({ success: false });
  }
}
