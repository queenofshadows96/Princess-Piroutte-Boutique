"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";

interface Star {
  id: number;
  x: number;
  y: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
}

export default function FloatingBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generatedStars: Star[] = Array.from({ length: 60 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 12,
      duration: Math.random() * 6 + 8,
      delay: Math.random() * 5,
      opacity: Math.random() * 0.30 + 0.24,
    }));
    setStars(generatedStars);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute select-none"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
            fontSize: star.size,
            lineHeight: 1,
          }}
          animate={{
            y: [0, -18, 0],
            x: [0, star.id % 2 === 0 ? 10 : -10, 0],
            opacity: [0.06, star.opacity + 0.18, 0.06],
            filter: [
              "drop-shadow(0 0 1px rgba(255,215,100,0.15))",
              "drop-shadow(0 0 6px rgba(255,215,100,0.7))",
              "drop-shadow(0 0 1px rgba(255,215,100,0.15))",
            ],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          {star.id % 2 === 0 ? "✨" : "⭐"}
        </motion.div>
      ))}
    </div>
  );
}