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
  rotate: number;
}

function GoldStar({ size }: { size: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="#D4AF37"
      xmlns="http://www.w3.org/2000/svg"
    >
      <polygon points="12,2 14.9,9.1 22.5,9.5 17,14.5 18.8,22 12,18.1 5.2,22 7,14.5 1.5,9.5 9.1,9.1" />
    </svg>
  );
}

export default function FloatingBackground() {
  const [stars, setStars] = useState<Star[]>([]);

  useEffect(() => {
    const generated: Star[] = Array.from({ length: 55 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 10 + 5,
      duration: Math.random() * 7 + 8,
      delay: Math.random() * 6,
      opacity: Math.random() * 0.28 + 0.12,
      rotate: Math.random() * 360,
    }));
    setStars(generated);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      {stars.map((star) => (
        <motion.div
          key={star.id}
          className="absolute"
          style={{
            left: `${star.x}%`,
            top: `${star.y}%`,
          }}
          animate={{
            y: [0, -16, 0],
            x: [0, star.id % 2 === 0 ? 8 : -8, 0],
            opacity: [star.opacity * 0.3, star.opacity, star.opacity * 0.3],
            rotate: [star.rotate, star.rotate + 20, star.rotate],
          }}
          transition={{
            duration: star.duration,
            delay: star.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <GoldStar size={star.size} />
        </motion.div>
      ))}
    </div>
  );
}
