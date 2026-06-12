import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request, { params }: { params: { id: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { status } = await req.json();
    const orderId = params.id;

    // Allowed statuses in your new system
    const allowed = [
      "paid",
      "returned",
      "refunded",
      "cancelled",
      "delivered",
      "fulfilled" // legacy support
    ];

    if (!allowed.includes(status)) {
      return NextResponse.json(
        { success: false, error: "Invalid status" },
        { status: 400 }
      );
    }

    // Build update object
    const updateData: any = { status };

    // If refunded → update refund_status
    if (status === "refunded") {
      updateData.refund_status = "succeeded";
    }

    // If returned → update return_status
    if (status === "returned") {
      updateData.return_status = "returned";
    }

    // Update order
    const { error } = await supabase
      .from("orders")
      .update(updateData)
      .eq("id", orderId);

    if (error) {
      console.error("❌ Status update error:", error);
      return NextResponse.json({ success: false, error });
    }

    console.log(`✅ Order ${orderId} status updated to ${status}`);
    return NextResponse.json({ success: true });

  } catch (err) {
    console.error("❌ Status route error:", err);
    return NextResponse.json({ success: false });
  }
}
