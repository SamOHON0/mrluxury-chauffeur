"use client";

import { useState } from "react";
import { motion, AnimatePresence, useReducedMotion } from "motion/react";
import { CaretDown } from "@phosphor-icons/react";

/* Answers are intentionally general until the client confirms exact
   policies. See README. */
const ITEMS = [
  {
    q: "How far in advance should I book?",
    a: "As early as you can, especially for airport pickups and weekends. Same-day bookings are often possible, subject to availability, so it is always worth asking on WhatsApp.",
  },
  {
    q: "What happens if my flight is delayed?",
    a: "Your flight is tracked from departure. Your chauffeur adjusts to the actual landing time, so a delay never means a missed pickup.",
  },
  {
    q: "Do you provide child seats?",
    a: "Yes, on request. Add it in the notes when you book and an appropriate seat will be fitted before your journey.",
  },
  {
    q: "How do I pay?",
    a: "Your fare is agreed before you travel and payment is arranged at booking. Corporate accounts can be invoiced.",
  },
  {
    q: "Do you only operate in Dublin?",
    a: "Dublin is home, but the car travels nationwide. Airport transfers, day tours and long-distance journeys anywhere in Ireland are all available.",
  },
  {
    q: "Can I book the car for a full day?",
    a: "Yes. Hourly hire covers everything from a two hour minimum up to full-day and multi-day engagements at your pace.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);
  const reduce = useReducedMotion();

  return (
    <div className="mx-auto max-w-3xl">
      {ITEMS.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.q} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              aria-expanded={isOpen}
              className="flex w-full items-center justify-between gap-4 py-5 text-left"
            >
              <span className="text-base font-semibold text-ink-100">
                {item.q}
              </span>
              <CaretDown
                size={18}
                className={`shrink-0 text-gold-500 transition-transform duration-300 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={reduce ? false : { height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={reduce ? undefined : { height: 0, opacity: 0 }}
                  transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden"
                >
                  <p className="pb-5 pr-8 text-sm leading-relaxed text-ink-400">
                    {item.a}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
}
