"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function OurValues() {
  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1
            className={`${magnolia.className} text-5xl md:text-6xl mb-4`}
            style={{ color: "#D4AF37" }}
          >
            Our Values
          </h1>
        </motion.div>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2 className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`} style={{ color: "#D4AF37" }}>
            Sustainability
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            At Princess Pirouette Boutique we believe that true luxury never comes at the cost of our planet. Every piece is crafted from premium recycled and organic fibers — from our silky-soft regenerated performance fabrics to our signature bamboo-lined gussets. Even our packaging is eco-friendly.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2 className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`} style={{ color: "#D4AF37" }}>
            OEKO-TEX Certified
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Our fabrics are OEKO-TEX certified — meaning every material used in our garments has been tested for harmful substances and meets the highest safety standards. We only put on your body what is safe, clean, and kind to the earth.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2 className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`} style={{ color: "#D4AF37" }}>
            Supporting Artists
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Every Princess Pirouette design starts with our own original concepts, brought to life through talented artists and pattern makers we partner with and fairly compensate — from sublimation artwork to vector designs.
          </p>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2 className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`} style={{ color: "#D4AF37" }}>
            Our Promise to You
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Every decision we make — from the materials we choose to the artists we work with — is guided by our commitment to magic, sustainability, and inclusivity. Because the little princess inside everyone deserves a world that sparkles, inside and out.
          </p>
        </motion.section>
      </div>
    </main>
  );
}