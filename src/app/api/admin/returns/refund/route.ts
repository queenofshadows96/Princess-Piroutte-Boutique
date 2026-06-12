import { NextResponse } from "next/server";
import Stripe from "stripe";
import { createClient } from "@supabase/supabase-js";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

export async function POST(req: Request) {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  try {
    const { return_id, order_id } = await req.json();

    if (!return_id || !order_id) {
      return NextResponse.json(
        { error: "Missing return_id or order_id" },
        { status: 400 }
      );
    }

    // 1. Fetch order to get stripe_payment_id
    const { data: order, error: orderError } = await supabase
      .from("orders")
      .select("stripe_payment_id, total")
      .eq("id", order_id)
      .single();

    if (orderError || !order) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    if (!order.stripe_payment_id) {
      return NextResponse.json(
        { error: "Order has no Stripe payment ID" },
        { status: 400 }
      );
    }

    // 2. Mark refund as pending BEFORE calling Stripe
    await supabase
      .from("returns")
      .update({
        refund_status: "pending",
        refund_attempted_at: new Date().toISOString(),
        refund_error_message: null,
      })
      .eq("id", return_id);

    // 3. Attempt refund in Stripe
    let refund;
    try {
      refund = await stripe.refunds.create({
        payment_intent: order.stripe_payment_id,
        amount: Math.round(order.total * 100),
      });
    } catch (stripeError: any) {
      // Stripe threw an error → refund failed
      await supabase
        .from("returns")
        .update({
          refund_status: "failed",
          refund_error_message: stripeError.message || "Unknown Stripe error",
        })
        .eq("id", return_id);

      return NextResponse.json(
        {
          success: false,
          refund_status: "failed",
          error: stripeError.message,
        },
        { status: 500 }
      );
    }

    // 4. Refund succeeded → update RETURNS table
    await supabase
      .from("returns")
      .update({
        refund_id: refund.id,
        refund_status: refund.status, // "succeeded"
        refunded_at: new Date().toISOString(),
        refund_error_message: null,
      })
      .eq("id", return_id);

    // 5. Update ORDERS table
    await supabase
      .from("orders")
      .update({
        status: "returned",
        refund_id: refund.id,
        refund_status: refund.status,
        refunded_at: new Date().toISOString(),
        refunded_amount: order.total,
      })
      .eq("id", order_id);

    return NextResponse.json({
      success: true,
      refund_id: refund.id,
      refund_status: refund.status,
    });
  } catch (err: any) {
    console.error("Refund error:", err);

    // Catch any unexpected errors
    await supabase
      .from("returns")
      .update({
        refund_status: "failed",
        refund_error_message: err.message || "Unknown server error",
      })
      .eq("id", return_id);

    return NextResponse.json(
      { error: "Refund failed", details: err.message },
      { status: 500 }
    );
  }
}
