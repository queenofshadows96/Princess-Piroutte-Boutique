"use client";

import { motion } from "framer-motion";
import CrownIcon from "./CrownIcon";

const values = [
  {
    title: "Ballet & Beyond",
    description:
      "Ballet is more than movement — it builds grace, confidence, and character that lasts a lifetime.",
  },
  {
    title: "Wearable Art",
    description:
      "Each garment is a handcrafted masterpiece, blending premium fabrics with timeless elegance.",
  },
  {
    title: "Every Princess",
    description:
      "Every child deserves to feel like royalty. Our collection celebrates all sizes, styles, and dreams.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-24 px-6" style={{ backgroundColor: "#FFF5F7" }}>
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <motion.h2
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="font-magnolia text-center mb-28"
          style={{
            color: "#D4AF37",
            fontSize: "clamp(2.5rem, 6vw, 4rem)",
          }}
        >
          Where Magic Lives
        </motion.h2>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-10">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: index * 0.18 }}
              className="value-card"
              style={{ paddingLeft: "28px", paddingRight: "28px", paddingBottom: "44px" }}
            >
              {/* Crown badge sitting at the top of the arch */}
              <div
                className="absolute -top-9 left-1/2 -translate-x-1/2 z-10 flex items-center justify-center rounded-full border-2 bg-white"
                style={{
                  borderColor: "#B8860B",
                  width: "64px",
                  height: "64px",
                  boxShadow: "0 4px 16px rgba(184,134,11,0.18)",
                }}
              >
                <CrownIcon width={34} height={34} color="#D4AF37" />
              </div>

              <h3
                className="font-playfair italic font-bold text-center mb-4 mt-4"
                style={{ color: "#B8860B", fontSize: "1.4rem" }}
              >
                {value.title}
              </h3>

              <p
                className="font-playfair text-center leading-relaxed"
                style={{ color: "#C09090", fontSize: "1rem" }}
              >
                {value.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
