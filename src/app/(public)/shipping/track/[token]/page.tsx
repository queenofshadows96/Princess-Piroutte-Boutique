export const dynamic = "force-dynamic";

import Image from "next/image";
import { createClient } from "@supabase/supabase-js";
import { ShipmentDetails } from "./ShipmentDetails";

export default async function TrackingPage({ params }: { params: { token: string } }) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  // FETCH ORDER BY TRACKING TOKEN
  const { data: order } = await supabase
    .from("orders")
    .select("*")
    .eq("tracking_token", params.token)
    .single();

  if (!order) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-pink-50 text-gray-700">
        <h1 className="text-3xl font-serif text-[#D4AF37] mb-4">Order Not Found</h1>
        <p>This royal order could not be located. Please check your confirmation email.</p>
      </div>
    );
  }

  // FETCH ITEMS
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
      product_colors!order_items_color_id_fkey (
        color_name,
        id,
        product_color_images!product_color_images_color_id_fkey (
          image_url,
          sort_order
        )
      )
    `)
    .eq("order_id", order.id);

  // FETCH SHIPMENTS
  const { data: shipments } = await supabase
    .from("shipments")
    .select("*")
    .eq("order_id", order.id)
    .order("created_at", { ascending: true });

  const shipping = order.shipping_address ? JSON.parse(order.shipping_address) : null;
  const status = order.status;

  return (
    <div className="min-h-screen bg-[#FFF5F7] flex flex-col items-center pt-[200px] pb-12 px-4 relative z-0">
      <div className="max-w-3xl w-full bg-white border-2 border-[#D4AF37] rounded-xl shadow-lg overflow-visible relative z-10">

        {/* HEADER */}
        <div className="relative w-full overflow-visible">
          <Image
            src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/header-long.png"
            alt="Princess Pirouette Boutique Header"
            width={1600}
            height={600}
            className="w-full h-auto rounded-t-xl object-contain"
            priority
          />
        </div>

        <div className="p-8 font-serif text-gray-700">
          <h1 className="text-4xl text-[#D4AF37] text-center mb-6">
            Track Your Royal Order ✨
          </h1>

          {/* TIMELINE */}
          <div className="mb-10">
            <h2 className="text-2xl text-[#D4AF37] mb-4">Order Status</h2>
            <div className="space-y-4">
              <TimelineItem label="Order Paid" active={status === "paid"} />
              <TimelineItem label="Processing" active={status === "processing"} />
              <TimelineItem label="Shipped" active={status === "shipped"} />
              <TimelineItem label="Delivered" active={status === "delivered"} />
            </div>
          </div>

          {/* SHIPMENTS */}
          <ShipmentDetails shipments={shipments || []} />

          {/* SHIPPING ADDRESS */}
          {shipping && (
            <div className="mb-10">
              <h2 className="text-2xl text-[#D4AF37] mb-2">Shipping Address</h2>
              <p>
                {shipping.line1}<br />
                {shipping.line2 && <>{shipping.line2}<br /></>}
                {shipping.city}, {shipping.state} {shipping.postal_code}<br />
                {shipping.country}
              </p>
            </div>
          )}

          {/* ⭐ GIFT MESSAGE (only if exists) */}
          {order.gift_message && (
            <div className="mb-10 p-4 rounded-lg bg-pink-50 border border-pink-200">
              <h2 className="text-2xl text-[#D4AF37] mb-2">Gift Message 🎀</h2>
              <p className="italic text-gray-700">
                "{order.gift_message}"
              </p>
            </div>
          )}

          {/* ITEMS */}
          <div className="mb-10">
            <h2 className="text-2xl text-[#D4AF37] mb-2">Items in Your Order</h2>
            <div className="space-y-4">
              {items?.map((item: any) => {
                const product = item.products;
                const color = item.product_colors;
                const images = color?.product_color_images;
                const firstImage = images?.[0]?.image_url;

                return (
                  <div key={item.id} className="flex items-center gap-4 border border-pink-200 rounded-lg p-4 bg-pink-50">
                    <Image
                      src={
                        firstImage ||
                        "https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/placeholder.png"
                      }
                      alt={product?.name || "Product"}
                      width={100}
                      height={100}
                      className="rounded-lg object-cover"
                    />
                    <div className="flex flex-col">
                      <p className="font-semibold text-gray-800">{product?.name}</p>
                      <p className="text-sm text-gray-600">Color: {color?.color_name}</p>
                      <p className="text-sm text-gray-600">Size: {item.size} | Qty: {item.quantity}</p>
                      <p className="text-sm text-gray-600">Price: ${item.price}</p>
                    </div>
                  </div>
                );
              })}
              {(!items || items.length === 0) && (
                <p className="text-gray-600 italic">We couldn’t find any items for this order yet.</p>
              )}
            </div>
          </div>
        </div>

        {/* FOOTER */}
        <div className="text-center py-6 bg-[#FFFEFF] border-t border-[#D4AF37]">
          <Image
            src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/logo.png"
            alt="Princess Pirouette Logo"
            width={60}
            height={60}
            className="mx-auto mb-3"
          />
          <p className="text-sm text-[#C09090]">
            © 2026 Princess Pirouette Boutique<br />
            1901 Caldwell Blvd, #1020, Nampa, Idaho 83651
          </p>
        </div>
      </div>
    </div>
  );
}

// TIMELINE ITEM
function TimelineItem({ label, active }: { label: string; active: boolean }) {
  return (
    <div className="flex items-center gap-3">
      <div
        className={`w-4 h-4 rounded-full border-2 ${
          active ? "bg-[#D4AF37] border-[#D4AF37]" : "border-gray-400"
        }`}
      ></div>
      <span
        className={`${
          active ? "text-[#D4AF37] font-semibold" : "text-gray-600"
        }`}
      >
        {label}
      </span>
    </div>
  );
}
