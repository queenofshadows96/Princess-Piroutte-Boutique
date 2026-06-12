import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req, { params }) {
  const { id } = params;

  const supabase = createClient();

  const { data: ret, error } = await supabase
    .from("returns")
    .select(`
      id,
      order_id,
      customer_email,
      reason,
      details,
      status,
      photo_urls,
      refund_id,
      refund_status,
      refund_error_message,
      refund_attempted_at,
      refunded_at,
      approved_at,
      created_at
    `)
    .eq("id", id)
    .single();

  if (error || !ret) {
    console.error("Return fetch error:", error);
    return NextResponse.json({ return: null }, { status: 200 });
  }

  return NextResponse.json({ return: ret });
}
