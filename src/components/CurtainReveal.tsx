"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function CurtainReveal() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const seen = sessionStorage.getItem("curtain-seen");
    if (seen) {
      setShow(false);
      return;
    }
    const timer = setTimeout(() => {
      setShow(false);
      sessionStorage.setItem("curtain-seen", "true");
    }, 3500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Left Curtain */}
          <motion.div
            className="fixed top-0 left-0 w-1/2 h-full z-[9999] overflow-hidden"
            initial={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full relative"
              style={{
                backgroundColor: "#E298A6",
                boxShadow: "inset -30px 0 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Subtle Curtain Folds */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 60px,
                    rgba(0, 0, 0, 0.08) 60px,
                    rgba(0, 0, 0, 0.08) 62px,
                    transparent 62px,
                    transparent 80px,
                    rgba(255, 255, 255, 0.06) 80px,
                    rgba(255, 255, 255, 0.06) 82px
                  )`,
                }}
              />
              {/* Vertical Fold Shadow - Simplified */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    rgba(0, 0, 0, 0.1) 0px,
                    transparent 30px,
                    transparent 70px,
                    rgba(0, 0, 0, 0.1) 100px,
                    transparent 130px
                  )`,
                }}
              />
              {/* Shine/Highlight */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to right, rgba(255, 255, 255, 0.25) 0%, transparent 25%)",
                }}
              />
            </div>
          </motion.div>

          {/* Right Curtain */}
          <motion.div
            className="fixed top-0 right-0 w-1/2 h-full z-[9999] overflow-hidden"
            initial={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 2.5, ease: "easeInOut" }}
          >
            <div
              className="w-full h-full relative"
              style={{
                backgroundColor: "#E298A6",
                boxShadow: "inset 30px 0 40px rgba(0, 0, 0, 0.2)",
              }}
            >
              {/* Subtle Curtain Folds */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent,
                    transparent 60px,
                    rgba(0, 0, 0, 0.08) 60px,
                    rgba(0, 0, 0, 0.08) 62px,
                    transparent 62px,
                    transparent 80px,
                    rgba(255, 255, 255, 0.06) 80px,
                    rgba(255, 255, 255, 0.06) 82px
                  )`,
                }}
              />
              {/* Vertical Fold Shadow - Simplified */}
              <div
                className="absolute inset-0"
                style={{
                  backgroundImage: `repeating-linear-gradient(
                    90deg,
                    transparent 0px,
                    rgba(0, 0, 0, 0.1) 30px,
                    transparent 60px,
                    transparent 70px,
                    rgba(0, 0, 0, 0.1) 100px,
                    transparent 130px
                  )`,
                }}
              />
              {/* Shine/Highlight */}
              <div
                className="absolute inset-0"
                style={{
                  background: "linear-gradient(to left, rgba(255, 255, 255, 0.25) 0%, transparent 25%)",
                }}
              />
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}