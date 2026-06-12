import { NextResponse } from "next/server";
import { Resend } from "resend";
import { createClient } from "@supabase/supabase-js";

const resend = new Resend(process.env.RESEND_API_KEY);

function generateUnsubscribeToken() {
  return crypto.randomUUID();
}

export async function POST(req: Request) {
  const { email } = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  // 1. CHECK IF EMAIL ALREADY EXISTS
  const { data: existing } = await supabase
    .from("newsletter_subscribers")
    .select("*")
    .eq("email", email)
    .single();

  // 2. IF EXISTS AND unsubscribed = true → RESUBSCRIBE (NO WELCOME EMAIL)
  if (existing && existing.unsubscribed === true) {
    await supabase
      .from("newsletter_subscribers")
      .update({
        unsubscribed: false,
      })
      .eq("email", email);

    // GA4 RESUBSCRIBE EVENT
    await fetch(
      `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
      {
        method: "POST",
        body: JSON.stringify({
          client_id: email,
          events: [
            {
              name: "newsletter_resubscribe",
              params: {
                email_domain: email.split("@")[1],
                method: "subscribe_form",
              },
            },
          ],
        }),
      }
    );

    return NextResponse.json({ success: true, resubscribed: true });
  }

  // 3. IF EXISTS AND unsubscribed = false → ALREADY SUBSCRIBED
  if (existing && existing.unsubscribed === false) {
    return NextResponse.json(
      { error: "already subscribed" },
      { status: 400 }
    );
  }

  // 4. NEW SUBSCRIBER → INSERT + SEND WELCOME EMAIL
  const unsubscribe_token = generateUnsubscribeToken();

  const { data, error } = await supabase
    .from("newsletter_subscribers")
    .insert([{ email, unsubscribe_token, unsubscribed: false }])
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 400 });
  }

  const unsubscribeUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/newsletter/unsubscribe?token=${unsubscribe_token}`;

  // GA4 SIGNUP EVENT
  await fetch(
    `https://www.google-analytics.com/mp/collect?measurement_id=${process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}&api_secret=${process.env.GA_API_SECRET}`,
    {
      method: "POST",
      body: JSON.stringify({
        client_id: email,
        events: [
          {
            name: "newsletter_signup",
            params: {
              email_domain: email.split("@")[1],
              method: "subscribe_form",
            },
          },
        ],
      }),
    }
  );

  // ⭐ FIXED WELCOME EMAIL HTML WITH CORRECT FALLBACK FONTS
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
                  Welcome to the Fairytale ✨🩰
                </h1>

                <p style="font-family:'Times New Roman',serif;">Hello Princess! 👸🏽</p>

                <p style="font-family:'Times New Roman',serif;">
                  Welcome to the Royal List. I am so happy you’re here for the beginning of something truly magical.✨ 
                  Princess Pirouette Boutique was born from a simple, magical belief: that elegance and imagination belong together. 
                  We don’t just design dancewear; we create wearable works of art—a perfect blend of functionality, femininity, and fantasy.
                </p>

                <h3 style="
                  font-family:'Playfair Display','Times New Roman',serif;
                  color:#D4AF37;
                  margin-top:24px;
                  font-size:22px;
                ">
                  Our Story & Mission
                </h3>

                <p style="font-family:'Times New Roman',serif;">
                  This boutique is dedicated to celebrating the graceful, playful, and magical spirit that lives within everyone. 
                  Whether you are a seasoned dancer or someone who simply loves expressive fashion, our collections are designed to make you feel extraordinary.
                </p>

                <p style="font-family:'Times New Roman',serif;">
                  We also believe that the world we dance in should be as beautiful as the art itself. 
                  That is why Princess Pirouette is committed to mindful luxury—using premium recycled materials and organic fibers 
                  that are as gentle on the earth as they are on your skin.
                </p>

                <p style="font-family:'Times New Roman',serif;">
                  From the dance studio to everyday wear, we offer a magical escape where ballet meets fantasy. 
                  We specialize in beautifully crafted leotards, tutus, and skirts that capture the wonder of childhood 
                  while celebrating the grace of femininity in its purest form.
                </p>

                <p style="font-family:'Times New Roman',serif;">As a member of the Royal List, you’re part of the magic:</p>

                <ul style="padding-left:20px; line-height:1.7; margin:0 0 16px; font-family:'Times New Roman',serif;">
                  <li>🎀 <strong style="color:#D4AF37;">First Access:</strong> Be the first to see our enchanting new prints and collections.</li>
                  <li>✨ <strong style="color:#D4AF37;">Boutique Perks:</strong> Enjoy exclusive updates and secret shop events.</li>
                  <li>🩰 <strong style="color:#D4AF37;">A World of Wonder:</strong> Get a behind-the-scenes look at how we bring our designs to life.</li>
                </ul>

                <p style="font-family:'Times New Roman',serif;">
                  Because at Princess Pirouette Boutique, we believe that the little princess inside everyone deserves to shine.
                </p>

                <p style="
                  font-family:'Times New Roman',serif;
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
                  font-family:'Times New Roman',serif;
                  font-size:15px;
                  color:#444444;
                  text-align:right;
                  padding-right:10px;
                  margin-top:-6px;
                ">
                  Founder & Muse
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
                        <img
                          src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/insta-icon.png"
                          width="24"
                          height="24"
                        />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://x.com/ppirouettebtq?s=21">
                        <img
                          src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/twitter-icon.png"
                          width="24"
                          height="24"
                        />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://www.facebook.com/share/1QEMk8EM3h/?mibextid=wwXIfr">
                        <img
                          src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/facebook-icon.png"
                          width="24"
                          height="24"
                        />
                      </a>
                    </td>

                    <td align="center" width="40">
                      <a href="https://www.tiktok.com/@princesspirouetteboutiq?_r=1&_t=ZP-95tgOKHWsud">
                        <img
                          src="https://ohfiglvuvulucoolkchs.supabase.co/storage/v1/object/public/Assets/tiktok-icon.png"
                          width="24"
                          height="24"
                        />
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

                <a href="${unsubscribeUrl}" style="color:#B8860B; font-size:12px; text-decoration:underline;">
                  Unsubscribe
                </a>

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
    to: email,
    subject: "Welcome to the Fairytale ✨🩰",
    html,
  });

  return NextResponse.json({ success: true });
}
