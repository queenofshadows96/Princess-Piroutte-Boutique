"use client";

import { useEffect, useRef, useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import CrownIcon from "@/components/CrownIcon";
import { useCart } from "@/context/CartContext";

interface SessionData {
  paymentIntentId: string | null;
  amountTotal: number | null;
  customerEmail: string | null;
  customerName: string | null;
  created: number;
  lineItems: { description: string; quantity: number | null; amountTotal: number }[];
}

function orderRef(paymentIntentId: string | null, created: number): string {
  if (paymentIntentId) {
    return "#" + paymentIntentId.slice(-8).toUpperCase();
  }
  return "#PPB-" + new Date(created * 1000).toISOString().slice(2, 10).replace(/-/g, "");
}

function SuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const { clearCart } = useCart();
  const cartCleared = useRef(false);

  const [session, setSession] = useState<SessionData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!sessionId) {
      setLoading(false);
      setError(true);
      return;
    }

    fetch(`/api/checkout/session?session_id=${sessionId}`)
      .then((r) => r.json())
      .then((data) => {
        if (data.error) {
          setError(true);
        } else {
          setSession(data);
          if (!cartCleared.current) {
            clearCart();
            cartCleared.current = true;
          }
        }
      })
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  }, [sessionId, clearCart]);

  const orderDetails = (
    <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
      <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
        Order Details
      </h2>

      {loading ? (
        <div className="animate-pulse space-y-4">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
              <div className="h-4 rounded w-32" style={{ backgroundColor: "#FFD1DC" }} />
              <div className="h-4 rounded w-24" style={{ backgroundColor: "#FFD1DC" }} />
            </div>
          ))}
        </div>
      ) : error || !session ? (
        <p className="font-playfair text-sm" style={{ color: "#C09090" }}>
          Your payment was received. Check your email for a receipt.
        </p>
      ) : (
        <div className="space-y-4">
          <div className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
            <span className="font-playfair" style={{ color: "#B8860B" }}>Order Reference</span>
            <span className="font-playfair italic font-bold" style={{ color: "#D4AF37" }}>
              {orderRef(session.paymentIntentId, session.created)}
            </span>
          </div>

          <div className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
            <span className="font-playfair" style={{ color: "#B8860B" }}>Date</span>
            <span className="font-playfair" style={{ color: "#C09090" }}>
              {new Date(session.created * 1000).toLocaleDateString(undefined, {
                year: "numeric", month: "long", day: "numeric",
              })}
            </span>
          </div>

          {session.customerEmail && (
            <div className="flex justify-between pb-4 border-b" style={{ borderColor: "#FFD1DC" }}>
              <span className="font-playfair" style={{ color: "#B8860B" }}>Email</span>
              <span className="font-playfair" style={{ color: "#C09090" }}>
                {session.customerEmail}
              </span>
            </div>
          )}

          {session.lineItems.map((item, i) => (
            <div
              key={i}
              className="flex justify-between pb-4 border-b"
              style={{ borderColor: "#FFD1DC" }}
            >
              <span className="font-playfair text-sm" style={{ color: "#B8860B" }}>
                {item.description}
                {item.quantity && item.quantity > 1 ? ` ×${item.quantity}` : ""}
              </span>
              <span className="font-playfair text-sm" style={{ color: "#C09090" }}>
                ${(item.amountTotal / 100).toFixed(2)}
              </span>
            </div>
          ))}

          <div className="flex justify-between pt-2" style={{ borderColor: "#FFD1DC" }}>
            <span className="font-playfair italic font-bold text-lg" style={{ color: "#B8860B" }}>
              Total
            </span>
            <span className="font-playfair italic font-bold text-lg" style={{ color: "#D4AF37" }}>
              ${((session.amountTotal ?? 0) / 100).toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <div className="text-center mb-12">
        <div className="flex justify-center mb-6">
          <div className="rounded-full p-6" style={{ backgroundColor: "#FFD1DC" }}>
            <CrownIcon width={64} height={64} color="#D4AF37" />
          </div>
        </div>

        <h1 className="text-5xl font-magnolia mb-4" style={{ color: "#D4AF37" }}>
          Order Confirmed!
        </h1>

        <p className="text-xl mb-6" style={{ color: "#C09090" }}>
          Thank you for your purchase. Your magical order has been confirmed!
        </p>
      </div>

      {orderDetails}

      <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
        <h2 className="text-2xl font-playfair italic font-bold mb-6" style={{ color: "#B8860B" }}>
          What&apos;s Next?
        </h2>

        <ul style={{ color: "#C09090", lineHeight: "1.8" }}>
          <li className="mb-3">
            <strong>Confirmation Email:</strong> You&apos;ll receive a confirmation email shortly with your receipt and order details.
          </li>
          <li className="mb-3">
            <strong>Tracking:</strong> We&apos;ll send you a tracking number as soon as your order ships.
          </li>
          <li className="mb-3">
            <strong>Updates:</strong> Keep an eye on your email for shipping updates and delivery notifications.
          </li>
        </ul>
      </div>

      <div className="p-8 rounded-lg border-2 bg-white mb-8" style={{ borderColor: "#B8860B" }}>
        <h2 className="text-2xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
          Questions?
        </h2>
        <p className="mb-4" style={{ color: "#C09090" }}>
          If you have any questions about your order, our support team is here to help.
        </p>
        <Link
          href="/contact"
          className="text-center block px-6 py-2 rounded-lg font-playfair italic font-semibold text-white transition-all"
          style={{ backgroundColor: "#D4AF37" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
        >
          Contact Support
        </Link>
      </div>

      <div className="text-center space-y-4">
        <Link
          href="/shop"
          className="inline-block px-8 py-3 rounded-lg font-playfair italic font-semibold text-white transition-all"
          style={{ backgroundColor: "#D4AF37" }}
          onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
          onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
        >
          Continue Shopping
        </Link>
        <br />
        <Link
          href="/"
          className="inline-block px-8 py-3 rounded-lg font-playfair italic font-semibold border-2"
          style={{ borderColor: "#B8860B", color: "#B8860B", backgroundColor: "transparent" }}
          onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = "#FFF5F7"; }}
          onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = "transparent"; }}
        >
          Back to Home
        </Link>
      </div>
    </>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <main style={{ backgroundColor: "#FFF5F7", minHeight: "100vh", paddingTop: "100px" }}>
      <div className="max-w-2xl mx-auto px-4 py-12">
        <Suspense
          fallback={
            <div className="text-center py-20">
              <p className="font-playfair italic text-xl" style={{ color: "#B8860B" }}>
                Loading your order...
              </p>
            </div>
          }
        >
          <SuccessContent />
        </Suspense>
      </div>
    </main>
  );
}
