import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export async function PATCH(req, { params }) {
  const idNum = Number(params.id);
  const body = await req.json();

  console.log("🔥 RETURNS UPDATE ROUTE HIT");
  console.log("typeof params.id:", typeof params.id, params.id);
  console.log("typeof idNum:", typeof idNum, idNum);

  const supabase = createClient();

  let updateData = {};

  if (body.status) updateData.status = body.status;
  if (body.resolution_notes !== undefined)
    updateData.resolution_notes = body.resolution_notes || null;

  const now = new Date().toISOString();

  if (body.status === "approved") updateData.approved_at = now;
  if (body.status === "rejected") updateData.rejected_at = now;
  if (body.status === "refunded") updateData.refunded_at = now;

  const { data, error } = await supabase
    .from("returns")
    .update(updateData)
    .eq("id", idNum)
    .select();

  console.log("Update result:", data, error);

  if (error) {
    return NextResponse.json({ success: false, error });
  }

  return NextResponse.json({ success: true });
}
