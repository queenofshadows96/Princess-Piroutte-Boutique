import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
export const preferredRegion = "auto";

export const config = {
  api: {
    bodyParser: false,
  },
};

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

      const items = session.metadata?.items
        ? JSON.parse(session.metadata.items)
        : [];

      const shippingAddress =
        session.collected_information?.shipping_details?.address
          ? JSON.stringify(
              session.collected_information.shipping_details.address
            )
          : null;

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
