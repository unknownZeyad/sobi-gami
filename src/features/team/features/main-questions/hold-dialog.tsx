import { AnimatePresence, motion } from "motion/react";

export function HoldDialog() {
  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6, ease: "easeInOut" }}
        className="fixed w-screen h-screen top-0 left-0 bg-black/70 z-50 grid place-items-center"
      >
        <img
          className="max-w-3xl"
          src="/assets/images/popup/hold-main-question.webp"
          alt="Hold Dialog"
        />
      </motion.div>
    </AnimatePresence>
  );
}
