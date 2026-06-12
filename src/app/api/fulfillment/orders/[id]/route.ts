import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(req: Request, { params }) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const orderId = params.id;

    // ⭐ FETCH ORDER
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select(`
        id,
        customer_name,
        customer_email,
        shipping_address,
        created_at,
        status,
        refund_status,
        hide_prices,
        gift_message
      `)
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ order: null }, { status: 404 });
    }

    // ⭐ FETCH ORDER ITEMS
    const { data: items } = await supabase
      .from("order_items")
      .select(`
        id,
        quantity,
        price,
        size,
        product_id,
        color_id,

        products ( name ),

        product_colors (
          color_name,
          id,
          product_color_images (
            image_url,
            sort_order
          )
        )
      `)
      .eq("order_id", orderId);

    // ⭐ FETCH SHIPMENTS
    const { data: shipments } = await supabase
      .from("shipments")
      .select(`
        id,
        order_id,
        status,
        carrier,
        tracking_number,
        shipped_at,
        delivered_at,
        events,
        created_at,

        shipment_items (
          id,
          quantity,
          order_item_id,
          order_items (
            id,
            quantity,
            price,
            size,
            products ( name ),
            product_colors (
              color_name,
              product_color_images ( image_url, sort_order )
            )
          )
        )
      `)
      .eq("order_id", orderId)
      .order("created_at", { ascending: true });

    return NextResponse.json({
      order: {
        ...order,
        items: items || [],
        shipments: shipments || [],
      },
    });
  } catch (err) {
    console.error("💥 Order details route error:", err);
    return NextResponse.json({ order: null }, { status: 500 });
  }
}
