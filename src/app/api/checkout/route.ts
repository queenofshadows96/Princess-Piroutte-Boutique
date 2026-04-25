import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
  // ⭐ RAW BODY FOR STRIPE SIGNATURE
  const body = await req.text();
  const signature = req.headers.get("stripe-signature")!;

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (error) {
    console.error("Signature verification failed:", error);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // ⭐ HANDLE CHECKOUT SESSION COMPLETED
  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      // ⭐ PARSE ITEMS FROM METADATA
      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      // ⭐ CORRECT SHIPPING FIELD FOR CHECKOUT SESSIONS
      const shippingAddress = session.shipping_details?.address
        ? JSON.stringify(session.shipping_details.address)
        : null;

      // ⭐ INSERT ORDER INTO SUPABASE
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_email: session.customer_email,
          customer_name:
            session.customer_details?.name ??
            session.customer_email ??
            null,

          shipping_address: shippingAddress,

          total: session.amount_total ? session.amount_total / 100 : 0,
          status: "paid",
          stripe_payment_id: session.payment_intent
            ? String(session.payment_intent)
            : null,

          size: null, // no single size — handled per item
        })
        .select("id")
        .single();

      if (orderError) {
        console.error("Order insert error:", orderError);
        return NextResponse.json(
          { error: "Order insert failed" },
          { status: 500 }
        );
      }

      const orderId = orderData.id;

      // ⭐ INSERT EACH ITEM INTO order_items
      for (const item of items) {
        const { error: itemError } = await supabase
          .from("order_items")
          .insert({
            order_id: orderId,
            product_id: item.product_id ?? null,
            name: item.name ?? null,
            size: item.size ?? null,
            quantity: item.quantity,
            price: item.price,
          });

        if (itemError) {
          console.error("order_items insert error:", itemError);
        }
      }
    } catch (err) {
      console.error("Webhook processing error:", err);
      return NextResponse.json(
        { error: "Webhook processing failed" },
        { status: 500 }
      );
    }
  }

  return NextResponse.json({ received: true });
}

