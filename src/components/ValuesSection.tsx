"use client";

import { motion } from "framer-motion";
import CrownIcon from "./CrownIcon";

const values = [
  {
    title: "Passion for Dance",
    description: "Every piece is crafted with love for ballet and the joy it brings to young dancers.",
  },
  {
    title: "Quality & Comfort",
    description: "Premium materials and expert tailoring ensure comfort during every pirouette.",
  },
  {
    title: "Magical Experience",
    description: "Transform your little one into a princess ballerina with our enchanting collection.",
  },
];

export function ValuesSection() {
  return (
    <section className="py-20 px-4" style={{ backgroundColor: "#FFF5F7" }}>
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-4xl md:text-5xl font-magnolia text-center mb-16"
          style={{ color: "#D4AF37" }}
        >
          Our Values
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {values.map((value, index) => (
            <motion.div
              key={value.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className="text-center flex flex-col items-center"
            >
              {/* Arched card with border */}
              <div
                className="w-full pt-16 pb-8 px-6 rounded-t-3xl border-2 border-b-0 bg-white relative"
                style={{
                  borderColor: "#B8860B",
                }}
              >
                {/* Crown icon on top */}
                <div className="absolute -top-12 left-1/2 transform -translate-x-1/2 bg-white rounded-full p-3 border-2" 
                  style={{ borderColor: "#B8860B" }}>
                  <CrownIcon width={32} height={32} color="#D4AF37" />
                </div>

                <h3 className="text-2xl font-playfair italic font-bold mb-4" style={{ color: "#B8860B" }}>
                  {value.title}
                </h3>
                <p className="font-playfair" style={{ color: "#C09090" }}>
                  {value.description}
                </p>
              </div>

              {/* Arch bottom - curved continuation */}
              <div
                className="w-full h-8 rounded-b-3xl border-2 border-t-0"
                style={{
                  borderColor: "#B8860B",
                  backgroundColor: "white",
                }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}