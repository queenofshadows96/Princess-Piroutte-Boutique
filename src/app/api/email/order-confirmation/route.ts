import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const { orderId } = await req.json();

    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // FETCH ORDER
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("*")
      .eq("id", orderId)
      .single();

    if (orderError || !order) {
      console.error("Order fetch error:", orderError);
      return NextResponse.json({ error: "Order not found" }, { status: 400 });
    }

    const trackingToken = order.tracking_token;

    // FETCH ITEMS
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
      .eq("order_id", orderId);

    if (itemsError) {
      console.error("Order items fetch error:", itemsError);
    }

    // SHIPPING ADDRESS
    let shippingAddress = "No shipping address provided";
    try {
      const parsed = JSON.parse(order.shipping_address);
      if (parsed) {
        shippingAddress = `
          ${parsed.line1 || ""}<br/>
          ${parsed.line2 || ""}<br/>
          ${parsed.city || ""}, ${parsed.state || ""} ${parsed.postal_code || ""}<br/>
          ${parsed.country || ""}
        `;
      }
    } catch (e) {
      console.error("Shipping address parse error:", e);
    }

    // ITEMS HTML
    const itemsHtml =
      items
        ?.map((item) => {
          const product = item.products;
          const color = item.product_colors;

          const productImage =
            color?.product_color_images
              ?.sort((a, b) => (a.sort_order ?? 999) - (b.sort_order ?? 999))[0]
              ?.image_url || null;

          return `
            <div style="margin-bottom:12px; padding:12px; background:#FFF; border:1px solid #E8D8D8; border-radius:8px; display:flex; gap:12px;">
              <img src="${productImage || ""}" width="80" height="80" style="border-radius:6px; object-fit:cover;" />
              <div style="flex:1; font-family:'Times New Roman',serif;">
                <p style="margin:0;">
                  <strong>Product:</strong> ${product?.name || "Unknown"}<br/>
                  <strong>Size:</strong> ${item.size}<br/>
                  <strong>Color:</strong> ${color?.color_name || "Unknown"}<br/>
                  <strong>Quantity:</strong> ${item.quantity}<br/>
                  <strong>Price:</strong> $${item.price}
                </p>
              </div>
            </div>
          `;
        })
        .join("") || "<p>No items found.</p>";

    // ⭐ GIFT MESSAGE HTML (only if exists)
    const giftMessageHtml = order.gift_message
      ? `
        <h3 style="font-family:'Playfair Display','Times New Roman',serif; color:#D4AF37; margin-top:24px; font-size:22px;">
          Gift Message
        </h3>
        <p style="font-family:'Times New Roman',serif; font-size:17px; color:#444; padding:12px; background:#FFF8FB; border-left:4px solid #D4AF37; border-radius:6px;">
          "${order.gift_message}"
        </p>
      `
      : "";

    // FINAL EMAIL HTML
    const html = `
    <html>
      <body style="margin:0; padding:0; background-color:#FFFFFF;">
        <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF; padding:20px 0;">
          <tr>
            <td align="center">
              <table width="600" cellpadding="0" cellspacing="0" border="0"
                style="background-color:#FFF5F7; border:2px solid #D4AF37; border-radius:12px;
                box-shadow:0 0 12px rgba(212,175,55,0.25); overflow:hidden;">
                
                <tr>
                  <td>
                    <img
                      src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/header-long.png"
                      width="600"
                      style="display:block; border-top-left-radius:12px; border-top-right-radius:12px;"
                    />
                  </td>
                </tr>

                <tr>
                  <td style="padding:30px; font-family:'Times New Roman', serif; color:#444444; font-size:17px; line-height:1.7;">

                    <h1 style="
                      font-family:'Great Vibes','Brush Script MT','Lucida Handwriting',cursive;
                      font-size:42px;
                      color:#D4AF37;
                      text-align:center;
                      margin:0 0 20px;
                    ">
                      Your Royal Order Has Been Confirmed ✨
                    </h1>

                    <p>Hello Princess! 👸🏽 Your magical order has been received and is now being prepared with love, care, and a sprinkle of fairytale sparkle.</p>

                    <h3 style="font-family:'Playfair Display','Times New Roman',serif; color:#D4AF37; margin-top:24px; font-size:22px;">
                      Order Details
                    </h3>
                    <p>
                      <strong>Order Number:</strong> ${orderId}<br/>
                      <strong>Total:</strong> $${order.total}
                    </p>

                    <h3 style="font-family:'Playfair Display','Times New Roman',serif; color:#D4AF37; margin-top:24px; font-size:22px;">
                      Shipping Address
                    </h3>
                    <p>${shippingAddress}</p>

                    ${giftMessageHtml}

                    <h3 style="font-family:'Playfair Display','Times New Roman',serif; color:#D4AF37; margin-top:24px; font-size:22px;">
                      Items in Your Order
                    </h3>
                    ${itemsHtml}

                    <div style="text-align:center; margin:30px 0;">
                      <a href="${process.env.NEXT_PUBLIC_SITE_URL}/orders/${trackingToken}"
                        style="
                          display:inline-block;
                          background-color:#D4AF37;
                          color:#FFFFFF;
                          padding:14px 28px;
                          font-size:18px;
                          font-family:'Playfair Display','Times New Roman',serif;
                          border-radius:8px;
                          text-decoration:none;
                          box-shadow:0 4px 10px rgba(212,175,55,0.35);
                        ">
                        ✨ Track Your Order ✨
                      </a>
                    </div>

                    <hr style="border:none; border-top:1px solid #D4AF37; margin:30px 0;"/>

                    <p style="font-family:'Times New Roman',serif; font-size:16px; color:#444444; text-align:right; padding-right:10px; margin-top:10px;">
                      With love from the Boutique,
                    </p>
                    <p style="font-family:'Playfair Display','Times New Roman',serif; font-size:20px; color:#D4AF37; text-align:right; padding-right:10px; margin-top:4px;">
                      Princess Pirouette Boutique
                    </p>
                  </td>
                </tr>

                <tr>
                  <td align="center" style="padding:24px; background-color:#FFFEFF; border-top:1px solid #D4AF37;">
                    <img
                      src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/logo.png"
                      width="70"
                      style="display:block; margin-bottom:14px;"
                    />
                    <p style="color:#C09090; font-size:14px; margin-bottom:18px;">
                      Follow the magic ✨
                    </p>

                    <table cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td align="center" width="40">
                          <a href="https://www.instagram.com/princesspirouetteboutique?igsh=OHc0cXlrM3R6OTNh&utm_source=qr">
                            <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/insta-icon.png" width="24" height="24"/>
                          </a>
                        </td>
                        <td align="center" width="40">
                          <a href="https://x.com/ppirouettebtq?s=21">
                            <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/twitter-icon.png" width="24" height="24"/>
                          </a>
                        </td>
                        <td align="center" width="40">
                          <a href="https://www.facebook.com/share/1QEMk8EM3h/?mibextid=wwXIfr">
                            <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/facebook-icon.png" width="24" height="24"/>
                          </a>
                        </td>
                        <td align="center" width="40">
                          <a href="https://www.tiktok.com/@princesspirouetteboutiq?_r=1&_t=ZP-95tgOKHWsud">
                            <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/tiktok-icon.png" width="24" height="24"/>
                          </a>
                        </td>
                      </tr>
                    </table>

                    <p style="color:#C09090; font-size:12px; margin-top:16px; margin-bottom:4px;">
                      © 2026 Princess Pirouette Boutique
                    </p>
                    <p style="color:#C09090; font-size:12px; margin:0 0 10px;">
                      1901 Caldwell Blvd, #1020, Nampa, Idaho 83651
                    </p>
                  </td>
                </tr>

              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>
    `;

    await resend.emails.send({
      from: "Princess Pirouette Boutique <royals@princesspirouetteboutique.com>",
      to: order.customer_email,
      subject: `Your Order #${orderId} is Confirmed ✨`,
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Order confirmation email error:", err);
    return NextResponse.json({ error: "Email failed" }, { status: 500 });
  }
}
