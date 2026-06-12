export function renderOrderConfirmationEmail({
  orderId,
  createdAt,
  customerName,
  customerEmail,
  shippingAddress,
  total,
  items,
}: {
  orderId: number;
  createdAt: string;
  customerName: string | null;
  customerEmail: string | null;
  shippingAddress: string | null;
  total: number;
  items: {
    name: string;
    colorName: string;
    size: string;
    quantity: number;
    price: number;
    imageUrl: string | null;
  }[];
}) {
  const formattedDate = new Date(createdAt).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <title>Your Order is Confirmed ✨</title>
  </head>

  <body style="margin:0; padding:0; background:#f8f4f0; font-family:'Times New Roman', serif;">

    <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f4f0; padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" style="background:white; border:2px solid #D4AF37; border-radius:20px; padding:20px;">

            <!-- HEADER IMAGE -->
            <tr>
              <td align="center" style="padding-bottom:20px;">
                <img src="https://princesspirouetteboutique.com/email/header.png"
                     alt="Princess Pirouette Boutique"
                     style="width:100%; max-width:560px; border-radius:16px;" />
              </td>
            </tr>

            <!-- TITLE -->
            <tr>
              <td align="center" style="padding:10px 20px;">
                <h1 style="
                  font-family:'Great Vibes', cursive;
                  font-size:42px;
                  color:#D4AF37;
                  margin:0;
                ">
                  Your Fairytale Begins ✨🩰
                </h1>
              </td>
            </tr>

            <!-- SUBTITLE -->
            <tr>
              <td align="center" style="padding:0 20px 20px;">
                <p style="
                  font-family:'Playfair Display', serif;
                  font-style:italic;
                  font-size:18px;
                  color:#B8860B;
                  margin:0;
                ">
                  Thank you for your order, Princess!
                </p>
              </td>
            </tr>

            <!-- ORDER DETAILS BOX -->
            <tr>
              <td style="padding:20px;">
                <table width="100%" cellpadding="0" cellspacing="0" style="
                  background:#fff7fb;
                  border:1px solid #D4AF37;
                  border-radius:16px;
                  padding:20px;
                ">
                  <tr>
                    <td style="font-size:16px; color:#8B4565;">
                      <strong>Order Number:</strong> #${orderId}<br/>
                      <strong>Order Date:</strong> ${formattedDate}<br/>
                      <strong>Email:</strong> ${customerEmail ?? ""}<br/>
                      ${
                        shippingAddress
                          ? `<strong>Shipping Address:</strong><br/>
                             <span style="white-space:pre-line;">${shippingAddress}</span>`
                          : ""
                      }
                    </td>
                  </tr>
                </table>
              </td>
            </tr>

            <!-- ITEMS LOOP -->
            ${items
              .map(
                (item) => `
              <tr>
                <td style="padding:10px 20px;">
                  <table width="100%" cellpadding="0" cellspacing="0" style="
                    border-bottom:1px solid #E8C6D8;
                    padding-bottom:15px;
                    margin-bottom:15px;
                  ">
                    <tr>
                      <td width="120">
                        ${
                          item.imageUrl
                            ? `<img src="${item.imageUrl}" style="width:120px; height:auto; border-radius:12px;" />`
                            : ""
                        }
                      </td>

                      <td style="padding-left:15px; font-size:15px; color:#8B4565;">
                        <strong>${item.name}</strong><br/>
                        Color: ${item.colorName}<br/>
                        Size: ${item.size}<br/>
                        Quantity: ${item.quantity}<br/>
                        Price: $${item.price.toFixed(2)}
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            `
              )
              .join("")}

            <!-- TOTAL -->
            <tr>
              <td align="right" style="padding:0 20px 20px;">
                <p style="
                  font-size:20px;
                  font-weight:bold;
                  color:#D4AF37;
                  margin:0;
                ">
                  Order Total: $${total.toFixed(2)}
                </p>
              </td>
            </tr>

            <!-- FOOTER -->
            <tr>
              <td align="center" style="padding:20px;">
                <p style="
                  font-family:'Playfair Display', serif;
                  font-style:italic;
                  font-size:16px;
                  color:#B8860B;
                  margin-bottom:10px;
                ">
                  With love and magic,<br/>
                  <strong>Princess Pirouette Boutique</strong>
                </p>

                <p style="font-size:12px; color:#C09090; margin:0;">
                  © Princess Pirouette Boutique — All Rights Reserved
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
}
