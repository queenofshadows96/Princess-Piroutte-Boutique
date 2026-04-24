"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
});

export default function Home() {
  return (
    <main className="relative">
      {/* HERO SECTION */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-[80vh] px-6 text-center py-16">
        <motion.h1
          className={`${magnolia.className} text-5xl md:text-6xl font-black mb-10 leading-tight`}
          style={{ color: "#D4AF37" }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2 }}
        >
          Princess Pirouette
          <br />
          <span style={{ color: "#D4AF37" }}>Boutique</span>
        </motion.h1>

        <motion.p
          className={`${playfair.className} italic text-xl md:text-2xl mb-4 leading-relaxed`}
          style={{ color: "#B8860B" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          Magical and Sustainable Luxury for your Inner Little Princess
        </motion.p>

        <motion.p
          className="text-base md:text-lg mb-8 leading-relaxed max-w-2xl"
          style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.7 }}
        >
          We create wearable works of art — a perfect blend of functionality,
          femininity, and fantasy. Crafted from premium recycled fibers and
          silky-soft regenerated fabrics, every piece celebrates the graceful,
          playful magic that lives within everyone.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4"
        >
          <Link href="/shop">
            <Button
              size="lg"
              className={`${playfair.className} italic font-semibold px-8 py-4 text-lg rounded-full shadow-lg hover:-translate-y-1 hover:shadow-2xl transition-all duration-300`}
              style={{
                backgroundColor: "#FFD1DC",
                color: "#D4AF37",
                border: "1px solid #B8860B",
              }}
            >
              Shop the Collection
            </Button>
          </Link>

          <Link href="/about">
            <Button
              size="lg"
              variant="outline"
              className={`${playfair.className} italic font-semibold px-8 py-4 text-lg rounded-full hover:bg-white hover:-translate-y-1 hover:shadow-xl transition-all duration-300`}
              style={{ borderColor: "#B8860B", color: "#D4AF37" }}
            >
              Our Story
            </Button>
          </Link>
        </motion.div>
      </section>

      {/* VALUE SECTION */}
      <section className="relative z-0 py-16 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            className={`${playfair.className} italic text-3xl md:text-4xl font-bold text-center mb-12`}
            style={{ color: "#D4AF37" }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            Where Magic Lives
          </motion.h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center items-start">
            {[
              {
                icon: "🩰",
                title: "Ballet & Beyond",
                desc: "From the dance studio to everyday wear — designed for every graceful moment.",
              },
              {
                icon: "✨",
                title: "Wearable Art",
                desc: "Each piece is a wearable work of art — handcrafted from premium recycled and organic fibers.",
              },
              {
                icon: "👑",
                title: "Every Princess",
                desc: "Inclusive magic for every dancer and dreamer — because everyone deserves to sparkle.",
              },
            ].map((value) => (
              <div
                key={value.title}
                className="value-card relative flex flex-col items-center rounded-t-full rounded-b-xl"
                style={{
                  border: "2px solid #B8860B",
                  minHeight: "420px",
                  backgroundColor: "#FFFFFF",
                }}
              >
                <div
                  className="absolute left-1/2 z-10"
                  style={{ top: "-36px", transform: "translateX(-50%)" }}
                >
                  <svg
                    width="55"
                    height="70"
                    viewBox="0 0 40 60"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M3 25 L3 17 L10 23 L15 7 L18 15 L21 2 L24 15 L27 7 L32 23 L39 17 L39 25 Z"
                      fill="#B8860B"
                    />
                    <rect
                      x="3"
                      y="25"
                      width="36"
                      height="6"
                      rx="2"
                      fill="#B8860B"
                    />
                  </svg>
                </div>

                <div
                  className="flex items-center justify-center w-full"
                  style={{ height: "180px", paddingTop: "30px" }}
                >
                  <span className="text-4xl">{value.icon}</span>
                </div>

                <div className="flex flex-col items-center px-6 pb-8">
                  <h3
                    className={`${playfair.className} italic text-xl font-bold mb-2`}
                    style={{ color: "#D4AF37" }}
                  >
                    {value.title}
                  </h3>
                  <p
                    className="text-base leading-relaxed"
                    style={{
                      color: "#C09090",
                      fontFamily: "'Times New Roman', serif",
                    }}
                  >
                    {value.desc}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER **/}
      <footer
        className="relative z-10 py-10 px-6 text-center"
        style={{
          backgroundColor: "rgba(255, 255, 255, 0.85)",
          borderTop: "1px solid rgba(255, 209, 220, 0.3)",
        }}
      >
        <p
          className={`${magnolia.className} text-xl font-bold mt-2`}
          style={{ color: "#D4AF37" }}
        >
          Princess Pirouette Boutique
        </p>

        <p
          className="text-sm mt-2"
          style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
        >
          The little princess inside everyone deserves to shine.
        </p>

        <p className="text-xs mt-3" style={{ color: "#C09090" }}>
          © 2026 Princess Pirouette Boutique
        </p>
      </footer>
    </main>
  );
}
