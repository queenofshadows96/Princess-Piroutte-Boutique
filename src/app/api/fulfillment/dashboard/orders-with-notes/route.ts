import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("orders")
    .select("id, customer_name, fulfillment_notes")
    .not("fulfillment_notes", "is", null);

  if (error) return NextResponse.json([]);

  return NextResponse.json(data);
}
