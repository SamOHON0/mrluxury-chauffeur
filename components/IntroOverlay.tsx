"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";

const SEEN_KEY = "mrl-intro-seen";

export default function IntroOverlay() {
  const [visible, setVisible] = useState(true);
  const reduce = useReducedMotion();

  useEffect(() => {
    let seen = false;
    try {
      seen = sessionStorage.getItem(SEEN_KEY) === "1";
    } catch {
      /* storage unavailable, show the intro anyway */
    }

    if (seen || reduce) {
      setVisible(false);
      return;
    }

    const t = setTimeout(() => {
      setVisible(false);
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        /* ignore */
      }
    }, 2000);
    return () => clearTimeout(t);
  }, [reduce]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-0 z-[60] flex items-center justify-center bg-ink-950"
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeInOut" }}
          aria-hidden="true"
        >
          <motion.div
            className="text-center"
            initial={reduce ? false : { opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="font-display text-3xl tracking-wide text-ink-100 md:text-4xl">
              MR <span className="text-gold-500">Luxury</span> Chauffeur
            </p>
            <motion.div
              className="mx-auto mt-4 h-px bg-gold-500"
              initial={reduce ? false : { width: 0 }}
              animate={{ width: "60%" }}
              transition={{ duration: 0.9, delay: 0.4, ease: "easeOut" }}
            />
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
