"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function About() {
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
            Our Story
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
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`}
            style={{ color: "#D4AF37" }}
          >
            A Magical Belief
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Princess Pirouette Boutique was born from a magical belief:{" "}
            <strong>that elegance and imagination belong together.</strong>{" "}We don&apos;t just
            design dancewear; we create wearable works of art — a perfect blend of functionality,
            femininity, and fantasy.
          </p>
          <p className="text-base md:text-lg leading-loose mt-4" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Our boutique is dedicated to celebrating the graceful, playful, and magical spirit
            that lives within everyone. Whether you are a seasoned dancer or a recreational
            enthusiast, our collections are thoughtfully designed to capture the wonder of
            childhood while celebrating the grace of femininity in its purest form.
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
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-4`}
            style={{ color: "#D4AF37" }}
          >
            Mindful Luxury for a Beautiful World
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            We believe that the world we dance in should be as beautiful as the art itself. That
            is why Princess Pirouette is committed to{" "}
            <strong>mindful luxury</strong>. We use premium recycled and organic fibers — from
            our silky-soft regenerated performance fabrics to our signature bamboo-lined gussets
            — ensuring our garments are as gentle on the earth as they are on your skin.
          </p>
          <p className="text-base md:text-lg leading-loose mt-4" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            Even our packaging is eco-friendly, protecting the magic of our planet so you can
            shine inside and out.
          </p>
        </motion.section>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          {[
            {
              title: "Ballet & Beyond",
              desc: "From the dance studio to everyday wear — designed for every graceful moment.",
            },
            {
              title: "Wearable Art",
              desc: "Each piece is a wearable work of art crafted from premium recycled and organic fibers.",
            },
            {
              title: "Every Princess",
              desc: "Inclusive magic for every dancer and dreamer — because the little princess inside everyone deserves to sparkle.",
            },
          ].map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="p-8 rounded-3xl"
              style={cardStyle}
            >
              <h3
                className={`${playfair.className} italic text-xl font-bold mb-3`}
                style={{ color: "#D4AF37" }}
              >
                {value.title}
              </h3>
              <p style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>{value.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </main>
  );
}
