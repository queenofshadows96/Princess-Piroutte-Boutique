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

      const { error: insertError } = await supabase.from("orders").insert({
        customer_email: session.customer_email,
        customer_name: session.customer_details?.name ?? null,
        shipping_address: session.customer_details?.address
          ? JSON.stringify(session.customer_details.address)
          : null,
        total: session.amount_total ? session.amount_total / 100 : 0,
        status: "paid",
        stripe_payment_id: session.payment_intent
          ? String(session.payment_intent)
          : null,

        // ⭐ NEW FIELD — saves the selected size
        size: session.metadata?.size ?? null,
      });

      if (insertError) {
        console.error("Supabase insert error:", insertError);
        return NextResponse.json(
          { error: "Order save failed" },
          { status: 500 }
        );
      }
    } catch (err) {
      console.error("Order save error:", err);
      return NextResponse.json({ error: "Order save failed" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
