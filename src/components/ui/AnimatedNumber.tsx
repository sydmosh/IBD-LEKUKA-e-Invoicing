"use client";

import { animate, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface AnimatedNumberProps {
  value: number;
  duration?: number;
  className?: string;
  suffix?: string;
}

export function AnimatedNumber({
  value,
  duration = 1.1,
  className,
  suffix = "",
}: AnimatedNumberProps) {
  const reduce = useReducedMotion();
  const [display, setDisplay] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    if (reduce) return;
    if (started.current) return;
    started.current = true;
    const controls = animate(0, value, {
      duration,
      ease: [0.22, 1, 0.36, 1],
      onUpdate: (v) => setDisplay(Math.round(v)),
    });
    return () => controls.stop();
  }, [value, duration, reduce]);

  const shown = reduce ? value : display;

  return (
    <span className={className} aria-label={`${value}${suffix}`}>
      {shown}
      {suffix}
    </span>
  );
}
