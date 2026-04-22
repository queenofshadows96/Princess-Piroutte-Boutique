"use client";

import { useState } from "react";
import Link from "next/link";

export default function CheckoutPage() {
  const [isProcessing, setIsProcessing] = useState(false);

  const handleCheckout = async () => {
    setIsProcessing(true);
    try {
      // Stripe integration will go here
      // For now, just redirect to success page
      setTimeout(() => {
        window.location.href = "/checkout/success";
      }, 1500);
    } catch (error) {
      console.error("Checkout error:", error);
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

        <div className="grid md:grid-cols-3 gap-8">
          {/* Order Summary */}
          <div className="md:col-span-2">
            <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
              <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
                Order Summary
              </h2>

              <div className="space-y-4 mb-6">
                {/* Cart items would go here */}
                <div className="flex justify-between items-center pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
                  <div>
                    <h3 className="font-playfair italic font-bold" style={{ color: "#B8860B" }}>
                      Princess Tutu Collection
                    </h3>
                    <p style={{ color: "#C09090", fontSize: "0.9rem" }}>Size: M</p>
                  </div>
                  <span className="font-playfair italic font-bold" style={{ color: "#D4AF37" }}>
                    $XX.XX
                  </span>
                </div>
              </div>

              <div className="space-y-2 text-right">
                <div className="flex justify-between" style={{ color: "#C09090" }}>
                  <span>Subtotal</span>
                  <span>$XX.XX</span>
                </div>
                <div className="flex justify-between" style={{ color: "#C09090" }}>
                  <span>Shipping</span>
                  <span>$X.XX</span>
                </div>
                <div
                  className="flex justify-between pt-4 border-t-2 font-playfair italic font-bold text-lg"
                  style={{ color: "#D4AF37", borderColor: "#FFD1DC" }}
                >
                  <span>Total</span>
                  <span>$XX.XX</span>
                </div>
              </div>
            </div>

            {/* Billing Information */}
            <div className="p-8 rounded-lg border-2 bg-white" style={{ borderColor: "#B8860B" }}>
              <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
                Billing Information
              </h2>

              <form className="space-y-4">
                <div>
                  <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 rounded"
                    style={{ borderColor: "#B8860B" }}
                  />
                </div>

                <div>
                  <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full p-3 border-2 rounded"
                    style={{ borderColor: "#B8860B" }}
                  />
                </div>

                <div>
                  <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                    Address
                  </label>
                  <input
                    type="text"
                    className="w-full p-3 border-2 rounded"
                    style={{ borderColor: "#B8860B" }}
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                      City
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 rounded"
                      style={{ borderColor: "#B8860B" }}
                    />
                  </div>
                  <div>
                    <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                      State
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 rounded"
                      style={{ borderColor: "#B8860B" }}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                      ZIP Code
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 rounded"
                      style={{ borderColor: "#B8860B" }}
                    />
                  </div>
                  <div>
                    <label className="block font-playfair italic font-bold mb-2" style={{ color: "#B8860B" }}>
                      Country
                    </label>
                    <input
                      type="text"
                      className="w-full p-3 border-2 rounded"
                      style={{ borderColor: "#B8860B" }}
                    />
                  </div>
                </div>
              </form>
            </div>
          </div>

          {/* Payment Section */}
          <div>
            <div className="p-8 rounded-lg border-2 bg-white sticky top-32" style={{ borderColor: "#B8860B" }}>
              <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
                Payment Method
              </h2>

              <div className="space-y-4 mb-8">
                <div className="p-4 rounded-lg border-2 bg-pink-50" style={{ borderColor: "#B8860B" }}>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="payment" defaultChecked />
                    <span className="font-playfair italic" style={{ color: "#B8860B" }}>
                      Credit/Debit Card
                    </span>
                  </label>
                </div>
                <div className="p-4 rounded-lg border-2" style={{ borderColor: "#FFD1DC" }}>
                  <label className="flex items-center gap-3">
                    <input type="radio" name="payment" />
                    <span className="font-playfair italic" style={{ color: "#B8860B" }}>
                      PayPal
                    </span>
                  </label>
                </div>
              </div>

              {/* Stripe placeholder */}
              <div className="mb-6 p-4 rounded-lg border-2" style={{ borderColor: "#B8860B", backgroundColor: "#FFF5F7" }}>
                <p style={{ color: "#C09090", fontSize: "0.9rem" }}>
                  Stripe payment form will be integrated here
                </p>
              </div>

              <button
                onClick={handleCheckout}
                disabled={isProcessing}
                className="w-full py-3 rounded-lg font-playfair italic font-bold text-white transition-all disabled:opacity-50"
                style={{ backgroundColor: "#D4AF37" }}
                onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
                onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
              >
                {isProcessing ? "Processing..." : "Complete Order"}
              </button>

              <Link
                href="/shop"
                className="block text-center mt-4 font-playfair italic"
                style={{ color: "#B8860B" }}
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
