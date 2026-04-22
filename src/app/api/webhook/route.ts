import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

export const runtime = "nodejs";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

// Service role key bypasses RLS for server-side inserts
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY ?? process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json(
      { error: "Missing stripe-signature header" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;

    const customerEmail =
      session.customer_details?.email ?? session.customer_email ?? "";
    const customerName = session.customer_details?.name ?? "";
    const rawAddress =
      session.shipping_details?.address ?? session.customer_details?.address;
    const shippingAddress = rawAddress ? JSON.stringify(rawAddress) : null;
    const total = (session.amount_total ?? 0) / 100;
    const stripePaymentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? "");

    const { error } = await supabase.from("orders").insert({
      customer_email: customerEmail,
      customer_name: customerName,
      shipping_address: shippingAddress,
      total,
      status: "paid",
      stripe_payment_id: stripePaymentId,
    });

    if (error) {
      console.error("Supabase order insert error:", error);
      return NextResponse.json({ error: "Failed to save order" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
