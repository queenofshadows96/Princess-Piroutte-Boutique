"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

export default function CheckoutSuccess() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const [sessionData, setSessionData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    if (sessionId) {
      // Verify the session with our API
      fetch(`/api/verify-session?session_id=${sessionId}`)
        .then(res => res.json())
        .then(data => {
          if (data.session) {
            setSessionData(data.session);
          } else {
            setError("Unable to verify payment");
          }
        })
        .catch(err => {
          console.error("Session verification error:", err);
          setError("Unable to verify payment");
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [sessionId]);

  if (loading) {
    return (
      <main className="relative z-10 py-20 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto text-center p-12 rounded-3xl shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", border: "2px solid #B8860B" }}
        >
          <h1 className={`${magnolia.className} text-3xl md:text-4xl mb-6`} style={{ color: "#D4AF37" }}>
            Verifying Payment...
          </h1>
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 mx-auto" style={{ borderColor: "#D4AF37" }}></div>
        </motion.div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="relative z-10 py-20 px-6 min-h-screen flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-lg mx-auto text-center p-12 rounded-3xl shadow-md"
          style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", border: "2px solid #B8860B" }}
        >
          <h1 className={`${magnolia.className} text-3xl md:text-4xl mb-6`} style={{ color: "#D4AF37" }}>
            Payment Verification Failed
          </h1>
          <p className="text-base md:text-lg leading-loose mb-8" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            {error}. Please contact support if you were charged.
          </p>
          <Link href="/contact">
            <button
              className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mr-4"
              style={{ backgroundColor: "#FFD1DC", color: "#D4AF37", border: "2px solid #B8860B" }}
            >
              Contact Support
            </button>
          </Link>
          <Link href="/shop">
            <button
              className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
              style={{ backgroundColor: "#FFD1DC", color: "#D4AF37", border: "2px solid #B8860B" }}
            >
              Continue Shopping
            </button>
          </Link>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="relative z-10 py-20 px-6 min-h-screen flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-lg mx-auto text-center p-12 rounded-3xl shadow-md"
        style={{ backgroundColor: "rgba(255, 255, 255, 0.92)", border: "2px solid #B8860B" }}
      >
        <h1 className={`${magnolia.className} text-5xl md:text-6xl mb-6`} style={{ color: "#D4AF37" }}>
          Thank You, Princess!
        </h1>
        <p className="text-base md:text-lg leading-loose mb-8" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
          Your order has been placed and is being prepared with love and magic. You will receive a confirmation email shortly!
        </p>
        {sessionData && (
          <div className="mb-8 p-4 rounded-lg" style={{ backgroundColor: "rgba(255, 209, 220, 0.1)" }}>
            <p className="text-sm" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
              Order Total: ${(sessionData.amount_total / 100).toFixed(2)}
            </p>
            {sessionData.customer_email && (
              <p className="text-sm" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
                Confirmation sent to: {sessionData.customer_email}
              </p>
            )}
          </div>
        )}
        <Link href="/shop">
          <button
            className="px-10 py-4 rounded-full font-bold text-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
            style={{ backgroundColor: "#FFD1DC", color: "#D4AF37", border: "2px solid #B8860B" }}
          >
            Continue Shopping
          </button>
        </Link>
      </motion.div>
    </main>
  );
}
