import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { searchParams } = new URL(req.url);
  const page = Number(searchParams.get("page") || 0);
  const limit = Number(searchParams.get("limit") || 25);

  const offset = page * limit;

  const { data, error } = await supabase.rpc(
    "fetch_unfulfilled_orders_paginated",
    {
      page_limit: limit,
      page_offset: offset
    }
  );

  if (error) {
    console.error("RPC ERROR:", error);
    return NextResponse.json({ data: [], error });
  }

  return NextResponse.json({ data });
}
