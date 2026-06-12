import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

/* -----------------------------
   CLEAN TIPTAP HTML FOR EMAIL
------------------------------ */
function cleanHtml(html: string): string {
  let cleaned = html;

  cleaned = cleaned.replace(/on\w+="[^"]*"/g, "");
  cleaned = cleaned.replace(/<span[^>]*><\/span>/g, "");
  cleaned = cleaned.replace(/<p>/g, '<p style="margin:0 0 14px;">');
  cleaned = cleaned.replace(/data-[^=]+="[^"]*"/g, "");

  return cleaned;
}

/* -----------------------------
   WRAP IN BOUTIQUE EMAIL SHELL
------------------------------ */
function wrapBroadcastHtml(content: string) {
  const cleaned = cleanHtml(content);

  return `
  <html>
  <body style="margin:0; padding:0; background-color:#FFFFFF;">
    <table width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:#FFFFFF; padding:20px 0;">
      <tr>
        <td align="center">

          <table width="600" cellpadding="0" cellspacing="0" border="0"
            style="background-color:#FFF5F7; border:2px solid #D4AF37; border-radius:12px;
            box-shadow:0 0 12px rgba(212,175,55,0.25); overflow:hidden;">

            <!-- HEADER IMAGE -->
            <tr>
              <td>
                <img
                  src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/header-long.png"
                  width="600"
                  style="display:block; border-top-left-radius:12px; border-top-right-radius:12px;"
                  alt="Princess Pirouette Boutique"
                />
              </td>
            </tr>

            <!-- CONTENT SECTION -->
            <tr>
              <td style="
      padding:30px;
  font-family: Palatino, 'Palatino Linotype', 'Book Antiqua', Georgia, serif;
  color:#444444;
  font-size:17px;
  line-height:1.7;
">
  ${cleaned}


              </td>
            </tr>

            <!-- FOOTER SECTION -->
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
                        <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/insta-icon.png" width="24" height="24" />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://x.com/ppirouettebtq?s=21">
                        <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/twitter-icon.png" width="24" height="24" />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://www.facebook.com/share/1QEMk8EM3h/?mibextid=wwXIfr">
                        <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/facebook-icon.png" width="24" height="24" />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://www.tiktok.com/@princesspirouetteboutiq?_r=1&_t=ZP-95tgOKHWsud">
                        <img src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/tiktok-icon.png" width="24" height="24" />
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
}

/* -----------------------------
        SEND BROADCAST
------------------------------ */
export async function POST(req: Request) {
  try {
    const { subject, contentHtml, testEmail } = await req.json();

    const html = wrapBroadcastHtml(contentHtml || "");

    /* -----------------------------
          ⭐ TEST EMAIL MODE
    ------------------------------ */
    if (testEmail) {
      await resend.emails.send({
        from: "Princess Pirouette Boutique <royals@princesspirouetteboutique.com>",
        to: testEmail,
        subject: subject || "Test Broadcast ✨",
        html,
      });

      return NextResponse.json({ success: true, test: true });
    }

    /* -----------------------------
          NORMAL BROADCAST MODE
    ------------------------------ */
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    const { data: subscribers, error } = await supabase
      .from("newsletter_subscribers")
      .select("email")
      .eq("unsubscribed", false);

    if (error) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (!subscribers || subscribers.length === 0) {
      return NextResponse.json({ error: "No subscribers found to send to." }, { status: 400 });
    }

    const to = subscribers.map((s) => s.email as string);

    await resend.emails.send({
      from: "Princess Pirouette Boutique <royals@princesspirouetteboutique.com>",
      to,
      subject: subject || "A little magic from the Royal List ✨",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Broadcast Send Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
