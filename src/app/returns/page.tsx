"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["italic"],
});

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function ReturnsPage() {
  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-16">

        {/* Title */}
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
            Returns Policy
          </h1>
        </motion.div>

        {/* Section 1 — Eligibility */}
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
            Return Eligibility
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            We accept returns within <strong>30 days of delivery</strong> for unworn,
            unwashed items with tags and hygiene liners still attached. Items must be
            free of deodorant marks, makeup, perfume, pet hair, and any signs of wear.
          </p>
        </motion.section>

        {/* Section 2 — Preorder / Small Batch Rules */}
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
            Preorder & Small‑Batch Returns
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Because our leotards are produced in limited small‑batch runs, returns are
            accepted <strong>only after your item has been delivered</strong>. We cannot
            cancel or refund preorder items once production has begun.
          </p>
        </motion.section>

        {/* Section 3 — No Exchanges */}
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
            Exchanges
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            At this time, we do not offer direct exchanges due to our small‑batch
            production model. If you need a different size, you may return your item
            and place a new order during the next preorder window.
          </p>
        </motion.section>

        {/* Section 4 — Non-Returnable Items */}
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
            Non‑Returnable Items
          </h2>

          <ul
            className="space-y-3 text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            <li>Worn or washed items</li>
            <li>Items with removed tags or liners</li>
            <li>Final sale items</li>
            <li>Gift cards</li>
          </ul>
        </motion.section>

        {/* Section 5 — How to Start a Return */}
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
            How to Start a Return
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            To initiate a return, please email us at{" "}
            <strong>[your email]</strong> with your order number and the item you
            wish to return. Our team will respond within 1–2 business days with
            instructions.
          </p>
        </motion.section>

        {/* Section 6 — Refund Timeline */}
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
            Refund Timeline
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            Once your return is received and inspected, your refund will be issued
            to your original payment method within <strong>5–7 business days</strong>.
          </p>
        </motion.section>

        {/* Section 7 — Damaged Items */}
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
            Damaged or Defective Items
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            If your item arrives damaged, please contact us within{" "}
            <strong>48 hours</strong> of delivery with photos of the packaging and
            product. We will replace or refund the item as quickly as possible.
          </p>
        </motion.section>

      </div>
    </main>
  );
}
