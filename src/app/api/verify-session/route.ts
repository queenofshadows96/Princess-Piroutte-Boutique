export const dynamic = "force-dynamic";

import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sessionId = searchParams.get("session_id");

    if (!sessionId) {
      return NextResponse.json({ error: "Session ID required" }, { status: 400 });
    }

    // ⭐ Retrieve full expanded session (matches webhook + checkout)
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items.data.price.product"],
    });

    if (session.payment_status !== "paid") {
      return NextResponse.json({ error: "Payment not completed" }, { status: 400 });
    }

    // ⭐ Format line items for success page
    const lineItems = session.line_items?.data.map((li) => {
      const product = li.price?.product as Stripe.Product;

      return {
        name: product?.name || null,
        image: product?.images?.[0] || null,
        size: product?.metadata?.size || null,
        colorId: product?.metadata?.colorId || null,
        quantity: li.quantity,
        price: li.price?.unit_amount ? li.price.unit_amount / 100 : 0,
      };
    }) || [];

    return NextResponse.json({
      session: {
        id: session.id,
        amount_total: session.amount_total,
        customer_email: session.customer_email,
        customer_name: session.customer_details?.name || null,
        created: session.created,
        line_items: lineItems,
      },
    });
  } catch (error) {
    console.error("Session verification error:", error);
    return NextResponse.json({ error: "Failed to verify session" }, { status: 500 });
  }
}
