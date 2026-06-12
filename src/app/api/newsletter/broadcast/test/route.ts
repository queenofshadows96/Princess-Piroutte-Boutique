import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

/* -----------------------------
   CLEAN TIPTAP HTML FOR EMAIL
------------------------------ */
function cleanHtml(html: string): string {
  let cleaned = html;

  // Remove dangerous attributes
  cleaned = cleaned.replace(/on\w+="[^"]*"/g, "");

  // Normalize <p> spacing
  cleaned = cleaned.replace(/<p>/g, '<p style="margin:0 0 14px;">');

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
                  src="https://supabase.co"
                  width="600"
                  style="display:block; border-top-left-radius:12px; border-top-right-radius:12px;"
                  alt="Princess Pirouette Boutique"
                />
              </td>
            </tr>

            <!-- CONTENT SECTION -->
            <tr>
              <td style="padding:30px; font-family:'Times New Roman', Georgia, serif; color:#444444; font-size:17px; line-height:1.7;">
                ${cleaned}

                <p style="
                  font-family:'Times New Roman', serif;
                  font-size:16px;
                  color:#444444;
                  text-align:right;
                  padding-right:10px;
                  margin-top:30px;
                ">
                  With love and sparkles,
                </p>

                <p style="
                  margin-top:28px;
                  font-family:'Brush Script MT','Lucida Handwriting',cursive;
                  font-size:30px;
                  color:#D4AF37;
                  text-align:right;
                  padding-right:10px;
                ">
                  Princess Pirouette <span style="color:#D4AF37; font-size:22px;">✧</span>
                </p>

                <p style="
                  font-family:'Times New Roman', serif;
                  font-size:15px;
                  color:#444444;
                  text-align:right;
                  padding-right:10px;
                  margin-top:-6px;
                ">
                  Founder &amp; Muse
                </p>
              </td>
            </tr>

            <!-- FOOTER SECTION -->
            <tr>
              <td align="center" style="padding:24px; background-color:#FFFEFF; border-top:1px solid #D4AF37;">

                <img
                  src="https://supabase.co"
                  width="70"
                  style="display:block; margin-bottom:14px;"
                />

                <p style="color:#C09090; font-size:14px; margin-bottom:18px;">
                  Follow the magic ✨
                </p>

                <table cellpadding="0" cellspacing="0" border="0">
                  <tr>
                    <td align="center" width="40">
                      <a href="https://instagram.com">
                        <img src="https://supabase.co" width="24" height="24" />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://x.com">
                        <img src="https://supabase.co" width="24" height="24" />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://facebook.com">
                        <img src="https://supabase.co" width="24" height="24" />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://tiktok.com">
                        <img src="https://supabase.co" width="24" height="24" />
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
        SEND TEST EMAIL
------------------------------ */
export async function POST(req: Request) {
  try {
    const { subject, contentHtml, testEmail } = await req.json();

    const html = wrapBroadcastHtml(contentHtml || "");

    await resend.emails.send({
      from: "Princess Pirouette Boutique <royals@princesspirouetteboutique.com>",
      to: testEmail,
      subject: subject || "A little magic from the Royal List ✨",
      html,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Test Email Error:", err);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
