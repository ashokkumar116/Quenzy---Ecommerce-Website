// src/Components/QuenzyLoader.jsx
import React from "react";
import { motion } from "framer-motion";

const bouncingDot = {
  initial: { y: 0 },
  animate: {
    y: [0, -20, 0],
    transition: {
      duration: 0.6,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

export default function QuenzyLoader() {
  return (
    <div className="w-full h-screen bg-base-100 flex flex-col items-center justify-center">
      <motion.h1
        className="text-5xl font-extrabold text-purple-600 tracking-wide mb-6"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Quenzy
      </motion.h1>

      <div className="flex space-x-3">
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="w-4 h-4 rounded-full bg-purple-600"
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

      <p className="mt-6 text-sm text-base-content/70 tracking-wide">Loading... please wait</p>
    </div>
  );
}
