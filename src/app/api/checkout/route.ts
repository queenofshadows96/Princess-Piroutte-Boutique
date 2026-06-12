import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    console.log("🔥 [CHECKOUT] Incoming request to /api/checkout");

    const {
      items,
      customerEmail,
      customerName,
      shippingAddress,
      giftMessage,
      hidePrices,
    } = await req.json();

    console.log("📦 [CHECKOUT] Received body:", {
      items,
      customerEmail,
      customerName,
      shippingAddress,
      giftMessage,
      hidePrices,
    });

    if (!items || items.length === 0) {
      console.error("❌ [CHECKOUT] No items provided");
      return NextResponse.json(
        { error: "No items provided" },
        { status: 400 }
      );
    }

    console.log("🛍️ [CHECKOUT] Building line items…");

    const lineItems = items.map((item: any) => {
      console.log("➡️ [CHECKOUT] Item:", item);

      return {
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            ...(item.description ? { description: item.description } : {}),
            images: item.image ? [item.image] : [],
            metadata: {
              product_id: item.id,
              size: item.size,
              colorId: item.colorId,
            },
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity || 1,
      };
    });

    console.log("🧾 [CHECKOUT] Final lineItems:", lineItems);

    console.log("📮 [CHECKOUT] Creating Stripe Checkout Session…");

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],
      customer_email: customerEmail,

      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      shipping_options: [
        {
          shipping_rate_data: {
            type: "fixed_amount",
            fixed_amount: { amount: 0, currency: "usd" },
            display_name: "Standard Shipping",
            delivery_estimate: {
              minimum: { unit: "business_day", value: 3 },
              maximum: { unit: "business_day", value: 7 },
            },
          },
        },
      ],

      expand: ["line_items", "line_items.data.price.product"],

      line_items: lineItems,

      metadata: {
        customerName,
        shippingAddress,
        giftMessage: giftMessage || "",
        hidePrices: hidePrices ? "true" : "false",
        cart: JSON.stringify(items),
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    });

    console.log("✅ [CHECKOUT] Session created:", session.id);

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("💥 [CHECKOUT] Stripe error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
