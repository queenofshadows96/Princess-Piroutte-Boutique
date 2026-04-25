import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function POST(req: NextRequest) {
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
    console.error("Webhook signature error:", error);
    return NextResponse.json({ error: "Webhook failed" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    try {
      const session = event.data.object as Stripe.Checkout.Session;

      // ⭐ Parse cart items from metadata
      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      // ⭐ Insert into orders table
      const { data: orderData, error: orderError } = await supabase
        .from("orders")
        .insert({
          customer_email: session.customer_email,
          customer_name:
            session.customer_details?.name ??
            session.customer_email ??
            null,

          // ⭐ Safe shipping address handling
          shipping_address: session.customer_details?.address
            ? JSON.stringify(session.customer_details.address)
            : null,

          total: session.amount_total ? session.amount_total / 100 : 0,
          status: "paid",
          stripe_payment_id: session.payment_intent
            ? String(session.payment_intent)
            : null,

          // No single size — handled per item
          size: null,
        })
        .select("id")
        .single();

      if (orderError) {
        console.error("Supabase order insert error:", orderError);
        return NextResponse.json(
          { error: "Order save failed" },
          { status: 500 }
        );
      }

      const orderId = orderData.id;

      // ⭐ Insert each item into order_items
      for (const item of items) {
        const { error: itemError } = await supabase
          .from("order_items")
          .insert({
            order_id: orderId,
            product_id: item.product_id ?? null,
            quantity: item.quantity,
            price: item.price,
            size: item.size ?? null,
          });

        if (itemError) {
          console.error("Supabase order_items insert error:", itemError);
        }
      }
    } catch (err) {
      console.error("Order save error:", err);
      return NextResponse.json({ error: "Order save failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
