import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);

  const search = searchParams.get("search") || "";
  const status = searchParams.get("status") || "";
  const date = searchParams.get("date") || "";

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  let query = supabase
    .from("returns")
    .select(
      `
      id,
      order_id,
      customer_email,
      status,
      created_at
    `
    )
    .order("created_at", { ascending: false });

  // ⭐ SEARCH LOGIC (MATCHES ORDERS)
  if (search) {
    const isNumeric = /^\d+$/.test(search);

    if (isNumeric) {
      // exact match only — same as Orders
      query = query.or(
        `id.eq.${search},order_id.eq.${search}`
      );
    } else {
      // text search
      query = query.or(
        `customer_email.ilike.%${search}%`
      );
    }
  }

  // ⭐ STATUS FILTER
  if (status) {
    query = query.eq("status", status);
  }

  // ⭐ DATE FILTER
  if (date) {
    query = query.gte("created_at", `${date}T00:00:00`);
  }

  const { data: returns, error } = await query;

  if (error) {
    console.error("Error fetching returns:", error);
    return NextResponse.json({ returns: [] });
  }

  return NextResponse.json({ returns: returns || [] });
}
