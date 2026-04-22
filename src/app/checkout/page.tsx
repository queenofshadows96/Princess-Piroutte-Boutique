"use client";

import { useState } from "react";
import Link from "next/link";
import { useCart } from "@/context/CartContext";

const SHIPPING_COST = 5;

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [email, setEmail] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const total = totalPrice + SHIPPING_COST;

  const handleCheckout = async () => {
    setError(null);

    if (!email.trim()) {
      setError("Please enter your email address.");
      return;
    }

    if (items.length === 0) {
      setError("Your cart is empty.");
      return;
    }

    setIsProcessing(true);
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          customerEmail: email.trim(),
          items: items.map((item) => ({
            name: item.size ? `${item.name} (${item.size})` : item.name,
            price: item.price,
            quantity: item.quantity,
            image: item.image_url,
          })),
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error ?? "Failed to start checkout.");
      }

      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
      setIsProcessing(false);
    }
  };

  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1
          className="text-5xl font-magnolia mb-12 text-center"
          style={{ color: "#D4AF37" }}
        >
          Checkout
        </h1>

        {items.length === 0 ? (
          <div
            className="text-center py-20 border-2 rounded-lg bg-white"
            style={{ borderColor: "#B8860B" }}
          >
            <p className="font-playfair italic text-xl mb-4" style={{ color: "#B8860B" }}>
              Your cart is empty
            </p>
            <Link
              href="/shop"
              className="font-playfair italic underline"
              style={{ color: "#D4AF37" }}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid md:grid-cols-3 gap-8">
            {/* Left: Order summary + email */}
            <div className="md:col-span-2 space-y-6">
              {/* Order summary */}
              <div
                className="p-8 rounded-lg border-2 bg-white"
                style={{ borderColor: "#B8860B" }}
              >
                <h2
                  className="text-2xl font-playfair italic font-bold mb-6"
                  style={{ color: "#B8860B" }}
                >
                  Order Summary
                </h2>

                <div className="space-y-4 mb-6">
                  {items.map((item, i) => (
                    <div
                      key={`${item.id}-${item.size}-${i}`}
                      className="flex justify-between items-center pb-4 border-b"
                      style={{ borderColor: "#FFD1DC" }}
                    >
                      <div>
                        <p
                          className="font-playfair italic font-bold"
                          style={{ color: "#B8860B" }}
                        >
                          {item.name}
                        </p>
                        <p className="text-sm" style={{ color: "#C09090" }}>
                          {item.size && `Size: ${item.size}`}
                          {item.size && item.quantity > 1 && " · "}
                          {item.quantity > 1 && `Qty: ${item.quantity}`}
                        </p>
                      </div>
                      <span
                        className="font-playfair italic font-bold"
                        style={{ color: "#D4AF37" }}
                      >
                        ${(item.price * item.quantity).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between" style={{ color: "#C09090" }}>
                    <span className="font-playfair">Subtotal</span>
                    <span className="font-playfair">${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between" style={{ color: "#C09090" }}>
                    <span className="font-playfair">Shipping (US)</span>
                    <span className="font-playfair">${SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  <div
                    className="flex justify-between pt-4 border-t-2 font-playfair italic font-bold text-lg"
                    style={{ color: "#D4AF37", borderColor: "#FFD1DC" }}
                  >
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {/* Contact information */}
              <div
                className="p-8 rounded-lg border-2 bg-white"
                style={{ borderColor: "#B8860B" }}
              >
                <h2
                  className="text-2xl font-playfair italic font-bold mb-2"
                  style={{ color: "#B8860B" }}
                >
                  Contact Information
                </h2>
                <p className="font-playfair text-sm mb-6" style={{ color: "#C09090" }}>
                  Shipping address and payment details are collected securely on the next page.
                </p>

                <label
                  className="block font-playfair italic font-bold mb-2"
                  style={{ color: "#B8860B" }}
                >
                  Email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@example.com"
                  className="w-full p-3 border-2 rounded font-playfair outline-none focus:ring-2"
                  style={{ borderColor: "#B8860B" }}
                />
              </div>
            </div>

            {/* Right: Proceed to payment */}
            <div>
              <div
                className="p-8 rounded-lg border-2 bg-white sticky top-32"
                style={{ borderColor: "#B8860B" }}
              >
                <h2
                  className="text-xl font-playfair italic font-bold mb-6"
                  style={{ color: "#B8860B" }}
                >
                  Ready to pay?
                </h2>

                <div className="space-y-2 mb-6 text-sm font-playfair" style={{ color: "#C09090" }}>
                  <div className="flex justify-between">
                    <span>Items ({items.reduce((n, i) => n + i.quantity, 0)})</span>
                    <span>${totalPrice.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>${SHIPPING_COST.toFixed(2)}</span>
                  </div>
                  <div
                    className="flex justify-between pt-3 border-t font-playfair italic font-bold text-base"
                    style={{ color: "#D4AF37", borderColor: "#FFD1DC" }}
                  >
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                {error && (
                  <p
                    className="text-sm font-playfair mb-4 text-center"
                    style={{ color: "#c0392b" }}
                  >
                    {error}
                  </p>
                )}

                <button
                  onClick={handleCheckout}
                  disabled={isProcessing}
                  className="w-full py-3 rounded-lg font-playfair italic font-bold text-white transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  style={{ backgroundColor: "#D4AF37" }}
                  onMouseEnter={(e) => {
                    if (!isProcessing) e.currentTarget.style.backgroundColor = "#B8860B";
                  }}
                  onMouseLeave={(e) => {
                    if (!isProcessing) e.currentTarget.style.backgroundColor = "#D4AF37";
                  }}
                >
                  {isProcessing ? "Redirecting to Stripe..." : "Proceed to Payment →"}
                </button>

                <Link
                  href="/shop"
                  className="block text-center mt-4 font-playfair italic text-sm underline"
                  style={{ color: "#B8860B" }}
                >
                  Continue Shopping
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
