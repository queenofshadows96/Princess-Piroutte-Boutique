import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(_req: Request, { params }: { params: { id: string } }) {
  console.log("📦 [PackingSlip] Generating slip for shipment:", params.id);

  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: shipment, error: shipmentError } = await supabase
      .from("shipments")
      .select(`
        id,
        order_id,
        carrier,
        tracking_number,
        status,
        shipped_at,
        orders (
          id,
          customer_name,
          customer_email,
          shipping_address,
          gift_message,
          hide_prices,
          order_items (
            id,
            size,
            quantity,
            price,
            products ( name )
          )
        )
      `)
      .eq("id", params.id)
      .single();

    if (shipmentError) {
      console.error("❌ [PackingSlip] Shipment fetch error:", shipmentError);
      return NextResponse.json({ success: false, error: shipmentError });
    }

    const hidePrices = shipment.orders?.hide_prices === true;
    const giftMessage = shipment.orders?.gift_message || null;

    let shipping = null;
    try {
      shipping = shipment.orders?.shipping_address
        ? JSON.parse(shipment.orders.shipping_address)
        : null;
    } catch {}

    // ⭐ Build item rows depending on hidePrices
    const itemRows = shipment.orders.order_items
      .map((i: any) => {
        const priceCell = hidePrices ? "" : `$${i.price}`;
        return `
          <tr>
            <td>${i.products.name}</td>
            <td>${i.size}</td>
            <td>${i.quantity}</td>
            ${hidePrices ? "" : `<td>${priceCell}</td>`}
          </tr>
        `;
      })
      .join("");

    // ⭐ Build table header depending on hidePrices
    const tableHeader = hidePrices
      ? `<tr><th>Product</th><th>Size</th><th>Qty</th></tr>`
      : `<tr><th>Product</th><th>Size</th><th>Qty</th><th>Price</th></tr>`;

    const html = `
      <html>
        <head>
          <meta charset="UTF-8" />
          <title>Packing Slip #${shipment.id}</title>
          <style>
            body {
              font-family: "Segoe UI", sans-serif;
              padding: 20px;
              background-color: #fff0f6;
              width: 100%;
              max-width: 8.5in;
              margin: auto;
              border: 3px solid #c5a24a;
              border-radius: 10px;
              position: relative;
              box-sizing: border-box;
            }
            .header {
              text-align: center;
              margin-bottom: 20px;
            }
            .logo {
              width: 120px;
              height: auto;
              margin-bottom: 10px;
            }
            .shop-name {
              font-size: 28px;
              font-weight: 700;
              color: #c5a24a;
            }
            h2, h3 {
              color: #333;
            }
            table {
              width: 100%;
              border-collapse: collapse;
              margin-top: 20px;
              border: 2px solid #c5a24a;
            }
            th, td {
              border: 1px solid #c5a24a;
              padding: 6px;
              text-align: left;
            }
            th {
              background-color: #fdf6f0;
              color: #333;
            }
            .footer {
              margin-top: 30px;
              text-align: center;
              color: #888;
              font-size: 14px;
            }
            .watermark {
              position: absolute;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%) rotate(-30deg);
              font-size: 48px;
              color: rgba(197, 162, 74, 0.08);
              white-space: nowrap;
              pointer-events: none;
              user-select: none;
            }
            @media print {
              button { display: none; }
            }
          </style>

          <script>
            const urlParams = new URLSearchParams(window.location.search);
            const label = urlParams.get("label") || "Fulfillment Copy";

            window.addEventListener("DOMContentLoaded", () => {
              const labelDiv = document.createElement("div");
              labelDiv.textContent = label;
              labelDiv.style.textAlign = "right";
              labelDiv.style.fontSize = "14px";
              labelDiv.style.color = "#c5a24a";
              labelDiv.style.fontWeight = "600";
              document.body.prepend(labelDiv);

              const btn = document.createElement("button");
              btn.textContent = "🖨️ Print Both Copies";
              btn.style.backgroundColor = "#c5a24a";
              btn.style.color = "#fff";
              btn.style.border = "none";
              btn.style.padding = "8px 14px";
              btn.style.borderRadius = "6px";
              btn.style.cursor = "pointer";
              btn.style.fontWeight = "600";
              btn.style.float = "right";
              btn.onclick = () => {
                window.print();
                setTimeout(() => {
                  const newUrl = window.location.href.split("?")[0] + "?label=Customer Copy";
                  const newTab = window.open(newUrl, "_blank");
                  newTab.document.write("<p style='text-align:center;font-family:Segoe UI;color:#c5a24a;font-weight:600;margin-top:40px;opacity:0.8;'>Printing Customer Copy…</p>");
                  setTimeout(() => {
                    newTab.location.href = newUrl;
                    setTimeout(() => {
                      newTab.print();
                      setTimeout(() => newTab.close(), 1000);
                    }, 1000);
                  }, 800);
                }, 1000);
              };
              document.body.prepend(btn);
            });
          </script>
        </head>
        <body>
          <div class="watermark">Princess Pirouette Boutique</div>

          <div class="header">
            <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/logo.png" alt="Princess Pirouette Boutique Logo" class="logo" />
            <div class="shop-name">Princess Pirouette Boutique</div>
          </div>

          <h2>Packing Slip #${shipment.id}</h2>
          <p><strong>Order ID:</strong> ${shipment.order_id}</p>
          <p><strong>Carrier:</strong> ${shipment.carrier}</p>
          <p><strong>Tracking:</strong> ${shipment.tracking_number}</p>
          <p><strong>Status:</strong> ${shipment.status}</p>
          <p><strong>Shipped:</strong> ${shipment.shipped_at || "—"}</p>
          <hr />

          <h3>Customer</h3>
          <p>${shipment.orders.customer_name}<br />
          ${shipment.orders.customer_email}</p>
          ${
            shipping
              ? `<p>${shipping.line1}<br />${shipping.city}, ${shipping.state} ${shipping.postal_code}<br />${shipping.country}</p>`
              : ""
          }

          ${
            giftMessage
              ? `<h3>Gift Message</h3><p style="font-style:italic;color:#555;">"${giftMessage}"</p>`
              : ""
          }

          <h3>Items</h3>
          <table>
            ${tableHeader}
            ${itemRows}
          </table>

          <div class="footer">
            Thank you for shopping with Princess Pirouette Boutique ✨
          </div>
        </body>
      </html>
    `;

    return new NextResponse(html, {
      headers: { "Content-Type": "text/html" },
    });
  } catch (err) {
    console.error("💥 [PackingSlip] Route error:", err);
    return NextResponse.json({ success: false });
  }
}
