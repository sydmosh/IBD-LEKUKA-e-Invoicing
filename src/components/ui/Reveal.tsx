"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

interface RevealProps {
  children: ReactNode;
  delay?: number;
  y?: number;
  x?: number;
  duration?: number;
  className?: string;
  index?: number;
  step?: number;
}

export function Reveal({
  children,
  delay = 0,
  y = 18,
  x = 0,
  duration = 0.55,
  className,
  index,
  step = 0.06,
}: RevealProps) {
  const reduce = useReducedMotion();
  const d = index !== undefined ? index * step : delay;

  return (
    <motion.div
      className={className}
      initial={reduce ? { opacity: 0 } : { opacity: 0, y, x }}
      animate={reduce ? { opacity: 1 } : { opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: reduce ? 0.2 : duration,
        delay: reduce ? 0 : d,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

interface RevealGroupProps {
  children: ReactNode;
  className?: string;
  step?: number;
}

export function RevealGroup({ children, className, step = 0.06 }: RevealGroupProps) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial="hidden"
      animate="show"
      variants={{
        hidden: {},
        show: { transition: { staggerChildren: reduce ? 0 : step } },
      }}
    >
      {children}
    </motion.div>
  );
}

export function RevealItem({
  children,
  className,
  y = 16,
}: {
  children: ReactNode;
  className?: string;
  y?: number;
}) {
  const reduce = useReducedMotion();
  return (
    <motion.div
      className={className}
      variants={{
        hidden: reduce ? { opacity: 0 } : { opacity: 0, y },
        show: {
          opacity: 1,
          y: 0,
          transition: { duration: reduce ? 0.2 : 0.5, ease: [0.22, 1, 0.36, 1] },
        },
      }}
    >
      {children}
    </motion.div>
  );
}
