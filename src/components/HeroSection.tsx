"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="min-h-[90vh] flex items-center justify-center px-6 py-20 relative"
      style={{ backgroundColor: "#FFF5F7", marginTop: "80px" }}
    >
      <div className="max-w-4xl mx-auto text-center relative z-10">
        {/* Main title */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="font-magnolia leading-tight mb-6"
          style={{
            color: "#D4AF37",
            fontSize: "clamp(3.5rem, 9vw, 8rem)",
            textShadow: "0 2px 24px rgba(212,175,55,0.18)",
          }}
        >
          Princess Pirouette Boutique
        </motion.h1>

        {/* Decorative divider */}
        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mx-auto mb-8"
          style={{
            width: "120px",
            height: "2px",
            backgroundColor: "#B8860B",
            borderRadius: "2px",
          }}
        />

        {/* Catchphrase */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55 }}
          className="font-playfair italic mb-3"
          style={{
            color: "#B8860B",
            fontSize: "clamp(1.25rem, 3vw, 1.875rem)",
            letterSpacing: "0.02em",
          }}
        >
          Magical and Sustainable Apparel
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7 }}
          className="font-playfair italic mb-14"
          style={{
            color: "#C09090",
            fontSize: "clamp(1rem, 2.5vw, 1.375rem)",
            letterSpacing: "0.03em",
          }}
        >
          For your Inner Little Princess
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <Link
            href="/shop"
            className="font-playfair italic font-semibold transition-all duration-300 text-white"
            style={{
              backgroundColor: "#D4AF37",
              padding: "14px 40px",
              borderRadius: "8px",
              fontSize: "1.1rem",
              letterSpacing: "0.02em",
              boxShadow: "0 4px 20px rgba(212,175,55,0.35)",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#B8860B";
              e.currentTarget.style.boxShadow = "0 6px 28px rgba(184,134,11,0.45)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#D4AF37";
              e.currentTarget.style.boxShadow = "0 4px 20px rgba(212,175,55,0.35)";
            }}
          >
            Shop Collection
          </Link>

          <Link
            href="/about"
            className="font-playfair italic font-semibold transition-all duration-300"
            style={{
              border: "2px solid #B8860B",
              color: "#B8860B",
              backgroundColor: "transparent",
              padding: "14px 40px",
              borderRadius: "8px",
              fontSize: "1.1rem",
              letterSpacing: "0.02em",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#B8860B";
              e.currentTarget.style.color = "white";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = "#B8860B";
            }}
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
