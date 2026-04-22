import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-08-16",
});

interface CartItem {
  name: string;
  description?: string;
  image?: string;
  price: number;
  quantity?: number;
}

export async function POST(request: NextRequest) {
  try {
    const { items, customerEmail } = await request.json();

    if (!items || items.length === 0) {
      return NextResponse.json({ error: "No items provided" }, { status: 400 });
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = items.map(
      (item: CartItem) => ({
        price_data: {
          currency: "usd",
          product_data: {
            name: item.name,
            ...(item.description && { description: item.description }),
            ...(item.image && { images: [item.image] }),
          },
          unit_amount: Math.round(item.price * 100),
        },
        quantity: item.quantity ?? 1,
      })
    );

    lineItems.push({
      price_data: {
        currency: "usd",
        product_data: { name: "Standard Shipping" },
        unit_amount: 500,
      },
      quantity: 1,
    });

    const appUrl = process.env.NEXT_PUBLIC_APP_URL;

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      customer_email: customerEmail,
      shipping_address_collection: { allowed_countries: ["US"] },
      success_url: `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${appUrl}/checkout/cancel`,
    });

    return NextResponse.json({ url: session.url }, { status: 200 });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
