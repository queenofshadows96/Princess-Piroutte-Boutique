import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req, { params }) {
  const { id } = params;
  const body = await req.json();

  console.log("🔥 UPDATE ROUTE HIT", body);  // ← THIS IS THE CORRECT SPOT

  const supabase = createClient();

  let updateData: any = {};

  // ⭐ STATUS UPDATE
  if (body.status) {
    updateData.status = body.status;
  }

  // ⭐ TRACKING NUMBER
  if (body.tracking_number !== undefined) {
    updateData.tracking_number = body.tracking_number || null;
  }

  // ⭐ ACTIONS (set timestamps)
  const now = new Date().toISOString();

  if (body.action === "fulfill") {
    updateData.fulfilled_at = now;
    updateData.status = "fulfilled";
  }

  if (body.action === "ship") {
    updateData.shipped_at = now;
    updateData.status = "shipped";
  }

  if (body.action === "refund") {
    updateData.refunded_at = now;
    updateData.status = "refunded";
  }

  // ⭐ PERFORM UPDATE
  const { error } = await supabase
    .from("orders")
    .update(updateData)
    .eq("id", id)
    .select();

  if (error) {
    console.error("Update error:", error);
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true });
}
