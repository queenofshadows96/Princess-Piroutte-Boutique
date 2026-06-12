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
    .from("orders")
    .select(
      `
      id,
      customer_name,
      customer_email,
      total,
      status,
      tracking_number,
      fulfilled_at,
      shipped_at,
      refunded_at,
      created_at,
      order_items ( id )
    `
    )
    .order("created_at", { ascending: false });

  // ⭐ SEARCH LOGIC
  if (search) {
    const isNumeric = /^\d+$/.test(search);

    if (isNumeric) {
      query = query.eq("id", Number(search));
    } else {
      query = query.or(
        `customer_name.ilike.%${search}%,customer_email.ilike.%${search}%`
      );
    }
  }

  // ⭐ STATUS FILTER
  if (status) {
    query = query.eq("status", status);
  }

  // ⭐ DATE FILTER (with validation)
  if (date) {
    const isValidDate = /^\d{4}-\d{2}-\d{2}$/.test(date);
    if (isValidDate) {
      query = query
        .gte("created_at", `${date}T00:00:00`)
        .lte("created_at", `${date}T23:59:59`);
    } else {
      console.warn("Invalid date format:", date);
    }
  }

  const { data: orders, error } = await query;

  if (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json({ orders: [] });
  }

  return NextResponse.json({ orders: orders || [] });
}
