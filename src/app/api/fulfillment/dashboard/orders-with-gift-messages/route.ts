import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { data, error } = await supabase
    .from("orders")
    .select("id, customer_name, gift_message")
    .not("gift_message", "is", null)
    .neq("gift_message", "")
    .neq("gift_message", " ");

  if (error) return NextResponse.json([]);

  return NextResponse.json(data);
}
