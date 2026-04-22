import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId, {
      expand: ["line_items"],
    });

    const paymentIntentId =
      typeof session.payment_intent === "string"
        ? session.payment_intent
        : (session.payment_intent?.id ?? null);

    return NextResponse.json({
      paymentIntentId,
      amountTotal: session.amount_total,
      customerEmail: session.customer_details?.email ?? session.customer_email,
      customerName: session.customer_details?.name,
      created: session.created,
      lineItems: session.line_items?.data.map((item) => ({
        description: item.description,
        quantity: item.quantity,
        amountTotal: item.amount_total,
      })),
    });
  } catch (error) {
    console.error("Stripe session retrieve error:", error);
    return NextResponse.json(
      { error: "Failed to retrieve session" },
      { status: 500 }
    );
  }
}
