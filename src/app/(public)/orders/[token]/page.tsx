import { createClient } from "@supabase/supabase-js";
import Image from "next/image";

export default async function OrderPage({ params }: { params: { token: string } }) {
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

  const shipping = order.shipping_address ? JSON.parse(order.shipping_address) : null;

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
          <h1 className="text-4xl font-[Great_Vibes] text-[#D4AF37] text-center mb-6">
            Your Royal Order ✨
          </h1>

          {/* ORDER SUMMARY */}
          <p className="text-lg mb-4">
            <strong>Order Number:</strong> {order.id}
            <br />
            <strong>Total:</strong> ${order.total}
            <br />
            <strong>Status:</strong> {order.status}
          </p>

          {/* SHIPPING ADDRESS */}
          {shipping && (
            <div className="mb-6">
              <h2 className="text-2xl font-[Playfair_Display] text-[#D4AF37] mb-2">
                Shipping Address
              </h2>
              <p>
                {shipping.line1}
                <br />
                {shipping.line2 && <>{shipping.line2}<br /></>}
                {shipping.city}, {shipping.state} {shipping.postal_code}
                <br />
                {shipping.country}
              </p>
            </div>
          )}

          {/* ⭐ GIFT MESSAGE (only if exists) */}
          {order.gift_message && (
            <div className="mb-6 p-4 rounded-lg bg-pink-50 border border-pink-200">
              <h2 className="text-2xl font-[Playfair_Display] text-[#D4AF37] mb-2">
                Gift Message 🎀
              </h2>
              <p className="italic text-gray-700">
                "{order.gift_message}"
              </p>
            </div>
          )}

          {/* ITEMS */}
          <div className="mb-6">
            <h2 className="text-2xl font-[Playfair_Display] text-[#D4AF37] mb-2">
              Items in Your Order
            </h2>

            <div className="space-y-3">
              {items?.map((item) => {
                const product = item.products;
                const color = item.product_colors;
                const images = color?.product_color_images;
                const firstImage = images?.[0]?.image_url;

                return (
                  <div
                    key={item.id}
                    className="flex gap-4 border border-pink-200 rounded-lg p-4 bg-pink-50"
                  >
                    <Image
                      src={
                        firstImage ||
                        "https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/placeholder.png"
                      }
                      alt={product?.name || "Product"}
                      width={90}
                      height={90}
                      className="rounded-lg object-cover"
                    />

                    <div>
                      <p>
                        <strong>Product:</strong> {product?.name}
                        <br />
                        <strong>Size:</strong> {item.size}
                        <br />
                        <strong>Color:</strong> {color?.color_name}
                        <br />
                        <strong>Quantity:</strong> {item.quantity}
                        <br />
                        <strong>Price:</strong> ${item.price}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* TRACK ORDER BUTTON */}
          <div className="text-center mt-8">
            <a
              href={`/shipping/track/${order.tracking_token}`}
              className="inline-block bg-[#D4AF37] text-white py-3 px-6 rounded-lg text-lg font-[Playfair_Display] shadow-md hover:shadow-lg transition-all"
            >
              ✨ Track Your Order ✨
            </a>
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
