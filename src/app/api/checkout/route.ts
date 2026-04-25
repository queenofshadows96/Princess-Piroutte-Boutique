import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail, customerName, shippingAddress } =
      await req.json();

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      payment_method_types: ["card"],

      line_items: items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: `${item.name} (${item.size})`,
          },
          unit_amount: item.price * 100,
        },
        quantity: item.quantity,
      })),

      metadata: {
        items: JSON.stringify(items),
      },

      customer_email: customerEmail,

      shipping_address_collection: {
        allowed_countries: ["US"],
      },

      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout`,
    });

    return NextResponse.json({ url: session.url });
  } catch (err) {
    console.error("Checkout session error:", err);
    return NextResponse.json(
      { error: "Checkout session failed" },
      { status: 500 }
    );
  }
}
