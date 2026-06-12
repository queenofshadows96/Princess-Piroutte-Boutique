import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  console.log("🔥 WEBHOOK HIT");

  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  const secret =
    process.env.NODE_ENV === "production"
      ? process.env.STRIPE_WEBHOOK_SECRET_PROD
      : process.env.STRIPE_WEBHOOK_SECRET_LOCAL;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, secret!);
    console.log("✅ Webhook signature verified");
  } catch (error) {
    console.error("❌ Webhook signature error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }

  if (event.type !== "checkout.session.completed") {
    return NextResponse.json({ received: true });
  }

  try {
    const session = event.data.object as Stripe.Checkout.Session;

    // ⭐ Retrieve full session with line items + payment intent
    const fullSession = await stripe.checkout.sessions.retrieve(session.id, {
      expand: ["line_items.data.price.product", "payment_intent"],
    });

    // ⭐ Extract metadata (gift message + hide prices)
    const giftMessage = fullSession.metadata?.giftMessage || "";
    const hidePrices = fullSession.metadata?.hidePrices === "true";

    // ⭐ Extract shipping details
    const shippingAddress =
      fullSession.shipping_details?.address ||
      fullSession.customer_details?.address ||
      null;

    const shippingName =
      fullSession.shipping_details?.name ||
      fullSession.customer_details?.name ||
      "Guest";

    console.log("📍 DEBUG ADDRESS:", shippingAddress);

    // ⭐ Build order items
    const lineItems = fullSession.line_items?.data ?? [];
    const items = lineItems.map((li) => {
      const product = li.price?.product as Stripe.Product;
      return {
        id: product.metadata.product_id,
        name: product.name,
        image: product.images?.[0] || null,
        size: product.metadata.size,
        colorId: product.metadata.colorId,
        quantity: li.quantity,
        price: li.price?.unit_amount ? li.price.unit_amount / 100 : 0,
      };
    });

    // ⭐ Insert order into Supabase
    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert({
        customer_email:
          fullSession.customer_email || fullSession.customer_details?.email,
        customer_name: shippingName,
        shipping_address: shippingAddress
          ? JSON.stringify(shippingAddress)
          : null,
        total: fullSession.amount_total
          ? fullSession.amount_total / 100
          : 0,
        status: "paid",
        stripe_payment_id:
          typeof fullSession.payment_intent === "string"
            ? fullSession.payment_intent
            : fullSession.payment_intent?.id || null,

        // ⭐ NEW FIELDS
        gift_message: giftMessage,
        hide_prices: hidePrices,
      })
      .select("id")
      .single();

    if (orderError || !orderData) {
      console.error("❌ Supabase order insert error:", orderError);
      return NextResponse.json(
        { error: "Order save failed" },
        { status: 500 }
      );
    }

    const orderId = Number(orderData.id);

    // ⭐ Insert order_items
    const itemsToInsert = items.map((item) => ({
      order_id: orderId,
      product_id: Number(item.id),
      color_id: item.colorId || null,
      quantity: item.quantity,
      price: item.price,
      size: item.size,
    }));

    const { error: itemError } = await supabase
      .from("order_items")
      .insert(itemsToInsert);

    if (itemError) {
      console.error("❌ order_items insert error:", itemError);
    }

    // ⭐ Trigger confirmation email
    try {
      await fetch(
        `${process.env.NEXT_PUBLIC_APP_URL}/api/email/order-confirmation`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ orderId }),
        }
      );
    } catch (e) {
      console.error("❌ Email trigger failed:", e);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("❌ Webhook processing error:", err);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
