import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req, { params }) {
  console.log("🚚 [Shipments/Status] Incoming request for shipment:", params.id);

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const body = await req.json();
    const { status, carrier, tracking_number } = body;

    console.log("📨 [Shipments/Status] Body:", body);

    // Fetch existing shipment (needed for events + validation)
    const { data: existing, error: fetchError } = await supabase
      .from("shipments")
      .select("*")
      .eq("id", params.id)
      .single();

    if (fetchError || !existing) {
      console.error("❌ Shipment not found:", fetchError);
      return NextResponse.json({ success: false, error: "Shipment not found" });
    }

    const updateData = {};
    const events = existing.events || [];

    // -----------------------------
    // ⭐ STATUS UPDATE LOGIC
    // -----------------------------
    if (status) {
      const allowed = ["pending", "shipped", "delivered"];

      if (!allowed.includes(status)) {
        return NextResponse.json(
          { success: false, error: "Invalid status" },
          { status: 400 }
        );
      }

      updateData.status = status;

      const now = new Date().toISOString();

      if (status === "shipped") {
        updateData.shipped_at = now;
        events.push({ type: "shipped", timestamp: now });
      }

      if (status === "delivered") {
        updateData.delivered_at = now;
        events.push({ type: "delivered", timestamp: now });
      }
    }

    // -----------------------------
    // ⭐ TRACKING + CARRIER UPDATE
    // -----------------------------
    if (carrier !== undefined) {
      updateData.carrier = carrier;
    }

    if (tracking_number !== undefined) {
      updateData.tracking_number = tracking_number;
    }

    // Always update events array if changed
    updateData.events = events;

    console.log("🛠 [Shipments/Status] Update data:", updateData);

    const { error } = await supabase
      .from("shipments")
      .update(updateData)
      .eq("id", params.id);

    if (error) {
      console.error("❌ [Shipments/Status] Supabase error:", error);
      return NextResponse.json({ success: false, error });
    }

    console.log("✅ [Shipments/Status] Shipment updated successfully");
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("💥 [Shipments/Status] Route error:", err);
    return NextResponse.json({ success: false, error: "Server error" });
  }
}
