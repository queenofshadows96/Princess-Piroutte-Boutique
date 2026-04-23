"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import Link from "next/link";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

export default function CheckoutSuccess() {
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
        <p className="text-base md:text-lg leading-loose mb-8" style={{ color: "#C09090" }}>
          Your order has been placed and is being prepared with love and magic. You will receive a confirmation email shortly!
        </p>
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
