import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { shipmentId } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // FETCH SHIPMENT + ORDER
    const { data: shipment, error: shipmentError } = await supabase
      .from("shipments")
      .select("*, orders(*)")
      .eq("id", shipmentId)
      .single();

    if (shipmentError || !shipment) {
      console.error("Shipment fetch error:", shipmentError);
      return NextResponse.json({ error: "Shipment not found" }, { status: 400 });
    }

    const order = shipment.orders;
    const trackingToken = order.tracking_token;

    // FETCH ITEMS linked to this shipment
    const { data: items, error: itemsError } = await supabase
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
      .eq("shipment_id", shipmentId);

    if (itemsError) console.error("Delivered items fetch error:", itemsError);

    const itemsHtml =
      items?.map((item) => {
        const product = item.products;
        const color = item.product_colors;
        const image =
          color?.product_color_images?.sort(
            (a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999)
          )[0]?.image_url || "";
        return `
          <div style="margin-bottom:12px;padding:12px;background:#FFF;border:1px solid #E8D8D8;border-radius:8px;display:flex;gap:12px;">
            <img src="${image}" width="80" height="80" style="border-radius:6px;object-fit:cover;" />
            <div style="flex:1;font-family:'Times New Roman',serif;">
              <p style="margin:0;">
                <strong>Product:</strong> ${product?.name || "Unknown"}<br/>
                <strong>Size:</strong> ${item.size}<br/>
                <strong>Color:</strong> ${color?.color_name || "Unknown"}<br/>
                <strong>Quantity:</strong> ${item.quantity}<br/>
                <strong>Price:</strong> $${item.price}
              </p>
            </div>
          </div>`;
      }).join("") || "<p>No items found for this shipment.</p>";

    // SHIPPING ADDRESS
    let shippingAddress = "";
    try {
      if (order.shipping_address) {
        const parsed = JSON.parse(order.shipping_address);
        shippingAddress = `
          ${parsed.line1 || ""}<br/>
          ${parsed.line2 || ""}<br/>
          ${parsed.city || ""}, ${parsed.state || ""} ${parsed.postal_code || ""}<br/>
          ${parsed.country || ""}
        `;
      }
    } catch (e) {
      console.error("Shipping address parse error (delivered email):", e);
    }

    const html = `
    <html>
      <body style="margin:0;padding:0;background-color:#FFFFFF;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF;padding:20px 0;">
          <tr><td align="center">
            <table width="600" cellpadding="0" cellspacing="0" border="0"
              style="background-color:#FFF5F7;border:2px solid #D4AF37;border-radius:12px;
              box-shadow:0 0 12px rgba(212,175,55,0.25);overflow:hidden;">
              <tr><td>
                <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/header-long.png"
                     width="600" style="display:block;border-top-left-radius:12px;border-top-right-radius:12px;">
              </td></tr>
              <tr><td style="padding:30px;font-family:'Times New Roman',serif;color:#444;font-size:17px;line-height:1.7;">
                <h1 style="font-family:'Great Vibes',cursive;font-size:42px;color:#D4AF37;text-align:center;margin:0 0 20px;">
                  Your Royal Order Has Arrived ✨
                </h1>
                <p>Hello Princess! 👸🏽 Your royal treasures have arrived safely at your castle 🏰.</p>
                <p>We hope they bring you joy and sparkle!</p>

                <h3 style="font-family:'Playfair Display','Times New Roman',serif;color:#D4AF37;margin-top:24px;font-size:22px;">
                  Items Delivered
                </h3>
                ${itemsHtml}

                ${
                  shippingAddress
                    ? `
                <h3 style="font-family:'Playfair Display','Times New Roman',serif;color:#D4AF37;margin-top:24px;font-size:22px;">
                  Delivered To
                </h3>
                <p>${shippingAddress}</p>
                `
                    : ""
                }

                <h3 style="font-family:'Playfair Display','Times New Roman',serif;color:#D4AF37;margin-top:24px;font-size:22px;">
                  Need to Start a Return?
                </h3>
                <p>If something isn't quite perfect, you can begin a return using your royal portal below:</p>
                <div style="text-align:center;margin:30px 0;">
                  <a href="${process.env.NEXT_PUBLIC_SITE_URL}/returns/${trackingToken}"
                     style="display:inline-block;background-color:#D4AF37;color:#FFF;padding:14px 28px;
                     font-size:18px;font-family:'Playfair Display',serif;border-radius:8px;text-decoration:none;
                     box-shadow:0 4px 10px rgba(212,175,55,0.35);">
                     ✨ Open Return Portal ✨
                  </a>
                </div>
                <hr style="border:none;border-top:1px solid #D4AF37;margin:30px 0;">
                <p style="text-align:right;font-size:16px;">With love from the Boutique,<br/>
                   <span style="color:#D4AF37;font-family:'Playfair Display',serif;font-size:20px;">
                   Princess Pirouette Boutique</span></p>
              </td></tr>
              <tr><td align="center" style="padding:24px;background-color:#FFFEFF;border-top:1px solid #D4AF37;">
                <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/logo.png"
                     width="70" style="display:block;margin-bottom:14px;">
                <p style="color:#C09090;font-size:14px;">Follow the magic ✨</p>
                <p style="color:#C09090;font-size:12px;">© 2026 Princess Pirouette Boutique<br>
                   1901 Caldwell Blvd #1020 Nampa, Idaho 83651</p>
              </td></tr>
            </table>
          </td></tr>
        </table>
      </body>
    </html>`;

    await resend.emails.send({
      from: "Princess Pirouette Boutique <royals@princesspirouetteboutique.com>",
      to: order.customer_email,
      subject: `Your Order #${order.id} Has Been Delivered ✨`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order delivered email error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
