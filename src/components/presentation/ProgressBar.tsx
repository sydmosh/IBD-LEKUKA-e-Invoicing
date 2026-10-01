"use client";

import { motion, useReducedMotion } from "framer-motion";

interface ProgressBarProps {
  index: number;
  total: number;
  dark?: boolean;
}

export function ProgressBar({ index, total, dark = false }: ProgressBarProps) {
  const reduce = useReducedMotion();
  const pct = ((index + 1) / total) * 100;

  return (
    <div
      className="pointer-events-none absolute inset-x-0 top-0 z-40 h-[3px]"
      role="progressbar"
      aria-valuemin={1}
      aria-valuemax={total}
      aria-valuenow={index + 1}
      aria-label="Presentation progress"
    >
      <div className={`h-full w-full ${dark ? "bg-white/10" : "bg-ibd-blue/10"}`} />
      <motion.div
        className={`absolute inset-y-0 left-0 origin-left ${
          dark
            ? "bg-gradient-to-r from-lekuka via-lekuka to-ibd-red"
            : "bg-gradient-to-r from-ibd-blue via-lekuka to-ibd-red"
        }`}
        initial={false}
        animate={{ width: `${pct}%` }}
        transition={{ duration: reduce ? 0 : 0.5, ease: [0.22, 1, 0.36, 1] }}
      />
    </div>
  );
}
