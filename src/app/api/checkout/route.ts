import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25",
});


export async function POST(req: NextRequest) {
  try {
    const { items, customerEmail } = await req.json();

    const lineItems = [
      ...items.map((item: any) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            description: item.size ? `Size: ${item.size}` : undefined,
          },
          unit_amount: Math.round(parseFloat(String(item.price).replace(/[^0-9.]/g, "")) * 100),
        },
        quantity: item.quantity,
      })),
      
    ];

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      shipping_address_collection: {
        allowed_countries: ["US"],
      },
      success_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${process.env.NEXT_PUBLIC_SITE_URL}/checkout/cancel`,
      metadata: {
        items: JSON.stringify(items),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe error:", error instanceof Error ? error.message : error);
    return NextResponse.json({ error: "Payment failed" }, { status: 500 });
  }
}
