import { loadStripe } from "@stripe/stripe-js";

let stripePromise: Promise<any>;

export const getStripe = () => {
  if (!stripePromise) {
    stripePromise = loadStripe(
      process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
    );
  }
  return stripePromise;
};

export const createCheckoutSession = async (items: any[], email: string) => {
  try {
    const response = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        items,
        email,
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to create checkout session");
    }

    const { sessionId } = await response.json();
    return sessionId;
  } catch (error) {
    console.error("Error creating checkout session:", error);
    throw error;
  }
};
