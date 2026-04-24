"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function ShippingPage() {
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
            Shipping & Preorder Policy
          </h1>
        </motion.div>

        {/* Section 1 */}
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
            Small‑Batch Craftsmanship
          </h2>

          <p
            className="text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            At Princess Pirouette, we believe in sustainable luxury. To eliminate
            fashion waste, we operate on a small‑batch, preorder model. Every
            leotard is custom‑manufactured specifically for our current collection
            window. This slow‑fashion approach ensures the highest quality and
            allows us to use premium, recycled materials responsibly.
          </p>
        </motion.section>

        {/* Section 2 */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2
            className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-6`}
            style={{ color: "#D4AF37" }}
          >
            Estimated Timeline
          </h2>

          <table
            className="w-full text-left text-sm md:text-base"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            <thead>
              <tr style={{ borderBottom: "2px solid #B8860B" }}>
                <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>Phase</th>
                <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>Estimated Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr style={{ borderBottom: "1px solid rgba(184,134,11,0.2)" }}>
                <td className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>Production Phase</td>
                <td className="py-3 px-2">4–6 weeks from preorder close</td>
              </tr>
              <tr style={{ borderBottom: "1px solid rgba(184,134,11,0.2)" }}>
                <td className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>Fulfillment Phase</td>
                <td className="py-3 px-2">24–48 hours after arrival to our US facility</td>
              </tr>
              <tr>
                <td className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>Delivery Phase</td>
                <td className="py-3 px-2">3–7 business days (USA)</td>
              </tr>
            </tbody>
          </table>
        </motion.section>

        {/* Section 3 */}
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
            Shipping Rates & Methods
          </h2>

          <ul
            className="space-y-3 text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            <li><strong style={{ color: "#B8860B" }}>Domestic (USA):</strong> FREE Shipping via USPS Ground Advantage.</li>
            <li><strong style={{ color: "#B8860B" }}>Tracking:</strong> Sent via email once shipped.</li>
            <li><strong style={{ color: "#B8860B" }}>P.O. Boxes:</strong> We ship to P.O. Boxes and APO/FPO/DPO.</li>
          </ul>
        </motion.section>

        {/* Section 4 */}
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
            Policy Details
          </h2>

          <ul
            className="space-y-3 text-base md:text-lg leading-loose"
            style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}
          >
            <li><strong style={{ color: "#B8860B" }}>Address Accuracy:</strong> Please double‑check your shipping address.</li>
            <li><strong style={{ color: "#B8860B" }}>Order Changes:</strong> Allowed within 24 hours of purchase.</li>
            <li><strong style={{ color: "#B8860B" }}>Damages:</strong> Contact us within 48 hours with photos.</li>
            <li><strong style={{ color: "#B8860B" }}>International Shipping:</strong> Currently US‑only.</li>
          </ul>
        </motion.section>

      </div>
    </main>
  );
}
