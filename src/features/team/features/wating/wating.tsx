"use client";

import { motion } from "motion/react";

export default function Wating() {
  return (
    <motion.section
      className="min-h-screen bg-black flex items-center justify-center"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8, filter: "blur(12px)", y: 20 }}
        animate={{ opacity: 1, scale: 1, filter: "blur(0px)", y: 0 }}
        transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
        className="text-neutral-300 text-xl font-medium uppercase tracking-wide"
      >
        Waiting for admin to start...
      </motion.div>
    </motion.section>
  );
}
