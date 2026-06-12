import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const shipmentId = params.id;

    // ⭐ FETCH SHIPMENT + ORDER + SHIPMENT ITEMS
    const { data: shipment, error } = await supabase
      .from("shipments")
      .select(`
        id,
        order_id,
        tracking_number,
        carrier,
        status,
        shipped_at,
        delivered_at,
        events,

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
              id,
              product_color_images ( image_url, sort_order )
            )
          )
        ),

        orders (
          id,
          customer_name,
          customer_email,
          shipping_address,
          created_at,
          status,
          refund_status,
          return_status,
          hide_prices,
          gift_message
        )
      `)
      .eq("id", shipmentId)
      .single();

    if (error || !shipment) {
      console.error("❌ Shipment fetch error:", error);
      return NextResponse.json({ shipment: null }, { status: 404 });
    }

    return NextResponse.json({ shipment });
  } catch (err) {
    console.error("💥 Shipment details route error:", err);
    return NextResponse.json({ shipment: null }, { status: 500 });
  }
}
