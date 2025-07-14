import React from "react";
import { motion } from "framer-motion";

const bouncingDot = {
  initial: { y: 0 },
  animate: {
    y: [0, -8, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function MiniQuenzyLoader() {
  return (
    <div className="flex flex-col items-center justify-center p-2">
      {/* Quenzy text */}
      <motion.h2
        className="text-lg font-semibold text-purple-600 mb-2"
        initial={{ opacity: 0, y: -5 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Quenzy
      </motion.h2>

      {/* Dots animation */}
      <div className="flex space-x-2">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-2.5 h-2.5 rounded-full bg-purple-600"
            variants={bouncingDot}
            initial="initial"
            animate="animate"
            transition={{
              delay: i * 0.2,
              duration: 0.6,
              repeat: Infinity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
