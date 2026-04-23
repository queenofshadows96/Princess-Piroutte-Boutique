"use client";

import { motion } from "framer-motion";
import { Great_Vibes, Playfair_Display } from "next/font/google";

const magnolia = Great_Vibes({ subsets: ["latin"], weight: ["400"] });
const playfair = Playfair_Display({ subsets: ["latin"], weight: ["400", "700"], style: ["italic"] });

const cardStyle = {
  backgroundColor: "rgba(255, 255, 255, 0.92)",
  border: "2px solid #B8860B",
};

export default function SizingGuide() {
  return (
    <main className="relative z-10 py-20 px-6 min-h-screen">
      <div className="max-w-3xl mx-auto space-y-16">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <h1 className={`${magnolia.className} text-5xl md:text-6xl mb-4`} style={{ color: "#D4AF37" }}>
            Sizing Guide
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
            How to Measure Yourself
          </h2>
          <p className="text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            For the most accurate fit, use a soft measuring tape and measure over your undergarments. Have a friend help if possible!
          </p>
          <ul className="mt-4 space-y-3 text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            <li><strong style={{ color: "#B8860B" }}>Bust</strong> — Measure around the fullest part of your chest</li>
            <li><strong style={{ color: "#B8860B" }}>Waist</strong> — Measure around your natural waistline, the narrowest part</li>
            <li><strong style={{ color: "#B8860B" }}>Hip</strong> — Measure around the fullest part of your hips and buttocks. This will hit where the legline will lay</li>
            <li><strong style={{ color: "#B8860B" }}>Girth</strong> — Measure from your shoulder, down through your crotch and back up to your shoulder</li>
          </ul>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="p-8 rounded-3xl shadow-md"
          style={cardStyle}
        >
          <h2 className={`${playfair.className} italic text-2xl md:text-3xl font-bold mb-6`} style={{ color: "#D4AF37" }}>
            Ballet Leotard Size Chart
          </h2>
          <div className="overflow-x-auto">
            <table className="w-full text-center text-sm md:text-base" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
              <thead>
                <tr style={{ borderBottom: "2px solid #B8860B" }}>
                  <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>Measurement</th>
                  <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>XS</th>
                  <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>S</th>
                  <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>M</th>
                  <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>L</th>
                  <th className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>XL</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { measurement: "Bust", xs: '28-31"', s: '32-34"', m: '35-38"', l: '38-41"', xl: '41-44"' },
                  { measurement: "Waist", xs: '23-25"', s: '25-28"', m: '28-32"', l: '33-36"', xl: '36-39"' },
                  { measurement: "Hip", xs: '30-34"', s: '34-38"', m: '37-42"', l: '42-46"', xl: '46-50"' },
                  { measurement: "Girth", xs: '53-56"', s: '55-58"', m: '59-63"', l: '63-67"', xl: '67-70"' },
                ].map((row, i) => (
                  <tr key={row.measurement} style={{ backgroundColor: i % 2 === 0 ? "rgba(255,209,220,0.15)" : "transparent", borderBottom: "1px solid rgba(184,134,11,0.2)" }}>
                    <td className="py-3 px-2 font-bold" style={{ color: "#B8860B" }}>{row.measurement}</td>
                    <td className="py-3 px-2">{row.xs}</td>
                    <td className="py-3 px-2">{row.s}</td>
                    <td className="py-3 px-2">{row.m}</td>
                    <td className="py-3 px-2">{row.l}</td>
                    <td className="py-3 px-2">{row.xl}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <p className="mt-6 text-sm leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            ** These leotards are made with professional-grade 210 GSM Recycled Matte Nylon/Lycra — thicker and more supportive than standard streetwear. For the best fit, prioritize your Girth measurement.
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
            Fit Tips
          </h2>
          <ul className="space-y-3 text-base md:text-lg leading-loose" style={{ color: "#C09090", fontFamily: "'Times New Roman', serif" }}>
            <li>For a relaxed casual fit, consider sizing up</li>
            <li>For high-impact dance or athletics, consider sizing down</li>
            <li>Always prioritize your Girth measurement for the best fit</li>
            <li>If between sizes, size up for all-day comfort</li>
            <li>Still unsure? Contact us and we will help you find your perfect fit</li>
          </ul>
        </motion.section>
      </div>
    </main>
  );
}
