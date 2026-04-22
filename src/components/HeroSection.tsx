"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export function HeroSection() {
  return (
    <section
      className="min-h-[80vh] flex items-center justify-center px-4 py-20 relative overflow-hidden"
      style={{ backgroundColor: "#FFF5F7", marginTop: "80px" }}
    >
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          className="absolute w-64 h-64 rounded-full opacity-20"
          style={{ backgroundColor: "#FFD1DC", top: "-10%", right: "-5%" }}
          animate={{ y: [0, 20, 0], x: [0, 10, 0] }}
          transition={{ duration: 6, repeat: Infinity }}
        />
        <motion.div
          className="absolute w-96 h-96 rounded-full opacity-15"
          style={{ backgroundColor: "#D4AF37", bottom: "-15%", left: "-10%" }}
          animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
      </div>

      <div className="max-w-4xl mx-auto text-center relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1
            className="font-magnolia text-5xl sm:text-6xl md:text-7xl font-bold mb-6"
            style={{ color: "#D4AF37" }}
          >
            Princess Pirouette
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p
            className="text-xl sm:text-2xl md:text-3xl font-playfair italic mb-8"
            style={{ color: "#B8860B" }}
          >
            Magical and Sustainable Apparel
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <p className="text-lg sm:text-xl mb-12 max-w-2xl mx-auto" style={{ color: "#C09090" }}>
            For your Inner Little Princess
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex gap-6 justify-center flex-wrap"
        >
          <Link
            href="/shop"
            className="px-8 py-3 rounded-lg font-playfair italic font-semibold transition-all duration-200 text-white"
            style={{ backgroundColor: "#D4AF37" }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#B8860B")}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#D4AF37")}
          >
            Shop Collection
          </Link>
          <Link
            href="/about"
            className="px-8 py-3 rounded-lg font-playfair italic font-semibold transition-all duration-200 border-2"
            style={{ borderColor: "#B8860B", color: "#B8860B", backgroundColor: "transparent" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#FFF5F7";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Learn More
          </Link>
        </motion.div>
      </div>
    </section>
  );
}